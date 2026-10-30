import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES } from '../data/languages';
import { CertificateData } from '../types';
import { sounds } from '../utils/audio';
import { 
  Award, 
  CheckCircle, 
  Printer, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Share2
} from 'lucide-react';

interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const EXAM_DATABASE: Record<string, ExamQuestion[]> = {
  en: [
    { id: 1, question: 'Which sentence is grammatically correct to introduce yourself?', options: ["I have 20 years old and study law.", "I am 20 years old and I study law.", "I am with 20 years and study law.", "Me am 20 years old."], correct: 1, explanation: "In English we use the verb 'to be' for age (I am 20 years old)." },
    { id: 2, question: 'What is the formal document required to express your motivation for a scholarship?', options: ['Syllabus', 'Statement of Purpose (Cover Letter)', 'Tuition Receipt', 'Transcript Summary'], correct: 1, explanation: "'Statement of Purpose' is the official essay detailing your goals and academic motivation." },
    { id: 3, question: 'Complete: "If I receive the scholarship, I _____ contribute to global research."', options: ['will', 'would have', 'am did', 'was'], correct: 0, explanation: "First conditional uses 'if + present', 'will + verb' for realistic future outcomes." },
    { id: 4, question: 'What does the youth slang phrase "I got you covered" mean?', options: ['I will hide you', 'I have your back / I will take care of it', 'You need an umbrella', 'I am reading your book'], correct: 1, explanation: "'I got you covered' expresses reliable support and friendship." }
  ],
  fr: [
    { id: 1, question: 'Quelle est la formule correcte pour saluer poliment le matin ?', options: ['Bonsoir monsieur', 'Bonjour monsieur', 'Bonne nuit', 'À la vôtre'], correct: 1, explanation: "'Bonjour' s'utilise tout au long de la journée jusqu'au coucher du soleil." },
    { id: 2, question: 'Complétez : "Je voudrais poser ma candidature pour la bourse _____."', options: ['d\'études', 'au café', 'de la porte', 'du train'], correct: 0, explanation: "'Une bourse d\'études' désigne le soutien financier accordé aux étudiants." },
    { id: 3, question: 'Que signifie l\'expression familière « C\'est ouf ! » ?', options: ['C\'est triste', 'C\'est fou / incroyable (Verlan)', 'C\'est trop chaud', 'C\'est tard'], correct: 1, explanation: "'Ouf' est l'inversion en verlan du mot 'fou'." },
    { id: 4, question: 'Traduisez : « J\'ai hâte de commencer cette formation » :', options: ['Tengo prisa de terminar', 'Tengo muchas ganas / entusiasmo de iniciar esta capacitación', 'No quiero empezar', 'Llego tarde a clase'], correct: 1, explanation: "'Avoir hâte de' signifie avoir grand plaisir et impatience de faire quelque chose." }
  ],
  pt: [
    { id: 1, question: 'Qual frase está correta em português brasileiro?', options: ['Eu vou estudar na universidade pública.', 'Eu vai estuda na universidade.', 'Eu sou estudando agora.', 'Eu ter estudado.'], correct: 0, explanation: "A estrutura correta com o verbo ir no presente é 'Eu vou estudar'." },
    { id: 2, question: 'O que significa a expressão juvenil «Partiu!»?', options: ['Vamos embora! / ¡Vamos!', 'Quebrou em pedaços', 'Estou triste', 'Cheguei atrasado'], correct: 0, explanation: "'Partiu!' é o convite espontâneo universal entre jovens para iniciar uma atividade." },
    { id: 3, question: 'Para se candidatar ao programa PEC-G no Brasil, é necessário:', options: ['Pagar matrícula mensal', 'Concluir o ensino médio com bom desempenho', 'Ser maior de 50 anos', 'Falar 5 idiomas'], correct: 1, explanation: "O PEC-G exige conclusão regular do ensino médio com bom rendimento escolar." }
  ],
  de: [
    { id: 1, question: 'Wie sagt man auf Deutsch "Yo estudio en la universidad"?', options: ['Ich lerne in die Schule.', 'Ich studiere an der Universität.', 'Ich mache Hausaufgaben.', 'Ich bin ein Lehrer.'], correct: 1, explanation: "'Studieren an der Universität' ist der exakte Ausdruck für Hochschulbildung." },
    { id: 2, question: 'Was bedeutet das Wort "Stipendium"?', options: ['Beca de estudios', 'Examen reprobado', 'Biblioteca pública', 'Profesor adjunto'], correct: 0, explanation: "Ein Stipendium ist eine finanzielle Unterstützung für begabte Lernende." },
    { id: 3, question: 'Ergänzen Sie: "Ich freue mich _____ Ihre Rückmeldung."', options: ['auf', 'über', 'mit', 'nach'], correct: 0, explanation: "'Sich freuen auf + Akk' drückt Vorfreude auf eine zukünftige Antwort aus." }
  ],
  ja: [
    { id: 1, question: '「はじめまして」はいつ使いますか？ (Hajimemashite wa itsu tsukaimasu ka?)', options: ['初めて会ったとき (Al conocerse por primera vez)', '寝る前 (Antes de dormir)', 'ご飯を食べるとき (Al comer)', 'さようならのとき (Al despedirse)'], correct: 0, explanation: "はじめまして (Hajimemashite) solo se dice la primera vez que conoces a alguien." },
    { id: 2, question: '日本政府(文部科学省)の全額奨学金の略称は？', options: ['MEXT', 'NASA', 'UNESCO', 'FIFA'], correct: 0, explanation: "MEXT es la beca Monbukagakusho del Ministerio de Educación de Japón." },
    { id: 3, question: '「がんばって！」のスペイン語訳は？', options: ['¡Buen viaje!', '¡Da lo mejor de ti / Ánimo!', '¡Hasta mañana!', '¡Muchas gracias!'], correct: 1, explanation: "がんばって (Ganbatte) es la palabra de aliento y superación japonesa." }
  ],
  ko: [
    { id: 1, question: '한국에서 가장 정중하고 대표적인 인사는?', options: ['안녕하세요 (Annyeonghaseyo)', '잘 자 (Jal ja)', '밥 먹었어? (Bap meogeosseo?)', '바이 (Bye)'], correct: 0, explanation: "'안녕하세요' (Annyeonghaseyo) es el saludo estándar educado en Corea." },
    { id: 2, question: 'GKS 장학금의 주요 혜택은 무엇입니까?', options: ['학비 및 항공료 전액 지원 + 생활비 (100% matrícula + vuelos + estipendio)', '단순 기념품 증정', '온라인 책 1권 무료', '할인 쿠폰'], correct: 0, explanation: "La beca GKS del gobierno coreano cubre el 100% de la colegiatura, pasajes y vida." },
    { id: 3, question: '친구를 응원할 때 외치는 한국 젊은이들의 구호는?', options: ['화이팅! (Hwaiting!)', '그만해! (Geumanhae!)', '어디가? (Eodiga?)', '잘 가! (Jal ga!)'], correct: 0, explanation: "화이팅! (Hwaiting!) es el grito de ánimo universal en Corea." }
  ]
};

export const ExamCertificateView: React.FC = () => {
  const { currentLanguage, profile, updateProfileName, addXp, addGems } = useApp();

  const [studentNameInput, setStudentNameInput] = useState<string>(profile.name || 'Joven Estudiante');
  const [examInProgress, setExamInProgress] = useState<boolean>(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<number>(0);
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null);

  const langInfo = LANGUAGES[currentLanguage] || LANGUAGES.en;
  const questions = EXAM_DATABASE[currentLanguage] || EXAM_DATABASE.en;

  const handleStartExam = () => {
    setExamInProgress(true);
    setExamFinished(false);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setCertificateData(null);
    if (profile.soundEnabled) sounds.playClick();
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    if (profile.soundEnabled) sounds.playClick();
  };

  const handleSubmitExam = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / questions.length) * 100);
    setExamScore(calculatedScore);
    setExamFinished(true);
    setExamInProgress(false);

    if (calculatedScore >= 60) {
      const cert: CertificateData = {
        id: `PJ-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        studentName: studentNameInput.trim() || 'Estudiante Políglota',
        language: langInfo.name,
        level: calculatedScore >= 90 ? 'B1 Intermedio Superior' : 'A2 Elemental Consolidado',
        score: calculatedScore,
        issueDate: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
        verificationCode: `VERIFIED-FREE-PJ-${Math.floor(100000 + Math.random() * 900000)}`
      };
      setCertificateData(cert);
      addXp(100);
      addGems(30);
      if (profile.soundEnabled) sounds.playFanfare();
    } else {
      if (profile.soundEnabled) sounds.playError();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Acreditación Abierta y 100% Gratuita</span>
            <span aria-hidden="true">·</span>
            <span>Sin Costos Ni Trabas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Evaluación & Certificados de {langInfo.name} {langInfo.flag}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            Demuestra lo que has aprendido. Al aprobar la evaluación con 60% o más, recibirás tu <strong>Certificado Oficial de Polyglot Joven</strong> para enriquecer tu CV y aplicaciones de becas.
          </p>
        </div>
      </div>

      {/* Main State Switches */}
      {!examInProgress && !examFinished && (
        <div className="mt-8 max-w-2xl mx-auto space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-2xl shrink-0">
                🎓
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Examen de Acreditación: {langInfo.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {questions.length} preguntas de comprensión lectora, vocabulario juvenil y estructuras clave.
                </p>
              </div>
            </div>

            {/* Student Name Input for Certificate */}
            <div className="space-y-1.5">
              <label htmlFor="student-name" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Tu Nombre Completo (como aparecerá en el certificado):
              </label>
              <input
                id="student-name"
                type="text"
                value={studentNameInput}
                onChange={(e) => {
                  setStudentNameInput(e.target.value);
                  updateProfileName(e.target.value);
                }}
                placeholder="Ej. Camila Morales Rivera"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="font-bold text-slate-900 dark:text-white">Reglas de la evaluación:</div>
              <ul className="space-y-1 list-disc pl-4">
                <li>Puntaje mínimo de aprobación: 60% (3/4 preguntas o más).</li>
                <li>Retroalimentación instantánea al terminar con explicaciones paso a paso.</li>
                <li>Emisión inmediata de Certificado Verificable descargable e imprimible.</li>
              </ul>
            </div>

            <button
              onClick={handleStartExam}
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>Comenzar Evaluación Oficial</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* Exam In Progress */}
      {examInProgress && (
        <div className="mt-8 max-w-2xl mx-auto space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
            
            {/* Header progress */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
              <span>Evaluación de {langInfo.name}</span>
              <span className="font-mono">Pregunta {currentQuestionIdx + 1} de {questions.length}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all rounded-full"
                style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Current Question */}
            {(() => {
              const currentQ = questions[currentQuestionIdx];
              const selectedOpt = selectedAnswers[currentQuestionIdx];

              return (
                <div className="space-y-6 pt-2">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {currentQ.question}
                  </h3>

                  <div className="space-y-3">
                    {currentQ.options.map((option, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(currentQuestionIdx, optIdx)}
                          className={`w-full p-4 rounded-xl text-left text-sm sm:text-base font-semibold border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                          }`}
                        >
                          <span>{option}</span>
                          <span className={`w-5 h-5 rounded-full border text-xs flex items-center justify-center ${
                            isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                          }`}>
                            {isSelected ? '✓' : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      disabled={currentQuestionIdx === 0}
                      onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 disabled:opacity-30"
                    >
                      ← Anterior
                    </button>

                    {currentQuestionIdx < questions.length - 1 ? (
                      <button
                        disabled={selectedOpt === undefined}
                        onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                        className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold transition-colors"
                      >
                        Siguiente Pregunta →
                      </button>
                    ) : (
                      <button
                        disabled={selectedOpt === undefined}
                        onClick={handleSubmitExam}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold transition-colors shadow-sm"
                      >
                        Finalizar & Evaluar
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      )}

      {/* Exam Finished & Certificate View */}
      {examFinished && (
        <div className="mt-8 space-y-8 max-w-4xl mx-auto">
          {/* Result Score Banner */}
          <div className={`p-6 rounded-3xl border text-center space-y-3 ${
            examScore >= 60 
              ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800' 
              : 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800'
          }`}>
            <div className="text-3xl">{examScore >= 60 ? '🎉' : '📚'}</div>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {examScore >= 60 ? '¡Felicitaciones! Has Aprobado la Evaluación' : 'Sigue Practicando, ¡estás muy cerca!'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Puntaje obtenido: <strong className="font-mono text-base">{examScore}%</strong> en {langInfo.name}.
              {examScore >= 60 ? ' Tu certificado oficial gratuito ya está listo.' : ' Repasa las lecciones de la unidad y vuelve a intentarlo gratis.'}
            </p>

            <div className="pt-2 flex items-center justify-center gap-4">
              <button
                onClick={handleStartExam}
                className="px-5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:bg-slate-100"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Repetir Examen</span>
              </button>
            </div>
          </div>

          {/* Official Certificate Card (Downloadable / Printable) */}
          {certificateData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  Documento Oficial de Acreditación Polyglot Joven
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-indigo-700 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir / Guardar PDF</span>
                  </button>
                </div>
              </div>

              {/* Printable Certificate Canvas */}
              <div 
                id="certificate-print-area"
                className="relative bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 p-8 sm:p-12 rounded-3xl border-4 border-double border-amber-300 dark:border-amber-700/60 shadow-xl text-center space-y-6"
              >
                {/* Certificate Golden Seal Header */}
                <div className="flex items-center justify-between border-b border-amber-200 dark:border-slate-800 pb-4">
                  <div className="text-left">
                    <span className="text-xs font-mono font-bold tracking-widest text-amber-700 dark:text-amber-400 uppercase">
                      REPÚBLICA GLOBAL DE JÓVENES POLÍGLOTAS
                    </span>
                    <div className="text-xs text-slate-500">Plataforma Educativa Abierta & Gratuita</div>
                  </div>
                  <div className="text-right text-xs font-mono text-slate-500">
                    ID: {certificateData.verificationCode}
                  </div>
                </div>

                <div className="space-y-2 py-4">
                  <div className="w-16 h-16 rounded-full bg-amber-400 text-white flex items-center justify-center text-3xl mx-auto shadow-md">
                    🌎
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    CERTIFICADO DE LOGRO LINGÜÍSTICO
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 italic">
                    Se otorga con distinción y reconocimiento académico a:
                  </p>
                </div>

                {/* Student Name */}
                <div className="py-2 border-b-2 border-slate-900 dark:border-white max-w-lg mx-auto">
                  <span className="text-2xl sm:text-4xl font-extrabold text-indigo-700 dark:text-indigo-400 font-display">
                    {certificateData.studentName}
                  </span>
                </div>

                {/* Description of Achievement */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Por haber completado satisfactoriamente la evaluación de suficiencia y habilidades comunicativas en el idioma <strong>{certificateData.language}</strong> alcanzando el nivel <strong>{certificateData.level}</strong> con una calificación aprobatoria de <strong>{certificateData.score}%</strong>.
                </p>

                {/* Footer Signatures & Date */}
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-amber-200 dark:border-slate-800 text-xs">
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 dark:text-white">
                      Comité Académico Polyglot Joven
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Educación Abierta Para el Futuro
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 dark:text-white font-mono">
                      {certificateData.issueDate}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Fecha de Expedición Oficial
                    </div>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 dark:text-slate-500">
                  Este certificado valida el aprendizaje autónomo y continuo según el Marco de Referencia Internacional de Polyglot Joven. ¡Aprende idiomas, abre tu mundo!
                </div>
              </div>
            </div>
          )}

          {/* Question Review Accordion */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
            <h4 className="font-bold text-base text-slate-900 dark:text-white">
              Revisión de Respuestas & Explicaciones:
            </h4>
            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userChoice = selectedAnswers[idx];
                const isCorrect = userChoice === q.correct;

                return (
                  <div key={q.id} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900 dark:text-white">
                        {idx + 1}. {q.question}
                      </span>
                      <span className={isCorrect ? 'text-emerald-600' : 'text-rose-600'}>
                        {isCorrect ? '✓ Correcto' : '✗ Incorrecto'}
                      </span>
                    </div>
                    <div className="text-slate-500">
                      <strong>Respuesta correcta:</strong> {q.options[q.correct]}
                    </div>
                    <div className="text-indigo-600 dark:text-indigo-400">
                      💡 {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
