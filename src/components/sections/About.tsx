import { motion } from 'framer-motion';
import { ArrowRight, Heart, GraduationCap, Scale, MapPin, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import consultantImage from '@/assets/consultant.jpg';
import consultantImageWebp from '@/assets/consultant.webp';
import { SITE_CONFIG, waUrl } from '@/config/site';
import { useAnalytics } from '@/hooks/useAnalytics';

const credentials = [
  {
    icon: Scale,
    title: 'Ordem dos Advogados de Portugal',
    description: 'Inscrição ativa na OA. Representação de estrangeiros em processos de nacionalidade portuguesa em Tribunais e Conservatórias.',
  },
  {
    icon: GraduationCap,
    title: 'Universidade de Lisboa + Portucalense',
    description: 'Licenciada pela Universidade de Lisboa. Formação especializada em Registos e Notariado pela Universidade Portucalense.',
  },
  {
    icon: MapPin,
    title: 'Porto, Portugal — desde 2016',
    description: 'Actua presencialmente nas Conservatórias e Tribunais portugueses. Conhece o IRN por dentro — não por descrição.',
  },
  {
    icon: FileCheck,
    title: '10 anos em Portugal · 2.000+ processos',
    description: 'Especialista em nacionalidade portuguesa, escrituras, registos, análise de contratos e representação de investidores estrangeiros em Portugal.',
  },
];

export function About() {
  const { trackWhatsAppClick } = useAnalytics();

  return (
    <section id="quem-somos" className="section-padding">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-elevated">
              <picture>
                <source srcSet={consultantImageWebp} type="image/webp" />
                <img
                  src={consultantImage}
                  alt="Kathia Vianna — Advogada, Ordem dos Advogados de Portugal, Porto"
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                  width={800}
                  height={1000}
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
              {/* Nome e título sobre a foto */}
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-display text-2xl font-bold">Kathia Vianna</p>
                <p className="text-sm text-white/80">Advogada · Ordem dos Advogados de Portugal</p>
                <p className="text-xs text-white/60 mt-1">Porto, Portugal · 10 anos de actuação presencial</p>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-6 shadow-elevated border border-border max-w-xs"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">2.000+</div>
                  <div className="text-sm text-muted-foreground">famílias. Uma herança cada.</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
              Quem trata do seu processo
            </span>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Um investimento que{' '}
              <span className="text-primary">os seus filhos vão agradecer</span>
            </h2>

            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Quando um pai obtém a cidadania portuguesa, não está apenas a tratar de um
              documento. Está a abrir uma porta para os filhos estudarem na Europa, trabalharem
              em qualquer país da UE, viverem onde quiserem — e passarem esse direito
              para os netos, e os netos para os bisnetos.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              A Kathia Vianna actua presencialmente em Porto, Portugal — nas mesmas
              Conservatórias e Tribunais onde os processos correm. Conhece o IRN por dentro,
              antecipa os problemas antes que apareçam e acompanha cada família
              do primeiro contacto até ao passaporte na mão.
            </p>

            {/* Credenciais */}
            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              {credentials.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex gap-3"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-0.5 text-sm leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Button
              variant="gold"
              size="lg"
              onClick={() => {
                trackWhatsAppClick('about');
                window.open(
                  waUrl(SITE_CONFIG.whatsappMessages.about),
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
            >
              Começar a construir essa herança
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
