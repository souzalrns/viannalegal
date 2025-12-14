import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+351 913 134 260',
    href: 'https://wa.me/351913134260',
  },
  {
    icon: MapPin,
    label: 'Localização',
    value: 'Lisboa, Portugal',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Horário',
    value: 'Seg-Sex: 9h às 18h',
    href: '#',
  },
];

export function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Redirect to WhatsApp with form data
    const message = `Olá! Meu nome é ${formData.name}.\n\nTelefone: ${formData.phone}\nE-mail: ${formData.email}\n\nMensagem: ${formData.message}`;
    const whatsappUrl = `https://wa.me/351913134260?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Redirecionando para WhatsApp",
      description: "Você será direcionado para conversar com um especialista.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contato" className="section-padding">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold font-medium text-sm uppercase tracking-wider mb-4 block">
              Entre em Contato
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Fale com nossos <span className="text-primary">Especialistas</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Preencha o formulário e nossa equipe entrará em contato para 
              esclarecer suas dúvidas e iniciar sua jornada rumo à cidadania europeia.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Nome completo
                  </label>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Telefone
                  </label>
                  <Input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  E-mail
                </label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Mensagem
                </label>
                <Textarea
                  placeholder="Conte-nos sobre sua descendência portuguesa..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={5}
                />
              </div>
              
              <Button type="submit" variant="gold" size="lg" className="w-full sm:w-auto">
                Enviar Mensagem
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </motion.div>

          {/* Right - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <div className="bg-primary rounded-3xl p-8 lg:p-10 text-primary-foreground h-full">
              <h3 className="font-display text-2xl font-bold mb-6">
                Informações de Contato
              </h3>
              <p className="text-primary-foreground/80 mb-8">
                Estamos prontos para ajudá-lo a realizar o sonho da cidadania europeia. 
                Entre em contato por qualquer um dos canais abaixo.
              </p>

              <div className="space-y-6 mb-10">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={info.label}
                      href={info.href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <div className="text-primary-foreground/60 text-sm">{info.label}</div>
                        <div className="font-medium group-hover:text-gold transition-colors">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* WhatsApp CTA */}
              <Button 
                variant="gold" 
                size="lg" 
                className="w-full"
                onClick={() => window.open('https://wa.me/351913134260', '_blank')}
              >
                <MessageCircle className="w-5 h-5" />
                Conversar no WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
