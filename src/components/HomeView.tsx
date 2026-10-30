import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import { SCHOLARSHIPS } from '../data/opportunities';
import { speakPhrase, sounds } from '../utils/audio';
import { 
  ArrowRight, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Mic, 
  Gamepad2, 
  Award, 
  Globe2, 
  BookOpen,
  Zap,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { LanguageId } from '../types';

export const HomeView: React.FC = () => {
  const { setCurrentLanguage, setActiveTab, profile } = useApp();
  const [interactiveLang, setInteractiveLang] = useState<LanguageId>('ja');
  const [testerPhraseIndex, setTesterPhraseIndex] = useState<number>(0);

  const samplePhrases: Record<LanguageId, { native: string; phonetic: string; spanish: string; tip: string }> = {
    en: {
      native: 'Hey! Nice to meet you, what\'s your dream?',
      phonetic: 'jei! nais tu mit iu, wat-s iur drim?',
      spanish: '¡Hola! Mucho gusto en conocerte, ¿cuál es tu sueño?',
      tip: "Pronuncia 'dream' con una 'd' suave y 'r' retrofleja."
    },
    fr: {
      native: 'Bonjour ! Bienvenue dans le monde polyglotte.',
      phonetic: 'bon-zhur ! bi-en-ve-nu dan lə mond po-li-glot.',
      spanish: '¡Hola! Bienvenido al mundo políglota.',
      tip: "La 'j' en 'Bonjour' suena como un suave zumbido /ʒ/."
    },
    pt: {
      native: 'E aí, galera! Bora aprender juntos?',
      phonetic: 'e ai, ga-le-ra! bo-ra a-pren-der jun-tus?',
      spanish: '¿Qué onda, amigos? ¿Vamos a aprender juntos?',
      tip: "'Bora' es la contracción juvenil de 'vamos embora'."
    },
    de: {
      native: 'Hallo! Willkommen in der Zukunft des Lernens.',
      phonetic: 'ja-lo! vil-ko-men in der tsu-kunft des ler-nens.',
      spanish: '¡Hola! Bienvenido al futuro del aprendizaje.',
      tip: "La 'W' en 'Willkommen' se pronuncia como la 'V' labiodental."
    },
    ja: {
      native: 'こんにちは！一緒に新しい世界を開きましょう。',
      phonetic: 'Konnichiwa! Issho ni atarashii sekai o hirakimashou.',
      spanish: '¡Hola! Abramos juntos un nuevo mundo.',
      tip: "La 'o' en 'issho' se pronuncia pura y breve."
    },
    ko: {
      native: '안녕하세요! 당신의 꿈을 응원합니다. 화이팅!',
      phonetic: 'An-nyeong-ha-se-yo! Dang-sin-ui kkum-eul eung-won-ham-ni-da. Hwaiting!',
      spanish: '¡Hola! Apoyamos tus sueños. ¡Ánimo!',
      tip: "'화이팅' (Hwaiting) es el grito de aliento universal juvenil en Seúl."
    }
  };

  const currentSampler = samplePhrases[interactiveLang];
  const activeLangData = LANGUAGES[interactiveLang];

  const handleStartLanguage = (langId: LanguageId) => {
    setCurrentLanguage(langId);
    setActiveTab('learn');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (profile.soundEnabled) sounds.playClick();
  };

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* 1. Hero Principal de la Plataforma */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-indigo-50/60 via-white to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Mission Kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-900/40 px-3 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Plataforma Educativa Gratuita Web & Móvil</span>
                <span aria-hidden="true">·</span>
                <span className="font-bold">Para la Juventud Global</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                  ¡Aprende idiomas, <br />
                  <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">
                    abre tu mundo!
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  <strong>POLYGLOT JOVEN 🌎</strong> elimina las barreras económicas de la educación para que jóvenes de cualquier rincón del planeta dominen <strong>inglés, francés, portugués, alemán, japonés y coreano</strong> con lecciones interactivas, juegos arcade, laboratorio de voz y acceso a becas universitarias mundiales.
                </p>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleStartLanguage('en')}
                  className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm sm:text-base flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Comenzar a Aprender Gratis</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setActiveTab('opportunities');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                >
                  <GraduationCap className="w-4 h-4 text-emerald-600" />
                  <span>Ver Becas Internacionales</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs text-slate-600 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Gratuito y Libre</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Sin Costos Ni Letras Chicas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Certificados Oficiales</span>
                </div>
              </div>

            </div>

            {/* Right Media Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-900 group">
                <img
                  src="/src/assets/images/polyglot_hero_youth_1793371740992.jpg"
                  alt="Jóvenes estudiantes de Polyglot Joven aprendiendo idiomas juntos"
                  referrerPolicy="no-referrer"
                  className="w-full h-[320px] sm:h-[400px] lg:h-[460px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                {/* Floating Highlight Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-white/20 dark:border-slate-800 shadow-xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>🌍 Pasaporte Políglota Juvenil</span>
                    </span>
                    <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 font-mono">
                      🔥 Racha Activa
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                    "Aprender idiomas me permitió postular a una beca internacional y conocer a amigos de todo el planeta."
                  </p>
                  <div className="text-[11px] text-slate-500 font-medium">
                    6 Idiomas · Juegos Arcade · Fonética Real
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Catálogo Interactivo de los 6 Idiomas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Nuestros Cursos
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            6 Idiomas para Conectar con el Mundo
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Cursos estructurados desde nivel principiante (A1) hasta intermedio (B1), diseñados con vocabulario juvenil real y preparación para becas internacionales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(LANGUAGES).map((lang) => (
            <div
              key={lang.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-5 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header card */}
                <div className="flex items-center justify-between">
                  <span className="text-4xl p-2 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
                    {lang.flag}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                    <span className="font-mono">{lang.stats.difficulty}</span>
                    <button
                      onClick={() => speakPhrase(lang.sampleGreeting.phrase, lang.speechCode)}
                      aria-label={`Escuchar saludo en ${lang.name}`}
                      title="Escuchar pronunciación nativa"
                      className="p-1.5 rounded-lg bg-indigo-50 dark:bg-slate-800 text-indigo-600 hover:bg-indigo-100 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {lang.name} <span className="text-sm font-normal text-slate-500">({lang.nativeName})</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {lang.description}
                  </p>
                </div>

                {/* Sample phrase preview */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">
                    "{lang.sampleGreeting.phrase}"
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">
                    {lang.sampleGreeting.translation}
                  </div>
                </div>

                {/* Youth opportunity badge */}
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{lang.stats.opportunities}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleStartLanguage(lang.id)}
                className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Explorar Curso</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Laboratorio Rápido en Portada: Prueba tu Primera Frase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                <Mic className="w-4 h-4" />
                <span>Laboratorio Interactivo de Pronunciación</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Prueba una frase con voz nativa ahora mismo
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Selecciona un idioma y escucha cómo se pronuncia correctamente con tecnología de voz nativa:
              </p>
            </div>

            {/* Language Selector Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
              {Object.values(LANGUAGES).map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    setInteractiveLang(lang.id);
                    if (profile.soundEnabled) sounds.playClick();
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                    interactiveLang === lang.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="hidden sm:inline">{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Phrase Showcase Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">
                  Frase en {activeLangData.name} ({activeLangData.nativeName})
                </span>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  "{currentSampler.native}"
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => speakPhrase(currentSampler.native, activeLangData.speechCode, false)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Escuchar Normal</span>
                </button>
                <button
                  onClick={() => speakPhrase(currentSampler.native, activeLangData.speechCode, true)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
                >
                  <Volume2 className="w-4 h-4 text-amber-500" />
                  <span>Lento</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-slate-400 text-xs font-bold uppercase">Fonética y pronunciación:</span>
                <div className="font-mono text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  🗣 {currentSampler.phonetic}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 text-xs font-bold uppercase">Traducción en español:</span>
                <div className="text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-medium">
                  🇪🇸 {currentSampler.spanish}
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-amber-800 dark:text-amber-300 font-medium flex items-center gap-2">
              <span>💡 Consejo fonético:</span>
              <span>{currentSampler.tip}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Los 4 Pilares de la Plataforma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            ¿Por qué Polyglot Joven?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Aprende Fácil, Interactivo y Divertido
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Herramientas diseñadas con pedagogía moderna para jóvenes estudiantes sin pagar mensualidades.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center text-2xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Lecciones Interactivas
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ejercicios de opción múltiple, desorden de oraciones, emparejar términos y comprensión auditiva en pasos de 5 minutos.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center text-2xl">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Polyglot Arcade
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Juegos de reflejos rápidos (Palabra Veloz), duelo de cartas de memoria con audio y trivias de cultura juvenil y slang.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center text-2xl">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Certificados Oficiales
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Aprueba tus evaluaciones de nivel y genera certificados con código de verificación único para tu CV sin costo.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/60 text-pink-600 flex items-center justify-center text-2xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              Becas & Oportunidades
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Accede a la guía de convocatorias internacionales (MEXT, GKS, DAAD, Erasmus, Eiffel, Santander) y modelos de postulación.
            </p>
          </div>

        </div>
      </section>

      {/* 5. Misión Social & Testimonios de Jóvenes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Nuestra Misión
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Eliminando las Barreras Económicas del Aprendizaje
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Creemos firmemente que el acceso a un segundo o tercer idioma no debe ser un privilegio de pocos, sino una llave universal para que cualquier joven con talento y disciplina construya su futuro.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic">
                "En mi ciudad no había academias de japonés y los cursos online costaban demasiado. Con Polyglot Joven aprendí los kanjis básicos y hoy estoy preparando mi postulación a la Beca MEXT."
              </p>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                — Daniel M., 18 años · Arequipa, Perú
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic">
                "Los juegos de Palabra Veloz y el laboratorio de voz me ayudaron a perder el miedo a hablar inglés en mis primeras entrevistas de trabajo remoto."
              </p>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                — Lucía V., 21 años · Medellín, Colombia
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic">
                "El coreano parecía imposible hasta que entendí el Hangul con las lecciones interactivas. ¡Poder aprender gratis me devolvió la motivación!"
              </p>
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                — Karla P., 19 años · Guadalajara, México
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Banner de Llamado a la Acción (CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 text-white p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-3">
            <h3 className="text-3xl sm:text-4xl font-black">
              ¿Listo para abrir tu mundo?
            </h3>
            <p className="text-sm sm:text-base text-indigo-100">
              Elige tu primer idioma ahora mismo y empieza tu racha de aprendizaje 100% gratuita.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => handleStartLanguage('en')}
                className="px-8 py-3.5 rounded-xl bg-white text-indigo-700 font-extrabold text-sm shadow-md hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95"
              >
                Comenzar Mi Primera Lección Gratis 🚀
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
