"use client";

import { useState } from "react";
import Link from "next/link";
import type { GraphNode } from "@/lib/graph";

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
  return `/graph/${node.slug}`;
}

type Props = {
  connected: GraphNode[];
  currentTitle: string;
};

export default function GraphPanel({ connected, currentTitle }: Props) {
  const [open, setOpen] = useState(false);

  const grouped = Object.entries(TYPE_LABELS).reduce<Record<string, GraphNode[]>>(
    (acc, [type]) => {
      acc[type] = connected.filter((n) => n.type === type);
      return acc;
    },
    {}
  );

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ backgroundColor: "var(--water-dark)", color: "white" }}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 px-2 py-4 rounded-l-lg shadow-lg text-xs font-medium writing-mode-vertical hover:opacity-90 transition-opacity"
        aria-label="Toggle connections panel"
        title="Related nodes"
      >
        <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", display: "block" }}>
          Connections {connected.length > 0 && `(${connected.length})`}
        </span>
      </button>

      {/* Slide-out panel */}
      <div
        className={`fixed right-0 top-0 bottom-0 z-50 w-72 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "white", borderLeft: "1px solid rgba(0,0,0,0.08)" }}
      >
        {/* Header */}
        <div
          style={{ backgroundColor: "var(--water-dark)", color: "white" }}
          className="flex items-center justify-between px-4 py-3 shrink-0"
        >
          <div>
            <p className="text-xs opacity-60 uppercase tracking-wide">Connected to</p>
            <p className="font-semibold text-sm truncate">{currentTitle}</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="opacity-70 hover:opacity-100 transition-opacity text-lg leading-none ml-4"
            aria-label="Close panel"
          >
            ×
          </button>
        </div>

        {/* Graph link */}
        <Link
          href="/graph"
          style={{ backgroundColor: "var(--sand)", color: "var(--water-dark)" }}
          className="flex items-center gap-2 px-4 py-2 text-xs font-medium hover:opacity-80 transition-opacity shrink-0 border-b border-black/5"
        >
          <span>⬡</span> View full knowledge graph →
        </Link>

        {/* Connected nodes grouped by type */}
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
