import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { Benefits } from '@/components/sections/Benefits';
import { Process } from '@/components/sections/Process';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Helmet } from 'react-helmet-async';
import { useScrollToHash } from '@/hooks/useScrollToHash';

const Index = () => {
  useScrollToHash();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "ViannaLegal",
    "description": "Assessoria especializada em cidadania portuguesa para brasileiros. Auxiliamos na obtenção de dupla cidadania para filhos, netos e cônjuges de portugueses.",
    "url": "https://viannalegal.com.br",
    "logo": "https://viannalegal.com.br/logo.png",
    "telephone": "+351913134260",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lisboa",
      "addressCountry": "PT"
    },
    "areaServed": ["Brasil", "Portugal"],
    "serviceType": [
      "Cidadania Portuguesa para Netos",
      "Cidadania Portuguesa para Filhos",
      "Cidadania Portuguesa por Casamento",
      "Pesquisa Genealógica",
      "Busca de Documentos Portugueses"
    ],
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-18:00"
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quem tem direito à cidadania portuguesa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Filhos, netos e bisnetos de portugueses, cônjuges de cidadãos portugueses casados há mais de 3 anos, e residentes legais em Portugal há 5+ anos podem solicitar a cidadania portuguesa."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto tempo demora o processo de cidadania portuguesa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Os prazos variam: filhos menores 6-8 meses, filhos maiores 12-14 meses, netos e cônjuges 40-48 meses. Os prazos dependem da conservatória responsável."
        }
      },
      {
        "@type": "Question",
        "name": "Preciso morar em Portugal para obter a cidadania?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Não necessariamente. Descendentes diretos de portugueses podem solicitar a cidadania mesmo morando no Brasil. Apenas a naturalização por residência exige morar em Portugal."
        }
      },
      {
        "@type": "Question",
        "name": "Neto de português tem direito à cidadania portuguesa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, netos de portugueses têm direito à cidadania portuguesa, desde que comprovem vínculo efetivo com a comunidade portuguesa através de conhecimento do idioma, visitas ou outros laços culturais."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Cidadania Portuguesa para Brasileiros | ViannaLegal - Assessoria Especializada</title>
        <meta 
          name="description" 
          content="Assessoria especializada em cidadania portuguesa para brasileiros. Netos, filhos e cônjuges de portugueses. Processo 100% online, sem sair do Brasil. Consulta gratuita!" 
        />
        <meta name="keywords" content="cidadania portuguesa, cidadania portuguesa para netos, cidadania portuguesa para filhos, dupla cidadania brasil portugal, passaporte português, nacionalidade portuguesa, como tirar cidadania portuguesa, cidadania europeia, assessoria cidadania portuguesa" />
        <link rel="canonical" href="https://viannalegal.com.br" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cidadania Portuguesa para Brasileiros | ViannaLegal" />
        <meta property="og:description" content="Assessoria especializada em cidadania portuguesa. Netos, filhos e cônjuges de portugueses. Processo 100% online!" />
        <meta property="og:url" content="https://viannalegal.com.br" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cidadania Portuguesa para Brasileiros | ViannaLegal" />
        <meta name="twitter:description" content="Assessoria especializada em cidadania portuguesa. Processo 100% online!" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="ViannaLegal" />
        <meta name="geo.region" content="PT-11" />
        <meta name="geo.placename" content="Lisboa" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Services />
          <About />
          <Benefits />
          <Process />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
