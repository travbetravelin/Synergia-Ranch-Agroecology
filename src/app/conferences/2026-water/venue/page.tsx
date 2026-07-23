import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Venue — Synergia 2026",
};

const photos = [
  { src: "/images/dining-hall-length.jpg", alt: "Dining hall at Synergia Ranch", caption: "Dining Hall" },
  { src: "/images/dining-hall-coffee.jpg", alt: "Coffee area in the dining hall", caption: "Dining Hall — Coffee Area" },
  { src: "/images/dance-hall-tables.jpg", alt: "Dance hall set with tables", caption: "Dance Hall" },
  { src: "/images/dance-studio.jpg", alt: "Dolphin dance studio", caption: "Dance Studio" },
];

export default function VenuePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-2">
        Venue
      </h1>
      <p className="opacity-60 mb-10">Synergia Ranch</p>

      {/* Aerial hero */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-lg mb-10" style={{ height: "340px" }}>
        <Image
          src="/images/ranch-aerial.jpg"
          alt="Aerial view of Synergia Ranch"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">About the Space</h2>
        <p className="text-sm opacity-70 leading-relaxed mb-4">
          Synergia Ranch is a historic working ranch and ecological research center with decades
          of history in ecological experimentation, community living, and land stewardship. It
          provides an extraordinary setting for a conference on regenerative solutions — the land
          itself is a living demonstration of the practices we gather to discuss.
        </p>
        <p className="text-sm opacity-70 leading-relaxed">
          The ranch features a dining hall, performance spaces including the Dome and Dance Studio,
          working orchards, arroyos, and extensive grounds shaped by years of land restoration
          work — all woven into the conference program.
        </p>
      </section>

      {/* Photo gallery */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Facilities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {photos.map((p) => (
            <div key={p.src} className="rounded-xl overflow-hidden shadow-sm">
              <div className="relative" style={{ height: "220px" }}>
                <Image src={p.src} alt={p.alt} fill className="object-cover" />
              </div>
              <div className="bg-white px-4 py-2 text-sm font-medium opacity-70">{p.caption}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Key Spaces</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: "Dining Hall", desc: "Main gathering space for meals and large sessions" },
            { name: "Dance Studio", desc: "Keynotes and movement sessions" },
            { name: "The Dome", desc: "Evening programs and special performances" },
            { name: "Ranch Grounds", desc: "Botanical walks, arroyo tours, and field work" },
          ].map((space) => (
            <div
              key={space.name}
              className="bg-white rounded-xl p-5 border border-black/5 shadow-sm text-sm"
            >
              <p className="font-semibold mb-1">{space.name}</p>
              <p className="opacity-60">{space.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
