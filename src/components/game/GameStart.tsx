
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Game } from "@/data/games";

interface GameStartProps {
  game: Game;
  levels: string[];
  selectedLevel: string;
  onSelectLevel: (level: string) => void;
  onStartGame: () => void;
  customOptions?: React.ReactNode;
}

const GameStart = ({ 
  game, 
  levels, 
  selectedLevel, 
  onSelectLevel, 
  onStartGame,
  customOptions 
}: GameStartProps) => {
  const getCategoryColor = () => {
    if (game.category === "grammar") return "bg-grammar hover:bg-grammar/90";
    if (game.category === "vocabulary") return "bg-vocabulary hover:bg-vocabulary/90";
    return "bg-pronunciation hover:bg-pronunciation/90";
  };
  
  const getCategoryLightColor = () => {
    if (game.category === "grammar") return "bg-grammar-light";
    if (game.category === "vocabulary") return "bg-vocabulary-light";
    return "bg-pronunciation-light";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center text-center space-y-6 bg-white rounded-xl shadow-soft border p-6"
    >
      <div className={cn("w-20 h-20 rounded-full flex items-center justify-center", getCategoryLightColor())}>
        {game.icon}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">{game.title}</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-4">
          {game.longDescription}
        </p>
      </div>

      <div className="space-y-4 w-full max-w-md">
        <div className="flex justify-between px-4 py-3 rounded-lg bg-muted/50">
          <span className="text-sm text-muted-foreground">Niveles:</span>
          <div className="flex gap-2">
            {levels.map((level) => (
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
      </div>

      {customOptions}

      <Button 
        className={cn("w-full max-w-md", getCategoryColor(), "text-white")}
        onClick={onStartGame}
      >
        Comenzar juego
      </Button>
    </motion.div>
  );
};

export default GameStart;
