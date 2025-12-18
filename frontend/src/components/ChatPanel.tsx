// SiteRadar - Chat Panel Component (Refined)

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { chatWithAssistant } from '../services/aiService';
import { ChatIcon, CloseIcon, SendIcon } from './ui/Icons';

const ChatPanel: React.FC = () => {
  const { state, dispatch } = useApp();
  const { isChatOpen, chatMessages, selectedLocation, currentTour } = state;
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [chatMessages]);

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_CHAT' });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user' as const,
      content: input.trim(),
      timestamp: Date.now(),
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatWithAssistant(
        [...chatMessages, userMessage],
        selectedLocation || undefined,
        currentTour || undefined
      );

      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: response,
          timestamp: Date.now(),
        },
      });
    } catch {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: "I'm having trouble connecting. Please try again.",
          timestamp: Date.now(),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={handleToggle}
        data-testid="chat-toggle"
        className={`fixed bottom-5 right-5 p-3.5 rounded-full shadow-lg transition-all duration-300 z-40 ${
          isChatOpen
            ? 'scale-0 opacity-0'
            : 'scale-100 opacity-100 bg-ink-700 text-white hover:bg-ink-800'
        }`}
      >
        <ChatIcon className="w-5 h-5" />
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-5 right-5 w-[calc(100%-2.5rem)] max-w-sm h-[65vh] max-h-[480px] bg-white rounded-xl shadow-xl border border-paper-200 flex flex-col z-50 transition-all duration-300 ${
          isChatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-paper-100">
          <div>
            <h3 className="font-display text-base text-ink-700">Travel Assistant</h3>
            <p className="text-[10px] text-gold-600 font-accent italic">
              {selectedLocation ? `Exploring ${selectedLocation.name}` : 'Ask me anything'}
            </p>
          </div>
          <button
            onClick={handleToggle}
            className="p-1.5 rounded-full hover:bg-paper-100 text-ink-400 transition-colors"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {chatMessages.length === 0 && (
            <div className="text-center py-6">
              <p className="text-ink-300 text-sm">
                Ask about {selectedLocation?.name || 'any destination'}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                {['Best time to visit?', 'Local food', 'Hidden gems'].map(q => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="px-2.5 py-1 text-[11px] bg-paper-100 text-ink-500 rounded-full hover:bg-paper-200 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {chatMessages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-ink-700 text-white rounded-br-md'
                    : 'bg-paper-100 text-ink-600 rounded-bl-md'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-paper-100 px-3 py-2.5 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-ink-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-ink-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-ink-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 border-t border-paper-100">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question..."
              data-testid="chat-input"
              className="w-full pl-3 pr-10 py-2.5 bg-paper-50 border border-paper-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder:text-ink-300"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              data-testid="chat-send"
              className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-gold-500 text-white rounded-full hover:bg-gold-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <SendIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatPanel;
