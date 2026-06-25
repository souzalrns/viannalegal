import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { SITE_CONFIG, waUrl } from '@/config/site';

export default function PoliticaPrivacidade() {
  useScrollToHash();

  return (
    <>
      <Helmet>
        <title>Política de Privacidade | ViannaLegal</title>
        <meta 
          name="description" 
          content="Política de Privacidade da ViannaLegal. Saiba como coletamos, usamos e protegemos seus dados pessoais em conformidade com a LGPD." 
        />
        <link rel="canonical" href="https://viannalegal.com.br/politica-privacidade" />
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
                  Política de Privacidade
                </h1>
                
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="text-sm text-muted-foreground mb-8">
                    Última atualização: {new Date().toLocaleDateString('pt-BR')}
                  </p>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    1. Introdução
                  </h2>
                  <p>
                    A ViannaLegal está comprometida em proteger a privacidade dos usuários de nossos serviços. 
                    Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos 
                    suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                  </p>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    2. Dados Coletados
                  </h2>
                  <p>Coletamos os seguintes tipos de informações:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Dados de identificação:</strong> nome, e-mail, telefone, documentos pessoais</li>
                    <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas</li>
                    <li><strong>Dados do processo:</strong> documentos e informações necessárias para a assessoria em cidadania</li>
                  </ul>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    3. Finalidade do Tratamento
                  </h2>
                  <p>Utilizamos seus dados para:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Prestar serviços de assessoria em cidadania portuguesa</li>
                    <li>Entrar em contato sobre o andamento do seu processo</li>
                    <li>Enviar informações relevantes sobre nossos serviços</li>
                    <li>Cumprir obrigações legais e regulatórias</li>
                    <li>Melhorar nossos serviços e experiência do usuário</li>
                  </ul>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    4. Compartilhamento de Dados
                  </h2>
                  <p>
                    Seus dados podem ser compartilhados com órgãos governamentais portugueses 
                    (conservatórias, IRN) exclusivamente para fins de processamento do seu pedido de cidadania.
                    Não vendemos ou compartilhamos seus dados com terceiros para fins comerciais.
                  </p>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    5. Segurança dos Dados
                  </h2>
                  <p>
                    Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados 
                    contra acesso não autorizado, perda, alteração ou destruição. Utilizamos criptografia 
                    e servidores seguros para armazenamento de informações sensíveis.
                  </p>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    6. Seus Direitos
                  </h2>
                  <p>De acordo com a LGPD, você tem direito a:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Confirmar a existência de tratamento de dados</li>
                    <li>Acessar seus dados pessoais</li>
                    <li>Corrigir dados incompletos ou desatualizados</li>
                    <li>Solicitar a exclusão de dados desnecessários</li>
                    <li>Revogar o consentimento a qualquer momento</li>
                  </ul>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    7. Retenção de Dados
                  </h2>
                  <p>
                    Mantemos seus dados pelo tempo necessário para cumprir as finalidades descritas 
                    nesta política e conforme exigido por lei. Dados de processos de cidadania são 
                    mantidos por até 10 anos após a conclusão do serviço.
                  </p>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    8. Contato
                  </h2>
                  <p>
                    Para exercer seus direitos ou esclarecer dúvidas sobre esta política, 
                    entre em contato conosco através do WhatsApp: ` ${SITE_CONFIG.whatsapp.display}.`
                  </p>

                  <h2 className="font-display text-2xl font-semibold text-foreground mt-8 mb-4">
                    9. Alterações
                  </h2>
                  <p>
                    Esta política pode ser atualizada periodicamente. Recomendamos que você 
                    revise esta página regularmente para estar ciente de quaisquer alterações.
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
