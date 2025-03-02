
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Settings } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "py-3 bg-white/80 backdrop-blur-md shadow-sm" : "py-5 bg-transparent"
    )}>
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 focus-ring rounded-md transition-transform hover:scale-105"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <div className="w-6 h-6 relative">
                <span className="absolute inset-0 text-primary text-xl font-bold flex items-center justify-center">
                  E
                </span>
              </div>
            </div>
            <span className="text-lg font-semibold tracking-tight">EnglishGames</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" active={isHome}>
              Inicio
            </NavLink>
            <NavLink to="/categories" active={location.pathname === "/categories"}>
              Categorías
            </NavLink>
            <NavLink to="/progress" active={location.pathname === "/progress"}>
              Progreso
            </NavLink>
            
            <div className="ml-4 flex items-center space-x-1">
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-ring">
                <Settings size={20} />
                <span className="sr-only">Settings</span>
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-ring">
                <User size={20} />
                <span className="sr-only">Profile</span>
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-ring"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out pt-20",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="container px-6 py-8 flex flex-col space-y-4">
          <MobileNavLink to="/" active={isHome}>
            Inicio
          </MobileNavLink>
          <MobileNavLink to="/categories" active={location.pathname === "/categories"}>
            Categorías
          </MobileNavLink>
          <MobileNavLink to="/progress" active={location.pathname === "/progress"}>
            Progreso
          </MobileNavLink>
          
          <div className="pt-4 mt-4 border-t flex justify-between">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors">
              <Settings size={20} />
              <span>Configuración</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors">
              <User size={20} />
              <span>Perfil</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  active: boolean;
}

const NavLink = ({ children, to, active }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      "px-3 py-2 rounded-lg text-sm font-medium transition-colors focus-ring",
      active 
        ? "text-primary bg-primary/10" 
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    )}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ children, to, active }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      "px-3 py-4 rounded-lg text-lg font-medium transition-colors",
      active 
        ? "text-primary bg-primary/10" 
        : "text-foreground hover:bg-muted"
    )}
  >
    {children}
  </Link>
);

export default Header;
