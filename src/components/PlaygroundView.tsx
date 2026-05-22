/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Share2, 
  Terminal, 
  Globe, 
  Info, 
  Check, 
  Maximize2,
  RefreshCw,
  FolderMinus,
  FileCode,
  Layout
} from 'lucide-react';

export default function PlaygroundView() {
  const [activeTab, setActiveTab] = useState<'App.jsx' | 'styles.css'>('App.jsx');
  const [isCompiling, setIsCompiling] = useState(false);
  const [wasRun, setWasRun] = useState(true);
  const [mockLogs, setMockLogs] = useState<string[]>([
    'SYSTEM: Initializing web development runtime environment...',
    '[Vite] dev server booted successfully on port 3000',
    'COMPILER: Resolving standard modules (react @19, motion)...',
    'Preview available at http://react-playground.local/preview'
  ]);

  // Dimensions simulation
  const [simulatedWidth, setSimulatedWidth] = useState(1440);
  const [simulatedHeight, setSimulatedHeight] = useState(900);

  const initialCodeApp = `import { useState, useEffect } from 'react';

// Create your custom hook here
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}`;

  const initialCodeCSS = `body {
  background-color: #12121d;
  font-family: 'Inter', sans-serif;
  color: #e3e0f1;
}

.glow-card {
  box-shadow: 0 0 24px rgba(196, 192, 255, 0.08);
}`;

  const [codeApp, setCodeApp] = useState(initialCodeApp);
  const [codeCSS, setCodeCSS] = useState(initialCodeCSS);

  const currentCode = activeTab === 'App.jsx' ? codeApp : codeCSS;

  const handleCodeChange = (text: string) => {
    if (activeTab === 'App.jsx') {
      setCodeApp(text);
    } else {
      setCodeCSS(text);
    }
  };

  const handleRun = () => {
    setIsCompiling(true);
    // Add logs
    const newLogs = [
      ...mockLogs,
      `[${new Date().toLocaleTimeString()}] COMPILING: Re-bundling files App.jsx and styles.css...`,
      `[${new Date().toLocaleTimeString()}] SUCCESS: App bundled in ${Math.floor(Math.random() * 40) + 10}ms. Updating sandboxed preview.`
    ];
    setMockLogs(newLogs);

    setTimeout(() => {
      setIsCompiling(false);
      setWasRun(true);
    }, 1500);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to revert all file changes?')) {
      setCodeApp(initialCodeApp);
      setCodeCSS(initialCodeCSS);
      setWasRun(true);
      setMockLogs([
        ...mockLogs,
        `[${new Date().toLocaleTimeString()}] SYSTEM: Reverted editor to base challenge template.`
      ]);
    }
  };

  const handleShare = () => {
    alert('Challenge share URL copied to clipboard: http://react-playground.local/challenge/91fa2');
  };

  return (
    <div className="space-y-6 animate-fadeIn h-[calc(100vh-140px)] flex flex-col justify-between">
      
      {/* Upper header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#c7c4d8]/50 tracking-wider">CHALLENGE ENVIRONMENT</span>
          <h2 className="text-2xl font-bold text-[#e3e0f1]">Building a Custom Hook</h2>
        </div>

        {/* Console / sandbox actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRun}
            disabled={isCompiling}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#c4c0ff] hover:brightness-105 disabled:opacity-50 text-[#2000a4] font-bold text-xs rounded-lg transition-all cursor-pointer active:scale-95 shadow-md shadow-indigo-500/10"
          >
            <Play className="h-4 w-4 fill-[#2000a4]" />
            <span>{isCompiling ? 'Compiling...' : 'Run Code'}</span>
          </button>

          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f1e2a] hover:bg-[#252541] border border-[#2A2A3E] text-[#c7c4d8]/80 hover:text-[#e3e0f1] font-semibold text-xs rounded-lg transition-all cursor-pointer active:scale-95"
            title="Reset sandbox code"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </button>

          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1f1e2a] hover:bg-[#252541] border border-[#2A2A3E] text-[#c7c4d8]/80 hover:text-[#e3e0f1] font-semibold text-xs rounded-lg transition-all cursor-pointer active:scale-95"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Main playground canvas pane split */}
      <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        
        {/* Left Side: Code Editor Workspace */}
        <div className="bg-[#0d0d18] border border-[#2A2A3E] rounded-xl overflow-hidden flex flex-col h-full min-h-0">
          
          {/* File Tab selectors */}
          <div className="bg-[#1f1e2a] border-b border-[#2A2A3E] flex items-center justify-between px-4 shrink-0 h-11">
            <div className="flex items-center gap-1">
              {(['App.jsx', 'styles.css'] as const).map((file) => {
                const isActive = activeTab === file;
                return (
                  <button
                    key={file}
                    onClick={() => setActiveTab(file)}
                    className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold select-none border-b-2 transition-all cursor-pointer ${
                      isActive 
                        ? 'border-[#c4c0ff] text-[#c4c0ff] bg-[#12121d]' 
                        : 'border-transparent text-[#c7c4d8]/50 hover:text-[#e3e0f1] hover:bg-[#292935]/25'
                    }`}
                  >
                    <FileCode className="h-3.5 w-3.5" />
                    <span>{file}</span>
                  </button>
                );
              })}
            </div>

            <span className="text-[10px] text-[#c7c4d8]/30 font-mono tracking-widest hidden sm:block">Editor v1.0</span>
          </div>

          {/* Editor Input Area */}
          <div className="flex-1 flex overflow-hidden min-h-0 relative">
            
            {/* Left line numbers panel */}
            <div className="w-12 bg-[#09090f] text-[#c7c4d8]/20 text-right select-none pr-3 pt-4 border-r border-[#2A2A3E]/30 shrink-0 font-mono text-[11px] leading-6">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Editing Box */}
            <textarea
              value={currentCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              spellCheck={false}
              className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-4 font-mono text-[12px] text-[#c7c4d8]/95 overflow-y-auto leading-6 resize-none h-full w-full"
            />
          </div>
        </div>

        {/* Right Side: Visual Sandbox Browser Preview */}
        <div className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-xl overflow-hidden flex flex-col h-full min-h-0">
          
          {/* Header toolbar (Browser Address Bar Mockup) */}
          <div className="bg-[#1f1e2a] border-b border-[#2A2A3E] px-4 py-2 flex items-center justify-between gap-4 shrink-0 h-11">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
            </div>

            {/* URL text display */}
            <div className="flex-1 bg-[#12121d] border border-[#2A2A3E] rounded-lg px-3 py-1 font-mono text-[10px] text-[#c7c4d8]/40 flex items-center gap-1.5 truncate">
              <Globe className="h-3 w-3 text-indigo-400 shrink-0" />
              <span>https://react-playground.local/preview</span>
            </div>

            <button 
              onClick={handleRun}
              className="p-1 px-2.5 rounded hover:bg-[#292935] text-[#c7c4d8]/60 hover:text-[#e3e0f1] cursor-pointer transition-colors"
              title="Refresh browser view"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Sandbox Frame body rendering viewport */}
          <div className="flex-1 bg-[#12121d] relative flex items-center justify-center p-6 overflow-hidden select-none">
            {isCompiling ? (
              
              /* Spinner loop mockup */
              <div className="space-y-4 text-center animate-pulse">
                <div className="relative w-12 h-12 mx-auto shrink-0 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-500/10" />
                  <div className="absolute inset-0 rounded-full border-4 border-indigo-400 border-t-transparent animate-spin" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#c4c0ff]">Recompiling Preview...</p>
                  <p className="text-[10px] text-[#c7c4d8]/30 font-light mt-1">Applying compiler optimizations</p>
                </div>
              </div>
            ) : wasRun ? (
              
              /* Visual reactive simulator showing hook values */
              <div className="w-full max-w-sm space-y-6">
                
                <div className="text-center space-y-2">
                  <div className="mx-auto w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Layout className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-[#e3e0f1] text-base">Custom Hook Previewer</h3>
                  <p className="text-xs text-[#c7c4d8]/40">Simulated values for useWindowSize()</p>
                </div>

                {/* Sizing display blocks */}
                <div className="space-y-3">
                  <div className="bg-[#1A1A2E] border border-[#2A2A3E] p-4 rounded-xl flex items-center justify-between shadow-xl">
                    <span className="text-xs text-[#c7c4d8]/70">Window Width:</span>
                    <span className="px-3 py-1 bg-indigo-500/15 text-[#c4c0ff] font-mono font-bold text-xs rounded border border-indigo-500/25">
                      {simulatedWidth}px
                    </span>
                  </div>

                  <div className="bg-[#1A1A2E] border border-[#2A2A3E] p-4 rounded-xl flex items-center justify-between shadow-xl">
                    <span className="text-xs text-[#c7c4d8]/70">Window Height:</span>
                    <span className="px-3 py-1 bg-indigo-500/15 text-[#c4c0ff] font-mono font-bold text-xs rounded border border-indigo-500/25">
                      {simulatedHeight}px
                    </span>
                  </div>
                </div>

                {/* Slider simulator controls */}
                <div className="bg-[#1A1A2E] border border-[#2A2A3E]/60 p-4 rounded-xl space-y-4 shadow-xl">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#c7c4d8]/50">
                      <span>Simulate Width</span>
                      <span>{simulatedWidth}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="375" 
                      max="1920" 
                      value={simulatedWidth}
                      onChange={(e) => setSimulatedWidth(Number(e.target.value))}
                      className="w-full accent-[#c4c0ff] bg-[#12121d] h-1 rounded"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold text-[#c7c4d8]/50">
                      <span>Simulate Height</span>
                      <span>{simulatedHeight}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="500" 
                      max="1080" 
                      value={simulatedHeight}
                      onChange={(e) => setSimulatedHeight(Number(e.target.value))}
                      className="w-full accent-[#c4c0ff] bg-[#12121d] h-1 rounded"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-center text-[#c7c4d8]/30 font-light flex items-center justify-center gap-1">
                  <Info className="h-3 w-3" />
                  <span>Interactive reactive sizing simulation.</span>
                </p>

              </div>
            ) : (
              <div className="text-center space-y-2 p-6 text-[#c7c4d8]/30">
                <Play className="h-8 w-8 mx-auto stroke-[#c7c4d8]/20" />
                <p className="text-xs">Click "Run Code" above to load compiling sandbox.</p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Logger / Terminal block at bottom */}
      <div className="bg-[#09090f] border border-[#2A2A3E] rounded-xl overflow-hidden shrink-0 h-32 flex flex-col mt-4">
        <div className="px-4 py-2 bg-[#12121d] border-b border-[#2A2A3E] flex items-center justify-between text-xs font-bold text-[#c7c4d8]/70">
          <span className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-[#c4c0ff]" />
            CONSOLE LOGGER
          </span>
          <span className="text-[10px] bg-indigo-500/10 border border-indigo-500/20 text-[#c4c0ff] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
            {mockLogs.length} Records
          </span>
        </div>

        {/* Scrollable outputs */}
        <div className="flex-1 p-4 font-mono text-[10px] leading-5 overflow-y-auto text-indigo-200/50 space-y-1">
          {mockLogs.map((log, i) => (
            <div key={i} className={log.includes('SUCCESS') ? 'text-emerald-400 font-semibold' : log.includes('SYSTEM') ? 'text-amber-400/80' : ''}>
              &gt; {log}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
