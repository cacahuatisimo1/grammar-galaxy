
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { games } from "@/data/games";
import GameLayout from "@/components/game/GameLayout";
import GameStart from "@/components/game/GameStart";
import GameComplete from "@/components/game/GameComplete";

// Tipos y datos del juego
interface VocabularyItem {
  english: string;
  spanish: string;
  category: string;
}

const vocabularyItems: VocabularyItem[] = [
  { english: "apple", spanish: "manzana", category: "food" },
  { english: "house", spanish: "casa", category: "buildings" },
  { english: "car", spanish: "coche", category: "transportation" },
  { english: "book", spanish: "libro", category: "objects" },
  { english: "dog", spanish: "perro", category: "animals" },
  { english: "cat", spanish: "gato", category: "animals" },
  { english: "table", spanish: "mesa", category: "furniture" },
  { english: "chair", spanish: "silla", category: "furniture" },
  { english: "water", spanish: "agua", category: "food" },
  { english: "tree", spanish: "árbol", category: "nature" },
  { english: "sun", spanish: "sol", category: "nature" },
  { english: "moon", spanish: "luna", category: "nature" },
  { english: "computer", spanish: "ordenador", category: "technology" },
  { english: "phone", spanish: "teléfono", category: "technology" },
  { english: "school", spanish: "escuela", category: "buildings" },
  { english: "teacher", spanish: "profesor/a", category: "professions" },
  { english: "doctor", spanish: "médico/a", category: "professions" },
  { english: "city", spanish: "ciudad", category: "places" },
  { english: "country", spanish: "país", category: "places" },
  { english: "friend", spanish: "amigo/a", category: "people" },
];

// Configuración del juego
const levels = {
  Principiante: { items: 10, timePerItem: 15, showHints: true },
  Intermedio: { items: 15, timePerItem: 12, showHints: true },
  Avanzado: { items: 20, timePerItem: 10, showHints: false },
};

enum GameStage {
  READY = "ready",
  PLAYING = "playing",
  COMPLETED = "completed",
}

enum Direction {
  ENGLISH_TO_SPANISH = "english_to_spanish",
  SPANISH_TO_ENGLISH = "spanish_to_english",
}

const VocabularyQuizGame = () => {
  const game = games.find((g) => g.id === "vocabulary-quiz-game")!;
  const [level, setLevel] = useState("Principiante");
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.READY);
  const [direction, setDirection] = useState<Direction>(Direction.ENGLISH_TO_SPANISH);
  const [gameItems, setGameItems] = useState<VocabularyItem[]>([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, skipped: 0 });
  const [isChecking, setIsChecking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const levelSettings = levels[level as keyof typeof levels];

  // Inicializar el juego con elementos aleatorios
  const initializeGame = () => {
    const shuffled = [...vocabularyItems].sort(() => 0.5 - Math.random());
    const selectedItems = shuffled.slice(0, levelSettings.items);
    setGameItems(selectedItems);
    setCurrentItemIndex(0);
    setUserAnswer("");
    setTimeLeft(levelSettings.timePerItem);
    setStats({ correct: 0, incorrect: 0, skipped: 0 });
    setGameStage(GameStage.PLAYING);
    setShowAnswer(false);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkAnswer();
  };

  // Verificar si la respuesta es correcta
  const checkAnswer = () => {
    if (isChecking) return;

    setIsChecking(true);
    const currentItem = gameItems[currentItemIndex];
    
    // Comparar respuesta según dirección de traducción
    const correctAnswer = direction === Direction.ENGLISH_TO_SPANISH 
      ? currentItem.spanish 
      : currentItem.english;
    
    const isCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase();

    if (isCorrect) {
      setStats((prev) => ({ ...prev, correct: prev.correct + 1 }));
      toast({
        description: "¡Correcto!",
        className: "bg-green-500 text-white",
      });
    } else {
      setStats((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
      setShowAnswer(true);
      toast({
        description: "Incorrecto. Revisa la respuesta correcta.",
        className: "bg-red-500 text-white",
      });
    }

    setTimeout(() => {
      moveToNextItem();
      setIsChecking(false);
      setShowAnswer(false);
    }, showAnswer ? 3000 : 1000);
  };

  // Saltar el elemento actual
  const skipItem = () => {
    setStats((prev) => ({ ...prev, skipped: prev.skipped + 1 }));
    setShowAnswer(true);
    
    setTimeout(() => {
      moveToNextItem();
      setShowAnswer(false);
    }, 2000);
  };

  // Pasar al siguiente elemento o finalizar el juego
  const moveToNextItem = () => {
    if (currentItemIndex < gameItems.length - 1) {
      setCurrentItemIndex((prev) => prev + 1);
      setUserAnswer("");
      setTimeLeft(levelSettings.timePerItem);
    } else {
      setGameStage(GameStage.COMPLETED);
    }
  };

  // Restablecer el juego
  const resetGame = () => {
    setGameStage(GameStage.READY);
  };

  // Temporizador
  useEffect(() => {
    if (gameStage !== GameStage.PLAYING) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          skipItem();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStage, currentItemIndex]);

  const getCategoryBgColor = () => {
    return "bg-vocabulary";
  };

  // Opciones personalizadas para el componente GameStart
  const customOptions = (
    <div className="space-y-3 w-full max-w-md">
      <div className="space-y-2">
        <label className="text-sm font-medium">Dirección de traducción:</label>
        <div className="grid grid-cols-2 gap-2">
          <button 
            className={cn(
              "p-2 rounded border text-sm font-medium",
              direction === Direction.ENGLISH_TO_SPANISH
                ? "border-vocabulary bg-vocabulary-light/50" 
                : "border-muted bg-transparent hover:bg-muted/30"
            )}
            onClick={() => setDirection(Direction.ENGLISH_TO_SPANISH)}
          >
            Inglés → Español
          </button>
          <button 
            className={cn(
              "p-2 rounded border text-sm font-medium",
              direction === Direction.SPANISH_TO_ENGLISH
                ? "border-vocabulary bg-vocabulary-light/50" 
                : "border-muted bg-transparent hover:bg-muted/30"
            )}
            onClick={() => setDirection(Direction.SPANISH_TO_ENGLISH)}
          >
            Español → Inglés
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <GameLayout game={game}>
      {gameStage === GameStage.READY && (
        <GameStart
          game={game}
          levels={game.levels}
          selectedLevel={level}
          onSelectLevel={setLevel}
          onStartGame={initializeGame}
          customOptions={customOptions}
        />
      )}

      {gameStage === GameStage.PLAYING && gameItems.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 bg-white rounded-xl shadow-soft border p-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", getCategoryBgColor(), "text-white")}>
                <span className="text-xs font-medium">{currentItemIndex + 1}</span>
              </div>
              <span className="text-sm font-medium">de {gameItems.length}</span>
            </div>
            <div className="flex items-center">
              <div className="bg-muted/50 rounded-full w-20 h-6 relative overflow-hidden">
                <motion.div
                  className={cn("absolute top-0 left-0 h-full", getCategoryBgColor())}
                  initial={{ width: "100%" }}
                  animate={{ width: `${(timeLeft / levelSettings.timePerItem) * 100}%` }}
                  transition={{ type: "tween", duration: 1 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium text-white">
                    {timeLeft}s
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-6 bg-muted/30 rounded-xl flex flex-col items-center text-center">
              <div className="mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {direction === Direction.ENGLISH_TO_SPANISH ? "Traduce al español" : "Traduce al inglés"}
                </span>
              </div>
              <div className="text-3xl font-bold mb-2">
                {direction === Direction.ENGLISH_TO_SPANISH 
                  ? gameItems[currentItemIndex].english 
                  : gameItems[currentItemIndex].spanish}
              </div>
              {levelSettings.showHints && (
                <div className="text-sm text-muted-foreground">
                  Categoría: {gameItems[currentItemIndex].category}
                </div>
              )}
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <label className="text-sm font-medium">
                Tu respuesta
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className={cn(
                    "w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                    showAnswer
                      ? (userAnswer.toLowerCase().trim() === (direction === Direction.ENGLISH_TO_SPANISH 
                          ? gameItems[currentItemIndex].spanish 
                          : gameItems[currentItemIndex].english).toLowerCase())
                        ? "border-green-500 focus:ring-green-500/30"
                        : "border-red-500 focus:ring-red-500/30"
                      : "border-input focus:ring-vocabulary/30"
                  )}
                  placeholder="Escribe aquí"
                  autoFocus
                  disabled={showAnswer}
                />
                {showAnswer && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {(userAnswer.toLowerCase().trim() === (direction === Direction.ENGLISH_TO_SPANISH 
                      ? gameItems[currentItemIndex].spanish 
                      : gameItems[currentItemIndex].english).toLowerCase()) ? (
                      <Check className="text-green-500" size={18} />
                    ) : (
                      <X className="text-red-500" size={18} />
                    )}
                  </div>
                )}
              </div>
              {showAnswer && !(userAnswer.toLowerCase().trim() === (direction === Direction.ENGLISH_TO_SPANISH 
                ? gameItems[currentItemIndex].spanish 
                : gameItems[currentItemIndex].english).toLowerCase()) && (
                <p className="text-sm text-red-500">
                  Correcto: <span className="font-medium">
                    {direction === Direction.ENGLISH_TO_SPANISH 
                      ? gameItems[currentItemIndex].spanish 
                      : gameItems[currentItemIndex].english}
                  </span>
                </p>
              )}
            </div>

            <div className="flex space-x-3 max-w-md mx-auto">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={skipItem}
                disabled={isChecking || showAnswer}
              >
                Saltar
              </Button>
              <Button
                type="submit"
                className={cn("flex-1", getCategoryBgColor(), "hover:bg-vocabulary/90 text-white")}
                disabled={isChecking || showAnswer || !userAnswer.trim()}
              >
                Comprobar
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {gameStage === GameStage.COMPLETED && (
        <GameComplete
          game={game}
          level={level}
          stats={stats}
          onPlayAgain={initializeGame}
          onChangeSettings={resetGame}
        />
      )}
    </GameLayout>
  );
};

export default VocabularyQuizGame;
