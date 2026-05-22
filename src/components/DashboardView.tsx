/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Award, 
  Flame, 
  GraduationCap, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  Play, 
  MessageSquare, 
  Bookmark, 
  Clock, 
  Star, 
  CheckSquare, 
  Compass,
  Zap,
  Lock,
  Trophy
} from 'lucide-react';
import { UserStats, Course } from '../types';

interface DashboardViewProps {
  user: UserStats;
  courses: Course[];
  onResumeLearning: () => void;
  onSelectCourse: (courseId: string) => void;
}

export default function DashboardView({ 
  user, 
  courses, 
  onResumeLearning,
  onSelectCourse
}: DashboardViewProps) {
  // Weekly SVG active column
  const [activeDay, setActiveDay] = useState<string | null>('Wed');

  const stats = [
    { label: 'Courses Completed', value: '4/12', sub: 'Active Tracks', icon: GraduationCap, color: 'text-indigo-400 bg-indigo-500/10' },
    { label: 'Total XP Earned', value: user.xp.toLocaleString(), sub: 'Top 8%', icon: Star, color: 'text-amber-400 bg-amber-500/10' },
    { label: 'Quiz Avg Score', value: '87%', sub: 'Based on 6 quiz', icon: CheckSquare, color: 'text-emerald-400 bg-emerald-500/10' },
    { label: 'Hours Learned', value: '34h', sub: 'Study time', icon: Clock, color: 'text-sky-400 bg-sky-500/10' }
  ];

  const activities = [
    { id: 'act-1', type: 'quiz', text: 'Completed Hooks Quiz', meta: '2 hours ago', icon: CheckCircle2, color: 'text-emerald-400' },
    { id: 'act-2', type: 'badge', text: 'Earned Performance Badge', meta: 'Yesterday', icon: Award, color: 'text-purple-400' },
    { id: 'act-3', type: 'video', text: 'Watched React Server Components', meta: 'Yesterday', icon: Play, color: 'text-sky-400' },
    { id: 'act-4', type: 'forum', text: 'Replied in Community Forum', meta: '2 days ago', icon: MessageSquare, color: 'text-amber-400' },
    { id: 'act-5', type: 'course', text: 'Started Advanced TypeScript', meta: '3 days ago', icon: Bookmark, color: 'text-indigo-400' }
  ];

  const achievements = [
    { id: 'ach-1', name: 'Fast Learner', desc: 'Finish 2 modules in under 4 hours', unlocked: true, icon: Zap, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    { id: 'ach-2', name: 'Code Ninja', desc: 'Pass all Playground challenges', unlocked: true, icon: Compass, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { id: 'ach-3', name: 'Fire Starter', desc: 'Reach a 10-day streak tier', unlocked: true, icon: Flame, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    { id: 'ach-4', name: 'Locked', desc: 'Finish all Reactor Core quizzes', unlocked: false, icon: Lock, color: 'bg-[#292935] text-[#c7c4d8]/40 border-transparent' }
  ];

  const weeklyData = [
    { day: 'Mon', hours: 1.5, height: 'h-12' },
    { day: 'Tue', hours: 2.8, height: 'h-24' },
    { day: 'Wed', hours: 4.2, height: 'h-36' },
    { day: 'Thu', hours: 1.8, height: 'h-16' },
    { day: 'Fri', hours: 3.5, height: 'h-28' },
    { day: 'Sat', hours: 0.8, height: 'h-8' },
    { day: 'Sun', hours: 2.1, height: 'h-20' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Welcome Banner */}
      <section className="relative w-full overflow-hidden rounded-2xl bg-[#1A1A2E] border border-[#2A2A3E] p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Background gradient bubble */}
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl -z-10 pointer-events-none" />
        
        <div className="space-y-4 max-w-xl">
          <h2 className="text-[#e3e0f1] font-bold text-3xl tracking-tight flex items-center gap-3">
            Welcome back, {user.name} <span className="animate-wave origin-bottom-right inline-block">👋</span>
          </h2>
          <p className="text-lg text-[#c7c4d8] leading-relaxed">
            Ready to master React 19 today? Pick up right where you left off.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button 
              onClick={onResumeLearning}
              className="px-6 py-3 bg-[#c4c0ff] hover:bg-[#b0abff] text-[#2000a4] font-bold rounded-lg transition-all shadow-lg shadow-indigo-500/10 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              Resume Learning
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="px-4 py-3 bg-[#1f1e2a] hover:bg-[#292935] border border-[#2A2A3E] text-[#e3e0f1] font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer">
              <span className="text-amber-400">🔥</span>
              <span>{user.streak} day streak</span>
            </button>
          </div>
        </div>

        {/* Current progress badge */}
        <div className="relative shrink-0 rounded-xl bg-[#252541]/40 border border-[#2A2A3E]/30 p-6 w-full md:w-80 overflow-hidden text-center backdrop-blur-md">
          {/* Circular abstract background glow */}
          <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full border border-indigo-500/20" />
          <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full border border-purple-500/10" />
          
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#c7c4d8]/60 mb-2">
            CURRENT PROGRESS
          </p>
          <h3 className="text-2xl font-bold text-[#e3e0f1] mb-1">
            React Architect
          </h3>
          <p className="text-xs text-[#c4c0ff]/85 font-semibold">
            Top 5% of learners this week
          </p>
          <div className="mt-4 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="w-2 h-2 rounded-full bg-[#c4c0ff] animate-pulse"></span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Widgets */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-xl p-5 hover:border-[#c4c0ff]/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-[#c7c4d8]/70">
                  {stat.label}
                </span>
                <span className={`p-2 rounded-lg ${stat.color} transition-colors`}>
                  <Icon className="h-5 w-5" />
                </span>
              </div>
              <div className="space-y-1">
                <h4 className="text-3xl font-bold text-[#e3e0f1] tracking-tight group-hover:text-[#c4c0ff] transition-colors">
                  {stat.value}
                </h4>
                <p className="text-xs text-[#c7c4d8]/40">
                  {stat.sub}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Continue Learning & Progress Charts */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Continue Learning Course Banner */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#e3e0f1]">Continue Learning</h3>
            
            <div className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-xl overflow-hidden flex flex-col md:flex-row hover:border-[#c4c0ff]/30 transition-all group">
              <div className="relative md:w-[240px] h-48 md:h-auto overflow-hidden shrink-0">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1QaUVq2P5gGLKMk6GIArqON3regwUoRYHFPe2qqbkqppniDDZLnSnCNd6hns4KRnyjShSU2wXVw-z31DWZRv-3P0RkBIsBdSrF14Se8QEHBc4VM6sqyATDa7clZUHTGZtb_sZ_bDnNuRNSVqE9_Q1-HOnuShihjjjEXt2eKEdxqhSrITTR9ju_ZXYxrLB9DwJHuuIv4OooCwVSXfxsr4GuVq6EjW0zXNtQZ3W8W_Txt7NTv85uRaB_xEBIxCFjSC2oTiutIQV4Uc" 
                  alt="React state management"
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide">
                  Intermediate
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs text-[#c7c4d8]/60 mb-2">
                    <span>Active Track</span>
                    <span>Module 4 of 8</span>
                  </div>
                  <h4 className="text-2xl font-bold text-[#e3e0f1] hover:text-[#c4c0ff] transition-all cursor-pointer" onClick={() => onSelectCourse('modern-react-foundations')}>
                    React State Management
                  </h4>
                  <p className="text-sm text-[#c7c4d8]/70 mt-2 line-clamp-2">
                    Level up your complex data orchestrations. Learn to select selectors, optimize re-renders, and use state containers safely.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between text-xs text-[#c7c4d8]/70 font-semibold mb-1">
                      <span>68% Complete</span>
                      <span className="text-[#c4c0ff]">12 / 18 Lessons</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#292935] rounded-full overflow-hidden">
                      <div className="bg-[#c4c0ff] h-full rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>

                  {/* Next Lesson Box */}
                  <button 
                    onClick={() => onSelectCourse('modern-react-foundations')}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-[#1f1e2a] hover:bg-[#252541] hover:border-[#c4c0ff]/40 border border-[#2A2A3E] transition-all cursor-pointer text-left active:scale-98"
                  >
                    <div className="flex items-center gap-3">
                      <span className="p-1.5 rounded bg-indigo-500/20 text-indigo-400">
                        <Play className="h-4 w-4 fill-indigo-400" />
                      </span>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-[#c7c4d8]/50">
                          NEXT LESSON
                        </p>
                        <p className="text-sm font-bold text-[#e3e0f1]">
                          Zustand vs Redux
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-[#c7c4d8]/50 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Progress Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#e3e0f1]">Weekly Progress</h3>
              <span className="text-xs text-[#c7c4d8]/50">Oct 21 - Oct 27</span>
            </div>
            
            <div className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-xl p-6">
              {/* Custom SVG/HTML Bar Chart */}
              <div className="flex items-end justify-between h-48 pt-6 border-b border-[#2A2A3E]/60 px-2 sm:px-6">
                {weeklyData.map((item) => {
                  const isActive = activeDay === item.day;
                  return (
                    <div 
                      key={item.day} 
                      className="flex flex-col items-center gap-3 w-10 cursor-pointer group"
                      onClick={() => setActiveDay(item.day)}
                    >
                      <div className="relative w-full flex items-end justify-center">
                        {/* Hover values */}
                        <div className={`absolute -top-10 scale-0 group-hover:scale-100 transition-all bg-[#292935] border border-[#2A2A3E] text-xs text-[#c4c0ff] font-bold px-2 py-1 rounded shadow-md pointer-events-none ${
                          isActive ? 'scale-100' : ''
                        }`}>
                          {item.hours}h
                        </div>
                        
                        {/* Bar */}
                        <div className={`w-3 sm:w-4 rounded-t-full transition-all duration-300 ${
                          isActive 
                            ? 'bg-[#c4c0ff] shadow-[0_0_12px_rgba(196,192,255,0.4)] h-32' 
                            : 'bg-[#292935] hover:bg-[#c4c0ff]/40 ' + item.height
                        }`} />
                      </div>
                      
                      <span className={`text-xs font-semibold ${
                        isActive ? 'text-[#c4c0ff]' : 'text-[#c7c4d8]/40'
                      }`}>
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              {/* Chart footer detail */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#c7c4d8]/50">
                <p>Selected: <span className="font-bold text-[#e3e0f1]">{activeDay ? activeDay + 'day progress' : 'Hover / Select a day'}</span></p>
                <p>Weekly Total: <span className="font-bold text-[#c4c0ff]">16.7 Hours learned</span></p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Recent Activity & Achievements */}
        <div className="space-y-8">
          
          {/* Recent Activity */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#e3e0f1]">Recent Activity</h3>
            
            <div className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-xl p-6 relative">
              
              {/* Activity line in background */}
              <div className="absolute left-9 top-10 bottom-10 w-px bg-[#2A2A3E]" />
              
              <div className="space-y-6">
                {activities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <div key={act.id} className="flex gap-4 items-start relative z-10 group">
                      <div className={`p-2 rounded-full bg-[#12121d] border border-[#2A2A3E] group-hover:border-[#c4c0ff]/40 transition-colors ${act.color}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <p className="text-sm font-bold text-[#e3e0f1] leading-tight group-hover:text-[#c4c0ff] transition-colors truncate">
                          {act.text}
                        </p>
                        <p className="text-xs text-[#c7c4d8]/40">
                          {act.meta}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Achievements badge grid */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#e3e0f1]">Achievements</h3>
              <button 
                onClick={onResumeLearning}
                className="text-xs text-[#c4c0ff] hover:underline font-semibold"
              >
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((ach) => {
                const Icon = ach.icon;
                return (
                  <div 
                    key={ach.id} 
                    className={`p-4 border rounded-xl flex flex-col items-center text-center space-y-2 hover:border-[#c4c0ff]/30 transition-all ${ach.color}`}
                    title={ach.desc}
                  >
                    <Icon className="h-6 w-6" />
                    <div>
                      <h4 className="text-xs font-bold leading-tight truncate max-w-[120px]">
                        {ach.name}
                      </h4>
                      <p className="text-[10px] opacity-60 leading-tight mt-1 line-clamp-2">
                        {ach.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
      
    </div>
  );
}
