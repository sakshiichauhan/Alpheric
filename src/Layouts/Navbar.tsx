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
import FocusLock from "react-focus-lock";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  useMotionValue,
  animate,
  cubicBezier,
  type Transition,
  useSpring, 
} from "framer-motion";
import {
  ChevronDown,
  ArrowUpRight,
  Menu as MenuIcon,
  X as XIcon,
  ArrowUpToLine,
  Dribbble,
  Linkedin,
  Instagram,
} from "lucide-react";

import BlackLogo from "@/assets/logo/Blacklogo.png";
import WhiteLogo from "@/assets/logo/WhiteLogo.png";

/* ---------------- Types & Data ---------------- */
type SubLink = { id: string; label: string; href: string; frontImg?: string; backImg?: string };
type MenuItem = { id: string; label: string; href?: string; items?: SubLink[]; variant?: "links" | "cards" };
type Social   = { id: string; label: string; href: string; icon: React.ReactNode };

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

const SOCIALS: Social[] = [
  { id: "dribbble", label: "Dribbble", href: "#", icon: <Dribbble className="h-4 w-4" /> },
  { id: "linkedin", label: "LinkedIn", href: "#", icon: <Linkedin className="h-4 w-4" /> },
  { id: "instagram", label: "Instagram", href: "#", icon: <Instagram className="h-4 w-4" /> },
];

/* ---------------- Utils ---------------- */
const SPRING: Transition = { type: "spring", stiffness: 420, damping: 32, mass: 0.8 };
const FADE:   Transition = { duration: 0.18, ease: cubicBezier(0.22, 1, 0.36, 1) };
const cx = (...xs: Array<string | false | null | undefined>) => xs.filter(Boolean).join(" ");

// helpers
const easeIO = cubicBezier(0.45, 0, 0.55, 1); 

/* ---------------- Component ---------------- */
export default function Navbar() {
  const prefersReducedMotion = useReducedMotion();

  // Scroll values
  const { scrollY } = useScroll();

  // Smooth, reversible playhead: 0 at top → 1 by ~160px scroll
  const playRaw = useTransform(scrollY, [0, 160], [0, 1]);
  const play    = useSpring(playRaw, { stiffness: 220, damping: 28, mass: 0.9 });

  // Split into phases (A = content glide, B = capsule)
  const a = useTransform(play, [0, 0.6], [0, 1]);   // early ease for logo/CTA
  const b = useTransform(play, [0.25, 1], [0, 1]);  // later ease for bar/capsule

  // Visuals driven by B (capsule)
  const bg        = useTransform(b, [0, 1], ["rgba(0,0,0,0)", "rgba(0,0,0,1)"]);
  const height    = useTransform(b, [0, 1], ["92px", "58px"]);
  const radius    = useTransform(b, [0, 1], ["0px", "9999px"]);
  const shadow    = useTransform(b, [0, 1], ["0 0 0 0 rgba(0,0,0,0)", "0 12px 36px rgba(0,0,0,0.28)"]);
  const borderCol = useTransform(b, [0, 1], ["rgba(0,0,0,0)", "rgba(255,255,255,0.12)"]);
  const fg        = useTransform(b, [0, 1], ["#111111", "#ffffff"]);

  // Subtle logo scale; offsets for travel
  const logoScale = useTransform(play, [0, 1], [1, 0.93]);
  const logoX     = useTransform(a,    [0, 1], ["-22px", "0px"]);
  const ctaX      = useTransform(a,    [0, 1], ["22px",  "0px"]);
  const fadeA     = useTransform(a,    [0, 1], [0, 1]);

  // Compact boolean
  const [compact, setCompact] = React.useState(false);
  useMotionValueEvent(b, "change", (v) => setCompact(v > 0.02));

  // Playhead we animate ourselves (0..1)
  const prog = useMotionValue(0);

  // Phase A: logo + CTA glide in (0 → 0.65 of prog)
useMotionValueEvent(b, "change", (v) => setCompact(v > 0.02));

  // Animate the playhead on first-scroll; ignore extra scroll until finished
  const animatingRef = React.useRef(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y <= 0 && !animatingRef.current) {
      // Smoothly reset when fully back to top
      animate(prog, 0, { duration: 0.35, ease: easeIO });
      return;
    }
    if (y > 0 && prog.get() === 0 && !animatingRef.current) {
      animatingRef.current = true;
      (async () => {
        // Phase A: logo & CTA glide in
        await animate(prog, 0.65, { duration: 0.85, ease: easeIO }).finished;
        // Phase B: capsule shrink + bg → black
        await animate(prog, 1,    { duration: 0.70, ease: easeIO }).finished;
        animatingRef.current = false;
      })();
    }
  });

  // Mobile/desktop menu state
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [deskOpen,   setDeskOpen]   = React.useState<string | null>(null);
  const [mobileSub,  setMobileSub]  = React.useState<string | null>(null);

  // Lock page scroll when mobile drawer open
  React.useEffect(() => {
    const html = document.documentElement;
    if (!mobileOpen) return;
    const y = window.scrollY;
    html.style.top = `-${y}px`;
    html.classList.add("overflow-hidden");
    return () => {
      html.classList.remove("overflow-hidden");
      const restore = parseInt(html.style.top || "0", 10) * -1;
      html.style.top = "";
      window.scrollTo(0, restore || 0);
    };
  }, [mobileOpen]);

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
    <nav className="fixed inset-x-0 top-4 z-50">
      {/* Shell: full-bleed at top; centered capsule on scroll */}
      <motion.div
  style={{ backgroundColor: bg, color: fg, height, borderRadius: radius, boxShadow: shadow, borderColor: borderCol }}
  transition={FADE}
  className={cx(
    "pointer-events-auto border",
    compact ? "block mx-auto w-fit" : "block w-full"
  )}
>
  <div
    className={cx(
      "flex h-full items-center gap-3",
      compact
        ? "px-3 sm:px-4 py-1.5"                   // tighter padding when compact
        : "px-4 sm:px-6 md:px-12 lg:px-[90px] py-0 justify-between"
    )}
  >

          {/* Brand (always visible; glides in on first scroll) */}
          <a href="/" className="flex items-center gap-3" aria-label="Homepage">
  <motion.span style={{ x: logoX, scale: logoScale }} className="inline-flex items-center gap-3">
    <img
      src={compact ? WhiteLogo : BlackLogo}
      alt="logo"
      className="h-8 w-auto select-none"
      draggable={false}
    />
  </motion.span>
</a>

          {/* Desktop nav */}
          <div className={cx("hidden lg:block", compact ? "" : "flex-1")}>
            <ul className={cx("flex items-center gap-2", compact ? "" : "justify-center")}>
              {MENU.map((m) => {
                const hasMenu = !!m.items?.length;
                const open = deskOpen === m.id;
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
                        compact
                          ? "text-white hover:bg-white/10 focus-visible:ring-white/40"
                          : "text-black hover:bg-black/[0.05] focus-visible:ring-black/40"
                      )}
                      aria-haspopup={hasMenu ? "menu" : undefined}
                      aria-expanded={hasMenu ? open : undefined}
                      onClick={() => (hasMenu ? setDeskOpen(open ? null : m.id) : (window.location.href = m.href || "#"))}
                    >
                      {m.label}
                      {hasMenu && (
                        <ChevronDown
                          className={cx(
                            "h-4 w-4 opacity-70 transition-transform duration-300",
                            open && "rotate-180"
                          )}
                        />
                      )}
                    </button>

                    {/* Dropdown theme follows bar */}
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
                            "absolute left-0 mt-2 min-w-[260px] rounded-2xl border p-2 shadow-xl",
                            compact ? "border-white/15 bg-black text-white" : "border-black/10 bg-white text-gray-900"
                          )}
                        >
                          <motion.ul
                            initial="hidden"
                            animate="show"
                            variants={{
                              hidden: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
                              show:   { transition: { staggerChildren: 0.03 } },
                            }}
                            className="grid gap-1"
                          >
                            {m.items!.map((s) => (
                              <motion.li
                                key={s.id}
                                variants={{
                                  hidden: { opacity: 0, y: 6 },
                                  show:   { opacity: 1, y: 0, transition: { duration: 0.16 } },
                                }}
                              >
                                <a
                                  href={s.href}
                                  role="menuitem"
                                  className={cx(
                                    "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                                    compact ? "hover:bg-white/10" : "text-gray-800 hover:bg-gray-50",
                                    m.variant === "cards" && "border border-black/5"
                                  )}
                                >
                                  {m.variant === "cards" && s.frontImg && (
                                    <span
                                      className={cx(
                                        "relative h-8 w-8 overflow-hidden rounded-md ring-1",
                                        compact ? "ring-white/15" : "ring-black/10"
                                      )}
                                    >
                                      <img src={s.frontImg} alt="" className="h-full w-full object-cover" loading="lazy" />
                                    </span>
                                  )}
                                  <span>{s.label}</span>
                                  <ArrowUpRight
                                    className={cx(
                                      "ml-auto h-4 w-4 transition",
                                      compact
                                        ? "opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        : "opacity-50 group-hover:opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    )}
                                  />
                                </a>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            {/* 56px CTA, glides in with Phase A */}
            <motion.a
  style={{ x: ctaX, opacity: fadeA }}
  href="/inquiry"
  className={cx(
    "hidden lg:inline-flex items-center justify-center rounded-full px-5 h-10 text-sm font-medium transition",
    compact
      ? "ml-2 bg-white text-black hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      : "pointer-events-none opacity-0" // hidden until compact
  )}
>
  Inquiry Now
</motion.a>

            {/* Burger */}
            <button
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(v => !v)}
              className={cx(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border transition lg:hidden",
                compact
                  ? "border-white/30 text-white hover:bg-white/10"
                  : "border-black/15 text-black hover:bg-black/[0.05]"
              )}
            >
              <motion.div initial={false} animate={{ rotate: mobileOpen ? 90 : 0 }} transition={FADE}>
                {mobileOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              </motion.div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* -------- Mobile Drawer -------- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/30 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={FADE}
              onClick={() => setMobileOpen(false)}
            />
            <FocusLock returnFocus>
              <motion.aside
                className="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-white shadow-xl lg:hidden"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={prefersReducedMotion ? FADE : SPRING}
              >
                <div className="flex items-center justify-between px-4 py-3">
                  <a href="/" className="flex items-center gap-2 text-gray-900" onClick={() => setMobileOpen(false)}>
                    <img src={BlackLogo} alt="logo" className="h-7 w-auto" />
                    <span className="hidden rounded bg-gray-900 px-2 py-1 text-xs font-semibold text-white sm:inline">
                      Alpheric
                    </span>
                  </a>
                  <button
                    className="rounded-full border border-black/10 p-2"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>

                <nav className="px-3 pb-8">
                  <ul className="space-y-2">
                    {MENU.map((m) => {
                      const hasMenu = !!m.items?.length;
                      const open = mobileSub === m.id;
                      return (
                        <li key={m.id} className="rounded-2xl border border-black/10">
                          <div className="flex items-center justify-between">
                            <a
                              href={m.href || "#"}
                              className="flex-1 px-4 py-3 text-base font-medium text-gray-900"
                              onClick={() => setMobileOpen(false)}
                            >
                              {m.label}
                            </a>
                            {hasMenu && (
                              <button
                                className="px-3 py-3 text-gray-600"
                                aria-expanded={open}
                                onClick={() => setMobileSub(open ? null : m.id)}
                              >
                                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="inline-flex">
                                  <ChevronDown className="h-4 w-4" />
                                </motion.span>
                              </button>
                            )}
                          </div>

                          <AnimatePresence initial={false}>
                            {hasMenu && open && (
                              <motion.div
                                key="collapsible"
                                initial="collapsed"
                                animate="open"
                                exit="collapsed"
                                variants={{
                                  open: { height: "auto", transition: { when: "beforeChildren", staggerChildren: 0.03 } },
                                  collapsed: { height: 0 },
                                }}
                                transition={prefersReducedMotion ? FADE : SPRING}
                                className="overflow-hidden"
                              >
                                <motion.ul variants={{ open: {}, collapsed: {} }} className="grid gap-1 px-2 pb-3 pt-1">
                                  {m.items!.map((s) => (
                                    <motion.li
                                      key={s.id}
                                      variants={{ open: { opacity: 1, y: 0 }, collapsed: { opacity: 0, y: 6 } }}
                                      transition={{ duration: 0.16 }}
                                    >
                                      <a
                                        href={s.href}
                                        className={cx(
                                          "group flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-gray-800 hover:bg-gray-50",
                                          m.variant === "cards" && "border border-black/5"
                                        )}
                                        onClick={() => setMobileOpen(false)}
                                      >
                                        {m.variant === "cards" && s.frontImg && (
                                          <span className="relative h-10 w-10 overflow-hidden rounded-lg ring-1 ring-black/10">
                                            <img
                                              src={s.frontImg}
                                              alt=""
                                              className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-0"
                                              loading="lazy"
                                            />
                                            {s.backImg && (
                                              <img
                                                src={s.backImg}
                                                alt=""
                                                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                                                loading="lazy"
                                              />
                                            )}
                                          </span>
                                        )}
                                        <span>{s.label}</span>
                                        <ArrowUpRight className="ml-auto h-4 w-4 opacity-50 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-80" />
                                      </a>
                                    </motion.li>
                                  ))}
                                </motion.ul>

                                <div className="px-4 pb-4">
                                  <a
                                    href={m.href || "#"}
                                    className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    View all {m.label.toLowerCase()}
                                    <ArrowUpRight className="h-3.5 w-3.5" />
                                  </a>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-4 space-y-2">
                    <a
                      href="/our-portfolio"
                      className="flex items-center justify-between rounded-2xl border border-black/10 px-4 py-3 text-sm font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      explore our work
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a
                      href="/blog"
                      className="flex items-center justify-between rounded-2xl border border-black/10 px-4 py-3 text-sm font-medium"
                      onClick={() => setMobileOpen(false)}
                    >
                      read our latest blogs
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="mt-6 space-y-4 px-4 text-sm text-gray-700">
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="mt-1">
                        <a className="underline" href="mailto:sales@thefinch.design">sales@thefinch.design</a> {" · "}
                        <a className="underline" href="mailto:hr@thefinch.design">hr@thefinch.design</a>
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Call</p>
                      <p className="mt-1">
                        <a className="underline" href="tel:917777997049">+91 77779 97049</a> {" · "}
                        <a className="underline" href="tel:917016391962">+91 70163 91962</a>
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold">Studio</p>
                      <p className="mt-1">
                        E-206A, Ganesh Glory 11, Jagatpur Rd, nr. BSNL Office, Jagatpur, Ahmedabad, Gujarat 382470.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-black/10 px-4 py-4">
                    <ul className="flex items-center gap-3">
                      {SOCIALS.map((s) => (
                        <li key={s.id}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-gray-700 transition hover:bg-gray-50"
                            aria-label={s.label}
                          >
                            {s.icon}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs text-gray-500">© 2025 thefinch.design studio. All Rights Reserved</p>
                    <div className="mt-2 flex items-center gap-4 text-xs">
                      <a href="/privacy-policy" className="underline">Privacy policy</a>
                      <a href="/terms-of-use" className="underline">Terms of Use</a>
                    </div>
                    <div className="mt-4">
                      <a href="#" className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-3 py-1.5 text-xs text-white">
                        Back to the top
                        <ArrowUpToLine className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </nav>
              </motion.aside>
            </FocusLock>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
