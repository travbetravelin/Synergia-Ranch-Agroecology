import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workshops — Synergia Ranch Agroecology",
};

export default function WorkshopsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-2">Workshops</h1>
      <p className="opacity-60 mb-10">Hands-on learning in agroecology, land restoration, and regenerative practice.</p>
      <p className="opacity-50 italic">[Workshop listings to be added.]</p>
    </div>
  );
}
