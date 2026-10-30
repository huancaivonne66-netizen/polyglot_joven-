export type LanguageId = 'en' | 'fr' | 'pt' | 'de' | 'ja' | 'ko';

export interface LanguageInfo {
  id: LanguageId;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string;
  accentColor: string;
  gradient: string;
  description: string;
  youthContext: string;
  stats: {
    learners: string;
    opportunities: string;
    difficulty: 'Fácil' | 'Intermedio' | 'Desafiante';
  };
  sampleGreeting: {
    phrase: string;
    phonetic: string;
    translation: string;
  };
}

export type ExerciseType = 
  | 'multiple-choice'
  | 'scramble'
  | 'fill-blank'
  | 'match-pairs'
  | 'listen-and-pick'
  | 'pronunciation';

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  prompt: string;
  audioPrompt?: string;
  phoneticHint?: string;
  explanation: string;
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice' | 'listen-and-pick';
  options: string[];
  correctAnswer: string;
}

export interface ScrambleExercise extends BaseExercise {
  type: 'scramble';
  scrambledWords: string[];
  correctSentence: string;
}

export interface FillBlankExercise extends BaseExercise {
  type: 'fill-blank';
  sentenceWithBlank: string;
  options: string[];
  correctAnswer: string;
}

export interface MatchPairsExercise extends BaseExercise {
  type: 'match-pairs';
  pairs: { left: string; right: string }[];
}

export interface PronunciationExercise extends BaseExercise {
  type: 'pronunciation';
  targetPhrase: string;
  targetTranslation: string;
  tipForPronouncing: string;
}

export type Exercise = 
  | MultipleChoiceExercise 
  | ScrambleExercise 
  | FillBlankExercise 
  | MatchPairsExercise 
  | PronunciationExercise;

export type LessonNodeType = 'lesson' | 'chest' | 'practice' | 'trophy';

export interface Lesson {
  id: string;
  languageId: LanguageId;
  unitId: string;
  title: string;
  description: string;
  icon?: string;
  nodeType?: LessonNodeType;
  level: 'A1 Principiante' | 'A2 Elemental' | 'B1 Intermedio' | 'Cultura & Slang';
  xpReward: number;
  gemReward: number;
  exercises: Exercise[];
  chestReward?: { gems: number; message: string };
}

export interface Unit {
  id: string;
  languageId: LanguageId;
  unitNumber: number;
  title: string;
  subtitle: string;
  level: string;
  icon: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
  };
  guidebook: {
    summary: string;
    keyGrammar: string;
    vocabularyTip: string;
  };
  lessons: Lesson[];
}

export interface UserProfile {
  name: string;
  avatar: string;
  currentLanguage: LanguageId;
  xp: number;
  gems: number;
  streak: number;
  hearts: number;
  lastActiveDate: string;
  completedLessons: string[]; // lesson ids
  unlockedStamps: LanguageId[];
  soundEnabled: boolean;
  dailyGoalMinutes: number;
  todayMinutes: number;
  completedQuests: string[];
}

export interface ScholarshipOpportunity {
  id: string;
  languageId: LanguageId;
  title: string;
  institution: string;
  country: string;
  type: 'Beca Completa' | 'Intercambio' | 'Prácticas' | 'Cursos Gratuitos';
  coverage: string;
  deadline: string;
  description: string;
  requirements: string[];
  tipsForYouth: string;
  applyLink: string;
}

export interface CulturalFact {
  id: string;
  languageId: LanguageId;
  category: 'Slang Juvenil' | 'Cultura Pop' | 'Costumbres' | 'Comida & Vida';
  title: string;
  content: string;
  examplePhrase?: {
    native: string;
    phonetic?: string;
    spanish: string;
  };
}

export interface CertificateData {
  id: string;
  studentName: string;
  language: string;
  level: string;
  score: number;
  issueDate: string;
  verificationCode: string;
}
