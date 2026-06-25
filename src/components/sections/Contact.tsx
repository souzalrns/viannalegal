import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAnalytics } from '@/hooks/useAnalytics';
import { SITE_CONFIG, waUrl } from '@/config/site';
import { useAnalytics } from '@/hooks/useAnalytics';

const contactInfo = [
  { icon: Phone,  label: 'WhatsApp',   value: SITE_CONFIG.whatsapp.display, href: SITE_CONFIG.whatsapp.url },
  { icon: MapPin, label: 'Localização', value: 'Lisboa, Portugal', href: '#' },
  { icon: Clock,  label: 'Horário',     value: 'Seg-Sex: 9h às 18h', href: '#' },
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export function Contact() {
  const { toast } = useToast();
  const { trackConversion, trackEvent, trackPixelLead } = useAnalytics();

  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});

  // Validação inline
  const validate = () => {
    const e: Partial<typeof formData> = {};
    if (formData.name.trim().length < 2)           e.name    = 'Informe seu nome completo.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'E-mail inválido.';
    if (formData.message.trim().length < 10)        e.message = 'Escreva uma mensagem com pelo menos 10 caracteres.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('submitting');

    try {
      // Netlify Forms — funciona sem backend, só precisa do atributo data-netlify
      const body = new URLSearchParams({
        'form-name': 'contato-viannalegal',
        ...formData,
      });

      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (res.ok) {
        setFormState('success');
        trackConversion('lead_form', { page: '/' });
        trackPixelLead({ content_name: 'Formulário Contato' });
        // Também abre WhatsApp como backup imediato
        const msg = `Olá! Meu nome é ${formData.name}.\n\nTelefone: ${formData.phone}\nE-mail: ${formData.email}\n\nMensagem: ${formData.message}`;
        window.open(`${SITE_CONFIG.whatsapp.url}?text=${encodeURIComponent("${encodeURIComponent(msg")})}`, '_blank', 'noopener,noreferrer');
      } else {
        throw new Error('Falha no envio');
      }
    } catch {
      // Fallback: redirecionar para WhatsApp mesmo se o email falhar
      setFormState('error');
      trackEvent('form_error', { section: 'contact' });
      const msg = `Olá! Meu nome é ${formData.name}.\n\nTelefone: ${formData.phone}\nE-mail: ${formData.email}\n\nMensagem: ${formData.message}`;
      window.open(`${SITE_CONFIG.whatsapp.url}?text=${encodeURIComponent("${encodeURIComponent(msg")})}`, '_blank', 'noopener,noreferrer');
      toast({
        title: 'Redirecionando para WhatsApp',
        description: 'Sua mensagem foi enviada via WhatsApp como alternativa.',
      });
    }
  };

  const field = (
    id: keyof typeof formData,
    label: string,
    type = 'text',
    placeholder = ''
  ) => (
    <div>
      <label htmlFor={`contact-${id}`} className="text-sm font-medium text-foreground mb-2 block">
        {label}{id !== 'phone' && <span className="text-gold ml-1" aria-hidden="true">*</span>}
      </label>
      <Input
        id={`contact-${id}`}
        type={type}
        placeholder={placeholder}
        value={formData[id]}
        onChange={(e) => {
          setFormData(p => ({ ...p, [id]: e.target.value }));
          if (errors[id]) setErrors(p => ({ ...p, [id]: undefined }));
        }}
        required={id !== 'phone'}
        className={`h-12 ${errors[id] ? 'border-red-400 focus-visible:ring-red-400' : ''}`}
        aria-describedby={errors[id] ? `err-${id}` : undefined}
        aria-invalid={!!errors[id]}
      />
      {errors[id] && (
        <p id={`err-${id}`} className="text-red-500 text-xs mt-1" role="alert">{errors[id]}</p>
      )}
    </div>
  );

  const { trackWhatsAppClick } = useAnalytics();

  return (
    <section id="contato" className="section-padding">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Formulário */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
              Entre em Contato
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sua cidadania começa com uma{' '}
              <span className="text-primary">conversa de 15 minutos</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Preencha o formulário ou fale direto no WhatsApp. Um especialista analisa seu
              caso e te diz exatamente qual é o caminho mais rápido — sem custo nessa etapa.
            </p>

            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center"
              >
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  Mensagem recebida!
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Recebemos o seu contacto e um especialista responderá em até 24h.<br />
                  Também abrimos o WhatsApp para uma resposta mais rápida.
                </p>
              </motion.div>
            ) : (
              /* Netlify Forms: data-netlify="true" e o campo hidden form-name são obrigatórios */
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
                name="contato-viannalegal"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                noValidate
              >
                {/* Honeypot anti-spam (oculto) */}
                <input type="hidden" name="form-name" value="contato-viannalegal" />
                <div className="hidden" aria-hidden="true">
                  <label>Não preencher: <input name="bot-field" /></label>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {field('name',  'Nome completo',  'text', 'Seu nome')}
                  {field('phone', 'Telefone',       'tel',  '(11) 99999-9999')}
                </div>
                {field('email', 'E-mail', 'email', 'seu@email.com')}

                <div>
                  <label htmlFor="contact-message" className="text-sm font-medium text-foreground mb-2 block">
                    Mensagem <span className="text-gold ml-1" aria-hidden="true">*</span>
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="Conte-nos sobre sua descendência portuguesa..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData(p => ({ ...p, message: e.target.value }));
                      if (errors.message) setErrors(p => ({ ...p, message: undefined }));
                    }}
                    required
                    rows={5}
                    className={errors.message ? 'border-red-400' : ''}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1" role="alert">{errors.message}</p>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  <span className="text-gold">*</span> Campos obrigatórios
                </p>

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto min-h-[48px]"
                  disabled={formState === 'submitting'}
                >
                  {formState === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Quero minha análise gratuita
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Info lateral */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:pl-8">
            <div className="bg-primary rounded-3xl p-8 lg:p-10 text-primary-foreground h-full flex flex-col">
              <h3 className="font-display text-2xl font-bold mb-6">Prefere falar agora?</h3>
              <p className="text-primary-foreground/80 mb-8">
                O WhatsApp é o canal mais rápido. A maioria das análises iniciais é respondida
                em poucas horas, em horário comercial.
              </p>

              <div className="space-y-6 mb-10">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <a key={info.label} href={info.href} className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <div className="text-primary-foreground/60 text-sm">{info.label}</div>
                        <div className="font-medium group-hover:text-gold transition-colors">{info.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-auto">
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full min-h-[52px]"
                  onClick={() => {
                    trackConversion('lead_whatsapp', { section: 'contact' });
                    window.open(SITE_CONFIG.whatsapp.url, '_blank', 'noopener,noreferrer');
                  }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Conversar no WhatsApp agora
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
