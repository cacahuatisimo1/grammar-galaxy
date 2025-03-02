
import { cn } from "@/lib/utils";
import { Game } from "@/data/games";

interface GameIconProps {
  game: Game;
}

const GameIcon = ({ game }: GameIconProps) => {
  return (
    <div className={cn(
      "w-24 h-24 md:w-28 md:h-28 rounded-3xl flex items-center justify-center shadow-card mb-auto",
      game.category === "grammar" ? "bg-grammar-light" : "",
      game.category === "vocabulary" ? "bg-vocabulary-light" : "",
      game.category === "pronunciation" ? "bg-pronunciation-light" : ""
    )}>
      <div className="w-12 h-12 md:w-14 md:h-14">
        {game.icon}
      </div>
    </div>
  );
};

export default GameIcon;
