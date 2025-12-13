import { motion } from 'framer-motion';
import { Shield, Clock, Award, Users } from 'lucide-react';
import consultantImage from '@/assets/consultant.jpg';

const features = [
  {
    icon: Shield,
    title: 'Segurança Total',
    description: 'Compromisso com transparência, ética e profissionalismo em cada etapa.',
  },
  {
    icon: Clock,
    title: 'Agilidade',
    description: 'Processos otimizados para reduzir tempo e burocracia.',
  },
  {
    icon: Award,
    title: 'Experiência',
    description: 'Anos de atuação com milhares de processos realizados com êxito.',
  },
  {
    icon: Users,
    title: 'Atendimento Personalizado',
    description: 'Um profissional dedicado exclusivamente ao seu caso.',
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
                  <div className="font-display text-2xl font-bold text-foreground">10+</div>
                  <div className="text-sm text-muted-foreground">Anos de experiência</div>
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
              Somos <span className="text-primary">ViannaLegal</span>, sua escolha confiável em assessoria
            </h2>
            
            <p className="text-muted-foreground text-lg mb-6">
              Com uma vasta experiência e um histórico de sucesso comprovado, nossa equipe 
              de especialistas está aqui para tornar o processo de obtenção da cidadania 
              portuguesa simples, eficiente e livre de preocupações.
            </p>
            
            <p className="text-muted-foreground mb-8">
              Na ViannaLegal, entendemos que este é um passo importante em sua vida e 
              estamos aqui para tornar o processo o mais simples e tranquilo possível. 
              Entre em contato conosco hoje mesmo e dê o primeiro passo rumo a uma vida 
              europeia de sucesso e oportunidades ilimitadas.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
