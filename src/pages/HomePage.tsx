import React, { useRef, useState, useEffect } from "react";
import { X, VolumeOff, Volume2, ChevronLeft, ChevronRight } from "lucide-react";

// Assets
import Spiral from "@/assets/Homepage/spiral.png";
import asset from "@/assets/Homepage/asset.png";
import reelPoster from "@/assets/Homepage/reelPoster.png";

import asset_1 from "@/assets/Homeicons/asset-1.png";
import asset_2 from "@/assets/Homeicons/asset-2.png";
import asset_3 from "@/assets/Homeicons/asset-3.png";
import asset_4 from "@/assets/Homeicons/asset-4.png";
import asset_5 from "@/assets/Homeicons/asset-5.png";

import alpheric_animation from "@/assets/Homepage/alpheric-gif.gif";

const TEAM_ASSETS = [asset_1, asset_2, asset_3, asset_4, asset_5];

const HomePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Auto-configure video playback
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.muted = true;
      video.autoplay = true;
      video.playsInline = true;
      video.loop = true;
      video.play().catch((err) => console.error("Autoplay error:", err));
    }
  }, []);

  const toggleVolume = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    video.muted = !isMuted;
    video.volume = isMuted ? 1 : 0;
    setIsMuted(!isMuted);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight || document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="min-h-screen w-full bg-[radial-gradient(ellipse_50%_100%_at_top_right,#EDE6FE_10%,#FFFFFF_100%)] overflow-clip"
    >
      <div className="w-full h-screen flex items-center px-4 sm:px-6 md:px-12 lg:px-[90px]">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-0">

          {/* ✅ LEFT CONTENT */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center mt-20 lg:mt-0">
            <div className="flex items-center gap-2">
              <img src={asset} alt="Digital strategy asset" className="w-auto h-auto" />
            </div>

            <div className="space-y-6 md:space-y-8 mt-8 md:mt-16">
              <button
                onClick={scrollToBottom}
                className="px-6 sm:px-8 py-2 sm:py-3 rounded-full border border-black text-base sm:text-lg hover:bg-[#56c8dc] hover:text-white transition-colors"
              >
                Let's Talk
              </button>

              {/* ✅ TEAM SECTION */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-4 font-urbanist md:mt-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                  <p className="text-base sm:text-[20px] text-[#444444]">
                    You'll Be Talking With <br /> Our Creative Talents.
                  </p>
                  <div className="flex space-x-1">
                    {TEAM_ASSETS.map((imgSrc, idx) => (
                      <img
                        key={idx}
                        src={imgSrc}
                        alt={`Team member ${idx + 1}`}
                        className="w-[30px] h-[30px] sm:w-[36px] sm:h-[36px]  object-cover"
                      />
                    ))}
                  </div>
                </div>

                <p className="text-base sm:text-[20px] text-gray-600 max-w-md">
                  Let's craft a digital strategy powered by <br className="hidden sm:block" />
                  award-winning tech to drive real results and <br className="hidden sm:block" />
                  grow your business — together! 🚀
                </p>
              </div>
            </div>
          </div>

          {/* ✅ RIGHT CONTENT */}
          <div className="w-full lg:w-1/2 relative h-full flex items-center justify-center lg:justify-end">
            {/* Animated GIF */}
            <div className="hidden md:block absolute z-10 left-10 bottom-32 transform -translate-y-10">
              <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden">
                <img
                  src={alpheric_animation}
                  alt="Alpheric animated logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Spiral Background */}
            <div className="hidden md:block absolute md:right-[-680px] lg:right-[-260px] md:top-[-600px] lg:top-[-400px] w-full md:w-[510px] lg:w-[900px] h-[690px] mx-auto">
              <img src={Spiral} alt="Spiral background" className="w-full h-auto" />
            </div>

            {/* ✅ Floating Video Panel */}
            {isPanelVisible && (
              <div className="fixed bottom-12 md:bottom-25 md:right-8 bg-slate-900 text-white rounded-3xl sm:rounded-4xl h-[280px] sm:h-[350px] md:h-[409px] w-[180px] sm:w-[200px] md:w-[230px] z-50 shadow-lg">
                <div className="relative">
                  <video
                    ref={videoRef}
                    src="https://rondesignlab.com/video/common/intercom.mp4"
                    poster={reelPoster}
                    className="w-full object-cover rounded-3xl sm:rounded-4xl"
                    autoPlay
                    playsInline
                    muted
                    loop
                  />

                  {/* Close button */}
                  <button
                    aria-label="Close video panel"
                    onClick={() => setIsPanelVisible(false)}
                    className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white h-[24px] w-[24px] sm:h-[32px] sm:w-[32px] rounded-lg sm:rounded-xl text-black hover:bg-black hover:text-white flex justify-center items-center p-1 transition"
                  >
                    <X size={20} />
                  </button>

                  {/* Volume toggle */}
                  <button
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                    onClick={toggleVolume}
                    className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white h-[24px] w-[24px] sm:h-[32px] sm:w-[32px] rounded-lg sm:rounded-xl text-black hover:bg-black hover:text-white flex justify-center items-center p-1 transition"
                  >
                    {isMuted ? <VolumeOff size={20} /> : <Volume2 size={20} />}
                  </button>

                  {/* CTA Button */}
                  <button
                    onClick={scrollToBottom}
                    className="absolute bottom-3 sm:bottom-5 left-1/2 transform -translate-x-1/2 w-[130px] sm:w-[173px] h-[36px] sm:h-[46px] bg-black text-white font-medium rounded-[63px] text-sm sm:text-xl hover:bg-white hover:text-black transition"
                  >
                    Let's Talk 👋
                  </button>
                </div>
              </div>
            )}

            {/* ✅ Toggle Panel Button */}
            <button
              onClick={() => setIsPanelVisible(true)}
              aria-label="Toggle video panel"
              className="fixed bottom-16 sm:bottom-24 md:bottom-30 right-0 sm:-right-3 md:-right-5 bg-white text-black rounded-l-4xl h-12 w-6 sm:h-16 sm:w-8 md:h-20 md:w-10 z-50 hover:bg-black hover:text-white transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              {isPanelVisible ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
