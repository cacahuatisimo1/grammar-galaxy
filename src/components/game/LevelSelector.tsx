
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Game } from "@/data/games";

interface LevelSelectorProps {
  game: Game;
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
}

const LevelSelector = ({ game, selectedLevel, onSelectLevel }: LevelSelectorProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-xs rounded-xl border p-3 shadow-soft w-full">
      <h3 className="text-xs font-medium text-muted-foreground mb-2">
        Niveles
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {game.levels.map((level) => (
          <button
            key={level}
            onClick={() => onSelectLevel(level)}
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium transition-all",
              selectedLevel === level
                ? game.category === "grammar" ? "bg-grammar text-white" :
                  game.category === "vocabulary" ? "bg-vocabulary text-white" :
                  "bg-pronunciation text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
