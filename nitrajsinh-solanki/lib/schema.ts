import {
  SITE_URL, SITE_NAME, LOCATION, ALTERNATE_NAMES, SAME_AS, abs,
} from "./site";
import { profile } from "./profile";

export const PERSON_ID = abs("/#person");
export const WEBSITE_ID = abs("/#website");

export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE_NAME,
    givenName: profile.givenName,
    familyName: profile.familyName,
    alternateName: ALTERNATE_NAMES.length ? ALTERNATE_NAMES : undefined,
    url: SITE_URL,
    image: abs("/profile.jpg"),
    email: profile.email,
    description: profile.tagline,
    jobTitle: profile.role.title,
    worksFor: { "@type": "Organization", name: profile.role.org },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Government Engineering College, Patan" },
    address: {
      "@type": "PostalAddress",
      addressLocality: LOCATION.city || undefined,
      addressRegion: LOCATION.region,
      addressCountry: LOCATION.country,
    },
    knowsAbout: profile.knowsAbout,
    award: profile.awards.map((item) => item.text),
    sameAs: SAME_AS,
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "en-IN",
    publisher: { "@id": PERSON_ID },
  };
}

export const homeGraph = () => ({
  "@context": "https://schema.org",
  "@graph": [websiteNode(), personNode()],
});

export const profilePageGraph = (path: string) => ({
  "@context": "https://schema.org",
  "@graph": [{
    "@type": "ProfilePage",
    "@id": abs(path + "#profilepage"),
    url: abs(path),
    name: SITE_NAME + ": " + profile.headline,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  }, personNode()],
});

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: abs(item.path),
  })),
});
