import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ActivityBioCard from "@/components/ActivityBioCard";

export const metadata: Metadata = {
  title: "Activities — Synergia 2026",
};

const GeoDome = () => (
  <svg viewBox="0 0 48 36" className="w-9 h-9 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="1" y1="34" x2="47" y2="34" />
    <path d="M 1 34 A 23 23 0 0 1 47 34" />
    <line x1="24" y1="11" x2="24" y2="34" />
    <line x1="1" y1="34" x2="24" y2="11" />
    <line x1="47" y1="34" x2="24" y2="11" />
    <path d="M 8.5 24 A 16 7 0 0 1 39.5 24" />
    <line x1="8.5" y1="24" x2="24" y2="11" />
    <line x1="39.5" y1="24" x2="24" y2="11" />
  </svg>
);

type Activity = {
  icon: React.ReactNode;
  title: string;
  lead: string;
  description: React.ReactNode;
  note?: React.ReactNode;
  id?: string;
  bio?: string;
  images?: string[];
};

const activities: Activity[] = [
  {
    icon: "🪨",
    title: "Building Erosion Control Structures",
    lead: "Jan-Willem Jansens, Ecotone Landscape Planning",
    description: (
      <>
        Hands-on restoration work on the ranch lands with{" "}
        <Link href="/speakers#jan-willem-jansens" style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">
          Jan-Willem Jansens
        </Link>
        , including building erosion control structures from ecologically harvested piñon-juniper materials and the Shram Dan (gift of labor) sessions. A direct opportunity to learn and contribute to regenerative land stewardship.
      </>
    ),
    note: (
      <>
        <Link href="/schedule#friday" style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">Friday</Link>
        {", "}
        <Link href="/schedule#saturday" style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">Saturday</Link>
        {" & "}
        <Link href="/schedule#sunday" style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">Sunday</Link>
        {" · 3:00–5:00 pm"}
      </>
    ),
  },
  {
    icon: "🔥",
    title: "Biochar in Practice",
    lead: "James Skeet, Spirit Farm · David Sundberg, Santa Fe Farmers Market Institute",
    description: (
      <>
        In these two two-hour sessions — led by{" "}
        <Link href="/speakers#james-skeet" style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">
          James Skeet
        </Link>{" "}
        on{" "}
        <Link href="/schedule#friday" style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">
          Friday
        </Link>{" "}
        and David Sundberg (Santa Fe Farmers Market Institute) on{" "}
        <Link href="/schedule#saturday" style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">
          Saturday
        </Link>{" "}
        — participants will learn how to make Biochar at a small farm scale. Various barrels for burning will be used, and the principles behind why Biochar is useful for composting and regenerating soils will be uncovered.
      </>
    ),
    note: (
      <>
        <span>James Skeet, Spirit Farm · Friday · 3:00–5:00 pm</span>
        <br />
        <span>David Sundberg · Saturday · 3:00–5:00 pm</span>
      </>
    ),
  },
  {
    icon: "🌸",
    title: "Herbal Preparations",
    lead: "Joyce Skeet, Spirit Farm",
    description: (
      <>
        Following{" "}
        <Link href="/speakers#joyce-skeet" style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">
          her talk on Friday
        </Link>
        ,{" "}
        <Link href="/speakers#joyce-skeet" style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">
          Joyce Skeet
        </Link>{" "}
        takes us on a two-hour practical session making Herbal Preparations with native herbs.
        {" "}This hands-on workshop provides the experience to make herbal salves, transforming herbal infused oils into soothing, natural healing salves. This experience will also provide you with the understanding to make your own herbal tinctures. We will also provide a demonstration to make nutritional syrups using local growing plants.
      </>
    ),
    note: "Joyce Skeet, Spirit Farm · Saturday · 3:00–5:00 pm",
  },
  {
    icon: "💃",
    title: "Movement and Metaphor, Body as Earth",
    id: "movement",
    lead: "Kristin Swiat · Stonegate Farm, Balmville, NY",
    description: (
      <>
        <p>Using earth-based metaphor and imagery as a source of our movement explorations can help us to inhabit our bodies more fully and move more freely. We will use our time together to move, to rest, to get out of our heads and into our bodies but also to integrate what we have learned and experienced at the conference using a variety of methods including somatic movement, embodied journaling and Authentic Movement.</p>
        <p>Somatic movement is an approach of listening to your body&apos;s sensations and cues, needs and desires, moving from the inside out based on feeling rather than aesthetic consideration.</p>
        <p>We will begin with a gentle warm up and movement meditation, moving into an Authentic Movement practice. This practice is done in pairs, involving movement with eyes closed while being observed by a neutral witness before alternating roles. Discussion afterwards around your experience as both the mover and the witness concludes a profound practice of being with yourself while also holding space for others.</p>
        <p>These sessions are open to all bodies.</p>
      </>
    ),
    bio: "Kristin Swiat, originally from the Shawangunk Mountains area of New York State, is a performer, bodyworker, textile artist, and farmer based in Brooklyn. She has performed in works across Europe and New York since graduating with a BFA in dance from Juilliard in 2003, and has maintained a trauma-informed, massage-based bodywork practice since graduating from the Swedish Institute in 2010, incorporating Somatic Experiencing, Craniosacral Therapy, Focusing, and other embodied practices. Deeply influenced by a season spent in 2020 living and working on the farm at Synergia Ranch, she is currently the farm manager at Stonegate Farm in Balmville, NY. Her primary interest is exploring the spaces where art and healing connect.",
    images: ["/images/kristin-swiat.jpeg"],
    note: "Friday, Saturday & Sunday · 3:00–5:00 pm",
  },
  {
    icon: <GeoDome />,
    title: "Historical Tour of Ranch Facilities",
    lead: "Synergia Ranch Hosts",
    description:
      "A guided tour of the ranch's history, architecture, and decades of ecological and community experimentation. Learn about the unique story of Synergia Ranch and its place in regenerative land stewardship.",
    note: "Thursday · 4:30–5:15 pm",
  },
  {
    icon: "🌾",
    title: "Walk Through Arroyos and Orchard",
    lead: "Ranch Guides",
    description:
      "Explore the living landscape of Synergia Ranch — walking the arroyos that channel seasonal water through the land, and through the working orchard that represents years of arid-land food cultivation.",
    note: "Friday · 9:15–9:45 am",
  },
  {
    icon: "🌱",
    title: "Botanical Walk",
    lead: "Mike Halverson",
    description:
      "A guided botanical walk identifying native and cultivated plants in the ranch environment, with a focus on water-adapted species and land relationships.",
    note: "Mike Halverson · Friday · 1:30–2:15 pm",
  },
  {
    icon: "🎵",
    id: "moonshine",
    title: "Music Concert 'We Belong to the Land'",
    lead: "MoonShine · Nan Franzblau and Wind Coral",
    description: "MoonShine distills the essence of folk, the luster of harmony, and a deep love for the beauties of our life-sustaining Earth into luminous, heartfelt song. Nan Franzblau and Wind Coral have been sharing their original anthems with audiences in their hometown of Silver City, New Mexico for nine years, performing regularly at community events, the Silver City Farmers Market, cafes, restaurants, celebrations, and on community radio. Audiences attest to the magic woven by MoonShine, describing the duo's arrangements as a reverie of \"stunning harmonies and imagery,\" and \"the takeaway…..an expanded, happy and peaceful heart.\"",
    images: ["/images/moonshine.jpeg", "/images/moonshine-2.jpeg", "/images/moonshine-3.jpeg"],
    note: "Saturday · 8:00–9:30 pm",
  },
  {
    icon: "🎤",
    id: "dave-neita",
    title: "Poetry Session \"Flow\"",
    lead: "Dave Neita",
    description: "Dave will host an epic poetry jamming session where poets can have the occasion to read a poem they wrote or that they love. Dave will also present his poetry.",
    bio: "David Neita is a celebrated lawyer, with expertise in human rights and is widely regarded as one of the most engaging and informative social justice practitioners in London. He is also a published spoken word poet who has performed and led poetry workshops for a range of groups. He is dedicated to the mission of advancing empowerment through poetry, politics and public service. Called to the Bar of England & Wales in 2000, David was a member of the legal team, which brought the largest group action claim in the UK on behalf of thousands of South African asbestos miners.",
    images: ["/images/dave-neita.JPG"],
    note: "Friday · 7:45–8:45 pm",
  },
];

export default function ActivitiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-2">
        Activities
      </h1>
      <p className="opacity-60 mb-3">
        Beyond the formal sessions,{" "}
        <Link href="/" style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">
          Synergia 2026
        </Link>{" "}
        offers a range of participatory activities woven throughout the three days.
      </p>
      <p className="text-sm opacity-40 italic mb-10">
        Final activity schedule will be confirmed closer to the event.
      </p>

      {/* Arroyo restoration photo */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-md mb-10" style={{ height: "280px" }}>
        <Image
          src="/images/arroyo.jpg"
          alt="Aerial view of restoration work in the arroyo at Synergia Ranch"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute bottom-0 left-0 right-0 px-5 py-3 text-white text-sm" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}>
          Restoration work in the arroyo at Synergia Ranch
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-start">
        {activities.map((a) =>
          a.bio || a.images ? (
            <ActivityBioCard
              key={a.title}
              id={a.id}
              icon={a.icon}
              title={a.title}
              lead={a.lead}
              description={a.description}
              bio={a.bio}
              images={a.images}
              note={a.note}
            />
          ) : (
            <div
              key={a.title}
              id={a.id}
              className="bg-white rounded-xl p-6 border border-black/5 shadow-sm"
            >
              <div className="text-3xl mb-3">{a.icon}</div>
              <h2 className="text-base font-semibold mb-1">{a.title}</h2>
              <p className="text-xs opacity-50 mb-3">{a.lead}</p>
              <p className="text-sm opacity-70 leading-relaxed">{a.description}</p>
              {a.note && (
                <p className="text-xs opacity-50 mt-2 font-mono">{a.note}</p>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
