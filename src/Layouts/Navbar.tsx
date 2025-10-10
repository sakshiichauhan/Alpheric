// // src/components/Navbar.tsx
// import { useState,type FC } from "react";
// import { ChevronDown, Menu, X } from "lucide-react"; 
// import Alphericlogo from "@/assets/Homepage/alpheric-icon.png";

// type MenuItem =
//   | "Pilot"
//   | "Consult"
//   | "Actions"
//   | "Network"
//   | "About"
//   | "Careers";

// const menuItems: { label: MenuItem; href: string; hasDropdown?: boolean }[] = [
//   { label: "Pilot", href: "#" },
//   { label: "Consult", href: "#about" },
//   { label: "Actions", href: "#design" },
//   { label: "Network", href: "#host" },
//   { label: "About", href: "#secure" },
//   { label: "Careers", href: "#market" },
// ];

// const Navbar: FC = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
//   const [activeItem, setActiveItem] = useState<MenuItem>("Consult");

//   const toggleMenu = () => setIsMenuOpen((prev) => !prev);
//   const handleItemClick = (item: MenuItem) => setActiveItem(item);

//   return (
//     <nav className="fixed top-0 left-0 w-full flex items-center justify-between font-urbanist px-4 sm:px-6 md:px-12 lg:px-[90px] py-5 bg-transparent backdrop-blur-md z-50">
//       {/* Logo */}
//       <div className="relative ml-0">
//         <img
//           src={Alphericlogo}
//           alt="Company logo"
//           className="w-[100px] h-[35px] sm:w-[130px] sm:h-[45px] md:w-[160px] md:h-[50px]"
//         />
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden lg:flex items-center gap-5 border border-white rounded-full px-4 py-2 text-base text-[#444444] backdrop-blur-lg mx-4 font-regular">
//         {menuItems.map(({ label, href, hasDropdown }) => (
//           <a
//             key={label}
//             href={href}
//             onClick={() => handleItemClick(label)}
//             className={`flex items-center gap-1 relative hover:bg-[#56c8dc]/30 rounded-4xl px-2.5 py-1.5 ${
//               activeItem === label
//                 ? "bg-[#56c8dc]/30 border border-blue-500"
//                 : ""
//             }`}
//           >
//             {label}
//             {hasDropdown && <ChevronDown size={15} />}
//           </a>
//         ))}
//       </div>

//       {/* Desktop Sign Up Button */}
//       <button className="hidden lg:block px-4 py-2 text-base font-regular rounded-full bg-white text-[#000000] hover:bg-[#56c8dc] transition">
//         Sign Up
//       </button>

//       {/* Mobile Toggle */}
//       <button
//         onClick={toggleMenu}
//         className="lg:hidden p-2 text-white focus:outline-none"
//         aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//       >
//         {isMenuOpen ? <X size={30} /> : <Menu size={30} color="black" />}
//       </button>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 right-0 w-4/5 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 p-10 ${
//           isMenuOpen ? "translate-x-0" : "translate-x-full"
//         } lg:hidden`}
//       >
//         <button
//           onClick={toggleMenu}
//           className="absolute top-5 right-5"
//           aria-label="Close menu"
//         >
//           <X size={30} />
//         </button>

//         <div className="flex flex-col items-start gap-6 mt-16 text-lg">
//           {menuItems.map(({ label, href }) => (
//             <a key={label} href={href} onClick={toggleMenu}>
//               {label}
//             </a>
//           ))}
//           <button className="w-full mt-6 px-5 py-3 text-lg font-regular rounded-full bg-white text-[#000000] hover:bg-[#56c8dc] hover:border-blue-500 transition">
//             Sign Up
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// If you’re on Next.js app router, keep this line.
// 'use client';















import * as React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  cubicBezier,
  type Transition,
  useSpring,
} from "framer-motion";
import {
  ChevronDown,
  ArrowUpRight,
  Menu as MenuIcon,
  X as XIcon,
} from "lucide-react";

import BlackLogo from "@/assets/logo/Blacklogo.png";

/* ---------------- Types & Data ---------------- */
type SubLink = { id: string; label: string; href: string; frontImg?: string; backImg?: string };
type MenuItem = { id: string; label: string; href?: string; items?: SubLink[]; variant?: "links" | "cards" };

const MENU: MenuItem[] = [
  { id: "Pilot",   label: "Pilot",   href: "/Pilot" },
  {
    id: "Consult", label: "Consult", href: "/Consult",
    items: [
      { id: "Design",  label: "Design",  href: "/Design"  },
      { id: "Build",   label: "Build",   href: "/Build"   },
      { id: "Host",    label: "Host",    href: "/Host"    },
      { id: "Secure",  label: "Secure",  href: "/Secure"  },
      { id: "Market",  label: "Market",  href: "/Market"  },
    ],
    variant: "links",
  },
  { id: "Actions", label: "Actions", href: "/Actions" },
  { id: "Network", label: "Network", href: "/Network" },
  { id: "About",   label: "About",   href: "/About"   },
  { id: "Careers", label: "Careers", href: "/Careers" },
];

/* ---------------- Utils ---------------- */
const SPRING: Transition = { type: "spring", stiffness: 420, damping: 32, mass: 0.8 };
const FADE:   Transition = { duration: 0.18, ease: cubicBezier(0.22, 1, 0.36, 1) };
const cx = (...xs: Array<string | false | null | undefined>) => xs.filter(Boolean).join(" ");

/* ---------------- Component ---------------- */
export default function Navbar() {
  const prefersReducedMotion = useReducedMotion();

  // Desktop-only animation gate
  const [isDesktop, setIsDesktop] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  // Scroll → smooth reversible playhead (0..1 by ~160px) — desktop only
  const { scrollY } = useScroll();
  const playRaw = useTransform(scrollY, [0, 160], [0, 1]);
  const play    = useSpring(playRaw, { stiffness: 220, damping: 28, mass: 0.9 });

  // PHASES: 1) width-travel, 2) styling
  const TRAVEL_END = 0.58;
  const travel = useTransform(play, v => (isDesktop ? (v <= 0 ? 0 : v >= TRAVEL_END ? 1 : v / TRAVEL_END) : 0));
  const stylin = useTransform(play, v => (isDesktop ? (v <= TRAVEL_END ? 0 : (v - TRAVEL_END) / (1 - TRAVEL_END)) : 0));

  // Phase 2 visuals (desktop only)
  const bgColor   = useTransform(stylin, [0, 1], ["rgba(0,0,0,0)", "white"]);
  const radius    = useTransform(stylin, [0, 1], ["0px", "9999px"]);
  const borderCol = useTransform(stylin, [0, 1], ["rgba(0,0,0,0)", "rgba(255,255,255,0.12)"]);
  const shadow    = useTransform(stylin, [0, 1], ["0 0 0 rgba(0,0,0,0)", "0 12px 36px rgba(0,0,0,0.28)"]);

  // Background "padding" illusion (VERTICAL): 24 → 8 (no vertical content shift)
  const CONTENT_H = 56;   // row content height (h-14)
  const PAD_Y_START = 24;
  const PAD_Y_END   = 8;
  const bgHeight = useTransform(
    stylin,
    [0, 1],
    [`${CONTENT_H + 2 * PAD_Y_START}px`, `${CONTENT_H + 2 * PAD_Y_END}px`]
  );

  // Background "padding" illusion (HORIZONTAL): 24 → 8 (no horizontal squeeze)
  const PAD_X_START = 24;
  const PAD_X_END   = 8;
  const SAFE_FUDGE  = 4; // to avoid final squeeze/clipping


  // Compact toggle for text classes
  const [compact, setCompact] = React.useState(false);
  useMotionValueEvent(stylin, "change", (v) => setCompact(v > 0.02));

  /* ---------- Measurement for width-driven travel ---------- */
  const shellRef = React.useRef<HTMLDivElement | null>(null);
  const rowRef   = React.useRef<HTMLDivElement | null>(null);
  const logoWrapRef = React.useRef<HTMLSpanElement | null>(null);
  const menuRef  = React.useRef<HTMLUListElement | null>(null);
  const ctaRef   = React.useRef<HTMLAnchorElement | null>(null);

  const [startW, setStartW]   = React.useState<number>(typeof window !== "undefined" ? window.innerWidth : 1440);
  const [targetW, setTargetW] = React.useState<number>(800);       // final frame width (for travel)
  const [contentW, setContentW] = React.useState<number>(0);       // measured content width (logo + gap + menu + gap + CTA)

  const CLUSTER_GAP = 8; // menu "mx-2" = 8px each side, matches li gap-2

  const measure = React.useCallback(() => {
    const logo  = logoWrapRef.current;
    const menu  = menuRef.current;
    const cta   = ctaRef.current;
    if (!logo || !menu || !cta) return;

    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    setStartW(vw);

    const logoW = Math.ceil(logo.getBoundingClientRect().width);
    const menuW = Math.ceil(menu.getBoundingClientRect().width);
    const ctaW  = Math.ceil(cta.getBoundingClientRect().width);

    const cw = logoW + CLUSTER_GAP + menuW + CLUSTER_GAP + ctaW;
    setContentW(cw);

    // final outer frame width that drives left/right travel (uses final horizontal pad 8)
    const finalW = cw + 2 * PAD_X_END + SAFE_FUDGE;
    setTargetW(finalW);
  }, []);

  React.useLayoutEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => measure());
    if (rowRef.current)      ro.observe(rowRef.current);
    if (menuRef.current)     ro.observe(menuRef.current);
    if (logoWrapRef.current) ro.observe(logoWrapRef.current);
    if (ctaRef.current)      ro.observe(ctaRef.current);

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [measure]);

  // Phase 1: frame width shrinks (desktop only) -> drives left/right travel
  const shellW  = useTransform(travel, (t) => startW + (targetW - startW) * t);

  // Phase 2: bg width animates to create px 24 → 8 illusion without touching content
  const bgWidth = useTransform(stylin, (s) => {
    const padX = PAD_X_START + (PAD_X_END - PAD_X_START) * s; // 24 → 8
    const w = contentW + 3 * padX + SAFE_FUDGE;
    return `${w}px`;
  });

  // Mobile/desktop state
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [deskOpen,   setDeskOpen]   = React.useState<string | null>(null);

  // Close menus on Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setDeskOpen(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4 sm:px-6 md:px-12 lg:px-[90px]">
      {/* FRAME: width shrink only. No bg/padding here. */}
      <motion.div
        ref={shellRef}
        style={{ width: isDesktop ? (shellW as any) : "100%" }}
        transition={FADE}
        className="relative pointer-events-auto"
      >
        {/* CAPSULE BACKGROUND (absolute, behind content). */}
        <motion.div
          aria-hidden
          className="absolute left-0 right-0 mx-auto pointer-events-none"
          style={{
            top: 0,
            bottom: 0,
            marginTop: "auto",
            marginBottom: "auto",
            height: isDesktop ? (bgHeight as any) : `${CONTENT_H + 2 * PAD_Y_END}px`,
            width: isDesktop ? (bgWidth as any) : "100%",
            backgroundColor: isDesktop ? (bgColor as any) : "transparent",
            borderRadius: isDesktop ? (radius as any) : 0,
            boxShadow: isDesktop ? (shadow as any) : "none",
            border: `1px solid`,
            borderColor: isDesktop ? (borderCol as any) : "transparent",
            zIndex: 0,
          }}
        />

        {/* CONTENT ROW (fixed height, above bg) */}
        <div
          ref={rowRef}
          className="relative z-10 flex h-14 items-center gap-0"
          style={{ width: "auto" }}
        >
          {/* LEFT: Logo */}
          <a href="/" className="flex items-center" aria-label="Homepage">
            <span ref={logoWrapRef} className="inline-flex items-center shrink-0">
              <div className="relative h-8">
                <motion.img
                  src={BlackLogo}
                  alt="logo"
                  className={`h-8 w-auto select-none pl-6`}
                  draggable={false}
                />
              </div>
            </span>
          </a>

          {/* FLEX SPACER (left) */}
          <div className="flex-1" />

          {/* CENTER: Menu (static) */}
          <div className="hidden lg:block">
            <ul 
            className="mx-2 flex items-center gap-2 rounded-full px-2 py-1"
            style={
              isDesktop
                ? {
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "transparent", // required with border-image
                    borderImageSource:
                      "linear-gradient(to right, #5AC8DC33, #B8F4FF1A, #FFFFFF)", // blue → white
                    borderImageSlice: 1, // <-- critical
                    borderRadius: 9999,
                  }
                : undefined
            }
             ref={menuRef}>
              {MENU.map((m) => {
                const open = deskOpen === m.id;
                const hasMenu = !!m.items?.length;
                return (
                  <li
                    key={m.id}
                    className="relative"
                    onMouseEnter={() => hasMenu && setDeskOpen(m.id)}
                    onMouseLeave={() => setDeskOpen(null)}
                  >
                    <button
                      className={cx(
                        "group inline-flex items-center gap-1 text-[16px] rounded-full px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2",
                       "text-black hover:bg-black/[0.05] focus-visible:ring-black/40"
                      )}
                      aria-haspopup={hasMenu ? "menu" : undefined}
                      aria-expanded={hasMenu ? open : undefined}
                      onClick={() => (hasMenu ? setDeskOpen(open ? null : m.id) : (window.location.href = m.href || "#"))}
                    >
                      {m.label}
                      {hasMenu && (
                        <ChevronDown
                          className="h-4 w-4 opacity-70 transition-transform duration-300"
                          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {hasMenu && open && (
                        <motion.div
                          key="dd"
                          role="menu"
                          initial={{ opacity: 0, y: -6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -6, scale: 0.98 }}
                          transition={prefersReducedMotion ? FADE : SPRING}
                          className={cx(
                            "absolute left-0 mt-2 min-w-[260px] rounded-2xl border p-2 shadow-xl","border-black/10 bg-white text-gray-900"
                          )}
                        >
                          <ul className="grid gap-1">
                            {m.items!.map((s) => (
                              <li key={s.id}>
                                <a
                                  href={s.href}
                                  role="menuitem"
                                  className={cx(
                                    "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm", "text-gray-800 hover:bg-gray-50"
                                  )}
                                >
                                  <span>{s.label}</span>
                                  <ArrowUpRight
                                    className={cx(
                                      "ml-auto h-4 w-4 transition", "opacity-50 group-hover:opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    )}
                                  />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })} 
            </ul>
          </div>

          {/* FLEX SPACER (right) */}
          <div className="flex-1" />

          {/* RIGHT: CTA */}
          <div className="flex items-center">
            <a
              ref={ctaRef}
              href="/inquiry"
              className={cx(
                "hidden lg:inline-flex shrink-0 items-center justify-center",
                "rounded-full px-6 text-sm font-medium h-14 text-[20px]",
                "focus-visible:outline-none focus-visible:ring-2",
                "transition-all duration-300",
                compact ?   "bg-black text-white hover:bg-black/90 focus-visible:ring-black/40" : "bg-white text-black hover:bg-white/90 focus-visible:ring-white/40"
                
              )}
            >
              Inquiry Now
            </a>

            {/* Burger (mobile only; no scroll anim on mobile) */}
            <button
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(v => !v)}
              className={cx(
                "ml-3 inline-flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden",
                "border-black/15 text-black hover:bg-black/[0.05]"
              )}
            >
              <motion.div initial={false} animate={{ rotate: mobileOpen ? 90 : 0 }} transition={FADE}>
                {mobileOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
