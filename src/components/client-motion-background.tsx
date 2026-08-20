"use client";

import dynamic from "next/dynamic";
import type { MotionMode } from "./motion-background";

const MotionBackground = dynamic(
  () => import("@/components/motion-background"),
  { ssr: false }
);

const MotionBackgroundControls = dynamic(
  () => import("@/components/motion-background-controls"),
  { ssr: false }
);

export default function ClientMotionBackground({ mode }: { mode?: MotionMode }) {
  return (
    <>
      <MotionBackground mode={mode} />
      <MotionBackgroundControls />
    </>
  );
}
