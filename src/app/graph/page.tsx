import type { Metadata } from "next";
import { getGraphData } from "@/lib/graph";
import GraphPageClient from "@/components/GraphPageClient";

export const metadata: Metadata = {
  title: "Knowledge Graph — Synergia Ranch Agroecology",
};

export default function GraphPage() {
  const data = getGraphData();

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 64px)" }}>
      <div className="px-6 py-4 border-b border-black/5">
        <h1 style={{ color: "var(--water-dark)" }} className="text-2xl font-bold">
          Knowledge Graph
        </h1>
        <p className="text-sm opacity-50 mt-0.5">
          {data.nodes.length} nodes · {data.edges.length} connections
        </p>
      </div>
      <div className="flex-1 overflow-hidden">
        <GraphPageClient data={data} />
      </div>
    </div>
  );
}
