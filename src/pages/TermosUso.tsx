import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { SITE_CONFIG, waUrl } from '@/config/site';

export default function TermosUso() {
  useScrollToHash();

  return (
    <>
      <Helmet>
        <title>Termos de Uso | ViannaLegal</title>
        <meta 
          name="description" 
          content="Termos de Uso da ViannaLegal. Condições de uso dos nossos serviços de assessoria em cidadania portuguesa." 
        />
        <link rel="canonical" href="https://viannalegal.com.br/termos-uso" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24">
          <section className="py-16">
            <div className="container-width max-w-4xl">
              <div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="font-display text-4xl font-bold text-foreground mb-8">
                  Termos de Uso
                </h1>
                
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-sm text-muted-foreground mb-8">
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                  </p>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    1. Aceitação dos Termos
                  </h2>
                  <p>
                    Ao acessar e utilizar o site da ViannaLegal ou contratar nossos serviços, 
                    você concorda com estes Termos de Uso. Se não concordar com qualquer 
                    parte destes termos, não utilize nossos serviços.
                  </p>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    2. Descrição dos Serviços
                  </h2>
                  <p>
                    A ViannaLegal oferece serviços de assessoria e consultoria jurídica 
                    especializada em cidadania portuguesa, incluindo:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Análise de elegibilidade para cidadania portuguesa</li>
                    <li>Pesquisa genealógica e busca de documentos</li>
                    <li>Orientação sobre documentação necessária</li>
                    <li>Acompanhamento do processo junto às conservatórias portuguesas</li>
                    <li>Transcrição de casamento em Portugal</li>
                  </ul>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    3. Limitações do Serviço
                  </h2>
                  <p>
                    <strong>Importante:</strong> A ViannaLegal é uma empresa de consultoria jurídica 
                    especializada. Não possuímos autoridade para julgar ou realizar processos de 
                    cidadania, tampouco possuímos qualquer vínculo com consulados, conservatórias 
                    ou órgãos governamentais portugueses ou brasileiros.
                  </p>
                  <p>
                    A decisão final sobre a concessão de cidadania portuguesa é de competência 
                    exclusiva das autoridades portuguesas.
                  </p>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    4. Responsabilidades do Cliente
                  </h2>
                  <p>O cliente se compromete a:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fornecer informações verdadeiras e completas</li>
                    <li>Providenciar documentos solicitados dentro dos prazos estabelecidos</li>
                    <li>Manter seus dados de contato atualizados</li>
                    <li>Efetuar os pagamentos conforme acordado</li>
                    <li>Não utilizar nossos serviços para fins ilícitos</li>
                  </ul>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    5. Prazos e Resultados
                  </h2>
                  <p>
                    Os prazos informados são estimativas baseadas em nossa experiência e nos 
                    tempos médios de processamento das conservatórias portuguesas. Não garantimos 
                    prazos específicos, pois estes dependem de fatores externos fora do nosso controle.
                  </p>
                  <p>
                    Da mesma forma, não podemos garantir resultados, pois a decisão final 
                    pertence às autoridades portuguesas competentes.
                  </p>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    6. Propriedade Intelectual
                  </h2>
                  <p>
                    Todo o conteúdo deste site, incluindo textos, imagens, logotipos e design, 
                    é de propriedade da ViannaLegal e está protegido por leis de direitos autorais. 
                    É proibida a reprodução sem autorização prévia por escrito.
                  </p>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    7. Política de Cancelamento
                  </h2>
                  <p>
                    As condições de cancelamento e reembolso são definidas individualmente 
                    em cada contrato de prestação de serviços. Consulte seu contrato ou 
                    entre em contato conosco para mais informações.
                  </p>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    8. Limitação de Responsabilidade
                  </h2>
                  <p>
                    A ViannaLegal não se responsabiliza por:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Decisões das autoridades portuguesas</li>
                    <li>Atrasos causados por órgãos governamentais</li>
                    <li>Informações falsas ou incompletas fornecidas pelo cliente</li>
                    <li>Alterações na legislação portuguesa durante o processo</li>
                  </ul>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    9. Lei Aplicável
                  </h2>
                  <p>
                    Estes Termos de Uso são regidos pelas leis da República Portuguesa. 
                    Qualquer disputa será resolvida nos tribunais de Lisboa, Portugal.
                  </p>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    10. Contato
                  </h2>
                  <p>
                    Para dúvidas sobre estes termos, entre em contato pelo WhatsApp: ` ${SITE_CONFIG.whatsapp.display}.`
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
