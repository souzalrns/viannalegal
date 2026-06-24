import { motion } from 'framer-motion';
import { QuizBanner } from '@/components/ui/QuizBanner';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { 
  ArrowRight, 
  Search, 
  FileText, 
  BookOpen,
  CheckCircle,
  MessageCircle,
  AlertCircle,
  Globe
} from 'lucide-react';

export default function BuscaDocumentos() {
  useScrollToHash();
  
  return (
    <>
      <Helmet>
        <title>Busca de Documentos Portugueses e Pesquisa Genealógica | ViannaLegal</title>
        <meta name="description" content="Serviço especializado em busca de documentos portugueses para cidadania. Pesquisa genealógica, paleografia para leitura de registros antigos, localização de certidões de batismo e nascimento em Portugal." />
        <meta name="keywords" content="busca de documentos portugueses, pesquisa genealógica portugal, paleografia documentos antigos, certidão de batismo portuguesa, certidão de nascimento portugal, apostila de haia, documentos cidadania portuguesa" />
        <link rel="canonical" href="https://viannalegal.com.br/busca-documentos" />
        
        <meta property="og:title" content="Busca de Documentos Portugueses e Pesquisa Genealógica | ViannaLegal" />
        <meta property="og:description" content="Localizamos documentos portugueses para seu processo de cidadania. Especialistas em paleografia." />
        <meta property="og:url" content="https://viannalegal.com.br/busca-documentos" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          "name": "Busca de Documentos Portugueses e Pesquisa Genealógica",
          "description": "Serviço especializado em busca de documentos portugueses para cidadania: pesquisa genealógica, paleografia para leitura de registros antigos, localização de certidões de batismo e nascimento em Portugal.",
          "url": "https://viannalegal.com.br/busca-documentos",
          "areaServed": ["PT", "BR"],
          "serviceType": "Pesquisa Genealógica e Busca Documental",
          "provider": {
            "@type": "Organization",
            "name": "ViannaLegal",
            "url": "https://viannalegal.com.br",
            "telephone": "+351913134260"
          }
        })}</script>
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
              Pesquisa Documental
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Busca de Documentos e <span className="text-gold">Pesquisa Genealógica</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Localizamos documentos essenciais para seu processo de cidadania. 
              Especialistas em paleografia para leitura de registros históricos portugueses.
            </p>
            <Button 
              variant="gold" 
              size="xl"
              onClick={() => window.open('https://wa.me/5521986669063?text=Olá! Preciso de ajuda com busca de documentos.', '_blank', 'noopener,noreferrer')}
            >
              <MessageCircle className="w-5 h-5" />
              Consultar Especialista
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Busca vs Pesquisa */}
      <section className="section-padding">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Busca de Documentos vs Pesquisa Genealógica
            </h2>
            <p className="text-muted-foreground text-lg">
              Entenda a diferença entre os dois serviços para escolher o mais adequado ao seu caso.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                <Search className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Busca de Documentos
              </h3>
              <p className="text-muted-foreground mb-6">
                Quando você <strong>já possui os dados</strong> do seu ascendente português 
                (nome completo, data aproximada e local de nascimento), realizamos a busca 
                direta nos arquivos e conservatórias portuguesas.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Processo mais rápido e econômico</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Ideal quando há informações específicas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Localização de certidões de nascimento e batismo</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Pesquisa Genealógica
              </h3>
              <p className="text-muted-foreground mb-6">
                Quando você <strong>não possui informações</strong> sobre seu ascendente ou 
                tem apenas dados parciais, realizamos uma investigação aprofundada para 
                reconstruir sua árvore genealógica.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Investigação completa de ancestralidade</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Pesquisa em múltiplos arquivos e fontes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Reconstrução da árvore genealógica</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Paleografia */}
      <section className="section-padding bg-muted/50">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
                Especialidade
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Paleografia: Leitura de <span className="text-primary">Documentos Antigos</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Os registros portugueses anteriores ao século XX são escritos em caligrafia antiga, 
                muitas vezes ilegível para pessoas não especializadas. Nossa equipe possui formação 
                em <strong>paleografia</strong>, a ciência de leitura de escritas antigas.
              </p>
              <p className="text-muted-foreground mb-6">
                Isso nos permite interpretar corretamente certidões de batismo, casamento e óbito 
                de séculos passados, garantindo a precisão das informações extraídas para seu 
                processo de cidadania.
              </p>
              
              <div className="bg-gold/10 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Importante</h4>
                    <p className="text-muted-foreground text-sm">
                      Registros anteriores a 1911 estão frequentemente em paróquias e arquivos 
                      distritais. Após 1911, com a implementação do registo civil obrigatório, 
                      muitos documentos foram digitalizados e estão disponíveis online.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 border border-border/50"
            >
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                O que podemos localizar:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Certidões de Batismo</h4>
                    <p className="text-muted-foreground text-sm">
                      Registros paroquiais com valor legal para comprovação de nacionalidade
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Certidões de Nascimento</h4>
                    <p className="text-muted-foreground text-sm">
                      Registros civis a partir de 1911 nas conservatórias
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Certidões de Casamento</h4>
                    <p className="text-muted-foreground text-sm">
                      Essenciais para comprovar filiação e linha de descendência
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Certidões de Óbito</h4>
                    <p className="text-muted-foreground text-sm">
                      Quando necessário para completar a linha genealógica
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Documentos Brasileiros */}
      <section className="section-padding">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
              Documentação Brasileira
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Requisitos para Documentos <span className="text-primary">Brasileiros</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Para processos de cidadania portuguesa, os documentos brasileiros precisam 
              atender a requisitos específicos para serem aceitos em Portugal.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-3xl p-8 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Certidão de Inteiro Teor
              </h3>
              <p className="text-muted-foreground mb-6">
                Portugal exige a <strong>certidão de inteiro teor</strong> (também chamada de 
                cópia integral) das certidões brasileiras. Este documento contém todas as 
                informações do registro original, incluindo averbações e retificações.
              </p>
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Atenção:</strong> A certidão resumida (modelo comum) NÃO é aceita 
                  para processos de cidadania portuguesa.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-3xl p-8 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Apostilamento de Haia
              </h3>
              <p className="text-muted-foreground mb-6">
                Todos os documentos brasileiros devem receber a <strong>Apostila de Haia</strong>, 
                um selo que atesta a autenticidade do documento para uso internacional em 
                países signatários da Convenção de Haia.
              </p>
              <div className="bg-muted/50 rounded-xl p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Onde apostilar:</strong> Cartórios autorizados pelo CNJ em todo o Brasil. 
                  Consulte a lista em cartoriosdoamazonas.org.br/apostilamento-de-haia
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Precisa localizar documentos?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Entre em contato com nossa equipe especializada em pesquisa documental. 
              Analisamos seu caso e indicamos o melhor caminho para obter os documentos 
              necessários ao seu processo de cidadania.
            </p>
            <Button 
              variant="gold" 
              size="xl"
              onClick={() => window.open('https://wa.me/5521986669063?text=Olá! Preciso de ajuda com busca de documentos para cidadania portuguesa.', '_blank', 'noopener,noreferrer')}
            >
              <MessageCircle className="w-5 h-5" />
              Falar com Especialista em Paleografia
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="container-width pb-8"><QuizBanner /></div>
      <Footer />
    </>
  );
}
