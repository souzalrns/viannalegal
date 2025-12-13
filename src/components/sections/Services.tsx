import { motion } from 'framer-motion';
import { ArrowRight, FileText, Search, Users, Heart, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Cidadania Portuguesa - Netos',
    description: 'Para descendentes de avós portugueses com vínculo comprovado.',
    icon: Users,
    duration: '40-48 meses',
    color: 'portugal',
    link: '/cidadania-portuguesa#netos',
  },
  {
    title: 'Cidadania Portuguesa - Filhos Maiores',
    description: 'Processo para filhos maiores de idade de cidadãos portugueses.',
    icon: Heart,
    duration: '12-14 meses',
    color: 'portugal',
    link: '/cidadania-portuguesa#filhos-maiores',
  },
  {
    title: 'Cidadania Portuguesa - Filhos Menores',
    description: 'Processo simplificado para filhos menores de cidadãos portugueses.',
    icon: Heart,
    duration: '6-8 meses',
    color: 'portugal',
    link: '/cidadania-portuguesa#filhos-menores',
  },
  {
    title: 'Cidadania Portuguesa - Cônjuges',
    description: 'Para cônjuges ou companheiros de cidadãos portugueses.',
    icon: Heart,
    duration: '40-48 meses',
    color: 'portugal',
    link: '/cidadania-portuguesa#conjuges',
  },
  {
    title: 'Nacionalidade por Residência',
    description: 'Para quem reside legalmente em Portugal há tempo suficiente.',
    icon: Building,
    duration: '24-32 meses',
    color: 'portugal',
    link: '/cidadania-portuguesa#residencia',
  },
  {
    title: 'Transcrição de Casamento',
    description: 'Registro do casamento brasileiro em Portugal.',
    icon: FileText,
    duration: '1-4 meses',
    color: 'gold',
    link: '/cidadania-portuguesa#transcricao',
  },
  {
    title: 'Pesquisa Genealógica / Busca de Documentos',
    description: 'Investigação minuciosa para localizar registros ancestrais.',
    icon: Search,
    duration: 'Variável',
    color: 'gold',
    link: '/busca-documentos',
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
          className="text-center max-w-3xl mx-auto mb-16"
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
              italy: 'bg-italy-green text-primary-foreground',
              gold: 'bg-gold text-primary',
            };
            
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group bg-card rounded-2xl p-6 shadow-subtle card-hover border border-border/50"
              >
                <div className={`w-14 h-14 rounded-xl ${colorClasses[service.color as keyof typeof colorClasses]} flex items-center justify-center mb-5`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground">
                    Prazo médio: <strong className="text-foreground">{service.duration}</strong>
                  </span>
                  <Link 
                    to={service.link}
                    className="text-gold hover:text-gold-dark transition-colors flex items-center gap-1 text-sm font-medium"
                  >
                    Saiba mais
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
          className="text-center mt-12"
        >
          <Button variant="gold" size="lg" asChild>
            <Link to="/cidadania-portuguesa">
              Ver todos os serviços
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
