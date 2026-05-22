/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Volume2, 
  Eye, 
  Bell, 
  ShieldAlert, 
  Check, 
  Sparkles,
  Sliders,
  Palette,
  HelpCircle
} from 'lucide-react';
import { UserStats, UserSettings } from '../types';

interface SettingsViewProps {
  user: UserStats;
  settings: UserSettings;
  onUpdateUserStats: (updated: Partial<UserStats>) => void;
  onUpdateSettings: (updated: Partial<UserSettings>) => void;
}

export default function SettingsView({ 
  user, 
  settings, 
  onUpdateUserStats,
  onUpdateSettings
}: SettingsViewProps) {
  const [nameInput, setNameInput] = useState(user.name);
  const [emailInput, setEmailInput] = useState('ahmad@reactpath.local');
  const [locationInput, setLocationInput] = useState(user.location);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const accentColors = [
    { name: 'Vibrant Violet', hex: '#c4c0ff' },
    { name: 'Reactive Green', hex: '#00E676' },
    { name: 'Warm Amber', hex: '#FFB300' },
    { name: 'Bright Blue', hex: '#38bdf8' },
    { name: 'Hot Pink', hex: '#f43f5e' }
  ];

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUserStats({
      name: nameInput,
      location: locationInput
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-24">
      
      {/* 1. COMPACT ROW: ACCENT COLORS / APPEARANCE DESIGN */}
      <section className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-indigo-500/10 text-[#c4c0ff] rounded-lg">
            <Palette className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-[#e3e0f1]">Appearance & Branding</h3>
            <p className="text-xs text-[#c7c4d8]/40 font-light mt-0.5">Customize interface theme accent and spacing dynamics</p>
          </div>
        </div>

        {/* Accent Color Blocks Selector */}
        <div className="space-y-3">
          <label className="text-[10px] uppercase font-bold text-[#c7c4d8]/55 tracking-wider">Custom Accent Hue</label>
          <div className="flex flex-wrap gap-3">
            {accentColors.map((color) => {
              const isActive = settings.accentColor === color.hex;
              return (
                <button
                  key={color.hex}
                  onClick={() => onUpdateSettings({ accentColor: color.hex })}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                    isActive 
                      ? 'bg-[#1f1e2a] text-[#e3e0f1]' 
                      : 'border-[#2A2A3E] text-[#c7c4d8]/60 hover:border-[#c4c0ff]/35'
                  }`}
                  style={{ borderColor: isActive ? color.hex : undefined }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color.hex }} />
                  <span>{color.name}</span>
                  {isActive && <Check className="h-3.5 w-3.5" style={{ color: color.hex }} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Font size adjustments range slider */}
        <div className="space-y-3 pt-4 border-t border-[#2A2A3E]/40 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#c7c4d8]/55 tracking-wider">Editor Code Font Size</label>
            <p className="text-xs text-[#c7c4d8]/40 font-light">Modify text scaling on playground sandbox files</p>
          </div>
          
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="11" 
              max="18" 
              value={settings.editorFontSize}
              onChange={(e) => onUpdateSettings({ editorFontSize: Number(e.target.value) })}
              className="flex-1 accent-[#c4c0ff] bg-[#12121d] h-1.5 rounded"
            />
            <span className="px-3 py-1.5 bg-[#12121d] border border-[#2A2A3E] text-xs font-mono font-bold text-indigo-300 rounded-lg min-w-14 text-center shrink-0">
              {settings.editorFontSize}px
            </span>
          </div>
        </div>
      </section>

      {/* 2. ACCOUNT SETTINGS FORM */}
      <form onSubmit={handleSaveAccount} className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative">
        
        <div className="flex items-center gap-3">
          <span className="p-2 bg-indigo-500/10 text-[#c4c0ff] rounded-lg">
            <User className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-[#e3e0f1]">Personal Account Credentials</h3>
            <p className="text-xs text-[#c7c4d8]/40 font-light mt-0.5">Manage your nickname, email and regional options</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#c7c4d8]/40">Your Developer Nickname</label>
            <input 
              type="text" 
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full bg-[#12121d] border border-[#2A2A3E] focus:border-[#c4c0ff]/40 rounded-xl p-3 text-sm text-[#e3e0f1] outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-[#c7c4d8]/40">Your Registered Email</label>
            <input 
              type="email" 
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full bg-[#12121d] border border-[#2A2A3E] focus:border-[#c4c0ff]/40 rounded-xl p-3 text-sm text-[#e3e0f1] outline-none"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-[10px] uppercase font-bold text-[#c7c4d8]/40">Your Geographic Location</label>
            <input 
              type="text" 
              required
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              placeholder="e.g. Saudi Arabia, Jordan"
              className="w-full bg-[#12121d] border border-[#2A2A3E] focus:border-[#c4c0ff]/40 rounded-xl p-3 text-sm text-[#e3e0f1] outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-[#2A2A3E]/30">
          <button 
            type="submit"
            className="px-5 py-3 bg-[#c4c0ff] hover:brightness-105 text-[#2000a4] text-xs font-bold rounded-lg transition-all cursor-pointer active:scale-95 shadow-md shadow-indigo-500/5 whitespace-nowrap"
          >
            Update Account Settings
          </button>
        </div>

        {saveSuccess && (
          <div className="absolute inset-0 bg-[#1A1A2E] z-10 flex items-center justify-center p-6 text-center rounded-2xl animate-fadeIn">
            <p className="text-emerald-400 font-bold text-sm flex items-center gap-2">
              <Check className="h-5 w-5 bg-emerald-500/10 p-1 rounded-full border border-emerald-500/20 shrink-0" />
              <span>Settings updated successfully. Interface changes applied.</span>
            </p>
          </div>
        )}
      </form>

      {/* 3. EMAIL NOTIFICATIONS TOGGLES */}
      <section className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
        
        <div className="flex items-center gap-3">
          <span className="p-2 bg-indigo-500/10 text-[#c4c0ff] rounded-lg">
            <Bell className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-[#e3e0f1]">Notifications Dispatcher</h3>
            <p className="text-xs text-[#c7c4d8]/40 font-light mt-0.5">Control email delivery and daily learning triggers</p>
          </div>
        </div>

        <div className="space-y-4 pt-4 divide-y divide-[#2A2A3E]/30">
          
          <div className="flex items-center justify-between py-3.5 gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#e3e0f1]">Weekly Study Progress summaries</h4>
              <p className="text-xs text-[#c7c4d8]/40 font-light leading-relaxed">Weekly performance report displaying total XP gains and community rank updates.</p>
            </div>
            <button 
              onClick={() => onUpdateSettings({ emailNotifications: !settings.emailNotifications })}
              className={`w-12 h-6.5 rounded-full p-1 transition-all cursor-pointer ${
                settings.emailNotifications ? 'bg-indigo-400' : 'bg-[#12121d] border border-[#2a2a3e]'
              }`}
            >
              <div className={`w-4.5 h-4.5 rounded-full bg-[#1A1A2E] transition-all shadow-md ${
                settings.emailNotifications ? 'translate-x-5.5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-3.5 pt-6 gap-4">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#e3e0f1]">Learning Streak warnings</h4>
              <p className="text-xs text-[#c7c4d8]/40 font-light leading-relaxed">Safety warning dispatched to your email whenever your learning streak is within 2 hours of expiring.</p>
            </div>
            <button 
              onClick={() => onUpdateSettings({ pushNotifications: !settings.pushNotifications })}
              className={`w-12 h-6.5 rounded-full p-1 transition-all cursor-pointer ${
                settings.pushNotifications ? 'bg-indigo-400' : 'bg-[#12121d] border border-[#2a2a3e]'
              }`}
            >
              <div className={`w-4.5 h-4.5 rounded-full bg-[#1A1A2E] transition-all shadow-md ${
                settings.pushNotifications ? 'translate-x-5.5' : 'translate-x-0'
              }`} />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
