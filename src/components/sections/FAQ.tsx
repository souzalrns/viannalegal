import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqGroup {
  category: string;
  items: FaqItem[];
}

// NOTE: question/answer text is kept identical to the FAQPage structured data
// in src/pages/Index.tsx. If you edit an answer here, update the matching
// entry in that JSON-LD block too, or Google may flag a content mismatch.
const faqGroups: FaqGroup[] = [
  {
    category: 'Legislação e Mudanças 2026',
    items: [
      {
        question: 'O que mudou na Lei da Nacionalidade Portuguesa em 2026?',
        answer:
          'A Lei Orgânica n.º 1/2026 foi aprovada em 1/4/2026, promulgada em 3/5 e publicada em 18/5/2026 — já está em vigor. Principais mudanças confirmadas: o regime especial para descendentes de judeus sefarditas foi extinto para novos pedidos (quem já tinha processo protocolado mantém as regras antigas); o prazo de residência para naturalização subiu de 5 para 7 anos para brasileiros e demais cidadãos da CPLP; e bisnetos de portugueses passaram a ter via direta de atribuição da nacionalidade, mediante prova de vínculo efetivo — antes, dependiam de o neto naturalizar primeiro. A via de filhos e netos continua existindo, com maior rigor na análise documental.',
      },
      {
        question: 'O veto do Tribunal Constitucional de dezembro de 2025 ainda vale?',
        answer:
          'O Acórdão do TC n.º 1133/2025 (dez/2025) invalidou pontos específicos de uma versão anterior do projeto — principalmente a revogação de uma norma que protegia o cidadão contra demora da própria administração pública. Isso obrigou o Parlamento a reformular o texto, mas não impediu a aprovação da lei: a versão final (Lei Orgânica 1/2026) já está em vigor desde maio de 2026, com as mudanças de prazo de residência e fim do regime sefardita confirmadas. Quem já tinha processo formalmente pendente antes da entrada em vigor segue as regras anteriores.',
      },
    ],
  },
  {
    category: 'Elegibilidade',
    items: [
      {
        question: 'Quem tem direito à cidadania portuguesa em 2026?',
        answer:
          'A cidadania portuguesa pode ser obtida por descendência (filhos, netos e bisnetos de portugueses), naturalização (residentes legais em Portugal com 5+ anos) ou aquisição (casamento com cidadão português há mais de 3 anos). Filhos têm direito automático; netos precisam comprovar vínculo efetivo.',
      },
      {
        question: 'Neto de português tem direito à cidadania portuguesa?',
        answer:
          'Sim! Netos de cidadãos portugueses têm direito à cidadania portuguesa, desde que comprovem vínculo efetivo com a comunidade portuguesa. A comprovação inclui: conhecimento do idioma português, visitas documentadas a Portugal, participação em comunidades lusófonas ou outros laços culturais. Prazo atual: 24-42 meses (varia com backlog IRN).',
      },
      {
        question: 'Bisneto de português tem direito à cidadania?',
        answer:
          'Bisnetos podem ter direito à cidadania portuguesa, mas o processo é sequencial. É necessário primeiro que o neto (pai/mãe do bisneto) obtenha a cidadania portuguesa para então transmitir ao bisneto. Planejamento antecipado é essencial devido aos prazos envolvidos.',
      },
      {
        question: 'Filho de português nascido no Brasil tem direito automático?',
        answer:
          'Sim! Filhos de cidadãos portugueses têm direito à cidadania portuguesa independentemente do local de nascimento. Filhos menores de idade têm processo simplificado (6-8 meses); filhos maiores passam por processo regular (12-14 meses). Não é necessário comprovar vínculo efetivo.',
      },
    ],
  },
  {
    category: 'Processo e Documentos',
    items: [
      {
        question: 'Preciso morar em Portugal para obter a cidadania?',
        answer:
          'Não necessariamente. Descendentes diretos de portugueses (filhos, netos, bisnetos) podem solicitar a cidadania morando no Brasil. Apenas a naturalização por residência exige morar legalmente em Portugal — 7 anos para brasileiros e demais cidadãos da CPLP desde a Lei Orgânica 1/2026 (antes eram 5 anos). Todo o processo de descendência pode ser conduzido 100% online com nossa assessoria.',
      },
      {
        question: 'Quanto tempo demora o processo de cidadania portuguesa?',
        answer:
          'Os prazos atualizados considerando o backlog do IRN são: Filhos menores: 6-12 meses | Filhos maiores: 12-24 meses | Netos: 24-42 meses | Cônjuges: 24-48 meses | Transcrição de casamento: 1-4 meses | Naturalização por residência: consultar. Prazos são estimativas e variam conforme conservatória e complexidade.',
      },
      {
        question: 'Quais documentos são necessários para cidadania portuguesa?',
        answer:
          'Documentos básicos: certidões de nascimento, casamento e óbito dos ancestrais portugueses em inteiro teor; certidões brasileiras atualizadas com Apostila de Haia; documentos de identificação; procuração. Para netos: comprovação de vínculo efetivo. A documentação específica varia conforme o tipo de processo e linha de descendência.',
      },
      {
        question: 'O que é vínculo efetivo e como comprovar?',
        answer:
          'Vínculo efetivo é a ligação demonstrável com a comunidade portuguesa, exigida para netos. Formas de comprovação: 1) Domínio do idioma português (certificados CAPLE ou entrevista); 2) Visitas a Portugal (passaportes carimbados, reservas); 3) Participação em associações lusófonas; 4) Consumo de cultura portuguesa; 5) Laços familiares mantidos; 6) Propriedade em Portugal.',
      },
    ],
  },
  {
    category: 'Dupla Cidadania e Benefícios',
    items: [
      {
        question: 'Posso ter dupla cidadania Brasil e Portugal?',
        answer:
          'Sim! Tanto o Brasil quanto Portugal permitem dupla cidadania sem restrições. Você mantém todos os direitos como brasileiro e adquire os de cidadão português/europeu. Pode viajar com dois passaportes, trabalhar na Europa, e transmitir a cidadania para filhos.',
      },
      {
        question: 'Quais são as vantagens do passaporte português?',
        answer:
          'O passaporte português (4º mais poderoso do mundo) oferece: acesso sem visto a 190+ países incluindo EUA, Canadá e todo Espaço Schengen; livre circulação e trabalho em 27 países da União Europeia; acesso a sistemas de saúde e educação europeus de qualidade; facilidades para financiamento imobiliário; transmissão da cidadania para futuras gerações.',
      },
      {
        question: 'Posso morar e trabalhar em qualquer país da Europa?',
        answer:
          'Sim! Como cidadão português, você tem direito de residir, trabalhar, estudar e empreender em qualquer um dos 27 países da União Europeia sem necessidade de visto ou autorização de trabalho. Isso inclui Alemanha, França, Espanha, Itália, Holanda e todos os demais membros.',
      },
    ],
  },
  {
    category: 'Casamento e Cônjuges',
    items: [
      {
        question: 'Cidadania por casamento: quais os requisitos?',
        answer:
          'Cônjuges de portugueses podem solicitar a cidadania após 3 anos de casamento civil ou união estável reconhecida. Requisitos: certidão de casamento, comprovação de cidadania do cônjuge português, manutenção do vínculo matrimonial durante o processo. Prazo médio: 24-48 meses. União estável deve ser registrada em cartório.',
      },
      {
        question: 'O que é transcrição de casamento e quando é necessária?',
        answer:
          'Transcrição é o registro do casamento brasileiro nos livros civis portugueses. É necessária quando um cônjuge é português ou quando o casal pretende usar o casamento para fins legais em Portugal. O processo leva 1-4 meses e é pré-requisito para cidadania por casamento.',
      },
    ],
  },
  {
    category: 'Pesquisa e Documentos',
    items: [
      {
        question: 'O que é pesquisa genealógica e quando é necessária?',
        answer:
          'A pesquisa genealógica é uma investigação especializada para localizar registros de nascimento, casamento e óbito dos seus ancestrais portugueses. É necessária quando: não há informações concretas sobre os registros; documentos foram perdidos ou destruídos; precisamos confirmar a linha de descendência; registros são anteriores a 1911 (não digitalizados).',
      },
      {
        question: 'Como localizar certidões antigas de Portugal?',
        answer:
          'Certidões anteriores a 1911 geralmente estão em arquivos paroquiais ou distritais de Portugal, não digitalizadas. Nossa equipe possui experiência em paleografia (leitura de documentos antigos) e acesso a arquivos em todo o território português. Localizamos registros em igrejas, conservatórias e arquivos históricos.',
      },
      {
        question: 'Meus documentos brasileiros servem para o processo?',
        answer:
          'Documentos brasileiros devem ser emitidos em inteiro teor (não cópia simples) e apostilados com Apostila de Haia em cartório competente. Certidões de nascimento, casamento e óbito devem ser atualizadas (geralmente emitidas há menos de 12 meses). Documentos antigos precisam de atualização.',
      },
    ],
  },
  {
    category: 'Custos e Processo',
    items: [
      {
        question: 'Quanto custa o processo de cidadania portuguesa?',
        answer:
          'Os custos variam conforme o tipo de processo e complexidade. Incluem: taxas consulares/conservatória (valores oficiais), apostilamento de documentos, traduções juramentadas (quando necessário), e honorários de assessoria. Oferecemos análise gratuita inicial para orçamento detalhado do seu caso específico.',
      },
      {
        question: 'Vocês oferecem consultoria gratuita?',
        answer:
          'Sim! Oferecemos uma análise inicial gratuita via WhatsApp onde avaliamos: sua elegibilidade para cidadania portuguesa, documentos que você já possui, estimativa de prazo e custos, e próximos passos recomendados. Agende sua consulta gratuita pelo WhatsApp +351 913 134 260.',
      },
    ],
  },
];

export function FAQ() {
  return (
    <section id="faq" className="section-padding bg-muted/50">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
              Dúvidas Frequentes
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Principais questões sobre{' '}
              <span className="text-primary">Cidadania Portuguesa</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Encontre respostas para as perguntas mais comuns sobre o processo
              de obtenção da cidadania portuguesa. Atualizado com a Lei Orgânica 1/2026.
            </p>
            <div className="p-6 bg-card rounded-2xl border border-border shadow-subtle">
              <h3 className="font-semibold text-foreground mb-2">Sua dúvida não está aqui?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Cada caso tem particularidades. Fale com um especialista e receba uma resposta
                sobre o seu, não uma resposta genérica.
              </p>
              <Button
                variant="gold"
                size="sm"
                onClick={() =>
                  window.open(
                    'https://wa.me/351913134260?text=Olá! Tenho uma dúvida sobre cidadania portuguesa que não encontrei no site.',
                    '_blank'
                  )
                }
              >
                <MessageCircle className="w-4 h-4" />
                Falar com especialista
              </Button>
            </div>
          </motion.div>

          {/* Right Column - FAQ Accordion grouped by topic */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            {faqGroups.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-4">
                  {group.category}
                </h3>
                <Accordion type="single" collapsible className="space-y-4">
                  {group.items.map((faq, index) => (
                    <AccordionItem
                      key={`${group.category}-${index}`}
                      value={`${group.category}-${index}`}
                      className="bg-card rounded-xl border border-border shadow-subtle px-6 overflow-hidden"
                    >
                      <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5 hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
