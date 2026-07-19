"use client";

import { useState } from "react";

type CoPresenter = {
  name: string;
  id?: string;
  role?: string;
  image?: string;
  imagePosition?: string;
  bio?: string;
};

type SpeakerCardProps = {
  id?: string;
  name: string;
  role?: string;
  bio?: string;
  talkTitle?: string;
  talkAbstract?: string;
  presentationUrl?: string;
  note?: string;
  image?: string;
  imagePosition?: string;
  coPresenter?: CoPresenter;
  images?: string[];
};

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="w-full h-full flex items-center justify-center text-2xl font-bold opacity-30" style={{ backgroundColor: "var(--sand)" }}>
      {initials}
    </div>
  );
}

export default function SpeakerCard(props: SpeakerCardProps) {
  const { id, name, role, bio, talkTitle, talkAbstract, presentationUrl, note, image, imagePosition, coPresenter, images } = props;
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const hasBio = !!bio;
  const hasCoBio = !!coPresenter?.bio;
  const hasGallery = !!images && images.length > 0;
  const isClickable = hasBio || hasCoBio || hasGallery;

  function handlePrev(e: React.MouseEvent) {
    e.stopPropagation();
    setImageIndex((i) => (i - 1 + images!.length) % images!.length);
  }
  function handleNext(e: React.MouseEvent) {
    e.stopPropagation();
    setImageIndex((i) => (i + 1) % images!.length);
  }

  return (
    <div
      id={id}
      className={`bg-white rounded-xl p-6 shadow-sm border border-black/5 flex flex-col${isClickable ? " cursor-pointer select-none" : ""}`}
      onClick={isClickable ? () => setOpen((o) => !o) : undefined}
      role={isClickable ? "button" : undefined}
      aria-expanded={isClickable ? open : undefined}
    >
      {/* Photos */}
      {coPresenter ? (
        <div className="flex gap-4 mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-black/10 shrink-0">
            {image ? (
              <img src={image} alt={name} className="object-cover w-full h-full" style={{ objectPosition: imagePosition ?? "center" }} />
            ) : (
              <Initials name={name} />
            )}
          </div>
          <div className="w-20 h-20 rounded-full overflow-hidden bg-black/10 shrink-0">
            <span id={coPresenter.id} />
            {coPresenter.image ? (
              <img src={coPresenter.image} alt={coPresenter.name} className="object-cover w-full h-full" style={{ objectPosition: coPresenter.imagePosition ?? "center" }} />
            ) : (
              <Initials name={coPresenter.name} />
            )}
          </div>
        </div>
      ) : image ? (
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-black/10 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full"
            style={{ objectPosition: imagePosition ?? "center" }}
          />
        </div>
      ) : null}

      {/* Primary presenter */}
      <h2 className="text-lg font-semibold mb-0.5">{name}</h2>
      {role && <p className="text-sm opacity-50 mb-1">{role}</p>}

      {/* Co-presenter name + role */}
      {coPresenter && (
        <div className="mt-2 mb-1">
          <h2 className="text-lg font-semibold mb-0.5">{coPresenter.name}</h2>
          {coPresenter.role && <p className="text-sm opacity-50">{coPresenter.role}</p>}
        </div>
      )}

      {talkTitle && (
        <p style={{ color: "var(--clay)" }} className="text-sm font-medium italic mb-2 mt-2">
          {talkTitle}
        </p>
      )}
      {talkAbstract && (
        <p className="text-sm opacity-70 leading-relaxed mb-3">{talkAbstract}</p>
      )}
      {presentationUrl && (
        <a
          href={presentationUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--water)" }}
          className="text-sm font-medium underline underline-offset-2 hover:opacity-70 mb-3 inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          View presentation →
        </a>
      )}
      {note && (
        <div className="text-xs opacity-50 mt-1 font-mono space-y-0.5">
          {note.split("\n").map((line, i) => <p key={i}>{line}</p>)}
        </div>
      )}
      {!bio && !talkAbstract && !hasGallery && (
        <p className="text-sm opacity-40 italic">Bio coming soon.</p>
      )}

      {isClickable && (
        <>
          <div
            className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[3000px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}
          >
            <div className="border-t border-black/10 pt-3 space-y-3">
              {hasGallery && (
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images![imageIndex]}
                    alt={`${name} photo ${imageIndex + 1}`}
                    className="w-full rounded-xl object-contain max-h-80"
                  />
                  {images!.length > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-2">
                      <button
                        onClick={handlePrev}
                        className="text-sm px-3 py-1 rounded-full border border-black/20 hover:bg-black/5 transition-colors"
                      >
                        ←
                      </button>
                      <span className="text-xs opacity-40">{imageIndex + 1} / {images!.length}</span>
                      <button
                        onClick={handleNext}
                        className="text-sm px-3 py-1 rounded-full border border-black/20 hover:bg-black/5 transition-colors"
                      >
                        →
                      </button>
                    </div>
                  )}
                </div>
              )}
              {hasBio && (
                <div className="text-sm opacity-60 leading-relaxed space-y-3">
                  {bio!.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
              {hasCoBio && (
                <div className="text-sm opacity-60 leading-relaxed space-y-3 pt-3 border-t border-black/10">
                  <p className="text-xs font-semibold opacity-80 uppercase tracking-wide">{coPresenter!.name}</p>
                  {coPresenter!.bio!.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p className="text-xs mt-3 opacity-40 self-start">
            {open
              ? hasGallery && !hasBio && !hasCoBio ? "Hide photos ↑" : "Hide ↑"
              : hasGallery && !hasBio && !hasCoBio ? "View photos ↓" : "Read bio ↓"}
          </p>
        </>
      )}
    </div>
  );
}
