
import React from "react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Game } from "@/data/games";

interface GameLayoutProps {
  game: Game;
  children: React.ReactNode;
}

const GameLayout = ({ game, children }: GameLayoutProps) => {
  const getCategoryBgColor = () => {
    if (game.category === "grammar") return "bg-gradient-to-b from-grammar/10 to-transparent";
    if (game.category === "vocabulary") return "bg-gradient-to-b from-vocabulary/10 to-transparent";
    return "bg-gradient-to-b from-pronunciation/10 to-transparent";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16 pb-4" style={{ background: getCategoryBgColor() }}>
        <div className="container max-w-6xl mx-auto px-4 md:px-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{game.title}</h1>
              <p className="text-muted-foreground">
                {game.shortDescription}
              </p>
            </div>
          </div>

          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GameLayout;
