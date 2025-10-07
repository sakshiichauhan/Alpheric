import React from "react";
import { motion } from "framer-motion";

export interface Question {
  id: number;
  text: string;
  type: "standard" | "special";
}

interface QuestionnaireCardProps {
  question: Question;
  stepNumber: number;
  totalSteps: number;
  onAnswer: (answer: string) => void;
}

const QuestionnaireCard: React.FC<QuestionnaireCardProps> = ({
  question,
  stepNumber,
  totalSteps,
  onAnswer,
}) => {
  return (
    <div
      className="w-full font-instrument-sans"
      role="group"
      aria-roledescription="question card"
      aria-label={`Question ${stepNumber} of ${totalSteps}`}
    >
      <motion.div
        className="relative border border-gray-300 bg-gray-50 w-full sm:w-[500px] md:w-[600px] lg:w-[671px] h-auto min-h-[240px] sm:min-h-[240px] md:min-h-[280px] lg:h-[289px] p-3 sm:p-4 rounded-[18px] sm:rounded-[24px] shadow-sm overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* ✅ Standard question card */}
        {question.type !== "special" ? (
          <>
            {/* Progress Indicators */}
            <div
              className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5 mt-3 sm:mt-4 md:mt-5 text-[16px] sm:text-[18px] md:text-[20px]"
              role="status"
              aria-label={`Step ${stepNumber} of ${totalSteps}`}
            >
              {Array.from({ length: totalSteps }, (_, index) => (
                <div
                  key={index + 1}
                  className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center font-medium ${
                    index + 1 === stepNumber
                      ? "border-black text-black"
                      : "border-gray-300 text-gray-300"
                  }`}
                  aria-label={`Step ${index + 1}`}
                  aria-current={index + 1 === stepNumber ? "step" : undefined}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            {/* Question Text */}
            <h2
              className="text-center text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] font-medium mb-3 px-2 sm:px-3 md:px-4"
              aria-live="polite"
            >
              {question.text}
            </h2>

            {/* Answer Buttons */}
            <div className="flex justify-between mt-6 sm:mt-8 md:mt-10">
              <motion.button
                onClick={() => onAnswer("no")}
                aria-label="Answer No"
                className="absolute -left-2 -bottom-5 bg-black text-white p-5 sm:p-6 md:p-7 text-[18px] sm:text-[20px] md:text-[24px] rounded-full font-medium shadow-lg hover:bg-[#56c8dc] transition duration-500 focus:outline-none focus:ring-4 focus:ring-blue-400"
              >
                No
              </motion.button>

              <motion.button
                onClick={() => onAnswer("yes")}
                aria-label="Answer Yes"
                className="absolute -right-2 sm:-right-3 -bottom-5 bg-black text-white p-5 sm:p-6 md:p-7 text-[18px] sm:text-[20px] md:text-[24px] rounded-full font-medium shadow-lg hover:bg-[#56c8dc] transition duration-500 focus:outline-none focus:ring-4 focus:ring-blue-400"
              >
                Yes
              </motion.button>
            </div>
          </>
        ) : (
          /* ✅ Special question card (Insights) */
          <div className="text-center px-3 sm:px-5 md:px-7">
            <div className="inline-block px-3 sm:px-4 py-1 rounded-full bg-white border text-gray-600 mb-2 font-medium text-[16px] sm:text-[18px] md:text-[20px] mt-3 sm:mt-4">
              Insights
            </div>
            <h2
              className="text-[22px] md:text-[32px] font-bold whitespace-pre-line"
              aria-live="polite"
            >
              {question.text}
            </h2>
            <motion.button
              onClick={() => onAnswer("view")}
              aria-label="View Insights"
              className="bg-black text-white text-[18px] sm:text-[20px] md:text-[24px] px-3 sm:px-4 py-4 sm:py-5 md:py-6 rounded-full absolute -bottom-4 md:-bottom-7 left-1/2 -translate-x-1/2 shadow-lg hover:bg-[#56c8dc] transition duration-500 font-medium focus:outline-none focus:ring-4 focus:ring-blue-400"
            >
              View
            </motion.button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default QuestionnaireCard;
