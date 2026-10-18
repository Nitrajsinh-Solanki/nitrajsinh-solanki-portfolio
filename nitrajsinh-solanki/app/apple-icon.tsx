import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const alt = "Nitrajsinh Solanki portfolio icon";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 40,
          background: "#F8F7F3",
          color: "#17191D",
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: -4,
        }}
      >
        NS<span style={{ color: "#4F46E5" }}>.</span>
      </div>
    ),
    { ...size }
  );
}
