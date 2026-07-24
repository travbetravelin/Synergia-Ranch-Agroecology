"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { createRoot } from "react-dom/client";
import type { GraphData, GraphNode } from "@/lib/graph";

const TYPE_COLORS: Record<string, string> = {
  people: "#2b5f75",
  topic: "#6b8f71",
  place: "#9b7a5e",
  event: "#8b6bb1",
};

const TYPE_LABELS: Record<string, string> = {
  people: "People",
  topic: "Topics",
  place: "Places",
  event: "Events",
};

function nodeHref(node: GraphNode): string {
  if (node.type === "people") return `/conferences/2026-water/speakers#${node.slug}`;
  if (node.type === "event") return `/conferences/2026-water`;
  return "#";
}


type Props = {
  data: GraphData;
};

export default function GraphView({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTypes, setActiveTypes] = useState<Set<string>>(
    new Set(Object.keys(TYPE_LABELS))
  );

  // Compute which node IDs are in the highlighted subgraph
  const highlightedIds = useCallback((): Set<string> | null => {
    if (!selectedId) return null;
    const connected = new Set<string>([selectedId]);
    for (const e of data.edges) {
      if (e.source === selectedId) connected.add(e.target);
      if (e.target === selectedId) connected.add(e.source);
    }
    return connected;
  }, [selectedId, data.edges]);

  const selectedNode = selectedId ? data.nodes.find((n) => n.id === selectedId) : null;
  const connectedNodes = selectedId
    ? data.nodes.filter((n) => {
        if (n.id === selectedId) return false;
        return data.edges.some(
          (e) =>
            (e.source === selectedId && e.target === n.id) ||
            (e.target === selectedId && e.source === n.id)
        );
      })
    : [];

  const filteredNodes = data.nodes.filter((n) => activeTypes.has(n.type));
  const filteredNodeIds = new Set(filteredNodes.map((n) => n.id));
  const filteredEdges = data.edges.filter(
    (e) => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target)
  );

  const toggleType = (type: string) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        if (next.size === 1) return prev; // keep at least one
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
    setSelectedId(null);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;
    let unmount: (() => void) | null = null;

    import("react-force-graph-2d").then((mod) => {
      const ForceGraph2D = mod.default;

      const graphData = {
        nodes: filteredNodes.map((n) => ({ ...n })),
        links: filteredEdges.map((e) => ({ source: e.source, target: e.target })),
      };

      const highlighted = highlightedIds();

      const root = createRoot(el);

      root.render(
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          width={el.clientWidth}
          height={el.clientHeight}
          nodeLabel="title"
          nodeVal={8}
          linkColor={(link: { source: { id?: string }; target: { id?: string } }) => {
            if (!highlighted) return "rgba(0,0,0,0.12)";
            const sid = typeof link.source === "object" ? link.source.id : link.source;
            const tid = typeof link.target === "object" ? link.target.id : link.target;
            return highlighted.has(sid as string) && highlighted.has(tid as string)
              ? "rgba(0,0,0,0.5)"
              : "rgba(0,0,0,0.04)";
          }}
          linkWidth={(link: { source: { id?: string }; target: { id?: string } }) => {
            if (!highlighted) return 1.5;
            const sid = typeof link.source === "object" ? link.source.id : link.source;
            const tid = typeof link.target === "object" ? link.target.id : link.target;
            return highlighted.has(sid as string) && highlighted.has(tid as string) ? 2.5 : 0.5;
          }}
          onNodeClick={(node: GraphNode) => {
            setSelectedId((prev) => (prev === node.id ? null : node.id));
          }}
          onBackgroundClick={() => setSelectedId(null)}
          nodeCanvasObject={(
            node: GraphNode & { x?: number; y?: number },
            ctx: CanvasRenderingContext2D,
            globalScale: number
          ) => {
            const isHighlighted = !highlighted || highlighted.has(node.id);
            const isSelected = node.id === selectedId;
            const label = node.title;
            const fontSize = Math.max(10, 13 / globalScale);
            const r = isSelected ? 9 : 6;
            const alpha = isHighlighted ? 1 : 0.15;

            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, 2 * Math.PI);
            ctx.fillStyle = TYPE_COLORS[node.type] ?? "#888";
            ctx.fill();

            if (isSelected) {
              ctx.strokeStyle = "#fff";
              ctx.lineWidth = 2;
              ctx.stroke();
            }

            if (globalScale >= 0.7) {
              ctx.font = `${isSelected ? "bold " : ""}${fontSize}px sans-serif`;
              ctx.fillStyle = isSelected ? "#111" : "#333";
              ctx.textAlign = "center";
              ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + r + fontSize);
            }
            ctx.globalAlpha = 1;
          }}
          cooldownTicks={150}
          d3AlphaDecay={0.015}
          d3VelocityDecay={0.3}
          onEngineStop={() => fgRef.current?.zoomToFit(400, 60)}
        />
      );

      setTimeout(() => {
        fgRef.current?.d3Force("charge")?.strength(-350).distanceMax(500);
        fgRef.current?.d3Force("link")?.distance(100);
        fgRef.current?.d3ReheatSimulation();
      }, 100);

      unmount = () => root.unmount();
    });

    return () => { unmount?.(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, filteredNodes.length, filteredEdges.length, selectedId]);

  return (
    <div className="flex flex-col h-full relative">
      {/* Controls bar */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-2 border-b border-black/5 bg-white text-xs shrink-0">
        {/* Type filters */}
        <div className="flex items-center gap-1.5">
          {Object.entries(TYPE_LABELS).map(([type, label]) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className="flex items-center gap-1 px-2 py-1 rounded-full border transition-opacity"
              style={{
                borderColor: TYPE_COLORS[type],
                backgroundColor: activeTypes.has(type) ? TYPE_COLORS[type] : "transparent",
                color: activeTypes.has(type) ? "white" : TYPE_COLORS[type],
                opacity: activeTypes.has(type) ? 1 : 0.5,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-black/10" />

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => fgRef.current?.zoom(1.5, 300)}
            className="px-2 py-1 rounded border border-black/10 hover:bg-black/5 transition-colors"
            title="Zoom in"
          >+</button>
          <button
            onClick={() => fgRef.current?.zoom(0.67, 300)}
            className="px-2 py-1 rounded border border-black/10 hover:bg-black/5 transition-colors"
            title="Zoom out"
          >−</button>
          <button
            onClick={() => fgRef.current?.zoomToFit(400, 40)}
            className="px-2 py-1 rounded border border-black/10 hover:bg-black/5 transition-colors"
            title="Fit view"
          >Fit</button>
        </div>

        {selectedId && (
          <>
            <div className="h-4 w-px bg-black/10" />
            <button
              onClick={() => setSelectedId(null)}
              className="px-2 py-1 rounded border border-black/10 hover:bg-black/5 transition-colors opacity-60"
            >
              Clear selection ×
            </button>
          </>
        )}

        <span className="opacity-30 ml-auto hidden sm:block">Click node to highlight · Click background to deselect</span>
      </div>

      {/* Graph canvas */}
      <div ref={containerRef} className="flex-1" />

      {/* Selected node info card */}
      {selectedNode && (
        <div
          className="absolute bottom-4 left-4 w-64 rounded-xl shadow-xl border border-black/5 overflow-hidden"
          style={{ backgroundColor: "white" }}
        >
          <div
            className="px-4 py-3"
            style={{ backgroundColor: TYPE_COLORS[selectedNode.type], color: "white" }}
          >
            <p className="text-xs opacity-70 uppercase tracking-wide mb-0.5">
              {TYPE_LABELS[selectedNode.type]?.slice(0, -1)}
            </p>
            <p className="font-semibold text-sm">{selectedNode.title}</p>
          </div>
          <div className="px-4 py-3">
            <p className="text-xs opacity-50 mb-2">
              {connectedNodes.length} connection{connectedNodes.length !== 1 ? "s" : ""}
            </p>
            {connectedNodes.length > 0 && (
              <ul className="space-y-1 mb-3">
                {connectedNodes.slice(0, 5).map((n) => (
                  <li key={n.id} className="flex items-center gap-1.5 text-xs">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: TYPE_COLORS[n.type] }}
                    />
                    <span
                      className="opacity-60 cursor-pointer hover:opacity-100"
                      onClick={() => setSelectedId(n.id)}
                    >
                      {n.title}
                    </span>
                  </li>
                ))}
                {connectedNodes.length > 5 && (
                  <li className="text-xs opacity-30">+{connectedNodes.length - 5} more</li>
                )}
              </ul>
            )}
            {nodeHref(selectedNode) !== "#" && (
              <a
                href={nodeHref(selectedNode)}
                style={{ color: TYPE_COLORS[selectedNode.type] }}
                className="text-xs font-medium underline underline-offset-2 hover:opacity-70"
              >
                Go to page →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
