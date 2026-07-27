import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getNodeConnections } from "@/lib/graph";
import { getContentItem, resolveWikilinks } from "@/lib/content";
import GraphPanel from "@/components/GraphPanel";

const TYPE_COLORS: Record<string, string> = {
  people: "#2b5f75",
  topic: "#6b8f71",
  place: "#9b7a5e",
  event: "#8b6bb1",
  blog: "#b85c38",
};

const TYPE_LABELS: Record<string, string> = {
  people: "Person",
  topic: "Topic",
  place: "Place",
  event: "Event",
  blog: "Post",
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { getGraphData } = await import("@/lib/graph");
  return getGraphData().nodes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const connections = getNodeConnections(slug);
  return { title: connections ? `${connections.node.title} — Knowledge Graph` : "Not Found" };
}

export default async function GraphNodePage({ params }: Props) {
  const { slug } = await params;
  const connections = getNodeConnections(slug);
  if (!connections) notFound();

  const { node, connected } = connections;

  // Blog posts live at /blog/[slug]
  if (node.type === "blog") redirect(`/blog/${slug}`);

  // Try to find content file for this node
  const typeMap: Record<string, Parameters<typeof getContentItem>[0]> = {
    people: "people",
    topic: "topic",
    place: "place",
    event: "event",
  };
  const contentType = typeMap[node.type];
  const content = contentType ? getContentItem(contentType, slug) : null;
  const resolvedBody = content ? resolveWikilinks(content.body) : null;

  const graphNodes = connected.filter((n) => n.type !== "blog");
  const relatedPosts = connected.filter((n) => n.type === "blog");

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link
        href="/graph"
        style={{ color: "var(--water)" }}
        className="text-sm underline underline-offset-2 hover:opacity-70 mb-8 inline-block"
      >
        ← Knowledge Graph
      </Link>

      {/* Node header */}
      <div className="flex items-center gap-3 mb-2">
        <span
          className="text-xs px-2 py-0.5 rounded-full text-white font-medium"
          style={{ backgroundColor: TYPE_COLORS[node.type] }}
        >
          {TYPE_LABELS[node.type]}
        </span>
      </div>
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-2 leading-tight">
        {node.title}
      </h1>
      {content?.role && <p className="opacity-50 text-sm mb-6">{content.role}</p>}

      <hr style={{ borderColor: "rgba(0,0,0,0.08)" }} className="mb-8" />

      {resolvedBody ? (
        <div className="prose mb-10">
          <MDXRemote
            source={resolvedBody}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      ) : (
        <p className="opacity-40 italic text-sm mb-10">No detailed notes yet for this node.</p>
      )}

      {/* Connected graph nodes */}
      {graphNodes.length > 0 && (
        <div>
          <h2 style={{ color: "var(--water-dark)" }} className="text-lg font-semibold mb-4">
            Connected nodes
          </h2>
          <div className="flex flex-wrap gap-2">
            {graphNodes.map((n) => (
              <Link
                key={n.slug}
                href={`/graph/${n.slug}`}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-white border border-black/10 hover:shadow-sm transition-shadow"
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: TYPE_COLORS[n.type] }}
                />
                {n.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related blog posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-8">
          <h2 style={{ color: "var(--water-dark)" }} className="text-lg font-semibold mb-4">
            Related posts
          </h2>
          <div className="space-y-2">
            {relatedPosts.map((n) => (
              <Link
                key={n.slug}
                href={`/blog/${n.slug}`}
                className="flex items-center gap-2 text-sm py-1.5 hover:opacity-70 transition-opacity"
                style={{ color: "#b85c38" }}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: "#b85c38" }} />
                {n.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <GraphPanel connected={connected} currentTitle={node.title} />
    </div>
  );
}
