// ============================================================
// CONFIGURAÇÃO CENTRAL DO SITE — ViannaLegal
// Altere aqui e muda em todo o site automaticamente
// ============================================================

export const SITE_CONFIG = {
  // Contacto
  whatsapp: {
    number: '351913134260',          // Número sem + ou espaços (formato wa.me)
    display: '+351 913 134 260',     // Formato para exibição no site
    url: 'https://wa.me/351913134260',
  },

  // Mensagens padrão WhatsApp (pré-preenchidas)
  whatsappMessages: {
    default:        'Olá! Vim pelo site e gostaria de uma análise gratuita sobre cidadania portuguesa.',
    quiz:           'Olá Kathia, fiz o quiz no site e gostaria de uma análise do meu caso.',
    contact:        'Olá! Vim pelo site e quero minha análise gratuita.',
    services:       'Olá! Quero saber qual o melhor caminho de cidadania para o meu caso.',
    benefits:       'Olá! Quero entender quais vantagens da cidadania portuguesa se aplicam ao meu caso.',
    process:        'Olá! Vi o processo completo e quero iniciar minha análise gratuita.',
    about:          'Olá! Quero entender como vocês podem acelerar meu processo.',
    faq:            'Olá! Tenho uma dúvida sobre cidadania portuguesa que não encontrei no site.',
    documents:      'Olá! Preciso de ajuda com busca de documentos para cidadania portuguesa.',
  },

  // Advogada
  lawyer: {
    name:    'Kathia Vianna',
    title:   'Advogada especialista em cidadania portuguesa',
    email:   'contato@viannalegal.com.br',
  },

  // Site
  site: {
    name:    'ViannaLegal',
    url:     'https://viannalegal.com.br',
    tagline: 'Cidadania Portuguesa para Brasileiros',
  },
} as const;

// Helper — gera URL WhatsApp com mensagem pré-preenchida
export function waUrl(message: string = SITE_CONFIG.whatsappMessages.default): string {
  return `${SITE_CONFIG.whatsapp.url}?text=${encodeURIComponent(message)}`;
}
