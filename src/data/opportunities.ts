import { ScholarshipOpportunity, CulturalFact, LanguageId } from '../types';

export const SCHOLARSHIPS: ScholarshipOpportunity[] = [
  {
    id: 'opp-mext',
    languageId: 'ja',
    title: 'Beca Monbukagakusho (MEXT) del Gobierno de Japón',
    institution: 'Ministerio de Educación, Cultura, Deportes, Ciencia y Tecnología de Japón',
    country: 'Japón 🇯🇵',
    type: 'Beca Completa',
    coverage: '100% matrícula + Pasajes de avión ida/vuelta + Estipendio mensual de ~143,000 JPY (~$950 USD) + 1 año de idioma japonés intensivo gratuito',
    deadline: 'Convocatoria anual (Mayo - Junio a través de embajadas de Japón)',
    description: 'Una de las becas más prestigiosas y generosas del mundo para jóvenes pregrado, posgrado y técnicos. No requieres saber japonés avanzado al postular: el gobierno japonés te financia un año de preparación de idioma en Tokio u Osaka.',
    requirements: [
      'Nacionalidad de un país con relaciones diplomáticas con Japón',
      'Haber completado o estar por culminar la educación secundaria (o universitaria)',
      'Pasión por la cultura, ciencia, tecnología o humanidades japonesas',
      'Aprobar exámenes de selección y entrevista en la embajada'
    ],
    tipsForYouth: 'Aprender lo básico de Hiragana, Katakana y saludos cotidianos en Polyglot Joven te dará una ventaja gigantesca en tu carta de motivación y entrevista.',
    applyLink: 'https://www.studyinjapan.go.jp/en/'
  },
  {
    id: 'opp-gks',
    languageId: 'ko',
    title: 'Global Korea Scholarship (GKS - NIIED)',
    institution: 'Instituto Nacional para la Educación Internacional de Corea del Sur',
    country: 'Corea del Sur 🇰🇷',
    type: 'Beca Completa',
    coverage: '100% colegiatura + Boletos aéreos + Subsidio de manutención de ~1,000,000 KRW/mes + Seguro médico + 1 año de curso intensivo de coreano',
    deadline: 'Septiembre - Octubre (Pregrado) y Febrero - Marzo (Posgrado)',
    description: 'Diseñada para fomentar el intercambio global y formar a los futuros líderes jóvenes internacionales en universidades de renombre como SNU, Yonsei, Korea University y KAIST.',
    requirements: [
      'Menor de 25 años (pregrado) o menor de 40 años (posgrado)',
      'Promedio ponderado académico superior al 80% o top 20% de su clase',
      'Excelente salud física y mental'
    ],
    tipsForYouth: 'Presentar un nivel A2 o B1 de coreano o certificado TOPIK te otorga puntos de bonificación inmediatos en la fase de embajada.',
    applyLink: 'https://www.studyinkorea.go.kr'
  },
  {
    id: 'opp-daad',
    languageId: 'de',
    title: 'Becas DAAD (Servicio Alemán de Intercambio Académico)',
    institution: 'DAAD y Universidades Públicas Alemanas',
    country: 'Alemania 🇩🇪',
    type: 'Beca Completa',
    coverage: 'Cero costo de colegiatura (Universidades públicas gratuitas en Alemania) + 934€ a 1,300€ mensuales para manutención + seguro médico + curso de alemán',
    deadline: 'Convocatorias abiertas por áreas a lo largo de todo el año',
    description: 'Alemania ofrece educación superior gratuita de clase mundial tanto para locales como para extranjeros. Las becas DAAD apoyan a jóvenes talentos con ayuda financiera completa.',
    requirements: [
      'Título secundario o grado universitario según el programa',
      'Conocimiento básico de alemán o inglés según la carrera',
      'Proyecto académico o de impacto social claro'
    ],
    tipsForYouth: 'Aun si tu programa es en inglés, demostrar interés y un nivel A2 de alemán abre las puertas para trabajos de medio tiempo (Werkstudent) y vida social.',
    applyLink: 'https://www.daad.de'
  },
  {
    id: 'opp-eiffel',
    languageId: 'fr',
    title: 'Becas de Excelencia Eiffel & Campus France',
    institution: 'Ministerio para Europa y de Asuntos Exteriores de Francia',
    country: 'Francia 🇫🇷',
    type: 'Beca Completa',
    coverage: 'Estipendio mensual de 1,181€ a 1,800€ + pasajes aéreos + actividades culturales y seguro médico',
    deadline: 'Noviembre a Enero de cada año',
    description: 'Programa bandera del gobierno francés para atraer a las mentes jóvenes más brillantes en ingeniería, ciencias exactas, economía, derecho y ciencias políticas.',
    requirements: [
      'Hasta 25 años para máster o 30 años para doctorado',
      'Postular a través de una universidad o Grande École francesa',
      'Excelente rendimiento académico'
    ],
    tipsForYouth: 'Francia cuenta con tarifas universitarias subsidiadas en un 70%-90% para todos los estudiantes, ¡aprender francés te permite estudiar casi gratis en Europa!',
    applyLink: 'https://www.campusfrance.org'
  },
  {
    id: 'opp-erasmus',
    languageId: 'en',
    title: 'Erasmus Mundus Joint Masters & Cuerpo Europeo de Solidaridad',
    institution: 'Comisión Europea',
    country: 'Unión Europea (Múltiples países) 🇪🇺',
    type: 'Beca Completa',
    coverage: 'Beca completa de 1,400€ mensuales + matrícula de 2 universidades en 2 países distintos + pasajes de viaje e instalación',
    deadline: 'Diciembre a Febrero anualmente',
    description: 'Estudia tu maestría viviendo en al menos 2 países diferentes de la Unión Europea mientras te especializas en tecnología, medio ambiente, humanidades o medicina.',
    requirements: [
      'Grado de bachiller o licenciatura completado',
      'Dominio de inglés intermedio-avanzado (B2/C1)',
      'Mentalidad abierta e internacional'
    ],
    tipsForYouth: 'No necesitas experiencia laboral previa para postular; lo que más evalúan es tu motivación genuina y cómo tus estudios beneficiarán a tu comunidad.',
    applyLink: 'https://erasmus-plus.ec.europa.eu/'
  },
  {
    id: 'opp-santander-pecg',
    languageId: 'pt',
    title: 'Programa PEC-G de Pregrado y Becas Santander Iberoamérica',
    institution: 'Ministerio de Relaciones Exteriores de Brasil (MRE)',
    country: 'Brasil 🇧🇷 / Portugal 🇵🇹',
    type: 'Cursos Gratuitos',
    coverage: 'Matrícula 100% gratuita en universidades federales de Brasil (USP, Unicamp, UFRJ) + auxilios económicos del gobierno brasileño',
    deadline: 'Mayo a Julio en las embajadas de Brasil',
    description: 'El mayor programa de cooperación educativa de Brasil para jóvenes de América Latina y África. Estudia medicina, ingeniería o artes gratis en las mejores universidades de la región.',
    requirements: [
      'Haber concluido la secundaria con buen promedio',
      'Edad comprendida entre 18 y 23 años',
      'Certificado básico de portugués CELPE-Bras (o cursarlo al llegar)'
    ],
    tipsForYouth: 'El portugués se aprende en tiempo récord si ya hablas español. Dedicar 30 minutos al día en Polyglot Joven te dejará listo para aprobar la postulación.',
    applyLink: 'https://www.gov.br/mre/pt-br/assuntos/cultura-e-educacao'
  }
];

export const CULTURAL_FACTS: CulturalFact[] = [
  {
    id: 'cf-ja-1',
    languageId: 'ja',
    category: 'Slang Juvenil',
    title: 'Www y Kusatamaya: Cómo ríen los jóvenes en internet en Japón',
    content: 'En los chats japoneses, la risa no se escribe "jajaja", sino con la letra "w", que proviene de "warai" (risa). Cuando algo da muchísima risa, escriben "wwwwww", lo cual parece una pradera de pasto, y por eso inventaron la palabra "kusa" (hierba/césped) para decir "qué chistoso".',
    examplePhrase: {
      native: 'それ草生える (Sore kusa haeru)',
      phonetic: 'so-re ku-sa ja-e-ru',
      spanish: '¡Eso me da demasiada risa!'
    }
  },
  {
    id: 'cf-ko-1',
    languageId: 'ko',
    category: 'Slang Juvenil',
    title: 'Kkeut-pan-wang: El Rey del Final',
    content: 'En la jerga juvenil de Seúl inspirada en los videojuegos, llaman "Kkeut-pan-wang" (끝판왕) al jefe final invencible o a la persona que es la mejor indiscutible en una disciplina (música, baile, deportes o programación).',
    examplePhrase: {
      native: '춤 끝판왕이야! (Chum kkeut-pan-wang-i-ya!)',
      phonetic: 'chum keut-pan-wang-i-ya',
      spanish: '¡Es el dios supremo del baile!'
    }
  },
  {
    id: 'cf-en-1',
    languageId: 'en',
    category: 'Slang Juvenil',
    title: 'No cap, Bet y Rizz: La jerga juvenil de TikTok y gaming',
    content: '"No cap" significa "totalmente en serio / sin mentiras", "Bet" es una forma rápida de decir "¡de una! / trato hecho", y "Rizz" (elegida palabra del año) viene de "charisma", el carisma magnético para conectar con otros.',
    examplePhrase: {
      native: 'That concert was insane, no cap!',
      phonetic: 'dat kan-sert was in-sein, no cap!',
      spanish: '¡Ese concierto estuvo increíble, sin mentiras!'
    }
  },
  {
    id: 'cf-fr-1',
    languageId: 'fr',
    category: 'Slang Juvenil',
    title: 'Le Verlan: El lenguaje al revés de los jóvenes franceses',
    content: 'En Francia, los jóvenes usan "le verlan", un argot que consiste en invertir las sílabas de las palabras: "la fête" (la fiesta) se convierte en "la teuf", "fou" (loco) es "ouf", y "femme" (mujer) es "meuf".',
    examplePhrase: {
      native: "C'est un truc de ouf !",
      phonetic: 'se tan truc de uf !',
      spanish: '¡Es una locura total!'
    }
  },
  {
    id: 'cf-pt-1',
    languageId: 'pt',
    category: 'Slang Juvenil',
    title: 'Mano, crush e sextou: La vibra juvenil de Brasil',
    content: 'En Brasil "mano" es el equivalente de "hermano/amigo íntimo". Y cada viernes por la tarde las redes sociales explotan con la palabra "Sextou!" (¡por fin es viernes, a relajarse!).',
    examplePhrase: {
      native: 'Sextou, mano! Vamos curtir.',
      phonetic: 'sex-to-u, ma-nu! va-mus kur-tir.',
      spanish: '¡Por fin es viernes, amigo! Vamos a disfrutar.'
    }
  },
  {
    id: 'cf-de-1',
    languageId: 'de',
    category: 'Slang Juvenil',
    title: 'Ehrenmann y Krass: Expresiones virales en Alemania',
    content: '"Ehrenmann" (hombre de honor) se le dice a un amigo que te ayuda incondicionalmente o hace un gesto noble. "Krass" se utiliza para cualquier cosa que te sorprenda intensamente (genial o impresionante).',
    examplePhrase: {
      native: 'Du bist ein echter Ehrenmann, danke!',
      phonetic: 'du bist ain ej-ter e-ren-man, dang-ke!',
      spanish: '¡Eres un verdadero amigo de honor, gracias!'
    }
  }
];
