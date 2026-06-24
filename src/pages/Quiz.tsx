import { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle, MessageCircle, Send, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ── Tipos ──────────────────────────────────────────────────────
interface Option {
  icon: string;
  label: string;
  next: string;
}
interface Question {
  kind: 'question';
  category: string;
  text: string;
  hint?: string;
  options: Option[];
}
interface ComparisonOption {
  icon: string;
  label: string;
  tag: string;
  pros: string[];
  cons: string[];
  next: string;
}
interface Comparison {
  kind: 'comparison';
  category: string;
  text: string;
  subtitle?: string;
  options: ComparisonOption[];
}
interface Result {
  kind: 'result';
  type: 'green' | 'yellow' | 'orange' | 'red';
  icon: string;
  tag: string;
  title: string;
  desc: string;
  docs: string[];
  relatedArticles?: { slug: string; title: string }[];
}

type Node = Question | Comparison | Result;

// ── Fluxo ──────────────────────────────────────────────────────
const NODES: Record<string, Node> = {

  // ════════════════════════════════════════════════════════════
  // PERGUNTA DE ENTRADA — duas linhas
  // ════════════════════════════════════════════════════════════
  q1: {
    kind: 'question',
    category: 'Ponto de partida',
    text: 'Como você pretende obter a cidadania portuguesa?',
    hint: 'Escolha a linha que melhor descreve a sua situação. Cada uma tem um fluxo completamente diferente.',
    options: [
      { icon: '🧬', label: 'Tenho ascendência portuguesa — tenho um familiar português', next: 'q_descendencia' },
      { icon: '🏡', label: 'Não tenho ascendência — mas tenho outro vínculo com Portugal', next: 'q_outros_vinculos' },
    ],
  },

  // ════════════════════════════════════════════════════════════
  // LINHA A — DESCENDÊNCIA
  // ════════════════════════════════════════════════════════════
  q_descendencia: {
    kind: 'question',
    category: 'Linha A — Descendência',
    text: 'Qual é o parente português mais próximo que você tem na família?',
    hint: 'Quanto mais próxima a geração, mais simples e rápido tende a ser o processo.',
    options: [
      { icon: '👨‍👩‍👧', label: 'Pai ou Mãe',               next: 'q_filho_idade' },
      { icon: '👴👵', label: 'Avô ou Avó',                next: 'q_neto_pai_vivo' },
      { icon: '🧓',   label: 'Bisavô ou Bisavó',          next: 'q_bisneto_avo_vivo' },
      { icon: '👴',   label: 'Trisavô ou geração anterior', next: 'q_trisavo_bisavo_vivo' },
    ],
  },

  // ── FILHOS ────────────────────────────────────────────────
  q_filho_idade: {
    kind: 'question',
    category: 'Descendência — Filho(a)',
    text: 'Você tem menos de 18 anos?',
    hint: 'Para menores de idade o processo é muito mais rápido — leva apenas 3 a 5 meses.',
    options: [
      { icon: '🧒', label: 'Sim, sou menor de 18 anos',  next: 'result_filho_menor' },
      { icon: '🧑', label: 'Não, já sou maior de idade', next: 'result_filho_maior' },
    ],
  },

  // ── NETOS ─────────────────────────────────────────────────
  q_neto_pai_vivo: {
    kind: 'question',
    category: 'Descendência — Neto(a)',
    text: 'O seu pai ou mãe — filho(a) direto(a) do avô/avó português(a) — ainda está vivo(a)?',
    hint: 'Se o pai/mãe estiver vivo, existe uma estratégia muito mais vantajosa do que ir directamente como neto.',
    options: [
      { icon: '😊', label: 'Sim, está vivo(a)',    next: 'q_neto_opcoes' },
      { icon: '🕊️', label: 'Não, já faleceu',     next: 'q_neto_avo_vivo' },
      { icon: '🤷', label: 'Não tenho certeza',   next: 'q_neto_opcoes' },
    ],
  },

  // Tela de comparação — coração do fluxo de netos
  q_neto_opcoes: {
    kind: 'comparison',
    category: 'Descendência — Neto(a)',
    text: 'Boas notícias — você tem duas opções. Qual prefere?',
    subtitle: 'Como o seu pai ou mãe está vivo(a), existe uma estratégia muito mais vantajosa do que ir directamente como neto(a).',
    options: [
      {
        icon: '⚡',
        label: 'Opção 1 — Directa',
        tag: 'Um processo só',
        pros: [
          '⏱️ Prazo: 42 a 48 meses',
          'Um único processo — você pede directamente como neto(a)',
          'Investimento menor',
        ],
        cons: [
          'Precisa comprovar vínculo com Portugal (viagens, cultura, idioma)',
          'Mais risco se a documentação de vínculo for fraca',
        ],
        next: 'q_neto_avo_vivo',
      },
      {
        icon: '🛡️',
        label: 'Opção 2 — Via ascendente (recomendada)',
        tag: 'Mais rápida e sem vínculo',
        pros: [
          '⏱️ Prazo total: apenas 8 a 12 meses (dois processos de filho)',
          '1.º: pai/mãe pede como filho(a) do avô/avó → 4 a 6 meses',
          '2.º: você pede como filho(a) do pai/mãe → 4 a 6 meses',
          'Nenhum dos dois precisa comprovar vínculo com Portugal',
          'Juridicamente mais sólido — cadeia completa',
        ],
        cons: [
          'Investimento maior (dois processos)',
          'Requer que o pai/mãe queira participar',
        ],
        next: 'result_neto_via_pai',
      },
    ],
  },

  q_neto_avo_vivo: {
    kind: 'question',
    category: 'Descendência — Neto(a)',
    text: 'O avô ou avó português(a) ainda está vivo(a)?',
    hint: 'Isso determina quais documentos são necessários para provar a descendência.',
    options: [
      { icon: '😊', label: 'Sim, está vivo(a)',  next: 'q_neto_doc_avo' },
      { icon: '🕊️', label: 'Não, já faleceu',   next: 'q_neto_obito' },
      { icon: '🤷', label: 'Não tenho certeza', next: 'q_neto_doc_avo' },
    ],
  },

  q_neto_obito: {
    kind: 'question',
    category: 'Descendência — Neto(a)',
    text: 'Você consegue obter a certidão de óbito do avô ou avó?',
    hint: 'Quando o avô/avó já faleceu, essa certidão é obrigatória para fechar a cadeia de descendência.',
    options: [
      { icon: '✅', label: 'Sim, tenho ou consigo obter', next: 'q_neto_doc_avo' },
      { icon: '⚠️', label: 'Não sei onde obter',         next: 'q_neto_municipio' },
    ],
  },

  q_neto_municipio: {
    kind: 'question',
    category: 'Descendência — Neto(a)',
    text: 'Você sabe em qual região ou cidade de Portugal o avô/avó nasceu?',
    hint: 'Com essa informação é possível pesquisar nos arquivos paroquiais e conservatórias portuguesas.',
    options: [
      { icon: '📍', label: 'Sim, sei a cidade ou região', next: 'q_neto_doc_avo' },
      { icon: '❌', label: 'Não tenho essa informação',   next: 'result_neto_pesquisa' },
    ],
  },

  q_neto_doc_avo: {
    kind: 'question',
    category: 'Descendência — Neto(a)',
    text: 'Você tem acesso à certidão de nascimento do avô ou avó emitida em Portugal?',
    hint: 'Esse é o documento central do processo de neto — sem ele não é possível comprovar a ascendência.',
    options: [
      { icon: '✅', label: 'Sim, tenho ou sei como obter',              next: 'result_neto_forte' },
      { icon: '⚠️', label: 'Não tenho, mas posso pesquisar',           next: 'result_neto_fraco' },
      { icon: '❌', label: 'Não tenho e não sei por onde começar',      next: 'result_neto_pesquisa' },
    ],
  },

  // ── BISNETOS ──────────────────────────────────────────────
  q_bisneto_avo_vivo: {
    kind: 'question',
    category: 'Descendência — Bisneto(a)',
    text: 'O seu avô ou avó — filho(a) direto(a) do bisavô/bisavó português(a) — ainda está vivo(a)?',
    hint: 'Se o avô/avó estiver vivo, ele pode pedir como filho(a) de português — muito mais simples e rápido.',
    options: [
      { icon: '😊', label: 'Sim, está vivo(a)',  next: 'result_bisneto_avo_vivo' },
      { icon: '🕊️', label: 'Não, já faleceu',   next: 'q_bisneto_pai_vivo' },
      { icon: '🤷', label: 'Não tenho certeza', next: 'result_bisneto_avo_vivo' },
    ],
  },

  q_bisneto_pai_vivo: {
    kind: 'question',
    category: 'Descendência — Bisneto(a)',
    text: 'E o seu pai ou mãe — neto(a) do bisavô/bisavó português(a) — ainda está vivo(a)?',
    hint: 'Se o pai/mãe estiver vivo, pode pedir como neto(a) de português e depois você pede como filho(a).',
    options: [
      { icon: '😊', label: 'Sim, está vivo(a)',  next: 'result_bisneto_pai_vivo' },
      { icon: '🕊️', label: 'Não, já faleceu',   next: 'q_bisneto_sem_ascendentes' },
      { icon: '🤷', label: 'Não tenho certeza', next: 'result_bisneto_pai_vivo' },
    ],
  },

  q_bisneto_sem_ascendentes: {
    kind: 'question',
    category: 'Descendência — Bisneto(a)',
    text: 'Avô/avó e pai/mãe já faleceram. Você reside legalmente em Portugal?',
    hint: 'A Lei 1/2026 criou uma via para bisnetos com 5 anos de residência legal em Portugal. Existe também a via de naturalização por 7 anos de residência.',
    options: [
      { icon: '🇵🇹', label: 'Sim, resido em Portugal',          next: 'q_bisneto_anos_residencia' },
      { icon: '🇧🇷', label: 'Não, moro no Brasil',              next: 'result_bisneto_sem_saida' },
      { icon: '✈️',  label: 'Estou a planear mudar para Portugal', next: 'result_bisneto_planear' },
    ],
  },

  q_bisneto_anos_residencia: {
    kind: 'question',
    category: 'Descendência — Bisneto(a)',
    text: 'Há quantos anos reside legalmente em Portugal?',
    hint: 'A via de bisnetos exige 5 anos. A naturalização por residência exige 7 anos para brasileiros.',
    options: [
      { icon: '✅', label: '7 anos ou mais',    next: 'result_bisneto_naturalizacao' },
      { icon: '⏳', label: '5 a 6 anos',        next: 'result_bisneto_art6' },
      { icon: '📅', label: 'Menos de 5 anos',  next: 'result_bisneto_aguardar' },
    ],
  },

  // ── TRISAVÔ ───────────────────────────────────────────────
  q_trisavo_bisavo_vivo: {
    kind: 'question',
    category: 'Descendência — Trisavô',
    text: 'O seu bisavô ou bisavó — filho(a) direto(a) do trisavô português — ainda está vivo(a)?',
    hint: 'Se o bisavô/bisavó estiver vivo, ele pode pedir como filho(a) de português e a cadeia segue normalmente.',
    options: [
      { icon: '😊', label: 'Sim, está vivo(a)',  next: 'result_trisavo_bisavo_vivo' },
      { icon: '🕊️', label: 'Não, já faleceu',   next: 'q_trisavo_avo_vivo' },
      { icon: '🤷', label: 'Não tenho certeza', next: 'result_trisavo_bisavo_vivo' },
    ],
  },

  q_trisavo_avo_vivo: {
    kind: 'question',
    category: 'Descendência — Trisavô',
    text: 'E o seu avô ou avó — neto(a) do trisavô português — ainda está vivo(a)?',
    hint: 'O avô pode pedir como neto(a) do trisavô português — pula uma geração, o que é permitido.',
    options: [
      { icon: '😊', label: 'Sim, está vivo(a)',  next: 'result_trisavo_avo_vivo' },
      { icon: '🕊️', label: 'Não, já faleceu',   next: 'result_trisavo_sem_saida' },
      { icon: '🤷', label: 'Não tenho certeza', next: 'result_trisavo_avo_vivo' },
    ],
  },

  // ════════════════════════════════════════════════════════════
  // LINHA B — OUTROS VÍNCULOS
  // ════════════════════════════════════════════════════════════
  q_outros_vinculos: {
    kind: 'question',
    category: 'Linha B — Outros vínculos',
    text: 'Qual é o seu vínculo com Portugal?',
    options: [
      { icon: '💍', label: 'Sou casado(a) ou em união de facto com português(a)', next: 'q_conjuge_tempo' },
      { icon: '🏡', label: 'Resido legalmente em Portugal',                        next: 'q_residencia_anos' },
      { icon: '❓', label: 'Nenhum vínculo direto',                               next: 'result_nenhum' },
    ],
  },

  // ── CÔNJUGE ───────────────────────────────────────────────
  q_conjuge_tempo: {
    kind: 'question',
    category: 'Casamento / União de facto',
    text: 'Há quanto tempo dura este casamento ou união de facto?',
    hint: 'A lei exige pelo menos 3 anos de relacionamento comprovado com cidadão(ã) português(a).',
    options: [
      { icon: '📅', label: 'Menos de 3 anos', next: 'result_conjuge_cedo' },
      { icon: '✅', label: '3 anos ou mais',  next: 'result_conjuge_ok' },
    ],
  },

  // ── RESIDÊNCIA ────────────────────────────────────────────
  q_residencia_anos: {
    kind: 'question',
    category: 'Naturalização por residência',
    text: 'Há quantos anos reside legalmente em Portugal?',
    hint: 'A Lei 1/2026 fixou o prazo em 7 anos para brasileiros e cidadãos da CPLP. Para outras nacionalidades são 10 anos.',
    options: [
      { icon: '✅', label: '7 anos ou mais (brasileiro/CPLP)',   next: 'result_residencia_ok' },
      { icon: '✅', label: '10 anos ou mais (outras nationalidades)', next: 'result_residencia_ok' },
      { icon: '⏳', label: 'Entre 5 e 6 anos (brasileiro/CPLP)', next: 'result_residencia_quase' },
      { icon: '📅', label: 'Menos de 5 anos',                    next: 'result_residencia_cedo' },
    ],
  },

  // ════════════════════════════════════════════════════════════
  // RESULTADOS — LINHA A (DESCENDÊNCIA)
  // ════════════════════════════════════════════════════════════

  result_filho_menor: {
    kind: 'result',
    type: 'green', icon: '🌟', tag: 'Via mais rápida de todas!',
    title: 'Ótima notícia — filho(a) menor de português(a)',
    desc: 'Como filho(a) menor de cidadão(ã) português(a), você tem o processo mais simples e mais rápido. Prazo estimado: 3 a 5 meses. Pode ser feito 100% do Brasil, por procuração, sem precisar viajar a Portugal.',
    docs: [
      'Certidão de nascimento do filho (apostilada)',
      'Certidão de nascimento do pai/mãe português(a)',
      'Prova de nationalidade portuguesa do pai/mãe',
      'Certidão de casamento dos pais (se aplicável)',
    ],
    relatedArticles: [
      { slug: 'cidadania-portuguesa-para-menores-de-idade-o-que-os-pais-precisam-saber', title: 'O que os pais precisam saber sobre cidadania para menores' },
      { slug: 'filho-vs-neto-diferencas-no-processo-de-cidadania-portuguesa', title: 'Filho vs. neto: quais são as diferenças?' },
    ],
  },

  result_filho_maior: {
    kind: 'result',
    type: 'green', icon: '✅', tag: 'Alta probabilidade',
    title: 'Filho(a) maior de português(a) — direito directo',
    desc: 'Como filho(a) maior de cidadão(ã) português(a), você tem direito directo à nationalidade. Prazo estimado para processos novos: 4 a 6 meses. Pode ser feito 100% do Brasil, sem viagem a Portugal e sem comprovar vínculo.',
    docs: [
      'Certidão de nascimento do requerente (apostilada)',
      'Certidão de nascimento do pai/mãe português(a)',
      'Prova de nationalidade portuguesa do pai/mãe',
      'Certidão de casamento dos pais ou reconhecimento de paternidade',
      'Certidão criminal federal + estadual (apostiladas)',
    ],
    relatedArticles: [
      { slug: 'filho-vs-neto-diferencas-no-processo-de-cidadania-portuguesa', title: 'Filho vs. neto: diferenças no processo' },
      { slug: 'cidadania-portuguesa-para-quem-tem-pai-falecido', title: 'E se o pai já faleceu? Ainda tenho direito?' },
      { slug: 'tempo-medio-de-aprovacao-por-tipo-de-processo-em-2026', title: 'Quanto tempo leva na prática em 2026' },
    ],
  },

  result_neto_via_pai: {
    kind: 'result',
    type: 'green', icon: '🛡️', tag: 'Estratégia recomendada',
    title: 'Via ascendente — dois processos de filho, sem vínculo',
    desc: 'Esta é a estratégia mais inteligente quando o pai/mãe está vivo. Em vez de você pedir como neto (42–48 meses + comprovar vínculo), o pai/mãe pede primeiro como filho(a) do avô/avó português — leva 4 a 6 meses. Depois você pede como filho(a) — mais 4 a 6 meses. Total: 8 a 12 meses. Nenhum dos dois precisa comprovar vínculo com Portugal. O investimento é um pouco maior por serem dois processos, mas o tempo e a segurança jurídica compensam amplamente.',
    docs: [
      'Certidão de nascimento do avô/avó em Portugal (em inteiro teor)',
      'Certidão de nascimento do pai/mãe (apostilada)',
      'Certidão de nascimento do requerente (apostilada)',
      'Certidão criminal de ambos (apostiladas)',
    ],
    relatedArticles: [
      { slug: 'filho-vs-neto-diferencas-no-processo-de-cidadania-portuguesa', title: 'Filho vs. neto: diferenças no processo' },
      { slug: 'checklist-completa-de-documentos-para-netos-de-portugueses', title: 'Checklist completa de documentos para netos' },
    ],
  },

  result_neto_forte: {
    kind: 'result',
    type: 'green', icon: '🇵🇹', tag: 'Boa probabilidade',
    title: 'Neto(a) directo — processo viável',
    desc: 'Com a certidão de nascimento do avô ou avó em mãos, o processo tem base documental sólida. O IRN vai avaliar o vínculo com Portugal (viagens, conhecimento da língua, ligações à comunidade portuguesa). Prazo estimado: 42 a 48 meses.',
    docs: [
      'Certidão de nascimento do avô/avó em Portugal (em inteiro teor)',
      'Certidão de casamento do avô/avó',
      'Certidão de óbito do avô/avó (se falecido)',
      'Certidão de nascimento do pai/mãe (apostilada)',
      'Certidão de nascimento do requerente (apostilada)',
      'Documentos de vínculo efetivo com Portugal',
      'Certidão criminal federal + estadual (apostiladas)',
    ],
    relatedArticles: [
      { slug: 'checklist-completa-de-documentos-para-netos-de-portugueses', title: 'Checklist completa de documentos para netos' },
      { slug: 'como-acompanhar-o-andamento-do-processo-de-cidadania-portuguesa', title: 'Como acompanhar o processo passo a passo' },
      { slug: 'tempo-medio-de-aprovacao-por-tipo-de-processo-em-2026', title: 'Prazos reais de aprovação em 2026' },
    ],
  },

  result_neto_fraco: {
    kind: 'result',
    type: 'yellow', icon: '⚠️', tag: 'Análise necessária',
    title: 'Neto(a) — precisa localizar a certidão do avô/avó primeiro',
    desc: 'Sem a certidão de nascimento do avô ou avó em mãos, é preciso localizá-la nos arquivos portugueses antes de dar entrada no processo. Na maioria dos casos o registo existe em Portugal — mas requer pesquisa especializada. Não é um bloqueio, é um passo adicional.',
    docs: [
      'Pesquisa nos arquivos distritais portugueses (pela assessoria)',
      'Certidão de nascimento do avô/avó (a ser localizada em Portugal)',
      'Certidão de nascimento do pai/mãe (apostilada)',
      'Certidão de nascimento do requerente (apostilada)',
    ],
    relatedArticles: [
      { slug: 'cidadania-portuguesa-para-quem-tem-documentos-perdidos', title: 'Como resolver quando não tem documentos do avô' },
      { slug: 'erros-comuns-na-arvore-genealogica-para-cidadania-portuguesa', title: 'Erros comuns na árvore genealógica' },
    ],
  },

  result_neto_pesquisa: {
    kind: 'result',
    type: 'yellow', icon: '🔍', tag: 'Pesquisa necessária',
    title: 'Antes de desistir — vale fazer uma pesquisa genealógica',
    desc: 'Não saber a origem do avô não fecha o processo automaticamente. Com o nome completo do avô e uma data aproximada, profissionais especializados conseguem rastrear os documentos nos arquivos portugueses. A maioria dos imigrantes tem registos preservados em Portugal.',
    docs: [
      'Nome completo do avô/avó',
      'Qualquer documento brasileiro que o mencione (certidão de casamento, óbito, RG antigo)',
      'Período e local aproximado de chegada ao Brasil',
    ],
    relatedArticles: [
      { slug: 'cidadania-portuguesa-para-quem-tem-documentos-perdidos', title: 'Como encontrar documentos do avô quando a família não tem nada' },
      { slug: 'cidadania-portuguesa-para-descendentes-de-emigrantes', title: 'Descendentes de emigrantes: onde estão os documentos' },
    ],
  },

  // ── RESULTADOS BISNETOS ───────────────────────────────────

  result_bisneto_avo_vivo: {
    kind: 'result',
    type: 'green', icon: '✨', tag: 'Excelente — caminho claro',
    title: 'Bisavô português e avô vivo — cadeia de filhos',
    desc: 'Esta é a situação mais favorável. O avô/avó é filho(a) direto do bisavô português — pode pedir como filho(a) em 4 a 6 meses. Depois o pai/mãe pede como filho(a) — mais 4 a 6 meses. Por fim você pede como filho(a) — mais 4 a 6 meses. Total: 12 a 18 meses para três processos. Nenhum precisa comprovar vínculo com Portugal.',
    docs: [
      'Certidão de nascimento do bisavô/bisavó em Portugal (em inteiro teor)',
      'Certidão de nascimento do avô/avó (apostilada)',
      'Certidão de nascimento do pai/mãe (apostilada)',
      'Certidão de nascimento do requerente (apostilada)',
      'Certidão criminal de cada requerente (apostiladas)',
    ],
    relatedArticles: [
      { slug: 'filho-vs-neto-diferencas-no-processo-de-cidadania-portuguesa', title: 'Filho vs. neto: diferenças no processo' },
      { slug: 'guia-definitivo-todas-as-formas-de-obter-cidadania-portuguesa-em-2026', title: 'Todas as formas de obter cidadania em 2026' },
    ],
  },

  result_bisneto_pai_vivo: {
    kind: 'result',
    type: 'green', icon: '🇵🇹', tag: 'Caminho disponível',
    title: 'Bisavô português, avô falecido, pai/mãe vivo — via de neto',
    desc: 'O avô já faleceu, mas o pai/mãe ainda está vivo e pode pedir como neto(a) do bisavô português — prazo de 42 a 48 meses com comprovação de vínculo. Depois você pede como filho(a) — apenas 4 a 6 meses. Total: ~46 a 54 meses. Apenas o pai/mãe precisa comprovar vínculo com Portugal.',
    docs: [
      'Certidão de nascimento do bisavô/bisavó em Portugal (em inteiro teor)',
      'Certidão de nascimento e óbito do avô/avó (apostiladas)',
      'Certidão de nascimento do pai/mãe (apostilada)',
      'Certidão de nascimento do requerente (apostilada)',
      'Documentos de vínculo efetivo com Portugal (para o processo do pai/mãe)',
    ],
    relatedArticles: [
      { slug: 'checklist-completa-de-documentos-para-netos-de-portugueses', title: 'Checklist de documentos para netos' },
      { slug: 'tempo-medio-de-aprovacao-por-tipo-de-processo-em-2026', title: 'Prazos reais em 2026' },
    ],
  },

  result_bisneto_naturalizacao: {
    kind: 'result',
    type: 'green', icon: '🏠', tag: 'Duas vias disponíveis',
    title: 'Bisneto com 7+ anos em Portugal — naturalização ou Art. 6.º n.º 8',
    desc: 'Com 7 ou mais anos de residência legal em Portugal, você tem duas vias disponíveis: naturalização por residência (prazo de análise: 27 a 30 meses) e a via de bisneto do Art. 6.º n.º 8 da Lei 1/2026 (prazo estimado: 28 a 36 meses). A assessoria avalia qual é mais vantajosa no seu caso específico.',
    docs: [
      'Autorização de residência legal em Portugal (histórico de 7 anos)',
      'Certidão de nascimento do bisavô/bisavó em Portugal',
      'Certidão de nascimento do requerente (apostilada)',
      'Certidão criminal (Brasil e Portugal)',
      'Prova de meios de subsistência',
    ],
    relatedArticles: [
      { slug: 'naturalizacao-por-residencia-em-portugal-requisitos-atualizados-2026', title: 'Naturalização por residência: requisitos 2026' },
      { slug: 'atualizacoes-da-lei-da-nacionalidade-portuguesa-em-2026', title: 'O que mudou com a Lei 1/2026' },
    ],
  },

  result_bisneto_art6: {
    kind: 'result',
    type: 'green', icon: '🆕', tag: 'Via disponível — Lei 1/2026',
    title: 'Bisneto com 5 a 6 anos em Portugal — Art. 6.º n.º 8',
    desc: 'A Lei Orgânica 1/2026 criou uma via específica para bisnetos de portugueses que residam legalmente em Portugal há pelo menos 5 anos. Você cumpre esse requisito. Prazo estimado de análise: 28 a 36 meses. Nota: a regulamentação detalhada desta via tem prazo até agosto de 2026 — a assessoria acompanha as actualizações.',
    docs: [
      'Certidão de nascimento do bisavô/bisavó em Portugal (em inteiro teor)',
      'Certidão de nascimento do avô/avó e do pai/mãe',
      'Certidão de nascimento do requerente (apostilada)',
      'Prova de residência legal em Portugal (5+ anos)',
      'Autorização de residência válida',
      'Certidão criminal (Brasil e Portugal)',
    ],
    relatedArticles: [
      { slug: 'atualizacoes-da-lei-da-nacionalidade-portuguesa-em-2026', title: 'O que mudou com a Lei Orgânica 1/2026' },
      { slug: 'guia-definitivo-todas-as-formas-de-obter-cidadania-portuguesa-em-2026', title: 'Todas as formas de obter cidadania em 2026' },
    ],
  },

  result_bisneto_aguardar: {
    kind: 'result',
    type: 'yellow', icon: '⏳', tag: 'Quase lá',
    title: 'Bisneto em Portugal — acumular o tempo de residência',
    desc: 'Você está em Portugal mas ainda não completou os 5 anos exigidos pelo Art. 6.º n.º 8 da Lei 1/2026. Use o tempo para organizar toda a documentação genealógica — quando completar o prazo, o processo começa mais rapidamente.',
    docs: [
      'Certidão de nascimento do bisavô/bisavó em Portugal (começar a pesquisar já)',
      'Comprovantes de residência legal acumulados',
    ],
    relatedArticles: [
      { slug: 'atualizacoes-da-lei-da-nacionalidade-portuguesa-em-2026', title: 'Requisitos da Lei 1/2026 para bisnetos' },
    ],
  },

  result_bisneto_sem_saida: {
    kind: 'result',
    type: 'orange', icon: '⚠️', tag: 'Situação a analisar',
    title: 'Bisavô português, avô e pai falecidos, sem residência em Portugal',
    desc: 'Com os dois ascendentes intermédios já falecidos e sem residência em Portugal, as vias directas de descendência não estão disponíveis. A regulamentação do Art. 6.º n.º 8 da Lei 1/2026 ainda está em definição (prazo agosto 2026) e pode trazer novas possibilidades. Por agora, a via disponível seria a naturalização por residência após mudar para Portugal (7 anos para brasileiros). Recomendamos análise jurídica individualizada para explorar todas as opções.',
    docs: [],
    relatedArticles: [
      { slug: 'atualizacoes-da-lei-da-nacionalidade-portuguesa-em-2026', title: 'O que a Lei 1/2026 prevê para bisnetos' },
      { slug: 'naturalizacao-por-residencia-em-portugal-requisitos-atualizados-2026', title: 'Naturalização por residência em Portugal' },
    ],
  },

  result_bisneto_planear: {
    kind: 'result',
    type: 'yellow', icon: '🗓️', tag: 'Planear para o futuro',
    title: 'Bisneto a planear a mudança — comece a preparar já',
    desc: 'Quando completar 5 anos de residência legal em Portugal, a via do Art. 6.º n.º 8 da Lei 1/2026 estará disponível. Enquanto isso, organize a árvore genealógica e os documentos do bisavô — são processos demorados que vale a pena iniciar agora.',
    docs: [
      'Certidão de nascimento do bisavô/bisavó em Portugal (pesquisar nos arquivos)',
      'Certidão de nascimento do avô/avó e pai/mãe (apostiladas)',
    ],
    relatedArticles: [
      { slug: 'atualizacoes-da-lei-da-nacionalidade-portuguesa-em-2026', title: 'O que mudou com a Lei 1/2026 para bisnetos' },
    ],
  },

  // ── RESULTADOS TRISAVÔ ────────────────────────────────────

  result_trisavo_bisavo_vivo: {
    kind: 'result',
    type: 'green', icon: '✨', tag: 'Caminho disponível',
    title: 'Trisavô português e bisavô vivo — cadeia de filhos',
    desc: 'O bisavô/bisavó é filho(a) direto(a) do trisavô português e pode pedir a nationalidade como filho(a) — prazo de 4 a 6 meses. A partir daí a cadeia segue: avô como filho(a), pai/mãe como filho(a), você como filho(a). Cada processo leva 4 a 6 meses. Nenhum precisa comprovar vínculo com Portugal.',
    docs: [
      'Certidão de nascimento do trisavô/trisavó em Portugal (em inteiro teor)',
      'Documentos de cada geração intermédia (apostilados)',
    ],
    relatedArticles: [
      { slug: 'guia-definitivo-todas-as-formas-de-obter-cidadania-portuguesa-em-2026', title: 'Todas as formas de obter cidadania em 2026' },
    ],
  },

  result_trisavo_avo_vivo: {
    kind: 'result',
    type: 'yellow', icon: '⚠️', tag: 'Possível — com vínculo',
    title: 'Trisavô português, bisavô falecido, avô vivo — via de neto',
    desc: 'O bisavô já faleceu, mas o avô/avó pode pedir como neto(a) do trisavô português — prazo de 42 a 48 meses com comprovação de vínculo. A partir daí a cadeia segue como filho(a): pai/mãe (4–6 meses), você (4–6 meses). O avô/avó é o ponto crítico — precisa comprovar o vínculo com Portugal.',
    docs: [
      'Certidão de nascimento do trisavô/trisavó em Portugal',
      'Certidão de nascimento e óbito do bisavô/bisavó',
      'Documentos de vínculo efetivo com Portugal (para o processo do avô/avó)',
    ],
    relatedArticles: [
      { slug: 'checklist-completa-de-documentos-para-netos-de-portugueses', title: 'Checklist de documentos para netos' },
    ],
  },

  result_trisavo_sem_saida: {
    kind: 'result',
    type: 'red', icon: '❌', tag: 'Via não disponível pela descendência',
    title: 'Trisavô português, bisavô e avô falecidos — sem via por descendência',
    desc: 'Com bisavô e avô já falecidos, não há ascendente vivo que possa iniciar a cadeia de processos pela via de descendência. A única via disponível actualmente é a naturalização por residência legal em Portugal (7 anos para brasileiros). Recomendamos análise jurídica para confirmar se existe alguma outra possibilidade específica do seu caso.',
    docs: [],
    relatedArticles: [
      { slug: 'naturalizacao-por-residencia-em-portugal-requisitos-atualizados-2026', title: 'Naturalização por residência em Portugal' },
      { slug: 'guia-definitivo-todas-as-formas-de-obter-cidadania-portuguesa-em-2026', title: 'Todas as formas de obter cidadania em 2026' },
    ],
  },

  // ════════════════════════════════════════════════════════════
  // RESULTADOS — LINHA B (OUTROS VÍNCULOS)
  // ════════════════════════════════════════════════════════════

  result_conjuge_ok: {
    kind: 'result',
    type: 'green', icon: '💍', tag: 'Elegível',
    title: 'Casamento com português(a) — você tem direito',
    desc: 'Com 3 ou mais anos de casamento ou união de facto com cidadão(ã) português(a), você tem direito à nationalidade portuguesa. Prazo estimado: 50 a 54 meses (mais 2 a 3 meses de transcrição prévia do casamento). Pode ser feito 100% do Brasil.',
    docs: [
      'Certidão de casamento (apostilada)',
      'Certidão de nascimento do requerente (apostilada)',
      'Prova de nationalidade portuguesa do cônjuge',
      'Comprovantes da vida em comum (residência, finanças)',
      'Certidão criminal federal + estadual (apostiladas)',
    ],
    relatedArticles: [
      { slug: 'cidadania-portuguesa-para-conjuges-3-ou-6-anos-de-casamento', title: 'Cidadania por casamento: 3 ou 6 anos?' },
      { slug: 'cidadania-portuguesa-para-casais-em-uniao-de-facto-uniao-estavel', title: 'Cidadania por união de facto' },
    ],
  },

  result_conjuge_cedo: {
    kind: 'result',
    type: 'orange', icon: '⏳', tag: 'Ainda não elegível',
    title: 'Casamento — aguardar completar 3 anos',
    desc: 'A lei exige pelo menos 3 anos de casamento ou união de facto. Use o tempo para reunir documentos e criar um historial da vida em comum — cada comprovante vai fortalecer o pedido quando chegar a hora.',
    docs: [
      'Certidão de casamento ou declaração de união de facto',
      'Comprovantes progressivos de vida em comum (conta conjunta, endereço, viagens)',
    ],
    relatedArticles: [
      { slug: 'cidadania-portuguesa-para-conjuges-3-ou-6-anos-de-casamento', title: 'Cidadania por casamento: quando posso pedir?' },
    ],
  },

  result_residencia_ok: {
    kind: 'result',
    type: 'green', icon: '🏠', tag: 'Elegível',
    title: 'Naturalização — prazo cumprido!',
    desc: 'Você atingiu o prazo mínimo de residência legal em Portugal exigido pela Lei 1/2026. Prazo de análise após protocolar: 27 a 30 meses.',
    docs: [
      'Autorização de residência (histórico completo)',
      'Certidão de nascimento (apostilada)',
      'Comprovantes de residência contínua',
      'Certidão criminal (Brasil e Portugal)',
      'Prova de meios de subsistência',
    ],
    relatedArticles: [
      { slug: 'naturalizacao-por-residencia-em-portugal-requisitos-atualizados-2026', title: 'Naturalização por residência: requisitos 2026' },
      { slug: 'cidadania-portuguesa-para-cidadaos-da-cplp', title: 'Cidadania para cidadãos da CPLP' },
    ],
  },

  result_residencia_quase: {
    kind: 'result',
    type: 'yellow', icon: '⏳', tag: 'Quase lá',
    title: 'Naturalização — falta pouco para o prazo',
    desc: 'Para brasileiros e cidadãos da CPLP o prazo é de 7 anos de residência legal (Lei 1/2026). Você está perto — use o tempo para organizar toda a documentação para protocolar logo que completar o prazo.',
    docs: [
      'Continuar acumulando comprovantes de residência legal',
      'Certidão de nascimento (apostilada — preparar já)',
      'Certidão criminal',
    ],
    relatedArticles: [
      { slug: 'naturalizacao-por-residencia-em-portugal-requisitos-atualizados-2026', title: 'O que exige a Lei 1/2026 para naturalização' },
    ],
  },

  result_residencia_cedo: {
    kind: 'result',
    type: 'orange', icon: '📅', tag: 'Ainda falta tempo',
    title: 'Naturalização — ainda precisa acumular tempo',
    desc: 'Para brasileiros o prazo mínimo é 7 anos de residência legal em Portugal. Verifique se tem também ascendência portuguesa — pode haver uma via por descendência muito mais rápida disponível para o seu caso.',
    docs: [],
    relatedArticles: [
      { slug: 'guia-definitivo-todas-as-formas-de-obter-cidadania-portuguesa-em-2026', title: 'Explore todas as formas de obter cidadania' },
    ],
  },

  result_nenhum: {
    kind: 'result',
    type: 'red', icon: '🔎', tag: 'Vínculo não identificado',
    title: 'Não encontramos um caminho direto — mas vale investigar',
    desc: 'Às vezes as famílias têm origens portuguesas que não estão documentadas ou foram esquecidas ao longo das gerações. Antes de concluir que não há caminho, vale fazer uma pesquisa genealógica básica — especialmente se há algum sobrenome de origem portuguesa na família.',
    docs: [],
    relatedArticles: [
      { slug: 'guia-definitivo-todas-as-formas-de-obter-cidadania-portuguesa-em-2026', title: 'Todas as formas de obter cidadania portuguesa em 2026' },
      { slug: 'cidadania-portuguesa-para-descendentes-de-emigrantes', title: 'Como pesquisar origens portuguesas na família' },
    ],
  },
};

// ── Componente principal ────────────────────────────────────────
export default function Quiz() {
  const { trackEvent } = useAnalytics();
  const [history, setHistory] = useState<string[]>(['q1']);
  const [showLead, setShowLead] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', email: '', whatsapp: '' });
  const [sent, setSent] = useState(false);

  const currentKey = history[history.length - 1];
  const currentNode = NODES[currentKey];

  function goTo(key: string) {
    trackEvent('quiz_step', { from: currentKey, to: key });
    setHistory(prev => [...prev, key]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function restart() {
    setHistory(['q1']);
    setShowLead(false);
    setSent(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleLead(e: React.FormEvent) {
    e.preventDefault();
    trackEvent('quiz_lead', { result: currentKey });
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'quiz-lead', ...leadData }).toString(),
      });
    } catch (_) {}
    setSent(true);
  }

  const totalSteps = 5;
  const progress = Math.min(Math.round(((history.length - 1) / totalSteps) * 100), 95);
  const isResult = currentNode?.kind === 'result';

  const colorMap = {
    green:  'border-emerald-500 bg-emerald-50 text-emerald-800',
    yellow: 'border-amber-400 bg-amber-50 text-amber-800',
    orange: 'border-orange-400 bg-orange-50 text-orange-800',
    red:    'border-red-400 bg-red-50 text-red-800',
  };

  return (
    <>
      <Helmet>
        <title>Quiz Cidadania Portuguesa — Descubra se Você Tem Direito | ViannaLegal</title>
        <meta name="description" content="Responda algumas perguntas e descubra em minutos se você tem direito à cidadania portuguesa e qual é o caminho mais adequado para o seu perfil." />
      </Helmet>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12">
        <div className="container-width max-w-2xl mx-auto px-4">

          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              Quiz gratuito
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Você tem direito à cidadania portuguesa?
            </h1>
            <p className="text-muted-foreground text-sm">
              Responda algumas perguntas e descubra qual é o caminho para o seu caso.
            </p>
          </div>

          {/* Barra de progresso */}
          {!isResult && (
            <div className="mb-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progresso</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <motion.div
                  className="bg-primary h-1.5 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentKey}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >

              {/* ── PERGUNTA ─────────────────────────────────── */}
              {currentNode?.kind === 'question' && (
                <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 md:p-8">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">
                    {currentNode.category}
                  </p>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-snug">
                    {currentNode.text}
                  </h2>
                  {currentNode.hint && (
                    <p className="text-sm text-muted-foreground mb-6 flex gap-2 items-start">
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary/60" />
                      {currentNode.hint}
                    </p>
                  )}
                  <div className="flex flex-col gap-3">
                    {currentNode.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(opt.next)}
                        className="flex items-center gap-4 w-full text-left p-4 rounded-xl border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                      >
                        <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {opt.label}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── TELA DE COMPARAÇÃO ───────────────────────── */}
              {currentNode?.kind === 'comparison' && (
                <div className="space-y-4">
                  <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 md:p-8">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">
                      {currentNode.category}
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-snug">
                      {currentNode.text}
                    </h2>
                    {currentNode.subtitle && (
                      <p className="text-sm text-muted-foreground flex gap-2 items-start">
                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary/60" />
                        {currentNode.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-4">
                    {currentNode.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(opt.next)}
                        className="text-left w-full bg-card rounded-2xl border-2 border-border/50 hover:border-primary/60 hover:shadow-md transition-all p-6 group"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-2xl">{opt.icon}</span>
                          <div>
                            <p className="font-bold text-foreground group-hover:text-primary transition-colors">
                              {opt.label}
                            </p>
                            <span className="text-xs font-semibold text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
                              {opt.tag}
                            </span>
                          </div>
                          <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-semibold text-emerald-700 mb-2 flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5" /> Vantagens
                            </p>
                            <ul className="space-y-1.5">
                              {opt.pros.map((p, j) => (
                                <li key={j} className="text-muted-foreground flex gap-1.5 items-start">
                                  <span className="text-emerald-500 flex-shrink-0">+</span>
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold text-amber-700 mb-2 flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5" /> Desvantagens
                            </p>
                            <ul className="space-y-1.5">
                              {opt.cons.map((c, j) => (
                                <li key={j} className="text-muted-foreground flex gap-1.5 items-start">
                                  <span className="text-amber-500 flex-shrink-0">−</span>
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── RESULTADO ────────────────────────────────── */}
              {currentNode?.kind === 'result' && (() => {
                const r = currentNode;
                return (
                  <div className="space-y-4">
                    {/* Card principal */}
                    <div className={`rounded-2xl border-2 p-6 md:p-8 ${colorMap[r.type]}`}>
                      <div className="flex items-start gap-4 mb-4">
                        <span className="text-4xl">{r.icon}</span>
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                            {r.tag}
                          </span>
                          <h2 className="text-xl md:text-2xl font-bold mt-1 leading-snug">
                            {r.title}
                          </h2>
                        </div>
                      </div>
                      <p className="leading-relaxed opacity-90">{r.desc}</p>
                    </div>

                    {/* Documentos */}
                    {r.docs.length > 0 && (
                      <div className="bg-card rounded-2xl border border-border/50 p-6">
                        <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                          📋 Documentos típicos para este perfil
                        </p>
                        <ul className="space-y-2">
                          {r.docs.map((doc, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Artigos relacionados */}
                    {r.relatedArticles && r.relatedArticles.length > 0 && (
                      <div className="bg-card rounded-2xl border border-border/50 p-6">
                        <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
                          📖 Artigos relacionados ao seu perfil
                        </p>
                        <div className="flex flex-col gap-3">
                          {r.relatedArticles.map(a => (
                            <Link
                              key={a.slug}
                              to={`/blog/${a.slug}`}
                              className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted border border-border/50 hover:border-primary/40 transition-all group"
                            >
                              <span className="text-base flex-shrink-0">📄</span>
                              <span className="text-sm font-medium text-foreground group-hover:text-primary leading-snug flex-1">
                                {a.title}
                              </span>
                              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0 transition-colors" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Lead capture */}
                    <div className="bg-primary rounded-2xl p-6 md:p-8 text-primary-foreground">
                      {!sent ? (
                        <>
                          <h3 className="text-lg font-bold mb-1">
                            Quer uma análise gratuita do seu caso?
                          </h3>
                          <p className="text-primary-foreground/80 text-sm mb-5">
                            A Kathia Vianna analisa pessoalmente o seu perfil e responde em até 24 horas.
                          </p>
                          {!showLead ? (
                            <Button
                              onClick={() => setShowLead(true)}
                              className="w-full bg-white text-primary hover:bg-white/90 font-bold"
                            >
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Quero análise gratuita
                            </Button>
                          ) : (
                            <form onSubmit={handleLead} name="quiz-lead" data-netlify="true" className="space-y-3">
                              <input type="hidden" name="form-name" value="quiz-lead" />
                              <input type="hidden" name="resultado" value={currentKey} />
                              <input
                                type="text" name="name" placeholder="Seu nome" required
                                value={leadData.name}
                                onChange={e => setLeadData(p => ({ ...p, name: e.target.value }))}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 text-sm"
                              />
                              <input
                                type="email" name="email" placeholder="Seu e-mail" required
                                value={leadData.email}
                                onChange={e => setLeadData(p => ({ ...p, email: e.target.value }))}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 text-sm"
                              />
                              <input
                                type="tel" name="whatsapp" placeholder="WhatsApp (opcional)"
                                value={leadData.whatsapp}
                                onChange={e => setLeadData(p => ({ ...p, whatsapp: e.target.value }))}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 text-sm"
                              />
                              <Button type="submit" className="w-full bg-white text-primary hover:bg-white/90 font-bold">
                                <Send className="w-4 h-4 mr-2" />
                                Enviar e receber análise
                              </Button>
                            </form>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-2">
                          <CheckCircle className="w-10 h-10 mx-auto mb-3 text-white" />
                          <p className="font-bold text-lg mb-1">Recebemos o seu contato!</p>
                          <p className="text-primary-foreground/80 text-sm">
                            A Kathia vai analisar o seu caso e entrar em contato em até 24 horas.
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="text-xs text-muted-foreground text-center px-4">
                      ⚠️ Este resultado é indicativo e não substitui análise jurídica. Cada caso tem especificidades que podem alterar o diagnóstico.
                    </p>
                  </div>
                );
              })()}

            </motion.div>
          </AnimatePresence>

          {/* Navegação */}
          <div className="flex justify-between mt-6">
            <Button
              variant="ghost"
              onClick={goBack}
              disabled={history.length <= 1}
              className="text-muted-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            {isResult && (
              <Button variant="outline" onClick={restart}>
                Refazer o quiz
              </Button>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
