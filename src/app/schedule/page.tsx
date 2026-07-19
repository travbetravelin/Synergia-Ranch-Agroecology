import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Schedule — 2026 Synergia Ranch Conference",
};

type Session = {
  time: string;
  title: string;
  titleUrl?: string;
  speaker?: string;
  speakerUrl?: string;
  speakers?: { name: string; url?: string }[];
  note?: string;
  italic?: boolean;
  type?: "keynote" | "breakout" | "social" | "ceremony" | "meal";
  location?: string;
  breakoutOptions?: string[];
};

type Day = {
  label: string;
  date: string;
  sessions: Session[];
};

const schedule: Day[] = [
  {
    label: "Thursday",
    date: "July 16",
    sessions: [
      { time: "Afternoon", title: "Arrivals", note: "Check in and settle in at the ranch" },
      { time: "4:30–5:15 pm", title: "Historical Tour of the Ranch", type: "social", location: "Dance Studio" },
      { time: "5:30–6:00 pm", title: "Toasts & Welcome Speech", note: "Rounds of introductions", type: "social", location: "Dance Studio" },
      { time: "6:00–7:00 pm", title: "Dinner", type: "meal" },
    ],
  },
  {
    label: "Friday",
    date: "July 17 — Day 1",
    sessions: [
      { time: "8:00–8:45 am", title: "Breakfast", type: "meal" },
      { time: "9:00–9:15 am", title: "Opening Water Ceremony", note: "All participants bring water to add to a shared vessel. Prayer and communal mixing to open the conference.", type: "ceremony" },
      { time: "9:15–9:45 am", title: "Walk Through Arroyos and Orchard" },
      { time: "9:45 am", title: "Opening Speech" },
      { time: "10:00–11:00 am", title: "Water is Life: Cultivating Roots, Connections, and Movement", speaker: "Jan-Willem Jansens, Ecotone Landscape Planning", speakerUrl: "/speakers#jan-willem-jansens", type: "keynote", note: "Inaugural keynote" },
      { time: "11:00–11:15 am", title: "Break" },
      { time: "11:15 am–12:15 pm", title: "Wild Plants, Herbs and Churro Sheep", speaker: "Joyce Skeet, Spirit Farm", speakerUrl: "/speakers#joyce-skeet", type: "keynote" },
      { time: "12:15–1:15 pm", title: "Lunch", type: "meal" },
      { time: "1:30–2:15 pm", title: "Botanical Walk", speaker: "Mike Halverson, Santa Ana Native Plants", speakerUrl: "/speakers#mike-halverson" },
      { time: "2:15–3:00 pm", title: "Growing Resilience Through Trees For Food and Fodder", speaker: "Austin Unruh, Trees for Graziers", speakerUrl: "/speakers#austin-unruh", type: "keynote" },
      {
        time: "3:00–5:00 pm",
        title: "Practical Breakout Sessions",
        type: "breakout",
        breakoutOptions: [
          "Building Erosion Control Structures — Jan-Willem Jansens",
          "Movement and Metaphor, Body as Earth — Kristin Swiat",
          "Biochar in Practice — James Skeet, Spirit Farm",
        ],
      },
      { time: "5:00–5:30 pm", title: "Tea & Personal Time" },
      { time: "5:30–6:00 pm", title: "Free time and Socializing" },
      { time: "6:00–7:00 pm", title: "Dinner — Dining Hall", type: "meal" },
      { time: "7:30–8:30 pm", title: "Poetry Session \"Flow\"", speaker: "Dave Neita", speakerUrl: "/activities#dave-neita", type: "social" },
      { time: "8:30–9:45 pm", title: "Music and Dance at Dome", type: "social" },
    ],
  },
  {
    label: "Saturday",
    date: "July 18 — Day 2",
    sessions: [
      { time: "8:00–8:45 am", title: "Breakfast", type: "meal" },
      {
        time: "9:00–9:45 am",
        title: "Optional Morning Sessions",
        type: "breakout",
        breakoutOptions: [
          "Nature Walk in the Arroyos",
          "Checking in on Work Done in Practical Sessions",
        ],
      },
      { time: "10:00–11:00 am", title: "Bio Cosmology and the Use of Biochar", speaker: "James Skeet", speakerUrl: "/speakers#james-skeet", type: "keynote" },
      { time: "11:00 am–12:00 pm", title: "Indigenous Decentralised Water Management and River Revival", speaker: "Indra Shekhar Singh", speakerUrl: "/speakers#indra-shekhar-singh", type: "keynote" },
      { time: "12:15–1:15 pm", title: "Lunch", type: "meal" },
      { time: "1:30–2:30 pm", title: "We Are The Land and Waters", speaker: "Amanda Bramble, Ampersand Sustainable Learning Center", speakerUrl: "/speakers#amanda-bramble", type: "keynote" },
      {
        time: "3:00–5:00 pm",
        title: "Breakout Sessions",
        type: "breakout",
        breakoutOptions: [
          "Building Erosion Control Structures — Jan-Willem Jansens",
          "Movement and Metaphor, Body as Earth — Kristin Swiat",
          "Biochar in Practice — David Sundberg, Santa Fe Farmers Market Institute",
          "Herbal Preparations — Joyce Skeet",
        ],
      },
      { time: "5:00–5:30 pm", title: "Tea & Personal Time" },
      { time: "5:30–6:00 pm", title: "Free time and Socializing" },
      { time: "6:00–7:00 pm", title: "Dinner — Dining Hall", type: "meal" },
      { time: "7:30–7:45 pm", title: "\"The Municipal Abattoir\"", speaker: "Chili Hawes · Dave Neita", note: "A rare, politically charged one-act play written in the late 1960s, exploring themes of totalitarianism and the loss of individual free will.", type: "social" },
      { time: "7:45–9:15 pm", title: "Music concert \"We Belong to the Land\" by Moonshine", speaker: "Nan Franzblau and Wind Coral", speakerUrl: "/activities#moonshine", type: "social" },
      { time: "9:15–10:15 pm", title: "Music and Dance at Dome", type: "social" },
    ],
  },
  {
    label: "Sunday",
    date: "July 19 — Day 3",
    sessions: [
      { time: "8:00–8:45 am", title: "Breakfast", type: "meal" },
      {
        time: "9:00–9:45 am",
        title: "Optional Morning Session",
        type: "breakout",
        breakoutOptions: [
          "Nature Walk in the Arroyos",
          "Checking in on Work Done in Practical Sessions",
        ],
      },
      { time: "10:00–11:00 am", title: "Step by lucky Step", speaker: "Chili Hawes", speakerUrl: "/speakers#chili-hawes", type: "keynote" },
      { time: "11:00 am–12:00 pm", title: "Restoring Eden: A Demonstration Project Challenging the \"Waste Water\" Paradigm and Celebrating Sustainable Cultures", speakers: [{ name: "Dr. Mark Nelson", url: "/speakers#mark-nelson" }, { name: "Meridel Rubenstein", url: "/speakers#meridel-rubenstein" }], type: "keynote" },
      { time: "12:15–1:15 pm", title: "Lunch", type: "meal" },
      { time: "1:30–2:15 pm", title: "Beyond the Liquid: Architectural Responses to the States and Crises of Water", speaker: "Nino Saggio", speakerUrl: "/speakers#nino-saggio", type: "keynote" },
      { time: "2:15–3:00 pm", title: "Water is Life: Pushing Back Against the Commodification of Water in New Mexico and Building Community Capacity of Stewarding Water Resources in Increasingly Arid Environments", speaker: "Zack Withers, Polk's Folly", speakerUrl: "/speakers#zack-withers" },
      {
        time: "3:00–5:00 pm",
        title: "Breakout Sessions",
        type: "breakout",
        breakoutOptions: [
          "Movement and Metaphor, Body as Earth — Kristin Swiat",
          "Building Erosion Control Structures — Jan-Willem Jansens",
        ],
      },
      { time: "5:00–5:30 pm", title: "Tea & Personal Time" },
      { time: "5:30–6:00 pm", title: "Free time and Socializing" },
      { time: "6:00–7:00 pm", title: "Dinner — Dining Hall", type: "meal" },
    ],
  },
  {
    label: "Monday",
    date: "July 20 — Departure",
    sessions: [
      { time: "7:30 am", title: "Early Breakfast Buffet", type: "meal" },
      { time: "8:00 am", title: "Check-out of Rooms", note: "Please have rooms cleared by 8:00 am" },
    ],
  },
];

const typeColors: Record<string, string> = {
  keynote: "#2b5f75",
  breakout: "#6b8f71",
  social: "#9b7a5e",
  ceremony: "#8b6bb1",
  meal: "#b0956a",
};

const typeLabels: Record<string, string> = {
  keynote: "Keynote",
  breakout: "Breakout",
  social: "Social",
  ceremony: "Ceremony",
  meal: "Meal",
};

const typeLocations: Record<string, string> = {
  keynote: "Dance Studio",
  breakout: "Dance Studio",
  social: "Geo Dome",
  meal: "Dining Hall",
};

const leaderLinks: Record<string, string> = {
  "Joyce Skeet": "/speakers#joyce-skeet",
  "Jan-Willem Jansens": "/speakers#jan-willem-jansens",
  "Kristin Swiat": "/activities#movement",
};

export default function SchedulePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 style={{ color: "var(--water-dark)" }} className="text-4xl font-bold mb-2">
        Schedule
      </h1>
      <p className="opacity-60 mb-10">July 16–20, 2026 · Synergia Ranch · Santa Fe, NM</p>

      <div className="flex flex-wrap gap-3 mb-10 text-xs">
        {Object.entries(typeLabels).map(([key, label]) => (
          <span
            key={key}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: typeColors[key] }}
          >
            {label}
            {typeLocations[key] && `, ${typeLocations[key]}`}
          </span>
        ))}
      </div>

      <div className="space-y-10">
        {schedule.map((day) => (
          <section key={day.label} id={day.label.toLowerCase()}>
            <div
              style={{ backgroundColor: "var(--water-dark)" }}
              className="text-white rounded-t-xl px-5 py-3"
            >
              <h2 className="text-lg font-bold">{day.label}</h2>
              <p className="text-sm opacity-70">{day.date}</p>
            </div>
            <div className="bg-white rounded-b-xl shadow-sm border border-black/5 divide-y divide-black/5">
              {day.sessions.map((s, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[130px_1fr] gap-4 items-start px-5 py-3"
                >
                  <p className="text-xs opacity-50 pt-0.5 font-mono tabular-nums">{s.time}</p>
                  <div>
                    <div className="flex items-start gap-2 flex-wrap">
                      {s.titleUrl ? (
                        <Link
                          href={s.titleUrl}
                          style={{ color: "var(--water)" }}
                          className="font-medium text-sm underline underline-offset-2 hover:opacity-70"
                        >
                          {s.title}
                        </Link>
                      ) : (
                        <p className={`font-medium text-sm${s.italic ? " italic opacity-60" : ""}`}>{s.title}</p>
                      )}
                      {s.type && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full text-white shrink-0"
                          style={{ backgroundColor: typeColors[s.type] }}
                        >
                          {typeLabels[s.type]}
                          {(s.location ?? typeLocations[s.type]) && `, ${s.location ?? typeLocations[s.type]}`}
                        </span>
                      )}
                    </div>
                    {s.speaker && (
                      <p className="text-xs opacity-60 mt-0.5">
                        {s.speakerUrl ? (
                          <Link href={s.speakerUrl} style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">
                            {s.speaker}
                          </Link>
                        ) : s.speaker}
                      </p>
                    )}
                    {s.speakers && (
                      <p className="text-xs opacity-60 mt-0.5">
                        {s.speakers.map((sp, i) => (
                          <span key={sp.name}>
                            {i > 0 && " · "}
                            {sp.url ? (
                              <Link href={sp.url} style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">
                                {sp.name}
                              </Link>
                            ) : sp.name}
                          </span>
                        ))}
                      </p>
                    )}
                    {s.note && (
                      <p className="text-xs opacity-50 mt-1">{s.note}</p>
                    )}
                    {s.breakoutOptions && (
                      <ul className="mt-2 space-y-1">
                        {s.breakoutOptions.map((opt) => {
                          const [session, leader] = opt.split(" — ");
                          return (
                            <li key={opt} className="text-xs flex gap-1.5 items-baseline">
                              <span className="opacity-40 shrink-0">→</span>
                              <span>
                                {session === "Movement and Metaphor, Body as Earth" ? (
                                  <Link href="/activities#movement" style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">
                                    <strong>{session}</strong>
                                  </Link>
                                ) : (
                                  <strong>{session}</strong>
                                )}
                                {leader && (
                                  <span className="opacity-60">
                                    {" — "}
                                    {leaderLinks[leader] ? (
                                      <Link href={leaderLinks[leader]} style={{ color: "var(--water)" }} className="underline underline-offset-2 hover:opacity-70">
                                        {leader}
                                      </Link>
                                    ) : leader}
                                  </span>
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
