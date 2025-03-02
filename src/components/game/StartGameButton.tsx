
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { CategoryType } from "@/components/CategoryChip";

interface StartGameButtonProps {
  category: CategoryType;
  isStarting: boolean;
  onStart: () => void;
}

const StartGameButton = ({ category, isStarting, onStart }: StartGameButtonProps) => {
  const getButtonClass = () => {
    if (category === "grammar") return "bg-grammar hover:bg-grammar/90";
    if (category === "vocabulary") return "bg-vocabulary hover:bg-vocabulary/90";
    if (category === "pronunciation") return "bg-pronunciation hover:bg-pronunciation/90";
    return "";
  };

  return (
    <Button 
      className={cn(
        "w-full h-10 px-4 text-white",
        getButtonClass(),
        isStarting ? "opacity-80 pointer-events-none" : ""
      )}
      onClick={onStart}
      disabled={isStarting}
    >
      {isStarting ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent border-current" />
          Cargando...
        </>
      ) : (
        <>
          <Play className="mr-2 h-4 w-4" />
          Comenzar juego
        </>
      )}
    </Button>
  );
};

export default StartGameButton;
