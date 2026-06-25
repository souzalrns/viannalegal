import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { SchemaHomepage } from '@/components/seo/SchemaMarkup';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Users, Heart, Building, FileText,
  Search, Sparkles, Clock, CheckCircle
} from 'lucide-react';
import { SITE_CONFIG, waUrl } from '@/config/site';

// ── Modalidades integradas ────────────────────────────────────
const modalidades = [
  {
    emoji: '👨‍👩‍👧',
    tag: 'Mais rápido',
    tagColor: 'bg-emerald-500',
    title: 'Filho(a) de português(a)',
    desc: 'O caminho mais directo e rápido. Não precisa comprovar vínculo com Portugal.',
    prazo: '4 a 6 meses',
    prazoLabel: 'processos novos',
    link: '/cidadania-portuguesa/filhos-maiores',
    destaque: true,
  },
  {
    emoji: '👴👵',
    tag: 'Estratégia recomendada',
    tagColor: 'bg-blue-500',
    title: 'Neto(a) de português(a)',
    desc: 'Se o teu pai ou mãe ainda é vivo, existe uma via muito mais rápida do que ir directamente como neto.',
    prazo: '42 a 48 meses',
    prazoLabel: 'directo como neto',
    link: '/cidadania-portuguesa/netos',
    destaque: true,
  },
  {
    emoji: '🧓',
    tag: 'Lei 1/2026',
    tagColor: 'bg-amber-500',
    title: 'Bisneto(a) de português(a)',
    desc: 'Nova via criada pela Lei Orgânica 1/2026. Requer residência em Portugal ou cadeia de ascendentes vivos.',
    prazo: '28 a 36 meses',
    prazoLabel: 'via Lei 1/2026',
    link: '/cidadania-portuguesa/bisnetos',
    destaque: false,
  },
  {
    emoji: '💍',
    tag: 'Por casamento',
    tagColor: 'bg-rose-500',
    title: 'Cônjuge de português(a)',
    desc: 'Para casados ou em união de facto com cidadão(ã) português(a) há 3 ou mais anos.',
    prazo: '50 a 54 meses',
    prazoLabel: 'após protocolo',
    link: '/cidadania-portuguesa/conjuges',
    destaque: false,
  },
  {
    emoji: '🏡',
    tag: 'Por residência',
    tagColor: 'bg-purple-500',
    title: 'Naturalização por residência',
    desc: 'Para quem vive legalmente em Portugal há 7 anos (brasileiros/CPLP) ou 10 anos (outros).',
    prazo: '27 a 30 meses',
    prazoLabel: 'após protocolo',
    link: '/cidadania-portuguesa/residencia',
    destaque: false,
  },
  {
    emoji: '🔍',
    tag: 'Serviço especializado',
    tagColor: 'bg-slate-500',
    title: 'Pesquisa genealógica',
    desc: 'Localização de certidões antigas em arquivos paroquiais e distritais portugueses.',
    prazo: 'Sob consulta',
    prazoLabel: 'conforme caso',
    link: '/busca-documentos',
    destaque: false,
  },
];

// ── Quiz Banner melhorado ─────────────────────────────────────
function QuizBannerHome() {
  return (
    <section className="bg-primary py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 md:p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-5">
            <Sparkles className="w-7 h-7 text-gold" />
          </div>
          <p className="text-gold text-xs font-bold uppercase tracking-widest mb-3">
            Não sabe se tem direito?
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-snug">
            Descubra em 2 minutos qual é o seu caminho
          </h2>
          <p className="text-white/70 text-sm mb-8 max-w-lg mx-auto">
            Responda algumas perguntas simples e receba um diagnóstico personalizado —
            gratuito, sem compromisso, actualizado com a Lei 1/2026.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/quiz"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold/90 text-primary font-bold px-8 py-4 rounded-2xl transition-colors shadow-lg text-base"
            >
              Fazer o quiz gratuito
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={waUrl(SITE_CONFIG.whatsappMessages.default)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-2xl transition-colors border border-white/20 text-base"
            >
              Falar com especialista
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Secção de modalidades ─────────────────────────────────────
function ModalidadesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-gold font-bold text-xs uppercase tracking-widest mb-3 block">
            Caminhos disponíveis
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Qual é o seu vínculo com Portugal?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cada situação tem um caminho diferente — com prazos, documentos e estratégias distintas.
            Clica na tua situação para ver os detalhes.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modalidades.map((m) => (
            <Link
              key={m.title}
              to={m.link}
              className={`group relative flex flex-col p-6 rounded-2xl border-2 transition-all hover:shadow-lg hover:-translate-y-0.5 ${
                m.destaque
                  ? 'border-primary/40 bg-primary/5 hover:border-primary'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              {/* Tag */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs font-bold text-white px-2.5 py-1 rounded-full ${m.tagColor}`}>
                  {m.tag}
                </span>
                <span className="text-2xl">{m.emoji}</span>
              </div>

              {/* Título */}
              <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {m.title}
              </h3>

              {/* Descrição */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                {m.desc}
              </p>

              {/* Prazo */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 text-primary/60" />
                  <span>{m.prazoLabel}</span>
                </div>
                <span className="text-sm font-bold text-primary">{m.prazo}</span>
              </div>

              {/* Arrow */}
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA inferior */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Não sabe qual se aplica ao seu caso?
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors"
          >
            Fazer o quiz e descobrir
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Homepage ──────────────────────────────────────────────────
const Index = () => (
  <>
    <SchemaHomepage />
    <Helmet>
      <title>ViannaLegal — Cidadania Portuguesa para Brasileiros</title>
      <meta name="description" content="Assessoria especializada em cidadania portuguesa. Filhos, netos e bisnetos de portugueses. Mais de 2.000 famílias atendidas. Processo 100% online." />
    </Helmet>
    <Header />
    <Hero />
    <QuizBannerHome />
    <ModalidadesSection />
    <About />
    <Process />
    <Testimonials />
    <FAQ />
    <Contact />
    <Footer />
  </>
);

export default Index;
