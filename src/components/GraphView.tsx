"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { GraphData, GraphNode } from "@/lib/graph";

const TYPE_COLORS: Record<string, string> = {
  people: "#2b5f75",
  topic: "#6b8f71",
  place: "#9b7a5e",
  event: "#8b6bb1",
};

const TYPE_LABELS: Record<string, string> = {
  people: "People",
  topic: "Topic",
  place: "Place",
  event: "Event",
};

type Props = {
  data: GraphData;
};

export default function GraphView({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      const typeToPath: Record<string, string> = {
        people: `/conferences/2026-water/speakers#${node.slug}`,
        topic: `/graph?highlight=${node.slug}`,
        place: `/graph?highlight=${node.slug}`,
        event: `/conferences/2026-water`,
      };
      router.push(typeToPath[node.type] ?? `/graph?highlight=${node.slug}`);
    },
    [router]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    let fg: { _destructor?: () => void } | null = null;

    import("react-force-graph-2d").then((mod) => {
      const ForceGraph2D = mod.default;
      const { createRoot } = require("react-dom/client");

      const graphData = {
        nodes: data.nodes.map((n) => ({ ...n })),
        links: data.edges.map((e) => ({ source: e.source, target: e.target })),
      };

      const root = createRoot(el);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      root.render(
        <ForceGraph2D
          graphData={graphData}
          width={el.clientWidth}
          height={el.clientHeight}
          nodeLabel="title"
          nodeColor={(node: GraphNode) => TYPE_COLORS[node.type] ?? "#888"}
          nodeVal={8}
          linkColor={() => "rgba(0,0,0,0.12)"}
          linkWidth={1.5}
          onNodeClick={handleNodeClick}
          nodeCanvasObject={(node: GraphNode & { x?: number; y?: number }, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const label = node.title;
            const fontSize = Math.max(10, 13 / globalScale);
            const r = 6;
            ctx.beginPath();
            ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, 2 * Math.PI);
            ctx.fillStyle = TYPE_COLORS[node.type] ?? "#888";
            ctx.fill();
            if (globalScale >= 0.8) {
              ctx.font = `${fontSize}px sans-serif`;
              ctx.fillStyle = "#222";
              ctx.textAlign = "center";
              ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + r + fontSize);
            }
          }}
          cooldownTicks={100}
        />
      );

      fg = { _destructor: () => root.unmount() };
    });

    return () => {
      fg?._destructor?.();
    };
  }, [data, handleNodeClick]);

  return (
    <div className="flex flex-col h-full">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 px-6 py-3 border-b border-black/5 bg-white text-xs">
        {Object.entries(TYPE_LABELS).map(([type, label]) => (
          <span key={type} className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: TYPE_COLORS[type] }}
            />
            {label}
          </span>
        ))}
        <span className="opacity-40 ml-auto">Click a node to navigate · Scroll to zoom · Drag to pan</span>
      </div>
      <div ref={containerRef} className="flex-1" />
    </div>
  );
}
