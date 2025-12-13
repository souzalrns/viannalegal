import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Quem Somos', href: '/#quem-somos', isAnchor: true },
  { label: 'Cidadania Portuguesa', href: '/cidadania-portuguesa', isAnchor: false },
  { label: 'Busca de Documentos', href: '/busca-documentos', isAnchor: false },
  { label: 'Processo', href: '/#processo', isAnchor: true },
  { label: 'Contato', href: '/#contato', isAnchor: true },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-card/95 backdrop-blur-md shadow-medium py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container-width">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className={cn(
              "font-display text-2xl font-bold transition-colors duration-300",
              isScrolled || !isHomePage ? "text-primary" : "text-primary-foreground"
            )}>
              Vianna<span className="text-gold">Legal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              item.isAnchor ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "font-medium text-sm transition-colors duration-300 hover:text-gold",
                    isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground"
                  )}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "font-medium text-sm transition-colors duration-300 hover:text-gold",
                    isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground"
                  )}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="https://wa.me/351913134260"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-gold",
                isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground"
              )}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">Sou Cliente</span>
            </a>
            <Button 
              variant={isScrolled || !isHomePage ? "gold" : "heroOutline"} 
              size="sm"
              onClick={() => window.open('https://wa.me/351913134260?text=Olá! Gostaria de saber se posso ser cidadão europeu.', '_blank')}
            >
              Posso ser Europeu?
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <X className={cn("w-6 h-6", isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground")} />
            ) : (
              <Menu className={cn("w-6 h-6", isScrolled || !isHomePage ? "text-foreground" : "text-primary-foreground")} />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <div className="container-width py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                item.isAnchor ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="font-medium text-foreground py-2 hover:text-gold transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="font-medium text-foreground py-2 hover:text-gold transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-center"
                  onClick={() => window.open('https://wa.me/351913134260', '_blank')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Sou Cliente
                </Button>
                <Button 
                  variant="gold" 
                  className="w-full"
                  onClick={() => window.open('https://wa.me/351913134260?text=Olá! Gostaria de saber se posso ser cidadão europeu.', '_blank')}
                >
                  Posso ser Europeu?
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
