import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRICULUM } from '../data/curriculum';
import { LANGUAGES } from '../data/languages';
import { Lesson, Unit } from '../types';
import { speakPhrase, sounds } from '../utils/audio';
import { 
  Check, 
  Lock, 
  Sparkles, 
  BookOpen, 
  Volume2, 
  X, 
  Heart, 
  RotateCcw, 
  ArrowRight,
  Gift,
  Trophy,
  Award,
  HelpCircle,
  Mic,
  Flame
} from 'lucide-react';

export const LessonsView: React.FC = () => {
  const { 
    currentLanguage, 
    profile, 
    completeLesson, 
    claimChest, 
    loseHeart, 
    restoreHearts, 
    addXp, 
    addGems 
  } = useApp();

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [openGuideUnit, setOpenGuideUnit] = useState<Unit | null>(null);
  const [openChestModal, setOpenChestModal] = useState<{ lesson: Lesson } | null>(null);

  // Exercise runner states
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [scrambledSelected, setScrambledSelected] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [selectedLeftPair, setSelectedLeftPair] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [isPronouncing, setIsPronouncing] = useState<boolean>(false);
  const [pronounceScore, setPronounceScore] = useState<number | null>(null);
  const [lessonCompletedModal, setLessonCompletedModal] = useState<boolean>(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);

  const units = CURRICULUM[currentLanguage] || [];
  const langInfo = LANGUAGES[currentLanguage] || LANGUAGES.en;

  // Flatten all lessons across units to know unlock sequence
  const allLessons: Lesson[] = [];
  units.forEach(u => {
    u.lessons.forEach(l => allLessons.push(l));
  });

  const isLessonCompleted = (id: string) => profile.completedLessons.includes(id);

  // Node is unlocked if it's completed, or if it's the very first node, or if the immediately preceding node is completed
  const isLessonUnlocked = (lessonId: string) => {
    const idx = allLessons.findIndex(l => l.id === lessonId);
    if (idx === 0) return true;
    if (idx === -1) return true;
    const prevLesson = allLessons[idx - 1];
    return isLessonCompleted(prevLesson.id);
  };

  const handleNodeClick = (lesson: Lesson) => {
    if (lesson.nodeType === 'chest') {
      if (isLessonCompleted(lesson.id)) {
        return; // already claimed
      }
      if (!isLessonUnlocked(lesson.id)) return;
      setOpenChestModal({ lesson });
      if (profile.soundEnabled) sounds.playGemCollect();
      return;
    }

    if (!isLessonUnlocked(lesson.id)) {
      if (profile.soundEnabled) sounds.playError();
      return;
    }

    // Toggle popover on the clicked node
    if (selectedNodeId === lesson.id) {
      startLesson(lesson);
    } else {
      setSelectedNodeId(lesson.id);
      if (profile.soundEnabled) sounds.playClick();
    }
  };

  const startLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentExerciseIndex(0);
    setCorrectAnswersCount(0);
    resetExerciseState();
    setLessonCompletedModal(false);
    setSelectedNodeId(null);
  };

  const resetExerciseState = () => {
    setSelectedOption('');
    setScrambledSelected([]);
    setMatchedPairs({});
    setSelectedLeftPair(null);
    setIsAnswerChecked(false);
    setIsAnswerCorrect(false);
    setPronounceScore(null);
  };

  const handleCheckAnswer = () => {
    if (!activeLesson) return;
    const currentEx = activeLesson.exercises[currentExerciseIndex];
    let correct = false;

    if (currentEx.type === 'multiple-choice' || currentEx.type === 'listen-and-pick' || currentEx.type === 'fill-blank') {
      correct = selectedOption.trim().toLowerCase() === currentEx.correctAnswer.trim().toLowerCase();
    } else if (currentEx.type === 'scramble') {
      correct = scrambledSelected.join(' ').trim().toLowerCase() === currentEx.correctSentence.trim().toLowerCase();
    } else if (currentEx.type === 'match-pairs') {
      correct = Object.keys(matchedPairs).length === currentEx.pairs.length;
    } else if (currentEx.type === 'pronunciation') {
      correct = true;
    }

    setIsAnswerCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      setCorrectAnswersCount(prev => prev + 1);
      if (profile.soundEnabled) sounds.playSuccess();
    } else {
      loseHeart();
    }
  };

  const handleNextExercise = () => {
    if (!activeLesson) return;
    if (currentExerciseIndex < activeLesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      resetExerciseState();
    } else {
      // Completed session
      completeLesson(activeLesson.id, activeLesson.xpReward, activeLesson.gemReward);
      setLessonCompletedModal(true);
      if (profile.soundEnabled) sounds.playFanfare();
    }
  };

  const handleMatchClick = (side: 'left' | 'right', item: string, currentEx: any) => {
    if (side === 'left') {
      setSelectedLeftPair(item);
      if (profile.soundEnabled) sounds.playClick();
    } else if (side === 'right' && selectedLeftPair) {
      const validPair = currentEx.pairs.find(
        (p: { left: string; right: string }) => p.left === selectedLeftPair && p.right === item
      );

      if (validPair) {
        setMatchedPairs(prev => ({ ...prev, [selectedLeftPair]: item }));
        setSelectedLeftPair(null);
        if (profile.soundEnabled) sounds.playGemCollect();
      } else {
        setSelectedLeftPair(null);
        if (profile.soundEnabled) sounds.playError();
      }
    }
  };

  const handleClaimChestReward = () => {
    if (!openChestModal) return;
    claimChest(openChestModal.lesson.id, openChestModal.lesson.chestReward?.gems || 25);
    setOpenChestModal(null);
  };

  // Serpentine offset curve calculation (Duolingo snake path)
  const getOffsetClass = (index: number) => {
    const step = index % 4;
    switch (step) {
      case 0: return 'translate-x-0';
      case 1: return '-translate-x-8 sm:-translate-x-12';
      case 2: return 'translate-x-0';
      case 3: return 'translate-x-8 sm:translate-x-12';
      default: return 'translate-x-0';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-12">
      
      {/* Top HUD: Hearts, Streak, Gems & Language Quick Switcher */}
      <div className="sticky top-16 z-30 py-2.5 px-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-3 text-xs sm:text-sm font-bold">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-rose-500 font-mono" title="Vidas de práctica">
            <Heart className="w-4 h-4 fill-current" />
            <span>{profile.hearts ?? 5}</span>
          </span>
          <span className="flex items-center gap-1.5 text-amber-500 font-mono" title="Racha de días de fuego">
            <Flame className="w-4 h-4 fill-current" />
            <span>{profile.streak} d</span>
          </span>
          <span className="flex items-center gap-1.5 text-emerald-500 font-mono" title="Gemas de conocimiento">
            <span>💎</span>
            <span>{profile.gems}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {profile.hearts < 5 && (
            <button
              onClick={restoreHearts}
              className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 transition-colors"
            >
              + Rellenar Vidas Gratis
            </button>
          )}
          <span className="text-slate-400">·</span>
          <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1">
            <span>{langInfo.flag}</span>
            <span className="hidden sm:inline">{langInfo.name}</span>
          </span>
        </div>
      </div>

      {/* Units & Winding Path */}
      <div className="space-y-12">
        {units.map((unit) => (
          <div key={unit.id} className="space-y-8">
            
            {/* Duolingo-style Unit Header Banner */}
            <div className={`rounded-3xl p-5 sm:p-6 bg-gradient-to-r ${unit.colorScheme.bg} text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest opacity-90">
                  <span>UNIDAD {unit.unitNumber}</span>
                  <span>·</span>
                  <span>{unit.level}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">
                  {unit.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/90 font-medium">
                  {unit.subtitle}
                </p>
              </div>

              <button
                onClick={() => setOpenGuideUnit(unit)}
                className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all self-start sm:self-center shrink-0 border border-white/20"
              >
                <BookOpen className="w-4 h-4" />
                <span>Guía de la Unidad</span>
              </button>
            </div>

            {/* Winding Stepping Stones Path */}
            <div className="relative flex flex-col items-center space-y-6 sm:space-y-8 py-4">
              {unit.lessons.map((lesson, idx) => {
                const completed = isLessonCompleted(lesson.id);
                const unlocked = isLessonUnlocked(lesson.id);
                const isSelected = selectedNodeId === lesson.id;
                const offsetClass = getOffsetClass(idx);

                return (
                  <div key={lesson.id} className={`relative flex flex-col items-center ${offsetClass}`}>
                    
                    {/* Popover Bubble above Active Node (Duolingo Style) */}
                    {isSelected && (
                      <div className="absolute -top-24 z-20 w-56 sm:w-64 p-3 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-500 shadow-xl text-center space-y-2 animate-bounce-sm">
                        <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {lesson.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {lesson.description}
                        </div>
                        <button
                          onClick={() => startLesson(lesson)}
                          className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-[0_3px_0_#059669] active:shadow-none active:translate-y-0.5 transition-all"
                        >
                          ¡Empezar +{lesson.xpReward} XP!
                        </button>
                      </div>
                    )}

                    {/* Interactive Lesson Node Button */}
                    <button
                      onClick={() => handleNodeClick(lesson)}
                      disabled={!unlocked}
                      aria-label={lesson.title}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-black transition-all ${
                        lesson.nodeType === 'chest'
                          ? completed
                            ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-b-4 border-slate-300 dark:border-slate-700 cursor-default'
                            : 'bg-amber-400 text-white border-b-4 border-amber-600 shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95'
                          : lesson.nodeType === 'trophy'
                          ? completed
                            ? 'bg-amber-400 text-white border-b-4 border-amber-600 shadow-md'
                            : unlocked
                            ? 'bg-amber-500 text-white border-b-4 border-amber-700 hover:scale-105 active:scale-95'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-b-4 border-slate-300 dark:border-slate-700 cursor-not-allowed'
                          : completed
                          ? 'bg-emerald-500 text-white border-b-4 border-emerald-700 shadow-md'
                          : unlocked
                          ? `${unit.colorScheme.accent} text-white border-b-4 ${unit.colorScheme.border} shadow-lg hover:scale-105 active:scale-95 ring-4 ring-indigo-400/20 animate-pulse-gentle`
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-b-4 border-slate-300 dark:border-slate-700 cursor-not-allowed'
                      }`}
                    >
                      {completed ? (
                        <Check className="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
                      ) : !unlocked ? (
                        <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-slate-400" />
                      ) : lesson.nodeType === 'chest' ? (
                        <Gift className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce" />
                      ) : lesson.nodeType === 'trophy' ? (
                        <Trophy className="w-7 h-7 sm:w-8 sm:h-8" />
                      ) : (
                        <span className="text-xl sm:text-2xl">{lesson.icon || '⭐'}</span>
                      )}
                    </button>

                    {/* Caption label under node */}
                    <div className="mt-1 text-[11px] font-bold text-slate-600 dark:text-slate-400 text-center max-w-[120px] truncate">
                      {lesson.title.replace(/Sesión \d+: /, '')}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

      {/* Guidebook Modal (Duolingo Style) */}
      {openGuideUnit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{openGuideUnit.icon}</span>
                <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">
                  {openGuideUnit.title}
                </h4>
              </div>
              <button
                onClick={() => setOpenGuideUnit(null)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 space-y-1">
                <div className="font-bold text-indigo-900 dark:text-indigo-300">Resumen de la Unidad:</div>
                <p>{openGuideUnit.guidebook.summary}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-slate-800 border border-emerald-100 dark:border-slate-700 space-y-1">
                <div className="font-bold text-emerald-900 dark:text-emerald-300">Punto Gramatical Clave:</div>
                <p>{openGuideUnit.guidebook.keyGrammar}</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-800 border border-amber-100 dark:border-slate-700 space-y-1">
                <div className="font-bold text-amber-900 dark:text-amber-300">Consejo Juvenil de Vocabulario:</div>
                <p>{openGuideUnit.guidebook.vocabularyTip}</p>
              </div>
            </div>

            <button
              onClick={() => setOpenGuideUnit(null)}
              className="w-full py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-xs uppercase tracking-wider"
            >
              ¡Entendido, a practicar!
            </button>
          </div>
        </div>
      )}

      {/* Chest Reward Modal */}
      {openChestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-center space-y-6 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/60 mx-auto flex items-center justify-center text-4xl shadow-md animate-bounce">
              🎁
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-slate-900 dark:text-white">
                ¡Cofre Reclamado!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                {openChestModal.lesson.chestReward?.message}
              </p>
            </div>

            <div className="text-3xl font-black text-emerald-500 font-mono">
              +{openChestModal.lesson.chestReward?.gems || 25} 💎
            </div>

            <button
              onClick={handleClaimChestReward}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-[0_4px_0_#059669] active:shadow-none active:translate-y-1"
            >
              ¡Recoger Recompensa!
            </button>
          </div>
        </div>
      )}

      {/* Duolingo Full-Screen Exercise Runner Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-slate-950 flex flex-col justify-between overflow-y-auto">
          
          {/* Header Bar: Close button, Progress bar, Hearts */}
          <div className="max-w-3xl w-full mx-auto px-4 py-4 sm:py-6 flex items-center justify-between gap-4">
            <button
              onClick={() => setActiveLesson(null)}
              aria-label="Salir de la sesión"
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg transition-colors"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Smooth animated Duolingo progress bar */}
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${((currentExerciseIndex + 1) / activeLesson.exercises.length) * 100}%` }}
              />
            </div>

            {/* Hearts indicator */}
            <div className="flex items-center gap-1.5 text-rose-500 font-black text-sm font-mono shrink-0">
              <Heart className="w-5 h-5 fill-current" />
              <span>{profile.hearts ?? 5}</span>
            </div>
          </div>

          {/* Exercise Body */}
          <div className="max-w-2xl w-full mx-auto px-4 py-6 flex-1 flex flex-col justify-center space-y-6">
            {(() => {
              const currentEx = activeLesson.exercises[currentExerciseIndex];

              return (
                <div className="space-y-6">
                  
                  {/* Mascot / Polly Dialogue Bubble */}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-2xl shrink-0 shadow-sm">
                      🌍
                    </div>
                    <div className="relative p-4 rounded-2xl rounded-tl-none bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm sm:text-base font-bold shadow-sm">
                      {currentEx.prompt}
                    </div>
                  </div>

                  {/* Multiple Choice Options */}
                  {currentEx.type === 'multiple-choice' && (
                    <div className="space-y-3 pt-2">
                      {currentEx.options.map((opt, i) => {
                        const isSelected = selectedOption === opt;
                        return (
                          <button
                            key={i}
                            disabled={isAnswerChecked}
                            onClick={() => {
                              setSelectedOption(opt);
                              if (profile.soundEnabled) sounds.playClick();
                            }}
                            className={`w-full p-4 rounded-2xl text-left font-bold text-sm sm:text-base transition-all flex items-center justify-between border-2 ${
                              isSelected
                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 shadow-[0_4px_0_#0284c7]'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 shadow-[0_4px_0_#cbd5e1] dark:shadow-[0_4px_0_#334155] hover:bg-slate-50'
                            }`}
                          >
                            <span>{opt}</span>
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center text-xs ${
                              isSelected ? 'border-sky-500 bg-sky-500 text-white' : 'border-slate-300 dark:border-slate-600'
                            }`}>
                              {isSelected ? '✓' : ''}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Scramble Words Tiles */}
                  {currentEx.type === 'scramble' && (
                    <div className="space-y-6 pt-2">
                      <div className="min-h-[72px] p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40 flex flex-wrap items-center gap-2">
                        {scrambledSelected.length === 0 ? (
                          <span className="text-xs text-slate-400 italic">
                            Toca las palabras abajo para armar la oración...
                          </span>
                        ) : (
                          scrambledSelected.map((w, idx) => (
                            <button
                              key={idx}
                              disabled={isAnswerChecked}
                              onClick={() => {
                                setScrambledSelected(prev => prev.filter((_, i) => i !== idx));
                                if (profile.soundEnabled) sounds.playClick();
                              }}
                              className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-[0_3px_0_#4338ca] active:translate-y-0.5 active:shadow-none"
                            >
                              {w} ✕
                            </button>
                          ))
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2.5 justify-center">
                        {currentEx.scrambledWords.map((w, idx) => {
                          const used = scrambledSelected.includes(w);
                          return (
                            <button
                              key={idx}
                              disabled={used || isAnswerChecked}
                              onClick={() => {
                                setScrambledSelected(prev => [...prev, w]);
                                if (profile.soundEnabled) sounds.playClick();
                              }}
                              className={`px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                                used
                                  ? 'opacity-30 border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                                  : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-[0_4px_0_#cbd5e1] dark:shadow-[0_4px_0_#334155] active:translate-y-1 active:shadow-none'
                              }`}
                            >
                              {w}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Fill Blank */}
                  {currentEx.type === 'fill-blank' && (
                    <div className="space-y-6 pt-2">
                      <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center font-black text-xl sm:text-2xl text-slate-900 dark:text-white">
                        {currentEx.sentenceWithBlank.replace('_____', selectedOption ? `[ ${selectedOption} ]` : '_______')}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {currentEx.options.map((opt, i) => (
                          <button
                            key={i}
                            disabled={isAnswerChecked}
                            onClick={() => {
                              setSelectedOption(opt);
                              if (profile.soundEnabled) sounds.playClick();
                            }}
                            className={`p-4 rounded-2xl border-2 text-center font-bold text-sm sm:text-base transition-all ${
                              selectedOption === opt
                                ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 shadow-[0_4px_0_#0284c7]'
                                : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 shadow-[0_4px_0_#cbd5e1] dark:shadow-[0_4px_0_#334155]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Match Pairs */}
                  {currentEx.type === 'match-pairs' && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="space-y-2.5">
                        {currentEx.pairs.map((p, i) => {
                          const matched = !!matchedPairs[p.left];
                          const selected = selectedLeftPair === p.left;
                          return (
                            <button
                              key={i}
                              disabled={matched || isAnswerChecked}
                              onClick={() => handleMatchClick('left', p.left, currentEx)}
                              className={`w-full p-3.5 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all ${
                                matched
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-700 opacity-60 shadow-none'
                                  : selected
                                  ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-[0_3px_0_#0284c7]'
                                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-[0_3px_0_#cbd5e1]'
                              }`}
                            >
                              {p.left}
                            </button>
                          );
                        })}
                      </div>

                      <div className="space-y-2.5">
                        {currentEx.pairs.map((p, i) => {
                          const matched = Object.values(matchedPairs).includes(p.right);
                          return (
                            <button
                              key={i}
                              disabled={matched || isAnswerChecked}
                              onClick={() => handleMatchClick('right', p.right, currentEx)}
                              className={`w-full p-3.5 rounded-xl border-2 font-bold text-xs sm:text-sm transition-all ${
                                matched
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-700 opacity-60 shadow-none'
                                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-[0_3px_0_#cbd5e1]'
                              }`}
                            >
                              {p.right}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Pronunciation */}
                  {currentEx.type === 'pronunciation' && (
                    <div className="space-y-5 p-6 rounded-2xl bg-indigo-50/50 dark:bg-slate-900 border-2 border-indigo-200 dark:border-slate-700 text-center">
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                        "{currentEx.targetPhrase}"
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {currentEx.targetTranslation}
                      </div>

                      <div className="flex items-center justify-center gap-3 pt-2">
                        <button
                          onClick={() => speakPhrase(currentEx.targetPhrase, langInfo.speechCode, false)}
                          className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-[0_3px_0_#cbd5e1]"
                        >
                          <Volume2 className="w-4 h-4 text-indigo-600" />
                          <span>Escuchar Normal</span>
                        </button>
                        <button
                          onClick={() => speakPhrase(currentEx.targetPhrase, langInfo.speechCode, true)}
                          className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-[0_3px_0_#cbd5e1]"
                        >
                          <Volume2 className="w-4 h-4 text-amber-500" />
                          <span>Lento</span>
                        </button>
                      </div>

                      <div className="pt-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                        💡 {currentEx.tipForPronouncing}
                      </div>
                    </div>
                  )}

                </div>
              );
            })()}
          </div>

          {/* Duolingo Sticky Bottom Sheet (Check & Continue) */}
          <div className={`p-4 sm:p-6 border-t-2 transition-all ${
            isAnswerChecked
              ? isAnswerCorrect
                ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-100 dark:bg-rose-950/60 border-rose-300 text-rose-900 dark:text-rose-200'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          }`}>
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {isAnswerChecked ? (
                <div className="space-y-1">
                  <div className="text-lg font-black flex items-center gap-2">
                    {isAnswerCorrect ? '🎉 ¡Excelente trabajo!' : '💔 Incorrecto'}
                  </div>
                  <div className="text-xs font-medium">
                    {activeLesson.exercises[currentExerciseIndex].explanation}
                  </div>
                </div>
              ) : (
                <div className="hidden sm:block text-xs text-slate-400 font-bold uppercase tracking-wider">
                  ¡Tú puedes!
                </div>
              )}

              <div className="w-full sm:w-auto">
                {!isAnswerChecked ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={
                      activeLesson.exercises[currentExerciseIndex].type === 'multiple-choice' && !selectedOption ||
                      activeLesson.exercises[currentExerciseIndex].type === 'fill-blank' && !selectedOption ||
                      activeLesson.exercises[currentExerciseIndex].type === 'scramble' && scrambledSelected.length === 0 ||
                      activeLesson.exercises[currentExerciseIndex].type === 'match-pairs' && Object.keys(matchedPairs).length < activeLesson.exercises[currentExerciseIndex].pairs.length
                    }
                    className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-sm uppercase tracking-wider shadow-[0_4px_0_#059669] active:shadow-none active:translate-y-1 transition-all"
                  >
                    Comprobar
                  </button>
                ) : (
                  <button
                    onClick={handleNextExercise}
                    className={`w-full sm:w-auto px-8 py-3 rounded-2xl text-white font-black text-sm uppercase tracking-wider transition-all shadow-[0_4px_0_rgba(0,0,0,0.2)] active:shadow-none active:translate-y-1 ${
                      isAnswerCorrect ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                    }`}
                  >
                    Continuar
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Lesson Completed Congratulatory Screen (Duolingo Style) */}
      {lessonCompletedModal && activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-center border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 mx-auto flex items-center justify-center text-4xl shadow-xl shadow-amber-500/30 animate-bounce">
              🏆
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                ¡Lección Completada!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Has dominado "{activeLesson.title}" en {langInfo.name}.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div>
                <div className="text-xs text-slate-500 font-bold">TOTAL XP</div>
                <div className="text-2xl font-black text-amber-500 font-mono">+{activeLesson.xpReward}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 font-bold">GEMAS</div>
                <div className="text-2xl font-black text-emerald-500 font-mono">+{activeLesson.gemReward} 💎</div>
              </div>
            </div>

            <button
              onClick={() => {
                setLessonCompletedModal(false);
                setActiveLesson(null);
              }}
              className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm uppercase tracking-wider shadow-[0_4px_0_#059669] active:shadow-none active:translate-y-1 transition-all"
            >
              Continuar Mi Ruta
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
