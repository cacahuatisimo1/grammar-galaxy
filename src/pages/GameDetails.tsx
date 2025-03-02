
import { useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { games } from "@/data/games";
import GameNotFound from "@/components/game/GameNotFound";
import GameHeader from "@/components/game/GameHeader";
import GameSidebar from "@/components/game/GameSidebar";
import GameDetailsContent from "@/components/game/GameDetailsContent";

const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const game = games.find(g => g.id === id);
  
  if (!game) {
    return <GameNotFound />;
  }

  const getBgColor = () => {
    if (game.category === "grammar") return "bg-gradient-to-b from-grammar/10 to-transparent";
    if (game.category === "vocabulary") return "bg-gradient-to-b from-vocabulary/10 to-transparent";
    if (game.category === "pronunciation") return "bg-gradient-to-b from-pronunciation/10 to-transparent";
    return "bg-gradient-to-b from-primary/10 to-transparent";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col">
        <section className={cn(
          "flex-1 pt-16 pb-4",
          getBgColor()
        )}>
          <div className="container max-w-6xl mx-auto px-4 md:px-6 h-full flex flex-col">
            <GameHeader />
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              <GameSidebar game={game} />
              <GameDetailsContent game={game} />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GameDetails;
