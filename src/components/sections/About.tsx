import { motion } from 'framer-motion';
import { Shield, Clock, Award, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import consultantImage from '@/assets/consultant.jpg';

const features = [
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Transparência, ética e profissionalismo em cada etapa do seu processo.',
  },
  {
    icon: Clock,
    title: 'Agilidade Real',
    description: 'Processos otimizados para evitar diligências e atrasos evitáveis.',
  },
  {
    icon: Award,
    title: 'Experiência Comprovada',
    description: '+10 anos e mais de 2.000 processos conduzidos com êxito.',
  },
  {
    icon: Users,
    title: 'Atendimento Dedicado',
    description: 'Um especialista acompanha o seu caso do início ao fim — não um chatbot.',
  },
];

export function About() {
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
              <img
                src={consultantImage}
                alt="Consultora especializada em cidadania"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
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
                  <Award className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-foreground">2.000+</div>
                  <div className="text-sm text-muted-foreground">Cidadanias conquistadas</div>
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
              Quem Somos
            </span>

            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              A diferença entre <span className="text-primary">esperar e conquistar</span> sua
              cidadania
            </h2>

            <p className="text-muted-foreground text-lg mb-6">
              A maioria dos processos não falha por falta de direito — falha por documentação
              incompleta, prazos perdidos ou orientação genérica. Na ViannaLegal, cada caso é
              acompanhado por um especialista que conhece exatamente o que o IRN exige, evitando
              as diligências que mais atrasam pedidos.
            </p>

            <p className="text-muted-foreground mb-8">
              Resultado: mais de 2.000 famílias brasileiras já têm passaporte europeu nas mãos,
              com processo 100% online — você não precisa viajar, ir a cartório ou falar
              português de Portugal para conseguir.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Button
              variant="gold"
              size="lg"
              onClick={() =>
                window.open(
                  'https://wa.me/351913134260?text=Olá! Quero entender como vocês podem acelerar meu processo.',
                  '_blank'
                )
              }
            >
              Conversar com um especialista
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
