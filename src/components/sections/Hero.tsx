import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-lisbon.jpg';
import heroImageWebp from '@/assets/hero-lisbon.webp';

const trustMarkers = [
  '+2.000 processos aprovados',
  'Processo 100% online',
  'Especialistas em Portugal',
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image — LCP: eager load, explicit dimensions, high fetchpriority */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Lisboa ao pôr do sol — Torre de Belém"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
          decoding="sync"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Decorative glows */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" aria-hidden="true" />

      {/* Content */}
      <div className="relative container-width pt-28 pb-16">
        <div className="max-w-2xl">
          {/* Urgency badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 px-4 py-2 rounded-full text-gold mb-6"
          >
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm font-medium">ViannaLegal · Atualizado com a Lei Orgânica 1/2026</span>
          </motion.div>

          {/* H1 — benefit-first */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-5"
          >
            Cidadania Portuguesa
            <br />
            <span className="text-gradient">para Brasileiros.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/85 mb-4 leading-relaxed"
          >
            Assessoria especializada para quem tem descendência portuguesa.
            Mais de 2.000 famílias já têm passaporte europeu — processo 100% online,
            sem precisar viajar.
          </motion.p>

          {/* Urgency nudge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-2 text-gold/90 text-sm font-medium mb-8"
          >
            <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>
              Processos de netos levam 24–42 meses.{' '}
              <strong className="text-gold">Quanto antes você iniciar, mais cedo recebe.</strong>
            </span>
          </motion.div>

          {/* Trust markers */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-x-6 gap-y-2 mb-10"
          >
            {trustMarkers.map((item) => (
              <div key={item} className="flex items-center gap-2 text-primary-foreground/90">
                <CheckCircle className="w-4 h-4 text-gold shrink-0" aria-hidden="true" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <Button
              variant="gold"
              size="xl"
              className="shadow-gold text-base font-bold"
              onClick={() =>
                window.open(
                  'https://wa.me/351913134260?text=Olá! Vim pelo site e gostaria de uma análise gratuita sobre cidadania portuguesa.',
                  '_blank',
                  'noopener,noreferrer'
)
              }
            >
              Análise Gratuita — Falar Agora
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Button>

            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/cidadania-portuguesa">
                Ver modalidades
              </Link>
            </Button>
          </motion.div>

          {/* Micro-copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-4 text-xs text-primary-foreground/50"
          >
            Sem compromisso. Análise feita por especialista, não por robô.
          </motion.p>
        </div>

        {/* Stats — desktop right side */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="hidden lg:grid absolute right-8 top-1/2 -translate-y-1/2 grid-cols-2 gap-4 max-w-xs"
          aria-label="Estatísticas ViannaLegal"
        >
          {[
            { value: '2.000+', label: 'Processos aprovados' },
            { value: '190+', label: 'Países sem visto' },
            { value: '98%', label: 'Taxa de aprovação' },
            { value: '10+', label: 'Anos de experiência' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-5 text-center border border-primary-foreground/10"
            >
              <div className="font-display text-3xl font-bold text-gold mb-1">{stat.value}</div>
              <div className="text-primary-foreground/75 text-xs leading-tight">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
}
