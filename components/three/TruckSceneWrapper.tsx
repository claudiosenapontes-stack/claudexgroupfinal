"use client";

import dynamic from "next/dynamic";

const TruckScene = dynamic(() => import("./TruckScene"), {
  ssr: false,
  loading: () => null,
});

export default function TruckSceneWrapper({ progress }: { progress: number }) {
  return <TruckScene progress={progress} />;
}
