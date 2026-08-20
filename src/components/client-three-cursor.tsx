"use client";

import dynamic from "next/dynamic";

const ThreeCursor = dynamic(() => import("@/components/three-cursor"), {
  ssr: false,
});

export default function ClientThreeCursor() {
  return <ThreeCursor />;
}
