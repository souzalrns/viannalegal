import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-lisbon.jpg';

const benefits = [
  'Processo 100% online',
  'Especialistas em Portugal',
  'Acompanhamento personalizado',
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Lisboa, Portugal ao pôr do sol com a Torre de Belém"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative container-width pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm px-4 py-2 rounded-full text-gold mb-6"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Assessoria Especializada</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Tire sua dupla cidadania{' '}
              <span className="text-gradient">sem sair do Brasil</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0">
              Assistência e segurança em todas as etapas para você obter a sua 
              Cidadania Portuguesa
            </p>

            {/* Benefits */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10 justify-center lg:justify-start">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 text-primary-foreground/90"
                >
                  <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="gold" size="xl">
                Quero minha Cidadania
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="xl">
                Fale com um Especialista
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Stats or Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:grid grid-cols-2 gap-4"
          >
            <div className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="font-display text-4xl font-bold text-gold mb-2">2000+</div>
              <div className="text-primary-foreground/80 text-sm">Processos realizados</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-6 text-center mt-8">
              <div className="font-display text-4xl font-bold text-gold mb-2">185</div>
              <div className="text-primary-foreground/80 text-sm">Países sem visto</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <div className="font-display text-4xl font-bold text-gold mb-2">98%</div>
              <div className="text-primary-foreground/80 text-sm">Taxa de aprovação</div>
            </div>
            <div className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-6 text-center mt-8">
              <div className="font-display text-4xl font-bold text-gold mb-2">10+</div>
              <div className="text-primary-foreground/80 text-sm">Anos de experiência</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
