import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact';
import SecretLab from './components/SecretLab';
import StickyNotes from './components/StickyNotes';
import useVoiceNavigation from './hooks/useVoiceNavigation';

export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('dark');

  const { isListening, toggleListening, transcript } = useVoiceNavigation();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''} transition-colors duration-500`}>
          <div className="min-h-screen bg-gray-100 dark:bg-[var(--color-dark-bg)] text-gray-900 dark:text-white transition-colors duration-500">
            <Routes>
            <Route path="/" element={
              <main>
                <Hero />
                <Projects />
                <Skills />
                <Resume />
                <Contact />
                <SecretLab />
                <StickyNotes />
                
                {/* Voice Navigation HUD */}
                <button 
                  onClick={toggleListening}
                  className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg z-50 transition-all ${isListening ? 'bg-red-500 animate-pulse' : 'bg-[var(--color-neon-blue)]'}`}
                >
                  <span className="text-2xl text-black">🎤</span>
                </button>
                {isListening && transcript && (
                  <div className="fixed bottom-24 right-6 bg-black/80 text-white p-3 rounded-lg border border-[var(--color-neon-blue)] z-50 pointer-events-none">
                    Heard: "{transcript}"
                  </div>
                )}
              </main>
            } />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
