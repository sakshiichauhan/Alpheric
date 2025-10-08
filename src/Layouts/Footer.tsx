import React from "react";
import { Download } from "lucide-react";

const Footer: React.FC = () => {
  const date = new Date();

  return (
    // ⬇️ Constrain width + balanced inner padding
    <footer className="mx-auto w-full px-4 md:px-8 lg:px-18 font-urbanist">
      {/* Main Content Grid */}
      <div
        className="
          grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3
          gap-x- gap-y-10
          mb-20 md:mb-28
        "
      >
        {/* Say Hello Section */}
        <div className="space-y-6">
          <h3 className="mb-2 text-2xl sm:text-3xl lg:text-4xl font-regular text-[#000000]">
            Say Hello 👋
          </h3>
          <div className="space-y-4 sm:space-y-7 mt-4 sm:mt-6 text-xl sm:text-2xl lg:text-4xl">
            <p><a href="https://www.linkedin.com/company/alphericconsultants/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
            <p><a href="https://www.instagram.com/alpheric.consultants/" target="_blank" rel="noopener noreferrer">Instagram</a></p>
            <p><a href="#" aria-disabled="true" className="cursor-not-allowed">Dribbble</a></p>
            <p><a href="#" aria-disabled="true" className="cursor-not-allowed">Behance</a></p>
          </div>
        </div>

        {/* Consult Section */}
        <div>
          <h3 className="mb-2 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-regular text-[#000000]">Consult</h3>
          <div className="space-y-3 sm:space-y-5 text-xl sm:text-2xl lg:text-4xl">
            <p>Design</p><p>Build</p><p>Host</p><p>Secure</p><p>Market</p>
          </div>
        </div>

        {/* About Us Section */}
        <div>
          <h3 className="mb-2 sm:mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold">About Us</h3>
          <div className="space-y-3 sm:space-y-5 text-xl sm:text-2xl lg:text-4xl font-semibold">
            <p>Career</p><p>Actions</p><p>Insights</p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mb-6 sm:mb-8">
        <p className="text-gray-600 mb-3 sm:mb-4 text-base sm:text-lg lg:text-[22px]">
          For whose daily routines involve PDF presentations
        </p>
        <button
          type="button"
          className="flex items-center gap-2 text-black text-base sm:text-lg lg:text-xl bg-white/10 px-5 py-4 rounded-2xl hover:bg-black hover:text-white transition-colors"
          aria-label="Download company profile PDF"
        >
          Download & Share PDF ☺️
          <Download className="ml-1" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 gap-4 sm:gap-0">
        <p>© {date.getFullYear()} Alpheric</p>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-8">
          <a href="#" className="hover:text-gray-800">Sitemap</a>
          <a href="#" className="hover:text-gray-800">Privacy Policy</a>
          <a href="#" className="hover:text-gray-800">Terms of Use</a>
          <a href="#" className="hover:text-gray-800">Cookie Policy</a>
          <a href="#top" className="hover:text-gray-800">Goto Top</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
