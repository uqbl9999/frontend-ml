import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '943812976';
const WHATSAPP_MESSAGE = 'Hola, me gustaría obtener más información sobre MedAI Perú.';

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/51${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:bg-[#20BA5A] hover:scale-110 active:scale-95 cursor-pointer group"
      aria-label="Contáctanos por WhatsApp"
      title="Contáctanos por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75"></span>
        <span className="relative inline-flex h-4 w-4 rounded-full bg-[#25D366]"></span>
      </span>
    </button>
  );
}

