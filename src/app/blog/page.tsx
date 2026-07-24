import type { Metadata } from "next";
import Link from "next/link";
import { getContentItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Synergia Ranch Agroecology",
};

export default function BlogPage() {
  const posts = getContentItems("blog");

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-2">Blog</h1>
      <p className="opacity-60 mb-10">Research, reflections, and field reports from the ranch.</p>

      {posts.length === 0 ? (
        <p className="opacity-40 italic text-sm">No posts yet.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white rounded-xl p-6 shadow-sm border border-black/5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 style={{ color: "var(--water-dark)" }} className="text-lg font-bold mb-1">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm opacity-60 leading-relaxed mb-2">{post.excerpt}</p>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs opacity-40">
                    {post.date && <span>{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>}
                    {post.author && <span>· {post.author}</span>}
                  </div>
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 shrink-0">
                    {post.tags.slice(0, 3).map((tag) => (
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
