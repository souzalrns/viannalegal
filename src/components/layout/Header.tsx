import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { SITE_CONFIG, waUrl } from '@/config/site';

interface NavItem {
  label: string;
  href: string;
  isAnchor: boolean;
  highlight?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Quem Somos',           href: '/#quem-somos',         isAnchor: true  },
  { label: 'Cidadania Portuguesa', href: '/cidadania-portuguesa', isAnchor: false },
  { label: 'Busca de Documentos',  href: '/busca-documentos',    isAnchor: false },
  { label: 'Blog',                 href: '/blog',                 isAnchor: false },
  { label: 'Quiz — Descubra seu direito', href: '/quiz',          isAnchor: false, highlight: true },
  { label: 'Contato',              href: '/#contato',             isAnchor: true  },
];

const WHATSAPP_CTA_URL =
  '${SITE_CONFIG.whatsapp.url}?text=${encodeURIComponent("Olá! Gostaria de uma análise gratuita sobre cidadania portuguesa.")}';

export function Header() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location  = useLocation();
  const isHomePage = location.pathname === '/';
  const isDark     = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = useCallback(() => {
    window.open(WHATSAPP_CTA_URL, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-card/95 backdrop-blur-md shadow-medium py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container-width">
        <nav aria-label="Navegação principal" className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="ViannaLegal, página inicial">
            <span className={cn(
              'font-display text-2xl font-bold transition-colors duration-300',
              isDark ? 'text-primary' : 'text-primary-foreground'
            )}>
              Vianna<span className="text-gold">Legal</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const cls = cn(
                'font-medium text-sm transition-colors duration-300 hover:text-gold',
                isDark ? 'text-foreground' : 'text-primary-foreground',
                item.highlight && 'text-gold font-semibold'
              );
              return item.isAnchor ? (
                <a key={item.label} href={item.href} className={cls}>{item.label}</a>
              ) : (
                <Link key={item.label} to={item.href} className={cls}>{item.label}</Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href=SITE_CONFIG.whatsapp.url
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center gap-1.5 text-xs transition-colors hover:text-gold',
                isDark ? 'text-muted-foreground' : 'text-primary-foreground/70'
              )}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Já sou cliente</span>
            </a>
            <Button variant={isDark ? 'gold' : 'heroOutline'} size="sm" onClick={openWhatsApp}>
              Análise Gratuita
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 -mr-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className={cn('w-6 h-6', isDark ? 'text-foreground' : 'text-primary-foreground')} />
            ) : (
              <Menu className={cn('w-6 h-6', isDark ? 'text-foreground' : 'text-primary-foreground')} />
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
              {navItems.map((item) => {
                const cls = cn(
                  'font-medium text-foreground py-3 min-h-[44px] flex items-center hover:text-gold transition-colors',
                  item.highlight && 'text-gold font-semibold'
                );
                return item.isAnchor ? (
                  <a key={item.label} href={item.href} className={cls} onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} to={item.href} className={cls} onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <Button variant="gold" className="w-full" onClick={openWhatsApp}>
                  Análise Gratuita
                </Button>
                <a
                  href=SITE_CONFIG.whatsapp.url
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors py-1"
                >
                  <Phone className="w-4 h-4" />
                  Já sou cliente
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
