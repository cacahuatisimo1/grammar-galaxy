
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Check, X, RefreshCw, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Game } from "@/data/games";
import { games } from "@/data/games";
import { cn } from "@/lib/utils";

interface Verb {
  base: string;
  pastSimple: string;
  pastParticiple: string;
  spanish: string;
}

const verbsList: Verb[] = [
  { base: "be", pastSimple: "was/were", pastParticiple: "been", spanish: "ser/estar" },
  { base: "begin", pastSimple: "began", pastParticiple: "begun", spanish: "comenzar" },
  { base: "break", pastSimple: "broke", pastParticiple: "broken", spanish: "romper" },
  { base: "bring", pastSimple: "brought", pastParticiple: "brought", spanish: "traer" },
  { base: "buy", pastSimple: "bought", pastParticiple: "bought", spanish: "comprar" },
  { base: "choose", pastSimple: "chose", pastParticiple: "chosen", spanish: "elegir" },
  { base: "come", pastSimple: "came", pastParticiple: "come", spanish: "venir" },
  { base: "cost", pastSimple: "cost", pastParticiple: "cost", spanish: "costar" },
  { base: "cut", pastSimple: "cut", pastParticiple: "cut", spanish: "cortar" },
  { base: "do", pastSimple: "did", pastParticiple: "done", spanish: "hacer" },
  { base: "draw", pastSimple: "drew", pastParticiple: "drawn", spanish: "dibujar" },
  { base: "drive", pastSimple: "drove", pastParticiple: "driven", spanish: "conducir" },
  { base: "eat", pastSimple: "ate", pastParticiple: "eaten", spanish: "comer" },
  { base: "feel", pastSimple: "felt", pastParticiple: "felt", spanish: "sentir" },
  { base: "find", pastSimple: "found", pastParticiple: "found", spanish: "encontrar" },
  { base: "fly", pastSimple: "flew", pastParticiple: "flown", spanish: "volar" },
  { base: "forget", pastSimple: "forgot", pastParticiple: "forgotten", spanish: "olvidar" },
  { base: "get", pastSimple: "got", pastParticiple: "got/gotten", spanish: "obtener" },
  { base: "give", pastSimple: "gave", pastParticiple: "given", spanish: "dar" },
  { base: "go", pastSimple: "went", pastParticiple: "gone", spanish: "ir" },
];

// Game difficulty levels
const levels = {
  Principiante: { verbs: 10, hints: true, timePerVerb: 20 },
  Intermedio: { verbs: 15, hints: true, timePerVerb: 15 },
  Avanzado: { verbs: 20, hints: false, timePerVerb: 10 },
};

enum GameStage {
  READY = "ready",
  PLAYING = "playing",
  COMPLETED = "completed",
}

enum FormToFill {
  PAST_SIMPLE = "pastSimple",
  PAST_PARTICIPLE = "pastParticiple",
  BOTH = "both",
}

const VerbFormsGame = () => {
  const game = games.find((g) => g.id === "verb-forms-game") as Game;
  const [level, setLevel] = useState("Principiante");
  const [gameStage, setGameStage] = useState<GameStage>(GameStage.READY);
  const [formToFill, setFormToFill] = useState<FormToFill>(FormToFill.BOTH);
  const [gameVerbs, setGameVerbs] = useState<Verb[]>([]);
  const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
  const [pastSimpleInput, setPastSimpleInput] = useState("");
  const [pastParticipleInput, setPastParticipleInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, skipped: 0 });
  const [isChecking, setIsChecking] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const levelSettings = levels[level as keyof typeof levels];

  // Initialize the game with random verbs
  const initializeGame = () => {
    const shuffled = [...verbsList].sort(() => 0.5 - Math.random());
    const selectedVerbs = shuffled.slice(0, levelSettings.verbs);
    setGameVerbs(selectedVerbs);
    setCurrentVerbIndex(0);
    setPastSimpleInput("");
    setPastParticipleInput("");
    setTimeLeft(levelSettings.timePerVerb);
    setStats({ correct: 0, incorrect: 0, skipped: 0 });
    setGameStage(GameStage.PLAYING);
    setShowAnswer(false);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkAnswer();
  };

  // Check if the answer is correct
  const checkAnswer = () => {
    if (isChecking) return;

    setIsChecking(true);
    const currentVerb = gameVerbs[currentVerbIndex];
    let isCorrect = true;

    if (formToFill === FormToFill.PAST_SIMPLE || formToFill === FormToFill.BOTH) {
      if (pastSimpleInput.toLowerCase() !== currentVerb.pastSimple) {
        isCorrect = false;
      }
    }

    if (formToFill === FormToFill.PAST_PARTICIPLE || formToFill === FormToFill.BOTH) {
      if (pastParticipleInput.toLowerCase() !== currentVerb.pastParticiple) {
        isCorrect = false;
      }
    }

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
      moveToNextVerb();
      setIsChecking(false);
      setShowAnswer(false);
    }, showAnswer ? 3000 : 1000);
  };

  // Skip the current verb
  const skipVerb = () => {
    setStats((prev) => ({ ...prev, skipped: prev.skipped + 1 }));
    setShowAnswer(true);
    
    setTimeout(() => {
      moveToNextVerb();
      setShowAnswer(false);
    }, 2000);
  };

  // Move to the next verb or end the game
  const moveToNextVerb = () => {
    if (currentVerbIndex < gameVerbs.length - 1) {
      setCurrentVerbIndex((prev) => prev + 1);
      setPastSimpleInput("");
      setPastParticipleInput("");
      setTimeLeft(levelSettings.timePerVerb);
    } else {
      setGameStage(GameStage.COMPLETED);
    }
  };

  // Reset the game
  const resetGame = () => {
    setGameStage(GameStage.READY);
  };

  // Timer effect
  useEffect(() => {
    if (gameStage !== GameStage.PLAYING) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          skipVerb();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStage, currentVerbIndex]);

  // Calculate the score percentage
  const scorePercentage = Math.round(
    (stats.correct / (stats.correct + stats.incorrect + stats.skipped)) * 100
  ) || 0;

  const getCategoryColor = () => {
    return "text-grammar";
  };

  const getCategoryBgColor = () => {
    return "bg-grammar";
  };

  const getCategoryLightBgColor = () => {
    return "bg-grammar-light";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16 pb-4 bg-gradient-to-b from-grammar/10 to-transparent">
        <div className="container max-w-6xl mx-auto px-4 md:px-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Verb Forms Game</h1>
              <p className="text-muted-foreground">
                Practica los verbos irregulares en inglés
              </p>
            </div>
            <div className="flex space-x-2">
              {game.levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                    level === lvl
                      ? "bg-grammar text-white"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                  disabled={gameStage === GameStage.PLAYING}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-soft border p-6 mb-6">
            {gameStage === GameStage.READY && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className={cn("w-20 h-20 rounded-full flex items-center justify-center", getCategoryLightBgColor())}>
                  {game.icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Verb Forms Game</h2>
                  <p className="text-muted-foreground max-w-md mx-auto mb-4">
                    Pon a prueba tu conocimiento de los verbos irregulares en inglés completando
                    el pasado simple y participio pasado de cada verbo.
                  </p>
                </div>

                <div className="space-y-4 w-full max-w-md">
                  <div className="flex justify-between px-4 py-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-muted-foreground">Número de verbos:</span>
                    <span className="text-sm font-medium">{levelSettings.verbs}</span>
                  </div>
                  <div className="flex justify-between px-4 py-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-muted-foreground">Tiempo por verbo:</span>
                    <span className="text-sm font-medium">{levelSettings.timePerVerb} segundos</span>
                  </div>
                  <div className="flex justify-between px-4 py-3 rounded-lg bg-muted/50">
                    <span className="text-sm text-muted-foreground">Pistas en español:</span>
                    <span className="text-sm font-medium">{levelSettings.hints ? "Sí" : "No"}</span>
                  </div>
                </div>

                <div className="space-y-3 w-full max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Formas verbales a completar:</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        className={cn(
                          "p-2 rounded border text-sm font-medium",
                          formToFill === FormToFill.PAST_SIMPLE 
                            ? "border-grammar bg-grammar-light/50" 
                            : "border-muted bg-transparent hover:bg-muted/30"
                        )}
                        onClick={() => setFormToFill(FormToFill.PAST_SIMPLE)}
                      >
                        Past Simple
                      </button>
                      <button 
                        className={cn(
                          "p-2 rounded border text-sm font-medium",
                          formToFill === FormToFill.PAST_PARTICIPLE 
                            ? "border-grammar bg-grammar-light/50" 
                            : "border-muted bg-transparent hover:bg-muted/30"
                        )}
                        onClick={() => setFormToFill(FormToFill.PAST_PARTICIPLE)}
                      >
                        Past Participle
                      </button>
                      <button 
                        className={cn(
                          "p-2 rounded border text-sm font-medium",
                          formToFill === FormToFill.BOTH 
                            ? "border-grammar bg-grammar-light/50" 
                            : "border-muted bg-transparent hover:bg-muted/30"
                        )}
                        onClick={() => setFormToFill(FormToFill.BOTH)}
                      >
                        Ambos
                      </button>
                    </div>
                  </div>
                </div>

                <Button 
                  className={cn(
                    "w-full max-w-md", 
                    getCategoryBgColor(), 
                    "hover:bg-grammar/90 text-white"
                  )}
                  onClick={initializeGame}
                >
                  Comenzar juego
                </Button>
              </motion.div>
            )}

            {gameStage === GameStage.PLAYING && gameVerbs.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={cn("w-8 h-8 rounded-full flex items-center justify-center", getCategoryBgColor(), "text-white")}>
                      <span className="text-xs font-medium">{currentVerbIndex + 1}</span>
                    </div>
                    <span className="text-sm font-medium">de {gameVerbs.length}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-muted/50 rounded-full w-20 h-6 relative overflow-hidden">
                      <motion.div
                        className={cn("absolute top-0 left-0 h-full", getCategoryBgColor())}
                        initial={{ width: "100%" }}
                        animate={{ width: `${(timeLeft / levelSettings.timePerVerb) * 100}%` }}
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
                        Verbo en infinitivo
                      </span>
                    </div>
                    <div className="text-3xl font-bold mb-2">
                      {gameVerbs[currentVerbIndex].base}
                    </div>
                    {levelSettings.hints && (
                      <div className="text-sm text-muted-foreground">
                        ({gameVerbs[currentVerbIndex].spanish})
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {(formToFill === FormToFill.PAST_SIMPLE || formToFill === FormToFill.BOTH) && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Past Simple</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={pastSimpleInput}
                            onChange={(e) => setPastSimpleInput(e.target.value)}
                            className={cn(
                              "w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                              showAnswer
                                ? pastSimpleInput.toLowerCase() === gameVerbs[currentVerbIndex].pastSimple
                                  ? "border-green-500 focus:ring-green-500/30"
                                  : "border-red-500 focus:ring-red-500/30"
                                : "border-input focus:ring-grammar/30"
                            )}
                            placeholder="Escribe aquí"
                            autoFocus
                            disabled={showAnswer}
                          />
                          {showAnswer && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              {pastSimpleInput.toLowerCase() === gameVerbs[currentVerbIndex].pastSimple ? (
                                <Check className="text-green-500" size={18} />
                              ) : (
                                <X className="text-red-500" size={18} />
                              )}
                            </div>
                          )}
                        </div>
                        {showAnswer && pastSimpleInput.toLowerCase() !== gameVerbs[currentVerbIndex].pastSimple && (
                          <p className="text-sm text-red-500">
                            Correcto: <span className="font-medium">{gameVerbs[currentVerbIndex].pastSimple}</span>
                          </p>
                        )}
                      </div>
                    )}

                    {(formToFill === FormToFill.PAST_PARTICIPLE || formToFill === FormToFill.BOTH) && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Past Participle</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={pastParticipleInput}
                            onChange={(e) => setPastParticipleInput(e.target.value)}
                            className={cn(
                              "w-full p-3 rounded-lg border focus:outline-none focus:ring-2 transition-all",
                              showAnswer
                                ? pastParticipleInput.toLowerCase() === gameVerbs[currentVerbIndex].pastParticiple
                                  ? "border-green-500 focus:ring-green-500/30"
                                  : "border-red-500 focus:ring-red-500/30"
                                : "border-input focus:ring-grammar/30"
                            )}
                            placeholder="Escribe aquí"
                            disabled={showAnswer}
                          />
                          {showAnswer && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              {pastParticipleInput.toLowerCase() === gameVerbs[currentVerbIndex].pastParticiple ? (
                                <Check className="text-green-500" size={18} />
                              ) : (
                                <X className="text-red-500" size={18} />
                              )}
                            </div>
                          )}
                        </div>
                        {showAnswer && pastParticipleInput.toLowerCase() !== gameVerbs[currentVerbIndex].pastParticiple && (
                          <p className="text-sm text-red-500">
                            Correcto: <span className="font-medium">{gameVerbs[currentVerbIndex].pastParticiple}</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-3 max-w-2xl mx-auto">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={skipVerb}
                      disabled={isChecking || showAnswer}
                    >
                      Saltar
                    </Button>
                    <Button
                      type="submit"
                      className={cn("flex-1", getCategoryBgColor(), "hover:bg-grammar/90 text-white")}
                      disabled={
                        isChecking || 
                        showAnswer || 
                        (formToFill === FormToFill.PAST_SIMPLE && !pastSimpleInput) || 
                        (formToFill === FormToFill.PAST_PARTICIPLE && !pastParticipleInput) ||
                        (formToFill === FormToFill.BOTH && (!pastSimpleInput || !pastParticipleInput))
                      }
                    >
                      Comprobar
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {gameStage === GameStage.COMPLETED && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-center space-y-6"
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
                    Has completado el juego de verbos irregulares en nivel {level}.
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
                    onClick={initializeGame}
                    className={cn("w-full", getCategoryBgColor(), "hover:bg-grammar/90 text-white")}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Jugar de nuevo
                  </Button>
                  <Button 
                    onClick={resetGame}
                    variant="outline" 
                    className="w-full"
                  >
                    Cambiar configuración
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VerbFormsGame;
