import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

export function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="bg-gradient-to-r from-portugal-green to-portugal-red text-white py-3 px-4 relative"
    >
      <div className="container-width flex items-center justify-center gap-3 text-center">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <p className="text-sm md:text-base font-medium">
          <span className="font-bold">ATUALIZAÇÃO 2026:</span>{' '}
          <span className="hidden sm:inline">
            Lei Orgânica 1/2026 em vigor: residência sobe para 7 anos e bisnetos já podem pedir nacionalidade direto.{' '}
          </span>
          <span className="sm:hidden">Lei 2026: novidades para bisnetos e residência. </span>
          <a
            href="https://wa.me/351913134260?text=Olá! Vi a atualização sobre a Lei Orgânica 1/2026 e quero saber meu prazo."
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline font-semibold"
          >
            Descubra seu prazo agora →
          </a>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="Fechar banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
