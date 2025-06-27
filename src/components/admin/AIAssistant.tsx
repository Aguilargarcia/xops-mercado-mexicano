
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: 'sidebar' | 'fullscreen';
}

const AIAssistant = ({ isOpen: externalIsOpen, onOpenChange, mode = 'sidebar' }: AIAssistantProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  // Usar estado externo si se proporciona, sino usar interno
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onOpenChange || setInternalIsOpen;
  
  // Historial simulado de ejemplo
  const [messages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente en Xops. ¿En qué puedo ayudarte hoy?',
      sender: 'assistant',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '2',
      text: '¿Cuáles son mis ventas esta semana?',
      sender: 'user',
      timestamp: new Date(Date.now() - 240000)
    },
    {
      id: '3',
      text: 'Según los datos de tu tienda, esta semana has vendido $3,450 MXN con 15 pedidos completados. ¿Te gustaría ver más detalles?',
      sender: 'assistant',
      timestamp: new Date(Date.now() - 180000)
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Aquí se conectaría con el modelo de IA
      console.log('Mensaje enviado:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Fullscreen mode
  if (mode === 'fullscreen' && isOpen) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-xops-blue/5 to-xops-blue/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-xops-blue rounded-full flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-archivo-black text-xops-dark">
                Tu Asistente en Xops
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Asistente en desarrollo. Muy pronto podrás hacer preguntas sobre tu tienda, inventario y más.
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
          <div className="space-y-6">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-6 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-xops-blue text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-base leading-relaxed">{msg.text}</p>
                    <span className={`text-sm mt-3 block ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {msg.timestamp.toLocaleTimeString('es-MX', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Mensaje de estado en desarrollo */}
            <div className="text-center py-12">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-50 border border-amber-200 rounded-full text-amber-700">
                <Zap className="w-5 h-5" />
                <span className="font-medium">Conectando con IA...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Input de mensaje */}
        <div className="p-8 border-t border-gray-100 bg-gray-50/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-4">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta..."
                className="flex-1 border-gray-200 focus:border-xops-blue focus:ring-xops-blue/20 bg-white h-12 text-base"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-xops-blue hover:bg-xops-blue/90 text-white px-6 h-12"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-3 text-center">
              Presiona Enter para enviar • Shift + Enter para nueva línea
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Sidebar mode (Sheet)
  return (
    <Sheet open={isOpen && mode === 'sidebar'} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md p-0 bg-white border-l border-gray-200">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 border-b border-gray-100 bg-gradient-to-r from-xops-blue/5 to-xops-blue/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-xops-blue rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <SheetTitle className="text-xl font-archivo-black text-xops-dark">
                  Tu Asistente en Xops
                </SheetTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Asistente en desarrollo. Muy pronto podrás hacer preguntas sobre tu tienda, inventario y más.
                </p>
              </div>
            </div>
          </SheetHeader>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-xops-blue text-white rounded-br-sm'
                        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <span className={`text-xs mt-2 block ${
                      msg.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {msg.timestamp.toLocaleTimeString('es-MX', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Mensaje de estado en desarrollo */}
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-sm">
                <Zap className="w-4 h-4" />
                <span>Conectando con IA...</span>
              </div>
            </div>
          </div>

          {/* Input de mensaje */}
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex gap-3">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu pregunta..."
                className="flex-1 border-gray-200 focus:border-xops-blue focus:ring-xops-blue/20 bg-white"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-xops-blue hover:bg-xops-blue/90 text-white px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Presiona Enter para enviar • Shift + Enter para nueva línea
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIAssistant;
