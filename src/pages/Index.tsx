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

const Index = () => {
  useScrollToHash();
  
  // Organization Schema
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ViannaLegal",
    "alternateName": "Vianna Legal Assessoria",
    "url": "https://viannalegal.com.br",
    "logo": "https://viannalegal.com.br/logo.png",
    "description": "Assessoria especializada em cidadania portuguesa para brasileiros. Auxiliamos na obtenção de dupla cidadania para filhos, netos e cônjuges de portugueses.",
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

  // LegalService Schema
  const legalServiceData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "ViannaLegal - Assessoria em Cidadania Portuguesa",
    "description": "Assessoria especializada em cidadania portuguesa para brasileiros. Processo 100% online. Taxa de aprovação 98%. Atualizado com veto do TC Dezembro 2025.",
    "url": "https://viannalegal.com.br",
    "logo": "https://viannalegal.com.br/logo.png",
    "image": "https://viannalegal.com.br/og-image.jpg",
    "telephone": "+351913134260",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lisboa",
      "addressCountry": "PT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "38.7223",
      "longitude": "-9.1393"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Brasil"
      },
      {
        "@type": "Country", 
        "name": "Portugal"
      }
    ],
    "serviceType": [
      "Cidadania Portuguesa para Netos",
      "Cidadania Portuguesa para Filhos",
      "Cidadania Portuguesa por Casamento",
      "Cidadania Portuguesa por Residência",
      "Pesquisa Genealógica",
      "Busca de Documentos Portugueses",
      "Transcrição de Casamento"
    ],
    "priceRange": "$$",
    "openingHours": "Mo-Fr 09:00-18:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2000",
      "bestRating": "5"
    }
  };

  // LocalBusiness Schema
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "ViannaLegal - Assessoria em Cidadania Portuguesa",
    "image": "https://viannalegal.com.br/logo.png",
    "telephone": "+351913134260",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lisboa",
      "addressCountry": "PT"
    },
    "url": "https://viannalegal.com.br",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  // FAQPage Schema (expanded)
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "O que mudou na Lei da Nacionalidade Portuguesa em 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "As alterações de 2025 trouxeram maior rigor para netos de portugueses, exigindo comprovação de vínculo efetivo. IMPORTANTE: Em dezembro/2025, o Tribunal Constitucional vetou várias normas do endurecimento, mantendo o prazo de residência em 5 anos."
        }
      },
      {
        "@type": "Question",
        "name": "O veto do Tribunal Constitucional (Dez/2025) afeta processos em andamento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Não, processos em andamento seguem as regras vigentes. O veto impediu o aumento do prazo de residência (que subiria para 7-10 anos) e rejeitou normas sobre perda automática de cidadania."
        }
      },
      {
        "@type": "Question",
        "name": "Quem tem direito à cidadania portuguesa em 2025?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Filhos, netos e bisnetos de portugueses, cônjuges de cidadãos portugueses casados há mais de 3 anos, e residentes legais em Portugal há 5+ anos podem solicitar a cidadania portuguesa."
        }
      },
      {
        "@type": "Question",
        "name": "Neto de português tem direito à cidadania portuguesa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim, netos de portugueses têm direito à cidadania portuguesa, desde que comprovem vínculo efetivo com a comunidade portuguesa através de conhecimento do idioma, visitas documentadas ou laços culturais."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto tempo demora o processo de cidadania portuguesa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Os prazos atualizados são: filhos menores 6-12 meses, filhos maiores 12-24 meses, netos 24-42 meses, cônjuges 24-48 meses. Prazos variam conforme backlog do IRN."
        }
      },
      {
        "@type": "Question",
        "name": "Preciso morar em Portugal para obter a cidadania?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Não necessariamente. Descendentes podem solicitar morando no Brasil. Apenas a naturalização por residência exige morar em Portugal por 5 anos legalmente."
        }
      },
      {
        "@type": "Question",
        "name": "Posso ter dupla cidadania Brasil e Portugal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! Tanto o Brasil quanto Portugal permitem dupla cidadania sem restrições. Você mantém todos os direitos brasileiros e adquire os de cidadão europeu."
        }
      },
      {
        "@type": "Question",
        "name": "O que é vínculo efetivo e como comprovar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vínculo efetivo é a ligação com a comunidade portuguesa, exigida para netos. Pode ser comprovado por: domínio do idioma, visitas a Portugal, participação em associações lusófonas, ou laços familiares."
        }
      },
      {
        "@type": "Question",
        "name": "Quais documentos são necessários para cidadania portuguesa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Documentos básicos: certidões portuguesas em inteiro teor, certidões brasileiras apostiladas, documentos de identificação e procuração. Para netos: comprovação de vínculo efetivo."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto custa o processo de cidadania portuguesa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Os custos variam conforme tipo de processo. Incluem taxas consulares, apostilamento, traduções e honorários. Oferecemos análise gratuita para orçamento detalhado."
        }
      }
    ]
  };

  // WebSite Schema
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ViannaLegal",
    "url": "https://viannalegal.com.br",
    "description": "Assessoria especializada em cidadania portuguesa para brasileiros",
    "publisher": {
      "@type": "Organization",
      "name": "ViannaLegal"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://viannalegal.com.br/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Helmet>
        <title>ViannaLegal: Assessoria em Cidadania Portuguesa para Brasileiros | Dupla Cidadania 2025</title>
        <meta 
          name="description" 
          content="Obtenha sua cidadania portuguesa por descendência, casamento ou residência. Processo 100% online, especialistas em Portugal. Taxa de aprovação 98%. Atualizado com veto TC Dez/2025. Consulta gratuita!" 
        />
        <meta name="keywords" content="cidadania portuguesa, cidadania portuguesa para netos, cidadania portuguesa para filhos, dupla cidadania brasil portugal, passaporte português, nacionalidade portuguesa, como tirar cidadania portuguesa, cidadania europeia, assessoria cidadania portuguesa, lei nacionalidade 2025, vínculo efetivo portugal, veto tribunal constitucional portugal, backlog irn" />
        <link rel="canonical" href="https://viannalegal.com.br" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ViannaLegal: Assessoria em Cidadania Portuguesa para Brasileiros" />
        <meta property="og:description" content="Obtenha sua cidadania portuguesa por descendência, casamento ou residência. Processo 100% online, taxa de aprovação 98%! Atualizado Dez/2025." />
        <meta property="og:url" content="https://viannalegal.com.br" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="ViannaLegal" />
        <meta property="og:image" content="https://viannalegal.com.br/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ViannaLegal: Assessoria em Cidadania Portuguesa" />
        <meta name="twitter:description" content="Cidadania portuguesa 100% online. Taxa de aprovação 98%. Veto TC Dez/2025 mantém residência em 5 anos!" />
        <meta name="twitter:image" content="https://viannalegal.com.br/og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="ViannaLegal - Kathia Vianna" />
        <meta name="geo.region" content="PT-11" />
        <meta name="geo.placename" content="Lisboa" />
        <meta name="language" content="pt-BR" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="general" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(legalServiceData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(websiteData)}
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
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
