import { motion } from 'framer-motion';
import { QuizBanner } from '@/components/ui/QuizBanner';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { ArrowRight, Users, Heart, Building, FileText, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import { SITE_CONFIG, waUrl } from '@/config/site';

const services = [
  {
    id: 'filhos-maiores', pageSlug: 'filhos-maiores',
    title: 'Cidadania para Filhos Maiores', subtitle: 'Filhos maiores de idade de cidadãos portugueses',
    duration: '50 a 56 meses', icon: Heart,
    description: 'Processo destinado a filhos maiores de idade de cidadãos portugueses. A nacionalidade é atribuída por filiação, sendo necessário comprovar o vínculo parental com o ascendente português.',
    requirements: ['Certidão de nascimento do requerente', 'Certidão de nascimento do pai/mãe português', 'Documentos de identificação válidos', 'Procuração para a equipe jurídica'],
  },
  {
    id: 'filhos-menores', pageSlug: 'filhos-menores',
    title: 'Cidadania para Filhos Menores', subtitle: 'Processo simplificado para menores de 18 anos',
    duration: '2 a 4 meses', icon: Heart,
    description: 'Processo mais célere para filhos menores de idade de cidadãos portugueses. Trâmite simplificado, sem exigência de vínculo efetivo.',
    requirements: ['Certidão de nascimento do menor', 'Certidão de nascimento do pai/mãe português', 'Documentos de identificação dos pais', 'Autorização de ambos os genitores'],
  },
  {
    id: 'netos', pageSlug: 'netos',
    title: 'Cidadania para Netos', subtitle: 'Descendentes de avós portugueses',
    duration: '41 a 46 meses', icon: Users,
    description: 'Para netos de cidadãos portugueses, é necessário demonstrar vínculo efetivo com a comunidade portuguesa. A Lei Orgânica 1/2026 adicionou requisitos de conhecimento cultural e cívico.',
    requirements: ['Certidão de nascimento do requerente', 'Certidão de nascimento do pai/mãe', 'Certidão de nascimento do avô/avó português', 'Comprovante de vínculo efetivo com Portugal'],
  },
  {
    id: 'bisnetos', pageSlug: 'bisnetos',
    title: 'Cidadania para Bisnetos', subtitle: 'Novidade da Lei Orgânica 1/2026: via de naturalização',
    duration: '5 anos de residência em PT + análise', icon: Users,
    description: 'Desde a Lei Orgânica n.º 1/2026 (em vigor desde maio de 2026), bisnetos têm via de naturalização específica — mas exige residência legal em Portugal por 5 anos. Não funciona morando no Brasil.',
    requirements: ['Cadeia completa de filiação documentada (4 gerações)', 'Residência legal em Portugal por 5+ anos', 'Requisitos culturais e cívicos da Lei 1/2026', 'Declaração de adesão ao Estado de Direito'],
  },
  {
    id: 'conjuges', pageSlug: 'conjuges',
    title: 'Cidadania para Cônjuges', subtitle: 'Casados ou em união estável com portugueses',
    duration: '50 a 54 meses', icon: Heart,
    description: 'Cônjuges com mínimo de 3 anos de casamento civil ou união de facto reconhecida com cidadãos portugueses podem requerer a nacionalidade. A transcrição do casamento é pré-requisito.',
    requirements: ['Certidão de casamento (transcrita em Portugal)', 'Mínimo de 3 anos de casamento/união', 'Documentos de identificação de ambos', 'Declaração de não separação de facto'],
  },
  {
    id: 'residencia', pageSlug: 'residencia',
    title: 'Nacionalidade por Residência', subtitle: 'Para residentes legais em Portugal',
    duration: '27 a 30 meses (após 7 anos de residência)', icon: Building,
    description: 'Para quem reside legalmente em Portugal. Desde a Lei Orgânica 1/2026, o prazo mínimo subiu de 5 para 7 anos para brasileiros/CPLP, e o tempo de espera pelo título não conta mais.',
    requirements: ['Residência legal em Portugal há 7+ anos (CPLP/brasileiros)', 'Conhecimento da língua portuguesa', 'Requisitos culturais e cívicos (Lei 1/2026)', 'Ausência de condenação criminal grave'],
  },
  {
    id: 'transcricao', pageSlug: 'transcricao-casamento',
    title: 'Transcrição de Casamento', subtitle: 'Registro do casamento brasileiro em Portugal',
    duration: '1-4 meses', icon: FileText,
    description: 'Para cidadãos portugueses casados no Brasil. A transcrição registra o casamento nos livros civis portugueses e é pré-requisito obrigatório para o pedido de cidadania por casamento.',
    requirements: ['Certidão de casamento brasileira apostilada', 'Documentos de identificação dos cônjuges', 'Certidão de nascimento do cônjuge português', 'Procuração para a equipe jurídica'],
  },
];

export default function CidadaniaPortuguesa() {
  useScrollToHash();
  return (
    <>
      <Helmet>
        <title>Cidadania Portuguesa para Netos, Filhos, Bisnetos e Cônjuges | ViannaLegal</title>
        <meta name="description" content="Assessoria completa para obtenção da cidadania portuguesa. Netos, bisnetos, filhos maiores e menores, cônjuges. Atualizado com a Lei Orgânica 1/2026. Processo 100% online." />
        <link rel="canonical" href="https://viannalegal.com.br/cidadania-portuguesa" />
        <meta property="og:title" content="Cidadania Portuguesa para Netos, Filhos, Bisnetos e Cônjuges | ViannaLegal" />
        <meta property="og:url" content="https://viannalegal.com.br/cidadania-portuguesa" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Modalidades de Cidadania Portuguesa",
          "description": "Catálogo de serviços de assessoria para aquisição da nacionalidade portuguesa: netos, bisnetos, filhos, cônjuges, residência e transcrição de casamento.",
          "url": "https://viannalegal.com.br/cidadania-portuguesa",
          "provider": {
            "@type": "Organization",
            "name": "ViannaLegal",
            "url": "https://viannalegal.com.br",
            "telephone": "+351913134260"
          },
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": services.map((s, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": "LegalService",
                "name": s.title,
                "description": s.description,
                "url": `https://viannalegal.com.br/cidadania-portuguesa/${s.pageSlug}`,
                "serviceType": s.subtitle,
                "areaServed": ["PT", "BR"],
                "provider": {
                  "@type": "Organization",
                  "name": "ViannaLegal",
                  "url": "https://viannalegal.com.br"
                }
              }
            }))
          }
        })}</script>
      </Helmet>
      <Header />
      <section className="pt-32 pb-16 bg-primary">
        <div className="container-width">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-4xl mx-auto">
            <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">Cidadania Portuguesa</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Sua Jornada para a <span className="text-gold">Cidadania Europeia</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Assessoria especializada em todas as modalidades de aquisição da nacionalidade portuguesa. Atualizado com a Lei Orgânica 1/2026.
            </p>
            <Button variant="gold" size="xl" onClick={() => window.open('${SITE_CONFIG.whatsapp.url}?text=${encodeURIComponent("Olá! Gostaria de informações sobre cidadania portuguesa.")}', '_blank', 'noopener,noreferrer')}>
              <MessageCircle className="w-5 h-5" />
              Falar com Especialista
            </Button>
          </motion.div>
        </div>
      </section>
      <section className="section-padding">
        <div className="container-width">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div key={service.id} id={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`grid lg:grid-cols-2 gap-12 items-center`}>
                  <div className={isEven ? '' : 'lg:order-2'}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gold" />
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>Prazo médio: <strong className="text-foreground">{service.duration}</strong></span>
                      </div>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{service.title}</h2>
                    <p className="text-gold font-medium mb-4">{service.subtitle}</p>
                    <p className="text-muted-foreground text-lg mb-6">{service.description}</p>
                    <div className="bg-muted/50 rounded-2xl p-6 mb-6">
                      <h3 className="font-semibold text-foreground mb-4">Requisitos principais:</h3>
                      <ul className="space-y-3">
                        {service.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link to={`/cidadania-portuguesa/${service.pageSlug}`} className="text-primary hover:text-gold transition-colors font-medium text-sm inline-flex items-center gap-1.5">
                      Ver guia completo, documentos e perguntas frequentes
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className={`bg-gradient-to-br from-primary/5 to-gold/5 rounded-3xl p-8 lg:p-12 ${isEven ? 'lg:order-2' : ''}`}>
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                        <Icon className="w-10 h-10 text-gold" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-4">Interessado nesta modalidade?</h3>
                      <p className="text-muted-foreground mb-6">Análise gratuita do seu caso, sem compromisso.</p>
                      <Button variant="gold" size="lg" onClick={() => window.open(`${SITE_CONFIG.whatsapp.url}?text=${encodeURIComponent("Olá! Gostaria de informações sobre ${service.title}.")}`, '_blank', 'noopener,noreferrer')}>
                        Solicitar Análise
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-padding bg-primary">
        <div className="container-width">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Pronto para iniciar sua jornada?</h2>
            <p className="text-primary-foreground/80 text-lg mb-8">Nossa equipe está pronta para analisar seu caso e orientá-lo em cada etapa do processo.</p>
            <Button variant="gold" size="xl" onClick={() => window.open(SITE_CONFIG.whatsapp.url, '_blank', 'noopener,noreferrer')}>
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>
      <div className="container-width pb-8"><QuizBanner /></div>
      <Footer />
    </>
  );
}
