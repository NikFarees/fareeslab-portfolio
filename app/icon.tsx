import { ImageResponse } from "next/og";
import { ogColors } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          backgroundColor: ogColors.accent,
          color: "#fff",
          fontSize: 34,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        NF
      </div>
    ),
    size
  );
}
