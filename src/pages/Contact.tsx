import React, { useState, useEffect } from "react";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

import girl from "@/assets/girls.png";


const Contact: React.FC = () => {
  const [animationKey, setAnimationKey] = useState<number>(0);

  useEffect(() => {
 
    setAnimationKey(Math.random());
  }, []);

  return (
    <section
      className="min-h-[700px] lg:min-h-screen w-full flex items-center justify-start px-4 sm:px-8 md:px-16 lg:px-24"
    
    >
      <motion.div
        key={animationKey}
        className="w-full max-w-4xl font-instrument-sans leading-tight"
      >
      
        <h3
      
          className="text-base sm:text-xl md:text-2xl lg:text-4xl mb-2"
        >
          Shall we chat?
        </h3>

        {/* ✅ Email link with accessible underline animation */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 relative inline-block group underline-offset-8 decoration-3">
          <a
            href="mailto:hello@alpheric.com"
            className="focus:outline-none focus:ring-4 focus:ring-blue-400"
            aria-label="Email us at hello@alpheric.com"
          >
            <span>hello@alpheric.com</span>
            <span
              className="absolute left-0 bottom-[-2px] h-[3px] w-full bg-current scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
              aria-hidden="true"
            />
          </a>
        </h1>

        {/* ✅ Animated row with text + image + button */}
        <div className="flex flex-row md:items-center gap-1 sm:gap-2 group hover:underline underline-offset-8 decoration-4 transition font-instrument-sans font-medium">
          <span className="flex items-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            Let&apos;s
          </span>

          {/* ✅ Image animation */}
          <motion.div
            key={`${animationKey}-image`}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{
              clipPath: "inset(0 0 0 0)",
              transition: { duration: 1.2, ease: "easeInOut" },
            }}
            className="overflow-hidden my-2 sm:my-0"
          >
            <img
              src={girl}
              alt="Chat illustration"
              className="h-16 w-20 sm:h-20 sm:w-24 md:h-24 md:w-32 lg:h-32 lg:w-40 bg-[#56c8dc] rounded-full object-cover"
              loading="lazy"
            />
          </motion.div>

          {/* ✅ "Talk" text animation */}
          <motion.span
            key={`${animationKey}-talk`}
            initial={{ x: -100 }}
            animate={{
              x: 0,
              transition: {
                delay: 0.4,
                duration: 1.2,
                type: "spring",
                stiffness: 70,
                damping: 15,
              },
            }}
            className="flex items-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl overflow-hidden"
          >
            talk
          </motion.span>

          {/* ✅ Button with accessibility + keyboard focus */}
          <a
            href="mailto:hello@alpheric.com"
            className="mt-2 sm:mt-0 sm:ml-2 md:ml-4 px-4 py-1 sm:px-6 sm:py-2 md:px-8 md:py-2 rounded-full bg-transparent transition-colors duration-300 group-hover:bg-black focus:outline-none focus:ring-4 focus:ring-blue-400"
            aria-label="Contact us by email"
          >
            <MoveRight
              size={48}
              className="w-12 sm:h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-black transition-colors duration-300 group-hover:text-white"
              aria-hidden="true"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
