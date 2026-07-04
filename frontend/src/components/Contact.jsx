import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'AI', text: 'Hello! I am Devaans’ AI assistant. Ask me anything about his work.' }
  ]);
  const [userQuery, setUserQuery] = useState('');

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const toBinary = (str) => {
    return str.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  };

  const sendBinaryMessage = (e) => {
    e.preventDefault();
    if (!message) return;
    alert(`Message sent to Devaans!\nBinary Payload: ${toBinary(message)}`);
    setMessage('');
  };

  const sendChatMessage = (e) => {
    e.preventDefault();
    if (!userQuery) return;
    
    const newChatLog = [...chatLog, { sender: 'User', text: userQuery }];
    setChatLog(newChatLog);
    setUserQuery('');

    // Simulate AI response for now
    setTimeout(() => {
      setChatLog([...newChatLog, { sender: 'AI', text: 'That is interesting! Devaans is currently working on an NLP project that handles similar queries.' }]);
    }, 1000);
  };

  return (
    <section className="py-20 px-8 w-full min-h-screen flex flex-col md:flex-row gap-12 justify-center max-w-7xl mx-auto">
      
      {/* Binary Message Encoder */}
      <div className="w-full md:w-1/2 glass-panel p-8 rounded-2xl flex flex-col">
        <h2 className="text-3xl font-bold font-mono text-[var(--color-neon-pink)] mb-6">
          Terminal Contact
        </h2>
        
        <form onSubmit={sendBinaryMessage} className="flex flex-col flex-grow">
          <textarea 
            value={message}
            onChange={handleMessageChange}
            placeholder="Type your message here..."
            className="w-full bg-white/50 dark:bg-black/50 border border-[var(--color-neon-pink)] rounded-lg p-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-pink)] mb-4 h-32 resize-none font-mono"
          />
          
          <div className="flex-grow bg-gray-100 dark:bg-black/80 rounded-lg p-4 overflow-hidden mb-6 font-mono text-green-500 text-sm break-words whitespace-pre-wrap">
            {message ? toBinary(message) : '01000010 01101001 01101110 01100001 01110010 01111001 00100000 01001111 01110101 01110100 01110000 01110101 01110100'}
          </div>

          <button type="submit" className="w-full py-3 bg-transparent border-2 border-[var(--color-neon-pink)] text-[var(--color-neon-pink)] font-bold rounded-full hover:bg-[var(--color-neon-pink)] hover:text-black transition-all">
            ENCODE & SEND
          </button>
        </form>
      </div>

      {/* AI Chatbot */}
      <div className="w-full md:w-1/2 glass-panel p-8 rounded-2xl flex flex-col h-[600px]">
        <h2 className="text-3xl font-bold font-mono text-[var(--color-neon-blue)] mb-6 flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[var(--color-neon-blue)] animate-pulse"></span>
          AI Assistant
        </h2>
        
        <div className="flex-grow bg-white/50 dark:bg-black/50 rounded-lg p-4 overflow-y-auto mb-4 flex flex-col gap-4">
          {chatLog.map((chat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg max-w-[80%] ${chat.sender === 'AI' ? 'bg-[var(--color-neon-blue)]/20 text-[var(--color-neon-blue)] self-start' : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white self-end'}`}
            >
              <p className="text-sm">{chat.text}</p>
            </motion.div>
          ))}
        </div>

        <form onSubmit={sendChatMessage} className="flex gap-2">
          <input 
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Ask a question..."
            className="flex-grow bg-white/50 dark:bg-black/50 border border-[var(--color-neon-blue)] rounded-full px-4 text-gray-900 dark:text-white focus:outline-none"
          />
          <button type="submit" className="px-6 py-2 bg-[var(--color-neon-blue)] text-black font-bold rounded-full hover:bg-white transition-colors">
            Ask
          </button>
        </form>
      </div>

    </section>
  );
}
