import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Nitrajsinh",
    description: "Full-stack developer portfolio",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F7F3",
    theme_color: "#F8F7F3",
    icons: [
      { src: "/icon-192.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/icon-512.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
