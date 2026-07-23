import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteering — Synergia Ranch Agroecology",
};

export default function VolunteeringPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-2">Volunteering</h1>
      <p className="opacity-60 mb-10">Join us on the land at Synergia Ranch.</p>
      <p className="opacity-50 italic">[Volunteering opportunities and information to be added.]</p>
    </div>
  );
}
