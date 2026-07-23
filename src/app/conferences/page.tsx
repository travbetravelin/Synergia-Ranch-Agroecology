import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conferences — Synergia Ranch Agroecology",
};

const conferences = [
  {
    slug: "2026-water",
    title: "Water | Wind | Wisdom",
    dates: "July 17–19, 2026",
    location: "Synergia Ranch · Santa Fe, NM",
    description: "An international conference on regenerative solutions to desertification.",
    status: "upcoming",
  },
];

export default function ConferencesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-2">Conferences</h1>
      <p className="opacity-60 mb-10">Gatherings on regenerative land and water stewardship.</p>
      <div className="space-y-6">
        {conferences.map((c) => (
          <Link
            key={c.slug}
            href={`/conferences/${c.slug}`}
            className="block bg-white rounded-xl p-6 shadow-sm border border-black/5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 style={{ color: "var(--water-dark)" }} className="text-xl font-bold mb-1">{c.title}</h2>
                <p className="text-sm opacity-60 mb-2">{c.dates} · {c.location}</p>
                <p className="text-sm opacity-70">{c.description}</p>
              </div>
              {c.status === "upcoming" && (
                <span
                  style={{ backgroundColor: "var(--clay)", color: "white" }}
                  className="shrink-0 text-xs px-3 py-1 rounded-full font-medium"
                >
                  Upcoming
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
