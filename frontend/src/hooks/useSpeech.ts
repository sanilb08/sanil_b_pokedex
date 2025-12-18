// SiteRadar - Enhanced TTS Hook with Female Voice
// Voice: Soft, intellectual, whispering, slightly sensual

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseSpeechReturn {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  pause: () => void;
  resume: () => void;
  isSupported: boolean;
}

export const useSpeech = (): UseSpeechReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stop = useCallback(() => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, [isSupported]);

  const speak = useCallback((text: string) => {
    if (!isSupported) return;
    
    stop();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    // Configure for soft, intimate female voice
    utterance.rate = 0.85;     // Slower for intimacy
    utterance.pitch = 1.15;    // Slightly higher for femininity
    utterance.volume = 0.9;    // Slightly softer, like whispering
    
    // Find the best female English voice
    const voices = window.speechSynthesis.getVoices();
    
    // Priority list for premium female voices
    const preferredVoiceNames = [
      'Samantha',           // macOS - Natural, warm
      'Karen',              // macOS Australian - Soft
      'Moira',              // macOS Irish - Gentle
      'Google UK English Female',
      'Microsoft Zira',     // Windows - Pleasant
      'Microsoft Hazel',    // Windows UK - Softer
      'Google US English',  // Falls back to female
      'Fiona',              // macOS Scottish
      'Victoria',           // macOS
    ];
    
    let selectedVoice = null;
    
    // Try to find a preferred voice
    for (const name of preferredVoiceNames) {
      selectedVoice = voices.find(v => 
        v.name.includes(name) && v.lang.startsWith('en')
      );
      if (selectedVoice) break;
    }
    
    // Fallback: find any English female voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => 
        v.lang.startsWith('en') && 
        (v.name.toLowerCase().includes('female') ||
         v.name.includes('Samantha') ||
         v.name.includes('Karen') ||
         v.name.includes('Zira') ||
         v.name.includes('Hazel'))
      );
    }
    
    // Final fallback: any English voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.startsWith('en'));
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    window.speechSynthesis.speak(utterance);
  }, [isSupported, stop]);

  const pause = useCallback(() => {
    if (isSupported && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSupported, isSpeaking]);

  const resume = useCallback(() => {
    if (isSupported && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isSupported, isPaused]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  // Preload voices
  useEffect(() => {
    if (isSupported) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, [isSupported]);

  return { speak, stop, isSpeaking, isPaused, pause, resume, isSupported };
};
