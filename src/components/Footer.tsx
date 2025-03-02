
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn(
      "py-12 border-t mt-auto",
      className
    )}>
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <div className="w-6 h-6 relative">
                <span className="absolute inset-0 text-primary text-xl font-bold flex items-center justify-center">
                  E
                </span>
              </div>
            </div>
            <span className="text-lg font-semibold tracking-tight">EnglishGames</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Inicio
            </Link>
            <Link 
              to="/categories" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Categorías
            </Link>
            <Link 
              to="/progress" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Progreso
            </Link>
            <Link 
              to="/about" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Acerca de
            </Link>
          </nav>
          
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EnglishGames
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
