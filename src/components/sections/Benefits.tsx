import {
  Plane,
  GraduationCap,
  Briefcase,
  Heart,
  Building,
  Shield,
  TrendingUp,
  Globe2,
  ArrowRight,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG, waUrl } from '@/config/site';

const benefits = [
  {
    icon: Plane,
    title: 'O mundo inteiro sem pedir permissão',
    description: 'EUA, Canadá, Japão, toda a Europa — 190+ países sem visto, sem entrevista, sem ansiedade de recusa.',
  },
  {
    icon: Globe2,
    title: 'Morar e trabalhar em 27 países',
    description: 'Qualquer país da União Europeia — hoje, daqui a 10 anos, ou quando os seus filhos decidirem ir.',
  },
  {
    icon: Briefcase,
    title: 'Carreira sem fronteiras',
    description: 'Emprego em Lisboa, Berlim, Amsterdã ou Paris — sem visto de trabalho, sem burocracia, sem espera.',
  },
  {
    icon: GraduationCap,
    title: 'Universidade europeia pelo preço brasileiro',
    description: 'Seus filhos estudam nas melhores universidades da Europa pagando as mesmas taxas que os europeus — até 10x menos.',
  },
  {
    icon: Heart,
    title: 'Saúde pública de verdade',
    description: 'Acesso ao sistema nacional de saúde em Portugal e ao Cartão Europeu de Saúde em qualquer país da UE.',
  },
  {
    icon: Shield,
    title: 'Estabilidade para a família',
    description: 'Portugal é um dos países mais seguros do mundo. Uma segunda base para a família — por se nunca precisar, mas por ter.',
  },
  {
    icon: TrendingUp,
    title: 'Negócios no mercado europeu',
    description: 'Abrir empresa, investir e operar em qualquer país da UE — sem restrições, no maior mercado único do mundo.',
  },
  {
    icon: Home,
    title: 'Casa própria em Portugal com juros europeus',
    description: 'Crédito habitacional em Portugal com taxas até 3x menores que no Brasil. Para quem sonha em morar lá.',
  },
];

export function Benefits() {
  return (
    <section id="vantagens" className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="container-width relative">
        {/* Section Header */}
        <div
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
            Vantagens
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            O que essa herança <span className="text-gold">abre para a sua família?</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg">
            Um único documento abre 27 países de oportunidades — para você e para as próximas
            gerações da sua família.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-primary-foreground/5 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/30 transition-colors">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-primary-foreground/70 text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Closing CTA — this section previously had no conversion path */}
        <div
          className="text-center"
        >
          <p className="text-primary-foreground/80 mb-5">
            Cada uma dessas portas passa para os seus filhos — e para os filhos deles.
          </p>
          <Button
            variant="gold"
            size="lg"
            onClick={() => window.open(
                '${SITE_CONFIG.whatsapp.url}?text=${encodeURIComponent("Olá! Quero entender quais vantagens da cidadania portuguesa se aplicam ao meu caso.")}',
                '_blank',
                'noopener,noreferrer'
)
            }
          >
            Quero abrir essas portas para a minha família
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
