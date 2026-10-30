import { Unit, LanguageId } from '../types';

export const CURRICULUM: Record<LanguageId, Unit[]> = {
  en: [
    {
      id: 'en-unit-1',
      languageId: 'en',
      unitNumber: 1,
      title: 'Sección 1: Primeros Pasos & Saludos',
      subtitle: 'Preséntate, saluda a amigos y di de dónde vienes',
      level: 'A1 Principiante',
      icon: '👋',
      colorScheme: {
        bg: 'from-emerald-500 to-green-600',
        border: 'border-emerald-600',
        text: 'text-emerald-700',
        accent: 'bg-emerald-500'
      },
      guidebook: {
        summary: 'Aprende a romper el hielo, preguntar nombres y decir de dónde eres.',
        keyGrammar: 'Usa el verbo To Be (I am, you are, he/she is) y la preposición "from" para procedencia: "I am from Colombia".',
        vocabularyTip: 'En chats juveniles, "Hey" o "What\'s up?" son mucho más naturales que el formal "Good morning".'
      },
      lessons: [
        {
          id: 'en-u1-s1',
          languageId: 'en',
          unitId: 'en-unit-1',
          nodeType: 'lesson',
          icon: '⭐',
          title: 'Sesión 1: Saludos & Presentación',
          description: 'Aprende a decir hola y preguntar el nombre de forma natural.',
          level: 'A1 Principiante',
          xpReward: 20,
          gemReward: 10,
          exercises: [
            {
              id: 'en-u1-e1',
              type: 'multiple-choice',
              prompt: '¿Cómo le dices a un nuevo compañero "¿Cómo te llamas?"?',
              options: ["What's your name?", "Where is your house?", "Who are they?", "How are times?"],
              correctAnswer: "What's your name?",
              explanation: "'What's your name?' es la forma estándar e internacional para preguntar el nombre."
            },
            {
              id: 'en-u1-e2',
              type: 'scramble',
              prompt: 'Ordena la frase: "¡Mucho gusto en conocerte!"',
              scrambledWords: ['meet', 'Nice', 'you', 'to', '!'],
              correctSentence: 'Nice to meet you !',
              explanation: "'Nice to meet you' es la fórmula universal para decir mucho gusto."
            },
            {
              id: 'en-u1-e3',
              type: 'fill-blank',
              prompt: 'Completa: "Soy de Argentina."',
              sentenceWithBlank: 'I am _____ Argentina.',
              options: ['from', 'in', 'on', 'with'],
              correctAnswer: 'from',
              explanation: "Usamos 'from' para indicar procedencia u origen."
            }
          ]
        },
        {
          id: 'en-u1-s2',
          languageId: 'en',
          unitId: 'en-unit-1',
          nodeType: 'lesson',
          icon: '💬',
          title: 'Sesión 2: Rompiendo el Hielo',
          description: 'Aprende los saludos informales más usados por jóvenes hoy.',
          level: 'A1 Principiante',
          xpReward: 25,
          gemReward: 10,
          exercises: [
            {
              id: 'en-u1-e4',
              type: 'match-pairs',
              prompt: 'Empareja los saludos juveniles con su significado:',
              explanation: 'Expresiones que escucharás en podcasts, series y chats.',
              pairs: [
                { left: 'What\'s up?', right: '¿Qué tal? / ¿Qué pasa?' },
                { left: 'See you later', right: 'Nos vemos luego' },
                { left: 'Have a great day!', right: '¡Que tengas un gran día!' },
                { left: 'Take care', right: 'Cuídate' }
              ]
            },
            {
              id: 'en-u1-e5',
              type: 'pronunciation',
              prompt: 'Escucha y practica este saludo amistoso:',
              targetPhrase: "Hey everyone, I'm super excited to be here!",
              targetTranslation: '¡Hola a todos, estoy súper emocionado de estar aquí!',
              tipForPronouncing: "Enlaza 'I'm' con 'super' de forma fluida sin pausar.",
              explanation: 'Excelente para presentarte en videollamadas o salones de clase.'
            }
          ]
        },
        {
          id: 'en-u1-chest',
          languageId: 'en',
          unitId: 'en-unit-1',
          nodeType: 'chest',
          icon: '🎁',
          title: 'Cofre de Gemas',
          description: '¡Recompensa de estudio constante!',
          level: 'A1 Principiante',
          xpReward: 10,
          gemReward: 25,
          exercises: [],
          chestReward: {
            gems: 25,
            message: '¡Excelente racha! Has abierto el cofre de la Unidad 1. +25 Gemas para tu pasaporte.'
          }
        },
        {
          id: 'en-u1-s3',
          languageId: 'en',
          unitId: 'en-unit-1',
          nodeType: 'lesson',
          icon: '🎯',
          title: 'Sesión 3: Países & Nacionalidades',
          description: 'Comenta de qué país vienes y qué idiomas hablas.',
          level: 'A1 Principiante',
          xpReward: 25,
          gemReward: 10,
          exercises: [
            {
              id: 'en-u1-e6',
              type: 'scramble',
              prompt: 'Ordena: "Hablo español e inglés."',
              scrambledWords: ['English', 'speak', 'Spanish', 'I', 'and'],
              correctSentence: 'I speak Spanish and English',
              explanation: 'Los nombres de idiomas en inglés siempre se escriben con mayúscula (Spanish, English).'
            },
            {
              id: 'en-u1-e7',
              type: 'fill-blank',
              prompt: 'Completa: "¿De dónde eres?"',
              sentenceWithBlank: 'Where are you _____?',
              options: ['from', 'like', 'come', 'into'],
              correctAnswer: 'from',
              explanation: "'Where are you from?' es la pregunta estándar para preguntar el país de origen."
            }
          ]
        },
        {
          id: 'en-u1-trophy',
          languageId: 'en',
          unitId: 'en-unit-1',
          nodeType: 'trophy',
          icon: '🏆',
          title: 'Desafío Maestro: Unidad 1',
          description: 'Demuestra todo lo aprendido en la Unidad 1 y gana tu trofeo.',
          level: 'A1 Principiante',
          xpReward: 40,
          gemReward: 20,
          exercises: [
            {
              id: 'en-u1-e8',
              type: 'multiple-choice',
              prompt: '¿Cómo respondes a "Nice to meet you"?',
              options: ['Nice to meet you too!', 'Yes, I am happy.', 'I have four brothers.', 'See tomorrow.'],
              correctAnswer: 'Nice to meet you too!',
              explanation: "Añadir 'too' al final ('a ti también') es la respuesta más natural."
            },
            {
              id: 'en-u1-e9',
              type: 'scramble',
              prompt: 'Ordena: "Mi sueño es viajar por el mundo."',
              scrambledWords: ['travel', 'dream', 'world', 'My', 'the', 'is', 'to'],
              correctSentence: 'My dream is to travel the world',
              explanation: 'Estructura Sujeto (My dream) + Verbo (is) + Infinitivo (to travel).'
            }
          ]
        }
      ]
    },
    {
      id: 'en-unit-2',
      languageId: 'en',
      unitNumber: 2,
      title: 'Sección 2: Cafetería, Comida & Quedadas',
      subtitle: 'Ordena café, snacks y comparte planes con amigos',
      level: 'A1-A2 Elemental',
      icon: '☕',
      colorScheme: {
        bg: 'from-sky-500 to-blue-600',
        border: 'border-sky-600',
        text: 'text-sky-700',
        accent: 'bg-sky-500'
      },
      guidebook: {
        summary: 'Aprende a ordenar bebidas, comidas y acordar horas de encuentro.',
        keyGrammar: 'Usa "I would like..." o "Can I have... please?" para ordenar con cortesía.',
        vocabularyTip: '"Grab a coffee" es la expresión juvenil común para decir "tomar un café rápido juntos".'
      },
      lessons: [
        {
          id: 'en-u2-s1',
          languageId: 'en',
          unitId: 'en-unit-2',
          nodeType: 'lesson',
          icon: '🥐',
          title: 'Sesión 1: Pidiendo en la Cafetería',
          description: 'Aprende a pedir café, té y comida con cortesía.',
          level: 'A2 Elemental',
          xpReward: 25,
          gemReward: 10,
          exercises: [
            {
              id: 'en-u2-e1',
              type: 'multiple-choice',
              prompt: '¿Cuál es la forma más educada de pedir un café?',
              options: ['I would like a coffee, please.', 'Give me coffee now.', 'Coffee is here.', 'I want bring coffee.'],
              correctAnswer: 'I would like a coffee, please.',
              explanation: "'I would like...' (me gustaría) es la fórmula estándar de cortesía."
            },
            {
              id: 'en-u2-e2',
              type: 'fill-blank',
              prompt: 'Completa: "¿Cuánto cuesta esto?"',
              sentenceWithBlank: 'How _____ is this, please?',
              options: ['much', 'many', 'cost', 'money'],
              correctAnswer: 'much',
              explanation: "'How much is this?' se usa para preguntar el precio de algo."
            }
          ]
        },
        {
          id: 'en-u2-s2',
          languageId: 'en',
          unitId: 'en-unit-2',
          nodeType: 'lesson',
          icon: '🍕',
          title: 'Sesión 2: Gustos & Preferencias',
          description: 'Expresa tus platos y bebidas favoritas.',
          level: 'A2 Elemental',
          xpReward: 25,
          gemReward: 10,
          exercises: [
            {
              id: 'en-u2-e3',
              type: 'match-pairs',
              prompt: 'Empareja vocabulario de comida:',
              explanation: 'Alimentos cotidianos en cualquier menú.',
              pairs: [
                { left: 'Breakfast', right: 'Desayuno' },
                { left: 'Sparkling water', right: 'Agua con gas' },
                { left: 'The bill / check', right: 'La cuenta' },
                { left: 'Delicious', right: 'Delicioso' }
              ]
            },
            {
              id: 'en-u2-e4',
              type: 'scramble',
              prompt: 'Ordena: "¿Quieres almorzar conmigo?"',
              scrambledWords: ['lunch', 'have', 'to', 'Do', 'want', 'with', 'me', 'you', '?'],
              correctSentence: 'Do you want to have lunch with me ?',
              explanation: "'Do you want to have lunch?' es la invitación amigable por excelencia."
            }
          ]
        },
        {
          id: 'en-u2-chest',
          languageId: 'en',
          unitId: 'en-unit-2',
          nodeType: 'chest',
          icon: '💎',
          title: 'Cofre de Explorador',
          description: '¡Recompensa por tu dedicación!',
          level: 'A2 Elemental',
          xpReward: 10,
          gemReward: 30,
          exercises: [],
          chestReward: {
            gems: 30,
            message: '¡Cofre abierto con éxito! +30 Gemas para seguir desbloqueando sellos.'
          }
        },
        {
          id: 'en-u2-trophy',
          languageId: 'en',
          unitId: 'en-unit-2',
          nodeType: 'trophy',
          icon: '🏆',
          title: 'Desafío Maestro: Cafetería & Comida',
          description: 'Consolida tu aprendizaje de la Unidad 2.',
          level: 'A2 Elemental',
          xpReward: 40,
          gemReward: 20,
          exercises: [
            {
              id: 'en-u2-e5',
              type: 'pronunciation',
              prompt: 'Pronuncia esta frase para pedir la cuenta:',
              targetPhrase: "Could we have the bill, please? Everything was delicious!",
              targetTranslation: '¿Nos podría traer la cuenta, por favor? ¡Todo estuvo delicioso!',
              tipForPronouncing: "En 'Could', la letra 'L' es muda (suena como /kʊd/).",
              explanation: "Frase perfecta para cerrar una comida con amigos internacionales."
            }
          ]
        }
      ]
    },
    {
      id: 'en-unit-3',
      languageId: 'en',
      unitNumber: 3,
      title: 'Sección 3: Universidad, Campus & Becas',
      subtitle: 'Comunícate en el campus, clases y postulaciones a becas',
      level: 'B1 Intermedio',
      icon: '🎓',
      colorScheme: {
        bg: 'from-violet-500 to-purple-600',
        border: 'border-violet-600',
        text: 'text-violet-700',
        accent: 'bg-violet-500'
      },
      guidebook: {
        summary: 'Aprende los términos clave para postular a becas y estudiar en el extranjero.',
        keyGrammar: 'Usa verbos modales de intención: "I plan to apply...", "I would love to specialize in...".',
        vocabularyTip: '"Scholarship" cubre gastos académicos, mientras que "Stipend" es el dinero mensual para manutención.'
      },
      lessons: [
        {
          id: 'en-u3-s1',
          languageId: 'en',
          unitId: 'en-unit-3',
          nodeType: 'lesson',
          icon: '📚',
          title: 'Sesión 1: Vida en el Campus',
          description: 'Términos universitarios: biblioteca, laboratorios y créditos.',
          level: 'B1 Intermedio',
          xpReward: 30,
          gemReward: 12,
          exercises: [
            {
              id: 'en-u3-e1',
              type: 'multiple-choice',
              prompt: '¿Qué significa la palabra "Scholarship"?',
              options: ['Beca de estudios', 'Escuela secundaria', 'Título honorario', 'Préstamo bancario'],
              correctAnswer: 'Beca de estudios',
              explanation: "'Scholarship' se refiere a una ayuda económica o beca académica."
            },
            {
              id: 'en-u3-e2',
              type: 'scramble',
              prompt: 'Ordena la frase: "Quiero estudiar en el extranjero."',
              scrambledWords: ['want', 'to', 'I', 'study', 'abroad'],
              correctSentence: 'I want to study abroad',
              explanation: "'Study abroad' es el término clave para cursar estudios en otro país."
            }
          ]
        },
        {
          id: 'en-u3-s2',
          languageId: 'en',
          unitId: 'en-unit-3',
          nodeType: 'lesson',
          icon: '📝',
          title: 'Sesión 2: Documentos de Postulación',
          description: 'Aprende a preparar tu carta de motivación y CV internacional.',
          level: 'B1 Intermedio',
          xpReward: 30,
          gemReward: 12,
          exercises: [
            {
              id: 'en-u3-e3',
              type: 'match-pairs',
              prompt: 'Empareja términos de becas universitarias:',
              explanation: 'Documentos requeridos en toda postulación internacional.',
              pairs: [
                { left: 'Statement of Purpose', right: 'Carta de motivación' },
                { left: 'Tuition waiver', right: 'Exoneración de matrícula' },
                { left: 'Recommendation letter', right: 'Carta de recomendación' },
                { left: 'Application deadline', right: 'Fecha límite de entrega' }
              ]
            }
          ]
        },
        {
          id: 'en-u3-trophy',
          languageId: 'en',
          unitId: 'en-unit-3',
          nodeType: 'trophy',
          icon: '🏆',
          title: 'Desafío Beca Internacional',
          description: 'Consolida tu preparación para oportunidades mundiales.',
          level: 'B1 Intermedio',
          xpReward: 45,
          gemReward: 25,
          exercises: [
            {
              id: 'en-u3-e4',
              type: 'pronunciation',
              prompt: 'Practica tu argumento de entrevista de beca:',
              targetPhrase: "I am determined to apply my skills to make a positive social impact.",
              targetTranslation: 'Estoy decidido a aplicar mis habilidades para generar un impacto social positivo.',
              tipForPronouncing: "En 'determined' el acento va en la segunda sílaba: /dɪˈtɜː.mɪnd/.",
              explanation: "Una de las frases de mayor impacto al defender tu postulación."
            }
          ]
        }
      ]
    }
  ],
  fr: [
    {
      id: 'fr-unit-1',
      languageId: 'fr',
      unitNumber: 1,
      title: 'Sección 1: Premiers Pas & Salutations',
      subtitle: 'Saluda y preséntate en París, Montreal o Ginebra',
      level: 'A1 Principiante',
      icon: '🥐',
      colorScheme: {
        bg: 'from-indigo-500 to-violet-600',
        border: 'border-indigo-600',
        text: 'text-indigo-700',
        accent: 'bg-indigo-500'
      },
      guidebook: {
        summary: 'Domina los saludos diarios y aprende a presentarte en francés.',
        keyGrammar: 'Usa "Je m\'appelle..." para el nombre y "Je viens de..." para tu país.',
        vocabularyTip: '"Salut" sirve tanto para decir "hola" como para decir "chau" entre amigos.'
      },
      lessons: [
        {
          id: 'fr-u1-s1',
          languageId: 'fr',
          unitId: 'fr-unit-1',
          nodeType: 'lesson',
          icon: '⭐',
          title: 'Sesión 1: Bonjour le monde !',
          description: 'Los saludos esenciales del día a día.',
          level: 'A1 Principiante',
          xpReward: 20,
          gemReward: 10,
          exercises: [
            {
              id: 'fr-u1-e1',
              type: 'multiple-choice',
              prompt: '¿Cómo dices "Hola, ¿cómo estás?" de manera amigable?',
              options: ['Salut, comment ça va ?', 'Bonsoir, au revoir !', 'Merci beaucoup, oui.', 'Je ne sais pas.'],
              correctAnswer: 'Salut, comment ça va ?',
              explanation: "'Salut' es el saludo informal y 'comment ça va ?' significa ¿cómo va todo?"
            },
            {
              id: 'fr-u1-e2',
              type: 'scramble',
              prompt: 'Ordena: "Me llamo Camille y soy estudiante."',
              scrambledWords: ["m'appelle", 'Je', 'étudiante', 'suis', 'et', 'Camille', 'je'],
              correctSentence: "Je m'appelle Camille et je suis estudiante",
              explanation: "'Je m'appelle' significa Me llamo, y 'je suis' significa yo soy."
            }
          ]
        },
        {
          id: 'fr-u1-s2',
          languageId: 'fr',
          unitId: 'fr-unit-1',
          nodeType: 'lesson',
          icon: '🥖',
          title: 'Sesión 2: Cortesía & Nuevos Amigos',
          description: 'Aprende a decir por favor, de nada y encantado.',
          level: 'A1 Principiante',
          xpReward: 25,
          gemReward: 10,
          exercises: [
            {
              id: 'fr-u1-e3',
              type: 'match-pairs',
              prompt: 'Empareja las fórmulas de cortesía en francés:',
              explanation: 'Expresiones que demuestran buena educación en cualquier momento.',
              pairs: [
                { left: 'Enchanté !', right: '¡Encantado de conocerte!' },
                { left: 'S\'il vous plaît', right: 'Por favor' },
                { left: 'De rien', right: 'De nada' },
                { left: 'À bientôt !', right: '¡Hasta pronto!' }
              ]
            }
          ]
        },
        {
          id: 'fr-u1-chest',
          languageId: 'fr',
          unitId: 'fr-unit-1',
          nodeType: 'chest',
          icon: '🎁',
          title: 'Cofre Francófono',
          description: '¡Recompensa de estudio!',
          level: 'A1 Principiante',
          xpReward: 10,
          gemReward: 25,
          exercises: [],
          chestReward: {
            gems: 25,
            message: '¡Félicitations! Has abierto el cofre de Francés. +25 Gemas para tu pasaporte.'
          }
        },
        {
          id: 'fr-u1-trophy',
          languageId: 'fr',
          unitId: 'fr-unit-1',
          nodeType: 'trophy',
          icon: '🏆',
          title: 'Desafío Unidad 1: Francés',
          description: 'Pon a prueba tu pronunciación y gramática inicial.',
          level: 'A1 Principiante',
          xpReward: 40,
          gemReward: 20,
          exercises: [
            {
              id: 'fr-u1-e4',
              type: 'pronunciation',
              prompt: 'Pronuncia la despedida elegante francesa:',
              targetPhrase: "Au revoir et à la prochaine fois !",
              targetTranslation: '¡Adiós y hasta la próxima vez!',
              tipForPronouncing: "En 'Au revoir', pronuncia la R suavemente en la garganta.",
              explanation: 'La frase clásica para despedirte de amigos o profesores.'
            }
          ]
        }
      ]
    },
    {
      id: 'fr-unit-2',
      languageId: 'fr',
      unitNumber: 2,
      title: 'Sección 2: Au Café & Vie Étudiante',
      subtitle: 'Pide en cafeterías parisinas y charla sobre estudios',
      level: 'A2 Elemental',
      icon: '☕',
      colorScheme: {
        bg: 'from-purple-500 to-pink-600',
        border: 'border-purple-600',
        text: 'text-purple-700',
        accent: 'bg-purple-500'
      },
      guidebook: {
        summary: 'Aprende a ordenar café, croissants y preguntar por la cuenta.',
        keyGrammar: 'Usa el condicional de cortesía: "Je voudrais un café au lait, s\'il vous plaît".',
        vocabularyTip: 'En Francia, un "café" a secas es siempre un espresso solo.'
      },
      lessons: [
        {
          id: 'fr-u2-s1',
          languageId: 'fr',
          unitId: 'fr-unit-2',
          nodeType: 'lesson',
          icon: '☕',
          title: 'Sesión 1: En la Terraza del Café',
          description: 'Pide bebidas y pastelería con soltura.',
          level: 'A2 Elemental',
          xpReward: 25,
          gemReward: 10,
          exercises: [
            {
              id: 'fr-u2-e1',
              type: 'fill-blank',
              prompt: 'Completa: "Yo quisiera un croissant, por favor."',
              sentenceWithBlank: 'Je _____ un croissant, s\'il vous plaît.',
              options: ['voudrais', 'prends', 'veux', 'mange'],
              correctAnswer: 'voudrais',
              explanation: "'Je voudrais' es la fórmula más educada de solicitar algo."
            }
          ]
        },
        {
          id: 'fr-u2-trophy',
          languageId: 'fr',
          unitId: 'fr-unit-2',
          nodeType: 'trophy',
          icon: '🏆',
          title: 'Desafío Unidad 2: París Café',
          description: 'Prueba tu nivel A2 en situaciones reales.',
          level: 'A2 Elemental',
          xpReward: 40,
          gemReward: 20,
          exercises: [
            {
              id: 'fr-u2-e2',
              type: 'scramble',
              prompt: 'Ordena: "¿Quieres salir esta noche con nosotros?"',
              scrambledWords: ['soir', 'veux', 'sortir', 'ce', 'avec', 'nous', 'Tu', '?'],
              correctSentence: 'Tu veux sortir ce soir avec nous ?',
              explanation: 'Pregunta juvenil coloquial muy común.'
            }
          ]
        }
      ]
    }
  ],
  pt: [
    {
      id: 'pt-unit-1',
      languageId: 'pt',
      unitNumber: 1,
      title: 'Sección 1: E aí, Beleza? Primeiros Passos',
      subtitle: 'Comunícate con alegría en portugués brasileño',
      level: 'A1 Principiante',
      icon: '🏖️',
      colorScheme: {
        bg: 'from-emerald-500 to-teal-600',
        border: 'border-emerald-600',
        text: 'text-emerald-700',
        accent: 'bg-emerald-500'
      },
      guidebook: {
        summary: 'Aprende los saludos brasileños más alegres y cercanos.',
        keyGrammar: '"Tudo bem?" se responde con "Tudo bem!" o "Tudo ótimo!".',
        vocabularyTip: '"Valeu" sirve como "gracias" y como saludo rápido de despedida.'
      },
      lessons: [
        {
          id: 'pt-u1-s1',
          languageId: 'pt',
          unitId: 'pt-unit-1',
          nodeType: 'lesson',
          icon: '⭐',
          title: 'Sesión 1: Saludos Brasileños',
          description: 'Conoce cómo hablan los jóvenes en Río y São Paulo.',
          level: 'A1 Principiante',
          xpReward: 20,
          gemReward: 10,
          exercises: [
            {
              id: 'pt-u1-e1',
              type: 'multiple-choice',
              prompt: '¿Qué significa la expresión juvenil "E aí, beleza?"',
              options: ['¿Qué tal, todo bien?', '¿Dónde está la belleza?', '¿Qué hora es?', 'Adiós, buena suerte.'],
              correctAnswer: '¿Qué tal, todo bien?',
              explanation: "'Beleza' se usa como sinónimo de 'tudo bem' o 'de acuerdo'."
            },
            {
              id: 'pt-u1-e2',
              type: 'scramble',
              prompt: 'Ordena: "Mucho gusto, me llamo Lucas."',
              scrambledWords: ['prazer', 'Muito', 'chamo', 'me', 'Lucas', ','],
              correctSentence: 'Muito prazer , me chamo Lucas',
              explanation: "'Muito prazer' es la forma habitual para decir mucho gusto."
            }
          ]
        },
        {
          id: 'pt-u1-s2',
          languageId: 'pt',
          unitId: 'pt-unit-1',
          nodeType: 'lesson',
          icon: '🎶',
          title: 'Sesión 2: Jerga Juvenil & Música',
          description: 'Mano, legal, valeu y más expresiones cotidianas.',
          level: 'A1 Principiante',
          xpReward: 25,
          gemReward: 10,
          exercises: [
            {
              id: 'pt-u1-e3',
              type: 'match-pairs',
              prompt: 'Empareja vocabulario cotidiano brasileño:',
              explanation: 'Palabras que usarás a diario charlando con amigos de Brasil.',
              pairs: [
                { left: 'Valeu!', right: '¡Gracias! / ¡De una!' },
                { left: 'Legal!', right: '¡Genial! / ¡Chévere!' },
                { left: 'Massa!', right: '¡Buenísimo!' },
                { left: 'Com certeza', right: 'Con seguridad / Claro que sí' }
              ]
            }
          ]
        },
        {
          id: 'pt-u1-chest',
          languageId: 'pt',
          unitId: 'pt-unit-1',
          nodeType: 'chest',
          icon: '🎁',
          title: 'Cofre Verde-Amarelo',
          description: '¡Recompensa por tu avance!',
          level: 'A1 Principiante',
          xpReward: 10,
          gemReward: 25,
          exercises: [],
          chestReward: {
            gems: 25,
            message: '¡Parabéns! Has ganado +25 Gemas para tu pasaporte políglota.'
          }
        },
        {
          id: 'pt-u1-trophy',
          languageId: 'pt',
          unitId: 'pt-unit-1',
          nodeType: 'trophy',
          icon: '🏆',
          title: 'Desafío Unidad 1: Brasil',
          description: 'Consolida tu pronunciación musical en portugués.',
          level: 'A1 Principiante',
          xpReward: 40,
          gemReward: 20,
          exercises: [
            {
              id: 'pt-u1-e4',
              type: 'pronunciation',
              prompt: 'Pronuncia la frase de bienvenida más alegre:',
              targetPhrase: "Tudo bem com você? Vamos aprender juntos!",
              targetTranslation: '¿Todo bien contigo? ¡Vamos a aprender juntos!',
              tipForPronouncing: "En portugués de Brasil, las terminaciones en 'o' suenan casi como 'u'.",
              explanation: "El sonido de 'você' tiene acento circunflejo cerrado."
            }
          ]
        }
      ]
    }
  ],
  de: [
    {
      id: 'de-unit-1',
      languageId: 'de',
      unitNumber: 1,
      title: 'Sección 1: Hallo Deutschland! Primeros Pasos',
      subtitle: 'Comienza tu viaje en el idioma de la ciencia y la innovación',
      level: 'A1 Principiante',
      icon: '🥨',
      colorScheme: {
        bg: 'from-amber-500 to-orange-600',
        border: 'border-amber-600',
        text: 'text-amber-700',
        accent: 'bg-amber-500'
      },
      guidebook: {
        summary: 'Aprende a saludar en Berlín, Múnich o Viena y decir tu nombre.',
        keyGrammar: 'Recuerda que en alemán TODOS los sustantivos se escriben con mayúscula inicial (der Name, das Land).',
        vocabularyTip: '"Tschüss" es la despedida informal más popular en Alemania.'
      },
      lessons: [
        {
          id: 'de-u1-s1',
          languageId: 'de',
          unitId: 'de-unit-1',
          nodeType: 'lesson',
          icon: '⭐',
          title: 'Sesión 1: Hallo & Wie geht\'s?',
          description: 'Saludos, presentaciones y tus primeras oraciones.',
          level: 'A1 Principiante',
          xpReward: 20,
          gemReward: 10,
          exercises: [
            {
              id: 'de-u1-e1',
              type: 'multiple-choice',
              prompt: '¿Cómo se responde amablemente a "Wie geht\'s?" (¿Cómo estás?)?',
              options: ['Gut, danke! Und dir?', 'Auf Wiedersehen!', 'Ich spreche kein Deutsch.', 'Bitte schön!'],
              correctAnswer: 'Gut, danke! Und dir?',
              explanation: "'Gut, danke! Und dir?' significa: ¡Bien, gracias! ¿Y tú?"
            },
            {
              id: 'de-u1-e2',
              type: 'scramble',
              prompt: 'Ordena: "Me llamo Alex y vengo de España."',
              scrambledWords: ['Alex', 'Ich', 'heiße', 'aus', 'Spanien', 'und', 'komme'],
              correctSentence: 'Ich heiße Alex und komme aus Spanien',
              explanation: "'Ich heiße' significa Me llamo, y 'komme aus' significa vengo de."
            }
          ]
        },
        {
          id: 'de-u1-s2',
          languageId: 'de',
          unitId: 'de-unit-1',
          nodeType: 'lesson',
          icon: '🍺',
          title: 'Sesión 2: Frases Esenciales de Cortesía',
          description: 'Por favor, gracias, con gusto y despedidas.',
          level: 'A1 Principiante',
          xpReward: 25,
          gemReward: 10,
          exercises: [
            {
              id: 'de-u1-e3',
              type: 'match-pairs',
              prompt: 'Empareja las fórmulas básicas en alemán:',
              explanation: 'Expresiones esenciales de respeto y cortesía.',
              pairs: [
                { left: 'Dankeschön', right: 'Muchas gracias' },
                { left: 'Bitte sehr', right: 'Por favor / De nada' },
                { left: 'Tschüss!', right: '¡Chau! (informal)' },
                { left: 'Bis bald!', right: '¡Hasta pronto!' }
              ]
            }
          ]
        },
        {
          id: 'de-u1-chest',
          languageId: 'de',
          unitId: 'de-unit-1',
          nodeType: 'chest',
          icon: '🎁',
          title: 'Cofre Alemán',
          description: '¡Recompensa de estudio!',
          level: 'A1 Principiante',
          xpReward: 10,
          gemReward: 25,
          exercises: [],
          chestReward: {
            gems: 25,
            message: '¡Wunderbar! Has ganado +25 Gemas para tus metas de estudio.'
          }
        },
        {
          id: 'de-u1-trophy',
          languageId: 'de',
          unitId: 'de-unit-1',
          nodeType: 'trophy',
          icon: '🏆',
          title: 'Desafío Unidad 1: Alemán',
          description: 'Demuestra tu dominio de las bases del alemán.',
          level: 'A1 Principiante',
          xpReward: 40,
          gemReward: 20,
          exercises: [
            {
              id: 'de-u1-e4',
              type: 'pronunciation',
              prompt: 'Pronuncia la frase de bienvenida en Berlín:',
              targetPhrase: "Freut mich, dich kennenzulernen!",
              targetTranslation: '¡Mucho gusto en conocerte!',
              tipForPronouncing: "El diptongo 'eu' en 'Freut' suena similar a 'oi' en español.",
              explanation: "'Kennenlernen' es el verbo para conocer a alguien por primera vez."
            }
          ]
        }
      ]
    }
  ],
  ja: [
    {
      id: 'ja-unit-1',
      languageId: 'ja',
      unitNumber: 1,
      title: 'Sección 1: Hajimemashite! (Mucho Gusto)',
      subtitle: 'Saludos iniciales, Hiragana y cortesía japonesa',
      level: 'A1 Principiante',
      icon: '🌸',
      colorScheme: {
        bg: 'from-rose-500 to-red-600',
        border: 'border-rose-600',
        text: 'text-rose-700',
        accent: 'bg-rose-500'
      },
      guidebook: {
        summary: 'Aprende la fórmula mágica Hajimemashite y las vocales puras japonesas.',
        keyGrammar: 'La estructura de oraciones en japonés es Sujeto + Objeto + Verbo: Watashi wa (yo) + gakusei (estudiante) + desu (ser).',
        vocabularyTip: 'Usa "Arigatou gozaimasu" para dar las gracias con pleno respeto.'
      },
      lessons: [
        {
          id: 'ja-u1-s1',
          languageId: 'ja',
          unitId: 'ja-unit-1',
          nodeType: 'lesson',
          icon: '⭐',
          title: 'Sesión 1: Saludos & Presentación (Jikoshoukai)',
          description: 'Aprende a decir hola y presentarte en japonés.',
          level: 'A1 Principiante',
          xpReward: 20,
          gemReward: 10,
          exercises: [
            {
              id: 'ja-u1-e1',
              type: 'multiple-choice',
              prompt: '¿Qué significa "はじめまして" (Hajimemashite)?',
              options: ['Mucho gusto (por primera vez)', 'Buenas noches', 'Hasta mañana', 'Buen provecho'],
              correctAnswer: 'Mucho gusto (por primera vez)',
              explanation: "'Hajimemashite' se dice exclusivamente al conocer a alguien por primera vez."
            },
            {
              id: 'ja-u1-e2',
              type: 'scramble',
              prompt: 'Ordena en Romaji: "Watashi wa gakusei desu" (Soy estudiante)',
              scrambledWords: ['gakusei', 'Watashi', 'desu', 'wa'],
              correctSentence: 'Watashi wa gakusei desu',
              explanation: 'Watashi (yo) + wa (partícula de tema) + gakusei (estudiante) + desu (ser).'
            }
          ]
        },
        {
          id: 'ja-u1-s2',
          languageId: 'ja',
          unitId: 'ja-unit-1',
          nodeType: 'lesson',
          icon: '🍙',
          title: 'Sesión 2: Expresiones Cotidianas',
          description: 'Gracias, sí, no y saludos diarios en Tokio.',
          level: 'A1 Principiante',
          xpReward: 25,
          gemReward: 10,
          exercises: [
            {
              id: 'ja-u1-e3',
              type: 'match-pairs',
              prompt: 'Empareja los kanas básicos con su significado:',
              explanation: 'Saludos fundamentales en Tokio y Kioto.',
              pairs: [
                { left: 'こんにちは (Konnichiwa)', right: 'Hola / Buenas tardes' },
                { left: 'ありがとう (Arigatou)', right: 'Gracias' },
                { left: 'さようなら (Sayounara)', right: 'Adiós' },
                { left: 'はい (Hai)', right: 'Sí / Correcto' }
              ]
            }
          ]
        },
        {
          id: 'ja-u1-chest',
          languageId: 'ja',
          unitId: 'ja-unit-1',
          nodeType: 'chest',
          icon: '🎁',
          title: 'Cofre de Sakura',
          description: '¡Recompensa japonesa!',
          level: 'A1 Principiante',
          xpReward: 10,
          gemReward: 25,
          exercises: [],
          chestReward: {
            gems: 25,
            message: '¡Sugoi! Has desbloqueado el cofre de Sakura. +25 Gemas para tu pasaporte.'
          }
        },
        {
          id: 'ja-u1-trophy',
          languageId: 'ja',
          unitId: 'ja-unit-1',
          nodeType: 'trophy',
          icon: '🏆',
          title: 'Desafío Unidad 1: Japón',
          description: 'Consolida tu pronunciación del saludo de respeto.',
          level: 'A1 Principiante',
          xpReward: 40,
          gemReward: 20,
          exercises: [
            {
              id: 'ja-u1-e4',
              type: 'pronunciation',
              prompt: 'Pronuncia la frase más importante en las relaciones de respeto:',
              targetPhrase: "よろしくおねがいします (Yoroshiku onegaishimasu)",
              targetTranslation: '¡Cuento con su apoyo / Encantado de cooperar!',
              tipForPronouncing: "Pronuncia la 'r' con suavidad, similar a la 'r' simple de 'pero'.",
              explanation: 'Indispensable en toda presentación formal o grupo de estudio en Japón.'
            }
          ]
        }
      ]
    },
    {
      id: 'ja-unit-2',
      languageId: 'ja',
      unitNumber: 2,
      title: 'Sección 2: Anime, Ramen & Vida Juvenil',
      subtitle: 'Comida callejera, cultura pop y expresiones de Shibuya',
      level: 'A2 Elemental',
      icon: '🍜',
      colorScheme: {
        bg: 'from-amber-500 to-rose-600',
        border: 'border-amber-600',
        text: 'text-amber-700',
        accent: 'bg-amber-500'
      },
      guidebook: {
        summary: 'Pide ramen, expresa lo delicioso que está y habla de tus series favoritas.',
        keyGrammar: 'Usa "Oishii desu!" para decir que algo está delicioso.',
        vocabularyTip: '"Maji de!?" es la expresión informal por excelencia para decir "¿en serio?".'
      },
      lessons: [
        {
          id: 'ja-u2-s1',
          languageId: 'ja',
          unitId: 'ja-unit-2',
          nodeType: 'lesson',
          icon: '🍜',
          title: 'Sesión 1: Comiendo Ramen en Tokio',
          description: 'Pide y comenta sobre platos japoneses.',
          level: 'A2 Elemental',
          xpReward: 25,
          gemReward: 10,
          exercises: [
            {
              id: 'ja-u2-e1',
              type: 'fill-blank',
              prompt: 'Completa: "¡Este ramen está muy sabroso!"',
              sentenceWithBlank: 'Kono ramen wa totemo _____ desu!',
              options: ['oishii', 'takai', 'omoshiroi', 'hayai'],
              correctAnswer: 'oishii',
              explanation: "'Oishii' (美味しい) significa delicioso o sabroso."
            }
          ]
        },
        {
          id: 'ja-u2-trophy',
          languageId: 'ja',
          unitId: 'ja-unit-2',
          nodeType: 'trophy',
          icon: '🏆',
          title: 'Desafío Unidad 2: Tokio Pop',
          description: 'Demuestra tus habilidades culinarias y culturales.',
          level: 'A2 Elemental',
          xpReward: 40,
          gemReward: 20,
          exercises: [
            {
              id: 'ja-u2-e2',
              type: 'multiple-choice',
              prompt: '¿Qué se dice antes de empezar a comer en Japón?',
              options: ['いただきます (Itadakimasu)', 'さようなら (Sayounara)', 'ごちそうさま (Gochisousama)', 'おやすみ (Oyasumi)'],
              correctAnswer: 'いただきます (Itadakimasu)',
              explanation: "'Itadakimasu' agradece por los alimentos recibidos antes de comer."
            }
          ]
        }
      ]
    }
  ],
  ko: [
    {
      id: 'ko-unit-1',
      languageId: 'ko',
      unitNumber: 1,
      title: 'Sección 1: Annyeonghaseyo! Primeros Pasos en Seúl',
      subtitle: 'Alfabeto Hangul, saludos educados y presentaciones',
      level: 'A1 Principiante',
      icon: '✨',
      colorScheme: {
        bg: 'from-fuchsia-500 to-pink-600',
        border: 'border-fuchsia-600',
        text: 'text-fuchsia-700',
        accent: 'bg-fuchsia-500'
      },
      guidebook: {
        summary: 'Aprende los bloques silábicos del Hangul y los saludos cordiales.',
        keyGrammar: 'El verbo siempre va al final de la oración en coreano (Sujeto + Objeto + Verbo).',
        vocabularyTip: '"Hwaiting!" (화이팅) se usa constantemente para dar ánimo en exámenes y deportes.'
      },
      lessons: [
        {
          id: 'ko-u1-s1',
          languageId: 'ko',
          unitId: 'ko-unit-1',
          nodeType: 'lesson',
          icon: '⭐',
          title: 'Sesión 1: Saludos Básicos',
          description: 'Aprende a decir hola y dar las gracias.',
          level: 'A1 Principiante',
          xpReward: 20,
          gemReward: 10,
          exercises: [
            {
              id: 'ko-u1-e1',
              type: 'multiple-choice',
              prompt: '¿Cómo dices "Hola" de forma educada en coreano?',
              options: ['안녕하세요 (Annyeonghaseyo)', '감사합니다 (Gamsahamnida)', '안녕히 가세요 (Annyeonghi gaseyo)', '죄송합니다 (Joesonghamnida)'],
              correctAnswer: '안녕하세요 (Annyeonghaseyo)',
              explanation: "'안녕하세요' (Annyeonghaseyo) es el saludo respetuoso más usado en Corea."
            },
            {
              id: 'ko-u1-e2',
              type: 'scramble',
              prompt: 'Ordena para decir: "Encantado de conocerte"',
              scrambledWords: ['반가워요', '만나서', '!'],
              correctSentence: '만나서 반가워요 !',
              explanation: "'만나서 반가워요' es la frase estándar y amistosa para decir mucho gusto."
            }
          ]
        },
        {
          id: 'ko-u1-s2',
          languageId: 'ko',
          unitId: 'ko-unit-1',
          nodeType: 'lesson',
          icon: '🎤',
          title: 'Sesión 2: Expresiones K-Drama & K-Pop',
          description: 'Daebak, jinjja y frases queridas de las canciones.',
          level: 'A1 Principiante',
          xpReward: 25,
          gemReward: 10,
          exercises: [
            {
              id: 'ko-u1-e3',
              type: 'match-pairs',
              prompt: 'Empareja las expresiones coreanas más queridas:',
              explanation: 'Expresiones que escucharás constantemente en K-Dramas y canciones.',
              pairs: [
                { left: '감사합니다 (Gamsahamnida)', right: 'Muchas gracias' },
                { left: '대박! (Daebak!)', right: '¡Increíble! / ¡Genial!' },
                { left: '화이팅! (Hwaiting!)', right: '¡Ánimo! / ¡Tú puedes!' },
                { left: '진짜? (Jinjja?)', right: '¿De verdad? / ¿En serio?' }
              ]
            }
          ]
        },
        {
          id: 'ko-u1-chest',
          languageId: 'ko',
          unitId: 'ko-unit-1',
          nodeType: 'chest',
          icon: '🎁',
          title: 'Cofre K-Pop',
          description: '¡Recompensa de estudio!',
          level: 'A1 Principiante',
          xpReward: 10,
          gemReward: 25,
          exercises: [],
          chestReward: {
            gems: 25,
            message: '¡Daebak! Has abierto el cofre de Coreano. +25 Gemas para tu pasaporte.'
          }
        },
        {
          id: 'ko-u1-trophy',
          languageId: 'ko',
          unitId: 'ko-unit-1',
          nodeType: 'trophy',
          icon: '🏆',
          title: 'Desafío Unidad 1: Seúl',
          description: 'Consolida tu grito de aliento coreano.',
          level: 'A1 Principiante',
          xpReward: 40,
          gemReward: 20,
          exercises: [
            {
              id: 'ko-u1-e4',
              type: 'pronunciation',
              prompt: 'Pronuncia con energía el grito de ánimo juvenil:',
              targetPhrase: "오늘도 화이팅! (Oneuldo hwaiting!)",
              targetTranslation: '¡Ánimo también hoy!',
              tipForPronouncing: "Pronuncia '화이팅' con entusiasmo, como 'fai-ting' o 'huai-ting'.",
              explanation: "El ánimo universal entre jóvenes para superar retos y exámenes."
            }
          ]
        }
      ]
    }
  ]
};
