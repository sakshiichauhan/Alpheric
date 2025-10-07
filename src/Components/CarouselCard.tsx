import React from "react";
import { ArrowUpRight } from "lucide-react";
interface CarouselCardProps {
    title: string;
    imageUrl: string;
    description: string;
    visitLink: string;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
    title,
    imageUrl,
    description,
    visitLink,
}) => {
    return (
        <div
            className="relative w-[400px]  md:w-[400px] h-[500px] md:h-[627px] mx-2 rounded-xl overflow-hidden shadow-lg group font-instrument-sans flex-shrink-0 snap-center"
            role="group"
            aria-label={`Card for ${title}`}
        >
            {/* ✅ Image with alt text for accessibility */}
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
            />

            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-between">
                <div>
                    <h3 className="text-white text-2xl md:text-[36px] font-semibold">
                        {title}
                    </h3>
                    <p className="text-white text-base md:text-lg mt-2 max-w-[90%]">
                        {description}
                    </p>
                </div>

             
                <div className="flex justify-end mt-4">
                    <a
                        href={visitLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${title} page`}
                        className="bg-white/50 hover:bg-black transition-colors text-white p-2.5 rounded-full flex items-center justify-center "
                    >
                        <ArrowUpRight size={25} aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CarouselCard;
