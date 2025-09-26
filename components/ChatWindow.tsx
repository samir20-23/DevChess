
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

    // Simulate opponent's reply
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
    <div className="w-full bg-gray-900 p-4 rounded-lg shadow-lg border border-gray-700 flex flex-col h-[calc(100vh-4rem-70vh)] min-h-[300px] max-h-[500px] md:h-auto md:max-h-full">
      <h2 className="text-2xl font-bold mb-4 text-center">In-Game Chat</h2>
      <div className="flex-grow bg-gray-800 rounded-md p-2 overflow-y-auto mb-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex flex-col mb-2 ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
            <div className={`rounded-lg px-3 py-2 max-w-[80%] ${msg.sender === 'You' ? 'bg-blue-600' : 'bg-gray-600'}`}>
              <p className="text-white">{msg.text}</p>
            </div>
            <span className="text-xs text-gray-400 mt-1">{msg.sender}, {msg.timestamp}</span>
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
          className="flex-grow bg-gray-700 text-white rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
