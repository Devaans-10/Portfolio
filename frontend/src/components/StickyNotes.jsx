import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function StickyNotes() {
  const [notes, setNotes] = useState([
    { id: 1, text: 'Love the 3D Avatar!', x: 100, y: 100, color: 'bg-yellow-200' },
    { id: 2, text: 'Great skills chart.', x: 300, y: 150, color: 'bg-pink-200' }
  ]);
  const [newNote, setNewNote] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    if (!newNote) return;
    const colors = ['bg-yellow-200', 'bg-pink-200', 'bg-blue-200', 'bg-green-200'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setNotes([
      ...notes, 
      { 
        id: Date.now(), 
        text: newNote, 
        x: Math.random() * (window.innerWidth - 200), 
        y: Math.random() * (window.innerHeight - 200) + 100,
        color: randomColor
      }
    ]);
    setNewNote('');
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 flex gap-2">
        <form onSubmit={addNote} className="flex gap-2">
          <input 
            type="text" 
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Leave a sticky note..."
            className="px-4 py-2 rounded-lg bg-black/10 dark:bg-white/10 text-gray-900 dark:text-white backdrop-blur-md border border-black/20 dark:border-white/20 focus:outline-none focus:border-[var(--color-neon-blue)]"
          />
          <button type="submit" className="px-4 py-2 bg-[var(--color-neon-blue)] text-black font-bold rounded-lg hover:bg-white transition-colors">
            +
          </button>
        </form>
      </div>

      {notes.map(note => (
        <motion.div
          key={note.id}
          drag
          dragMomentum={false}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ x: note.x, y: note.y }}
          className={`absolute ${note.color} p-4 text-black font-sans font-medium w-48 shadow-xl cursor-grab active:cursor-grabbing z-40 transform -rotate-2 hover:rotate-0 transition-transform`}
        >
          {/* Tape */}
          <div className="w-12 h-4 bg-white/40 absolute -top-2 left-1/2 -translate-x-1/2 rotate-3 backdrop-blur-sm shadow-sm"></div>
          {note.text}
        </motion.div>
      ))}
    </>
  );
}
