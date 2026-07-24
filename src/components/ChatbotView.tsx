import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, Loader2, ShieldAlert } from 'lucide-react';
import { ChatMessage } from '../types';

export const ChatbotView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'bot',
      text: 'Hello! I am HealthMate AI, your personal health assistant powered by Gemini. Ask me anything about nutrition, exercise routines, sleep hygiene, or wellness tracking!',
      timestamp: 'Just now',
    },
  ]);

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const quickPills = [
    'How much water should I drink daily?',
    'What are good pre-workout snack ideas?',
    'Tips to improve deep sleep quality',
    'How do I calculate target heart rate?'
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `b_${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'I am here to support your health journey!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (e) {
      const botMsg: ChatMessage = {
        id: `b_${Date.now()}`,
        sender: 'bot',
        text: 'I am HealthMate AI. Staying hydrated with 2.5L of water daily and getting 7-8 hours of quality sleep are key pillars for vitality and recovery. How else can I assist your health routine today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-20">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-outline-light dark:border-outline-dark pb-4">
        <div className="p-3 rounded-2xl bg-primary text-on-primary shadow-sm">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-on-surface-light dark:text-on-surface-dark flex items-center gap-2">
            AI Health Chatbot
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Gemini
            </span>
          </h1>
          <p className="text-xs text-on-surface-variant-light dark:text-on-surface-variant-dark">
            Conversational AI for instant health guidance, fitness advice, and nutrition tips.
          </p>
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="rounded-3xl bg-surface-light dark:bg-surface-dark border border-outline-light dark:border-outline-dark p-4 sm:p-6 shadow-sm min-h-[420px] max-h-[500px] overflow-y-auto flex flex-col space-y-4">
        
        {messages.map((m) => {
          const isUser = m.sender === 'user';

          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 max-w-[85%] ${
                isUser ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs ${
                  isUser ? 'bg-indigo-600' : 'bg-primary'
                }`}
              >
                {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed space-y-1 ${
                  isUser
                    ? 'bg-primary text-on-primary rounded-tr-xs'
                    : 'bg-surface-variant-light dark:bg-surface-variant-dark text-on-surface-light dark:text-on-surface-dark rounded-tl-xs border border-outline-light/40 dark:border-outline-dark/40'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`text-[10px] block text-right font-medium opacity-70 ${
                    isUser ? 'text-on-primary' : 'text-on-surface-variant-light dark:text-on-surface-variant-dark'
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-xs font-semibold text-primary p-3 rounded-2xl bg-primary/10 w-fit">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>HealthMate AI is formulating response...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {quickPills.map((pill, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(pill)}
            className="px-3 py-1.5 rounded-full bg-surface-variant-light dark:bg-surface-variant-dark hover:bg-primary/10 text-xs font-semibold text-on-surface-light dark:text-on-surface-dark hover:text-primary whitespace-nowrap transition-all border border-outline-light/40 dark:border-outline-dark/40"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask HealthMate AI anything about health, diet, or fitness..."
          className="flex-1 px-5 py-3.5 rounded-full border border-outline-light dark:border-outline-dark bg-surface-light dark:bg-surface-dark text-sm font-semibold text-on-surface-light dark:text-on-surface-dark focus:ring-2 ring-primary focus:outline-hidden shadow-xs"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-6 py-3.5 rounded-full bg-primary text-on-primary font-bold text-sm shadow-md hover:bg-primary-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>

      {/* Bottom Medical Note */}
      <div className="p-3 rounded-2xl bg-surface-variant-light/40 dark:bg-surface-variant-dark/40 text-[11px] text-on-surface-variant-light dark:text-on-surface-variant-dark flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
        <span>Notice: HealthMate AI provides general health wellness insights. Always consult a licensed healthcare professional for medical conditions.</span>
      </div>

    </div>
  );
};
