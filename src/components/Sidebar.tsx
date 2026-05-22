/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutGrid, 
  BookOpen, 
  Code2, 
  HelpCircle, 
  Trophy, 
  Users, 
  User, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { UserStats } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  user: UserStats;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  collapsed, 
  setCollapsed,
  user
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'playground', label: 'Playground', icon: Code2 },
    { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'community', label: 'Community', icon: Users },
  ];

  const bottomItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 h-full bg-white/10 backdrop-blur-xl border-r border-white/10 flex flex-col py-6 transition-all duration-300 z-50 ${
        collapsed ? 'w-20' : 'w-[260px]'
      }`}
    >
      {/* Brand Logo */}
      <div className={`px-6 mb-8 transition-all ${collapsed ? 'text-center px-2' : ''}`}>
        <h1 className={`font-bold text-white transition-all duration-200 ${
          collapsed ? 'text-lg' : 'text-2xl'
        }`}>
          {collapsed ? 'RP' : 'ReactPath'}
        </h1>
        {!collapsed && (
          <p className="text-xs text-white uppercase tracking-wider mt-1 font-semibold opacity-60">
            Learning Platform
          </p>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 px-3">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer active:scale-98 ${
                isActive 
                  ? 'bg-white/15 text-white border-l-2 border-[#c4c0ff]' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <IconComponent className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : ''}`} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer / Account Actions */}
      <div className="mt-auto px-3 pt-6 border-t border-white/10">
        <div className="space-y-1 mb-4">
          {bottomItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer active:scale-98 ${
                  isActive 
                    ? 'bg-white/15 text-white border-l-2 border-[#c4c0ff]' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <IconComponent className={`h-5 w-5 shrink-0 ${isActive ? 'text-white' : ''}`} />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Collapse Button */}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider text-white/40 hover:bg-white/10 hover:text-white transition-all cursor-pointer active:scale-98"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 mx-auto" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
