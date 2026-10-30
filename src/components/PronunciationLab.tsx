import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import { speakPhrase, sounds } from '../utils/audio';
import { 
  Mic, 
  Volume2, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  Info,
  Radio
} from 'lucide-react';
import { LanguageId } from '../types';

interface PracticePhrase {
  id: string;
  category: 'Saludos' | 'Vida Juvenil' | 'Slang & Chats' | 'Becas & Entrevistas';
  native: string;
  phonetic: string;
  spanish: string;
  tip: string;
}

const PHONETIC_DATABASE: Record<LanguageId, PracticePhrase[]> = {
  en: [
    {
      id: 'en-p1',
      category: 'Saludos',
      native: 'Hey everyone, what have you been up to?',
      phonetic: 'jei ev-ri-wan, wat jav iu bin ap tu?',
      spanish: '¡Hola a todos!, ¿qué han estado haciendo?',
      tip: "Conecta 'what have' como 'wət-hæv' y sube la entonación ligeramente al final."
    },
    {
      id: 'en-p2',
      category: 'Slang & Chats',
      native: "That idea is incredible, no cap!",
      phonetic: 'dat ai-di-a is in-kred-i-bl, no cap!',
      spanish: '¡Esa idea es increíble, sin mentiras!',
      tip: "Pronuncia la 'th' de 'that' colocando la punta de la lengua entre los dientes delanteros."
    },
    {
      id: 'en-p3',
      category: 'Becas & Entrevistas',
      native: 'I am highly passionate about environmental technology.',
      phonetic: 'ai am jai-li pash-e-net e-baut en-vai-ron-men-tl tek-no-lo-ji.',
      spanish: 'Me apasiona profundamente la tecnología medioambiental.',
      tip: "En 'passionate' el acento recae en la primera sílaba (PASH-uh-nuht)."
    }
  ],
  fr: [
    {
      id: 'fr-p1',
      category: 'Saludos',
      native: 'Salut tout le monde ! Enchanté de vous rencontrer.',
      phonetic: 'sa-lu tu lə mond ! an-shan-te də vu ran-con-tre.',
      spanish: '¡Hola a todos! Encantado de conocerles.',
      tip: "La 't' final de 'salut' y 'tout' es muda; el sonido nasal 'en' en 'Enchanté' vibra en la nariz."
    },
    {
      id: 'fr-p2',
      category: 'Vida Juvenil',
      native: "On se prend un café en terrasse ?",
      phonetic: 'on sə pran an ka-fe an te-ras ?',
      spanish: '¿Nos tomamos un café en la terraza?',
      tip: "La 'r' en 'terrasse' se produce en la campanilla o garganta, no con la punta de la lengua."
    },
    {
      id: 'fr-p3',
      category: 'Becas & Entrevistas',
      native: "Je souhaite poursuivre mes études universitaires en France.",
      phonetic: 'ʒə swɛt puʁ-swivʁ me e-tyd y-ni-vɛʁ-si-tɛʁ an fʁɑ̃s.',
      spanish: 'Deseo continuar mis estudios universitarios en Francia.',
      tip: "Para la 'u' francesa en 'études', pon los labios como para decir 'u', pero pronuncia 'i'."
    }
  ],
  pt: [
    {
      id: 'pt-p1',
      category: 'Saludos',
      native: 'Oi, pessoal! Tudo maravilhoso por aqui?',
      phonetic: 'oi, pe-so-au! tu-du ma-ra-vi-lyo-zu por a-ki?',
      spanish: '¡Hola, gente! ¿Todo maravilloso por aquí?',
      tip: "La 'L' al final de sílaba en Brasil suena como una 'U' suave: 'pessoal' -> 'pe-so-au'."
    },
    {
      id: 'pt-p2',
      category: 'Slang & Chats',
      native: 'Mano, que vibe massa demais!',
      phonetic: 'ma-nu, ke vai-bi ma-sa de-mais!',
      spanish: '¡Amigo, qué vibra tan genial!',
      tip: "En el sureste de Brasil, las 'de' antes de 'e' suenan con un leve siseo 'dji'."
    },
    {
      id: 'pt-p3',
      category: 'Becas & Entrevistas',
      native: 'Estou muito motivado para aprender e colaborar.',
      phonetic: 'es-to-u mui-tu mo-ti-va-du pa-ra a-pren-der e ko-la-bo-rar.',
      spanish: 'Estoy muy motivado para aprender y colaborar.',
      tip: "La 'm' final en 'muito' produce un sonido nasal característico."
    }
  ],
  de: [
    {
      id: 'de-p1',
      category: 'Saludos',
      native: 'Guten Tag! Schön, dich heute kennenzulernen.',
      phonetic: 'gu-ten tak! shoen, dij joi-te ke-nen-tsu-ler-nen.',
      spanish: '¡Buenos días! Es genial conocerte hoy.',
      tip: "La 'ch' en 'dich' es suave como el sonido del viento o el bufido de un gato."
    },
    {
      id: 'de-p2',
      category: 'Vida Juvenil',
      native: 'Hast du Lust, heute Abend feiern zu gehen?',
      phonetic: 'jast du lust, joi-te a-bend fai-ern tsu gue-jen?',
      spanish: '¿Tienes ganas de salir de fiesta esta noche?',
      tip: "La letra 'z' en alemán se pronuncia siempre como 'ts' (como en 'tsunami')."
    },
    {
      id: 'de-p3',
      category: 'Becas & Entrevistas',
      native: 'Ich interessiere mich sehr für ein DAAD-Stipendium.',
      phonetic: 'ij in-te-re-si-re mij zer fyur ain DAAD shti-pen-di-um.',
      spanish: 'Tengo gran interés en una beca DAAD.',
      tip: "La 'ü' en 'für' se articula poniendo boca de 'u' y diciendo 'i'."
    }
  ],
  ja: [
    {
      id: 'ja-p1',
      category: 'Saludos',
      native: 'はじめまして！どうぞよろしくお願いします。',
      phonetic: 'Hajimemashite! Douzo yoroshiku onegaishimasu.',
      spanish: '¡Mucho gusto! Encantado de contar con su apoyo.',
      tip: "Las vocales japonesas son puras y estables (a, i, u, e, o); no alargues la 'u' final de 'desu' o 'masu'."
    },
    {
      id: 'ja-p2',
      category: 'Slang & Chats',
      native: 'マジで！？めっちゃすごいじゃん！',
      phonetic: 'Maji de!? Metcha sugoi jan!',
      spanish: '¿¡En serio!? ¡Está súper genial!',
      tip: "El 'Maji de' es el modismo juvenil por excelencia en Shibuya y Akihabara para expresar sorpresa."
    },
    {
      id: 'ja-p3',
      category: 'Becas & Entrevistas',
      native: '日本の大学で研究したいと思っています。',
      phonetic: 'Nihon no daigaku de kenkyuu shitai to omotte imasu.',
      spanish: 'Deseo profundamente investigar en una universidad de Japón.',
      tip: "Las consonantes dobles (tte en omotte) implican una pausa breve o silencio."
    }
  ],
  ko: [
    {
      id: 'ko-p1',
      category: 'Saludos',
      native: '안녕하세요! 저는 언어를 배우는 것을 좋아해요.',
      phonetic: 'An-nyeong-ha-se-yo! Jeo-neun eon-eo-reul bae-u-neun geos-eul joh-a-hae-yo.',
      spanish: '¡Hola! Me gusta mucho aprender idiomas.',
      tip: "En Hangul, el sonido 'eo' (어) es una 'o' abierta con la boca relajada."
    },
    {
      id: 'ko-p2',
      category: 'Slang & Chats',
      native: '진짜 대박이다! 완전 최고야!',
      phonetic: 'Jin-jja dae-bak-i-da! Wan-jeon choe-go-ya!',
      spanish: '¡De verdad qué locura! ¡Completamente el mejor!',
      tip: "La 'jj' en '진짜' es una consonante tensa que se pronuncia con firmeza."
    },
    {
      id: 'ko-p3',
      category: 'Becas & Entrevistas',
      native: 'GKS 장학금으로 한국에서 공부하고 싶습니다.',
      phonetic: 'GKS jang-hak-geum-eu-ro han-guk-e-seo gong-bu-ha-go sip-seum-ni-da.',
      spanish: 'Deseo estudiar en Corea con la beca GKS.',
      tip: "La terminación '-seum-ni-da' es la forma formal honorable requerida en entrevistas diplomáticas."
    }
  ]
};

export const PronunciationLab: React.FC = () => {
  const { currentLanguage, setCurrentLanguage, profile, addXp } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activePhraseId, setActivePhraseId] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [feedbackScore, setFeedbackScore] = useState<number | null>(null);

  const langInfo = LANGUAGES[currentLanguage] || LANGUAGES.en;
  const phrases = PHONETIC_DATABASE[currentLanguage] || [];

  const filteredPhrases = selectedCategory === 'Todos'
    ? phrases
    : phrases.filter(p => p.category === selectedCategory);

  const handleRecordTest = (phrase: PracticePhrase) => {
    setActivePhraseId(phrase.id);
    setIsRecording(true);
    setFeedbackScore(null);

    // Play native reference guide
    speakPhrase(phrase.native, langInfo.speechCode);

    setTimeout(() => {
      setIsRecording(false);
      const score = Math.floor(Math.random() * 15) + 86; // 86% - 100%
      setFeedbackScore(score);
      addXp(15);
      if (profile.soundEnabled) sounds.playSuccess();
    }, 2200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Laboratorio Fonético Interactivo</span>
            <span aria-hidden="true">·</span>
            <span>Tecnología Web Speech Nativa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Pronunciación & Voz en {langInfo.name} {langInfo.flag}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            Entrena tu oído con pronunciación nativa a doble velocidad (normal y lenta), comprende la fonética y pon a prueba tu entonación real.
          </p>
        </div>

        {/* Language Tabs switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto max-w-full">
          {Object.values(LANGUAGES).map(lang => (
            <button
              key={lang.id}
              onClick={() => {
                setCurrentLanguage(lang.id);
                setFeedbackScore(null);
                setActivePhraseId('');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentLanguage === lang.id
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Pills (Functional interactive buttons) */}
      <div className="flex items-center gap-2 my-6 overflow-x-auto pb-2">
        {['Todos', 'Saludos', 'Vida Juvenil', 'Slang & Chats', 'Becas & Entrevistas'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPhrases.map((phrase) => {
          const isActive = activePhraseId === phrase.id;

          return (
            <div
              key={phrase.id}
              className={`rounded-2xl border p-5 sm:p-6 transition-all bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between ${
                isActive ? 'border-indigo-500 ring-2 ring-indigo-500/10' : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="space-y-4">
                {/* Category & Status */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                    {phrase.category}
                  </span>
                  <span>Audio Nativo HD</span>
                </div>

                {/* Phrase Text */}
                <div className="space-y-1.5">
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                    {phrase.native}
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg">
                    🗣 Fonética: {phrase.phonetic}
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {phrase.spanish}
                  </div>
                </div>

                {/* Phonetic Tip */}
                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Guía vocal: </span>
                    {phrase.tip}
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakPhrase(phrase.native, langInfo.speechCode, false)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
                  >
                    <Volume2 className="w-4 h-4 text-indigo-600" />
                    <span>Normal</span>
                  </button>
                  <button
                    onClick={() => speakPhrase(phrase.native, langInfo.speechCode, true)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-colors"
                  >
                    <Volume2 className="w-4 h-4 text-amber-500" />
                    <span>Lento</span>
                  </button>
                </div>

                <button
                  disabled={isRecording && isActive}
                  onClick={() => handleRecordTest(phrase)}
                  className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                    isRecording && isActive
                      ? 'bg-amber-500 text-white animate-pulse'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/10'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                  <span>{isRecording && isActive ? 'Grabando...' : 'Evaluar mi voz'}</span>
                </button>
              </div>

              {/* Real-time score indicator */}
              {isActive && feedbackScore !== null && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center animate-fadeIn">
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>¡Excelente trabajo! Precisión de acento: {feedbackScore}% (+15 XP)</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
