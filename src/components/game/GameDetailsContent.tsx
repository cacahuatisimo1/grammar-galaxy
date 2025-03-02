
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameInfoTab from "./GameInfoTab";
import HowToPlayTab from "./HowToPlayTab";
import BenefitsTab from "./BenefitsTab";
import { Game } from "@/data/games";
import GameSummary from "./GameSummary";

interface GameDetailsContentProps {
  game: Game;
}

const GameDetailsContent = ({ game }: GameDetailsContentProps) => {
  return (
    <div className="md:col-span-9">
      <GameSummary game={game} />
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex-1"
      >
        <Tabs defaultValue="info" className="h-full flex flex-col">
          <TabsList className="justify-start mb-3">
            <TabsTrigger value="info">Información</TabsTrigger>
            <TabsTrigger value="how-to-play">Cómo jugar</TabsTrigger>
            <TabsTrigger value="benefits">Beneficios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="flex-1">
            <GameInfoTab game={game} />
          </TabsContent>
          
          <TabsContent value="how-to-play" className="flex-1 space-y-3">
            <HowToPlayTab />
          </TabsContent>
          
          <TabsContent value="benefits" className="flex-1 space-y-3">
            <BenefitsTab game={game} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default GameDetailsContent;
