import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Users, 
  Heart, 
  Building, 
  FileText, 
  Clock,
  CheckCircle,
  MessageCircle
} from 'lucide-react';

const services = [
  {
    id: 'filhos-maiores',
    title: 'Cidadania para Filhos Maiores',
    subtitle: 'Filhos maiores de idade de cidadãos portugueses',
    duration: '12-14 meses',
    icon: Heart,
    description: 'Processo destinado a filhos maiores de idade de cidadãos portugueses. A nacionalidade é atribuída por filiação, sendo necessário comprovar o vínculo parental com o ascendente português.',
    requirements: [
      'Certidão de nascimento do requerente',
      'Certidão de nascimento do pai/mãe português',
      'Documentos de identificação válidos',
      'Comprovante de vínculo efetivo com a comunidade portuguesa',
    ],
  },
  {
    id: 'filhos-menores',
    title: 'Cidadania para Filhos Menores',
    subtitle: 'Processo simplificado para menores de 18 anos',
    duration: '6-8 meses',
    icon: Heart,
    description: 'Processo mais célere para filhos menores de idade de cidadãos portugueses. Por serem menores, o processo é simplificado e geralmente mais rápido.',
    requirements: [
      'Certidão de nascimento do menor',
      'Certidão de nascimento do pai/mãe português',
      'Documentos de identificação dos pais',
      'Autorização de ambos os genitores',
    ],
  },
  {
    id: 'netos',
    title: 'Cidadania para Netos',
    subtitle: 'Descendentes de avós portugueses',
    duration: '40-48 meses',
    icon: Users,
    description: 'Para netos de cidadãos portugueses, é necessário demonstrar vínculo efetivo com a comunidade portuguesa. O processo requer comprovação da ligação com Portugal através de conhecimento do idioma, visitas frequentes ou outros vínculos culturais.',
    requirements: [
      'Certidão de nascimento do requerente',
      'Certidão de nascimento do pai/mãe',
      'Certidão de nascimento do avô/avó português',
      'Comprovante de vínculo efetivo com Portugal',
      'Certificado de proficiência em português (se aplicável)',
    ],
  },
  {
    id: 'conjuges',
    title: 'Cidadania para Cônjuges',
    subtitle: 'Casados ou em união estável com portugueses',
    duration: '40-48 meses',
    icon: Heart,
    description: 'Cônjuges ou companheiros em união estável há mais de 3 anos com cidadãos portugueses podem requerer a nacionalidade portuguesa por casamento ou união de facto.',
    requirements: [
      'Certidão de casamento ou prova de união estável',
      'Mínimo de 3 anos de casamento/união',
      'Documentos de identificação de ambos',
      'Comprovante de residência comum',
      'Declaração de não condenação criminal',
    ],
  },
  {
    id: 'residencia',
    title: 'Nacionalidade por Residência',
    subtitle: 'Para residentes legais em Portugal',
    duration: '24-32 meses',
    icon: Building,
    description: 'Estrangeiros que residam legalmente em Portugal há pelo menos 5 anos podem requerer a nacionalidade portuguesa por naturalização, demonstrando integração na sociedade portuguesa.',
    requirements: [
      'Residência legal em Portugal há 5+ anos',
      'Conhecimento suficiente da língua portuguesa',
      'Ausência de condenação criminal grave',
      'Meios de subsistência',
      'Comprovante de integração na comunidade',
    ],
  },
  {
    id: 'transcricao',
    title: 'Transcrição de Casamento',
    subtitle: 'Registro do casamento brasileiro em Portugal',
    duration: '1-4 meses',
    icon: FileText,
    description: 'Para cidadãos portugueses casados no Brasil, é necessário transcrever o casamento no registo civil português. Este processo oficializa o casamento perante as autoridades portuguesas.',
    requirements: [
      'Certidão de casamento brasileira atualizada',
      'Apostilamento de Haia',
      'Documentos de identificação dos cônjuges',
      'Certidão de nascimento do cônjuge português',
    ],
  },
];

export default function CidadaniaPortuguesa() {
  return (
    <>
      <Helmet>
        <title>Cidadania Portuguesa | ViannaLegal - Assessoria Especializada</title>
        <meta name="description" content="Assessoria completa para obtenção da cidadania portuguesa. Filhos, netos, cônjuges e residentes. Processo 100% online com especialistas em Portugal." />
        <meta name="keywords" content="cidadania portuguesa, nacionalidade portuguesa, passaporte europeu, dupla cidadania, cidadania para netos, cidadania para filhos" />
        <link rel="canonical" href="https://viannalegal.com/cidadania-portuguesa" />
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
              Cidadania Portuguesa
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Sua Jornada para a <span className="text-gold">Cidadania Europeia</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Assessoria especializada em todas as modalidades de aquisição da nacionalidade portuguesa. 
              Processo seguro, transparente e com acompanhamento personalizado.
            </p>
            <Button 
              variant="gold" 
              size="xl"
              onClick={() => window.open('https://wa.me/351913134260?text=Olá! Gostaria de informações sobre cidadania portuguesa.', '_blank')}
            >
              <MessageCircle className="w-5 h-5" />
              Falar com Especialista
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section-padding">
        <div className="container-width">
          <div className="space-y-24">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}
                >
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
                    
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                      {service.title}
                    </h2>
                    <p className="text-gold font-medium mb-4">{service.subtitle}</p>
                    <p className="text-muted-foreground text-lg mb-6">
                      {service.description}
                    </p>
                    
                    <div className="bg-muted/50 rounded-2xl p-6">
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
                  </div>
                  
                  <div className={`bg-gradient-to-br from-primary/5 to-gold/5 rounded-3xl p-8 lg:p-12 ${isEven ? 'lg:order-2' : ''}`}>
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-gold/10 flex items-center justify-center mb-6">
                        <Icon className="w-10 h-10 text-gold" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                        Interessado nesta modalidade?
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Entre em contato conosco para uma análise personalizada do seu caso.
                      </p>
                      <Button 
                        variant="gold" 
                        size="lg"
                        onClick={() => window.open(`https://wa.me/351913134260?text=Olá! Gostaria de informações sobre ${service.title}.`, '_blank')}
                      >
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
              Pronto para iniciar sua jornada?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Nossa equipe de especialistas está pronta para analisar seu caso e orientá-lo 
              em cada etapa do processo de obtenção da cidadania portuguesa.
            </p>
            <Button 
              variant="gold" 
              size="xl"
              onClick={() => window.open('https://wa.me/351913134260', '_blank')}
            >
              <MessageCircle className="w-5 h-5" />
              Falar no WhatsApp
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
