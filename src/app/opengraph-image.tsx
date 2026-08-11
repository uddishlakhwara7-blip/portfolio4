import { ImageResponse } from "next/og";
import OgImageCard from "@/components/og-image-card";

export const alt = "Uddish Lakhwara — Frontend Developer & 3D UI Designer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<OgImageCard />, { ...size });
}
