/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  ChevronRight, 
  Clock, 
  Star,
  RefreshCw,
  TrendingUp,
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';
import { QuizQuestion, UserStats } from '../types';

interface QuizzesViewProps {
  questions: QuizQuestion[];
  user: UserStats;
  onUpdateXP: (newXp: number) => void;
  onNavigateToDashboard: () => void;
}

export default function QuizzesView({ 
  questions, 
  user, 
  onUpdateXP,
  onNavigateToDashboard
}: QuizzesViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [xpEarnedThisQuiz, setXpEarnedThisQuiz] = useState(0);

  // Timer states
  const [secondsLeft, setSecondsLeft] = useState(45);
  const [timerActive, setTimerActive] = useState(true);

  const currentQuestion = questions[currentIndex];

  // Countdown ticking effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (timerActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && !isSubmitted && timerActive) {
      // Auto submit on timeout
      handleOptionSelect(null);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [secondsLeft, timerActive, isSubmitted]);

  const handleOptionSelect = (key: 'A' | 'B' | 'C' | 'D' | null) => {
    if (isSubmitted) return;
    
    setSelectedKey(key);
    setIsSubmitted(true);
    setTimerActive(false);

    // Check correctness
    if (key === currentQuestion.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
      setXpEarnedThisQuiz((prev) => prev + 150);
      onUpdateXP(user.xp + 150);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedKey(null);
      setIsSubmitted(false);
      setSecondsLeft(45);
      setTimerActive(true);
    } else {
      setQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setSelectedKey(null);
    setIsSubmitted(false);
    setQuizFinished(false);
    setCorrectCount(0);
    setXpEarnedThisQuiz(0);
    setSecondsLeft(45);
    setTimerActive(true);
  };

  if (quizFinished) {
    const successPercentage = Math.round((correctCount / questions.length) * 100);
    return (
      <div className="max-w-md mx-auto bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl p-8 space-y-8 text-center animate-fadeIn shadow-2xl relative overflow-hidden">
        
        {/* Abstract back ambient sparkles */}
        <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl" />

        <div className="space-y-3">
          <div className="mx-auto w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[#c4c0ff] flex items-center justify-center shadow-xl shadow-indigo-500/5 animate-pulse">
            <Award className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#e3e0f1]">Quiz Complete!</h2>
          <p className="text-sm text-[#c7c4d8]/50">Reactor Core module validation metrics</p>
        </div>

        {/* Big metrics circle */}
        <div className="py-6 flex flex-col items-center">
          <div className="relative w-36 h-36 flex items-center justify-center rounded-full border-4 border-[#292935]">
            {/* Smooth SVG Progress circle ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-[#c4c0ff] fill-none"
                strokeWidth="6"
                strokeDasharray="402"
                strokeDashoffset={402 - (402 * successPercentage) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div>
              <span className="text-4xl font-black text-[#e3e0f1]">{successPercentage}%</span>
              <p className="text-[10px] text-[#c7c4d8]/40 uppercase tracking-widest mt-1">Accuracy</p>
            </div>
          </div>
        </div>

        {/* Multi counters */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#12121d] border border-[#2A2A3E]/60 p-4 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-[#c7c4d8]/40">Correct answers</p>
            <p className="text-xl font-bold text-emerald-400 mt-1">{correctCount} of {questions.length}</p>
          </div>
          <div className="bg-[#12121d] border border-[#2A2A3E]/60 p-4 rounded-xl">
            <p className="text-[10px] uppercase font-bold text-[#c7c4d8]/40">XP Earned</p>
            <p className="text-xl font-bold text-[#c4c0ff] mt-1">+{xpEarnedThisQuiz} XP</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleResetQuiz}
            className="flex-1 px-4 py-3 bg-[#1f1e2a] hover:bg-[#252541] border border-[#2A2A3E] text-[#e3e0f1] font-semibold rounded-lg text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
          
          <button 
            onClick={onNavigateToDashboard}
            className="flex-1 px-4 py-3 bg-[#c4c0ff] hover:bg-[#b0abff] text-[#2000a4] font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
          >
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-24">
      
      {/* Quiz Progress Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#1a1a2e]/60 border border-[#2a2a3e]/50 rounded-xl p-5 shrink-0">
        <div className="flex items-center gap-3">
          <span className="p-2 bg-indigo-500/10 text-[#c4c0ff] rounded-lg shrink-0">
            <HelpCircle className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#c7c4d8]/40 font-bold">Reactor Core Assessment</p>
            <h3 className="text-sm font-bold text-[#e3e0f1]">Question {currentIndex + 1} of {questions.length}</h3>
          </div>
        </div>

        {/* Multi indicators */}
        <div className="flex flex-wrap items-center gap-4">
          {/* XP details */}
          <span className="text-xs text-[#c7c4d8]/60 bg-[#12121d] border border-[#2A2A3E] px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span>Score: <strong className="text-amber-400">+{xpEarnedThisQuiz} XP</strong></span>
          </span>

          {/* Time Counter Widget */}
          <div className="flex items-center gap-2 bg-[#12121d] px-3.5 py-1.5 rounded-lg border border-[#2a2a3e] font-mono text-sm font-bold w-24 shrink-0 transition-all">
            <Clock className={`h-4 w-4 shrink-0 ${secondsLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-[#c4c0ff]'}`} />
            <span className={secondsLeft <= 10 ? 'text-rose-400' : 'text-[#e3e0f1]'}>00:{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}</span>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => handleNext()}
              className="text-xs text-[#c7c4d8]/50 hover:text-[#e3e0f1] font-semibold hover:underline"
              title="Skip this question"
            >
              Skip
            </button>
            <span className="text-[#c7c4d8]/20">/</span>
            <button 
              onClick={() => alert('Question report notification logged.')} 
              className="text-xs text-[#c7c4d8]/50 hover:text-[#e3e0f1] font-semibold hover:underline"
            >
              Report
            </button>
          </div>
        </div>
      </div>

      {/* Main assessment card */}
      <div className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
        
        {/* Heading Prompt */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#e3e0f1] leading-snug">
          {currentQuestion.question}
        </h2>

        {/* Optional Code Snippet block */}
        {currentQuestion.codeSnippet && (
          <div className="border border-[#2a2a3e] rounded-xl overflow-hidden bg-[#0d0d18] shadow-lg">
            {/* Title border tab */}
            <div className="bg-[#1f1e2a] px-4 py-2 border-b border-[#2A2A3E] font-mono text-[10px] text-[#c7c4d8]/40">
              {currentQuestion.codeSnippet.fileName}
            </div>
            <pre className="p-5 overflow-x-auto text-left text-[12px] font-mono leading-6 text-indigo-100/80">
              <code>{currentQuestion.codeSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* Option Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((opt) => {
            const isSelected = selectedKey === opt.key;
            const isCorrect = opt.key === currentQuestion.correctAnswer;
            
            // Visual helper states
            let borderStyle = 'border-[#2A2A3E] hover:border-[#c4c0ff]/35';
            let bgStyle = 'bg-[#12121d] hover:bg-[#1f1e2a]';
            let keyStyle = 'bg-[#1f1e2a] text-[#c7c4d8]';

            if (isSelected) {
              borderStyle = 'border-[#c4c0ff]';
              bgStyle = 'bg-[#1f1e2a]';
              keyStyle = 'bg-[#c4c0ff] text-[#2000a4]';
            }

            if (isSubmitted) {
              if (isCorrect) {
                borderStyle = 'border-emerald-500/80';
                bgStyle = 'bg-emerald-500/5';
                keyStyle = 'bg-emerald-500 text-[#12121d]';
              } else if (isSelected) {
                borderStyle = 'border-rose-500/80';
                bgStyle = 'bg-rose-500/5';
                keyStyle = 'bg-rose-500 text-[#12121d]';
              } else {
                borderStyle = 'border-[#2A2A3E]/40 opacity-40';
                bgStyle = 'bg-transparent';
              }
            }

            return (
              <button
                key={opt.key}
                disabled={isSubmitted}
                onClick={() => handleOptionSelect(opt.key)}
                className={`w-full text-left p-5 border rounded-xl flex gap-4 transition-all duration-300 relative select-none cursor-pointer ${
                  !isSubmitted ? 'active:scale-[0.99]' : ''
                } ${borderStyle} ${bgStyle}`}
              >
                {/* Visual Label (A, B, C, D) */}
                <span className={`w-6 h-6 rounded-md shrink-0 flex items-center justify-center font-bold text-xs ${keyStyle}`}>
                  {opt.key}
                </span>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#e3e0f1] leading-tight">
                    {opt.title}
                  </h4>
                  <p className="text-xs text-[#c7c4d8]/60 font-light leading-relaxed">
                    {opt.description}
                  </p>
                </div>

                {/* Verification icon labels */}
                {isSubmitted && isCorrect && (
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 absolute top-4 right-4" />
                )}
                {isSubmitted && isSelected && !isCorrect && (
                  <XCircle className="h-5 w-5 text-rose-400 absolute top-4 right-4" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback / Expert Pro Tip block overlay */}
        {isSubmitted && (
          <div className="bg-[#1f1e2a] border-l-4 border-[#c4c0ff] p-5 rounded-r-xl space-y-2 animate-fadeIn relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-2 text-sm font-bold text-[#c4c0ff]">
              <Lightbulb className="h-4 w-4 stroke-[#c4c0ff]" />
              <span>Expert Explains</span>
            </div>
            <p className="text-xs text-[#c7c4d8]/80 leading-relaxed font-light">
              {currentQuestion.proTip}
            </p>
          </div>
        )}

      </div>

      {/* Button footer actions */}
      {isSubmitted && (
        <div className="flex justify-end pt-4 animate-slideUp">
          <button
            onClick={handleNext}
            className="px-6 py-3.5 bg-[#c4c0ff] hover:bg-[#b0abff] text-[#2000a4] font-bold rounded-lg text-sm flex items-center gap-1 cursor-pointer shadow-lg shadow-indigo-500/10 active:scale-95 transition-all"
          >
            <span>{currentIndex === questions.length - 1 ? 'Finish Assessment' : 'Continue Evaluation'}</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

    </div>
  );
}
