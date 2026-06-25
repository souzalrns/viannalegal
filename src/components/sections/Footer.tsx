import { MapPin, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG, waUrl } from '@/config/site';

interface FooterLink {
  label: string;
  href: string;
  isAnchor?: boolean;
}

const footerLinks: { services: FooterLink[]; company: FooterLink[]; legal: FooterLink[] } = {
  services: [
    { label: 'Cidadania para Netos',       href: '/cidadania-portuguesa/netos' },
    { label: 'Cidadania para Filhos',      href: '/cidadania-portuguesa/filhos-menores' },
    { label: 'Cidadania para Bisnetos',    href: '/cidadania-portuguesa/bisnetos' },
    { label: 'Cidadania por Casamento',    href: '/cidadania-portuguesa/conjuges' },
    { label: 'Pesquisa Genealógica',       href: '/busca-documentos' },
    { label: 'Transcrição de Casamento',   href: '/cidadania-portuguesa/transcricao-casamento' },
  ],
  company: [
    { label: 'Quem Somos',                href: '/#quem-somos',  isAnchor: true },
    { label: 'Como Funciona o Processo',  href: '/#processo',    isAnchor: true },
    { label: 'Quiz — Descubra seu direito', href: '/quiz' },
    { label: 'Blog',                       href: '/blog' },
    { label: 'Fale Conosco',              href: '/#contato',     isAnchor: true },
  ],
  legal: [
    { label: 'Política de Privacidade',   href: '/politica-privacidade' },
    { label: 'Termos de Uso',             href: '/termos-uso' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/kathiavianna.adv',      label: 'Instagram da ViannaLegal' },
  { icon: Facebook,  href: 'https://facebook.com/kathiavianna.advogada',   label: 'Facebook da ViannaLegal' },
];

export function Footer() {
  const location   = useLocation();
  const isHomePage = location.pathname === '/';

  const handleAnchorClick = (href: string) => {
    if (!isHomePage) return;
    const anchor = href.replace('/', '');
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-width">

        {/* Mini CTA strip */}
        <div className="py-10 border-b border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-xl font-semibold mb-1">
              Pronto para conquistar sua cidadania europeia?
            </h2>
            <p className="text-primary-foreground/70 text-sm">
              Análise gratuita, sem compromisso, em poucos minutos no WhatsApp.
            </p>
          </div>
          <Button
            variant="gold"
            size="lg"
            className="shrink-0"
            onClick={() => window.open(
              '${SITE_CONFIG.whatsapp.url}?text=${encodeURIComponent("Olá! Vim pelo site e quero minha análise gratuita.")}',
              '_blank', 'noopener,noreferrer'
            )}
          >
            <MessageCircle className="w-5 h-5" />
            Análise gratuita no WhatsApp
          </Button>
        </div>

        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-display text-2xl font-bold mb-4 block">
              Vianna<span className="text-gold">Legal</span>
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              Assessoria especializada em cidadania portuguesa para brasileiros. Atualizado com a Lei Orgânica 1/2026.
            </p>
            <div className="flex gap-3 mb-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
              <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
              Lisboa, Portugal
            </div>
            <a
              href={SITE_CONFIG.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-gold transition-colors mt-2"
            >
              <Phone className="w-4 h-4 text-gold flex-shrink-0" />
              {SITE_CONFIG.whatsapp.display}
            </a>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gold mb-5">Serviços</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.services.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gold mb-5">Empresa</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.company.map(({ label, href, isAnchor }) => (
                <li key={label}>
                  {isAnchor ? (
                    <a
                      href={href}
                      onClick={() => handleAnchorClick(href)}
                      className="text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      to={href}
                      className={`text-sm hover:text-gold transition-colors ${
                        label.includes('Quiz') ? 'text-gold font-medium' : 'text-primary-foreground/60'
                      }`}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Quiz CTA */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-gold mb-5">Legal</h3>
            <ul className="flex flex-col gap-3 mb-8">
              {footerLinks.legal.map(({ label, href }) => (
                <li key={label}>
                  <Link to={href} className="text-sm text-primary-foreground/60 hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Quiz CTA card */}
            <div className="bg-primary-foreground/10 rounded-xl p-4 border border-primary-foreground/10">
              <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">Não sabe se tem direito?</p>
              <p className="text-xs text-primary-foreground/60 mb-3 leading-relaxed">
                Responda 6 perguntas e descubra seu caminho.
              </p>
              <Link
                to="/quiz"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline"
              >
                Fazer o quiz gratuito →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/40">
          <p>© {new Date().getFullYear()} ViannaLegal. Todos os direitos reservados.</p>
          <p>Este site é informativo e não constitui aconselhamento jurídico.</p>
        </div>
      </div>
    </footer>
  );
}
