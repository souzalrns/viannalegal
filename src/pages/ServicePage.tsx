import { useParams, Link, Navigate } from 'react-router-dom';
import { QuizBanner } from '@/components/ui/QuizBanner';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ChevronRight, Clock, FileCheck, AlertTriangle, MessageCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';
import { servicesContent } from '@/data/serviceContent';

const SITE_URL = 'https://viannalegal.com.br';
const WHATSAPP_NUMBER = '351913134260';

function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const content = slug ? servicesContent[slug] : undefined;

  if (!content) {
    return <Navigate to="/cidadania-portuguesa" replace />;
  }

  const pagePath = `/cidadania-portuguesa/${content.slug}`;
  const canonicalUrl = `${SITE_URL}${pagePath}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Cidadania Portuguesa',
        item: `${SITE_URL}/cidadania-portuguesa`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: content.breadcrumbLabel,
        item: canonicalUrl,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: content.breadcrumbLabel,
    provider: {
      '@type': 'LegalService',
      name: 'ViannaLegal',
      url: SITE_URL,
    },
    areaServed: ['BR', 'PT'],
    description: content.metaDescription,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={content.metaTitle} />
        <meta property="og:description" content={content.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content="pt_BR" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Header />
      <main className="pt-28 pb-20">
      {/* Breadcrumbs */}
      <div className="container-width mb-8">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            Início
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/cidadania-portuguesa" className="hover:text-primary transition-colors">
            Cidadania Portuguesa
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">{content.breadcrumbLabel}</span>
        </nav>
      </div>

      {/* Hero */}
      <header className="container-width mb-14">
        <div
          className="max-w-3xl"
        >
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            {content.heroTitle}
          </h1>
          <p className="text-muted-foreground text-lg mb-6">{content.heroSubtitle}</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm bg-gold/10 text-primary font-medium rounded-full py-2 px-4">
              <Clock className="w-4 h-4" />
              Prazo médio: {content.heroDuration}
            </div>
            {content.heroDurationNote && (
              <p className="text-sm text-muted-foreground">{content.heroDurationNote}</p>
            )}
            <Button
              variant="gold"
              size="lg"
              onClick={() => window.open(
                  whatsappLink(`Olá! Quero saber mais sobre ${content.breadcrumbLabel.toLowerCase()}.`),
                  '_blank',
                  'noopener,noreferrer'
                )
              }
            >
              Análise Gratuita
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container-width grid lg:grid-cols-3 gap-12">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Intro */}
          <section>
            {content.intro.map((paragraph, i) => (
              <p key={i} className="text-foreground/90 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Who qualifies */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Quem tem direito
            </h2>
            <p className="text-muted-foreground mb-5">{content.whoQualifiesIntro}</p>
            <ul className="space-y-3">
              {content.whoQualifies.map((item, i) => (
                <li key={i} className="flex gap-3 text-foreground/90">
                  <FileCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Documents needed */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Documentos necessários
            </h2>
            <div className="space-y-4">
              {content.documentsNeeded.map((doc, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4">
                  <div className="font-semibold text-foreground mb-1">{doc.item}</div>
                  {doc.note && <div className="text-sm text-muted-foreground">{doc.note}</div>}
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Como funciona, etapa por etapa
            </h2>
            <ol className="space-y-4">
              {content.timeline.map((stage, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{stage.stage}</div>
                    <div className="text-sm text-muted-foreground">{stage.duration}</div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Common mistakes */}
          <section className="bg-muted/50 rounded-2xl p-6 lg:p-8">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-gold" />
              Erros mais comuns nesse processo
            </h2>
            <ul className="space-y-3">
              {content.commonMistakes.map((mistake, i) => (
                <li key={i} className="text-foreground/90 text-sm flex gap-3">
                  <span className="text-gold font-bold">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Perguntas frequentes sobre {content.breadcrumbLabel.toLowerCase()}
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {content.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
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
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-32 space-y-6">
            <div className="bg-primary text-primary-foreground rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold mb-2">Quer uma análise do seu caso?</h3>
              <p className="text-primary-foreground/80 text-sm mb-5">
                Em poucos minutos no WhatsApp, dizemos se você se qualifica e qual o próximo passo.
              </p>
              <Button
                variant="gold"
                className="w-full"
                onClick={() => window.open(
                    whatsappLink(`Olá! Quero uma análise gratuita sobre ${content.breadcrumbLabel.toLowerCase()}.`),
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
              >
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp
              </Button>
            </div>

            {content.relatedServices.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
                  Veja também
                </h3>
                <ul className="space-y-3">
                  {content.relatedServices.map((relatedSlug) => {
                    const related = servicesContent[relatedSlug];
                    if (!related) return null;
                    return (
                      <li key={relatedSlug}>
                        <Link
                          to={`/cidadania-portuguesa/${relatedSlug}`}
                          className="text-sm text-primary hover:text-gold transition-colors flex items-center gap-1.5"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                          {related.breadcrumbLabel}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
      </main>
      <div className="container-width pb-8"><QuizBanner /></div>
      <Footer />
    </>
  );
}
