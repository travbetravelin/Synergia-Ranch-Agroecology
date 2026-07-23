import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Synergia Ranch Agroecology",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-6">About</h1>
      <div className="space-y-6 opacity-80 leading-relaxed">
        <h2 style={{ color: "var(--water-dark)" }} className="text-xl font-semibold">Synergia Ranch</h2>
        <p>[About the ranch — copy to be added.]</p>
        <h2 style={{ color: "var(--water-dark)" }} className="text-xl font-semibold">Agroecology Program</h2>
        <p>[About the agroecology program — copy to be added.]</p>
        <h2 style={{ color: "var(--water-dark)" }} className="text-xl font-semibold">Institute of Ecotechnics</h2>
        <p>[About the Institute of Ecotechnics — copy to be added.]</p>
      </div>
    </div>
  );
}
