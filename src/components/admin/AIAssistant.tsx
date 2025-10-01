import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  mode?: 'fullscreen' | 'sidebar';
  context?: {
    productsCount?: number;
    ordersCount?: number;
    currentPage?: string;
    [key: string]: any;
  };
}

const AIAssistant = ({ 
  isOpen: controlledIsOpen, 
  onOpenChange, 
  mode = 'sidebar',
  context 
}: AIAssistantProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hola, soy tu asistente inteligente para Xops Admin. Puedo ayudarte con análisis de ventas, gestión de inventario, reportes de rendimiento y recomendaciones basadas en datos. ¿En qué puedo ayudarte?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setInternalIsOpen(false);
    }
  };

  const streamChat = async (userMessage: string) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-ai-chat`;
    
    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: messages
            .filter(m => m.id !== '1')
            .map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }))
            .concat([{ role: 'user', content: userMessage }]),
          context 
        }),
      });

      if (!resp.ok) {
        if (resp.status === 429 || resp.status === 402) {
          const error = await resp.json();
          throw new Error(error.error);
        }
        throw new Error("Failed to start stream");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantText = "";

      const assistantMessageId = Date.now().toString();
      setMessages(prev => [...prev, {
        id: assistantMessageId,
        text: "",
        sender: 'assistant',
        timestamp: new Date()
      }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantText += content;
              setMessages(prev => prev.map(m => 
                m.id === assistantMessageId 
                  ? { ...m, text: assistantText }
                  : m
              ));
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw || raw.startsWith(":") || !raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantText += content;
              setMessages(prev => prev.map(m => 
                m.id === assistantMessageId 
                  ? { ...m, text: assistantText }
                  : m
              ));
            }
          } catch { /* ignore */ }
        }
      }

    } catch (error) {
      console.error("Error streaming chat:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get AI response",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      await streamChat(userMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (mode === 'fullscreen' && isOpen) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-xops-blue/5 to-xops-blue/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-xops-blue rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-archivo text-tertiary-blue">Asistente IA de Xops</h1>
              <p className="text-sm text-gray-600 mt-1">
                Análisis inteligente, recomendaciones y gestión operativa
              </p>
            </div>
          </div>
          <Button
            onClick={handleClose}
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-4 max-w-4xl mx-auto">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' ? 'bg-xops-blue' : 'bg-tertiary/20'
                  }`}>
                    {message.sender === 'assistant' && <Bot className="w-5 h-5 text-tertiary" />}
                    {message.sender === 'user' && <span className="text-white text-sm">U</span>}
                  </div>
                  <div className={`rounded-2xl p-4 ${
                    message.sender === 'user' 
                      ? 'bg-xops-blue text-white' 
                      : 'bg-gray-100 text-tertiary-blue'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex gap-3 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-tertiary/20">
                    <Bot className="w-5 h-5 text-tertiary" />
                  </div>
                  <div className="rounded-2xl p-4 bg-gray-100">
                    <Loader2 className="w-5 h-5 animate-spin text-tertiary" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="max-w-4xl mx-auto flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pregunta sobre ventas, inventario, reportes..."
              className="flex-1 border-gray-200 focus:border-xops-blue"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage}
              size="icon"
              className="bg-xops-blue hover:bg-xops-blue/90 rounded-full"
              disabled={isLoading || !inputValue.trim()}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Sheet open={isOpen && mode === 'sidebar'} onOpenChange={onOpenChange || setInternalIsOpen}>
      <SheetContent className="w-full sm:max-w-md p-0 bg-white">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-gray-100 bg-gradient-to-r from-xops-blue/5 to-xops-blue/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-xops-blue rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <SheetTitle className="text-xl font-archivo text-tertiary-blue">Asistente IA</SheetTitle>
                <p className="text-sm text-gray-600 mt-1">
                  Tu asistente administrativo inteligente
                </p>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user' ? 'bg-xops-blue' : 'bg-tertiary/20'
                    }`}>
                      {message.sender === 'assistant' && <Bot className="w-5 h-5 text-tertiary" />}
                      {message.sender === 'user' && <span className="text-white text-sm">U</span>}
                    </div>
                    <div className={`rounded-2xl p-4 ${
                      message.sender === 'user' 
                        ? 'bg-xops-blue text-white' 
                        : 'bg-gray-100 text-tertiary-blue'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-tertiary/20">
                      <Bot className="w-5 h-5 text-tertiary" />
                    </div>
                    <div className="rounded-2xl p-4 bg-gray-100">
                      <Loader2 className="w-5 h-5 animate-spin text-tertiary" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pregunta algo..."
                className="flex-1 border-gray-200 focus:border-xops-blue"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage}
                size="icon"
                className="bg-xops-blue hover:bg-xops-blue/90 rounded-full"
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIAssistant;
