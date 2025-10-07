import React, { useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { MoveRight } from "lucide-react";
import videoPoster from "@/assets/Homepage/design-asset-cropped.png";
import playButton from "@/assets/Videos/play.png";

const Design: React.FC = () => {
 
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
  

    const sectionRef = useRef<HTMLElement | null>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
 
    const handleVideoClick = (): void => {
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play();
          setIsPlaying(true);
        } else {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      }
    };
  
   
    const textVariants: Variants = {
      hidden: { x: -200, opacity: 0 },
      visible: (custom: number) => ({
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 100,
          delay: custom * 0.2,
          duration: 0.8,
        },
      }),
    };
  
    const videoVariants: Variants = {
      hidden: { x: 200, opacity: 0 },
      visible: {
        x: 0,
        opacity: 1,
        transition: {
          type: "spring",
          damping: 20,
          stiffness: 100,
          delay: 0.4,
          duration: 0.8,
        },
      },
    };
  
    return (
      <section
        ref={sectionRef}
        className="min-h-screen py-10 md:py-20 overflow-hidden"
        aria-labelledby="design-heading"
      >
        <div className="max-w-full flex flex-col px-4 md:px-8 lg:px-16 xl:px-20 ">
          {/* ✅ Accessible heading */}
          <motion.h1
            id="design-heading"
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-instrument-sans font-semibold mb-4 leading-tight"
          >
            We do amazing things
          </motion.h1>
  
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="flex items-center justify-start gap-2 md:gap-4 font-instrument-serif-italics text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl  leading-tight"
          >
            <MoveRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0" />
            <span>oh, with amazing people too</span>
          </motion.div>
  
          {/* ✅ Video section */}
          <motion.div
            variants={videoVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative px-2 sm:px-4 md:px-0"
          >
            <video
              className="w-full rounded-lg sm:rounded-xl md:rounded-2xl h-auto cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
              ref={videoRef}
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster={videoPoster}
              onClick={handleVideoClick}
              aria-label="Promotional video. Click to play or pause."
            />
            {!isPlaying && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-white/10 rounded-full p-2 sm:p-3 md:p-4 z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200"
                onClick={handleVideoClick}
                aria-label="Play video"
              >
                <img
                  className="w-16 sm:w-20 md:w-28 lg:w-36"
                  src={playButton}
                  alt="Play button"
                  draggable={false}
                />
              </motion.button>
            )}
          </motion.div>
        </div>
      </section>
    );
  };
  
  export default Design;
