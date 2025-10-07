import React, { useRef } from 'react';
import { motion, useScroll, useTransform, easeInOut } from "framer-motion"; 

const WhatNext: React.FC = () => {
  const nextSectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: nextSectionRef,
    offset: ["start center", "end start"],
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [300, -300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <section
      ref={nextSectionRef}
      className="h-screen flex flex-col justify-center items-center font-instrument-sans translate-y-40"
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 0.55, x: 0 }}
        animate={{ y: -100 }}
        // ✅ use imported easeInOut instead of string
        transition={{ ease: easeInOut, duration: 1 }}
        style={{ translateY, scale }}
      >
        <h1 className="text-[160px] font-instrument-sans font-semibold">What’s next</h1>
        <h3 className="text-[40px] text-gray-600">How will our cooperation go after</h3>
        <h3 className="text-[40px] text-gray-600">the start of work</h3>
      </motion.div>
    </section>
  );
};

export default WhatNext;
