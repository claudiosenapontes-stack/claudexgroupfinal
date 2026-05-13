"use client";

import dynamic from "next/dynamic";

const ContainerScene = dynamic(() => import("./ContainerScene"), {
  ssr: false,
  loading: () => null,
});

export default function ContainerSceneWrapper({ activeSector }: { activeSector: number }) {
  return <ContainerScene activeSector={activeSector} />;
}
