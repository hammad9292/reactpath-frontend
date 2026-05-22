/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Calendar, 
  Award, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Star,
  Flame,
  Zap,
  Shield,
  Heart,
  Edit2,
  Check,
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';
import { UserStats } from '../types';

interface ProfileViewProps {
  user: UserStats;
  onUpdateNameAndAvatar: (name: string, avatar: string) => void;
}

export default function ProfileView({ user, onUpdateNameAndAvatar }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements'>('overview');
  
  // Custom edit mode states
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);

  // Ready alternate avatar options for user switching
  const sampleAvatars = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDDI4YViomewaHJ5tdy9cJRcA-0QG4_GNqq_DPZVD11X5n0mexDAJnaIO25O-ztNa2TY0W2WOmqwSeGPIRNbpcrETdMeA1gfxXEERiwhNosCxJYgle4Y2xPrjP88MjAHMyC8W8KY01vx7Mt9MPChxymvZP7dW06ju29Fl30-EFb61eu5cs1JiJjxsNBImacT_a2NrBxr8fEd0r5X_tofnHkMwpUBFNYsiYOyZeufGVdxYLWsHXGLwRQPiCm5pWJPGXCsSnar52GSGE', // standard Ahmad avatar
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCjdW_HfZJApvlkXHaQSLv5JOy5eUfr3gNJ3mkOmcM9oyV_qOlTG2dW5eYcPI-iHmlp0ZcFjOyov1Ya_1jNSOecQRDe0MkPmuHYrO7OLQUDyjpb87XmKwxVpi61J8R2ceKFE1ldplrfYUqbcJXA_EsMK7ObgtAKtSJsYRrkrYmpmwPOsT_erkByIY54gZjjJQ06SDhBUyr-F9jeeXPrYkp0scWzePqUvOVFFjPdrCP-rLMFkbjYwxIRvQfnIAyj2_uG8Sz_Jd9jR6k', // active marcus avatar
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150', // female model avatar
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' // male curly avatar
  ];

  const handleSaveDetails = () => {
    onUpdateNameAndAvatar(editedName, selectedAvatar);
    setIsEditing(false);
  };

  // Generate GitHub contribution grid squares (364 squares roughly)
  // Let's draw 35 columns x 7 rows to keep it beautifully responsive
  const rows = 7;
  const cols = 45;
  const contributionGrid: number[] = [];
  
  // Fill random weights for green blocks
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      // Simulate weekly pattern: heavier tasks in weekdays, quiet on weekends
      const dayOfWeek = r;
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      let randValue = Math.random();
      if (isWeekend) randValue = randValue * 0.3; // lighter weight
      
      let level = 0;
      if (randValue > 0.85) level = 4;
      else if (randValue > 0.6) level = 3;
      else if (randValue > 0.35) level = 2;
      else if (randValue > 0.1) level = 1;
      
      contributionGrid.push(level);
    }
  }

  // Badges lists
  const credentials = [
    { id: 'c-1', name: 'React Compiler Pioneer', unlocked: true, desc: 'Set up automated compliance for Forget directives.', icon: Zap, color: 'bg-indigo-500/10 text-[#c4c0ff] border-[#c4c0ff]/20' },
    { id: 'c-2', name: 'Speed Optimizer', unlocked: true, desc: 'Maintained 60 FPS under concurrent load lists.', icon: TrendingUp, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { id: 'c-3', name: 'Zustand Architect', unlocked: true, desc: 'Created optimized transient state controllers.', icon: Shield, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    { id: 'c-4', name: 'Community Tutor', unlocked: true, desc: 'Support 5 peers with high-fidelity thread posts.', icon: Heart, color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
    { id: 'c-5', name: 'Master of Server Master', unlocked: false, desc: 'Unlock on completing RSC mastery paths.', icon: Lock, color: 'bg-[#212132] text-[#c7c4d8]/20 border-transparent' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-24">
      
      {/* 1. HERO PROFILE CARD WITH AVATAR PICKERS */}
      <section className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        
        {/* Soft background light */}
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
          <div className="relative shrink-0">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-24 h-24 rounded-full border-4 border-[#2A2A3E] object-cover shadow-xl"
            />
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="absolute bottom-0 right-0 p-2 bg-[#c4c0ff] rounded-full border-2 border-[#1A1A2E] text-[#2000a4] cursor-pointer"
              title="Edit Profile Details"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {isEditing ? (
            <div className="space-y-4 w-full sm:w-auto text-center sm:text-left">
              <div className="space-y-1.5">
                <input 
                  type="text" 
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Your Name"
                  className="px-3 py-2 bg-[#12121d] border border-[#2A2A3E] rounded-lg text-sm text-[#e3e0f1] font-bold outline-none focus:border-[#c4c0ff]"
                />
                <p className="text-[10px] text-[#c7c4d8]/40">Active profile nickname inside leaderboard</p>
              </div>

              {/* Selection list of placeholder avatars */}
              <div className="space-y-2">
                <p className="text-[10px] text-[#c7c4d8]/60 font-bold uppercase tracking-wider">Select Avatar photo</p>
                <div className="flex justify-center sm:justify-start gap-2">
                  {sampleAvatars.map((av, index) => (
                    <img 
                      key={index} 
                      src={av} 
                      alt="avatar-opt"
                      onClick={() => setSelectedAvatar(av)}
                      className={`w-9 h-9 rounded-full object-cover border-2 cursor-pointer transition-all hover:scale-105 ${
                        selectedAvatar === av ? 'border-[#c4c0ff] ring-2 ring-[#c4c0ff]/20' : 'border-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button 
                onClick={handleSaveDetails}
                className="px-4 py-2 bg-emerald-500 text-[#12121d] font-bold text-xs rounded-lg flex items-center justify-center gap-1 cursor-pointer"
              >
                <Check className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-3xl font-headline-lg font-bold text-[#e3e0f1] tracking-tight">
                {user.name}
              </h2>
              <p className="text-sm text-indigo-300 font-semibold">{user.title}</p>
              
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-[#c7c4d8]/60 font-light pt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-indigo-400" />
                  <span>{user.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Joined {user.joinedDate}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Global stats columns */}
        <div className="grid grid-cols-3 gap-6 bg-[#12121d] border border-[#2A2A3E]/60 p-5 rounded-xl text-center w-full md:w-80 shrink-0">
          <div>
            <p className="text-[10px] uppercase font-bold text-[#c7c4d8]/40">Level</p>
            <p className="text-2xl font-bold text-[#e3e0f1] mt-1">{user.level}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#c7c4d8]/40">Experience</p>
            <p className="text-2xl font-bold text-[#c4c0ff] mt-1">{(user.xp).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#c7c4d8]/40">Rank</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">#{user.globalRank}</p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex border-b border-[#2A2A3E] p-1 shrink-0">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
            activeTab === 'overview' ? 'text-[#c4c0ff]' : 'text-[#c7c4d8]/50'
          }`}
        >
          <span>Skill Matrix</span>
          {activeTab === 'overview' && (
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#c4c0ff] rounded-full" />
          )}
        </button>

        <button 
          onClick={() => setActiveTab('achievements')}
          className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
            activeTab === 'achievements' ? 'text-[#c4c0ff]' : 'text-[#c7c4d8]/50'
          }`}
        >
          <span>Interactive Credentials</span>
          {activeTab === 'achievements' && (
            <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#c4c0ff] rounded-full" />
          )}
        </button>
      </div>

      {activeTab === 'overview' ? (
        
        /* OVERVIEW TAB (proficiency radar, contribution grid charts) */
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column: Proficiency Radar SVG Chart (SPAN 2 COLS) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-[#e3e0f1]">Full-Stack Proficiency Map</h3>
            
            <div className="bg-[#1A1A2E] border border-[#2A2A3E] p-6 rounded-2xl flex flex-col items-center justify-center min-h-[340px] shadow-xl">
              {/* Radar chart implemented via custom responsive SVG */}
              <svg viewBox="0 0 200 200" className="w-full max-w-[240px] h-auto overflow-visible select-none">
                {/* Labeled coordinate points: Center = (100,100), R = 80 */}
                {/* Vertices offsets:
                    1. Hooks: (100, 20)
                    2. State: (176, 75)
                    3. Routing: (147, 165)
                    4. RSC: (53, 165)
                    5. Compiler: (24, 75)
                */}
                
                {/* Grid guidelines */}
                <polygon points="100,20 176,75 147,165 53,165 24,75" className="stroke-[#2A2A3E] fill-none" strokeWidth="1" />
                <polygon points="100,40 157,81 135,148 65,148 43,81" className="stroke-[#2A2A3E] fill-none" strokeWidth="1" />
                <polygon points="100,60 138,87 123,132 77,132 62,87" className="stroke-[#2A2A3E] fill-none" strokeWidth="1" />
                <polygon points="100,80 119,93 111,116 89,116 81,93" className="stroke-[#2A2A3E] fill-none" strokeWidth="1" />
                
                {/* Axes lines */}
                <line x1="100" y1="100" x2="100" y2="20" className="stroke-[#2A2A3E]" strokeWidth="0.5" />
                <line x1="100" y1="100" x2="176" y2="75" className="stroke-[#2A2A3E]" strokeWidth="0.5" />
                <line x1="100" y1="100" x2="147" y2="165" className="stroke-[#2A2A3E]" strokeWidth="0.5" />
                <line x1="100" y1="100" x2="53" y2="165" className="stroke-[#2A2A3E]" strokeWidth="0.5" />
                <line x1="100" y1="100" x2="24" y2="75" className="stroke-[#2A2A3E]" strokeWidth="0.5" />

                {/* Plot user competence polygon:
                    - Hooks: 95% (100, 24)
                    - State: 80% (160.8, 80)
                    - Routing: 50% (123.5, 132.5)
                    - RSC: 40% (81.2, 126)
                    - Compiler: 85% (35.4, 78.75)
                */}
                <polygon 
                  points="100,24 160.8,80 123.5,132.5 81.2,126 35.4,78.75" 
                  className="stroke-[#c4c0ff] fill-[#6c63ff]/15" 
                  strokeWidth="2" 
                />

                {/* Markers point dots */}
                <circle cx="100" cy="24" r="3" className="fill-[#c4c0ff]" />
                <circle cx="160.8" cy="80" r="3" className="fill-[#c4c0ff]" />
                <circle cx="123.5" cy="132.5" r="3" className="fill-[#c4c0ff]" />
                <circle cx="81.2" cy="126" r="3" className="fill-[#c4c0ff]" />
                <circle cx="35.4" cy="78.75" r="3" className="fill-[#c4c0ff]" />

                {/* Text labels at vertices */}
                <text x="100" y="12" textAnchor="middle" className="text-[8px] font-sans font-bold fill-[#c7c4d8]/80 uppercase">Hooks (95%)</text>
                <text x="184" y="78" textAnchor="start" className="text-[8px] font-sans font-bold fill-[#c7c4d8]/80 uppercase">State (80%)</text>
                <text x="153" y="176" textAnchor="start" className="text-[8px] font-sans font-bold fill-[#c7c4d8]/80 uppercase">Routing (50%)</text>
                <text x="47" y="176" textAnchor="end" className="text-[8px] font-sans font-bold fill-[#c7c4d8]/80 uppercase">RSC (40%)</text>
                <text x="16" y="78" textAnchor="end" className="text-[8px] font-sans font-bold fill-[#c7c4d8]/80 uppercase">Compiler (85%)</text>
              </svg>

              <p className="text-[10px] text-[#c7c4d8]/40 mt-4 leading-normal text-center">Proficiency calculated via quiz responses and compiled playground code validation metrics.</p>
            </div>
          </div>

          {/* Right Column: Weekly Grid commits (SPAN 3 COLS) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-base font-bold text-[#e3e0f1]">Activity Logs (Last 320 Days)</h3>
            
            <div className="bg-[#1A1A2E] border border-[#2A2A3E] p-6 rounded-2xl flex flex-col justify-start h-full max-h-[380px] shadow-xl">
              <div>
                <p className="text-xl font-headline font-bold text-[#e3e0f1]">{(contributionGrid.filter(w => w > 0).length * 4).toLocaleString()} Activities completed</p>
                <p className="text-xs text-[#c7c4d8]/50 mt-1 font-light">Daily module validations and quiz completions mapped over the visual timeline.</p>
              </div>

              {/* Grid block itself */}
              <div className="flex-1 flex flex-col justify-center py-6 min-w-0">
                <div 
                  className="grid gap-[3px] select-none scale-90 sm:scale-100 origin-left"
                  style={{ 
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
                  }}
                >
                  {contributionGrid.map((level, i) => (
                    <div 
                      key={i} 
                      className={`w-[10px] h-[10px] rounded-[1.5px] transition-colors cursor-pointer ${
                        level === 4 
                          ? 'bg-[#c4c0ff]' 
                          : level === 3 
                          ? 'bg-indigo-500/80' 
                          : level === 2 
                          ? 'bg-indigo-500/40' 
                          : level === 1 
                          ? 'bg-[#1f1e2a]' 
                          : 'bg-[#12121d]'
                      }`}
                      title={`${level > 0 ? level * 50 : 0} XP earned.`}
                    />
                  ))}
                </div>

                {/* Grid legend help */}
                <div className="mt-4 flex items-center justify-between text-[10px] text-[#c7c4d8]/40 font-mono">
                  <span>First Day (Oct)</span>
                  <div className="flex items-center gap-1.5 leading-none">
                    <span>Lesser</span>
                    <div className="w-2.5 h-2.5 rounded bg-[#12121d] border border-transparent" />
                    <div className="w-2.5 h-2.5 rounded bg-[#1f1e2a]" />
                    <div className="w-2.5 h-2.5 rounded bg-indigo-500/40" />
                    <div className="w-2.5 h-2.5 rounded bg-indigo-500/80" />
                    <div className="w-2.5 h-2.5 rounded bg-[#c4c0ff]" />
                    <span>Greater</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      ) : (
        
        /* ACHIEVEMENTS CREDENTIALS TAB */
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#e3e0f1]">Certified Skills & Milestone Checkpoints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((cred) => {
              const Icon = cred.icon;
              return (
                <div 
                  key={cred.id} 
                  className={`p-5 border rounded-2xl flex flex-col justify-between h-[180px] shadow-lg hover:border-[#c4c0ff]/30 transition-all ${cred.color}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="p-2.5 rounded-xl bg-black/15 shadow-inner">
                      <Icon className="h-6 w-6" />
                    </span>
                    {cred.unlocked ? (
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase px-2 py-0.5 rounded tracking-wide">
                        Verified
                      </span>
                    ) : (
                      <span className="text-[10px] bg-[#2a2a3e] text-[#c7c4d8]/30 font-bold uppercase px-2 py-0.5 rounded tracking-wide">
                        Locked
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 pt-4">
                    <h4 className="text-sm font-bold text-[#e3e0f1] leading-snug">{cred.name}</h4>
                    <p className="text-xs text-[#c7c4d8]/60 font-light leading-relaxed truncate">{cred.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      )}

    </div>
  );
}
