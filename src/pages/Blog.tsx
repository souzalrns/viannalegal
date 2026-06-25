import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { ArrowRight, Calendar, Clock, User, TrendingUp, FileText, Scale, Heart, Home, Users, Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

import { allBlogPostsMeta as blogPosts } from '@/data/allBlogPostsMeta';
import { SITE_CONFIG } from '@/config/site';


export default function Blog() {
  useScrollToHash();

  const parseDate = (dateStr: string) => {
    const monthMap: Record<string, string> = {
      'Jan': '01', 'Fev': '02', 'Mar': '03', 'Abr': '04', 'Mai': '05', 'Jun': '06',
      'Jul': '07', 'Ago': '08', 'Set': '09', 'Out': '10', 'Nov': '11', 'Dez': '12'
    };
    const parts = dateStr.split(' ');
    const day = parts[0]?.padStart(2, '0') || '01';
    const month = monthMap[parts[1] || ''] || '01';
    const year = parts[2] || '2024';
    return `${year}-${month}-${day}`;
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog ViannaLegal - Cidadania Portuguesa",
    "description": "Artigos completos, guias e novidades sobre cidadania portuguesa para brasileiros. Atualizações sobre Lei da Nacionalidade 2025, vínculo efetivo, prazos IRN.",
    "url": "https://viannalegal.com.br/blog",
    "publisher": {
      "@type": "Organization",
      "name": "ViannaLegal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://viannalegal.com.br/logo.png"
      }
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "datePublished": parseDate(post.date),
      "url": `https://viannalegal.com.br/blog/${post.slug}`,
      "publisher": {
        "@type": "Organization",
        "name": "ViannaLegal"
      }
    }))
  };

  const featuredPosts = blogPosts.filter(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <>
      <Helmet>
        <title>Blog | Cidadania Portuguesa 2025 - Guias Completos e Novidades | ViannaLegal</title>
        <meta 
          name="description" 
          content="Artigos completos sobre cidadania portuguesa: guias para netos, filhos, cônjuges, naturalização. Vínculo efetivo, backlog IRN, documentos. Conteúdo atualizado 2025." 
        />
        <meta name="keywords" content="blog cidadania portuguesa, lei nacionalidade portuguesa 2025, guia cidadania portuguesa netos, vínculo efetivo portugal, backlog irn 2025, documentos cidadania portuguesa, naturalização portugal" />
        <link rel="canonical" href="https://viannalegal.com.br/blog" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Blog ViannaLegal - Guias Completos de Cidadania Portuguesa" />
        <meta property="og:description" content="Artigos completos, guias e atualizações sobre cidadania portuguesa. Conteúdo especializado para brasileiros." />
        <meta property="og:url" content="https://viannalegal.com.br/blog" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24">
          {/* Hero Section */}
          <section className="py-16 bg-muted/50">
            <div className="container-width">
              <div
                className="text-center max-w-3xl mx-auto"
              >
                <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
                  Blog ViannaLegal
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Guias Completos sobre{' '}
                  <span className="text-primary">Cidadania Portuguesa</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                  Artigos detalhados com tudo que você precisa saber: legislação atualizada, 
                  vínculo efetivo, documentos, prazos reais do IRN e estratégias de aprovação.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Posts */}
          <section className="py-12">
            <div className="container-width">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Destaques
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post, index) => {
                  const Icon = post.icon;
                  return (
                    <article
                      key={post.id}
                      className="bg-card rounded-2xl overflow-hidden shadow-subtle border border-border/50 group"
                    >
                      <div className="p-8">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xs bg-portugal-green/10 text-portugal-green px-3 py-1 rounded-full flex items-center gap-1">
                            <Icon className="w-3 h-3" />
                            {post.category}
                          </span>
                          <span className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full">
                            Destaque
                          </span>
                        </div>
                        
                        <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                        
                        <Button variant="gold" size="sm" asChild>
                          <Link to={`/blog/${post.slug}`}>
                            Ler artigo completo
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Regular Posts */}
          <section className="py-12 bg-muted/30">
            <div className="container-width">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Mais Artigos
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post, index) => {
                  const Icon = post.icon;
                  return (
                    <article
                      key={post.id}
                      className="bg-card rounded-2xl overflow-hidden shadow-subtle border border-border/50"
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full flex items-center gap-1">
                            <Icon className="w-3 h-3" />
                            {post.category}
                          </span>
                        </div>
                        
                        <h3 className="font-display text-lg font-semibold text-foreground mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm" className="text-gold hover:text-gold-dark p-0" asChild>
                          <Link to={`/blog/${post.slug}`}>
                            Ler artigo completo
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16">
            <div className="container-width">
              <div
                className="text-center p-8 bg-gradient-to-br from-portugal-green/10 to-gold/10 rounded-2xl border border-border"
              >
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  Pronto para iniciar seu processo de cidadania?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Nossa equipe especializada pode analisar seu caso gratuitamente e indicar 
                  o melhor caminho para sua cidadania portuguesa.
                </p>
                <Button variant="gold" size="lg" asChild>
                  <a href={SITE_CONFIG.whatsapp.url} target="_blank" rel="noopener noreferrer">
                    Agendar análise gratuita
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
