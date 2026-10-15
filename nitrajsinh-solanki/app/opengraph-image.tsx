import { ImageResponse } from "next/og";
import { SITE_NAME, LOCATION_LABEL } from "@/lib/site";

export const alt = "Nitrajsinh Solanki, full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#F8F7F3", color: "#17191D" }}>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 800 }}>{SITE_NAME}</div>
        <div style={{ display: "flex", fontSize: 40, color: "#4F46E5", marginTop: 16 }}>
          Full-Stack Developer · {LOCATION_LABEL}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#737780", marginTop: 28 }}>
          Next.js · React · .NET · Angular · Flutter
        </div>
      </div>
    ),
    { ...size }
  );
}
