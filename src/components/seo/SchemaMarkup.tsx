// Schema Markup centralizado — ViannaLegal
// FAQPage + Organization + WebSite + LegalService + Article + Quiz + Breadcrumb

import { Helmet } from 'react-helmet-async';

// ── FAQ Schema — 20 perguntas (rich snippets no Google) ────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": []  // preenchido abaixo via PLACEHOLDER
};

// ── Organization Schema ─────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "ViannaLegal",
  "alternateName": "Kathia Vianna — Cidadania Portuguesa",
  "url": "https://viannalegal.com.br",
  "logo": "https://viannalegal.com.br/og-image.jpg",
  "image": "https://viannalegal.com.br/og-image.jpg",
  "description": "Assessoria especializada em cidadania portuguesa para brasileiros. Filhos, netos e bisnetos de portugueses. Processo 100% online.",
  "telephone": "+351-913-134-260",
  "priceRange": "$$",
  "areaServed": { "@type": "Country", "name": "Brazil" },
  "availableLanguage": "Portuguese",
  "knowsAbout": [
    "Cidadania Portuguesa", "Nacionalidade Portuguesa",
    "Lei Orgânica 1/2026", "Dupla Cidadania Brasil Portugal", "Passaporte Europeu"
  ],
  "sameAs": ["https://wa.me/351913134260"]
};

// ── WebSite Schema ──────────────────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ViannaLegal",
  "url": "https://viannalegal.com.br",
  "description": "Assessoria especializada em cidadania portuguesa para brasileiros",
  "inLanguage": "pt-BR",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://viannalegal.com.br/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// ── Componente para homepage ────────────────────────────────────
export function SchemaHomepage() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
}

// ── Componente para artigos do blog ────────────────────────────
interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  author?: string;
  content?: string;
}

export function SchemaArticle({ title, description, slug, date, author = 'Kathia Vianna', content }: ArticleSchemaProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": `https://viannalegal.com.br/blog/${slug}`,
    "datePublished": date,
    "dateModified": new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Person",
      "name": author,
      "jobTitle": "Advogada especialista em cidadania portuguesa",
      "url": "https://viannalegal.com.br"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ViannaLegal",
      "url": "https://viannalegal.com.br",
      "logo": {
        "@type": "ImageObject",
        "url": "https://viannalegal.com.br/og-image.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://viannalegal.com.br/blog/${slug}`
    },
    "wordCount": content ? content.split(/\s+/).length : undefined,
    "inLanguage": "pt-BR",
    "about": { "@type": "Thing", "name": "Cidadania Portuguesa" }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </Helmet>
  );
}

// ── Componente para página do Quiz ─────────────────────────────
export function SchemaQuiz() {
  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Quiz Cidadania Portuguesa — Descubra se você tem direito",
    "url": "https://viannalegal.com.br/quiz",
    "description": "Responda algumas perguntas e descubra em minutos se você tem direito à cidadania portuguesa e qual é o caminho mais adequado para o seu perfil.",
    "applicationCategory": "LegalService",
    "inLanguage": "pt-BR",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
    "provider": { "@type": "Organization", "name": "ViannaLegal", "url": "https://viannalegal.com.br" }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(quizSchema)}
      </script>
    </Helmet>
  );
}

// ── Componente BreadcrumbList ───────────────────────────────────
interface BreadcrumbProps {
  items: { name: string; url: string }[];
}

export function SchemaBreadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}

// ── FAQSchema separado — para usar na FAQ section ──────────────
interface FAQSchemaProps {
  items: { question: string; answer: string }[];
}

export function SchemaFAQ({ items }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
