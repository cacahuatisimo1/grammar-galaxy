
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Game } from "@/data/games";

interface GameStats {
  correct: number;
  incorrect: number;
  skipped: number;
}

interface GameCompleteProps {
  game: Game;
  level: string;
  stats: GameStats;
  onPlayAgain: () => void;
  onChangeSettings: () => void;
}

const GameComplete = ({
  game,
  level,
  stats,
  onPlayAgain,
  onChangeSettings
}: GameCompleteProps) => {
  const scorePercentage = Math.round(
    (stats.correct / (stats.correct + stats.incorrect + stats.skipped)) * 100
  ) || 0;
  
  const getCategoryColor = () => {
    if (game.category === "grammar") return "bg-grammar hover:bg-grammar/90";
    if (game.category === "vocabulary") return "bg-vocabulary hover:bg-vocabulary/90";
    return "bg-pronunciation hover:bg-pronunciation/90";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center text-center space-y-6 bg-white rounded-xl shadow-soft border p-6"
    >
      <div className={cn(
        "w-20 h-20 rounded-full flex items-center justify-center",
        scorePercentage >= 80 ? "bg-green-100" : 
        scorePercentage >= 50 ? "bg-yellow-100" : "bg-red-100"
      )}>
        <span className={cn(
          "text-2xl font-bold",
          scorePercentage >= 80 ? "text-green-600" : 
          scorePercentage >= 50 ? "text-yellow-600" : "text-red-600"
        )}>
          {scorePercentage}%
        </span>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">¡Juego completado!</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-4">
          Has completado el juego en nivel {level}.
          Revisa tus resultados y vuelve a intentarlo para mejorar.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 w-full max-w-md">
        <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-100">
          <div className="text-sm text-green-600 font-medium">{stats.correct}</div>
          <div className="text-xs text-green-500">Correctos</div>
        </div>
        <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-100">
          <div className="text-sm text-red-600 font-medium">{stats.incorrect}</div>
          <div className="text-xs text-red-500">Incorrectos</div>
        </div>
        <div className="px-4 py-3 rounded-lg bg-gray-50 border border-gray-100">
          <div className="text-sm text-gray-600 font-medium">{stats.skipped}</div>
          <div className="text-xs text-gray-500">Saltados</div>
        </div>
      </div>

      <div className="space-y-3 w-full max-w-md">
        <Button 
          onClick={onPlayAgain}
          className={cn("w-full", getCategoryColor(), "text-white")}
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Jugar de nuevo
        </Button>
        <Button 
          onClick={onChangeSettings}
          variant="outline" 
          className="w-full"
        >
          Cambiar configuración
        </Button>
      </div>
    </motion.div>
  );
};

export default GameComplete;
