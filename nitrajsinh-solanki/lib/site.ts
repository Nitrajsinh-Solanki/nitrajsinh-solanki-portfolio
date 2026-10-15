export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nitrajsinh-solanki.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Nitrajsinh Solanki";
export const LOCALE_BCP47 = "en-IN";
export const LOCALE_OG = "en_IN";
export const LAST_UPDATED = "2026-10-15";

export const LOCATION = {
  city: "",
  region: "Gujarat",
  country: "IN",
  countryName: "India",
};

export const LOCATION_LABEL = LOCATION.city
  ? LOCATION.city + ", " + LOCATION.region + ", " + LOCATION.countryName
  : LOCATION.region + ", " + LOCATION.countryName;

export const ALTERNATE_NAMES: string[] = [];

export const SOCIAL = {
  github: "https://github.com/Nitrajsinh-Solanki",
  linkedin: "https://www.linkedin.com/in/nitrajsinh-solanki-647b11293",
  x: "https://x.com/Nitrajsinh_S",
  xHandle: "@Nitrajsinh_S",
  medium: "https://medium.com/@nrsolanki2005",
};

export const SAME_AS = [SOCIAL.github, SOCIAL.linkedin, SOCIAL.x, SOCIAL.medium];

export const abs = (path = "/") =>
  SITE_URL + (path.startsWith("/") ? path : "/" + path);
