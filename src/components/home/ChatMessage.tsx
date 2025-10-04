import { useState } from 'react';
import { Bot, User, ChevronDown, ChevronUp } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === 'user';
  const [isExpanded, setIsExpanded] = useState(isUser); // User messages always expanded
  
  // For assistant messages, show preview (first 150 chars)
  const shouldShowToggle = !isUser && content.length > 150;
  const displayContent = !isUser && !isExpanded && shouldShowToggle 
    ? content.substring(0, 150) + '...' 
    : content;
  
  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-tertiary-foreground" />
        </div>
      )}
      <div className="flex flex-col gap-1 max-w-[70%]">
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-tertiary text-tertiary-foreground'
              : 'bg-muted text-foreground'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{displayContent}</p>
        </div>
        {shouldShowToggle && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 px-2 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3 h-3" />
                Mostrar menos
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" />
                Leer más
              </>
            )}
          </button>
        )}
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <User className="w-5 h-5 text-primary-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
