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
type NodeType = 'question' | 'comparison' | 'result';

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

// ── Fluxo do Quiz ──────────────────────────────────────────────
const NODES: Record<string, Node> = {

  // ════════════════════════════════════════════════════════════
  // PERGUNTA 1 — Entrada principal (linguagem coloquial)
  // ════════════════════════════════════════════════════════════
  q1: {
    kind: 'question',
    category: 'Ponto de partida',
    text: 'Qual é o parente português mais próximo que você tem na família?',
    hint: 'Escolha o vínculo mais direto — quanto mais próximo, mais simples tende a ser o processo.',
    options: [
      { icon: '👨‍👩‍👧', label: 'Pai ou Mãe',           next: 'q_filho_idade' },
      { icon: '👴👵', label: 'Avô ou Avó',            next: 'q_neto_pai_vivo' },
      { icon: '🧓',   label: 'Bisavô ou Bisavó',      next: 'q_bisneto_brasil' },
      { icon: '👴',   label: 'Trisavô ou mais antigo', next: 'result_trisavo' },
      { icon: '💍',   label: 'Cônjuge português(a)',   next: 'q_conjuge_tempo' },
      { icon: '🏡',   label: 'Resido em Portugal',     next: 'q_residencia_anos' },
      { icon: '❓',   label: 'Não tenho certeza',      next: 'result_nenhum' },
    ],
  },

  // ════════════════════════════════════════════════════════════
  // FILHOS
  // ════════════════════════════════════════════════════════════
  q_filho_idade: {
    kind: 'question',
    category: 'Filho(a) de português(a)',
    text: 'Você tem menos de 18 anos?',
    hint: 'Para menores de idade o processo é muito mais rápido — leva apenas 3 a 5 meses.',
    options: [
      { icon: '🧒', label: 'Sim, sou menor de 18 anos', next: 'result_filho_menor' },
      { icon: '🧑', label: 'Não, já sou maior de idade', next: 'result_filho_maior' },
    ],
  },

  // ════════════════════════════════════════════════════════════
  // NETOS — novo fluxo com tela de comparação
  // ════════════════════════════════════════════════════════════
  q_neto_pai_vivo: {
    kind: 'question',
    category: 'Neto(a) de português(a)',
    text: 'Seu pai ou sua mãe — o(a) filho(a) direto(a) do avô ou avó português(a) — ainda está vivo(a)?',
    hint: 'Essa resposta define se você tem uma opção estratégica importante disponível.',
    options: [
      { icon: '😊', label: 'Sim, está vivo(a)',                         next: 'q_neto_opcoes' },
      { icon: '🕊️', label: 'Não, já faleceu',                          next: 'q_neto_avo_vivo' },
      { icon: '🤷', label: 'Tenho pai e mãe — um deles é o descendente', next: 'q_neto_opcoes' },
    ],
  },

  // Tela de comparação — coração do novo fluxo
  q_neto_opcoes: {
    kind: 'comparison',
    category: 'Neto(a) de português(a)',
    text: 'Você tem duas opções. Qual se encaixa melhor na sua situação?',
    subtitle: 'Ambas são válidas — a diferença está no tempo total, custo e segurança jurídica.',
    options: [
      {
        icon: '🛡️',
        label: 'Opção 1 — Recomendada',
        tag: 'Mais segura e mais inteligente',
        pros: [
          '⏱️ Prazo total: ~46 a 54 meses no total (tempo semelhante à Opção 2!)',
          '1.º processo: pai/mãe pede como neto(a) → 42–48 meses',
          '2.º processo: você pede como filho(a) → apenas 4–6 meses depois',
          'Nenhum dos dois precisa comprovar vínculo com Portugal',
          'Segundo passaporte (o seu) sai muito mais rápido',
        ],
        cons: [
          'Custo maior no total (dois processos)',
          'Precisa esperar o processo do pai/mãe concluir',
        ],
        next: 'result_neto_via_pai',
      },
      {
        icon: '⚡',
        label: 'Opção 2 — Direta',
        tag: 'Um processo só',
        pros: [
          '⏱️ Prazo total: ~42 a 48 meses (1 processo direto)',
          'Um único processo — começa imediatamente',
          'Custo menor no total',
        ],
        cons: [
          'Precisa comprovar vínculo com Portugal (viagens, cultura, idioma)',
          'Ligeiramente mais arriscado se a documentação for fraca',
        ],
        next: 'q_neto_avo_vivo',
      },
    ],
  },

  q_neto_avo_vivo: {
    kind: 'question',
    category: 'Neto(a) de português(a)',
    text: 'O avô ou a avó português(a) ainda está vivo(a)?',
    hint: 'Isso determina quais documentos são necessários para provar a descendência.',
    options: [
      { icon: '😊', label: 'Sim, está vivo(a)',    next: 'q_neto_doc_avo' },
      { icon: '🕊️', label: 'Não, já faleceu',     next: 'q_neto_obito' },
      { icon: '🤷', label: 'Não tenho certeza',   next: 'q_neto_doc_avo' },
    ],
  },

  q_neto_obito: {
    kind: 'question',
    category: 'Neto(a) de português(a)',
    text: 'Você consegue obter a certidão de óbito do avô ou avó?',
    hint: 'Quando o avô/avó já faleceu, essa certidão é obrigatória para fechar a cadeia de descendência.',
    options: [
      { icon: '✅', label: 'Sim, tenho ou consigo obter',   next: 'q_neto_doc_avo' },
      { icon: '⚠️', label: 'Não sei onde obter',           next: 'q_neto_municipio' },
    ],
  },

  q_neto_municipio: {
    kind: 'question',
    category: 'Neto(a) de português(a)',
    text: 'Você sabe em qual região ou cidade de Portugal o avô/avó nasceu?',
    hint: 'Com essa informação, é possível pesquisar nos arquivos paroquiais e conservatórias portuguesas.',
    options: [
      { icon: '📍', label: 'Sim, sei a cidade ou região', next: 'q_neto_doc_avo' },
      { icon: '❌', label: 'Não tenho essa informação',   next: 'result_neto_pesquisa' },
    ],
  },

  q_neto_doc_avo: {
    kind: 'question',
    category: 'Neto(a) de português(a)',
    text: 'Você tem acesso à certidão de nascimento do avô ou avó emitida em Portugal?',
    hint: 'Esse é o documento central do processo — sem ele não é possível comprovar a ascendência portuguesa.',
    options: [
      { icon: '✅', label: 'Sim, tenho ou sei como obter', next: 'result_neto_forte' },
      { icon: '⚠️', label: 'Não tenho, mas posso pesquisar', next: 'result_neto_fraco' },
      { icon: '❌', label: 'Não tenho e não sei por onde começar', next: 'result_neto_pesquisa' },
    ],
  },

  // ════════════════════════════════════════════════════════════
  // BISNETOS
  // ════════════════════════════════════════════════════════════
  q_bisneto_brasil: {
    kind: 'question',
    category: 'Bisneto(a) de português(a)',
    text: 'Você mora no Brasil ou em Portugal?',
    hint: 'A via para bisnetos criada pela Lei 1/2026 só está disponível para quem já reside em Portugal.',
    options: [
      { icon: '🇧🇷', label: 'Moro no Brasil',     next: 'result_bisneto_brasil' },
      { icon: '🇵🇹', label: 'Moro em Portugal',   next: 'q_bisneto_anos' },
      { icon: '✈️',   label: 'Estou a mudar',      next: 'result_bisneto_mudando' },
    ],
  },

  q_bisneto_anos: {
    kind: 'question',
    category: 'Bisneto(a) de português(a)',
    text: 'Há quantos anos você mora legalmente em Portugal?',
    hint: 'A Lei Orgânica 1/2026 exige pelo menos 5 anos de residência legal contínua para bisnetos.',
    options: [
      { icon: '✅', label: '5 anos ou mais',    next: 'result_bisneto_ok' },
      { icon: '⏳', label: 'Entre 2 e 4 anos', next: 'result_bisneto_aguardar' },
      { icon: '📅', label: 'Menos de 2 anos',  next: 'result_bisneto_cedo' },
    ],
  },

  // ════════════════════════════════════════════════════════════
  // CÔNJUGE
  // ════════════════════════════════════════════════════════════
  q_conjuge_tempo: {
    kind: 'question',
    category: 'Casamento com português(a)',
    text: 'Há quanto tempo dura este casamento ou união de facto?',
    hint: 'A lei exige pelo menos 3 anos de relacionamento comprovado com cidadão(ã) português(a).',
    options: [
      { icon: '📅', label: 'Menos de 3 anos', next: 'result_conjuge_cedo' },
      { icon: '✅', label: '3 anos ou mais',  next: 'result_conjuge_ok' },
    ],
  },

  // ════════════════════════════════════════════════════════════
  // RESIDÊNCIA
  // ════════════════════════════════════════════════════════════
  q_residencia_anos: {
    kind: 'question',
    category: 'Naturalização por residência',
    text: 'Há quantos anos você reside legalmente em Portugal?',
    hint: 'A Lei 1/2026 aumentou o prazo para brasileiros e cidadãos da CPLP para 7 anos.',
    options: [
      { icon: '📅', label: 'Menos de 5 anos',                  next: 'result_residencia_cedo' },
      { icon: '⏳', label: 'Entre 5 e 6 anos',                 next: 'result_residencia_quase' },
      { icon: '✅', label: '7 anos ou mais (brasileiro/CPLP)',  next: 'result_residencia_ok' },
      { icon: '✅', label: '5 anos ou mais (outros países)',    next: 'result_residencia_ok5' },
    ],
  },

  // ════════════════════════════════════════════════════════════
  // RESULTADOS
  // ════════════════════════════════════════════════════════════

  result_filho_menor: {
    kind: 'result',
    type: 'green', icon: '🌟', tag: 'Caminho mais rápido!',
    title: 'Ótima notícia — você tem direito como filho(a) de português(a)',
    desc: 'Como filho(a) menor de cidadão(ã) português(a), você tem o processo mais simples e mais rápido de todos. Leva entre 2 e 4 meses e pode ser feito 100% do Brasil.',
    docs: ['Certidão de nascimento do filho (apostilada)', 'Certidão de nascimento do pai/mãe português(a)', 'Prova de nationalidade portuguesa do pai/mãe', 'Certidão de casamento dos pais (se aplicável)'],
    relatedArticles: [
      { slug: 'cidadania-portuguesa-para-menores-de-idade-o-que-os-pais-precisam-saber', title: 'O que os pais precisam saber sobre cidadania para menores' },
      { slug: 'filho-vs-neto-diferencas-no-processo-de-cidadania-portuguesa', title: 'Filho vs. neto: quais são as diferenças?' },
    ],
  },

  result_filho_maior: {
    kind: 'result',
    type: 'green', icon: '✅', tag: 'Alta probabilidade',
    title: 'Você tem direito como filho(a) de português(a)',
    desc: 'Como filho(a) maior de cidadão(ã) português(a), você tem direito direto à nationalidade portuguesa. O processo leva entre 50 e 56 meses e pode ser conduzido 100% do Brasil, por procuração.',
    docs: ['Certidão de nascimento do requerente (apostilada)', 'Certidão de nascimento do pai/mãe português(a)', 'Prova de nationalidade portuguesa do pai/mãe', 'Certidão de casamento dos pais ou reconhecimento de paternidade', 'Certidão criminal (federal + estadual, apostiladas)'],
    relatedArticles: [
      { slug: 'filho-vs-neto-diferencas-no-processo-de-cidadania-portuguesa', title: 'Filho vs. neto: quais são as diferenças?' },
      { slug: 'cidadania-portuguesa-para-quem-tem-pai-falecido', title: 'E se o pai já faleceu? Ainda tenho direito?' },
      { slug: 'tempo-medio-de-aprovacao-por-tipo-de-processo-em-2026', title: 'Quanto tempo leva na prática (2026)' },
    ],
  },

  result_neto_via_pai: {
    kind: 'result',
    type: 'green', icon: '🛡️', tag: 'Estratégia recomendada',
    title: 'Caminho em duas etapas — mais seguro e mais sólido',
    desc: 'Primeiro seu pai ou mãe pede a nationalidade como neto(a) do avô português. Depois você pede como filho(a) de português — que é o processo mais simples e mais rápido. No total demora um pouco mais, mas o resultado é juridicamente mais robusto e o segundo passaporte (o seu) sai com muito mais facilidade.',
    docs: ['Certidão de nascimento do avô/avó em Portugal', 'Certidão de nascimento do pai/mãe (apostilada)', 'Certidão de nascimento do requerente (apostilada)', 'Documentos de vínculo efetivo com Portugal (para o processo do pai/mãe)'],
    relatedArticles: [
      { slug: 'filho-vs-neto-diferencas-no-processo-de-cidadania-portuguesa', title: 'Filho vs. neto: diferenças no processo' },
      { slug: 'checklist-completa-de-documentos-para-netos-de-portugueses', title: 'Checklist completa de documentos para netos' },
      { slug: 'tempo-medio-de-aprovacao-por-tipo-de-processo-em-2026', title: 'Quanto tempo leva na prática (2026)' },
    ],
  },

  result_neto_forte: {
    kind: 'result',
    type: 'green', icon: '🇵🇹', tag: 'Boa probabilidade',
    title: 'Você tem perfil para pedir como neto(a) — diretamente',
    desc: 'Com a certidão de nascimento do avô ou avó em mãos, seu processo como neto(a) tem base documental sólida. O IRN vai analisar o vínculo com Portugal (viagens, conhecimento da língua, ligações à comunidade portuguesa). Prazo estimado: 42 a 48 meses.',
    docs: ['Certidão de nascimento do avô/avó em Portugal (em inteiro teor)', 'Certidão de casamento do avô/avó', 'Certidão de óbito do avô/avó (se falecido)', 'Certidão de nascimento do pai/mãe (apostilada)', 'Certidão de nascimento do requerente (apostilada)', 'Documentos de vínculo efetivo com Portugal', 'Certidão criminal (federal + estadual, apostiladas)'],
    relatedArticles: [
      { slug: 'checklist-completa-de-documentos-para-netos-de-portugueses', title: 'Checklist completa de documentos para netos' },
      { slug: 'como-acompanhar-o-andamento-do-processo-de-cidadania-portuguesa', title: 'Como acompanhar o processo passo a passo' },
      { slug: 'tempo-medio-de-aprovacao-por-tipo-de-processo-em-2026', title: 'Prazos reais de aprovação em 2026' },
    ],
  },

  result_neto_fraco: {
    kind: 'result',
    type: 'yellow', icon: '⚠️', tag: 'Análise necessária',
    title: 'Tem potencial — mas precisa de análise antes de avançar',
    desc: 'Sem a certidão de nascimento do avô ou avó em mãos, é preciso localizar esse documento nos arquivos portugueses antes de dar entrada no processo. Não é impossível — a grande maioria dos registros existe em Portugal — mas é um passo adicional que requer pesquisa especializada.',
    docs: ['Pesquisa nos arquivos distritais portugueses (pela assessoria)', 'Certidão de nascimento do avô/avó (a ser localizada)', 'Certidão de nascimento do pai/mãe (apostilada)', 'Certidão de nascimento do requerente (apostilada)'],
    relatedArticles: [
      { slug: 'cidadania-portuguesa-para-quem-tem-documentos-perdidos', title: 'E se não tenho documentos do avô? Como resolver' },
      { slug: 'erros-comuns-na-arvore-genealogica-para-cidadania-portuguesa', title: 'Erros comuns na árvore genealógica' },
    ],
  },

  result_neto_pesquisa: {
    kind: 'result',
    type: 'yellow', icon: '🔍', tag: 'Pesquisa necessária',
    title: 'Antes de desistir — vale fazer uma pesquisa genealógica',
    desc: 'Não saber a origem do avô não fecha o processo. Com o nome completo do avô e uma data aproximada, profissionais especializados conseguem rastrear os documentos nos arquivos portugueses. A maioria dos imigrantes portugueses tem registros preservados — o trabalho é encontrá-los.',
    docs: ['Nome completo do avô/avó', 'Qualquer documento brasileiro que o mencione (certidão de casamento, óbito, RG antigo)', 'Período e local aproximado de chegada ao Brasil'],
    relatedArticles: [
      { slug: 'cidadania-portuguesa-para-quem-tem-documentos-perdidos', title: 'Como encontrar documentos do avô quando a família não tem nada' },
      { slug: 'cidadania-portuguesa-para-descendentes-de-emigrantes', title: 'Descendentes de emigrantes: onde estão os documentos' },
    ],
  },

  result_bisneto_brasil: {
    kind: 'result',
    type: 'orange', icon: '✈️', tag: 'Via não disponível do Brasil',
    title: 'Bisneto(a) morando no Brasil — essa via específica não se aplica',
    desc: 'A Lei Orgânica 1/2026 criou uma via para bisnetos, mas ela exige que você resida legalmente em Portugal há pelo menos 5 anos. Do Brasil, essa porta não está aberta ainda. Se você está pensando em se mudar para Portugal, pode planear essa estratégia a médio prazo.',
    docs: [],
    relatedArticles: [
      { slug: 'atualizacoes-da-lei-da-nacionalidade-portuguesa-em-2026', title: 'O que mudou com a Lei Orgânica 1/2026' },
      { slug: 'cidadania-portuguesa-para-quem-mora-em-portugal', title: 'Cidadania para quem já mora em Portugal' },
    ],
  },

  result_bisneto_mudando: {
    kind: 'result',
    type: 'yellow', icon: '🗓️', tag: 'Planear para o futuro',
    title: 'Bisneto(a) a planear a mudança para Portugal',
    desc: 'Ótima notícia para o futuro: quando completar 5 anos de residência legal em Portugal, a via para bisnetos estará disponível. Enquanto isso, comece a organizar a árvore genealógica e os documentos do bisavô — são processos demorados que vale a pena iniciar já.',
    docs: ['Certidão de nascimento do bisavô/bisavó em Portugal', 'Certidão de nascimento do avô/avó', 'Certidão de nascimento do pai/mãe (apostilada)', 'Certidão de nascimento do requerente (apostilada)'],
    relatedArticles: [
      { slug: 'atualizacoes-da-lei-da-nacionalidade-portuguesa-em-2026', title: 'O que mudou com a Lei Orgânica 1/2026 para bisnetos' },
    ],
  },

  result_bisneto_ok: {
    kind: 'result',
    type: 'green', icon: '🆕', tag: 'Via disponível — Lei 1/2026',
    title: 'Bisneto(a) com residência suficiente — nova porta aberta!',
    desc: 'Você cumpre o requisito de 5 anos de residência legal em Portugal. A Lei Orgânica 1/2026 criou esta via especificamente para bisnetos — inédito na legislação portuguesa. O prazo estimado de análise é de 28 a 36 meses.',
    docs: ['Certidão de nascimento do requerente (apostilada)', 'Certidão de nascimento do pai/mãe e avô/avó', 'Certidão de nascimento do bisavô/bisavó português(a)', 'Prova de residência legal em Portugal (5+ anos)', 'Autorização de residência válida', 'Certidão criminal'],
    relatedArticles: [
      { slug: 'atualizacoes-da-lei-da-nacionalidade-portuguesa-em-2026', title: 'O que mudou com a Lei Orgânica 1/2026' },
      { slug: 'guia-definitivo-todas-as-formas-de-obter-cidadania-portuguesa-em-2026', title: 'Todas as formas de obter cidadania em 2026' },
    ],
  },

  result_bisneto_aguardar: {
    kind: 'result',
    type: 'yellow', icon: '⏳', tag: 'Quase lá',
    title: 'Bisneto(a) — falta pouco para completar o prazo',
    desc: 'Você ainda não completou os 5 anos exigidos, mas está no caminho certo. Use o tempo para organizar toda a documentação genealógica — quando completar o prazo, o processo começa mais rapidamente.',
    docs: ['Certidão de nascimento do bisavô/bisavó em Portugal (começar a pesquisar já)', 'Certidão de nascimento do avô/avó', 'Comprovantes de residência legal acumulados'],
    relatedArticles: [
      { slug: 'atualizacoes-da-lei-da-nacionalidade-portuguesa-em-2026', title: 'Requisitos da Lei 1/2026 para bisnetos' },
    ],
  },

  result_bisneto_cedo: {
    kind: 'result',
    type: 'orange', icon: '📅', tag: 'Ainda falta tempo',
    title: 'Bisneto(a) — comece a preparar a documentação agora',
    desc: 'Você ainda está no início da contagem de tempo de residência. Mas há muito que pode fazer já: pesquisar e obter os documentos do bisavô português leva meses — e é mais fácil fazer agora do que na correria quando o prazo se completar.',
    docs: ['Certidão de nascimento do bisavô/bisavó em Portugal (pesquisar nos arquivos portugueses)'],
    relatedArticles: [
      { slug: 'cidadania-portuguesa-para-descendentes-de-emigrantes', title: 'Onde estão os documentos dos seus antepassados' },
    ],
  },

  result_trisavo: {
    kind: 'result',
    type: 'red', icon: '❌', tag: 'Via não disponível',
    title: 'Trisavô português — essa via não existe na lei actual',
    desc: 'A legislação portuguesa actual prevê vias para filhos, netos e, desde a Lei 1/2026, bisnetos com residência em Portugal. Trisavôs e gerações anteriores não estão incluídos. Se tiver algum parente mais próximo com ligação a Portugal, vale investigar antes de concluir que não há caminho.',
    docs: [],
    relatedArticles: [
      { slug: 'guia-definitivo-todas-as-formas-de-obter-cidadania-portuguesa-em-2026', title: 'Todas as formas de obter cidadania portuguesa em 2026' },
    ],
  },

  result_conjuge_ok: {
    kind: 'result',
    type: 'green', icon: '💍', tag: 'Elegível',
    title: 'Casamento com português(a) — você tem direito',
    desc: 'Com 3 ou mais anos de casamento ou união de facto com cidadão(ã) português(a), você tem direito à nationalidade portuguesa. O prazo de análise é de 50 a 54 meses (mais 2 a 3 meses para a transcrição do casamento). Pode ser feito 100% do Brasil.',
    docs: ['Certidão de casamento (apostilada)', 'Certidão de nascimento do requerente (apostilada)', 'Prova de nationalidade portuguesa do cônjuge', 'Comprovantes da vida em comum (residência, finanças)', 'Certidão criminal'],
    relatedArticles: [
      { slug: 'cidadania-portuguesa-para-conjuges-3-ou-6-anos-de-casamento', title: 'Cidadania por casamento: 3 ou 6 anos?' },
      { slug: 'cidadania-portuguesa-para-casais-em-uniao-de-facto-uniao-estavel', title: 'Cidadania por união de facto' },
    ],
  },

  result_conjuge_cedo: {
    kind: 'result',
    type: 'orange', icon: '⏳', tag: 'Ainda não elegível',
    title: 'Casamento — aguardar completar 3 anos',
    desc: 'A lei exige pelo menos 3 anos de casamento ou união de facto comprovada. Use o tempo para reunir documentos e criar um histórico documental da vida em comum — cada comprovante vai fortalecer o pedido quando chegar a hora.',
    docs: ['Certidão de casamento ou declaração de união de facto', 'Comprovantes progressivos de vida em comum (conta conjunta, endereço, viagens)'],
    relatedArticles: [
      { slug: 'cidadania-portuguesa-para-conjuges-3-ou-6-anos-de-casamento', title: 'Cidadania por casamento: quando posso pedir?' },
    ],
  },

  result_residencia_ok: {
    kind: 'result',
    type: 'green', icon: '🏠', tag: 'Elegível — brasileiro/CPLP',
    title: 'Naturalização — você já cumpriu o prazo!',
    desc: 'Com 7 ou mais anos de residência legal em Portugal, você atingiu o prazo exigido pela Lei 1/2026 para brasileiros e cidadãos da CPLP. O prazo de análise depois de protocolar é de 27 a 30 meses.',
    docs: ['Autorização de residência (histórico de 7 anos)', 'Certidão de nascimento apostilada', 'Comprovantes de residência contínua', 'Certificado de registo criminal (Brasil e Portugal)', 'Prova de meios de subsistência'],
    relatedArticles: [
      { slug: 'naturalizacao-por-residencia-em-portugal-requisitos-atualizados-2026', title: 'Naturalização por residência: requisitos 2026' },
      { slug: 'cidadania-portuguesa-para-cidadaos-da-cplp', title: 'Cidadania para cidadãos da CPLP' },
    ],
  },

  result_residencia_ok5: {
    kind: 'result',
    type: 'green', icon: '🏠', tag: 'Elegível — outros países',
    title: 'Naturalização — prazo de 5 anos cumprido',
    desc: 'Para nationalidades fora da CPLP e da UE, o prazo é de 10 anos desde a Lei 1/2026. Se tem entre 5 e 9 anos de residência, pode ainda não ter atingido o prazo. Confirme com um especialista a contagem exacta no seu caso.',
    docs: ['Autorização de residência (histórico completo)', 'Certidão de nascimento apostilada', 'Comprovantes de residência contínua', 'Certificado de registo criminal'],
    relatedArticles: [
      { slug: 'naturalizacao-por-residencia-em-portugal-requisitos-atualizados-2026', title: 'Naturalização por residência: requisitos actualizados 2026' },
    ],
  },

  result_residencia_quase: {
    kind: 'result',
    type: 'yellow', icon: '⏳', tag: 'Quase lá',
    title: 'Naturalização — falta pouco para o prazo de brasileiros',
    desc: 'Para brasileiros e cidadãos da CPLP o prazo é de 7 anos (Lei 1/2026). Se você tem entre 5 e 6 anos de residência legal, falta pouco. Use o tempo para organizar toda a documentação — quando completar o prazo, dá para protocolar logo.',
    docs: ['Continuar acumulando comprovantes de residência legal', 'Certidão de nascimento apostilada (preparar já)', 'Certificado de registo criminal'],
    relatedArticles: [
      { slug: 'naturalizacao-por-residencia-em-portugal-requisitos-atualizados-2026', title: 'Naturalização por residência: o que exige a Lei 1/2026' },
    ],
  },

  result_residencia_cedo: {
    kind: 'result',
    type: 'orange', icon: '📅', tag: 'Ainda falta tempo',
    title: 'Naturalização — ainda precisa acumular tempo',
    desc: 'Para brasileiros o prazo mínimo é 7 anos de residência legal em Portugal. Verifique se também tem parentesco com portugueses — pode haver uma via mais rápida disponível para o seu caso específico.',
    docs: ['Continuar acumulando comprovantes de residência legal'],
    relatedArticles: [
      { slug: 'guia-definitivo-todas-as-formas-de-obter-cidadania-portuguesa-em-2026', title: 'Explore todas as formas de obter cidadania' },
    ],
  },

  result_nenhum: {
    kind: 'result',
    type: 'red', icon: '🔎', tag: 'Vínculo não identificado',
    title: 'Não encontramos um caminho direto — mas vale investigar mais',
    desc: 'Às vezes as famílias têm origens portuguesas que não estão documentadas ou que foram esquecidas ao longo das gerações. Antes de concluir que não há caminho, vale fazer uma pesquisa genealógica básica — especialmente se há algum sobrenome de origem portuguesa na família.',
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

  const progress = Math.min(Math.round(((history.length - 1) / 6) * 100), 95);
  const isResult = currentNode?.kind === 'result';
  const isComparison = currentNode?.kind === 'comparison';

  const colorMap = {
    green: 'border-emerald-500 bg-emerald-50 text-emerald-800',
    yellow: 'border-amber-400 bg-amber-50 text-amber-800',
    orange: 'border-orange-400 bg-orange-50 text-orange-800',
    red: 'border-red-400 bg-red-50 text-red-800',
  };

  return (
    <>
      <Helmet>
        <title>Quiz Cidadania Portuguesa — Descubra se Você Tem Direito | ViannaLegal</title>
        <meta name="description" content="Responda 4 perguntas e descubra em minutos se você tem direito à cidadania portuguesa e qual é o caminho mais adequado para o seu perfil." />
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
                    <p className="text-sm text-muted-foreground mb-6 flex gap-2">
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
                      <p className="text-sm text-muted-foreground mb-6">{currentNode.subtitle}</p>
                    )}
                  </div>

                  <div className="grid gap-4">
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
                                <li key={j} className="text-muted-foreground flex gap-1.5">
                                  <span className="text-emerald-500 mt-0.5 flex-shrink-0">+</span>
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
                                <li key={j} className="text-muted-foreground flex gap-1.5">
                                  <span className="text-amber-500 mt-0.5 flex-shrink-0">−</span>
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
                    {/* Card principal do resultado */}
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
                                type="text"
                                name="name"
                                placeholder="Seu nome"
                                required
                                value={leadData.name}
                                onChange={e => setLeadData(p => ({ ...p, name: e.target.value }))}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 text-sm"
                              />
                              <input
                                type="email"
                                name="email"
                                placeholder="Seu e-mail"
                                required
                                value={leadData.email}
                                onChange={e => setLeadData(p => ({ ...p, email: e.target.value }))}
                                className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/50 text-sm"
                              />
                              <input
                                type="tel"
                                name="whatsapp"
                                placeholder="WhatsApp (opcional)"
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

                    {/* Disclaimer */}
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
