/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import CoursesView from './components/CoursesView';
import PlaygroundView from './components/PlaygroundView';
import QuizzesView from './components/QuizzesView';
import LeaderboardView from './components/LeaderboardView';
import CommunityView from './components/CommunityView';
import ProfileView from './components/ProfileView';
import SettingsView from './components/SettingsView';

import { UserStats, UserSettings } from './types';
import { 
  INITIAL_COURSES, 
  INITIAL_QUIZ_QUESTIONS, 
  INITIAL_LEADERBOARD_USERS, 
  INITIAL_FORUM_POSTS 
} from './data';

export default function App() {
  // Navigation active tab controller
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Bridging course details
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Core User XP & profile States
  const [userStats, setUserStats] = useState<UserStats>({
    name: 'Ahmad',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDI4YViomewaHJ5tdy9cJRcA-0QG4_GNqq_DPZVD11X5n0mexDAJnaIO25O-ztNa2TY0W2WOmqwSeGPIRNbpcrETdMeA1gfxXEERiwhNosCxJYgle4Y2xPrjP88MjAHMyC8W8KY01vx7Mt9MPChxymvZP7dW06ju29Fl30-EFb61eu5cs1JiJjxsNBImacT_a2NrBxr8fEd0r5X_tofnHkMwpUBFNYsiYOyZeufGVdxYLWsHXGLwRQPiCm5pWJPGXCsSnar52GSGE',
    title: 'Senior Frontend Scholar',
    level: 34,
    xp: 2840,
    streak: 12,
    globalRank: 5,
    joinedDate: 'Oct 2024',
    location: 'Jordan'
  });

  // Client layout styling adjustments
  const [userSettings, setUserSettings] = useState<UserSettings>({
    interfaceTheme: 'dark',
    accentColor: '#c4c0ff',
    editorFontSize: 13,
    emailNotifications: true,
    pushNotifications: false
  });

  const handleUpdateXP = (newXp: number) => {
    // Basic automatic leveling tier
    const baseLevel = Math.floor(newXp / 1000) + 32;
    setUserStats((prev) => ({
      ...prev,
      xp: newXp,
      level: baseLevel > prev.level ? baseLevel : prev.level
    }));
  };

  const handleUpdateNameAndAvatar = (name: string, avatar: string) => {
    setUserStats((prev) => ({
      ...prev,
      name,
      avatar
    }));
  };

  const handleUpdateUserStats = (updated: Partial<UserStats>) => {
    setUserStats((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateSettings = (updated: Partial<UserSettings>) => {
    setUserSettings((prev) => ({ ...prev, ...updated }));
  };

  const handleResumeLearning = () => {
    // Bridge to standard Foundations lesson course catalog directly
    setSelectedCourseId('modern-react-foundations');
    setActiveTab('courses');
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveTab('courses');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f1f5f9] font-sans flex transition-all selection:bg-[#c4c0ff]/30 selection:text-[#c4c0ff] relative overflow-hidden">
      
      {/* Ambient glowing blobs for Frosted Glass Theme */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-500/15 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative z-10 flex flex-1 min-w-0 min-h-screen">
        {/* Dynamic Unified Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            // Reset selection bridges on changing tabs
            if (tab !== 'courses') {
              setSelectedCourseId(null);
            }
            setActiveTab(tab);
          }}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          user={userStats}
        />

        {/* Main Workspace Frame */}
        <div 
          className="flex-1 flex flex-col min-w-0 transition-all duration-300 min-h-screen"
          style={{ paddingLeft: sidebarCollapsed ? '80px' : '260px' }}
        >
          
          {/* Main core content area */}
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardView 
              user={userStats} 
              courses={INITIAL_COURSES} 
              onResumeLearning={handleResumeLearning}
              onSelectCourse={handleSelectCourse}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesView 
              courses={INITIAL_COURSES} 
              user={userStats}
              onUpdateXP={handleUpdateXP}
              selectedCourseId={selectedCourseId}
              setSelectedCourseId={setSelectedCourseId}
            />
          )}

          {activeTab === 'playground' && (
            <PlaygroundView />
          )}

          {activeTab === 'quizzes' && (
            <QuizzesView 
              questions={INITIAL_QUIZ_QUESTIONS}
              user={userStats}
              onUpdateXP={handleUpdateXP}
              onNavigateToDashboard={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'leaderboard' && (
            <LeaderboardView users={INITIAL_LEADERBOARD_USERS} />
          )}

          {activeTab === 'community' && (
            <CommunityView 
              initialPosts={INITIAL_FORUM_POSTS} 
              currentUserAvatar={userStats.avatar} 
            />
          )}

          {activeTab === 'profile' && (
            <ProfileView 
              user={userStats} 
              onUpdateNameAndAvatar={handleUpdateNameAndAvatar}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView 
              user={userStats}
              settings={userSettings}
              onUpdateUserStats={handleUpdateUserStats}
              onUpdateSettings={handleUpdateSettings}
            />
          )}
        </main>
      </div>
    </div>

  </div>
);
}
