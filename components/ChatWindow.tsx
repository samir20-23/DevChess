import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: ChatMessage = {
      sender: 'You',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const replies = ["Good move!", "Nice!", "Hmm, interesting.", "🤔", "Let's see...", "You're good at this!"];
      const opponentMessage: ChatMessage = {
        sender: 'Opponent',
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, opponentMessage]);
    }, 1000 + Math.random() * 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const EMOJI_REACTIONS = ['👍', '👎', '🎉', '🔥', '😂', '😮'];

  const handleReaction = (emoji: string) => {
     const reactionMessage: ChatMessage = {
      sender: 'You',
      text: emoji,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, reactionMessage]);
  };

  return (
    <div className="w-full p-4 rounded-lg flex flex-col h-[400px]" style={{ backgroundColor: 'var(--bg-secondary)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-primary)'}}>
      <h2 className="text-xl font-bold mb-4 text-center border-b pb-2" style={{borderColor: 'var(--border-primary)'}}>In-Game Chat</h2>
      <div className="flex-grow rounded-md p-2 overflow-y-auto mb-3" style={{backgroundColor: 'var(--bg-primary)'}}>
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col mb-2 ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
            <div 
              className={`rounded-lg px-3 py-2 max-w-[80%]`}
              style={{
                backgroundColor: msg.sender === 'You' ? 'var(--chat-bubble-user)' : 'var(--chat-bubble-opponent)',
              }}
            >
              <p style={{ color: msg.sender === 'You' ? 'var(--chat-bubble-user-text)' : 'var(--chat-bubble-opponent-text)' }}>{msg.text}</p>
            </div>
            <span className="text-xs mt-1" style={{ color: 'var(--text-secondary)'}}>{msg.sender}, {msg.timestamp}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

       <div className="flex justify-center space-x-2 my-2">
        {EMOJI_REACTIONS.map(emoji => (
          <button key={emoji} onClick={() => handleReaction(emoji)} className="text-2xl hover:scale-125 transition-transform">
            {emoji}
          </button>
        ))}
      </div>

      <div className="flex mt-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-grow rounded-l-md p-2 focus:outline-none focus:ring-2"
          // Fix: Cast style object to React.CSSProperties to allow for custom CSS properties.
          style={{ 
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            '--tw-ring-color': 'var(--accent-primary)'
          } as React.CSSProperties}
        />
        <button
          onClick={handleSend}
          className="font-bold py-2 px-4 rounded-r-md transition-colors bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)]"
          style={{ color: 'var(--text-inverted)' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;