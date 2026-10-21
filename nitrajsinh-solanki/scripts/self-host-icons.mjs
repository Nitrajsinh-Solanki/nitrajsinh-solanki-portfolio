#!/usr/bin/env node
/**
 * Self-host the tech-stack icons that TechStack.tsx currently loads from
 * cdn.jsdelivr.net (devicon) and cdn.simpleicons.org (simple-icons).
 *
 * Run from the app folder (nitrajsinh-solanki/):
 *   npm i -D devicon@2.17.0 simple-icons
 *   node scripts/self-host-icons.mjs
 *
 * It scans app/components/TechStack.tsx for DI("name"[, "variant"]) and
 * SI("slug"[, "hex"]) calls, copies each SVG into public/tech-icons/, and
 * (for simple-icons) bakes the colour in, exactly like the CDN URL did.
 * Exit code 1 if any icon cannot be found.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcFile = path.join(root, "app/components/TechStack.tsx");
const outDir = path.join(root, "public/tech-icons");
const diDir = path.join(root, "node_modules/devicon/icons");
const siDir = path.join(root, "node_modules/simple-icons/icons");

for (const [label, dir] of [["devicon", diDir], ["simple-icons", siDir]]) {
  if (!fs.existsSync(dir)) {
    console.error(`Missing ${label}. Run: npm i -D devicon@2.17.0 simple-icons`);
    process.exit(1);
  }
}

const src = fs.readFileSync(srcFile, "utf8");
const di = new Map();
const si = new Map();
for (const m of src.matchAll(/\bDI\(\s*"([^"]+)"(?:\s*,\s*"([^"]+)")?\s*\)/g)) {
  const variant = m[2] ?? "original";
  di.set(`${m[1]}-${variant}`, { name: m[1], variant });
}
for (const m of src.matchAll(/\bSI\(\s*"([^"]+)"(?:\s*,\s*"([^"]+)")?\s*\)/g)) {
  const hex = (m[2] ?? "ffffff").toLowerCase();
  si.set(`si-${m[1]}-${hex}`, { slug: m[1], hex });
}

fs.mkdirSync(outDir, { recursive: true });
const missing = [];
let written = 0;

for (const [key, { name, variant }] of di) {
  const from = path.join(diDir, name, `${name}-${variant}.svg`);
  if (!fs.existsSync(from)) {
    if (!fs.existsSync(path.join(outDir, `${key}.svg`))) missing.push(`devicon: ${name}/${name}-${variant}.svg  (or add public/tech-icons/${key}.svg yourself)`);
    continue;
  }
  fs.copyFileSync(from, path.join(outDir, `${key}.svg`));
  written++;
}
for (const [key, { slug, hex }] of si) {
  const from = path.join(siDir, `${slug}.svg`);
  if (!fs.existsSync(from)) {
    if (!fs.existsSync(path.join(outDir, `${key}.svg`))) missing.push(`simple-icons: ${slug}.svg  (or add public/tech-icons/${key}.svg yourself)`);
    continue;
  }
  let svg = fs.readFileSync(from, "utf8");
  if (!/\sfill=/.test(svg.split(">")[0])) svg = svg.replace("<svg ", `<svg fill="#${hex}" `);
  fs.writeFileSync(path.join(outDir, `${key}.svg`), svg);
  written++;
}

console.log(`devicon: ${di.size} unique | simple-icons: ${si.size} unique | written: ${written} -> public/tech-icons/`);
if (missing.length) {
  console.error("\nNOT FOUND (pick another icon, or keep this one on the CDN):");
  for (const m of missing) console.error("  - " + m);
  process.exit(1);
}
console.log("All icons found.");
