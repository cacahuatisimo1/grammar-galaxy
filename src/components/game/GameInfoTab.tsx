
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Game } from "@/data/games";

interface GameInfoTabProps {
  game: Game;
}

const GameInfoTab = ({ game }: GameInfoTabProps) => {
  const getCategoryColor = () => {
    if (game.category === "grammar") return "text-grammar";
    if (game.category === "vocabulary") return "text-vocabulary";
    if (game.category === "pronunciation") return "text-pronunciation";
    return "text-primary";
  };

  return (
    <div className="space-y-3">
      <div className="bg-white/80 backdrop-blur-xs rounded-xl border p-3 shadow-soft">
        <p className="text-sm">{game.longDescription}</p>
      </div>
      
      <div className="bg-white/80 backdrop-blur-xs rounded-xl border p-3 shadow-soft">
        <h3 className="text-xs font-medium text-muted-foreground mb-2">
          Habilidades que mejorarás
        </h3>
        <div className="grid grid-cols-2 gap-1.5">
          {game.skills.map((skill) => (
            <div key={skill} className="flex items-center gap-1.5">
              <CheckCircle2 className={cn("h-3 w-3", getCategoryColor())} />
              <span className="text-xs">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameInfoTab;
