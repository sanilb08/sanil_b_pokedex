// SiteRadar - Chat Panel Component

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
    } catch (err) {
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again.",
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
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg transition-all duration-300 z-40 ${
          isChatOpen
            ? 'scale-0 opacity-0'
            : 'scale-100 opacity-100 bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/30'
        }`}
      >
        <ChatIcon className="w-6 h-6" />
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-6 right-6 w-[calc(100%-3rem)] max-w-sm h-[70vh] max-h-[500px] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col z-50 transition-all duration-300 ${
          isChatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-100">
          <div>
            <h3 className="font-display font-bold text-stone-800">Travel Assistant</h3>
            <p className="text-[10px] text-amber-600 font-hand">
              {selectedLocation ? `Exploring ${selectedLocation.name}` : 'Ask me anything'}
            </p>
          </div>
          <button
            onClick={handleToggle}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatMessages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-stone-400 text-sm">
                Ask me about {selectedLocation?.name || 'any destination'}!
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {['Best time to visit?', 'Local food tips', 'Hidden gems nearby'].map(q => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="px-3 py-1.5 text-xs bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100 transition-colors"
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
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-white rounded-br-md'
                    : 'bg-stone-100 text-stone-700 rounded-bl-md'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-stone-100 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-stone-100">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question..."
              data-testid="chat-input"
              className="w-full pl-4 pr-12 py-3 bg-stone-50 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              data-testid="chat-send"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-amber-500 text-white rounded-full hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SendIcon className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatPanel;
