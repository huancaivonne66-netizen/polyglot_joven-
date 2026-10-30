import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SCHOLARSHIPS } from '../data/opportunities';
import { LANGUAGES } from '../data/languages';
import { 
  Compass, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  CheckCircle, 
  Copy, 
  BookOpen, 
  HeartHandshake,
  GraduationCap
} from 'lucide-react';
import { LanguageId } from '../types';

export const OpportunitiesView: React.FC = () => {
  const { currentLanguage, setCurrentLanguage } = useApp();
  const [filterLang, setFilterLang] = useState<string>('all');
  const [activeTabSub, setActiveTabSub] = useState<'scholarships' | 'cv-guide' | 'interview-sim'>('scholarships');
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);

  const filteredScholarships = filterLang === 'all'
    ? SCHOLARSHIPS
    : SCHOLARSHIPS.filter(s => s.languageId === filterLang);

  const sampleMotivationLetter = `Estimado Comité de Selección,

Mi nombre es [Tu Nombre] y tengo [Tu Edad] años. Les escribo para expresar mi más profundo entusiasmo y postulación a la beca [Nombre de la Beca / Universidad].

Desde muy joven he tenido la convicción de que los idiomas derriban fronteras y transforman realidades. A través de la plataforma gratuita Polyglot Joven he desarrollado mis competencias comunicativas en [Idioma Meta], alcanzando un nivel de autonomía que me permite comprender conferencias y colaborar con compañeros de diversas culturas.

Mi objetivo académico es especializarme en [Tu Área de Interés: ej. Tecnología, Ciencias, Artes, Desarrollo Sostenible], para luego regresar a mi comunidad y liderar proyectos de impacto social que brinden oportunidades a más jóvenes.

Agradezco sinceramente su tiempo y consideración de mi candidatura.

Atentamente,
[Tu Nombre Completo]
[Tu Ciudad y País]`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sampleMotivationLetter);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <GraduationCap className="w-4 h-4" />
            <span>Misión Social Polyglot Joven</span>
            <span aria-hidden="true">·</span>
            <span>Acceso 100% Gratuito al Mundo</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Becas & Oportunidades Globales para Jóvenes
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            Eliminamos las barreras económicas para que ningún joven con talento se quede atrás. Descubre becas con 100% de cobertura, guías de postulación y modelos de cartas.
          </p>
        </div>

        {/* Sub-nav tabs (Functional interactive buttons) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTabSub('scholarships')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTabSub === 'scholarships'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Directorio de Becas
          </button>
          <button
            onClick={() => setActiveTabSub('cv-guide')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTabSub === 'cv-guide'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Plantilla de Motivación
          </button>
          <button
            onClick={() => setActiveTabSub('interview-sim')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTabSub === 'interview-sim'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Simulador de Entrevista
          </button>
        </div>
      </div>

      {/* SUB-VIEW 1: Scholarships Directory */}
      {activeTabSub === 'scholarships' && (
        <div className="mt-8 space-y-6">
          {/* Language filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setFilterLang('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                filterLang === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              Todas las Oportunidades ({SCHOLARSHIPS.length})
            </button>
            {Object.values(LANGUAGES).map(lang => (
              <button
                key={lang.id}
                onClick={() => setFilterLang(lang.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors ${
                  filterLang === lang.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>

          {/* Scholarships Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredScholarships.map((opp) => {
              const oppLang = LANGUAGES[opp.languageId] || LANGUAGES.en;

              return (
                <div
                  key={opp.id}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                        <span>{oppLang.flag}</span>
                        <span>{opp.country}</span>
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {opp.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug">
                      {opp.title}
                    </h3>

                    <div className="text-xs text-slate-500 font-medium">
                      Ofrecido por: {opp.institution}
                    </div>

                    {/* Coverage Highlight */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                      <div className="font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Cobertura Financiera:</span>
                      </div>
                      <p>{opp.coverage}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {opp.description}
                    </p>

                    {/* Requirements */}
                    <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <div className="font-bold text-slate-800 dark:text-slate-200">Requisitos Clave:</div>
                      <ul className="space-y-1 pl-4 list-disc">
                        {opp.requirements.map((req, rIdx) => (
                          <li key={rIdx}>{req}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Youth Tip */}
                    <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 text-xs text-indigo-900 dark:text-indigo-200">
                      <span className="font-bold">💡 Consejo para Jóvenes: </span>
                      {opp.tipsForYouth}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                    <div className="text-xs text-slate-500 font-mono">
                      📅 {opp.deadline}
                    </div>

                    <a
                      href={opp.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Web Oficial</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-VIEW 2: Motivation Letter Guide */}
      {activeTabSub === 'cv-guide' && (
        <div className="mt-8 max-w-3xl mx-auto space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Plantilla Gratuita: Carta de Motivación Internacional
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                La carta de motivación (Statement of Purpose) es el 70% del éxito en una beca. Utiliza esta estructura probada por jóvenes que ya ganaron becas MEXT, GKS, DAAD y Erasmus.
              </p>
            </div>

            <div className="relative">
              <pre className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-sans text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                {sampleMotivationLetter}
              </pre>

              <button
                onClick={copyToClipboard}
                className="absolute top-4 right-4 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                {copiedTemplate ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTemplate ? '¡Copiado!' : 'Copiar Plantilla'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                <div className="font-bold text-slate-900 dark:text-white mb-1">1. Sé Auténtico</div>
                <div className="text-slate-500">Cuenta tu historia real y cómo superaste dificultades con ganas de aprender.</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                <div className="font-bold text-slate-900 dark:text-white mb-1">2. Menciona el Idioma</div>
                <div className="text-slate-500">Demuestra que ya estás aprendiendo el idioma de forma autodidacta.</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                <div className="font-bold text-slate-900 dark:text-white mb-1">3. Impacto Comunitario</div>
                <div className="text-slate-500">Explica cómo compartirás tus conocimientos con otros jóvenes a tu regreso.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: Interview Simulator */}
      {activeTabSub === 'interview-sim' && (
        <div className="mt-8 max-w-3xl mx-auto space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Simulador de Entrevista para Becas
              </h3>
              <p className="text-sm text-slate-500">
                Las preguntas más frecuentes de los comités de embajadas y cómo responderlas con solvencia:
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                  Pregunta 1: "¿Por qué elegiste este país y este idioma específicamente?"
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <strong>Estrategia recomendada:</strong> No respondas solo "porque me gusta el anime/fútbol/música". Conecta la cultura con una meta académica o profesional concreta (ej. innovación tecnológica, políticas de salud, diseño o relaciones comerciales bilaterales).
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                  Pregunta 2: "¿Cómo afrontarás el choque cultural y el estar lejos de tu familia?"
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <strong>Estrategia recomendada:</strong> Menciona tu capacidad de adaptación, tu práctica con jóvenes internacionales en comunidades de idiomas y tu entusiasmo por aprender costumbres locales respetuosamente.
                </p>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                  Pregunta 3: "¿Cuáles son tus planes después de graduarte con esta beca?"
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <strong>Estrategia recomendada:</strong> Los países donantes buscan construir puentes. Destaca cómo fomentarás la cooperación entre tu país de origen y el país que te becó.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
