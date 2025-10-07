import {
    motion,
    useTransform,
    useSpring,
    MotionValue,
    easeInOut, // import easing function
  } from "framer-motion";
  import SolutionTag from "@/Components/SolutionTag";
  
  interface SolutionCardProps {
    title: string;
    description: string;
    imageUrl: string;
    tags?: string[];
    scrollYProgress: MotionValue<number>;
    index: number;
    totalCards: number;
  }
  
  const SolutionCard: React.FC<SolutionCardProps> = ({
    title,
    description,
    imageUrl,
    tags = [],
    scrollYProgress,
    index,
    totalCards,
  }) => {
    const smoothScrollYProgress = useSpring(scrollYProgress, {
      stiffness: 50,
      damping: 15,
      restDelta: 0.001,
    });
  
    const chunk = 1 / totalCards;
    const start = index * chunk;
    const end = (index + 1) * chunk;
  
    const overlapFactor = 0.3;
    const fadeInStart = Math.max(0, start - chunk * overlapFactor);
    const fadeInEnd = start + chunk * 0.2;
    const fadeOutStart = end - chunk * 0.2;
    const fadeOutEnd = Math.min(1, end + chunk * overlapFactor);
  
    const imageOpacity = useTransform(
      smoothScrollYProgress,
      [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
      [0, 1, 1, 0]
    );
  
    const textFadePortion = 0.4 * chunk;
  
    const textY = useTransform(
      smoothScrollYProgress,
      [start, start + textFadePortion, end - textFadePortion, end],
      [300, 0, 0, -550]
    );
  
    const textOpacity = useTransform(
      smoothScrollYProgress,
      [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
      [0, 1, 1, 0]
    );
  
    // ✅ fixed: use imported easeInOut instead of string
    const baseTransition = {
      duration: 2.5,
      ease: easeInOut,
      delay: 0.2,
    };
  
    return (
      <div className="absolute inset-0 flex items-center overflow-visible ">
        {/* Image Section */}
        <div className="w-1/2 flex justify-center">
          <motion.div
            style={{ opacity: imageOpacity }}
            transition={baseTransition}
            className="w-full max-w-[594px]"
          >
            <img
              src={imageUrl}
              alt={title || "Solution image"}
              className="w-[500px] h-[700px] object-cover rounded-[36px] shadow-sm"
            />
          </motion.div>
        </div>
  
        {/* Text Section */}
        <div className="w-1/2 px-12 overflow-visible">
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            transition={baseTransition}
            className="flex flex-col gap-6"
          >
            <h2 className="font-instrument-sans font-semibold text-7xl leading-tight text-black">
              {title}
            </h2>
  
            <p className="font-instrument-sans text-3xl text-gray-600">
              {description}
            </p>
  
            {tags.length > 0 && (
              <motion.div
                style={{ opacity: textOpacity }}
                transition={baseTransition}
                className="flex flex-wrap gap-2 mt-4"
                aria-label="Tags"
              >
                {tags.map((tag, tagIndex) => (
                  <div key={tagIndex}>
                    <SolutionTag tagName={tag} />
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    );
  };
  
  export default SolutionCard;
  