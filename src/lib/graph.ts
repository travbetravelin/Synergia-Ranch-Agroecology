import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type NodeType = "people" | "topic" | "place" | "event" | "blog";

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
  blog: "blog",
};

// Blog uses .md or .mdx; others use .mdx only
const TYPE_EXTS: Record<NodeType, RegExp> = {
  people: /\.mdx$/,
  topic: /\.mdx$/,
  place: /\.mdx$/,
  event: /\.mdx$/,
  blog: /\.mdx?$/,
};

function readNodes(): GraphNode[] {
  const nodes: GraphNode[] = [];

  for (const [type, dir] of Object.entries(TYPE_DIRS) as [NodeType, string][]) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;
    const ext = TYPE_EXTS[type];

    const files = fs.readdirSync(dirPath).filter((f) => ext.test(f));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
      const { data } = matter(raw);
      const slug = (data.slug as string) ?? file.replace(/\.mdx?$/, "");
      nodes.push({
        id: slug,
        title: (data.title as string) ?? slug,
        type,
        slug,
      });
    }
  }

  return nodes;
}

function readEdges(nodes: GraphNode[]): GraphEdge[] {
  const nodeIds = new Set(nodes.map((n) => n.id));
  const edgeSet = new Set<string>();
  const edges: GraphEdge[] = [];

  for (const [type, dir] of Object.entries(TYPE_DIRS) as [NodeType, string][]) {
    const dirPath = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(dirPath)) continue;
    const ext = TYPE_EXTS[type];

    const files = fs.readdirSync(dirPath).filter((f) => ext.test(f));
    for (const file of files) {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
      const { data } = matter(raw);
      const source = (data.slug as string) ?? file.replace(/\.mdx?$/, "");
      const links = (data.links as string[]) ?? [];

      for (const target of links) {
        if (!nodeIds.has(target)) continue;
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
