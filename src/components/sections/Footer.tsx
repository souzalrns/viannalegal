import { MapPin, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface FooterLink {
  label: string;
  href: string;
  isAnchor?: boolean;
}

const footerLinks: { services: FooterLink[]; company: FooterLink[]; legal: FooterLink[] } = {
  services: [
    { label: 'Cidadania Portuguesa para Netos', href: '/cidadania-portuguesa/netos' },
    { label: 'Cidadania Portuguesa para Filhos', href: '/cidadania-portuguesa/filhos-menores' },
    { label: 'Cidadania Portuguesa para Bisnetos', href: '/cidadania-portuguesa/bisnetos' },
    { label: 'Pesquisa Genealógica', href: '/busca-documentos' },
    { label: 'Transcrição de Casamento', href: '/cidadania-portuguesa/transcricao-casamento' },
  ],
  company: [
    { label: 'Quem Somos', href: '/#quem-somos', isAnchor: true },
    { label: 'Como Funciona o Processo', href: '/#processo', isAnchor: true },
    { label: 'Fale Conosco', href: '/#contato', isAnchor: true },
  ],
  legal: [
    { label: 'Política de Privacidade', href: '/politica-privacidade' },
    { label: 'Termos de Uso', href: '/termos-uso' },
    { label: 'Blog', href: '/blog' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/kathiavianna.adv', label: 'Instagram da ViannaLegal' },
  { icon: Facebook, href: 'https://facebook.com/kathiavianna.advogada', label: 'Facebook da ViannaLegal' },
];

export function Footer() {
  const location = useLocation();
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
            onClick={() =>
              window.open(
                'https://wa.me/351913134260?text=Olá! Vim pelo site e quero minha análise gratuita.',
                '_blank',
                'noopener,noreferrer'
              )
            }
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
            <p className="text-primary-foreground/70 text-sm mb-6">
              Assessoria especializada em cidadania portuguesa.
              Transformamos o sonho da cidadania europeia em realidade.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-gold/20 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-display font-semibold mb-4">Serviços</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-display font-semibold mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.isAnchor && isHomePage ? (
                    <a
                      href={link.href.replace('/', '')}
                      className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAnchorClick(link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-display font-semibold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-primary-foreground/70 text-sm">Lisboa, Portugal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" aria-hidden="true" />
                <a
                  href="https://wa.me/351913134260"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                >
                  +351 913 134 260
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-primary-foreground/60 text-sm text-center md:text-left">
            © {new Date().getFullYear()} ViannaLegal | Todos os direitos reservados
          </div>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-primary-foreground/60 hover:text-gold transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pb-8">
          <p className="text-primary-foreground/40 text-xs text-center">
            A ViannaLegal é uma empresa de consultoria jurídica especializada em orientar e assessorar clientes no processo
            de obtenção de documentos relacionados à nacionalidade portuguesa. Não possui autoridade para julgar ou realizar
            processos de cidadania, tampouco possui qualquer vínculo com consulados ou órgãos governamentais.
          </p>
        </div>
      </div>
    </footer>
  );
}
