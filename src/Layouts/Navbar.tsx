// src/components/Navbar.tsx
import { useState,type FC } from "react";
import { ChevronDown, Menu, X } from "lucide-react"; 
import Alphericlogo from "@/assets/Homepage/alpheric-icon.png";

type MenuItem =
  | "Consult"
  | "Build"
  | "Design"
  | "Host"
  | "Secure"
  | "Market"
  | "Support"
  | "Services"
  | "Hire"
  | "Join Us"
  | "Action"
  | "Insights";

const menuItems: { label: MenuItem; href: string; hasDropdown?: boolean }[] = [
  { label: "Consult", href: "#" },
  { label: "Build", href: "#about" },
  { label: "Design", href: "#design" },
  { label: "Host", href: "#host" },
  { label: "Secure", href: "#secure" },
  { label: "Market", href: "#market" },
  { label: "Support", href: "#support" },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Hire", href: "#hire", hasDropdown: true },
  { label: "Join Us", href: "#joinus" },
  { label: "Action", href: "#action" },
  { label: "Insights", href: "#insights" },
];

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<MenuItem>("Consult");

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleItemClick = (item: MenuItem) => setActiveItem(item);

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between font-urbanist px-3 md:px-4 lg:px-9 py-5 bg-transparent backdrop-blur-md z-50">
      {/* Logo */}
      <div className="relative ml-0 lg:ml-12">
        <img
          src={Alphericlogo}
          alt="Company logo"
          className="w-[100px] h-[35px] sm:w-[130px] sm:h-[45px] md:w-[160px] md:h-[50px]"
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-5 border border-white rounded-full px-4 py-2 text-base text-[#444444] backdrop-blur-lg mx-4 font-regular">
        {menuItems.map(({ label, href, hasDropdown }) => (
          <a
            key={label}
            href={href}
            onClick={() => handleItemClick(label)}
            className={`flex items-center gap-1 relative hover:bg-[#56c8dc]/30 rounded-4xl px-2.5 py-1.5 ${
              activeItem === label
                ? "bg-[#56c8dc]/30 border border-blue-500"
                : ""
            }`}
          >
            {label}
            {hasDropdown && <ChevronDown size={15} />}
          </a>
        ))}
      </div>

      {/* Desktop Sign Up Button */}
      <button className="hidden lg:block px-4 py-2 text-base font-regular rounded-full bg-white text-[#000000] hover:bg-[#56c8dc] transition">
        Sign Up
      </button>

      {/* Mobile Toggle */}
      <button
        onClick={toggleMenu}
        className="lg:hidden p-2 text-white focus:outline-none"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? <X size={30} /> : <Menu size={30} color="black" />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-4/5 h-screen bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40 p-10 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-5 right-5"
          aria-label="Close menu"
        >
          <X size={30} />
        </button>

        <div className="flex flex-col items-start gap-6 mt-16 text-lg">
          {menuItems.map(({ label, href }) => (
            <a key={label} href={href} onClick={toggleMenu}>
              {label}
            </a>
          ))}
          <button className="w-full mt-6 px-5 py-3 text-lg font-regular rounded-full bg-white text-[#000000] hover:bg-[#56c8dc] hover:border-blue-500 transition">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
