import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ChatMessage from './ChatMessage';
import ProductCard from './ProductCard';
import BrandCard from './BrandCard';
import { FEATURED_BRANDS } from '@/config/mockData';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const XopperAI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy Xopper AI, tu asistente de compras. ¿En qué puedo ayudarte hoy? Puedo recomendarte productos artesanales, contarte sobre nuestras marcas, o ayudarte a encontrar el regalo perfecto.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);
  const [recommendedBrands, setRecommendedBrands] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const streamChat = async (userMessage: string) => {
    const chatUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/xopper-ai-chat`;
    
    try {
      const response = await fetch(chatUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: [...messages, { role: 'user', content: userMessage }] 
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: 'Rate limit exceeded',
            description: 'Please try again in a moment.',
            variant: 'destructive',
          });
          return;
        }
        if (response.status === 402) {
          toast({
            title: 'Service unavailable',
            description: 'Please try again later.',
            variant: 'destructive',
          });
          return;
        }
        throw new Error('Failed to get response');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let assistantMessage = '';
      let streamDone = false;

      // Add empty assistant message that we'll update
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantMessage += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: 'assistant',
                  content: assistantMessage,
                };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Parse brand and product recommendations
      const hasBrands = assistantMessage.includes('BRAND_RECOMMENDATION:');
      const hasProducts = assistantMessage.includes('PRODUCT_RECOMMENDATION:');

      if (hasBrands || hasProducts) {
        // Clean the message from markers
        let cleanedMessage = assistantMessage
          .replace(/BRAND_RECOMMENDATION:\s*/g, '')
          .replace(/PRODUCT_RECOMMENDATION:\s*/g, '');
        
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            role: 'assistant',
            content: cleanedMessage,
          };
          return newMessages;
        });

        // Parse brand recommendations
        if (hasBrands) {
          const brandMatches = assistantMessage.match(/BRAND_RECOMMENDATION:\s*([^|]+)\|([^|]+)\|([^\n]+)/g);
          if (brandMatches) {
            const brands = brandMatches.map(match => {
              const parts = match.replace('BRAND_RECOMMENDATION:', '').split('|').map(p => p.trim());
              const brandData = FEATURED_BRANDS.find(b => b.name === parts[0]);
              return {
                name: parts[0],
                category: parts[1] || brandData?.category || '',
                description: parts[2] || '',
                image: brandData?.image || '/placeholder.svg',
              };
            });
            setRecommendedBrands(brands);
          }
        }

        // Parse product recommendations
        if (hasProducts) {
          const productMatches = assistantMessage.match(/PRODUCT_RECOMMENDATION:\s*([^|]+)\|([^|]+)\|([^|]+)\|([^\n]+)/g);
          if (productMatches) {
            const products = productMatches.map((match, index) => {
              const parts = match.replace('PRODUCT_RECOMMENDATION:', '').split('|').map(p => p.trim());
              return {
                id: 100 + index,
                name: parts[0],
                brand: parts[1],
                description: parts[2],
                price: parseInt(parts[3]) || 999,
                image: '/placeholder.svg',
                rating: 4.8,
                isNew: true,
              };
            });
            setRecommendedProducts(products);
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        variant: 'destructive',
      });
      // Remove the empty assistant message on error
      setMessages(prev => prev.slice(0, -1));
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    setRecommendedProducts([]);
    setRecommendedBrands([]);

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    await streamChat(userMessage);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Chat Container */}
        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
          {/* Chat Header */}
          <div className="bg-tertiary text-tertiary-foreground px-6 py-4 border-b border-border">
            <h2 className="text-xl font-semibold">Xopper AI</h2>
            <p className="text-sm opacity-90">Tu asistente personal de compras</p>
          </div>

          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} role={message.role} content={message.content} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 bg-muted/30">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 bg-card"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="bg-tertiary hover:bg-tertiary/90 text-tertiary-foreground"
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

        {/* Brand Recommendations */}
        {recommendedBrands.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Marcas Recomendadas
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedBrands.map((brand, index) => (
                <BrandCard key={index} brand={brand} />
              ))}
            </div>
          </div>
        )}

        {/* Product Recommendations */}
        {recommendedProducts.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Productos Recomendados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isLiked={likedProducts.includes(product.id)}
                  onToggleLike={toggleLike}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default XopperAI;
