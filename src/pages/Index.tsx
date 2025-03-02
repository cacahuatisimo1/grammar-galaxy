
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import GameCard from "@/components/GameCard";
import CategoryChip from "@/components/CategoryChip";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Book, Mic, Palette, ArrowRight, Zap, BookOpen, Brain, Clock, Pencil, Music } from "lucide-react";

// Define game data
const games = [
  {
    id: "grammar-game",
    title: "Grammar Game",
    description: "Practica la gramática, especialmente los verbos y estructuras gramaticales.",
    category: "grammar" as const,
    iconSrc: "/grammar-icon.svg", // Will be replaced with Lucide icon
    icon: <Book className="w-6 h-6 text-grammar" />,
  },
  {
    id: "vocabulary-game",
    title: "Vocabulary Game",
    description: "Aprende vocabulario relacionado con categorías específicas y expande tu léxico.",
    category: "vocabulary" as const,
    iconSrc: "/vocabulary-icon.svg", // Will be replaced with Lucide icon
    icon: <BookOpen className="w-6 h-6 text-vocabulary" />,
  },
  {
    id: "tongue-twister-game",
    title: "Tongue Twister Game",
    description: "Mejora tu pronunciación y fluidez con divertidos trabalenguas en inglés.",
    category: "pronunciation" as const,
    iconSrc: "/tongue-twister-icon.svg", // Will be replaced with Lucide icon
    icon: <Music className="w-6 h-6 text-pronunciation" />,
  },
  {
    id: "speak-and-score-game",
    title: "Speak and Score Game",
    description: "Practica tu pronunciación y recibe una puntuación basada en tu precisión.",
    category: "pronunciation" as const,
    iconSrc: "/speak-score-icon.svg", // Will be replaced with Lucide icon
    icon: <Mic className="w-6 h-6 text-pronunciation" />,
  },
  {
    id: "minimal-pairs-duel",
    title: "Minimal Pairs Duel",
    description: "Compara pares de palabras con sonidos similares y mejora tu discriminación auditiva.",
    category: "pronunciation" as const,
    iconSrc: "/minimal-pairs-icon.svg", // Will be replaced with Lucide icon
    icon: <Mic className="w-6 h-6 text-pronunciation" />,
  },
  {
    id: "word-rush-game",
    title: "Word Rush Game",
    description: "Selecciona palabras correctas rápidamente para mejorar tu velocidad y precisión.",
    category: "vocabulary" as const,
    iconSrc: "/word-rush-icon.svg", // Will be replaced with Lucide icon
    icon: <Zap className="w-6 h-6 text-vocabulary" />,
  },
  {
    id: "spelling-bee-game",
    title: "Spelling Bee Game",
    description: "Practica la ortografía escuchando palabras y escribiéndolas correctamente.",
    category: "vocabulary" as const,
    iconSrc: "/spelling-bee-icon.svg", // Will be replaced with Lucide icon
    icon: <Pencil className="w-6 h-6 text-vocabulary" />,
  },
  {
    id: "verb-forms-game",
    title: "Verb Forms Game",
    description: "Domina las diferentes formas verbales y tiempos en inglés.",
    category: "grammar" as const,
    iconSrc: "/verb-forms-icon.svg", // Will be replaced with Lucide icon
    icon: <Book className="w-6 h-6 text-grammar" />,
  },
  {
    id: "number-race-game",
    title: "Number Race Game",
    description: "Mejora tu comprensión y pronunciación de números en inglés.",
    category: "vocabulary" as const,
    iconSrc: "/number-race-icon.svg", // Will be replaced with Lucide icon
    icon: <Clock className="w-6 h-6 text-vocabulary" />,
  },
  {
    id: "paint-drawing-game",
    title: "Paint Drawing Game",
    description: "Asocia palabras con imágenes para una mejor retención de vocabulario.",
    category: "vocabulary" as const,
    iconSrc: "/paint-drawing-icon.svg", // Will be replaced with Lucide icon
    icon: <Palette className="w-6 h-6 text-vocabulary" />,
  }
];

// Filter games by category
type CategoryType = "all" | "grammar" | "vocabulary" | "pronunciation";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all");
  
  const filteredGames = activeCategory === "all" 
    ? games 
    : games.filter(game => game.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-20">
        {/* Hero Section */}
        <section className="container max-w-6xl mx-auto px-4 md:px-6 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Aprende inglés jugando
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                10 juegos interactivos para mejorar tu gramática, vocabulario y pronunciación
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              <CategoryButton 
                active={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
              >
                Todos
              </CategoryButton>
              <CategoryButton 
                active={activeCategory === "grammar"}
                onClick={() => setActiveCategory("grammar")}
                category="grammar"
              >
                Gramática
              </CategoryButton>
              <CategoryButton 
                active={activeCategory === "vocabulary"}
                onClick={() => setActiveCategory("vocabulary")}
                category="vocabulary"
              >
                Vocabulario
              </CategoryButton>
              <CategoryButton 
                active={activeCategory === "pronunciation"}
                onClick={() => setActiveCategory("pronunciation")}
                category="pronunciation"
              >
                Pronunciación
              </CategoryButton>
            </motion.div>
          </div>
        </section>
        
        {/* Games Grid */}
        <section className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GameCard
                  id={game.id}
                  title={game.title}
                  description={game.description}
                  category={game.category}
                  iconSrc={game.iconSrc}
                />
              </motion.div>
            ))}
          </div>
          
          {filteredGames.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No se encontraron juegos en esta categoría.</p>
            </div>
          )}
        </section>
        
        {/* Features Section */}
        <section className="container max-w-6xl mx-auto px-4 md:px-6 mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Características Principales</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Diseñado para ofrecerte la mejor experiencia de aprendizaje
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title="Aprendizaje Interactivo"
              description="Juegos interactivos diseñados para mantener tu interés y mejorar la retención."
              icon={<Brain className="w-6 h-6 text-primary" />}
            />
            <FeatureCard 
              title="Seguimiento de Progreso"
              description="Monitorea tu avance en cada categoría y visualiza tu mejora con el tiempo."
              icon={<Zap className="w-6 h-6 text-primary" />}
            />
            <FeatureCard 
              title="Retroalimentación Instantánea"
              description="Recibe comentarios inmediatos sobre tu desempeño para un aprendizaje más efectivo."
              icon={<Mic className="w-6 h-6 text-primary" />}
            />
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="#" 
              className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
            >
              <span>Ver todas las características</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

interface CategoryButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  category?: CategoryType;
}

const CategoryButton = ({ children, active, onClick, category }: CategoryButtonProps) => {
  const getCategoryClasses = () => {
    if (!category || category === "all") {
      return active 
        ? "bg-primary text-white" 
        : "bg-muted text-muted-foreground hover:bg-muted/80";
    }
    
    if (category === "grammar") {
      return active 
        ? "bg-grammar text-white" 
        : "bg-grammar-light text-grammar hover:bg-grammar-light/80";
    }
    
    if (category === "vocabulary") {
      return active 
        ? "bg-vocabulary text-white" 
        : "bg-vocabulary-light text-vocabulary hover:bg-vocabulary-light/80";
    }
    
    if (category === "pronunciation") {
      return active 
        ? "bg-pronunciation text-white" 
        : "bg-pronunciation-light text-pronunciation hover:bg-pronunciation-light/80";
    }
  };
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-5 py-2.5 rounded-full font-medium text-sm transition-all",
        getCategoryClasses()
      )}
    >
      {children}
    </button>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-hover transition-shadow border border-border">
    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Index;
