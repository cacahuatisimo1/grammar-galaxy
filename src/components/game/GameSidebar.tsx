
import { useState } from "react";
import { motion } from "framer-motion";
import { Game } from "@/data/games";
import GameIcon from "./GameIcon";
import LevelSelector from "./LevelSelector";
import StartGameButton from "./StartGameButton";

interface GameSidebarProps {
  game: Game;
}

const GameSidebar = ({ game }: GameSidebarProps) => {
  const [selectedLevel, setSelectedLevel] = useState("Intermedio");
  const [isStarting, setIsStarting] = useState(false);

  const handleStartGame = () => {
    setIsStarting(true);
    setTimeout(() => {
      setIsStarting(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="md:col-span-3 flex flex-col items-center md:items-start gap-4"
    >
      <GameIcon game={game} />

      <div className="w-full md:mt-auto space-y-3">
        <LevelSelector 
          game={game} 
          selectedLevel={selectedLevel} 
          onSelectLevel={setSelectedLevel} 
        />

        <StartGameButton
          category={game.category}
          isStarting={isStarting}
          onStart={handleStartGame}
        />
      </div>
    </motion.div>
  );
};

export default GameSidebar;
