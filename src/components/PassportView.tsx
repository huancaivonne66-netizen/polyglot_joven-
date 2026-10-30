import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import { 
  Award, 
  Flame, 
  Globe2, 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  Edit3, 
  Target,
  Clock,
  Shield
} from 'lucide-react';
import { LanguageId } from '../types';

interface LeaderboardUser {
  rank: number;
  name: string;
  country: string;
  avatar: string;
  xp: number;
  badge: string;
}

const GLOBAL_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Camila R.', country: 'Perú 🇵🇪', avatar: '🚀', xp: 2840, badge: 'Embajador Multilingüe' },
  { rank: 2, name: 'Mateo S.', country: 'México 🇲🇽', avatar: '🦊', xp: 2610, badge: 'Políglota Global' },
  { rank: 3, name: 'Lucas F.', country: 'Brasil 🇧🇷', avatar: '⚡', xp: 2430, badge: 'Políglota Global' },
  { rank: 4, name: 'Yuki T.', country: 'Japón 🇯🇵', avatar: '🌸', xp: 2190, badge: 'Explorador Avanzado' },
  { rank: 5, name: 'Min-jun K.', country: 'Corea 🇰🇷', avatar: '🎧', xp: 1980, badge: 'Explorador Avanzado' },
  { rank: 6, name: 'Sophie L.', country: 'Francia 🇫🇷', avatar: '🎨', xp: 1850, badge: 'Estudiante Dedicado' },
  { rank: 7, name: 'Lukas M.', country: 'Alemania 🇩🇪', avatar: '💻', xp: 1720, badge: 'Estudiante Dedicado' }
];

const AVATAR_OPTIONS = ['🚀', '🌍', '🦊', '🐱', '🎨', '💻', '⚡', '🎧', '🦁', '🦉'];

export const PassportView: React.FC = () => {
  const { profile, updateProfileName, updateAvatar, currentLanguage } = useApp();
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(profile.name);

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 100) + 1;
  };

  const currentLevel = calculateLevel(profile.xp);
  const xpInCurrentLevel = profile.xp % 100;

  const handleSaveName = () => {
    if (nameInput.trim()) {
      updateProfileName(nameInput.trim());
      setIsEditingName(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Globe2 className="w-4 h-4" />
            <span>Pasaporte Oficial del Estudiante</span>
            <span aria-hidden="true">·</span>
            <span>Seguimiento de Progreso & Logros</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Mi Pasaporte Políglota & Estadísticas
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            Monitorea tu racha de días, los sellos consulares que has desbloqueado en cada idioma y tu posición en la tabla mundial.
          </p>
        </div>
      </div>

      {/* Profile Overview Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          
          {/* Avatar & User Details */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-50 dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-3xl sm:text-4xl shadow-sm">
                {profile.avatar}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="px-2.5 py-1 text-base font-bold rounded-lg border border-indigo-400 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <button
                      onClick={handleSaveName}
                      className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold"
                    >
                      Guardar
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                      {profile.name}
                    </h3>
                    <button
                      onClick={() => setIsEditingName(true)}
                      aria-label="Editar nombre"
                      className="text-slate-400 hover:text-indigo-600 p-1 rounded"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Nivel {currentLevel}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {currentLevel >= 5 ? 'Políglota Global 🌟' : 'Explorador Joven 🚀'}
                </span>
                <span aria-hidden="true">·</span>
                <span>{profile.completedLessons.length} lecciones completadas</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics (Unboxed clean counters) */}
          <div className="flex items-center gap-4 sm:gap-6 text-center tabular-nums">
            <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 min-w-[90px]">
              <div className="text-xs text-amber-800 dark:text-amber-400 font-bold flex items-center justify-center gap-1">
                <span>🔥</span>
                <span>Racha</span>
              </div>
              <div className="text-2xl font-black text-amber-600 dark:text-amber-300 font-mono mt-0.5">
                {profile.streak} d
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 min-w-[90px]">
              <div className="text-xs text-indigo-800 dark:text-indigo-400 font-bold flex items-center justify-center gap-1">
                <span>⚡</span>
                <span>Total XP</span>
              </div>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-300 font-mono mt-0.5">
                {profile.xp}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 min-w-[90px]">
              <div className="text-xs text-emerald-800 dark:text-emerald-400 font-bold flex items-center justify-center gap-1">
                <span>💎</span>
                <span>Gemas</span>
              </div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-300 font-mono mt-0.5">
                {profile.gems}
              </div>
            </div>
          </div>

        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
            <span>Progreso hacia Nivel {currentLevel + 1}</span>
            <span className="font-mono">{xpInCurrentLevel} / 100 XP</span>
          </div>
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-500"
              style={{ width: `${xpInCurrentLevel}%` }}
            />
          </div>
        </div>

        {/* Avatar Picker */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="text-xs font-bold text-slate-500 mb-2">
            Elige tu avatar juvenil:
          </div>
          <div className="flex flex-wrap gap-2">
            {AVATAR_OPTIONS.map((av) => (
              <button
                key={av}
                onClick={() => updateAvatar(av)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                  profile.avatar === av
                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-500/30 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pasaporte Físico Virtual: Sellos Consulares */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>🛂</span>
            <span>Sellos Consulares del Pasaporte</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Cada idioma que estudias te otorga un sello diplomático juvenil en tu pasaporte.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.values(LANGUAGES).map((lang) => {
            const hasStamp = profile.unlockedStamps.includes(lang.id);

            return (
              <div
                key={lang.id}
                className={`relative rounded-2xl border p-4 text-center space-y-2 transition-all flex flex-col items-center justify-between ${
                  hasStamp
                    ? 'border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 opacity-50'
                }`}
              >
                <div className="text-3xl">{lang.flag}</div>
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {lang.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {lang.nativeName}
                  </div>
                </div>

                <div className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wider ${
                  hasStamp 
                    ? 'text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700 bg-amber-100/50' 
                    : 'text-slate-400'
                }`}>
                  {hasStamp ? '★ SELLADO' : 'PENDIENTE'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Grid: Daily Missions & Global Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Daily Missions */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              <span>Metas del Día (15 min)</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">
              {profile.todayMinutes} / {profile.dailyGoalMinutes} min
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Completar 1 lección interactiva
                  </div>
                  <div className="text-xs text-slate-500">Recompensa: +30 XP</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600">Listo</span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Jugar una ronda en Polyglot Arcade
                  </div>
                  <div className="text-xs text-slate-500">Recompensa: +20 XP · +5 Gemas</div>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-600">Por hacer</span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Practicar 3 frases de voz nativa
                  </div>
                  <div className="text-xs text-slate-500">Recompensa: +15 XP</div>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-600">Por hacer</span>
            </div>
          </div>
        </div>

        {/* Right: Global Youth Leaderboard */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span>Tabla de Clasificación Mundial</span>
            </h3>
            <span className="text-xs text-slate-500">Semana Actual</span>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
            {GLOBAL_LEADERBOARD.map((user) => (
              <div 
                key={user.rank}
                className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 text-center font-mono font-bold text-sm ${
                    user.rank === 1 ? 'text-amber-500 text-base font-black' :
                    user.rank === 2 ? 'text-slate-400 text-base font-black' :
                    user.rank === 3 ? 'text-amber-700 text-base font-black' :
                    'text-slate-400'
                  }`}>
                    {user.rank}
                  </span>
                  
                  <span className="text-2xl p-1 rounded-lg bg-slate-100 dark:bg-slate-800">{user.avatar}</span>

                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{user.name}</span>
                      <span className="text-xs text-slate-400 font-normal">{user.country}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {user.badge}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-extrabold text-sm text-indigo-600 dark:text-indigo-400">
                    {user.xp} XP
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
