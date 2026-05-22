/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Trophy, 
  Search, 
  Star, 
  Flame, 
  Award, 
  TrendingUp, 
  ArrowUp,
  User,
  Zap,
  Sparkles,
  Info,
  X
} from 'lucide-react';
import { LeaderboardUser } from '../types';

interface LeaderboardViewProps {
  users: LeaderboardUser[];
}

export default function LeaderboardView({ users }: LeaderboardViewProps) {
  const [activeTab, setActiveTab] = useState<'global' | 'weekly'>('global');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<LeaderboardUser | null>(null);

  // Filter lists matching searches
  const filteredUsers = users.filter((u) => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Rank 1, 2, 3 details for the podium
  const podium1 = users.find(u => u.rank === 1);
  const podium2 = users.find(u => u.rank === 2);
  const podium3 = users.find(u => u.rank === 3);

  // Other items (excluding top 3 for the scroll list)
  const listUsers = filteredUsers.filter(u => u.rank > 3);

  return (
    <div className="space-y-8 animate-fadeIn pb-24">
      
      {/* Header controls layout */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#c7c4d8]/50 tracking-wider">COMPETITIVE SYSTEM</span>
          <h2 className="text-2xl font-bold text-[#e3e0f1]">Leaderboard Rankings</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          {/* Tab selectors */}
          <div className="bg-[#1f1e2a] border border-[#2A2A3E] p-1 rounded-lg flex items-center">
            <button 
              onClick={() => setActiveTab('global')}
              className={`px-4 py-1.5 text-xs font-bold rounded cursor-pointer transition-all ${
                activeTab === 'global' 
                  ? 'bg-[#c4c0ff] text-[#2000a4]' 
                  : 'text-[#c7c4d8]/60 hover:text-[#e3e0f1]'
              }`}
            >
              All Time
            </button>
            <button 
              onClick={() => setSelectedUser(null) || setActiveTab('weekly')}
              className={`px-4 py-1.5 text-xs font-bold rounded cursor-pointer transition-all ${
                activeTab === 'weekly' 
                  ? 'bg-[#c4c0ff] text-[#2000a4]' 
                  : 'text-[#c7c4d8]/60 hover:text-[#e3e0f1]'
              }`}
            >
              Weekly Active
            </button>
          </div>

          <div className="relative flex items-center bg-[#1f1e2a] px-3.5 py-2 rounded-lg border border-[#2A2A3E] focus-within:border-[#c4c0ff]/40 w-full sm:w-56 transition-all">
            <Search className="h-4 w-4 text-[#c7c4d8]/55 mr-2 shrink-0" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search developers..." 
              className="bg-transparent border-none text-xs text-[#e3e0f1] w-full outline-none focus:ring-0 placeholder-[#c7c4d8]/30"
            />
          </div>
        </div>
      </div>

      {/* 1. VISUAL PODIUM (Top 3 Users) */}
      {!searchQuery && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-8 max-w-4xl mx-auto">
          
          {/* Rank 2 (Left Podium Block) */}
          {podium2 && (
            <div 
              onClick={() => setSelectedUser(podium2)}
              className="bg-[#1A1A2E]/60 border border-[#2A2A3E]/30 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:border-indigo-400/40 cursor-pointer order-2 md:order-1 transition-all h-[260px] justify-end shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-3 left-3 text-2xl font-black text-[#c7c4d8]/20 select-none">#2</div>
              <div className="relative shrink-0">
                <img src={podium2.avatar} alt={podium2.name} className="w-16 h-16 rounded-full border-2 border-indigo-500/20 object-cover" />
                <span className="absolute -bottom-1 -right-1 bg-[#12121d] text-[10px] px-1.5 py-0.5 rounded-full border border-[#2a2a3e] font-sans font-bold text-indigo-400">
                  Lvl {podium2.level}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#e3e0f1]">{podium2.name}</h4>
                <p className="text-xs text-indigo-400 font-semibold">{podium2.xp.toLocaleString()} XP</p>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
                  🔥 {podium2.streak}
                </span>
              </div>
              {/* Podium Column base */}
              <div className="w-full bg-[#1A1A2E] py-1 border border-[#2A2A3E] rounded-lg text-[10px] font-bold text-[#c7c4d8]/40 uppercase tracking-widest bg-gradient-to-t from-[#292935]/40 to-transparent">
                Silver Tier
              </div>
            </div>
          )}

          {/* Rank 1 (Gold Peak Podium Block) */}
          {podium1 && (
            <div 
              onClick={() => setSelectedUser(podium1)}
              className="bg-[#1A1A2E] border-2 border-[#E4F222]/30 rounded-2xl p-8 flex flex-col items-center text-center space-y-4 hover:border-[#E4F222]/70 cursor-pointer order-1 md:order-2 transition-all h-[310px] justify-end shadow-2xl relative overflow-hidden"
            >
              {/* Background gold flare */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none" />
              
              <div className="absolute top-3 left-3 text-3xl font-black text-[#E4F222]/20 select-none">#1</div>
              <div className="relative shrink-0">
                <img src={podium1.avatar} alt={podium1.name} className="w-20 h-20 rounded-full border-2 border-[#E4F222]/50 object-cover" />
                <span className="absolute -bottom-1 -right-1 bg-[#12121d] text-[10px] px-1.5 py-0.5 rounded-full border border-[#E4F222]/40 font-sans font-bold text-[#E4F222]">
                  Lvl {podium1.level}
                </span>
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg text-amber-400 animate-bounce">👑</span>
              </div>
              <div>
                <h4 className="text-base font-bold text-[#e3e0f1] flex items-center justify-center gap-1.5">
                  {podium1.name}
                  {podium1.badge && (
                    <span className="bg-[#E4F222]/10 text-[#E4F222] border border-[#E4F222]/20 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded">
                      STAR
                    </span>
                  )}
                </h4>
                <p className="text-sm font-black text-[#E4F222]">{podium1.xp.toLocaleString()} XP</p>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
                  🔥 {podium1.streak}
                </span>
              </div>
              {/* Podium Column base */}
              <div className="w-full bg-[#1A1A2E] py-1.5 border border-[#E4F222]/20 rounded-lg text-xs font-bold text-[#E4F222] uppercase tracking-widest bg-gradient-to-t from-[#E4F222]/5 to-transparent">
                Grand Master
              </div>
            </div>
          )}

          {/* Rank 3 (Right Podium Block) */}
          {podium3 && (
            <div 
              onClick={() => setSelectedUser(podium3)}
              className="bg-[#1A1A2E]/60 border border-[#2A2A3E]/30 rounded-2xl p-6 flex flex-col items-center text-center space-y-4 hover:border-purple-400/40 cursor-pointer order-3 transition-all h-[230px] justify-end shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-3 left-3 text-2xl font-black text-[#c7c4d8]/20 select-none">#3</div>
              <div className="relative shrink-0">
                <img src={podium3.avatar} alt={podium3.name} className="w-14 h-14 rounded-full border-2 border-purple-500/20 object-cover" />
                <span className="absolute -bottom-1 -right-1 bg-[#12121d] text-[10px] px-1.5 py-0.5 rounded-full border border-[#2a2a3e] font-sans font-bold text-purple-400">
                  Lvl {podium3.level}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#e3e0f1]">{podium3.name}</h4>
                <p className="text-xs text-purple-400 font-semibold">{podium3.xp.toLocaleString()} XP</p>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-0.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
                  🔥 {podium3.streak}
                </span>
              </div>
              {/* Podium Column base */}
              <div className="w-full bg-[#1A1A2E] py-1 border border-[#2A2A3E] rounded-lg text-[10px] font-bold text-[#c7c4d8]/40 uppercase tracking-widest bg-gradient-to-t from-[#292935]/40 to-transparent">
                Bronze Tier
              </div>
            </div>
          )}

        </section>
      )}

      {/* 2. RANKINGS SCROLLABLE LIST TABLE */}
      <section className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl overflow-hidden shadow-xl max-w-4xl mx-auto">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#1f1e2a] border-b border-[#2A2A3E]/60 text-[#c7c4d8]/50 text-[10px] uppercase font-bold tracking-widest select-none pt-4 pb-4">
                <th className="p-5 pl-8 w-16">Rank</th>
                <th className="p-5">Developer</th>
                <th className="p-5 w-24">Level</th>
                <th className="p-5 w-32">Experience</th>
                <th className="p-5 w-24">Streak</th>
                <th className="p-5 pr-8 text-right w-44">Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2A3E]/30 text-sm">
              {filteredUsers.map((item) => {
                const isRankTop3 = item.rank <= 3;
                return (
                  <tr 
                    key={item.rank}
                    onClick={() => setSelectedUser(item)}
                    className={`group hover:bg-[#1f1e2a]/60 transition-colors cursor-pointer ${
                      item.isCurrentUser 
                        ? 'bg-[#c4c0ff]/5 hover:bg-[#c4c0ff]/10 border-l-2 border-[#c4c0ff]' 
                        : ''
                    }`}
                  >
                    {/* Rank */}
                    <td className="p-4 pl-8 font-mono font-bold">
                      {isRankTop3 ? (
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                          item.rank === 1 
                            ? 'bg-[#E4F222]/10 text-[#E4F222] border border-[#E4F222]/30' 
                            : item.rank === 2 
                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' 
                            : 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                        }`}>
                          {item.rank}
                        </span>
                      ) : (
                        <span className="text-[#c7c4d8]/40 pl-1.5">{item.rank}</span>
                      )}
                    </td>

                    {/* Developer Name, Avatar */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={item.avatar} 
                          alt={item.name} 
                          className="w-8 h-8 rounded-full border border-[#2a2a3e] object-cover shrink-0"
                        />
                        <div>
                          <p className="font-bold text-[#e3e0f1] group-hover:text-[#c4c0ff] transition-colors leading-tight flex items-center gap-2">
                            {item.name}
                            {item.isCurrentUser && (
                              <span className="text-[9px] bg-[#c4c0ff]/10 text-[#c4c0ff] border border-[#c4c0ff]/20 px-1 font-bold rounded uppercase">
                                You
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-[#c7c4d8]/30 font-light mt-0.5">Software Developer</p>
                        </div>
                      </div>
                    </td>

                    {/* Level */}
                    <td className="p-4 font-mono font-bold text-[#c7c4d8]/70">
                      Lvl {item.level}
                    </td>

                    {/* Experience XP */}
                    <td className="p-4 font-mono font-bold text-indigo-300">
                      {item.xp.toLocaleString()} XP
                    </td>

                    {/* Streak details */}
                    <td className="p-4">
                      <span className="flex items-center gap-1 font-bold text-amber-500 font-mono text-xs">
                        <Flame className="h-4 w-4 fill-amber-500/15" />
                        <span>{item.streak}d</span>
                      </span>
                    </td>

                    {/* Badge columns in table */}
                    <td className="p-4 pr-8 text-right">
                      <div className="flex justify-end gap-1.5">
                        {item.badges.slice(0, 3).map((badge) => (
                          <span 
                            key={badge} 
                            className="text-[9px] font-bold text-[#c7c4d8]/40 border border-[#2a2a3e] bg-[#12121d] px-2 py-0.5 rounded uppercase tracking-wider"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. USER INFORMATION DIALOG OVERLAY */}
      {selectedUser && (
        <div className="fixed inset-0 bg-[#0c0c14]/80 z-55 flex items-center justify-center p-4 animate-fadeIn">
          
          <div className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-scaleIn">
            
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-[#c7c4d8]/55 hover:text-[#e3e0f1] cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Banner top */}
            <div className="h-20 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 relative" />

            <div className="px-6 pb-6 text-center space-y-6 relative -mt-10">
              
              <div className="flex flex-col items-center">
                <img 
                  src={selectedUser.avatar} 
                  alt={selectedUser.name} 
                  className="w-20 h-20 rounded-full border-4 border-[#1A1A2E] object-cover shrink-0 shadow-lg"
                />
                <h3 className="text-xl font-bold text-[#e3e0f1] mt-3">{selectedUser.name}</h3>
                <p className="text-xs text-[#c7c4d8]/40">Active React Path Developer</p>
              </div>

              {/* Grid details */}
              <div className="grid grid-cols-3 gap-3 bg-[#12121d] border border-[#2A2A3E]/60 p-4 rounded-xl text-center">
                <div>
                  <p className="text-[9px] uppercase font-bold text-[#c7c4d8]/40">Rank</p>
                  <p className="text-base font-mono font-bold text-[#c4c0ff]">#{selectedUser.rank}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-[#c7c4d8]/40">Level</p>
                  <p className="text-base font-mono font-bold text-[#e3e0f1]">{selectedUser.level}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase font-bold text-[#c7c4d8]/40">Streak</p>
                  <p className="text-base font-mono font-bold text-amber-500">{selectedUser.streak}d</p>
                </div>
              </div>

              {/* Badges overview */}
              <div className="space-y-2 text-left">
                <h4 className="text-[10px] uppercase font-bold text-[#c7c4d8]/50">Skills & Credentials</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedUser.badges.map((b) => (
                    <span 
                      key={b} 
                      className="px-2 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded text-[10px] font-bold uppercase tracking-wider"
                    >
                      {b === 'speed' ? '⚡ Speed Loader' : b === 'code' ? '💻 Code Expert' : b === 'fire' ? '🔥 Streak Keeper' : b}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setSelectedUser(null)}
                className="w-full bg-[#1f1e2a] hover:bg-[#252541] border border-[#2A2A3E] text-[#e3e0f1] font-bold text-xs py-2.5 rounded-lg transition-all cursor-pointer"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
