import type { Metadata } from "next";
import { SITE_NAME, LOCALE_OG, SOCIAL, abs } from "./site";

export function truncate(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace < 0 ? cut : cut.slice(0, lastSpace))
    .replace(/[ ,;:.\-–—]+$/, "") + "…";
}

type Args = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  image?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image,
}: Args): Metadata {
  const desc = truncate(description);
  const socialImage = abs(image ?? "/opengraph-image");
  const socialTitle = title + " | " + SITE_NAME;
  return {
    title,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: abs(path),
      siteName: SITE_NAME,
      locale: LOCALE_OG,
      title: socialTitle,
      description: desc,
      images: [{ url: socialImage, width: 1200, height: 630, alt: socialTitle }],
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: desc,
      creator: SOCIAL.xHandle,
      images: [socialImage],
    },
  };
}
