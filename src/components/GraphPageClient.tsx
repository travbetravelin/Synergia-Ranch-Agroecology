"use client";

import dynamic from "next/dynamic";
import type { GraphData } from "@/lib/graph";

const GraphView = dynamic(() => import("@/components/GraphView"), { ssr: false });

export default function GraphPageClient({ data }: { data: GraphData }) {
  return <GraphView data={data} />;
}
