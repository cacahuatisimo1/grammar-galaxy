
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import CategoryChip from "@/components/CategoryChip";
import { Game } from "@/data/games";

interface GameSummaryProps {
  game: Game;
}

const GameSummary = ({ game }: GameSummaryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mb-4"
    >
      <div className="flex items-center flex-wrap gap-2 mb-2">
        <CategoryChip category={game.category} />
        <div className="flex items-center text-xs text-muted-foreground">
          <Trophy className="mr-1 h-3 w-3" />
          <span>3 niveles de dificultad</span>
        </div>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        {game.title}
      </h1>
      
      <p className="text-muted-foreground text-sm md:text-base line-clamp-2 mb-2">
        {game.longDescription}
      </p>
    </motion.div>
  );
};

export default GameSummary;
