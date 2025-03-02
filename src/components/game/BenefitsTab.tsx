
import { Brain, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Game } from "@/data/games";

interface BenefitsTabProps {
  game: Game;
}

const BenefitsTab = ({ game }: BenefitsTabProps) => {
  const getCategoryColor = () => {
    if (game.category === "grammar") return "text-grammar";
    if (game.category === "vocabulary") return "text-vocabulary";
    if (game.category === "pronunciation") return "text-pronunciation";
    return "text-primary";
  };

  return (
    <div className="space-y-3">
      <div className="bg-white/80 backdrop-blur-xs rounded-xl border p-3 shadow-soft">
        <div className="flex items-start gap-2.5">
          <div className={cn(
            "rounded-full p-1.5 shrink-0",
            game.category === "grammar" ? "bg-grammar-light" : "",
            game.category === "vocabulary" ? "bg-vocabulary-light" : "",
            game.category === "pronunciation" ? "bg-pronunciation-light" : ""
          )}>
            <Brain className={cn("h-4 w-4", getCategoryColor())} />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-0.5">Aprendizaje efectivo</h3>
            <p className="text-muted-foreground text-xs">
              Refuerza tus conocimientos mediante la práctica activa.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-xs rounded-xl border p-3 shadow-soft">
        <div className="flex items-start gap-2.5">
          <div className={cn(
            "rounded-full p-1.5 shrink-0",
            game.category === "grammar" ? "bg-grammar-light" : "",
            game.category === "vocabulary" ? "bg-vocabulary-light" : "",
            game.category === "pronunciation" ? "bg-pronunciation-light" : ""
          )}>
            <Zap className={cn("h-4 w-4", getCategoryColor())} />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-0.5">Motivación constante</h3>
            <p className="text-muted-foreground text-xs">
              Mantén el interés con dinámicas de juego entretenidas.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-xs rounded-xl border p-3 shadow-soft">
        <div className="flex items-start gap-2.5">
          <div className={cn(
            "rounded-full p-1.5 shrink-0",
            game.category === "grammar" ? "bg-grammar-light" : "",
            game.category === "vocabulary" ? "bg-vocabulary-light" : "",
            game.category === "pronunciation" ? "bg-pronunciation-light" : ""
          )}>
            <Star className={cn("h-4 w-4", getCategoryColor())} />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-0.5">Progreso medible</h3>
            <p className="text-muted-foreground text-xs">
              Visualiza tu avance con estadísticas detalladas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsTab;
