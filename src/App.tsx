/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { Hero } from './components/Hero';
import { LessonsView } from './components/LessonsView';
import { PronunciationLab } from './components/PronunciationLab';
import { ArcadeView } from './components/ArcadeView';
import { ExamCertificateView } from './components/ExamCertificateView';
import { OpportunitiesView } from './components/OpportunitiesView';
import { PassportView } from './components/PassportView';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeTab, isMobileFrame, setIsMobileFrame } = useApp();

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors ${
      isMobileFrame ? 'bg-slate-200 dark:bg-slate-900 py-6' : ''
    }`}>
      {/* Mobile Device Frame Wrapper (when toggled on desktop) */}
      {isMobileFrame ? (
        <div className="flex-1 flex flex-col items-center justify-center p-2">
          {/* Top Bar Switch to Exit Frame */}
          <div className="mb-3 flex items-center justify-between w-full max-w-sm px-2 text-xs text-slate-600 dark:text-slate-400">
            <span className="font-bold">📱 Simulador App Móvil Polyglot Joven</span>
            <button
              onClick={() => setIsMobileFrame(false)}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
            >
              Salir a Vista Completa ✕
            </button>
          </div>

          {/* Smartphone Frame */}
          <div className="relative w-full max-w-[395px] h-[820px] rounded-[48px] border-[10px] border-slate-900 dark:border-slate-800 shadow-2xl bg-white dark:bg-slate-950 overflow-hidden flex flex-col">
            {/* Phone Speaker & Camera Notch */}
            <div className="h-6 bg-slate-900 dark:bg-slate-800 flex items-center justify-center shrink-0">
              <div className="w-20 h-3.5 bg-black rounded-full" />
            </div>

            {/* Scrollable Mobile Content */}
            <div className="flex-1 overflow-y-auto pb-20">
              <Navbar />
              <main>
                {activeTab === 'home' && <HomeView />}
                {activeTab === 'learn' && (
                  <>
                    <Hero />
                    <LessonsView />
                  </>
                )}
                {activeTab === 'pronounce' && <PronunciationLab />}
                {activeTab === 'arcade' && <ArcadeView />}
                {activeTab === 'exams' && <ExamCertificateView />}
                {activeTab === 'opportunities' && <OpportunitiesView />}
                {activeTab === 'passport' && <PassportView />}
              </main>
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        /* Full Standard Web Application */
        <>
          <Navbar />
          <main className="flex-1">
            {activeTab === 'home' && <HomeView />}
            {activeTab === 'learn' && (
              <>
                <Hero />
                <LessonsView />
              </>
            )}
            {activeTab === 'pronounce' && <PronunciationLab />}
            {activeTab === 'arcade' && <ArcadeView />}
            {activeTab === 'exams' && <ExamCertificateView />}
            {activeTab === 'opportunities' && <OpportunitiesView />}
            {activeTab === 'passport' && <PassportView />}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
