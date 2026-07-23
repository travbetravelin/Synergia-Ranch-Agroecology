import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type NodeType = "people" | "topic" | "place" | "event";

export type GraphNode = {
  id: string;
  title: string;
  type: NodeType;
  slug: string;
};

export type GraphEdge = {
  source: string;
  target: string;
};

export type GraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

const CONTENT_DIR = path.join(process.cwd(), "content");

const TYPE_DIRS: Record<NodeType, string> = {
  people: "people",
  topic: "topics",
  place: "places",
  event: "events",
};

function readNodes(): GraphNode[] {
  const nodes: GraphNode[] = [];

  for (const [type, dir] of Object.entries(TYPE_DIRS) as [NodeType, string][]) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
      const { data } = matter(raw);
      nodes.push({
        id: data.slug as string,
        title: data.title as string,
        type,
        slug: data.slug as string,
      });
    }
  }

  return nodes;
}

function readEdges(nodes: GraphNode[]): GraphEdge[] {
  const nodeIds = new Set(nodes.map((n) => n.id));
  const edgeSet = new Set<string>();
  const edges: GraphEdge[] = [];

  for (const [, dir] of Object.entries(TYPE_DIRS)) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
      const { data } = matter(raw);
      const source = data.slug as string;
      const links = (data.links as string[]) ?? [];

      for (const target of links) {
        if (!nodeIds.has(target)) continue;
        // Deduplicate bidirectional edges
        const key = [source, target].sort().join("--");
        if (edgeSet.has(key)) continue;
        edgeSet.add(key);
        edges.push({ source, target });
      }
    }
  }

  return edges;
}

export function getGraphData(): GraphData {
  const nodes = readNodes();
  const edges = readEdges(nodes);
  return { nodes, edges };
}

export function getNodeConnections(slug: string): { node: GraphNode; connected: GraphNode[] } | null {
  const { nodes, edges } = getGraphData();
  const node = nodes.find((n) => n.id === slug);
  if (!node) return null;

  const connectedIds = edges
    .filter((e) => e.source === slug || e.target === slug)
    .map((e) => (e.source === slug ? e.target : e.source));

  const connected = nodes.filter((n) => connectedIds.includes(n.id));
  return { node, connected };
}
