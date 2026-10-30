import { LanguageInfo } from '../types';

export const LANGUAGES: Record<string, LanguageInfo> = {
  en: {
    id: 'en',
    name: 'Inglés',
    nativeName: 'English',
    flag: '🇬🇧',
    speechCode: 'en-US',
    accentColor: 'text-sky-600 dark:text-sky-400',
    gradient: 'from-sky-500 to-blue-600',
    description: 'El idioma universal para conectar con el mundo, acceder a miles de becas globales, tecnología, startups e investigación.',
    youthContext: 'Ideal para comunicarte con jóvenes de cualquier país, entender música, gaming, series y postular a universidades mundiales.',
    stats: {
      learners: '1.5B en el mundo',
      opportunities: '+12,000 becas activas',
      difficulty: 'Fácil'
    },
    sampleGreeting: {
      phrase: 'Hey! Nice to meet you!',
      phonetic: 'jei! nais tu mit iu!',
      translation: '¡Hola! ¡Mucho gusto en conocerte!'
    }
  },
  fr: {
    id: 'fr',
    name: 'Francés',
    nativeName: 'Français',
    flag: '🇫🇷',
    speechCode: 'fr-FR',
    accentColor: 'text-indigo-600 dark:text-indigo-400',
    gradient: 'from-indigo-500 to-violet-600',
    description: 'La lengua de la diplomacia, la moda, el cine, la gastronomía y becas completas en Francia, Canadá, Bélgica y Suiza.',
    youthContext: 'Hablado por jóvenes en los 5 continentes, clave para programas como Eiffel, Erasmus+ y universidades francófonas gratuitas.',
    stats: {
      learners: '320M de hablantes',
      opportunities: 'Becas Eiffel & Campus France',
      difficulty: 'Intermedio'
    },
    sampleGreeting: {
      phrase: 'Salut! Comment ça va?',
      phonetic: 'sa-lu! co-man sa va?',
      translation: '¡Hola! ¿Cómo te va?'
    }
  },
  pt: {
    id: 'pt',
    name: 'Portugués',
    nativeName: 'Português',
    flag: '🇧🇷',
    speechCode: 'pt-BR',
    accentColor: 'text-emerald-600 dark:text-emerald-400',
    gradient: 'from-emerald-500 to-teal-600',
    description: 'Un idioma hermano, vibrante y alegre. Puerta de entrada al gigante de Sudamérica (Brasil), Portugal y África lusófona.',
    youthContext: 'Aprendizaje acelerado para hispanohablantes. Abre puertas al ecosistema tecnológico de São Paulo y becas PEC-G.',
    stats: {
      learners: '260M de hablantes',
      opportunities: 'Becas PEC-G y Santander',
      difficulty: 'Fácil'
    },
    sampleGreeting: {
      phrase: 'Tudo bem, galera?',
      phonetic: 'tu-du ben, ga-le-ra?',
      translation: '¿Todo bien, gente/amigos?'
    }
  },
  de: {
    id: 'de',
    name: 'Alemán',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    speechCode: 'de-DE',
    accentColor: 'text-amber-600 dark:text-amber-400',
    gradient: 'from-amber-500 to-orange-600',
    description: 'El motor económico y científico de Europa. Universidades públicas prácticamente gratuitas y las prestigiosas becas DAAD.',
    youthContext: 'Fundamental para jóvenes ingenieros, científicos, diseñadores y apasionados por la sustentabilidad y tecnología europea.',
    stats: {
      learners: '135M de hablantes',
      opportunities: 'Becas DAAD (0€ matrícula)',
      difficulty: 'Desafiante'
    },
    sampleGreeting: {
      phrase: 'Hallo! Wie geht es dir?',
      phonetic: 'ja-lo! vi guet es dir?',
      translation: '¡Hola! ¿Cómo estás?'
    }
  },
  ja: {
    id: 'ja',
    name: 'Japonés',
    nativeName: '日本語',
    flag: '🇯🇵',
    speechCode: 'ja-JP',
    accentColor: 'text-rose-600 dark:text-rose-400',
    gradient: 'from-rose-500 to-red-600',
    description: 'Una cultura milenaria y vanguardista: anime, manga, robótica, videojuegos y las codiciadas becas completas MEXT.',
    youthContext: 'Para jóvenes soñadores de Tokio, fans de la animación y la innovación tecnológica. Con guía de Romaji y Hiragana.',
    stats: {
      learners: '125M de hablantes',
      opportunities: 'Becas Monbukagakusho (MEXT)',
      difficulty: 'Desafiante'
    },
    sampleGreeting: {
      phrase: 'こんにちは、元気ですか？',
      phonetic: 'Konnichiwa, genki desu ka?',
      translation: '¡Hola!, ¿cómo estás?'
    }
  },
  ko: {
    id: 'ko',
    name: 'Coreano',
    nativeName: '한국어',
    flag: '🇰🇷',
    speechCode: 'ko-KR',
    accentColor: 'text-fuchsia-600 dark:text-fuchsia-400',
    gradient: 'from-fuchsia-500 to-pink-600',
    description: 'El fenómeno cultural global: K-pop, K-dramas, tecnología de punta en Seúl y las becas universitarias completas GKS.',
    youthContext: 'El alfabeto Hangul fue diseñado científicamente para ser aprendido en una tarde. ¡Empieza a cantar y viajar hoy!',
    stats: {
      learners: '80M de hablantes',
      opportunities: 'Beca Global Korea (GKS)',
      difficulty: 'Intermedio'
    },
    sampleGreeting: {
      phrase: '안녕하세요! 반가워요.',
      phonetic: 'Annyeonghaseyo! Bangawoyo.',
      translation: '¡Hola! Qué gusto saludarte.'
    }
  }
};
