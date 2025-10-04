// AlphericComingSoon.tsx
import  { useState } from "react";
import alphericLogo from "@/assets/logo.png";
import comingSoonRing from "@/assets/comming-soon.gif";
import background from "@/assets/background.jpg";
import container from "@/assets/container.png";
import facebook from "@/assets/facebook.png";
import instagram from "@/assets/instagram.png";
import twitter from "@/assets/twitter.png";
import linkedin from "@/assets/linkedin.png";
import youtube from "@/assets/youtube.png";
import ContactModal from "@/pages/form";

export default function AlphericComingSoon() {
  const [open, setOpen] = useState(false);
  return (
    <main className="min-[1024px]:h-screen h-auto w-full bg-white text-[#0b0b0b]">
      {/* Desktop: 2-col with gap; Tablet/Mobile: stacked with vertical gap */}
      <div
        className="
          flex flex-col h-full w-full
          flex-rows-[minmax(320px,48vh)_1fr]
          md:grid-rows-[minmax(72vh,72vh)_1fr]   /* taller top at tablet */
          gap-y-10 md:gap-y-14 lg:gap-y-0
          lg:flex-row lg:grid-cols-[0.36fr_0.64fr]
          lg:gap-x-16 xl:gap-x-24 2xl:gap-x-28
        "
      >
        {/* ========== LEFT (visual) — smaller on desktop, first on mobile ========== */}
        <section
          className="
            relative order-1 max-[1024px]:min-w-full
            h-[65vh] md:h-[72vh] lg:h-full 
            min-[1240px]:min-w-[600px] min-[1240px]:max-w-[600px] max-[1240px]:max-w-[480px] max-[1240px]:min-w-[480px] 
          "
        >
          {/* Background */}
          <div
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
          />
          {/* Overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/55" />

          {/* Centered logo (top-center) — keep proportions; scale with width */}
          <div className="absolute left-1/2 top-10 -translate-x-1/2 sm:top-16">
            <img
              src={alphericLogo}
              alt="Alpheric"
              className="
                w-auto h-10 sm:h-11
                max-[1380px]:h-9                 /* 1380: smaller logo */
                max-[1200px]:h-8                 /* 1200: smaller again */
              "
            />
          </div>

          {/* Coming Soon ring (center) — scale with width at 1380/1200 */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <img
              src={comingSoonRing}
              alt="Coming Soon"
              className="
                w-auto h-64 md:h-72
                max-[1380px]:md:h-[260px]
                max-[1200px]:md:h-[232px]
              "
            />
          </div>

          {/* Bottom-left copy */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-7 pt-4 sm:px-14 sm:pb-10">
            <div>
              <h2
                className="
                  text-white font-medium font-poppins
                  text-lg md:text-[32px]
                  max-[1380px]:md:text-[28px]      /* 1380: reduce */
                  max-[1200px]:md:text-[24px]      /* 1200: reduce more */
                  max-sm:leading-tight             /* 640: tighter line-height */
                "
              >
                Innovation. Creativity. Growth.
              </h2>
              <p
                className="
                  mt-2 text-white/85 font-normal font-poppins text-justify
                  text-[13px] sm:text-[20px]
                  leading-[1.6] max-sm:leading-tight    /* fix + 640: no extra spacing */
                  max-[1380px]:sm:text-[18px]           /* 1380: reduce */
                  max-[1200px]:sm:text-[16px]           /* 1200: reduce more */
                "
              >
                We’re working behind the scenes to bring you a brand-new digital
                experience that will redefine how brands connect, grow, and
                succeed online.
              </p>
            </div>
          </div>
        </section>

        {/* ========== RIGHT (content) — wider on desktop, second on mobile ========== */}
        <section className="order-2 flex h-full w-full items-center">
          <div className="w-full px-6 sm:px-10 lg:pl-2 xl:pl-6 lg:pr-10 xl:pr-16 2xl:pr-24">
            {/* Heading */}
            <h1
              className="
                font-semibold tracking-[-0.01em]
                text-[28px] sm:text-[34px] lg:text-[48px]
                leading-tight max-sm:leading-tight        /* 640: tighter lines */
                max-[1380px]:lg:text-[44px]               /* 1380: reduce */
                max-[1200px]:lg:text-[40px]               /* 1200: reduce more */
              "
            >
              Something exciting is coming!
            </h1>

            {/* Paragraph (fix invalid leading-12) */}
            <p
              className="
                mt-4 max-w-4xl text-black/70
                text-base sm:text-[28px]
                leading-[1.6] max-sm:leading-tight        /* 640: no loose spacing */
                max-[1380px]:sm:text-[26px]               /* 1380: reduce */
                max-[1200px]:sm:text-[24px]               /* 1200: reduce more */
              "
            >
              Our new website is launching soon, a space built for ideas, impact,
              and possibilities. Stay tuned for the Alpheric experience! 💡✨
            </p>

            <div className="mt-12 space-y-2">
              <p
                className="
                  text-[28px] text-black/60
                  max-sm:leading-tight
                  max-[1380px]:text-[24px]
                  max-[1200px]:text-[22px]
                "
              >
                Shall we chat?
              </p>
              <a
                href="mailto:hello@alpheric.com"
                className="
                  font-semibold decoration-black/20 underline-offset-4 hover:decoration-black break-words
                  text-[28px] sm:text-[36px]
                  max-[1380px]:sm:text-[32px]
                  max-[1200px]:sm:text-[28px]
                  max-sm:text-[22px] max-sm:leading-tight
                  hover:underline
                "
              >
                hello@alpheric.com
              </a>
            </div>

            {/* Let’s talk — scale at 1380/1200; 640: tight lines */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-4 sm:gap-5 ">
                <span
                  className="
                    font-semibold leading-none
                    text-[48px] sm:text-[56px] lg:text-[87px]
                    max-[1380px]:lg:text-[78px]   /* 1380 */
                    max-[1200px]:lg:text-[70px]   /* 1200 */
                    max-[1080px]:lg:text-[60px]   /* 1080 */
                    max-sm:leading-tight          /* 640 */
                  "
                >
                  Let’s
                </span>
                <img
                  src={container}
                  alt="Avatar/Pill"
                  className="
                    h-10 w-16 sm:w-24 sm:h-[72px]        /* fix invalid */
                    max-[1380px]:sm:h-[64px] max-[1380px]:sm:w-[88px]
                    max-[1200px]:sm:h-[56px] max-[1200px]:sm:w-[84px]
                  "
                />
                <span
                  className="
                    font-semibold leading-none
                    text-[48px] sm:text-[56px] lg:text-[87px]
                    max-[1380px]:lg:text-[78px]
                    max-[1200px]:lg:text-[70px]
                    max-[1080px]:lg:text-[60px]
                    max-sm:leading-tight
                  "
                >
                  talk
                </span>
                <span
  onClick={() => setOpen(true)}
  aria-label="Open contact form"
  className="
    inline-flex items-center justify-center rounded-full
    w-15 h-12 sm:w-20 sm:h-15 lg:w-27 lg:h-20
    text-xl sm:text-2xl lg:text-3xl
    bg-transparent text-current
    transition-all duration-200 ease-out
    hover:bg-black hover:text-white hover:scale-95
    active:scale-90
    max-sm:leading-tight
  "
>
  →
</span>
              </div>

              

              <ContactModal open={open} onClose={() => setOpen(false)} onSubmit={() => {}} />
            </div>

            {/* Socials */}
            <div className="mt-6 lg:mb-0 mb-12 flex items-center gap-2.5 sm:gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="
                    grid place-items-center rounded-md border border-[#d6eef3] bg-[#eaf7f9]
                    shadow-[0_1px_0_rgba(0,0,0,0.03)] transition hover:bg-[#def2f5]
                    h-8 w-8 sm:h-10 sm:w-10
                    max-[1380px]:sm:h-9 max-[1380px]:sm:w-9
                    max-[1200px]:sm:h-8 max-[1200px]:sm:w-8
                  "
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={s.icon}
                    alt={s.label}
                    className="
                      h-4 w-4 sm:h-5 sm:w-5
                      max-[1380px]:sm:h-4 max-[1380px]:sm:w-4
                      max-[1200px]:sm:h-3.5 max-[1200px]:sm:w-3.5
                    "
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

const SOCIALS = [
  { label: "Facebook", href: "#", icon: facebook },
  { label: "Instagram", href: "#", icon: instagram },
  { label: "X", href: "#", icon: twitter },
  { label: "LinkedIn", href: "#", icon: linkedin },
  { label: "YouTube", href: "#", icon: youtube },
];
