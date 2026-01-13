import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/sections/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogPosts } from './Blog';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const currentIndex = blogPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription || post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": "https://viannalegal.com.br"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ViannaLegal",
      "logo": {
        "@type": "ImageObject",
        "url": "https://viannalegal.com.br/logo.png"
      }
    },
    "datePublished": `2024-12-${post.date.split(' ')[0]}`,
    "dateModified": `2024-12-${post.date.split(' ')[0]}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://viannalegal.com.br/blog/${post.slug}`
    },
    "url": `https://viannalegal.com.br/blog/${post.slug}`,
    "articleBody": post.content,
    "wordCount": post.content?.split(/\s+/).length || 0,
    "inLanguage": "pt-BR"
  };

  const shareUrl = `https://viannalegal.com.br/blog/${post.slug}`;
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copiado!');
    }
  };

  // Convert markdown-like content to HTML
  const formatContent = (content: string) => {
    if (!content) return '';
    
    return content
      .split('\n')
      .map(line => {
        // Headers
        if (line.startsWith('## ')) {
          return `<h2 class="text-2xl font-display font-bold text-foreground mt-10 mb-4">${line.slice(3)}</h2>`;
        }
        if (line.startsWith('### ')) {
          return `<h3 class="text-xl font-display font-semibold text-foreground mt-8 mb-3">${line.slice(4)}</h3>`;
        }
        if (line.startsWith('#### ')) {
          return `<h4 class="text-lg font-display font-semibold text-foreground mt-6 mb-2">${line.slice(5)}</h4>`;
        }
        
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
        
        // Lists
        if (line.startsWith('- ')) {
          return `<li class="ml-4 text-muted-foreground">${line.slice(2)}</li>`;
        }
        if (line.startsWith('☐ ')) {
          return `<li class="ml-4 text-muted-foreground flex items-start gap-2"><span class="text-gold">☐</span>${line.slice(2)}</li>`;
        }
        if (line.startsWith('✓ ')) {
          return `<li class="ml-4 text-muted-foreground flex items-start gap-2"><span class="text-portugal-green">✓</span>${line.slice(2)}</li>`;
        }
        if (line.startsWith('✗ ')) {
          return `<li class="ml-4 text-muted-foreground flex items-start gap-2"><span class="text-red-500">✗</span>${line.slice(2)}</li>`;
        }
        
        // Numbered lists
        if (/^\d+\.\s/.test(line)) {
          return `<li class="ml-4 text-muted-foreground">${line.replace(/^\d+\.\s/, '')}</li>`;
        }
        
        // Tables (simplified)
        if (line.startsWith('|') && line.endsWith('|')) {
          const cells = line.split('|').filter(c => c.trim());
          if (line.includes('---')) {
            return ''; // Skip separator rows
          }
          const isHeader = !line.includes('---') && cells.every(c => !c.includes('meses') && !c.includes('€'));
          if (isHeader) {
            return `<tr class="border-b border-border">${cells.map(c => `<th class="px-4 py-2 text-left font-semibold text-foreground">${c.trim()}</th>`).join('')}</tr>`;
          }
          return `<tr class="border-b border-border/50">${cells.map(c => `<td class="px-4 py-2 text-muted-foreground">${c.trim()}</td>`).join('')}</tr>`;
        }
        
        // Horizontal rule
        if (line.startsWith('---')) {
          return '<hr class="my-8 border-border" />';
        }
        
        // Empty lines
        if (line.trim() === '') {
          return '<br />';
        }
        
        // Regular paragraphs
        return `<p class="text-muted-foreground leading-relaxed mb-4">${line}</p>`;
      })
      .join('\n');
  };

  const Icon = post.icon;

  return (
    <>
      <Helmet>
        <title>{post.title} | ViannaLegal</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <meta name="keywords" content={`cidadania portuguesa, ${post.category.toLowerCase()}, ${post.title.toLowerCase().split(' ').slice(0, 5).join(', ')}`} />
        <link rel="canonical" href={`https://viannalegal.com.br/blog/${post.slug}`} />
        
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription || post.excerpt} />
        <meta property="og:url" content={`https://viannalegal.com.br/blog/${post.slug}`} />
        <meta property="article:published_time" content={`2024-12-${post.date.split(' ')[0]}`} />
        <meta property="article:author" content={post.author} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription || post.excerpt} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24">
          {/* Breadcrumb */}
          <div className="bg-muted/30 py-4">
            <div className="container-width">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors">Início</Link>
                <span>/</span>
                <Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link>
                <span>/</span>
                <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
              </nav>
            </div>
          </div>

          {/* Article Header */}
          <article className="py-12">
            <div className="container-width max-w-4xl">
              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs bg-portugal-green/10 text-portugal-green px-3 py-1 rounded-full flex items-center gap-1">
                    <Icon className="w-3 h-3" />
                    {post.category}
                  </span>
                  {post.featured && (
                    <span className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full">
                      Destaque
                    </span>
                  )}
                </div>

                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {post.title}
                </h1>

                <p className="text-xl text-muted-foreground mb-6">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y border-border py-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} de leitura</span>
                  </div>
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 hover:text-foreground transition-colors ml-auto"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Compartilhar</span>
                  </button>
                </div>
              </motion.header>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: formatContent(post.content || '') }}
              />

              {/* CTA Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-12 p-8 bg-gradient-to-br from-portugal-green/10 to-gold/10 rounded-2xl border border-border"
              >
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  Precisa de ajuda com seu processo?
                </h3>
                <p className="text-muted-foreground mb-6">
                  A ViannaLegal oferece análise gratuita do seu caso. Nossa equipe especializada 
                  pode orientar você em cada etapa do processo de cidadania portuguesa.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="gold" size="lg" asChild>
                    <a href="https://wa.me/351913134260" target="_blank" rel="noopener noreferrer">
                      Agendar análise gratuita
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/blog">
                      Ver mais artigos
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Navigation */}
              <nav className="mt-12 pt-8 border-t border-border">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  {prevPost ? (
                    <Link 
                      to={`/blog/${prevPost.slug}`}
                      className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group flex-1"
                    >
                      <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <div className="min-w-0">
                        <span className="text-xs text-muted-foreground">Artigo anterior</span>
                        <p className="font-medium text-foreground truncate">{prevPost.title}</p>
                      </div>
                    </Link>
                  ) : <div className="flex-1" />}
                  
                  {nextPost ? (
                    <Link 
                      to={`/blog/${nextPost.slug}`}
                      className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group flex-1 text-right sm:flex-row-reverse"
                    >
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <div className="min-w-0">
                        <span className="text-xs text-muted-foreground">Próximo artigo</span>
                        <p className="font-medium text-foreground truncate">{nextPost.title}</p>
                      </div>
                    </Link>
                  ) : <div className="flex-1" />}
                </div>
              </nav>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}
