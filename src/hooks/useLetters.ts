import { useState, useEffect } from 'react';
import { letters as initialLetters } from '../data/letters';

export interface Letter {
  id: number;
  title: string;
  date: string;
  preview: string;
  content: string;
}

export function useLetters() {
  const [letters, setLetters] = useState<Letter[]>(() => {
    const saved = localStorage.getItem('journey-letters');
    return saved ? JSON.parse(saved) : initialLetters;
  });

  useEffect(() => {
    localStorage.setItem('journey-letters', JSON.stringify(letters));
  }, [letters]);

  const addLetter = (letter: Omit<Letter, 'id'>) => {
    const newLetter = {
      ...letter,
      id: Date.now(), // Simple ID generation
    };
    setLetters(prev => [newLetter, ...prev]);
  };

  const updateLetter = (id: number, updatedLetter: Omit<Letter, 'id'>) => {
    setLetters(prev => prev.map(l => l.id === id ? { ...updatedLetter, id } : l));
  };

  const deleteLetter = (id: number) => {
    setLetters(prev => prev.filter(l => l.id !== id));
  };

  return {
    letters,
    addLetter,
    updateLetter,
    deleteLetter
  };
}
