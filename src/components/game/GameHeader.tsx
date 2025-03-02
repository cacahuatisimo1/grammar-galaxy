
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GameHeader = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-3"
    >
      <button 
        onClick={() => navigate('/')}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-md px-2 py-1"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Volver a los juegos
      </button>
    </motion.div>
  );
};

export default GameHeader;
