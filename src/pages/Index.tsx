import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { Benefits } from '@/components/sections/Benefits';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Helmet } from 'react-helmet-async';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useEffect, useRef } from 'react';
import { QuizBanner } from '@/components/ui/QuizBanner';

const Index = () => {
  useScrollToHash();
  const { trackScrollDepth } = useAnalytics();
  const scrollMarks = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.body.scrollHeight - window.innerHeight;
      const pct      = Math.round((scrolled / total) * 100);

      ([25, 50, 75, 100] as const).forEach(mark => {
        if (pct >= mark && !scrollMarks.current.has(mark)) {
          scrollMarks.current.add(mark);
          trackScrollDepth(mark);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Organization Schema
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ViannaLegal",
    "alternateName": "Vianna Legal Assessoria",
    "url": "https://viannalegal.com.br",
    "logo": "https://viannalegal.com.br/logo.png",
    "description": "Assessoria especializada em cidadania portuguesa para brasileiros. Auxiliamos na obtenção de dupla cidadania para filhos, netos, bisnetos e cônjuges de portugueses.",
    "foundingDate": "2014",
    "telephone": "+351913134260",
    "email": "contato@viannalegal.com.br",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lisboa",
      "addressCountry": "PT"
    },
    "sameAs": [
      "https://www.instagram.com/kathiavianna.adv",
      "https://www.facebook.com/KathiaViannaAdvogada"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+351913134260",
      "contactType": "customer service",
      "availableLanguage": ["Portuguese", "English"]
    }
  };

  const legalServiceData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "ViannaLegal - Assessoria em Cidadania Portuguesa",
    "description": "Assessoria especializada em cidadania portuguesa para brasileiros. Processo 100% online. Taxa de aprovação 98%. Atualizado com a Lei Orgânica 1/2026, em vigor desde maio de 2026.",
    "url": "https://viannalegal.com.br",
    "logo": "https://viannalegal.com.br/logo.png",
    "image": "https://viannalegal.com.br/og-image.jpg",
    "telephone": "+351913134260",
    "address": { "@type": "PostalAddress", "addressLocality": "Lisboa", "addressCountry": "PT" },
    "areaServed": [{ "@type": "Country", "name": "Brasil" }, { "@type": "Country", "name": "Portugal" }],
    "serviceType": [
      "Cidadania Portuguesa para Netos",
      "Cidadania Portuguesa para Filhos",
      "Cidadania Portuguesa para Bisnetos",
      "Cidadania Portuguesa por Casamento",
      "Cidadania Portuguesa por Residência",
      "Pesquisa Genealógica",
      "Busca de Documentos Portugueses",
      "Transcrição de Casamento"
    ],
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-18:00",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "2000", "bestRating": "5" }
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ViannaLegal - Assessoria em Cidadania Portuguesa",
    "image": "https://viannalegal.com.br/logo.png",
    "telephone": "+351913134260",
    "address": { "@type": "PostalAddress", "addressLocality": "Lisboa", "addressCountry": "PT" },
    "url": "https://viannalegal.com.br",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "O que mudou na Lei da Nacionalidade Portuguesa em 2026?", "acceptedAnswer": { "@type": "Answer", "text": "A Lei Orgânica n.º 1/2026 está em vigor desde 19 de maio de 2026. Principais mudanças: fim do regime especial sefardita para novos pedidos; prazo de residência para naturalização subiu de 5 para 7 anos para brasileiros/CPLP e para 10 anos para demais; bisnetos passaram a ter via de naturalização com 5 anos de residência em Portugal; novos requisitos de conhecimento cultural e cívico para naturalização e netos." } },
      { "@type": "Question", "name": "O veto do Tribunal Constitucional de dezembro de 2025 ainda vale?", "acceptedAnswer": { "@type": "Answer", "text": "O Acórdão do TC n.º 1133/2025 invalidou pontos de uma versão anterior, forçando reformulação. A versão final (Lei Orgânica 1/2026) está em vigor desde maio de 2026 com o aumento de prazo confirmado. Quem já tinha processo pendente antes de 19/5/2026 segue as regras anteriores." } },
      { "@type": "Question", "name": "Neto de português tem direito à cidadania portuguesa?", "acceptedAnswer": { "@type": "Answer", "text": "Sim, desde que comprove vínculo efetivo com a comunidade portuguesa. A Lei Orgânica 1/2026 adicionou requisitos de conhecimento cultural e cívico, mas manteve a via de netos." } },
      { "@type": "Question", "name": "Bisneto de português tem direito à cidadania?", "acceptedAnswer": { "@type": "Answer", "text": "Desde a Lei Orgânica 1/2026, bisnetos têm via de naturalização específica — mas exige residência legal em Portugal por 5 anos. Não é possível usar essa via morando no Brasil." } },
      { "@type": "Question", "name": "Quanto tempo demora o processo de cidadania portuguesa?", "acceptedAnswer": { "@type": "Answer", "text": "Filhos menores: 6-12 meses. Filhos maiores: 12-24 meses. Netos: 24-42 meses. Cônjuges: 24-48 meses. Residência (CPLP): 7 anos + 20-32 meses de análise." } },
      { "@type": "Question", "name": "Preciso morar em Portugal para obter a cidadania?", "acceptedAnswer": { "@type": "Answer", "text": "Não para descendentes (filhos, netos). Apenas a naturalização por residência exige morar em Portugal — 7 anos para brasileiros/CPLP desde a Lei Orgânica 1/2026." } },
      { "@type": "Question", "name": "Posso ter dupla cidadania Brasil e Portugal?", "acceptedAnswer": { "@type": "Answer", "text": "Sim. Ambos os países reconhecem a dupla cidadania. Você mantém todos os direitos brasileiros e adquire os de cidadão europeu." } },
      { "@type": "Question", "name": "O que é vínculo efetivo e como comprovar?", "acceptedAnswer": { "@type": "Answer", "text": "Vínculo efetivo é a ligação com a comunidade portuguesa, exigida para netos. Comprova-se por visitas a Portugal, conhecimento do idioma, participação em associações lusófonas ou laços familiares documentados." } }
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ViannaLegal",
    "url": "https://viannalegal.com.br",
    "description": "Assessoria especializada em cidadania portuguesa para brasileiros",
    "publisher": { "@type": "Organization", "name": "ViannaLegal" },
    "potentialAction": { "@type": "SearchAction", "target": "https://viannalegal.com.br/blog?q={search_term_string}", "query-input": "required name=search_term_string" }
  };

  return (
    <>
      <Helmet>
        <title>ViannaLegal: Assessoria em Cidadania Portuguesa para Brasileiros | Lei 2026</title>
        <meta name="description" content="Obtenha sua cidadania portuguesa por descendência, casamento ou residência. Processo 100% online, especialistas em Portugal. Taxa de aprovação 98%. Atualizado com a Lei Orgânica 1/2026. Consulta gratuita!" />
        <meta name="keywords" content="cidadania portuguesa, cidadania portuguesa para netos, cidadania portuguesa para filhos, cidadania portuguesa para bisnetos, dupla cidadania brasil portugal, passaporte português, nacionalidade portuguesa, como tirar cidadania portuguesa, cidadania europeia, assessoria cidadania portuguesa, lei orgânica 1/2026, vínculo efetivo portugal" />
        <link rel="canonical" href="https://viannalegal.com.br" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ViannaLegal: Assessoria em Cidadania Portuguesa para Brasileiros" />
        <meta property="og:description" content="Cidadania portuguesa por descendência, casamento ou residência. 100% online, taxa de aprovação 98%. Atualizado com a Lei Orgânica 1/2026." />
        <meta property="og:url" content="https://viannalegal.com.br" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="ViannaLegal" />
        <meta property="og:image" content="https://viannalegal.com.br/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ViannaLegal: Assessoria em Cidadania Portuguesa" />
        <meta name="twitter:description" content="Cidadania portuguesa 100% online. Taxa 98%. Atualizado com a Lei Orgânica 1/2026 — bisnetos, netos, filhos e cônjuges." />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="ViannaLegal - Kathia Vianna" />
        <meta name="language" content="pt-BR" />
        <script type="application/ld+json">{JSON.stringify(organizationData)}</script>
        <script type="application/ld+json">{JSON.stringify(legalServiceData)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessData)}</script>
        <script type="application/ld+json">{JSON.stringify(faqStructuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteData)}</script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Services />
          <About />
          <Benefits />
          <Process />
          <Testimonials />
          <FAQ />
          <section className="container-width"><QuizBanner /></section>
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
