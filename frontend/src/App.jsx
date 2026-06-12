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

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  const { isListening, toggleListening, transcript } = useVoiceNavigation();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Router>
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-[var(--color-dark-bg)] text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-500`}>
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
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
