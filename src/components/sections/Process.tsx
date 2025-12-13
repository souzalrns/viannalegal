import { motion } from 'framer-motion';
import { 
  MessageCircle, 
  FileSearch, 
  AlertCircle, 
  HelpCircle, 
  FileText, 
  Handshake,
  CheckCircle,
  FolderOpen,
  Send,
  Eye,
  PartyPopper
} from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: MessageCircle,
    title: 'Histórico Familiar',
    description: 'Escutamos atentamente seu histórico familiar para estabelecer o vínculo da descendência.',
  },
  {
    number: 2,
    icon: FileSearch,
    title: 'Verificação de Registros',
    description: 'Verificamos se você possui ou conhece o local de registro dos nascimentos e casamentos.',
  },
  {
    number: 3,
    icon: AlertCircle,
    title: 'Identificação de Problemas',
    description: 'Identificamos eventuais problemas de reconhecimento pela legislação portuguesa.',
  },
  {
    number: 4,
    icon: HelpCircle,
    title: 'Esclarecimento de Dúvidas',
    description: 'Esclarecemos todas as suas dúvidas sobre o processo de obtenção da cidadania.',
  },
  {
    number: 5,
    icon: FileText,
    title: 'Proposta de Honorários',
    description: 'Enviamos a proposta de honorários de forma transparente e detalhada.',
  },
  {
    number: 6,
    icon: Handshake,
    title: 'Contratação',
    description: 'Após a contratação, enviamos a procuração e orientações iniciais.',
  },
  {
    number: 7,
    icon: CheckCircle,
    title: 'Análise de Certidões',
    description: 'Realizamos análise detalhada das certidões para garantir autenticidade e conformidade.',
  },
  {
    number: 8,
    icon: FolderOpen,
    title: 'Montagem do Processo',
    description: 'Montamos o processo com todos os documentos necessários e recolhemos as taxas exigidas.',
  },
  {
    number: 9,
    icon: Send,
    title: 'Distribuição do Processo',
    description: 'Realizamos a distribuição do processo junto aos órgãos competentes.',
  },
  {
    number: 10,
    icon: Eye,
    title: 'Acompanhamento',
    description: 'Acompanhamos de perto todo o processo até a conclusão do registro.',
  },
  {
    number: 11,
    icon: PartyPopper,
    title: 'Cidadão Europeu!',
    description: 'Parabéns! Você se torna oficialmente um cidadão europeu e pode requerer seu passaporte.',
  },
];

export function Process() {
  return (
    <section id="processo" className="section-padding">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
            Como Funciona
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Fale com um <span className="text-primary">Especialista</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Ao entrar em contato conosco, seguimos uma série de passos para garantir 
            o melhor entendimento e sucesso no processo de obtenção da cidadania.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border hidden lg:block transform -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative flex items-center lg:items-stretch ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isLeft ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                    <div className={`bg-card p-6 rounded-2xl shadow-subtle border border-border/50 inline-block ${isLeft ? 'lg:ml-auto' : ''}`}>
                      <div className={`flex items-center gap-4 mb-3 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-gold" />
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-sm max-w-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Number */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground items-center justify-center font-display font-bold text-lg shadow-medium z-10">
                    {step.number}
                  </div>

                  {/* Mobile Number */}
                  <div className="lg:hidden w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-sm shrink-0 mr-4">
                    {step.number}
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
