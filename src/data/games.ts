
import { Book, BookOpen, Mic, Palette, Zap, Pencil, Music, Clock } from "lucide-react";
import { CategoryType } from "@/components/CategoryChip";

export interface Game {
  id: string;
  title: string;
  description: string;
  category: CategoryType;
  iconSrc: string;
  icon: JSX.Element;
  longDescription: string;
  levels: string[];
  skills: string[];
}

export const games: Game[] = [
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
