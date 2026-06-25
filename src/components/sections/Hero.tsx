import { ArrowRight, CheckCircle, Sparkles, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SITE_CONFIG, waUrl } from '@/config/site';

const trustMarkers = [
  '+2.000 famílias atendidas',
  'Processo 100% online',
  'Especialistas em cidadania portuguesa',
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      <div className="relative container-width pt-28 pb-16 max-w-2xl mx-auto px-4">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 px-4 py-2 rounded-full text-gold mb-6">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Atualizado com a Lei Orgânica 1/2026</span>
        </div>

        {/* H1 */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-5">
          A herança que nenhum
          <br />
          <span className="text-gold">inventário divide.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-primary-foreground/85 mb-4 leading-relaxed">
          A dupla cidadania é o presente que um pai deixa para os filhos —
          e que os filhos deixam para os netos.
        </p>

        {/* Urgency */}
        <div className="flex items-center gap-2 text-gold/90 text-sm font-medium mb-8">
          <Clock className="w-4 h-4 shrink-0" />
          <span>A fila do IRN não para. <strong className="text-gold">Quem entra hoje, sai na frente.</strong></span>
        </div>

        {/* Trust markers */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10">
          {trustMarkers.map((item) => (
            <div key={item} className="flex items-center gap-2 text-primary-foreground/90">
              <CheckCircle className="w-4 h-4 text-gold shrink-0" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button
            variant="gold"
            size="xl"
            className="shadow-gold text-base font-bold"
            onClick={() => window.open(waUrl(SITE_CONFIG.whatsappMessages.default), '_blank', 'noopener,noreferrer')}
          >
            Quero deixar essa herança
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button variant="outline" size="xl" asChild>
            <Link to="/quiz">Descobrir se tenho direito</Link>
          </Button>
        </div>

        <p className="mt-4 text-xs text-primary-foreground/50">
          Análise gratuita, sem compromisso.
        </p>
      </div>
    </section>
  );
}
