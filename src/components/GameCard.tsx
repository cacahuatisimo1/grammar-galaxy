import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";
import CategoryChip, { CategoryType } from "./CategoryChip";

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  iconSrc: string;
  className?: string;
}

const GameCard = ({ 
  id, 
  title, 
  description, 
  category, 
  iconSrc, 
  className 
}: GameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColorMap = {
    grammar: "hover:border-grammar/30 hover:shadow-grammar/10",
    vocabulary: "hover:border-vocabulary/30 hover:shadow-vocabulary/10",
    pronunciation: "hover:border-pronunciation/30 hover:shadow-pronunciation/10",
  };

  return (
    <Link 
      to={`/game/${id}`}
      className={cn(
        "block p-5 w-full rounded-2xl bg-white border border-border hover-card focus-ring",
        "transition-all duration-300 ease-out",
        categoryColorMap[category],
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          "transition-transform duration-300",
          isHovered ? "scale-110" : "",
          category === "grammar" ? "bg-grammar-light" : "",
          category === "vocabulary" ? "bg-vocabulary-light" : "",
          category === "pronunciation" ? "bg-pronunciation-light" : ""
        )}>
          <img 
            src={iconSrc} 
            alt={title} 
            className="w-6 h-6" 
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">{title}</h3>
            <CategoryChip category={category} />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{description}</p>
        </div>
      </div>
      
      <div className={cn(
        "mt-4 w-full h-1.5 rounded-full bg-muted overflow-hidden",
        "transition-all duration-300",
        isHovered ? "opacity-100" : "opacity-50"
      )}>
        <div className={cn(
          "h-full rounded-full",
          "transition-transform duration-700 ease-out",
          isHovered ? "w-[60%]" : "w-[25%]",
          category === "grammar" ? "bg-grammar" : "",
          category === "vocabulary" ? "bg-vocabulary" : "",
          category === "pronunciation" ? "bg-pronunciation" : ""
        )}></div>
      </div>
    </Link>
  );
};

export default GameCard;
