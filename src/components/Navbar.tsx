import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Mic, Gamepad2, Award, Globe2, Compass, Smartphone, Volume2, VolumeX } from 'lucide-react';
import { LANGUAGES } from '../data/languages';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentLanguage, 
    setCurrentLanguage,
    profile, 
    toggleSound, 
    isMobileFrame, 
    setIsMobileFrame 
  } = useApp();

  const currentLangInfo = LANGUAGES[currentLanguage] || LANGUAGES.en;

  return (
    <>
      {/* Top Bar strictly following the 3-Zone Contract */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg group"
          >
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              POLYGLOT JOVEN <span className="inline-block transform group-hover:rotate-12 transition-transform">🌎</span>
            </span>
          </button>

          {/* Zone 2: Concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('home')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'home'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-bold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'learn'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-bold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Cursos
            </button>
            <button
              onClick={() => setActiveTab('pronounce')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'pronounce'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-bold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Pronunciación
            </button>
            <button
              onClick={() => setActiveTab('arcade')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'arcade'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-bold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Juegos
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'exams'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-bold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Certificados
            </button>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'opportunities'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-bold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Becas Gratis
            </button>
          </nav>

          {/* Zone 3: 1 primary action cluster */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            {/* Quick language selector dropdown */}
            <div className="relative group">
              <select
                aria-label="Seleccionar idioma de estudio"
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value as any)}
                className="appearance-none bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-semibold rounded-lg pl-2.5 pr-7 py-1.5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {Object.values(LANGUAGES).map(lang => (
                  <option key={lang.id} value={lang.id}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                ▾
              </div>
            </div>

            {/* Hearts, Streak & Gems indicators (Duolingo HUD) */}
            <div className="hidden sm:flex items-center gap-2.5 text-xs font-bold tabular-nums">
              <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-1 rounded-md" title="Vidas de práctica">
                <span>❤️</span>
                <span>{profile.hearts ?? 5}</span>
              </span>
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-md" title="Racha de días de estudio">
                <span>🔥</span>
                <span>{profile.streak} d</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-md" title="Gemas de Conocimiento (100% gratuitas)">
                <span>💎</span>
                <span>{profile.gems}</span>
              </span>
            </div>

            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              aria-label={profile.soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
              title={profile.soundEnabled ? 'Sonido activado' : 'Sonido desactivado'}
              className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {profile.soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Mobile Preview Frame Toggle (desktop view) */}
            <button
              onClick={() => setIsMobileFrame(prev => !prev)}
              aria-label="Alternar vista de aplicación móvil"
              title={isMobileFrame ? 'Volver a vista web completa' : 'Ver como App Móvil'}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
                isMobileFrame 
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{isMobileFrame ? 'Vista Web' : 'Modo Móvil'}</span>
            </button>

            {/* Primary Action Button: Pasaporte Políglota */}
            <button
              onClick={() => setActiveTab('passport')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all shadow-sm ${
                activeTab === 'passport'
                  ? 'bg-indigo-600 text-white shadow-indigo-500/20'
                  : 'bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              <span className="hidden sm:inline">Pasaporte</span>
              <span className="sm:hidden font-mono">{profile.xp} XP</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Tab Bar (Ergonomic thumb-zone under 15% height cap) */}
      <nav 
        aria-label="Navegación móvil"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5"
      >
        <div className="grid grid-cols-5 items-center justify-around">
          <button
            onClick={() => setActiveTab('learn')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'learn' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Cursos</span>
          </button>

          <button
            onClick={() => setActiveTab('pronounce')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'pronounce' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Mic className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Voz</span>
          </button>

          <button
            onClick={() => setActiveTab('arcade')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'arcade' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Juegos</span>
          </button>

          <button
            onClick={() => setActiveTab('opportunities')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'opportunities' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Becas</span>
          </button>

          <button
            onClick={() => setActiveTab('passport')}
            className={`min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors ${
              activeTab === 'passport' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Progreso</span>
          </button>
        </div>
      </nav>
    </>
  );
};
