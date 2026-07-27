import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getContentItem, getContentItems, resolveWikilinks } from "@/lib/content";
import { getNodeConnections } from "@/lib/graph";
import GraphPanel from "@/components/GraphPanel";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getContentItems("blog").map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getContentItem("blog", slug);
  return { title: post ? `${post.title} — Blog` : "Post Not Found" };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getContentItem("blog", slug);
  if (!post) notFound();

  const resolvedBody = resolveWikilinks(post.body);
  const graphConnections = getNodeConnections(slug);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link
        href="/blog"
        style={{ color: "var(--water)" }}
        className="text-sm underline underline-offset-2 hover:opacity-70 mb-8 inline-block"
      >
        ← Blog
      </Link>

      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-3 leading-tight">
        {post.title}
      </h1>

      <div className="flex flex-wrap gap-3 text-xs opacity-50 mb-4">
        {post.date && (
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </span>
        )}
        {post.author && <span>· {post.author}</span>}
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "var(--sand)", color: "var(--water-dark)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <hr style={{ borderColor: "rgba(0,0,0,0.08)" }} className="mb-8" />

      <div className="prose">
        <MDXRemote
          source={resolvedBody}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>

      <GraphPanel
        connected={graphConnections?.connected ?? []}
        currentNode={{ id: slug, slug, title: post.title, type: "blog" }}
      />
    </div>
  );
}
