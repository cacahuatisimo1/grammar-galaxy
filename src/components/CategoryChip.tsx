
import { cn } from "@/lib/utils";

// Ampliamos el tipo para permitir más categorías en el futuro
export type CategoryType = "grammar" | "vocabulary" | "pronunciation" | "listening" | "reading" | "writing" | "speaking";

interface CategoryChipProps {
  category: CategoryType;
  className?: string;
}

// Map de configuración para las categorías actuales y futuras
const CATEGORY_CONFIG: Record<CategoryType, {
  bgColor: string;
  textColor: string;
  label: string;
}> = {
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
  },
  listening: {
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
    label: "Comprensión auditiva"
  },
  reading: {
    bgColor: "bg-purple-100",
    textColor: "text-purple-600",
    label: "Lectura"
  },
  writing: {
    bgColor: "bg-pink-100",
    textColor: "text-pink-600",
    label: "Escritura"
  },
  speaking: {
    bgColor: "bg-orange-100",
    textColor: "text-orange-600",
    label: "Conversación"
  }
};

const CategoryChip = ({ category, className }: CategoryChipProps) => {
  // Utilizar la configuración del mapa o valores predeterminados si la categoría no existe
  const config = CATEGORY_CONFIG[category] || {
    bgColor: "bg-gray-100",
    textColor: "text-gray-600",
    label: category.charAt(0).toUpperCase() + category.slice(1)
  };

  return (
    <div className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide",
      config.bgColor,
      config.textColor,
      className
    )}>
      {config.label}
    </div>
  );
};

export default CategoryChip;
