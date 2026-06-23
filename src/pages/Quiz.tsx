import { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';
import { ArrowRight, ArrowLeft, CheckCircle, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ── Tipos ──────────────────────────────────────────────────────
interface Option {
  icon: string;
  label: string;
  next: string;
}
interface Question {
  category: string;
  text: string;
  hint: string;
  options: Option[];
}
interface Result {
  type: 'green' | 'yellow' | 'orange' | 'red';
  icon: string;
  tag: string;
  title: string;
  desc: string;
  docs: string[];
}

// ── Perguntas ──────────────────────────────────────────────────
const QUESTIONS: Record<string, Question> = {
  q1: {
    category: 'Vínculo com Portugal',
    text: 'Qual é a sua relação com Portugal?',
    hint: 'Escolha a opção que melhor descreve seu vínculo com cidadãos portugueses.',
    options: [
      { icon: '👶', label: 'Sou filho(a) de cidadão(ã) português(a)',              next: 'q_filho' },
      { icon: '👴', label: 'Sou neto(a) de avô/avó português(a)',                  next: 'q_neto_vivo' },
      { icon: '👵', label: 'Sou bisneto(a) de bisavô/bisavó português(a)',         next: 'q_bisneto_avo' },
      { icon: '💍', label: 'Sou casado(a) ou em união de facto com português(a)',  next: 'q_conjuge' },
      { icon: '🏡', label: 'Resido legalmente em Portugal',                        next: 'q_residencia' },
      { icon: '❓', label: 'Nenhuma das anteriores',                               next: 'result_nenhum' },
    ],
  },

  // ── FILHOS ─────────────────────────────────────────────────────
  q_filho: {
    category: 'Filiação',
    text: 'Você é menor ou maior de 18 anos?',
    hint: 'O processo e os prazos são diferentes para menores e maiores de idade.',
    options: [
      { icon: '🧒', label: 'Menor de 18 anos', next: 'result_filho_menor' },
      { icon: '🧑', label: 'Maior de 18 anos', next: 'result_filho_maior' },
    ],
  },

  // ── NETOS ──────────────────────────────────────────────────────
  q_neto_vivo: {
    category: 'Descendência — Netos',
    text: 'O avô ou avó português(a) ainda está vivo(a)?',
    hint: 'Isso afeta a documentação necessária e a facilidade de comprovar a cadeia de descendência.',
    options: [
      { icon: '😊', label: 'Sim, está vivo(a)',           next: 'q_neto_pai_pt' },
      { icon: '🕊️', label: 'Não, já faleceu',            next: 'q_neto_obito' },
      { icon: '🤷', label: 'Não tenho certeza',           next: 'q_neto_pai_pt' },
    ],
  },
  q_neto_obito: {
    category: 'Descendência — Netos',
    text: 'Você tem acesso à certidão de óbito do avô/avó português(a)?',
    hint: 'A certidão de óbito é obrigatória quando o avô/avó já faleceu para comprovar a cadeia de descendência.',
    options: [
      { icon: '✅', label: 'Sim, tenho ou consigo obter',           next: 'q_neto_pai_pt' },
      { icon: '⚠️', label: 'Não tenho — não sei onde obter',       next: 'q_neto_origem' },
    ],
  },
  q_neto_origem: {
    category: 'Descendência — Netos',
    text: 'Você sabe em qual região ou município de Portugal o avô/avó nasceu?',
    hint: 'Com a localidade de origem é possível fazer pesquisa nas conservatórias e arquivos paroquiais portugueses.',
    options: [
      { icon: '📍', label: 'Sim, sei a cidade ou região de origem',  next: 'q_neto_pai_pt' },
      { icon: '❌', label: 'Não, não tenho essa informação',         next: 'result_neto_pesquisa' },
    ],
  },
  q_neto_pai_pt: {
    category: 'Descendência — Netos',
    text: 'Seu pai ou mãe (filho(a) direto do avô/avó português) tem ou já teve a nacionalidade portuguesa?',
    hint: 'Se o seu pai/mãe nunca solicitou a nacionalidade, isso pode exigir documentação adicional para fechar a cadeia.',
    options: [
      { icon: '✅', label: 'Sim, tem ou teve nacionalidade portuguesa', next: 'result_neto_forte' },
      { icon: '❌', label: 'Não, nunca solicitou a nacionalidade',      next: 'result_neto_fraco' },
      { icon: '🤷', label: 'Não sei informar',                         next: 'result_neto_verificar' },
    ],
  },

  // ── BISNETOS ───────────────────────────────────────────────────
  q_bisneto_avo: {
    category: 'Descendência — Bisnetos',
    text: 'O avô ou avó (filho(a) do bisavô/bisavó português) ainda está vivo(a)?',
    hint: 'A situação do avô/avó intermédio afeta quais documentos são exigidos e como se comprova a cadeia de 4 gerações.',
    options: [
      { icon: '😊', label: 'Sim, está vivo(a)',           next: 'q_bisneto_avo_pt' },
      { icon: '🕊️', label: 'Não, já faleceu',            next: 'q_bisneto_obito_avo' },
      { icon: '🤷', label: 'Não tenho certeza',           next: 'q_bisneto_avo_pt' },
    ],
  },
  q_bisneto_obito_avo: {
    category: 'Descendência — Bisnetos',
    text: 'Você tem acesso à certidão de óbito desse avô/avó?',
    hint: 'Quando o avô/avó (elo intermediário) já faleceu, a certidão de óbito é necessária para fechar a cadeia documental de 4 gerações.',
    options: [
      { icon: '✅', label: 'Sim, tenho ou consigo obter',       next: 'q_bisneto_avo_pt' },
      { icon: '⚠️', label: 'Não tenho — pode ser difícil',     next: 'q_bisneto_avo_pt' },
    ],
  },
  q_bisneto_avo_pt: {
    category: 'Descendência — Bisnetos',
    text: 'Esse avô/avó (filho(a) do bisavô/bisavó português) chegou a ter a nacionalidade portuguesa?',
    hint: 'Se o avô/avó também tem ou teve a nacionalidade portuguesa, a cadeia documental é mais sólida e o processo mais direto.',
    options: [
      { icon: '✅', label: 'Sim, tem ou teve nacionalidade portuguesa', next: 'q_bisneto_res' },
      { icon: '❌', label: 'Não, nunca teve nacionalidade portuguesa',  next: 'q_bisneto_res' },
      { icon: '🤷', label: 'Não sei informar',                         next: 'q_bisneto_res' },
    ],
  },
  q_bisneto_res: {
    category: 'Descendência — Bisnetos',
    text: 'Você reside legalmente em Portugal?',
    hint: 'A Lei Orgânica 1/2026 criou a via para bisnetos, mas exige residência legal mínima de 5 anos em Portugal — não é possível usar essa via morando no Brasil.',
    options: [
      { icon: '🏠', label: 'Sim, resido em Portugal',   next: 'q_bisneto_anos' },
      { icon: '✈️', label: 'Não, moro no Brasil',       next: 'result_bisneto_nao' },
    ],
  },
  q_bisneto_anos: {
    category: 'Descendência — Bisnetos',
    text: 'Há quantos anos você reside legalmente em Portugal?',
    hint: 'O prazo mínimo exigido pela Lei 1/2026 é de 5 anos de residência legal contínua.',
    options: [
      { icon: '✅', label: '5 anos ou mais',        next: 'result_bisneto_ok' },
      { icon: '⏳', label: 'Entre 2 e 4 anos',     next: 'result_bisneto_aguardar' },
      { icon: '📅', label: 'Menos de 2 anos',      next: 'result_bisneto_cedo' },
    ],
  },

  // ── CÔNJUGE ────────────────────────────────────────────────────
  q_conjuge: {
    category: 'Casamento / União de Facto',
    text: 'Há quanto tempo dura este casamento ou união de facto?',
    hint: 'A lei exige um período mínimo de relacionamento comprovado com cidadão(ã) português(a).',
    options: [
      { icon: '📅', label: 'Menos de 3 anos', next: 'result_conjuge_cedo' },
      { icon: '✅', label: '3 anos ou mais',  next: 'result_conjuge_ok' },
    ],
  },

  // ── RESIDÊNCIA ─────────────────────────────────────────────────
  q_residencia: {
    category: 'Naturalização por Residência',
    text: 'Há quantos anos você reside legalmente em Portugal?',
    hint: 'A Lei Orgânica 1/2026 aumentou o prazo para brasileiros e cidadãos CPLP para 7 anos.',
    options: [
      { icon: '📅', label: 'Menos de 5 anos',                next: 'result_residencia_cedo' },
      { icon: '⏳', label: 'Entre 5 e 7 anos',               next: 'result_residencia_quase' },
      { icon: '✅', label: '7 anos ou mais (brasileiro/CPLP)', next: 'result_residencia_ok' },
      { icon: '✅', label: '5 anos ou mais (outros países)',  next: 'result_residencia_ok5' },
    ],
  },
};

// ── Resultados ─────────────────────────────────────────────────
const RESULTS: Record<string, Result> = {
  result_filho_menor: {
    type: 'green', icon: '🌟', tag: 'Alta probabilidade',
    title: 'Cidadania por filiação — via mais rápida',
    desc: 'Como filho(a) menor de cidadão(ã) português(a), você tem o caminho mais direto. O processo leva entre 6 e 8 meses e pode ser feito 100% online.',
    docs: ['Certidão de nascimento do filho (apostilada)', 'Certidão de nascimento do pai/mãe português(a)', 'Prova de nacionalidade portuguesa do pai/mãe', 'Certidão de casamento dos pais (se aplicável)'],
  },
  result_filho_maior: {
    type: 'green', icon: '✅', tag: 'Alta probabilidade',
    title: 'Cidadania por filiação — filho maior de idade',
    desc: 'Filho(a) maior de cidadão(ã) português(a) tem direito à nacionalidade. Prazo médio de 12 a 14 meses, 100% online.',
    docs: ['Certidão de nascimento do requerente (apostilada)', 'Certidão de nascimento do pai/mãe português(a)', 'Prova de nacionalidade portuguesa do pai/mãe', 'Certidão de casamento dos pais ou reconhecimento de paternidade'],
  },
  result_neto_forte: {
    type: 'green', icon: '🇵🇹', tag: 'Boa probabilidade',
    title: 'Cidadania por descendência — neto(a)',
    desc: 'Com linha de filiação comprovada e pai/mãe que também teve a nacionalidade portuguesa, a cadeia documental é sólida. Prazo médio: 24 a 42 meses.',
    docs: ['Certidão de nascimento do requerente (apostilada)', 'Certidão de nascimento do pai/mãe', 'Certidão de nascimento do avô/avó português(a)', 'Assento de nascimento do avô/avó nos registros portugueses', 'Certidão de casamento dos avós (se aplicável)', 'Certidão de óbito (se falecido)'],
  },
  result_neto_fraco: {
    type: 'yellow', icon: '⚠️', tag: 'Análise necessária',
    title: 'Descendência — caso requer atenção',
    desc: 'Quando o elo intermediário nunca teve a nacionalidade portuguesa, pode haver exigências adicionais de prova de vínculo. Não inviabiliza o processo, mas requer análise especializada.',
    docs: ['Certidão de nascimento do requerente (apostilada)', 'Certidão de nascimento do pai/mãe', 'Certidão de nascimento do avô/avó em Portugal', 'Documentos que comprovem a linha de descendência ininterrupta'],
  },
  result_neto_verificar: {
    type: 'yellow', icon: '🔍', tag: 'Verificação necessária',
    title: 'Consulte um especialista para confirmar',
    desc: 'Seu perfil tem potencial, mas é preciso confirmar se seu pai/mãe já teve a nacionalidade portuguesa. Um especialista pode verificar isso rapidamente junto ao IRN.',
    docs: ['Certidão de nascimento do requerente', 'Certidão de nascimento do pai/mãe', 'Certidão de nascimento do avô/avó português(a)'],
  },
  result_bisneto_ok: {
    type: 'green', icon: '🆕', tag: 'Via disponível — Lei 1/2026',
    title: 'Bisneto com residência — novo caminho aberto',
    desc: 'A Lei Orgânica 1/2026 criou uma via inédita para bisnetos que residam legalmente em Portugal há pelo menos 5 anos. Você cumpre esse requisito.',
    docs: ['Certidão de nascimento do requerente (apostilada)', 'Certidão de nascimento do pai/mãe e do avô/avó', 'Certidão de nascimento do bisavô/bisavó português(a)', 'Prova de residência legal em Portugal (5+ anos)', 'Autorização de residência válida'],
  },
  result_bisneto_aguardar: {
    type: 'yellow', icon: '⏳', tag: 'Quase lá',
    title: 'Bisneto — acumular o tempo restante',
    desc: 'Quando completar 5 anos de residência legal em Portugal, poderá solicitar a nacionalidade pela via de bisneto. Organize a documentação genealógica enquanto aguarda.',
    docs: ['Certidão de nascimento do requerente', 'Certidão de nascimento do pai/mãe e do avô/avó', 'Certidão de nascimento do bisavô/bisavó português(a)', 'Comprovantes de residência legal acumulados'],
  },
  result_bisneto_nao: {
    type: 'orange', icon: '✈️', tag: 'Requisito não cumprido',
    title: 'Bisneto sem residência em Portugal',
    desc: 'A via para bisnetos da Lei 1/2026 exige residência legal em Portugal de pelo menos 5 anos. Quem está no Brasil não pode usar este caminho. Verifique se há outra via disponível no seu caso.',
    docs: [],
  },
  result_conjuge_ok: {
    type: 'green', icon: '💍', tag: 'Elegível',
    title: 'Cidadania por casamento / união de facto',
    desc: 'Com 3 ou mais anos de casamento ou união de facto com cidadão(ã) português(a), você tem direito a solicitar a nacionalidade. Prazo: 24 a 48 meses.',
    docs: ['Certidão de casamento ou prova de união de facto (apostilada)', 'Certidão de nascimento do requerente (apostilada)', 'Prova de nacionalidade portuguesa do cônjuge', 'Comprovantes da vida em comum (residência, finanças)'],
  },
  result_conjuge_cedo: {
    type: 'orange', icon: '⏳', tag: 'Ainda não elegível',
    title: 'Casamento — aguardar completar 3 anos',
    desc: 'A lei exige pelo menos 3 anos de casamento ou união de facto comprovada. Continue documentando a relação — cada comprovante conta para quando atingir o prazo.',
    docs: ['Certidão de casamento ou declaração de união de facto', 'Comprovantes progressivos de vida em comum'],
  },
  result_residencia_ok: {
    type: 'green', icon: '🏠', tag: 'Elegível — brasileiro/CPLP',
    title: 'Naturalização — prazo cumprido',
    desc: 'Com 7 ou mais anos de residência legal em Portugal, você atingiu o prazo exigido pela Lei 1/2026 para solicitar a naturalização como brasileiro ou cidadão CPLP.',
    docs: ['Autorização de residência (histórico de 7 anos)', 'Certidão de nascimento apostilada', 'Comprovantes de residência contínua', 'Certificado de registo criminal (Brasil e Portugal)', 'Prova de meios de subsistência'],
  },
  result_residencia_ok5: {
    type: 'green', icon: '🏠', tag: 'Elegível — outros países',
    title: 'Naturalização — prazo cumprido',
    desc: 'Para nacionais de países fora da CPLP, o prazo é de 5 anos de residência legal. Você já cumpriu esse requisito e pode solicitar a naturalização.',
    docs: ['Autorização de residência (histórico de 5 anos)', 'Certidão de nascimento apostilada', 'Comprovantes de residência contínua', 'Certificado de registo criminal do país de origem e de Portugal'],
  },
  result_residencia_quase: {
    type: 'yellow', icon: '⏳', tag: 'Quase elegível',
    title: 'Residência entre 5 e 7 anos — verifique seu caso',
    desc: 'Se você é de um país fora da CPLP, com 5 anos já é elegível. Se é brasileiro, a Lei 1/2026 exige 7 anos. Verifique qual regra se aplica e organize a documentação para estar pronto.',
    docs: ['Autorização de residência atualizada', 'Histórico de entradas e saídas de Portugal', 'Comprovantes de residência contínua'],
  },
  result_residencia_cedo: {
    type: 'orange', icon: '📅', tag: 'Prazo insuficiente',
    title: 'Residência — tempo ainda não cumprido',
    desc: 'Menos de 5 anos de residência não é suficiente para a naturalização. Continue acumulando o tempo e organize os documentos para estar pronto quando atingir o prazo.',
    docs: ['Mantenha a autorização de residência sempre renovada', 'Guarde comprovantes de residência mês a mês'],
  },
  result_nenhum: {
    type: 'red', icon: '❓', tag: 'Nenhuma via identificada',
    title: 'Nenhuma via direta identificada',
    desc: 'Com base nas suas respostas, não identificamos uma via direta no momento. Pode haver situações específicas que um especialista consegue identificar analisando sua família em detalhe.',
    docs: [],
  },
};

// ── Cores por tipo ─────────────────────────────────────────────
const TYPE_STYLES = {
  green:  { bg: 'bg-emerald-50',  border: 'border-emerald-200', icon: 'text-emerald-600', tag: 'text-emerald-700', tagBg: 'bg-emerald-100' },
  yellow: { bg: 'bg-amber-50',    border: 'border-amber-200',   icon: 'text-amber-600',   tag: 'text-amber-700',   tagBg: 'bg-amber-100' },
  orange: { bg: 'bg-orange-50',   border: 'border-orange-200',  icon: 'text-orange-600',  tag: 'text-orange-700',  tagBg: 'bg-orange-100' },
  red:    { bg: 'bg-red-50',      border: 'border-red-200',     icon: 'text-red-600',     tag: 'text-red-700',     tagBg: 'bg-red-100' },
};

// ══════════════════════════════════════════════════════════════
//  COMPONENTE
// ══════════════════════════════════════════════════════════════
export default function Quiz() {
  const [phase, setPhase]       = useState<'intro' | 'quiz' | 'result'>('intro');
  const [history, setHistory]   = useState<string[]>([]);
  const [currentKey, setCurrentKey] = useState('q1');
  const [stepNum, setStepNum]   = useState(1);
  const [resultKey, setResultKey] = useState('');
  const [leadName, setLeadName]   = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { trackEvent, trackConversion, trackPixelLead } = useAnalytics();

  // Calcula profundidade máxima da árvore dinamicamente
  const TOTAL_STEPS = (() => {
    const maxDepth = (key: string, visited = new Set<string>()): number => {
      if (visited.has(key)) return 0;
      visited.add(key);
      if (key.startsWith('result_') || !QUESTIONS[key]) return 0;
      return 1 + Math.max(...QUESTIONS[key].options.map(o => maxDepth(o.next, new Set(visited))));
    };
    return maxDepth('q1');
  })();

  function startQuiz() {
    trackEvent('quiz_started');
    setHistory([]);
    setCurrentKey('q1');
    setStepNum(1);
    setPhase('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function choose(fromKey: string, nextKey: string) {
    if (nextKey.startsWith('result_')) {
      setResultKey(nextKey);
      setPhase('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setHistory(h => [...h, fromKey]);
    setCurrentKey(nextKey);
    setStepNum(s => s + 1);
  }

  function goBack() {
    if (history.length === 0) { setPhase('intro'); return; }
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setCurrentKey(prev);
    setStepNum(s => Math.max(1, s - 1));
  }

  function restartQuiz() {
    setPhase('intro');
    setHistory([]);
    setCurrentKey('q1');
    setStepNum(1);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function submitLead() {
    if (!leadName || !leadEmail) return;
    const msg = encodeURIComponent(
      `Olá! Fiz o quiz de cidadania portuguesa.\n\nNome: ${leadName}\nE-mail: ${leadEmail}\nWhatsApp: ${leadPhone}\n\nGostaria de uma análise gratuita do meu caso.`
    );
    trackConversion('lead_quiz', { result: resultKey });
    trackPixelLead({ content_name: 'Quiz Cidadania' });
    window.open(`https://wa.me/351913134260?text=${msg}`, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  }

  const q = QUESTIONS[currentKey];
  const r = resultKey ? RESULTS[resultKey] : null;
  const styles = r ? TYPE_STYLES[r.type] : TYPE_STYLES.green;
  const pct = Math.min(Math.round((stepNum / TOTAL_STEPS) * 100), 95);

  return (
    <>
      <Helmet>
        <title>Quiz — Tenho Direito à Cidadania Portuguesa? | ViannaLegal</title>
        <meta name="description" content="Descubra em 2 minutos se você tem direito à cidadania portuguesa. Quiz gratuito, atualizado com a Lei Orgânica 1/2026. Filhos, netos, bisnetos, cônjuges e residentes." />
        <link rel="canonical" href="https://viannalegal.com.br/quiz" />
        <meta name="robots" content="index, follow, max-snippet:-1" />
        <meta property="og:title" content="Quiz — Tenho Direito à Cidadania Portuguesa?" />
        <meta property="og:description" content="Responda 6 perguntas e descubra seu caminho para o passaporte europeu. Gratuito e atualizado com a Lei 1/2026." />
        <meta property="og:url" content="https://viannalegal.com.br/quiz" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://viannalegal.com.br/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Início", "item": "https://viannalegal.com.br" },
            { "@type": "ListItem", "position": 2, "name": "Quiz — Cidadania Portuguesa", "item": "https://viannalegal.com.br/quiz" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Quiz",
          "name": "Tenho Direito à Cidadania Portuguesa?",
          "description": "Quiz gratuito para descobrir se você tem direito à cidadania portuguesa. Atualizado com a Lei Orgânica 1/2026.",
          "url": "https://viannalegal.com.br/quiz",
          "provider": { "@type": "Organization", "name": "ViannaLegal", "url": "https://viannalegal.com.br" },
          "educationalLevel": "general public",
          "inLanguage": "pt-BR"
        })}</script>
      </Helmet>

      <Header />

      <main className="min-h-screen bg-muted/40 pt-24 pb-20">
        <div className="container-width max-w-2xl">

          {/* ── INTRO ─────────────────────────────────────────── */}
          {phase === 'intro' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <span className="inline-block bg-gold text-primary text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
                Atualizado · Lei Orgânica 1/2026
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                Você tem direito à<br />cidadania portuguesa?
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
                Responda 6 perguntas rápidas e descubra qual é o seu caminho para o passaporte europeu.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mb-10">
                {['2 minutos', 'Gratuito', 'Sem cadastro', 'Lei 1/2026 aplicada'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-gold" />
                    {t}
                  </div>
                ))}
              </div>
              <Button variant="gold" size="lg" onClick={startQuiz} className="text-base font-bold px-10">
                Descobrir meu direito agora
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          )}

          {/* ── QUIZ ──────────────────────────────────────────── */}
          {phase === 'quiz' && q && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentKey}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.25 }}
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Pergunta {stepNum}</span>
                    <span>{stepNum} / {TOTAL_STEPS}</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-gold rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Card */}
                <div className="bg-card rounded-2xl p-8 shadow-subtle border border-border/50">
                  <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-3">{q.category}</p>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 leading-snug">{q.text}</h2>
                  <p className="text-sm text-muted-foreground mb-7 leading-relaxed">{q.hint}</p>

                  <div className="flex flex-col gap-3">
                    {q.options.map(opt => (
                      <button
                        key={opt.label}
                        onClick={() => choose(currentKey, opt.next)}
                        className="flex items-center gap-4 p-4 rounded-xl border-2 border-border bg-muted/40 hover:border-gold hover:bg-card text-left transition-all duration-150 group"
                      >
                        <span className="text-2xl w-10 h-10 flex items-center justify-center rounded-full bg-card group-hover:bg-gold/10 transition-colors flex-shrink-0">{opt.icon}</span>
                        <span className="font-medium text-foreground text-sm leading-snug">{opt.label}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold ml-auto flex-shrink-0 transition-colors" />
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={goBack}
                    className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Voltar
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* ── RESULT ────────────────────────────────────────── */}
          {phase === 'result' && r && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

              {/* Resultado principal */}
              <div className={`rounded-2xl border-2 ${styles.bg} ${styles.border} p-8 mb-6`}>
                <div className="flex items-start gap-4 mb-5">
                  <span className="text-4xl">{r.icon}</span>
                  <div>
                    <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 ${styles.tagBg} ${styles.tag}`}>
                      {r.tag}
                    </span>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground leading-snug">{r.title}</h2>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">{r.desc}</p>

                {r.docs.length > 0 && (
                  <div className="bg-white/70 rounded-xl p-5">
                    <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">📋 Documentos principais</p>
                    <ul className="flex flex-col gap-2">
                      {r.docs.map(d => (
                        <li key={d} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="border-l-4 border-gold bg-gold/10 rounded-r-xl p-4 mb-6 text-sm text-foreground/70 leading-relaxed">
                <strong className="text-foreground">⚠️ Aviso legal:</strong> Este quiz é apenas informativo e não substitui análise jurídica individualizada. Cada caso tem suas particularidades. Consulte sempre um advogado especializado antes de iniciar seu processo.
              </div>

              {/* Lead capture */}
              <div className="bg-primary rounded-2xl p-8 text-primary-foreground">
                <h3 className="font-display text-xl font-bold mb-2">Quer uma análise gratuita do seu caso?</h3>
                <p className="text-primary-foreground/70 text-sm mb-6 leading-relaxed">
                  Um especialista da ViannaLegal revisa seu perfil e te diz exatamente o que fazer — sem custo nessa etapa.
                </p>

                {!submitted ? (
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder="Seu nome completo"
                      value={leadName}
                      onChange={e => setLeadName(e.target.value)}
                      className="rounded-xl px-4 py-3 text-sm bg-white/10 text-primary-foreground placeholder:text-primary-foreground/40 border border-white/20 outline-none focus:bg-white/20 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Seu melhor e-mail"
                      value={leadEmail}
                      onChange={e => setLeadEmail(e.target.value)}
                      className="rounded-xl px-4 py-3 text-sm bg-white/10 text-primary-foreground placeholder:text-primary-foreground/40 border border-white/20 outline-none focus:bg-white/20 transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="WhatsApp (com DDD)"
                      value={leadPhone}
                      onChange={e => setLeadPhone(e.target.value)}
                      className="rounded-xl px-4 py-3 text-sm bg-white/10 text-primary-foreground placeholder:text-primary-foreground/40 border border-white/20 outline-none focus:bg-white/20 transition-colors"
                    />
                    <Button variant="gold" size="lg" onClick={submitLead} className="w-full font-bold">
                      Quero minha análise gratuita
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                    <p className="text-gold font-bold text-lg mb-1">✅ Solicitação recebida!</p>
                    <p className="text-primary-foreground/70 text-sm">Um especialista entrará em contato em até 24h.</p>
                  </motion.div>
                )}

                <a
                  href="https://wa.me/351913134260?text=Olá!%20Fiz%20o%20quiz%20de%20cidadania%20e%20gostaria%20de%20uma%20análise%20do%20meu%20caso."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-3 bg-[#25d366] hover:opacity-90 transition-opacity text-white font-semibold rounded-xl px-6 py-3 text-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar no WhatsApp agora
                </a>

                <button
                  onClick={restartQuiz}
                  className="mt-4 w-full text-center text-xs text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors underline"
                >
                  Refazer o quiz
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
