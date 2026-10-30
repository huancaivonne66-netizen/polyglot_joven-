import React from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import { speakPhrase, sounds } from '../utils/audio';
import { Volume2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { LanguageId } from '../types';

export const Hero: React.FC = () => {
  const { currentLanguage, setCurrentLanguage, setActiveTab, profile } = useApp();

  const handleLanguageClick = (langId: LanguageId) => {
    setCurrentLanguage(langId);
    const lang = LANGUAGES[langId];
    if (lang && profile.soundEnabled) {
      speakPhrase(lang.sampleGreeting.phrase, lang.speechCode);
    }
  };

  const currentLang = LANGUAGES[currentLanguage] || LANGUAGES.en;

  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:py-12 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Mission, Slogan, and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Mission Kicker (Clean unboxed metadata) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-indigo-700 dark:text-indigo-400">
              <span className="flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Educación Gratuita Sin Barreras Económicas
              </span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="text-slate-600 dark:text-slate-400">Web & App Móvil</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="text-slate-600 dark:text-slate-400">Para la Juventud Global</span>
            </div>

            {/* Slogan & Main Title */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
                ¡Aprende idiomas, <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
                  abre tu mundo!
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                La plataforma 100% libre para que jóvenes de todo el mundo dominen <strong>inglés, francés, portugués, alemán, japonés y coreano</strong> con lecciones interactivas, juegos arcade, laboratorio de voz y acceso a becas internacionales.
              </p>
            </div>

            {/* Language Quick Selector Cards */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <span>Elige tu idioma para comenzar hoy:</span>
                <span className="text-[11px] font-normal normal-case text-indigo-600 dark:text-indigo-400">
                  Haz clic para escuchar su saludo nativo 🔊
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {Object.values(LANGUAGES).map((lang) => {
                  const isSelected = currentLanguage === lang.id;
                  return (
                    <button
                      key={lang.id}
                      onClick={() => handleLanguageClick(lang.id)}
                      className={`group relative text-left p-2.5 sm:p-3 rounded-xl border transition-all text-sm flex items-center justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl sm:text-2xl shrink-0">{lang.flag}</span>
                        <div className="min-w-0">
                          <div className="font-bold truncate text-xs sm:text-sm">{lang.name}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate font-mono">
                            {lang.nativeName}
                          </div>
                        </div>
                      </div>

                      <div className={`p-1 rounded-md shrink-0 transition-opacity ${
                        isSelected ? 'opacity-100 text-indigo-600 dark:text-indigo-400' : 'opacity-0 group-hover:opacity-70 text-slate-400'
                      }`}>
                        <Volume2 className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Currently Selected Language Audio Card */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-indigo-100 dark:border-indigo-950/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  <span>{currentLang.flag}</span>
                  <span>{currentLang.name} juvenil</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-500 font-normal">{currentLang.stats.difficulty}</span>
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>"{currentLang.sampleGreeting.phrase}"</span>
                  <button
                    onClick={() => speakPhrase(currentLang.sampleGreeting.phrase, currentLang.speechCode)}
                    aria-label="Escuchar pronunciación nativa"
                    className="p-1 rounded-md hover:bg-indigo-50 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-mono">{currentLang.sampleGreeting.phonetic}</span>
                  <span className="mx-1.5 text-slate-300">/</span>
                  <span>{currentLang.sampleGreeting.translation}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveTab('learn')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow"
                >
                  <span>Iniciar Lección</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Key Value Propositions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>100% Gratuito de por vida</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Certificados descargables</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Bolsa de becas mundiales</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset (Generated with generate_image) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xl bg-slate-900 group">
              <img
                src="/src/assets/images/polyglot_hero_youth_1793371740992.jpg"
                alt="Jóvenes internacionales aprendiendo idiomas juntos con Polyglot Joven"
                referrerPolicy="no-referrer"
                className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

              {/* Floating Youth Testimonial Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3 sm:p-4 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-white/20 dark:border-slate-800 text-xs shadow-lg">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>🌟 Comunidad Políglota Joven</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    100% Libre
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 italic text-[11px] sm:text-xs">
                  "Gracias a Polyglot Joven aprendí los kanjis y saludos necesarios para postular a la Beca MEXT en Japón. ¡El acceso gratuito cambia vidas!"
                </p>
                <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                  — Sofía R., 19 años · Ganadora de Beca Internacional
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
