"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { GraphNode } from "@/lib/graph";

const TYPE_COLORS: Record<string, string> = {
  people: "#2b5f75",
  topic: "#6b8f71",
  place: "#9b7a5e",
  event: "#8b6bb1",
  blog: "#b85c38",
};

const TYPE_LABELS: Record<string, string> = {
  people: "People",
  topic: "Topics",
  place: "Places",
  event: "Events",
  blog: "Posts",
};

function nodeHref(node: GraphNode): string {
  return node.type === "blog" ? `/blog/${node.slug}` : `/graph/${node.slug}`;
}

type Props = {
  connected: GraphNode[];
  currentNode: GraphNode;
};

function MiniGraph({ currentNode, connected }: { currentNode: GraphNode; connected: GraphNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    let unmount: (() => void) | null = null;

    const allNodes = [currentNode, ...connected];
    const graphData = {
      nodes: allNodes.map((n) => ({ ...n })),
      links: connected.map((n) => ({ source: currentNode.id, target: n.id })),
    };

    import("react-force-graph-2d").then((mod) => {
      const ForceGraph2D = mod.default;
      const { createRoot } = require("react-dom/client");
      const root = createRoot(el);

      root.render(
        <ForceGraph2D
          graphData={graphData}
          width={el.clientWidth}
          height={el.clientHeight}
          nodeLabel="title"
          nodeVal={(node: GraphNode) => node.id === currentNode.id ? 12 : 7}
          nodeCanvasObject={(node: GraphNode & { x?: number; y?: number }, ctx: CanvasRenderingContext2D, globalScale: number) => {
            const isCurrent = node.id === currentNode.id;
            const r = isCurrent ? 9 : 6;
            const fontSize = Math.max(9, 11 / globalScale);

            ctx.beginPath();
            ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, 2 * Math.PI);
            ctx.fillStyle = TYPE_COLORS[node.type] ?? "#888";
            ctx.fill();

            if (isCurrent) {
              ctx.strokeStyle = "#fff";
              ctx.lineWidth = 2;
              ctx.stroke();
            }

            if (globalScale >= 0.5) {
              ctx.font = `${isCurrent ? "bold " : ""}${fontSize}px sans-serif`;
              ctx.fillStyle = isCurrent ? "#111" : "#444";
              ctx.textAlign = "center";
              ctx.fillText(node.title, node.x ?? 0, (node.y ?? 0) + r + fontSize);
            }
          }}
          linkColor={() => "rgba(0,0,0,0.15)"}
          linkWidth={1}
          onNodeClick={(node: GraphNode) => {
            if (node.id !== currentNode.id) router.push(nodeHref(node));
          }}
          cooldownTicks={80}
          d3AlphaDecay={0.03}
          d3VelocityDecay={0.4}
          onEngineStop={() => {}}
          enableZoomInteraction={false}
          enablePanInteraction={false}
        />
      );

      unmount = () => root.unmount();
    });

    return () => { unmount?.(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNode.id]);

  return <div ref={containerRef} className="w-full h-full" />;
}

export default function GraphPanel({ connected, currentNode }: Props) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"graph" | "list">("graph");

  const grouped = (Object.entries(TYPE_LABELS) as [string, string][]).reduce<Record<string, GraphNode[]>>(
    (acc, [type]) => {
      acc[type] = connected.filter((n) => n.type === type);
      return acc;
    },
    {}
  );

  return (
    <>
      {/* Toggle button — fixed to right edge */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 shadow-lg hover:opacity-90 transition-opacity p-0 border-0 bg-transparent"
        aria-label="Toggle connections panel"
        title="Related nodes"
      >
        <span
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            display: "flex",
            alignItems: "center",
            padding: "16px 8px",
            fontSize: "12px",
            fontWeight: 500,
            whiteSpace: "nowrap",
            backgroundColor: "var(--water-dark)",
            color: "white",
            borderRadius: "8px 0 0 8px",
          }}
        >
          Connections {connected.length > 0 && `(${connected.length})`}
        </span>
      </button>

      {/* Slide-out panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-80 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "white", borderLeft: "1px solid rgba(0,0,0,0.08)" }}
      >
        {/* Header */}
        <div
          style={{ backgroundColor: "var(--water-dark)", color: "white" }}
          className="flex items-center justify-between px-4 py-3 shrink-0"
        >
          <div className="min-w-0">
            <p className="text-xs opacity-60 uppercase tracking-wide">Connected to</p>
            <p className="font-semibold text-sm truncate">{currentNode.title}</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="opacity-70 hover:opacity-100 transition-opacity text-lg leading-none ml-4 shrink-0"
            aria-label="Close panel"
          >
            ×
          </button>
        </div>

        {/* Graph / List toggle + full graph link */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-black/5 shrink-0"
          style={{ backgroundColor: "var(--sand)" }}>
          <div className="flex rounded overflow-hidden border border-black/10 text-xs">
            <button
              onClick={() => setView("graph")}
              className="px-3 py-1 transition-colors"
              style={{
                backgroundColor: view === "graph" ? "var(--water-dark)" : "transparent",
                color: view === "graph" ? "white" : "var(--water-dark)",
              }}
            >
              Graph
            </button>
            <button
              onClick={() => setView("list")}
              className="px-3 py-1 transition-colors"
              style={{
                backgroundColor: view === "list" ? "var(--water-dark)" : "transparent",
                color: view === "list" ? "white" : "var(--water-dark)",
              }}
            >
              List
            </button>
          </div>
          <Link
            href="/graph"
            style={{ color: "var(--water-dark)" }}
            className="text-xs font-medium hover:opacity-70 transition-opacity"
          >
            Full graph →
          </Link>
        </div>

        {/* Graph view */}
        {view === "graph" && (
          <div className="flex-1 relative">
            {connected.length === 0 ? (
              <p className="text-sm opacity-40 italic p-4">No connections found.</p>
            ) : (
              <MiniGraph currentNode={currentNode} connected={connected} />
            )}
          </div>
        )}

        {/* List view */}
        {view === "list" && (
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {connected.length === 0 && (
              <p className="text-sm opacity-40 italic">No connections found.</p>
            )}
            {Object.entries(grouped).map(([type, nodes]) => {
              if (nodes.length === 0) return null;
              return (
                <div key={type}>
                  <p
                    className="text-xs font-semibold uppercase tracking-wide mb-2"
                    style={{ color: TYPE_COLORS[type] }}
                  >
                    {TYPE_LABELS[type]}
                  </p>
                  <ul className="space-y-1">
                    {nodes.map((node) => (
                      <li key={node.slug}>
                        <Link
                          href={nodeHref(node)}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 text-sm py-1 hover:opacity-70 transition-opacity"
                        >
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: TYPE_COLORS[node.type] }}
                          />
                          {node.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
