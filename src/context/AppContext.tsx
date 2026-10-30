import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageId, UserProfile } from '../types';
import { sounds } from '../utils/audio';

interface AppContextType {
  currentLanguage: LanguageId;
  setCurrentLanguage: (lang: LanguageId) => void;
  profile: UserProfile;
  completeLesson: (lessonId: string, xpReward: number, gemReward: number) => void;
  claimChest: (chestId: string, gemReward: number) => void;
  loseHeart: () => void;
  restoreHearts: () => void;
  addXp: (amount: number) => void;
  addGems: (amount: number) => void;
  unlockStamp: (lang: LanguageId) => void;
  toggleSound: () => void;
  updateProfileName: (name: string) => void;
  updateAvatar: (avatar: string) => void;
  activeTab: 'home' | 'learn' | 'pronounce' | 'arcade' | 'exams' | 'opportunities' | 'passport';
  setActiveTab: (tab: 'home' | 'learn' | 'pronounce' | 'arcade' | 'exams' | 'opportunities' | 'passport') => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean | ((prev: boolean) => boolean)) => void;
}

const STORAGE_KEY = 'polyglot_joven_profile_v1';

const defaultProfile: UserProfile = {
  name: 'Joven Políglota',
  avatar: '🚀',
  currentLanguage: 'en',
  xp: 140,
  gems: 45,
  streak: 3,
  hearts: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: ['en-u1-s1'],
  unlockedStamps: ['en'],
  soundEnabled: true,
  dailyGoalMinutes: 15,
  todayMinutes: 8,
  completedQuests: ['quest-1']
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultProfile, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return defaultProfile;
  });

  const [currentLanguage, setCurrentLanguageState] = useState<LanguageId>(profile.currentLanguage || 'en');
  const [activeTab, setActiveTab] = useState<'home' | 'learn' | 'pronounce' | 'arcade' | 'exams' | 'opportunities' | 'passport'>('home');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  const setCurrentLanguage = (lang: LanguageId) => {
    setCurrentLanguageState(lang);
    setProfile(prev => ({ ...prev, currentLanguage: lang }));
    if (profile.soundEnabled) sounds.playClick();
  };

  const completeLesson = (lessonId: string, xpReward: number, gemReward: number) => {
    setProfile(prev => {
      const alreadyDone = prev.completedLessons.includes(lessonId);
      const newCompleted = alreadyDone ? prev.completedLessons : [...prev.completedLessons, lessonId];
      const newStamps = prev.unlockedStamps.includes(currentLanguage)
        ? prev.unlockedStamps
        : [...prev.unlockedStamps, currentLanguage];

      return {
        ...prev,
        completedLessons: newCompleted,
        unlockedStamps: newStamps,
        xp: prev.xp + xpReward,
        gems: prev.gems + gemReward,
        todayMinutes: prev.todayMinutes + 5
      };
    });

    if (profile.soundEnabled) {
      sounds.playSuccess();
      setTimeout(() => sounds.playGemCollect(), 300);
    }
  };

  const claimChest = (chestId: string, gemReward: number) => {
    setProfile(prev => ({
      ...prev,
      completedLessons: prev.completedLessons.includes(chestId) ? prev.completedLessons : [...prev.completedLessons, chestId],
      gems: prev.gems + gemReward
    }));
    if (profile.soundEnabled) {
      sounds.playGemCollect();
    }
  };

  const loseHeart = () => {
    setProfile(prev => ({
      ...prev,
      hearts: Math.max(0, (prev.hearts ?? 5) - 1)
    }));
    if (profile.soundEnabled) sounds.playError();
  };

  const restoreHearts = () => {
    setProfile(prev => ({
      ...prev,
      hearts: 5
    }));
    if (profile.soundEnabled) sounds.playGemCollect();
  };

  const addXp = (amount: number) => {
    setProfile(prev => ({ ...prev, xp: prev.xp + amount }));
  };

  const addGems = (amount: number) => {
    setProfile(prev => ({ ...prev, gems: prev.gems + amount }));
    if (profile.soundEnabled) sounds.playGemCollect();
  };

  const unlockStamp = (lang: LanguageId) => {
    setProfile(prev => {
      if (prev.unlockedStamps.includes(lang)) return prev;
      return { ...prev, unlockedStamps: [...prev.unlockedStamps, lang] };
    });
  };

  const toggleSound = () => {
    setProfile(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const updateProfileName = (name: string) => {
    setProfile(prev => ({ ...prev, name }));
  };

  const updateAvatar = (avatar: string) => {
    setProfile(prev => ({ ...prev, avatar }));
    if (profile.soundEnabled) sounds.playClick();
  };

  return (
    <AppContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage,
        profile,
        completeLesson,
        claimChest,
        loseHeart,
        restoreHearts,
        addXp,
        addGems,
        unlockStamp,
        toggleSound,
        updateProfileName,
        updateAvatar,
        activeTab,
        setActiveTab,
        isMobileFrame,
        setIsMobileFrame
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
