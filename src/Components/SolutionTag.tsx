import React from "react";

interface SolutionTagProps {
  tagName: string;
}

const SolutionTag: React.FC<SolutionTagProps> = ({ tagName }) => {
  return (
    <button
      type="button"
      className="font-urbanist px-3.5 py-1.5 m-1 border rounded-full text-base focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
      aria-label={`Tag: ${tagName}`}
    >
      {tagName}
    </button>
  );
};

export default SolutionTag;
