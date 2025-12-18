import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { ChatBubbleIcon, CloseIcon, SendIcon } from './icons';
import { Spinner } from './Spinner';

interface ChatBotProps {
  isOpen: boolean;
  onToggle: () => void;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isTyping: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onToggle, messages, onSendMessage, isTyping }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <>
      <button
        onClick={onToggle}
        className={`fixed bottom-6 right-6 bg-accent text-white p-4 rounded-full shadow-lg hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-transform duration-200 ease-in-out ${isOpen ? 'transform scale-0' : 'transform scale-100'}`}
        aria-label="Open chat"
      >
        <ChatBubbleIcon className="h-8 w-8" />
      </button>

      <div className={`fixed bottom-6 right-6 w-[calc(100%-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-surface dark:bg-gray-800 rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold">Travel Assistant</h3>
          <button onClick={onToggle} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Close chat">
            <CloseIcon className="h-6 w-6" />
          </button>
        </header>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-accent text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-primary dark:text-gray-100 rounded-bl-none'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-end gap-2 justify-start">
                  <div className="max-w-[80%] px-4 py-3 rounded-2xl bg-gray-200 dark:bg-gray-700 rounded-bl-none">
                      <div className="flex items-center justify-center space-x-1">
                          <span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="h-1.5 w-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                      </div>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="w-full pr-12 pl-4 py-2.5 border dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-accent text-white rounded-full hover:bg-accent-hover disabled:bg-blue-300" disabled={!input.trim()}>
              <SendIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatBot;