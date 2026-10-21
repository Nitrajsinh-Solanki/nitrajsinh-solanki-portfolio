#!/usr/bin/env python3
"""
Post-build SEO audit for the Next.js portfolio (no third-party dependencies).

Usage (from the `nitrajsinh-solanki/` app folder, after `npm run build`):

    python3 scripts/seo-audit.py                # human-readable report
    python3 scripts/seo-audit.py --json         # machine-readable report
    python3 scripts/seo-audit.py --strict       # treat WARN as FAIL (CI gate)

Exit codes: 0 = no FAIL, 1 = at least one FAIL (or WARN with --strict).

It reads the prerendered output in `.next/server/app` and the `public/` folder.
It never touches the network.
"""
import argparse
import collections
import glob
import html as htmllib
import json
import os
import re
import sys
from html.parser import HTMLParser
from urllib.parse import urlparse

ap = argparse.ArgumentParser()
ap.add_argument("--root", default=".next/server/app", help="prerendered app dir")
ap.add_argument("--public", default="public", help="public dir")
ap.add_argument("--json", action="store_true")
ap.add_argument("--strict", action="store_true")
args = ap.parse_args()

ROOT = args.root
if not os.path.isdir(ROOT):
    sys.exit(f"Build output not found at {ROOT}. Run `npm run build` first.")

# ---------------------------------------------------------------- findings
findings = []  # (severity, page, code, message)


def add(sev, page, code, msg):
    findings.append((sev, page, code, msg))


# schema.org `programmingLanguage` must name languages, not frameworks/databases/tools.
PROGRAMMING_LANGUAGES = {
    "javascript", "typescript", "rust", "dart", "c#", "c", "c++", "java", "kotlin", "swift",
    "python", "go", "php", "ruby", "move", "sql", "html", "css", "shell", "bash", "solidity",
}
VALID_APP_CATEGORIES = re.compile(
    r"^(Web|Business|Mobile|Game|Utilities|Multimedia|Education|Health|Finance|Social|Developer|Travel|"
    r"Lifestyle|Entertainment|Productivity)[A-Za-z]*(Application)?$"
)

# ---------------------------------------------------------------- parsing


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.metas, self.links, self.imgs, self.anchors = [], [], [], []
        self.title, self._in_title = "", False
        self.headings, self._h = [], None
        self.ld, self._in_ld, self._ld_buf = [], False, ""
        self.ids = set()
        self.itemtypes, self.itemprops = [], []
        self.text, self._skip = [], 0
        self.html_lang = None
        self._cur_prop = None
        self.app_category_text = []

    def handle_starttag(self, tag, a):
        a = dict(a)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "html":
            self.html_lang = a.get("lang")
        if tag == "title":
            self._in_title = True
        elif tag == "meta":
            self.metas.append(a)
        elif tag == "link":
            self.links.append(a)
        elif tag == "img":
            self.imgs.append(a)
        elif tag == "a":
            self.anchors.append(a)
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self._h = [tag, ""]
        elif tag == "br" and self._h is not None:
            self._h[1] += "\u2417"  # sentinel for <br>
        if tag in ("script", "style"):
            self._skip += 1
            if tag == "script" and a.get("type") == "application/ld+json":
                self._in_ld, self._ld_buf = True, ""
        for k, v in a.items():
            if k.lower() == "itemtype":
                self.itemtypes.append(v)
        if a.get("itemprop") == "applicationCategory" or a.get("itemProp") == "applicationCategory":
            self._cur_prop = "applicationCategory"
            self.app_category_text.append("")

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6") and self._h:
            self.headings.append(tuple(self._h))
            self._h = None
        if tag in ("script", "style"):
            self._skip -= 1
            if tag == "script" and self._in_ld:
                self.ld.append(self._ld_buf)
                self._in_ld = False
        if self._cur_prop and tag in ("span", "div", "p"):
            self._cur_prop = None

    def handle_data(self, d):
        if self._in_title:
            self.title += d
        if self._h is not None:
            self._h[1] += d
        if self._in_ld:
            self._ld_buf += d
        if self._cur_prop:
            self.app_category_text[-1] += d
        if not self._skip:
            self.text.append(d)


def meta(p, key, val):
    for m in p.metas:
        if m.get(key) == val:
            return m.get("content")
    return None


def norm(u):
    u = (u or "").strip()
    return u[:-1] if u.endswith("/") and urlparse(u).path == "/" else u


# ---------------------------------------------------------------- discover pages
pages = {}  # route -> file
for f in glob.glob(ROOT + "/**/*.html", recursive=True):
    rel = os.path.relpath(f, ROOT)[:-5]
    if rel.startswith("_"):
        continue
    route = "/" if rel == "index" else "/" + rel
    pages[route] = f

# metadata/file routes produced by the build (.body files) + public files
file_routes = set()
for f in glob.glob(ROOT + "/**/*.body", recursive=True):
    file_routes.add("/" + os.path.relpath(f, ROOT)[:-5])
for f in glob.glob(ROOT + "/*.txt") + glob.glob(ROOT + "/*.xml") + glob.glob(ROOT + "/*.webmanifest"):
    file_routes.add("/" + os.path.basename(f))
if os.path.isdir(args.public):
    for f in glob.glob(args.public + "/**/*", recursive=True):
        if os.path.isfile(f):
            file_routes.add("/" + os.path.relpath(f, args.public))

parsed = {}
for route, f in pages.items():
    p = Page()
    with open(f, encoding="utf8") as fh:
        raw = fh.read()
    p.feed(raw)
    parsed[route] = (p, raw)

# ---------------------------------------------------------------- sitemap / robots
sm_path = os.path.join(ROOT, "sitemap.xml.body")
sm_urls, sm_lastmods = [], []
if os.path.exists(sm_path):
    sm = open(sm_path, encoding="utf8").read()
    for loc, rest in re.findall(r"<url>\s*<loc>(.*?)</loc>(.*?)</url>", sm, re.S):
        sm_urls.append(loc)
        m = re.search(r"<lastmod>(.*?)</lastmod>", rest)
        sm_lastmods.append(m.group(1) if m else None)
else:
    add("FAIL", "sitemap.xml", "SITEMAP_MISSING", "sitemap.xml was not generated")

rb_path = os.path.join(ROOT, "robots.txt.body")
if os.path.exists(rb_path):
    rb = open(rb_path, encoding="utf8").read()
    if not re.search(r"(?im)^sitemap:\s*https?://", rb):
        add("FAIL", "robots.txt", "ROBOTS_NO_SITEMAP", "robots.txt has no absolute Sitemap: line")
    if re.search(r"(?im)^disallow:\s*/\s*$", rb):
        add("FAIL", "robots.txt", "ROBOTS_BLOCKS_ALL", "robots.txt disallows the whole site")
else:
    add("FAIL", "robots.txt", "ROBOTS_MISSING", "robots.txt was not generated")

site_origin = None
home = parsed.get("/")
if home:
    c = [l.get("href") for l in home[0].links if l.get("rel") == "canonical"]
    if c:
        u = urlparse(c[0])
        site_origin = f"{u.scheme}://{u.netloc}"

# ---------------------------------------------------------------- per-page checks
indexable = {}
for route, (p, raw) in sorted(parsed.items()):
    pg = route
    title = htmllib.unescape(p.title.strip())
    desc = htmllib.unescape(meta(p, "name", "description") or "")
    robots = [m.get("content", "") for m in p.metas if m.get("name") == "robots"]
    noindex = any("noindex" in r for r in robots)
    if noindex and any(r.startswith("index") for r in robots):
        add("FAIL", pg, "ROBOTS_CONFLICT", f"conflicting robots meta tags: {robots}")
    if noindex:
        continue
    indexable[route] = True

    # --- title
    if not title:
        add("FAIL", pg, "TITLE_MISSING", "no <title>")
    elif len(title) > 65:
        add("WARN", pg, "TITLE_LONG", f"title is {len(title)} chars (may be truncated): {title}")
    elif len(title) < 15:
        add("WARN", pg, "TITLE_SHORT", f"title is only {len(title)} chars: {title}")

    # --- description
    if not desc:
        add("FAIL", pg, "DESC_MISSING", "no meta description")
    else:
        if desc.rstrip().endswith(("…", "...")):
            add("FAIL", pg, "DESC_ELLIPSIS", "meta description ends with an ellipsis (cut mid-sentence)")
        if len(desc) > 160:
            add("WARN", pg, "DESC_LONG", f"meta description is {len(desc)} chars")
        if len(desc) < 70:
            add("WARN", pg, "DESC_SHORT", f"meta description is only {len(desc)} chars")

    # --- canonical / og
    canon = [l.get("href") for l in p.links if l.get("rel") == "canonical"]
    ogurl = meta(p, "property", "og:url")
    if len(canon) != 1:
        add("FAIL", pg, "CANONICAL_COUNT", f"{len(canon)} canonical links (need exactly 1)")
    elif not canon[0].startswith("http"):
        add("FAIL", pg, "CANONICAL_RELATIVE", f"canonical is not absolute: {canon[0]}")
    elif norm(canon[0]) != norm(ogurl):
        add("WARN", pg, "CANONICAL_OG_MISMATCH", f"canonical {canon[0]} != og:url {ogurl}")
    if canon and canon[0].startswith("http") and (urlparse(canon[0]).path.rstrip("/") or "/") != route:
        add("FAIL", pg, "CANONICAL_NOT_SELF", f"canonical points elsewhere: {canon[0]}")
    if canon and site_origin and not canon[0].startswith(site_origin):
        add("FAIL", pg, "CANONICAL_HOST", f"canonical host differs from site origin {site_origin}")
    for prop in ("og:title", "og:description", "og:image", "og:type", "og:site_name"):
        if not meta(p, "property", prop):
            add("FAIL", pg, "OG_MISSING", f"missing {prop}")
    img = meta(p, "property", "og:image")
    if img and not img.startswith("http"):
        add("FAIL", pg, "OG_IMAGE_RELATIVE", f"og:image is not absolute: {img}")
    elif img:
        ipath = urlparse(img).path.rstrip("/")
        if ipath not in file_routes:
            add("FAIL", pg, "OG_IMAGE_MISSING", f"og:image has no built file/route: {ipath}")
    if not meta(p, "name", "twitter:card"):
        add("FAIL", pg, "TWITTER_CARD", "missing twitter:card")
    if not p.html_lang:
        add("FAIL", pg, "LANG_MISSING", "<html> has no lang attribute")
    if not meta(p, "name", "viewport"):
        add("FAIL", pg, "VIEWPORT_MISSING", "missing viewport meta")

    # --- icons (site-wide, report once on home)
    if route == "/":
        rels = [(l.get("rel") or "") for l in p.links]
        if not any("apple-touch-icon" in r for r in rels):
            add("FAIL", pg, "APPLE_TOUCH_ICON", "no <link rel=\"apple-touch-icon\"> (explicit `icons` in layout.tsx overrides app/apple-icon.*)")
        if not any(r in ("icon", "shortcut icon") for r in rels):
            add("FAIL", pg, "FAVICON", "no favicon <link rel=\"icon\">")
        if not any(r == "manifest" for r in rels):
            add("WARN", pg, "MANIFEST", "no web manifest link")

    # --- headings
    h1 = [h for h in p.headings if h[0] == "h1"]
    if len(h1) != 1:
        add("FAIL", pg, "H1_COUNT", f"{len(h1)} <h1> elements (need exactly 1)")
    prev = 0
    for tag, text in p.headings:
        lvl = int(tag[1])
        if prev and lvl > prev + 1:
            add("WARN", pg, "HEADING_SKIP", f"heading level jumps h{prev} -> h{lvl}: {text.strip()[:50]!r}")
        prev = lvl
        if re.search(r"\S\u2417\S", text):
            add("FAIL", pg, "HEADING_BR", f"<br> glues words in <{tag}>: {text.replace(chr(0x2417), '<br>')[:60]!r}")

    # --- images
    for im in p.imgs:
        if "alt" not in im:
            add("FAIL", pg, "IMG_ALT", f"<img> without alt: {im.get('src', '')[:80]}")
    ext = [im["src"] for im in p.imgs if im.get("src", "").startswith("http")]
    if ext:
        hosts = sorted({urlparse(u).netloc for u in ext})
        add("WARN", pg, "THIRD_PARTY_IMAGES", f"{len(ext)} images load from third-party hosts: {hosts}")
    if route.startswith("/projects/") and not [im for im in p.imgs if im.get("alt")]:
        add("WARN", pg, "NO_CONTENT_IMAGE", "project page has no real <img> (only CSS placeholders)")

    # --- visible placeholder text
    body_text = re.sub(r"\s+", " ", " ".join(p.text))
    for bad in ("localhost:3000", "lorem ipsum", "TODO", "undefined", "[object Object]"):
        if bad in body_text:
            add("FAIL" if bad != "localhost:3000" else "WARN", pg, "PLACEHOLDER_TEXT", f"visible text contains {bad!r}")

    # --- structured data
    types = []
    if not p.ld and route != "/resume":
        add("WARN", pg, "NO_JSONLD", "no JSON-LD on this page")
    for blob in p.ld:
        try:
            data = json.loads(blob)
        except Exception as e:  # noqa: BLE001
            add("FAIL", pg, "JSONLD_INVALID", f"invalid JSON-LD: {e}")
            continue
        nodes = data["@graph"] if isinstance(data, dict) and "@graph" in data else [data]
        if isinstance(data, dict) and "@context" not in data:
            add("FAIL", pg, "JSONLD_CONTEXT", "JSON-LD block has no @context")
        for n in nodes:
            t = n.get("@type")
            types.append(t)
            if not t:
                add("FAIL", pg, "JSONLD_TYPE", "JSON-LD node without @type")
            if t == "BreadcrumbList":
                pos = [i.get("position") for i in n.get("itemListElement", [])]
                if pos != list(range(1, len(pos) + 1)):
                    add("FAIL", pg, "BREADCRUMB_POS", f"breadcrumb positions not sequential: {pos}")
            if t == "SoftwareSourceCode":
                repo = n.get("codeRepository", "")
                if not re.match(r"^https://github\.com/[^/]+/[^/]+/?$", repo):
                    add("FAIL", pg, "CODE_REPO", f"codeRepository is not a repository URL: {repo}")
                langs = n.get("programmingLanguage", [])
                langs = langs if isinstance(langs, list) else [langs]
                bad = [l for l in langs if str(l).strip().lower() not in PROGRAMMING_LANGUAGES]
                if bad:
                    add("FAIL", pg, "PROGRAMMING_LANGUAGE", f"programmingLanguage contains non-languages: {bad}")
                if not langs:
                    add("WARN", pg, "PROGRAMMING_LANGUAGE_EMPTY", "SoftwareSourceCode has no programmingLanguage")
            if t == "SoftwareApplication":
                for req in ("name", "description", "applicationCategory"):
                    if not n.get(req):
                        add("WARN", pg, "SOFTWAREAPP_FIELD", f"SoftwareApplication missing {req}")
            for key in ("url", "item", "mainEntityOfPage", "image"):
                v = n.get(key)
                if isinstance(v, str) and v.startswith("/"):
                    add("FAIL", pg, "JSONLD_RELATIVE_URL", f"{t}.{key} is relative: {v}")

    # --- microdata sanity (applicationCategory must look like a category, not a badge)
    for txt in p.app_category_text:
        txt = txt.strip()
        if txt and not VALID_APP_CATEGORIES.match(txt):
            add("FAIL", pg, "MICRODATA_CATEGORY", f"microdata applicationCategory is not a category: {txt!r}")
            break

    # --- stale numbers like "across 10 real projects"
    m = re.search(r"across (\d+) real projects", raw)
    if m:
        n_proj = len([r for r in pages if r.startswith("/projects/")])
        if int(m.group(1)) != n_proj:
            add("WARN", pg, "STALE_COUNT", f"text says {m.group(1)} projects but {n_proj} project pages exist")

    # --- links
    for a in p.anchors:
        href = a.get("href", "")
        if a.get("target") == "_blank" and "noopener" not in (a.get("rel") or ""):
            add("WARN", pg, "NOOPENER", f"target=_blank without rel=noopener: {href[:70]}")
        if href.startswith("#") and len(href) > 1:
            if href[1:] not in p.ids:
                add("FAIL", pg, "BROKEN_ANCHOR", f"in-page anchor {href} has no matching id")
        elif href.startswith("/") and not href.startswith("//"):
            path = urlparse(href).path.rstrip("/") or "/"
            if path.startswith("/_next"):
                continue
            if path not in pages and path not in file_routes:
                add("FAIL", pg, "BROKEN_LINK", f"internal link has no built target: {href}")

# ---------------------------------------------------------------- duplicates
seen_t, seen_d = collections.defaultdict(list), collections.defaultdict(list)
for route in indexable:
    p = parsed[route][0]
    seen_t[htmllib.unescape(p.title.strip())].append(route)
    seen_d[htmllib.unescape(meta(p, "name", "description") or "")].append(route)
for t, routes in seen_t.items():
    if len(routes) > 1 and t:
        add("FAIL", ", ".join(routes), "DUPLICATE_TITLE", f"same <title> on {len(routes)} pages: {t}")
for d, routes in seen_d.items():
    if len(routes) > 1 and d:
        add("FAIL", ", ".join(routes), "DUPLICATE_DESC", f"same meta description on {len(routes)} pages")

# ---------------------------------------------------------------- sitemap vs pages
sm_paths = {urlparse(u).path.rstrip("/") or "/" for u in sm_urls}
for route in indexable:
    if route not in sm_paths:
        add("FAIL", route, "NOT_IN_SITEMAP", "indexable page is missing from sitemap.xml")
for path in sm_paths:
    if path not in pages:
        add("FAIL", path, "SITEMAP_DEAD_URL", "sitemap lists a URL that has no built page")
    elif path not in indexable:
        add("FAIL", path, "SITEMAP_NOINDEX", "sitemap lists a noindex page")
if site_origin:
    for u in sm_urls:
        if not u.startswith(site_origin):
            add("FAIL", u, "SITEMAP_HOST", f"sitemap URL host differs from {site_origin}")
if sm_urls:
    if any(d is None for d in sm_lastmods):
        add("WARN", "sitemap.xml", "SITEMAP_NO_LASTMOD", "some sitemap URLs have no <lastmod>")
    elif len(set(sm_lastmods)) == 1:
        add("WARN", "sitemap.xml", "SITEMAP_SAME_LASTMOD",
            f"all {len(sm_urls)} URLs share one lastmod ({sm_lastmods[0][:10]}); Google ignores lastmod when it looks automated")
    for d in sm_lastmods:
        if d and not re.match(r"^\d{4}-\d{2}-\d{2}", d):
            add("FAIL", "sitemap.xml", "SITEMAP_LASTMOD_FORMAT", f"bad lastmod {d}")

# ---------------------------------------------------------------- internal link graph
inbound = collections.defaultdict(set)
for route, (p, _) in parsed.items():
    for a in p.anchors:
        href = a.get("href", "")
        if href.startswith("/") and not href.startswith("//"):
            path = urlparse(href).path.rstrip("/") or "/"
            if path in pages and path != route:
                inbound[path].add(route)
for route in indexable:
    n = len(inbound.get(route, ()))
    if route != "/" and n < 2:
        add("WARN", route, "FEW_INBOUND", f"only {n} internal page(s) link here")

# ---------------------------------------------------------------- report
order = {"FAIL": 0, "WARN": 1, "INFO": 2}
findings.sort(key=lambda f: (order[f[0]], f[2], f[1]))
fails = [f for f in findings if f[0] == "FAIL"]
warns = [f for f in findings if f[0] == "WARN"]

if args.json:
    print(json.dumps({
        "pages": sorted(pages), "indexable": sorted(indexable),
        "fail": len(fails), "warn": len(warns),
        "findings": [dict(severity=s, page=p, code=c, message=m) for s, p, c, m in findings],
    }, indent=2))
else:
    by_code = collections.Counter((s, c) for s, _, c, _ in findings)
    for s, p, c, m in findings:
        print(f"{s:4s}  {c:24s} {p:40s} {m}")
    print()
    print(f"Pages built: {len(pages)} | indexable: {len(indexable)} | sitemap URLs: {len(sm_urls)}")
    print(f"Result: {len(fails)} FAIL, {len(warns)} WARN")
    if by_code:
        print("Summary by check:")
        for (s, c), n in sorted(by_code.items(), key=lambda x: (order[x[0][0]], x[0][1])):
            print(f"  {s:4s} {c:24s} x{n}")

sys.exit(1 if fails or (args.strict and warns) else 0)
