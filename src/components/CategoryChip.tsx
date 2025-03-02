
import { cn } from "@/lib/utils";

type CategoryType = "grammar" | "vocabulary" | "pronunciation";

interface CategoryChipProps {
  category: CategoryType;
  className?: string;
}

const CategoryChip = ({ category, className }: CategoryChipProps) => {
  const categoryConfig = {
    grammar: {
      bgColor: "bg-grammar-light",
      textColor: "text-grammar",
      label: "Gramática"
    },
    vocabulary: {
      bgColor: "bg-vocabulary-light",
      textColor: "text-vocabulary",
      label: "Vocabulario"
    },
    pronunciation: {
      bgColor: "bg-pronunciation-light",
      textColor: "text-pronunciation",
      label: "Pronunciación"
    }
  };

  const { bgColor, textColor, label } = categoryConfig[category];

  return (
    <div className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide",
      bgColor,
      textColor,
      className
    )}>
      {label}
    </div>
  );
};

export default CategoryChip;
