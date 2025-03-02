
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryChip from "@/components/CategoryChip";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Play, 
  Book, 
  Mic, 
  Palette, 
  Zap, 
  BookOpen, 
  Brain, 
  Clock, 
  Pencil, 
  Music, 
  Trophy, 
  Star,
  Info,
  CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";

// Define game data (same as in Index.tsx)
const games = [
  {
    id: "grammar-game",
    title: "Grammar Game",
    description: "Practica la gramática, especialmente los verbos y estructuras gramaticales.",
    category: "grammar" as const,
    iconSrc: "/grammar-icon.svg",
    icon: <Book className="w-6 h-6 text-grammar" />,
    longDescription: "Este juego te ayuda a mejorar tu comprensión y uso de la gramática inglesa. Practicarás diversos tiempos verbales, estructuras gramaticales y reglas para formar oraciones correctas. Perfecto para reforzar las bases de la gramática inglesa a través de ejercicios interactivos.",
    levels: ["Principiante", "Intermedio", "Avanzado"],
    skills: ["Comprensión gramatical", "Tiempos verbales", "Estructuras de oraciones"]
  },
  {
    id: "vocabulary-game",
    title: "Vocabulary Game",
    description: "Aprende vocabulario relacionado con categorías específicas y expande tu léxico.",
    category: "vocabulary" as const,
    iconSrc: "/vocabulary-icon.svg",
    icon: <BookOpen className="w-6 h-6 text-vocabulary" />,
    longDescription: "Amplía tu vocabulario en inglés a través de ejercicios prácticos organizados por categorías temáticas. Aprenderás nuevas palabras y frases, y reforzarás tu memoria a largo plazo mediante repetición espaciada y asociaciones visuales.",
    levels: ["Principiante", "Intermedio", "Avanzado"],
    skills: ["Memorización", "Asociación", "Categorización"]
  },
  {
    id: "tongue-twister-game",
    title: "Tongue Twister Game",
    description: "Mejora tu pronunciación y fluidez con divertidos trabalenguas en inglés.",
    category: "pronunciation" as const,
    iconSrc: "/tongue-twister-icon.svg",
    icon: <Music className="w-6 h-6 text-pronunciation" />,
    longDescription: "Perfecciona tu pronunciación con trabalenguas divertidos que desafían tu capacidad para articular sonidos específicos del inglés. Mejora tu fluidez y claridad al hablar a través de la práctica de patrones sonoros complejos.",
    levels: ["Principiante", "Intermedio", "Avanzado"],
    skills: ["Articulación", "Ritmo", "Entonación"]
  },
  {
    id: "speak-and-score-game",
    title: "Speak and Score Game",
    description: "Practica tu pronunciación y recibe una puntuación basada en tu precisión.",
    category: "pronunciation" as const,
    iconSrc: "/speak-score-icon.svg",
    icon: <Mic className="w-6 h-6 text-pronunciation" />,
    longDescription: "Este juego utiliza tecnología de reconocimiento de voz para evaluar la precisión de tu pronunciación. Recibirás retroalimentación detallada sobre tu articulación, entonación y ritmo, permitiéndote mejorar de manera progresiva.",
    levels: ["Principiante", "Intermedio", "Avanzado"],
    skills: ["Claridad", "Entonación", "Precisión fonética"]
  },
  {
    id: "minimal-pairs-duel",
    title: "Minimal Pairs Duel",
    description: "Compara pares de palabras con sonidos similares y mejora tu discriminación auditiva.",
    category: "pronunciation" as const,
    iconSrc: "/minimal-pairs-icon.svg",
    icon: <Mic className="w-6 h-6 text-pronunciation" />,
    longDescription: "Entrena tu oído para distinguir entre pares mínimos (palabras que difieren en un solo sonido) como 'ship/sheep' o 'bed/bad'. Esta habilidad es fundamental para entender y ser entendido en conversaciones reales.",
    levels: ["Principiante", "Intermedio", "Avanzado"],
    skills: ["Discriminación auditiva", "Percepción fonética", "Atención al detalle"]
  },
  {
    id: "word-rush-game",
    title: "Word Rush Game",
    description: "Selecciona palabras correctas rápidamente para mejorar tu velocidad y precisión.",
    category: "vocabulary" as const,
    iconSrc: "/word-rush-icon.svg",
    icon: <Zap className="w-6 h-6 text-vocabulary" />,
    longDescription: "Pon a prueba tu velocidad mental y conocimiento de vocabulario con este juego contrarreloj. Deberás identificar palabras correctas entre varias opciones, mejorando tu tiempo de respuesta y consolidando tu vocabulario activo.",
    levels: ["Principiante", "Intermedio", "Avanzado"],
    skills: ["Velocidad de procesamiento", "Reconocimiento de palabras", "Toma de decisiones"]
  },
  {
    id: "spelling-bee-game",
    title: "Spelling Bee Game",
    description: "Practica la ortografía escuchando palabras y escribiéndolas correctamente.",
    category: "vocabulary" as const,
    iconSrc: "/spelling-bee-icon.svg",
    icon: <Pencil className="w-6 h-6 text-vocabulary" />,
    longDescription: "Mejora tu ortografía en inglés con este juego al estilo concurso de deletreo. Escucharás palabras que deberás escribir correctamente, enfrentando los desafíos de la compleja ortografía inglesa mientras amplías tu vocabulario.",
    levels: ["Principiante", "Intermedio", "Avanzado"],
    skills: ["Ortografía", "Comprensión auditiva", "Memoria visual"]
  },
  {
    id: "verb-forms-game",
    title: "Verb Forms Game",
    description: "Domina las diferentes formas verbales y tiempos en inglés.",
    category: "grammar" as const,
    iconSrc: "/verb-forms-icon.svg",
    icon: <Book className="w-6 h-6 text-grammar" />,
    longDescription: "Especializado en el aprendizaje y práctica de los verbos ingleses en todos sus tiempos y formas. Trabaja con verbos regulares e irregulares, y desarrolla tu intuición gramatical para usar correctamente cada tiempo verbal según el contexto.",
    levels: ["Principiante", "Intermedio", "Avanzado"],
    skills: ["Conjugación verbal", "Verbos irregulares", "Tiempos verbales"]
  },
  {
    id: "number-race-game",
    title: "Number Race Game",
    description: "Mejora tu comprensión y pronunciación de números en inglés.",
    category: "vocabulary" as const,
    iconSrc: "/number-race-icon.svg",
    icon: <Clock className="w-6 h-6 text-vocabulary" />,
    longDescription: "Enfocado en la comprensión y pronunciación de números en inglés, desde cifras básicas hasta fechas, precios y grandes cantidades. Perfecto para desarrollar fluidez en situaciones cotidianas que involucran números.",
    levels: ["Principiante", "Intermedio", "Avanzado"],
    skills: ["Comprensión numérica", "Pronunciación", "Escucha activa"]
  },
  {
    id: "paint-drawing-game",
    title: "Paint Drawing Game",
    description: "Asocia palabras con imágenes para una mejor retención de vocabulario.",
    category: "vocabulary" as const,
    iconSrc: "/paint-drawing-icon.svg",
    icon: <Palette className="w-6 h-6 text-vocabulary" />,
    longDescription: "Combina el aprendizaje visual con el verbal dibujando conceptos relacionados con palabras específicas. Este enfoque multisensorial fortalece las conexiones neuronales y mejora significativamente la retención del vocabulario a largo plazo.",
    levels: ["Principiante", "Intermedio", "Avanzado"],
    skills: ["Asociación visual", "Creatividad", "Memoria visual"]
  }
];

const GameDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState("Intermedio");
  const [isStarting, setIsStarting] = useState(false);
  
  // Find the game with the matching ID
  const game = games.find(g => g.id === id);
  
  // Handle case where game is not found
  if (!game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-28 pb-20 container max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Juego no encontrado</h1>
            <p className="text-muted-foreground mb-8">Lo sentimos, el juego que buscas no existe.</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleStartGame = () => {
    setIsStarting(true);
    // In a real app, this would navigate to the actual game
    setTimeout(() => {
      // For now, just simulate a game start
      setIsStarting(false);
      // navigate(`/play/${id}?level=${selectedLevel}`);
    }, 2000);
  };
  
  // Determine background color based on category
  const getBgColor = () => {
    if (game.category === "grammar") return "bg-gradient-to-b from-grammar/10 to-transparent";
    if (game.category === "vocabulary") return "bg-gradient-to-b from-vocabulary/10 to-transparent";
    if (game.category === "pronunciation") return "bg-gradient-to-b from-pronunciation/10 to-transparent";
    return "bg-gradient-to-b from-primary/10 to-transparent";
  };
  
  // Determine button color based on category
  const getButtonClass = () => {
    if (game.category === "grammar") return "bg-grammar hover:bg-grammar/90";
    if (game.category === "vocabulary") return "bg-vocabulary hover:bg-vocabulary/90";
    if (game.category === "pronunciation") return "bg-pronunciation hover:bg-pronunciation/90";
    return "";
  };

  // Get color for decorative elements
  const getCategoryColor = () => {
    if (game.category === "grammar") return "text-grammar";
    if (game.category === "vocabulary") return "text-vocabulary";
    if (game.category === "pronunciation") return "text-pronunciation";
    return "text-primary";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        {/* Hero section with game info */}
        <section className={cn(
          "pt-12 pb-20",
          getBgColor()
        )}>
          <div className="container max-w-6xl mx-auto px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                onClick={() => navigate('/')}
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors focus-ring rounded-md px-2 py-1"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Volver a los juegos
              </button>
            </motion.div>
            
            <div className="md:flex items-start gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="shrink-0 mb-6 md:mb-0 flex justify-center md:block"
              >
                <div className={cn(
                  "w-32 h-32 rounded-3xl flex items-center justify-center shadow-card",
                  game.category === "grammar" ? "bg-grammar-light" : "",
                  game.category === "vocabulary" ? "bg-vocabulary-light" : "",
                  game.category === "pronunciation" ? "bg-pronunciation-light" : ""
                )}>
                  <div className="w-16 h-16">
                    {game.icon}
                  </div>
                </div>
              </motion.div>
              
              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-center flex-wrap gap-3 mb-3">
                    <CategoryChip category={game.category} />
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Trophy className="mr-1 h-4 w-4" />
                      <span>3 niveles de dificultad</span>
                    </div>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold mb-3">
                    {game.title}
                  </h1>
                  
                  <p className="text-muted-foreground text-lg mb-6">
                    {game.longDescription}
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/80 backdrop-blur-xs rounded-xl border p-4 shadow-soft">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        Niveles disponibles
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {game.levels.map((level) => (
                          <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                              selectedLevel === level
                                ? game.category === "grammar" ? "bg-grammar text-white" :
                                  game.category === "vocabulary" ? "bg-vocabulary text-white" :
                                  "bg-pronunciation text-white"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            )}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-xs rounded-xl border p-4 shadow-soft">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        Habilidades que mejorarás
                      </h3>
                      <div className="space-y-2">
                        {game.skills.map((skill) => (
                          <div key={skill} className="flex items-center gap-2">
                            <CheckCircle2 className={cn("h-4 w-4", getCategoryColor())} />
                            <span className="text-sm">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button 
                    className={cn(
                      "h-12 px-6 text-white",
                      getButtonClass(),
                      isStarting ? "opacity-80 pointer-events-none" : ""
                    )}
                    onClick={handleStartGame}
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
                  
                  <Button variant="outline" className="h-12">
                    <Info className="mr-2 h-4 w-4" />
                    Ver instrucciones
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Game details section */}
        <section className="py-16 border-t">
          <div className="container max-w-6xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-2xl font-bold mb-6">Cómo jugar</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="rounded-full w-8 h-8 bg-muted flex items-center justify-center shrink-0">
                      <span className="font-semibold">1</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Selecciona tu nivel</h3>
                      <p className="text-muted-foreground text-sm">
                        Elige entre principiante, intermedio o avanzado según tu nivel de inglés.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="rounded-full w-8 h-8 bg-muted flex items-center justify-center shrink-0">
                      <span className="font-semibold">2</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Lee las instrucciones</h3>
                      <p className="text-muted-foreground text-sm">
                        Familiarízate con las reglas específicas y objetivos del juego.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="rounded-full w-8 h-8 bg-muted flex items-center justify-center shrink-0">
                      <span className="font-semibold">3</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Completa los ejercicios</h3>
                      <p className="text-muted-foreground text-sm">
                        Responde a las preguntas o realiza las actividades dentro del tiempo establecido.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="rounded-full w-8 h-8 bg-muted flex items-center justify-center shrink-0">
                      <span className="font-semibold">4</span>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Revisa tus resultados</h3>
                      <p className="text-muted-foreground text-sm">
                        Al finalizar, verás tu puntuación y consejos para mejorar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Beneficios de este juego</h2>
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-4 border shadow-soft">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "rounded-full p-2 shrink-0",
                        game.category === "grammar" ? "bg-grammar-light" : "",
                        game.category === "vocabulary" ? "bg-vocabulary-light" : "",
                        game.category === "pronunciation" ? "bg-pronunciation-light" : ""
                      )}>
                        <Brain className={cn("h-5 w-5", getCategoryColor())} />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Aprendizaje efectivo</h3>
                        <p className="text-muted-foreground text-sm">
                          Refuerza tus conocimientos mediante la práctica activa y repetición espaciada.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border shadow-soft">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "rounded-full p-2 shrink-0",
                        game.category === "grammar" ? "bg-grammar-light" : "",
                        game.category === "vocabulary" ? "bg-vocabulary-light" : "",
                        game.category === "pronunciation" ? "bg-pronunciation-light" : ""
                      )}>
                        <Zap className={cn("h-5 w-5", getCategoryColor())} />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Motivación constante</h3>
                        <p className="text-muted-foreground text-sm">
                          Mantén el interés en el aprendizaje con dinámicas de juego entretenidas.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border shadow-soft">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "rounded-full p-2 shrink-0",
                        game.category === "grammar" ? "bg-grammar-light" : "",
                        game.category === "vocabulary" ? "bg-vocabulary-light" : "",
                        game.category === "pronunciation" ? "bg-pronunciation-light" : ""
                      )}>
                        <Star className={cn("h-5 w-5", getCategoryColor())} />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Progreso medible</h3>
                        <p className="text-muted-foreground text-sm">
                          Visualiza tu avance y observa tu mejora con estadísticas detalladas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button
                    className={cn(
                      "w-full h-12 text-white",
                      getButtonClass(),
                      isStarting ? "opacity-80 pointer-events-none" : ""
                    )}
                    onClick={handleStartGame}
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
                        Comenzar {game.title}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default GameDetails;
