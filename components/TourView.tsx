
import React, { useState, useRef, useCallback, useMemo } from 'react';
import { TourGuide, GroundingSource, Place } from '../types';
import { generateAudio } from '../services/geminiService';
import { decode, decodeAudioData } from '../utils/audio';
import { PlayIcon, PauseIcon, MapPinIcon, LinkIcon, BookmarkIcon, BookmarkSolidIcon, DownloadIcon } from './icons';
import { Spinner } from './Spinner';

interface TourViewProps {
  place: Place;
  tourGuide: TourGuide;
  grounding: GroundingSource[];
  passport: Place[];
  onAddToPassport: (place: Place) => void;
  onRemoveFromPassport: (placeName: string) => void;
}

const TourView: React.FC<TourViewProps> = ({ place, tourGuide, grounding, passport, onAddToPassport, onRemoveFromPassport }) => {
  const isSaved = useMemo(() => passport.some(p => p.name === place.name), [passport, place]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [stepError, setStepError] = useState<{ index: number; message: string } | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleBookmarkClick = () => {
    if (isSaved) onRemoveFromPassport(place.name);
    else onAddToPassport(place);
  };

  const cleanupAudio = useCallback(() => {
      if (audioSourceRef.current) {
          audioSourceRef.current.stop();
          audioSourceRef.current.disconnect();
          audioSourceRef.current = null;
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close();
          audioContextRef.current = null;
      }
      setIsPlaying(false);
      setPlayingIndex(null);
  }, []);

  const handlePlayPause = async (index: number, script: string) => {
    if (isPlaying && playingIndex === index) {
        cleanupAudio();
        return;
    }
    if(isPlaying) cleanupAudio();

    setIsAudioLoading(true);
    setStepError(null);
    setPlayingIndex(index);
    setActiveStepIndex(index);

    try {
        if (!audioContextRef.current || audioContextRef.current.state === 'closed') {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const base64Audio = await generateAudio(script);
        const audioBytes = decode(base64Audio);
        const audioBuffer = await decodeAudioData(audioBytes, audioContextRef.current, 24000, 1);
        
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContextRef.current.destination);
        source.onended = () => { if (playingIndex === index) cleanupAudio(); };
        source.start();
        audioSourceRef.current = source;
        setIsPlaying(true);
    } catch (err) {
        console.error(err);
        setStepError({ index, message: 'Audio playback failed.' });
        cleanupAudio();
    } finally {
        setIsAudioLoading(false);
    }
  };
    
  return (
    <div className="animate-in fade-in duration-700 h-full flex flex-col">
      <div className="flex justify-between items-start pb-6 border-b border-gray-100">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-display font-extrabold text-primary leading-tight tracking-tight">
            {tourGuide.title}
          </h2>
          <p className="mt-3 text-lg font-body text-secondary leading-relaxed">
            {tourGuide.intro_script}
          </p>
        </div>
        <div className="flex items-center gap-3 ml-6 flex-shrink-0">
            <button 
              onClick={handleBookmarkClick}
              className={`p-3 rounded-full transition-all ${isSaved ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-50 text-gray-400 hover:text-yellow-600'}`}
              title={isSaved ? 'Remove from Passport' : 'Save to Passport'}
            >
              {isSaved ? <BookmarkSolidIcon className="h-6 w-6" /> : <BookmarkIcon className="h-6 w-6" />}
            </button>
        </div>
      </div>
      
       <div className="mt-8 flex-1 overflow-hidden flex flex-col">
         <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-bold text-primary">Your Route</h3>
            <span className="font-hand text-sm text-accent rotate-[-2deg]">Explore at your own pace...</span>
         </div>

         <ul className="flex-1 overflow-y-auto space-y-6 pr-4 -mr-4 scrollbar-hide">
            {tourGuide.tour_steps.map((step, stepIdx) => (
                <li key={step.title} ref={el => stepRefs.current[stepIdx] = el}>
                  <div 
                    onClick={() => setActiveStepIndex(stepIdx)}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 
                    ${activeStepIndex === stepIdx ? 'bg-white border-accent shadow-xl shadow-accent/5' : 'bg-muted border-transparent hover:border-gray-200'}`}
                  >
                     <div className="flex items-start gap-5">
                       <div className={`mt-1 h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors
                          ${activeStepIndex === stepIdx ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'}`}>
                          {stepIdx + 1}
                       </div>
                       <div className="flex-1">
                          <h4 className="font-display font-bold text-lg text-primary">{step.title}</h4>
                          <div className="flex items-center text-accent/70 mt-1">
                             <MapPinIcon className="h-3 w-3 mr-1" />
                             <span className="text-[10px] font-bold uppercase tracking-widest">{step.location_description}</span>
                          </div>
                          <p className="mt-4 text-base font-body text-secondary leading-relaxed antialiased">
                            {step.script}
                          </p>
                       </div>
                     </div>
                      <div className="mt-6 flex items-center gap-4 pl-14">
                        <button
                          onClick={(e) => { e.stopPropagation(); handlePlayPause(stepIdx, step.script) }}
                          disabled={isAudioLoading && playingIndex === stepIdx}
                          className={`flex items-center gap-2 px-6 py-2.5 text-sm font-bold rounded-full transition-all shadow-sm
                            ${playingIndex === stepIdx && isPlaying ? 'bg-primary text-white' : 'bg-accent text-white hover:bg-accent-hover'}`}
                        >
                          {isAudioLoading && playingIndex === stepIdx ? (
                             <><Spinner className="h-4 w-4 border-white"/> Generating...</>
                          ) : isPlaying && playingIndex === stepIdx ? (
                            <><PauseIcon className="h-4 w-4" /> Stop Audio</>
                          ) : (
                            <><PlayIcon className="h-4 w-4" /> Hear This Story</>
                          )}
                        </button>
                        {stepError && playingIndex === stepIdx && <p className="text-red-500 text-xs font-hand">{stepError.message}</p>}
                      </div>
                  </div>
                </li>
            ))}
            
            <li className="pt-6">
                <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 border-dashed">
                    <div className="flex items-start gap-5">
                        <div className="mt-1 h-9 w-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <LinkIcon className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                           <h3 className="text-lg font-display font-bold text-primary">Traveler's References</h3>
                           <p className="mt-1 text-xs font-body text-secondary italic">Fact-checked via Google Maps Grounding.</p>
                           <div className="mt-4 flex flex-wrap gap-3">
                            {grounding.length > 0 ? grounding.map(source => (
                                <a href={source.uri} key={source.uri} target="_blank" rel="noopener noreferrer" 
                                   className="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-accent font-body text-xs font-bold hover:shadow-md transition-shadow">
                                    <MapPinIcon className="h-3 w-3 mr-2" />
                                    <span>{source.title}</span>
                                </a>
                            )) : <p className="text-secondary font-hand text-sm">No external map links needed for this tour.</p>}
                           </div>
                        </div>
                    </div>
                </div>
            </li>
         </ul>
      </div>
    </div>
  );
};

export default TourView;
