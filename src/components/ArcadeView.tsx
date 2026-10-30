import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import { CULTURAL_FACTS } from '../data/opportunities';
import { speakPhrase, sounds } from '../utils/audio';
import { 
  Zap, 
  RotateCcw, 
  Trophy, 
  Flame, 
  Sparkles, 
  HelpCircle,
  Play,
  Volume2
} from 'lucide-react';
import { LanguageId } from '../types';

interface SpeedWordQuestion {
  word: string;
  correct: string;
  options: string[];
}

const SPEED_WORD_DATA: Record<LanguageId, SpeedWordQuestion[]> = {
  en: [
    { word: 'Deadline', correct: 'Fecha límite', options: ['Fecha límite', 'Línea de metro', 'Horario de clase', 'Vacaciones'] },
    { word: 'Scholarship', correct: 'Beca de estudios', options: ['Beca de estudios', 'Escuela técnica', 'Profesor tutor', 'Cuaderno'] },
    { word: 'No cap', correct: 'Sin mentiras / Totalmente en serio', options: ['Sin mentiras / Totalmente en serio', 'Sin gorra', 'Con sombrero', 'Mala suerte'] },
    { word: 'Internship', correct: 'Prácticas profesionales', options: ['Prácticas profesionales', 'Examen final', 'Internet gratis', 'Graduación'] },
    { word: 'Abroad', correct: 'En el extranjero', options: ['En el extranjero', 'A bordo de un barco', 'En casa', 'Cerca de aquí'] },
    { word: 'Break a leg!', correct: '¡Buena suerte!', options: ['¡Buena suerte!', 'Rómptete una pierna', 'Cuidado al correr', 'Detente ahora'] }
  ],
  fr: [
    { word: 'Un ouf', correct: 'Un loco (Verlan)', options: ['Un loco (Verlan)', 'Un huevo', 'Un pájaro', 'Un coche'] },
    { word: 'La teuf', correct: 'La fiesta (Verlan)', options: ['La fiesta (Verlan)', 'El examen', 'El profesor', 'El viaje'] },
    { word: 'Enchanté', correct: 'Encantado de conocerte', options: ['Encantado de conocerte', 'Hechizado', 'Hasta luego', 'Por favor'] },
    { word: 'Un stage', correct: 'Prácticas laborales', options: ['Prácticas laborales', 'Un estadio', 'Un escenario', 'Un descanso'] },
    { word: 'Coup de foudre', correct: 'Amor a primera vista', options: ['Amor a primera vista', 'Golpe de trueno', 'Mal clima', 'Discusión'] }
  ],
  pt: [
    { word: 'Sextou!', correct: '¡Por fin es viernes!', options: ['¡Por fin es viernes!', 'Son las seis', 'Hace frío', 'Seis amigos'] },
    { word: 'Massa demais', correct: 'Genial / Muy bueno', options: ['Genial / Muy bueno', 'Demasiada comida', 'Muy pesado', 'Masa de pan'] },
    { word: 'Valeu!', correct: '¡Gracias! / ¡De una!', options: ['¡Gracias! / ¡De una!', 'Valió la pena', 'Cuesta mucho', 'Adiós para siempre'] },
    { word: 'Tudo bom', correct: 'Todo bien', options: ['Todo bien', 'Muy dulce', 'Todos buenos', 'Buen viaje'] },
    { word: 'Galera', correct: 'Grupo de amigos / Muchachada', options: ['Grupo de amigos / Muchachada', 'Barco de velas', 'Cárcel', 'Galería de arte'] }
  ],
  de: [
    { word: 'Ehrenmann', correct: 'Hombre de honor / Gran amigo', options: ['Hombre de honor / Gran amigo', 'Soldado', 'Profesor estricto', 'Político'] },
    { word: 'Krass', correct: 'Increíble / Impresionante', options: ['Increíble / Impresionante', 'Feo', 'Gordo', 'Aburrido'] },
    { word: 'Stipendium', correct: 'Beca de estudios', options: ['Beca de estudios', 'Universidad', 'Estudiante', 'Diploma'] },
    { word: 'Feierabend', correct: 'Fin de la jornada laboral', options: ['Fin de la jornada laboral', 'Fiesta de noche', 'Cumpleaños', 'Madrugada'] },
    { word: 'Viel Glück!', correct: '¡Mucha suerte!', options: ['¡Mucha suerte!', 'Muchas gracias', 'Feliz viaje', 'Hasta pronto'] }
  ],
  ja: [
    { word: 'Www / 草 (Kusa)', correct: 'Risa / Jajaja en chats', options: ['Risa / Jajaja en chats', 'Hierba amarga', 'Trabajo duro', 'Caminar lento'] },
    { word: 'Maji de?', correct: '¿En serio? / ¿De verdad?', options: ['¿En serio? / ¿De verdad?', '¿Qué hora es?', '¿Quién eres?', '¿Está rico?'] },
    { word: 'Oishii (美味しい)', correct: 'Delicioso / Rico', options: ['Delicioso / Rico', 'Caliente', 'Costoso', 'Pequeño'] },
    { word: 'Sugoi! (すごい)', correct: '¡Increíble! / ¡Genial!', options: ['¡Increíble! / ¡Genial!', '¡Cuidado!', '¡Adiós!', '¡Buenas noches!'] },
    { word: 'Ganbatte! (がんばって)', correct: '¡Da lo mejor de ti! / ¡Ánimo!', options: ['¡Da lo mejor de ti! / ¡Ánimo!', 'Buen provecho', 'Disculpe', 'Silencio'] }
  ],
  ko: [
    { word: '대박 (Daebak!)', correct: '¡Increíble! / ¡Locura!', options: ['¡Increíble! / ¡Locura!', 'Adiós', 'Comida rica', 'Buenas noches'] },
    { word: '화이팅! (Hwaiting!)', correct: '¡Ánimo! / ¡Tú puedes!', options: ['¡Ánimo! / ¡Tú puedes!', 'Pelea', 'Alto ahí', 'Gracias'] },
    { word: '진짜? (Jinjja?)', correct: '¿De verdad? / ¿En serio?', options: ['¿De verdad? / ¿En serio?', 'Mentira', 'Por favor', 'Mucho gusto'] },
    { word: '짱! (Jjang!)', correct: '¡El mejor! / ¡Número uno!', options: ['¡El mejor! / ¡Número uno!', 'Pequeño', 'Rápido', 'Compañero'] },
    { word: '심쿵 (Sim-kung)', correct: 'Ataque al corazón de ternura', options: ['Ataque al corazón de ternura', 'Mala suerte', 'Tropezón', 'Hambre'] }
  ]
};

// Memory Game Pairs
const MEMORY_DATA: Record<LanguageId, { native: string; spanish: string }[]> = {
  en: [
    { native: 'Opportunity', spanish: 'Oportunidad' },
    { native: 'Dream', spanish: 'Sueño' },
    { native: 'Community', spanish: 'Comunidad' },
    { native: 'Future', spanish: 'Futuro' }
  ],
  fr: [
    { native: 'Avenir', spanish: 'Futuro' },
    { native: 'Amitié', spanish: 'Amistad' },
    { native: 'Voyage', spanish: 'Viaje' },
    { native: 'Espoir', spanish: 'Esperanza' }
  ],
  pt: [
    { native: 'Sucesso', spanish: 'Éxito' },
    { native: 'Sonho', spanish: 'Sueño' },
    { native: 'Alegria', spanish: 'Alegría' },
    { native: 'Mundo', spanish: 'Mundo' }
  ],
  de: [
    { native: 'Zukunft', spanish: 'Futuro' },
    { native: 'Freiheit', spanish: 'Libertad' },
    { native: 'Freundschaft', spanish: 'Amistad' },
    { native: 'Wissen', spanish: 'Conocimiento' }
  ],
  ja: [
    { native: '夢 (Yume)', spanish: 'Sueño' },
    { native: '未来 (Mirai)', spanish: 'Futuro' },
    { native: '友達 (Tomodachi)', spanish: 'Amigo' },
    { native: '世界 (Sekai)', spanish: 'Mundo' }
  ],
  ko: [
    { native: '꿈 (Kkum)', spanish: 'Sueño' },
    { native: '미래 (Mirae)', spanish: 'Futuro' },
    { native: '친구 (Chingu)', spanish: 'Amigo' },
    { native: '희망 (Huimang)', spanish: 'Esperanza' }
  ]
};

export const ArcadeView: React.FC = () => {
  const { currentLanguage, setCurrentLanguage, addXp, addGems, profile } = useApp();
  const [activeGame, setActiveGame] = useState<'speed' | 'memory' | 'trivia'>('speed');

  // --- Speed Word Game States ---
  const [speedRunning, setSpeedRunning] = useState<boolean>(false);
  const [speedTimeLeft, setSpeedTimeLeft] = useState<number>(30);
  const [speedQuestionIndex, setSpeedQuestionIndex] = useState<number>(0);
  const [speedScore, setSpeedScore] = useState<number>(0);
  const [speedStreak, setSpeedStreak] = useState<number>(0);
  const [speedGameOver, setSpeedGameOver] = useState<boolean>(false);

  // --- Memory Game States ---
  interface Card {
    id: number;
    text: string;
    pairKey: string;
    isNative: boolean;
    isFlipped: boolean;
    isMatched: boolean;
  }
  const [memoryCards, setMemoryCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryWon, setMemoryWon] = useState<boolean>(false);

  const langInfo = LANGUAGES[currentLanguage] || LANGUAGES.en;
  const speedQuestions = SPEED_WORD_DATA[currentLanguage] || SPEED_WORD_DATA.en;

  // Speed word timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (speedRunning && speedTimeLeft > 0) {
      timer = setInterval(() => {
        setSpeedTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (speedRunning && speedTimeLeft === 0) {
      setSpeedRunning(false);
      setSpeedGameOver(true);
      addXp(speedScore * 10);
      addGems(Math.floor(speedScore / 2));
      if (profile.soundEnabled) sounds.playFanfare();
    }
    return () => clearInterval(timer);
  }, [speedRunning, speedTimeLeft]);

  const startSpeedGame = () => {
    setSpeedScore(0);
    setSpeedStreak(0);
    setSpeedQuestionIndex(0);
    setSpeedTimeLeft(30);
    setSpeedGameOver(false);
    setSpeedRunning(true);
    if (profile.soundEnabled) sounds.playClick();
  };

  const handleSpeedAnswer = (option: string) => {
    const currentQ = speedQuestions[speedQuestionIndex % speedQuestions.length];
    if (option === currentQ.correct) {
      setSpeedScore(prev => prev + 1);
      setSpeedStreak(prev => prev + 1);
      if (profile.soundEnabled) sounds.playSuccess();
    } else {
      setSpeedStreak(0);
      if (profile.soundEnabled) sounds.playError();
    }
    setSpeedQuestionIndex(prev => prev + 1);
  };

  // Memory game initialization
  const startMemoryGame = () => {
    const rawPairs = MEMORY_DATA[currentLanguage] || MEMORY_DATA.en;
    const cards: Card[] = [];
    let idCounter = 1;

    rawPairs.forEach((pair) => {
      // Native card
      cards.push({
        id: idCounter++,
        text: pair.native,
        pairKey: pair.native,
        isNative: true,
        isFlipped: false,
        isMatched: false
      });
      // Spanish card
      cards.push({
        id: idCounter++,
        text: pair.spanish,
        pairKey: pair.native,
        isNative: false,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setMemoryCards(shuffled);
    setFlippedCards([]);
    setMemoryWon(false);
    if (profile.soundEnabled) sounds.playClick();
  };

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || memoryCards[index].isFlipped || memoryCards[index].isMatched) return;

    const clickedCard = memoryCards[index];
    if (clickedCard.isNative) {
      speakPhrase(clickedCard.text, langInfo.speechCode);
    } else if (profile.soundEnabled) {
      sounds.playClick();
    }

    const updated = [...memoryCards];
    updated[index].isFlipped = true;
    setMemoryCards(updated);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const first = updated[newFlipped[0]];
      const second = updated[newFlipped[1]];

      if (first.pairKey === second.pairKey) {
        // Matched!
        setTimeout(() => {
          updated[newFlipped[0]].isMatched = true;
          updated[newFlipped[1]].isMatched = true;
          setMemoryCards([...updated]);
          setFlippedCards([]);

          if (profile.soundEnabled) sounds.playGemCollect();

          // Check if all matched
          const allMatched = updated.every(c => c.isMatched);
          if (allMatched) {
            setMemoryWon(true);
            addXp(40);
            addGems(15);
            if (profile.soundEnabled) sounds.playFanfare();
          }
        }, 400);
      } else {
        // No match, flip back
        setTimeout(() => {
          updated[newFlipped[0]].isFlipped = false;
          updated[newFlipped[1]].isFlipped = false;
          setMemoryCards([...updated]);
          setFlippedCards([]);
          if (profile.soundEnabled) sounds.playError();
        }, 900);
      }
    }
  };

  useEffect(() => {
    if (activeGame === 'memory') {
      startMemoryGame();
    }
  }, [activeGame, currentLanguage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Polyglot Arcade Juvenil</span>
            <span aria-hidden="true">·</span>
            <span>Aprende Jugando 100% Gratis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Zona de Juegos de {langInfo.name} {langInfo.flag}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            Refuerza tu vocabulario, reflejos y memoria mientras ganas XP y desbloqueas gemas para tu perfil.
          </p>
        </div>

        {/* Game Mode Selector (Functional segmented buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveGame('speed')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeGame === 'speed'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            ⚡ Palabra Veloz
          </button>
          <button
            onClick={() => setActiveGame('memory')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeGame === 'memory'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            🃏 Duelo de Memoria
          </button>
          <button
            onClick={() => setActiveGame('trivia')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeGame === 'trivia'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            🌐 Slang & Cultura
          </button>
        </div>
      </div>

      {/* GAME 1: Palabra Veloz (Speed Word Rush) */}
      {activeGame === 'speed' && (
        <div className="mt-8 max-w-2xl mx-auto">
          {!speedRunning && !speedGameOver && (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-6 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-3xl mx-auto">
                ⚡
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Palabra Veloz ({langInfo.name})
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                  Tienes 30 segundos para acertar la mayor cantidad de traducciones y palabras juveniles. ¡Encadena combos para ganar más XP!
                </p>
              </div>

              <button
                onClick={startSpeedGame}
                className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>¡Iniciar Partida!</span>
              </button>
            </div>
          )}

          {speedRunning && (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-md">
              {/* Top HUD */}
              <div className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-mono text-base">
                  <span>⏱</span>
                  <span>{speedTimeLeft}s</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-500 font-mono text-base">
                  <Flame className="w-5 h-5 fill-current" />
                  <span>Racha: x{speedStreak}</span>
                </div>
                <div className="text-slate-700 dark:text-slate-300 font-mono text-base">
                  Puntos: {speedScore}
                </div>
              </div>

              {/* Word Display with speech button */}
              {(() => {
                const currentQ = speedQuestions[speedQuestionIndex % speedQuestions.length];
                return (
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-indigo-950/40 border border-indigo-100 dark:border-slate-700 text-center space-y-2">
                      <div className="text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                        ¿Qué significa esta palabra?
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white flex items-center justify-center gap-3">
                        <span>{currentQ.word}</span>
                        <button
                          onClick={() => speakPhrase(currentQ.word, langInfo.speechCode)}
                          className="p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm text-indigo-600 hover:text-indigo-700"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentQ.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSpeedAnswer(opt)}
                          className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-500 dark:hover:border-indigo-400 text-left font-bold text-sm text-slate-800 dark:text-slate-200 transition-all active:scale-95"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {speedGameOver && (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-6 shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-3xl mx-auto">
                🏆
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  ¡Tiempo Terminado!
                </h3>
                <p className="text-sm text-slate-500">
                  Gran demostración de agilidad lingüística en {langInfo.name}.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto">
                <div>
                  <div className="text-xs text-slate-500">Aciertos</div>
                  <div className="text-2xl font-black text-indigo-600 font-mono">{speedScore}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Recompensa</div>
                  <div className="text-2xl font-black text-amber-500 font-mono">+{speedScore * 10} XP</div>
                </div>
              </div>

              <button
                onClick={startSpeedGame}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Jugar de Nuevo</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: Duelo de Memoria (Memory Match) */}
      {activeGame === 'memory' && (
        <div className="mt-8 max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Encuentra los 4 pares de vocabulario y escucha el audio nativo</span>
            <button
              onClick={startMemoryGame}
              className="flex items-center gap-1 font-bold text-indigo-600 hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar tablero</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {memoryCards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className={`min-h-[100px] p-4 rounded-2xl border text-center font-bold text-sm sm:text-base flex flex-col items-center justify-center transition-all duration-300 transform ${
                  card.isMatched
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300 opacity-90 scale-95'
                    : card.isFlipped
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 shadow-md scale-100 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-400 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <>
                    <span className="text-base sm:text-lg">{card.text}</span>
                    <span className="text-[10px] font-normal text-slate-500 mt-1">
                      {card.isNative ? '🔊 Nativo' : '🇪🇸 Español'}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl">✨</span>
                )}
              </button>
            ))}
          </div>

          {memoryWon && (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
              <div className="text-2xl">🎉 ¡Memoria Perfecta!</div>
              <p className="text-xs text-emerald-800 dark:text-emerald-200">
                Has emparejado todas las palabras en {langInfo.name}. +40 XP & +15 Gemas añadidas a tu perfil.
              </p>
              <button
                onClick={startMemoryGame}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Jugar otra ronda
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 3: Trivia Cultural & Slang */}
      {activeGame === 'trivia' && (
        <div className="mt-8 space-y-6">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Aprende cómo hablan los jóvenes en Tokio, Seúl, París, Berlín, São Paulo y Londres.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CULTURAL_FACTS.map((fact) => {
              const factLang = LANGUAGES[fact.languageId] || LANGUAGES.en;

              return (
                <div
                  key={fact.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                        <span>{factLang.flag}</span>
                        <span>{factLang.name}</span>
                      </span>
                      <span className="text-slate-400">{fact.category}</span>
                    </div>

                    <h4 className="font-bold text-base text-slate-900 dark:text-white">
                      {fact.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {fact.content}
                    </p>
                  </div>

                  {fact.examplePhrase && (
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 dark:text-white">
                          "{fact.examplePhrase.native}"
                        </span>
                        <button
                          onClick={() => speakPhrase(fact.examplePhrase!.native, factLang.speechCode)}
                          className="p-1 text-indigo-600 hover:text-indigo-700"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-slate-500 dark:text-slate-400">
                        {fact.examplePhrase.spanish}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
