import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SolutionCard from "@/Components/SolutionCard";

// Image imports
import Business from "@/assets/Solutions/Business.jpg";
import Consult from "@/assets/Solutions/Consult.jpg";
import Build from "@/assets/Solutions/Build.jpg";
import Design from "@/assets/Solutions/Design.jpg";
import Host from "@/assets/Solutions/Host.jpg";
import Market from "@/assets/Solutions/Market.jpg";

interface CardData {
  title: string;
  description: string;
  imageUrl: string;
  tags?: string[];
}

const cardsData: CardData[] = [
  {
    title: "Your Business, Simplified",
    description: "We're here to handle it all so you can focus on what matters most.",
    imageUrl: Business,
  },
  {
    title: "Consult",
    description: "Gain clarity with expert advice on strategy, business growth and scaling solutions.",
    imageUrl: Consult,
    tags: ["Technology", "Design", "Cyber Security", "Business Consulting"],
  },
  {
    title: "Build",
    description: "Develop solutions tailored to your goals, from robust platforms to seamless integrations.",
    imageUrl: Build,
    tags: ["Mobile", "Web App", "AI & Automation", "Enterprise Application"],
  },
  {
    title: "Design",
    description: "Craft stunning, user-friendly experiences that connect with your audience.",
    imageUrl: Design,
    tags: ["Branding", "UX/UI Design", "Concept Design", "Product Design"],
  },
  {
    title: "Host",
    description: "Ensure your digital presence is reliable, fast, and secure with premium hosting solutions.",
    imageUrl: Host,
    tags: ["Web Hosting", "Cloud", "Server Management", "AWS", "Google Cloud", "Azure"],
  },
  {
    title: "Market",
    description: "Amplify your reach with strategies that drive real results and engage your audience.",
    imageUrl: Market,
    tags: ["Digital Growth", "Organic Marketing", "Media Buying", "Performance Marketing"],
  },
];

const SolutionPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start center", "end start"],
  });

  const translateY = useTransform(heroScrollProgress, [0, 1], [0, -300]);
  const scale = useTransform(heroScrollProgress, [0, 1], [1, 0.5]);

  const totalCards = cardsData.length;

  return (
    <div>
      {/* Hero Section */}
      <section
        ref={heroSectionRef}
        className="h-screen flex flex-col justify-center items-center px-4 font-instrument-sans"
      >
        <motion.div
          initial={{ scale: 0.55, x: 0 }}
          animate={{ y: -100 }}
          transition={{ ease: "easeIn" }}
          style={{ translateY, scale }}
          className="flex flex-col items-center"
        >
          <h1 className="text-[40px] sm:text-[60px] md:text-[100px] lg:text-[140px] text-center font-semibold leading-tight">
            What Are We
            <br />
            Fighting Against?
          </h1>
          <p className="text-gray-500 text-[18px] sm:text-[22px] md:text-[32px] lg:text-[40px] text-center mt-4">
            Users not engaging with your design or project
          </p>
          <p className="text-gray-500 text-[16px] sm:text-[20px] md:text-[30px] lg:text-[38px] text-center mt-2">
            Let's turn that challenge into opportunities.
          </p>
        </motion.div>
      </section>

      {/* Scroll Section with Cards */}
      <div ref={containerRef} className="relative h-[600vh] font-instrument-sans">
        {/* Hidden preview section for layout debug (optional) */}
        <div className="hidden">
          {cardsData.map((card, i) => (
            <div key={i} className="flex flex-col gap-2 m-4">
              <div className="text-4xl">{card.title}</div>
              <div className="text-xl">{card.description}</div>
              <div>{card.tags?.join(", ")}</div>
              <img className="rounded-4xl m-2 w-70 h-auto" src={card.imageUrl} alt={card.title} />
            </div>
          ))}
        </div>

        <div className="flex sticky top-5 h-screen items-center overflow-hidden">
          <div className="relative w-full max-w-7xl mx-auto">
            {cardsData.map((card, index) => (
              <SolutionCard
                key={index}
                title={card.title}
                description={card.description}
                imageUrl={card.imageUrl}
                tags={card.tags}
                scrollYProgress={scrollYProgress}
                index={index}
                totalCards={totalCards}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionPage;
