import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'Cidadania Portuguesa', href: '#servicos' },
    { label: 'Pesquisa Genealógica', href: '#servicos' },
    { label: 'Transcrição de Documentos', href: '#servicos' },
    { label: 'Nacionalidade por Residência', href: '#servicos' },
  ],
  company: [
    { label: 'Quem Somos', href: '#quem-somos' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contato', href: '#contato' },
  ],
  legal: [
    { label: 'Política de Privacidade', href: '#privacidade' },
    { label: 'Termos de Uso', href: '#termos' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/kathiavianna.adv', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/kathiavianna.advogada', label: 'Facebook' },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-width">
        {/* Main Footer */}
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="font-display text-2xl font-bold mb-4">
              Vianna<span className="text-gold">Legal</span>
            </div>
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
            <h4 className="font-display font-semibold mb-4">Serviços</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-display font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  Lisboa, Portugal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
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
              <a
                key={link.label}
                href={link.href}
                className="text-primary-foreground/60 hover:text-gold transition-colors text-sm"
              >
                {link.label}
              </a>
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
