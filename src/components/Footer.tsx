import React from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import { Globe2, Heart } from 'lucide-react';
import { LanguageId } from '../types';

export const Footer: React.FC = () => {
  const { setActiveTab, setCurrentLanguage } = useApp();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 pb-20 md:pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>POLYGLOT JOVEN 🌎</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
              Plataforma educativa 100% gratuita para que jóvenes de todo el mundo aprendan idiomas de manera fácil, interactiva y divertida.
            </p>
            <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              ¡Aprende idiomas, abre tu mundo!
            </div>
          </div>

          {/* Languages quick links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Cursos Disponibles
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {Object.values(LANGUAGES).map(lang => (
                <li key={lang.id}>
                  <button
                    onClick={() => {
                      setCurrentLanguage(lang.id as LanguageId);
                      setActiveTab('learn');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name} ({lang.nativeName})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Recursos Abiertos
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('opportunities');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Directorio de Becas Completas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('pronounce');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Laboratorio de Pronunciación
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('arcade');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Polyglot Arcade Juvenil
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('exams');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Certificados Gratuitos
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} POLYGLOT JOVEN · Creado con</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current inline mx-0.5" />
            <span>para la juventud global sin fronteras</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Educación Gratuita Universal</span>
            <span aria-hidden="true">·</span>
            <span>Acceso Web & Móvil</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
