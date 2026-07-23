import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Synergia Ranch Agroecology",
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-2">Blog</h1>
      <p className="opacity-60 mb-10">Research, reflections, and field reports from the ranch.</p>
      <p className="opacity-50 italic">[Posts to be added.]</p>
    </div>
  );
}
