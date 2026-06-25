import { motion } from 'framer-motion';
import { ArrowRight, FileText, Search, Users, Heart, Building, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SITE_CONFIG, waUrl } from '@/config/site';

const services = [
  {
    title: 'Cidadania Portuguesa — Netos',
    description: 'Para descendentes de avós portugueses com vínculo comprovado.',
    icon: Users,
    duration: '41 a 46 meses',
    urgent: true,
    color: 'portugal',
    link: '/cidadania-portuguesa/netos',
    linkLabel: 'Ver como funciona a cidadania para netos',
  },
  {
    title: 'Cidadania Portuguesa — Filhos Menores',
    description: 'Processo simplificado para filhos menores de cidadãos portugueses.',
    icon: Heart,
    duration: '2 a 4 meses',
    urgent: false,
    color: 'portugal',
    link: '/cidadania-portuguesa/filhos-menores',
    linkLabel: 'Ver como funciona a cidadania para filhos menores',
  },
  {
    title: 'Cidadania Portuguesa — Filhos Maiores',
    description: 'Processo para filhos maiores de idade de cidadãos portugueses.',
    icon: Heart,
    duration: '50 a 56 meses',
    urgent: false,
    color: 'portugal',
    link: '/cidadania-portuguesa/filhos-maiores',
    linkLabel: 'Ver como funciona a cidadania para filhos maiores',
  },
  {
    title: 'Cidadania Portuguesa — Cônjuges',
    description: 'Para cônjuges ou companheiros de cidadãos portugueses.',
    icon: Heart,
    duration: '50 a 54 meses',
    urgent: true,
    color: 'portugal',
    link: '/cidadania-portuguesa/conjuges',
    linkLabel: 'Ver como funciona a cidadania para cônjuges',
  },
  {
    title: 'Nacionalidade por Residência',
    description: 'Para quem reside legalmente em Portugal há tempo suficiente.',
    icon: Building,
    duration: '27 a 30 meses',
    urgent: false,
    color: 'portugal',
    link: '/cidadania-portuguesa/residencia',
    linkLabel: 'Ver como funciona a nacionalidade por residência',
  },
  {
    title: 'Cidadania Portuguesa — Bisnetos',
    description: 'Novidade da Lei Orgânica 1/2026: via direta para bisnetos de portugueses.',
    icon: Users,
    duration: 'A confirmar',
    urgent: true,
    color: 'gold',
    link: '/cidadania-portuguesa/bisnetos',
    linkLabel: 'Ver como funciona a cidadania para bisnetos',
  },
  {
    title: 'Transcrição de Casamento',
    description: 'Registro do casamento brasileiro em Portugal.',
    icon: FileText,
    duration: '2 a 3 meses',
    urgent: false,
    color: 'gold',
    link: '/cidadania-portuguesa/transcricao-casamento',
    linkLabel: 'Ver como funciona a transcrição de casamento',
  },
  {
    title: 'Pesquisa Genealógica / Busca de Documentos',
    description: 'Investigação minuciosa para localizar registros ancestrais.',
    icon: Search,
    duration: 'Variável',
    urgent: false,
    color: 'gold',
    link: '/busca-documentos',
    linkLabel: 'Ver como funciona a pesquisa genealógica',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Services() {
  return (
    <section id="servicos" className="section-padding bg-muted/50">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
            Nossos Serviços
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Assessoramos em todas as etapas para{' '}
            <span className="text-primary">aquisição da dupla cidadania</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Venha dar esse grande passo com a gente. Oferecemos suporte completo desde a
            pesquisa genealógica até a obtenção do passaporte europeu.
          </p>
        </motion.div>

        {/* Urgency reframe */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 text-sm text-primary font-medium mb-10 bg-gold/10 rounded-full py-2 px-5 max-w-fit mx-auto"
        >
          <Clock className="w-4 h-4 shrink-0" />
          <span>Quanto antes você iniciar, mais cedo entra na fila de análise do IRN.</span>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const colorClasses = {
              portugal: 'bg-portugal-green text-primary-foreground',
              gold: 'bg-gold text-primary',
            };

            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group bg-card rounded-2xl p-6 shadow-subtle card-hover border border-border/50 flex flex-col"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${
                    colorClasses[service.color as keyof typeof colorClasses]
                  } flex items-center justify-center mb-5`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 flex-1">{service.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Prazo médio:{' '}
                    <strong className={service.urgent ? 'text-gold' : 'text-foreground'}>
                      {service.duration}
                    </strong>
                  </span>
                  <Link
                    to={service.link}
                    aria-label={service.linkLabel}
                    className="text-gold hover:text-gold-dark transition-colors flex items-center gap-1 text-sm font-medium"
                  >
                    <span aria-hidden="true">Ver detalhes</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 flex flex-col items-center gap-3"
        >
          <Button
            variant="gold"
            size="lg"
            onClick={() => window.open(
                '${SITE_CONFIG.whatsapp.url}?text=${encodeURIComponent("Olá! Quero saber qual o melhor caminho de cidadania para o meu caso.")}',
                '_blank',
                'noopener,noreferrer'
)
            }
          >
            Descobrir meu caminho mais rápido
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Link to="/cidadania-portuguesa" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ou veja todos os detalhes de cada serviço
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
