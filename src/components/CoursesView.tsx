/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  TrendingUp, 
  Star, 
  Play, 
  Award, 
  BookOpen, 
  Clock, 
  ChevronRight,
  ChevronLeft,
  Video,
  FileText,
  HelpCircle,
  Lightbulb,
  Copy,
  Check,
  AlertTriangle,
  FolderOpen,
  Bookmark,
  ChevronUp,
  Inbox,
  ArrowRight
} from 'lucide-react';
import { Course, Lesson, Chapter, UserStats } from '../types';

interface CoursesViewProps {
  courses: Course[];
  user: UserStats;
  onUpdateXP: (newXp: number) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (courseId: string | null) => void;
}

export default function CoursesView({ 
  courses, 
  user, 
  onUpdateXP,
  selectedCourseId,
  setSelectedCourseId
}: CoursesViewProps) {
  // Filters & State for Catalog
  const [filter, setFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'progress'>('newest');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Active Course Viewer States
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
  const [notesText, setNotesText] = useState<Record<string, string>>({}); // persists notes by lesson ID
  const [copiedCode, setCopiedCode] = useState(false);
  const [runSuccess, setRunSuccess] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Synchronize when parent triggers a specific course selection (like clicking "Resume Learning" or "React State Management")
  useEffect(() => {
    if (selectedCourseId) {
      const selected = courses.find(c => c.id === selectedCourseId);
      if (selected) {
        handleStartCourse(selected);
      }
    }
  }, [selectedCourseId, courses]);

  // Handle entry into course details/lessons
  const handleStartCourse = (course: Course) => {
    setActiveCourse(course);
    setSelectedCourseId(course.id);
    
    // Auto expand all chapters in course outline
    const initialExpanded: Record<string, boolean> = {};
    course.chapters.forEach(ch => {
      initialExpanded[ch.id] = true;
    });
    setExpandedChapters(initialExpanded);

    // Find first uncompleted lesson, or default to first lesson
    let firstLesson: Lesson | null = null;
    for (const ch of course.chapters) {
      const uncompleted = ch.lessons.find(l => !l.completed);
      if (uncompleted) {
        firstLesson = uncompleted;
        break;
      }
    }
    if (!firstLesson && course.chapters.length > 0 && course.chapters[0].lessons.length > 0) {
      firstLesson = course.chapters[0].lessons[0];
    }
    setActiveLesson(firstLesson);
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setRunSuccess(false);
    setCopiedCode(false);
    setSaveSuccess(false);
  };

  const handleMarkAsComplete = () => {
    if (!activeCourse || !activeLesson) return;

    // Award XP only if not already completed
    if (!activeLesson.completed) {
      activeLesson.completed = true;
      onUpdateXP(user.xp + 100);
      
      // Flash successful run or notification
      setRunSuccess(true);
      setTimeout(() => setRunSuccess(false), 3000);
    }

    // Toggle next lesson automatically or trigger standard feedback
    handleNextLesson();
  };

  const handleNextLesson = () => {
    if (!activeCourse || !activeLesson) return;
    
    // Flatten all lessons
    const flatLessons: Lesson[] = [];
    activeCourse.chapters.forEach(ch => {
      flatLessons.push(...ch.lessons);
    });

    const currentIndex = flatLessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex < flatLessons.length - 1) {
      setActiveLesson(flatLessons[currentIndex + 1]);
    } else {
      // Finished all lessons!
      alert(`Congratulations! You have completed all lessons in ${activeCourse.title}!`);
    }
  };

  const handlePreviousLesson = () => {
    if (!activeCourse || !activeLesson) return;

    // Flatten all lessons
    const flatLessons: Lesson[] = [];
    activeCourse.chapters.forEach(ch => {
      flatLessons.push(...ch.lessons);
    });

    const currentIndex = flatLessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex > 0) {
      setActiveLesson(flatLessons[currentIndex - 1]);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunCode = () => {
    setRunSuccess(true);
    setTimeout(() => setRunSuccess(false), 4000);
  };

  const handleSaveBookmark = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  // Re-calculate active course dynamic progress from completions
  const getCourseProgress = (course: Course) => {
    let total = 0;
    let completed = 0;
    course.chapters.forEach(ch => {
      ch.lessons.forEach(l => {
        total++;
        if (l.completed) completed++;
      });
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  // Filter & Sort core courses grid
  const filteredCourses = courses.filter(c => {
    const matchesFilter = filter === 'All' || c.level === filter;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'progress') return getCourseProgress(b) - getCourseProgress(a);
    return 1; // standard file tree order
  });

  // Featured Hero course
  const featuredCourse = courses.find(c => c.isFeatured) || courses[0];

  return (
    <div className="animate-fadeIn">
      
      {/* 1. COURSES VIEW CATALOG SCREEN */}
      {!activeCourse ? (
        <div className="space-y-8">
          
          {/* Header Filters & Sort */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((level) => {
                const isActive = filter === level;
                return (
                  <button
                    key={level}
                    onClick={() => setFilter(level)}
                    className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 cursor-pointer active:scale-95 ${
                      isActive 
                        ? 'bg-[#c4c0ff] text-[#2000a4] shadow-lg shadow-indigo-500/10 font-bold' 
                        : 'border border-[#2a2a3e] text-[#c7c4d8]/70 hover:border-[#c4c0ff]/40 hover:text-[#e3e0f1]'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>

            {/* Custom Search & Sort dropdown */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex items-center bg-[#1f1e2a] px-4 py-2.5 rounded-lg border border-[#2A2A3E] w-64 focus-within:ring-1 focus-within:ring-[#c4c0ff]/40 transition-all">
                <Search className="h-4 w-4 text-[#c7c4d8]/50 mr-2 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses, tags..." 
                  className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-[#e3e0f1] w-full placeholder-[#c7c4d8]/30"
                />
              </div>

              <div className="relative shrink-0">
                <button 
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#1A1A2E] border border-[#2A2A3E] rounded-lg text-sm font-semibold text-[#e3e0f1] hover:border-[#c4c0ff]/40 cursor-pointer active:scale-98 transition-all"
                >
                  <span>Sort Options</span>
                  <ChevronDown className="h-4 w-4 text-[#c7c4d8]/60" />
                </button>
                {isSortDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1f1e2a] border border-[#2A2A3E] rounded-lg shadow-xl py-1 z-40">
                    {(['newest', 'rating', 'progress'] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setIsSortDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-[#c7c4d8] hover:bg-[#292935] hover:text-[#e3e0f1] transition-colors uppercase tracking-wider text-[11px] font-bold"
                      >
                        {opt === 'newest' ? 'Newest Catalog' : opt === 'rating' ? 'Highest Rating' : 'Your Progress'}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Featured Course Hero banner */}
          <section className="relative overflow-hidden rounded-2xl bg-[#1A1A2E] border border-[#2A2A3E] group">
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#12121d] via-[#12121d]/85 to-transparent z-10" />
            
            <img 
              src={featuredCourse.bannerImage} 
              alt="Course Visual Banner"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-700 pointer-events-none"
            />

            <div className="relative z-20 p-8 md:p-12 max-w-2xl space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-2.5 py-1 bg-amber-400/10 text-amber-300 border border-amber-400/20 rounded text-[10px] font-bold uppercase tracking-wider">
                  Featured Course
                </span>
                <span className="text-xs text-[#c7c4d8]/70 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-indigo-400" />
                  {featuredCourse.enrolledCount}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-headline-lg font-bold text-[#e3e0f1] group-hover:text-[#c4c0ff] transition-all">
                {featuredCourse.title}
              </h2>

              <p className="text-sm sm:text-base text-[#c7c4d8]/80 leading-relaxed font-light">
                {featuredCourse.description}
              </p>

              {/* Author, rating metadata */}
              <div className="flex flex-wrap items-center gap-6 py-2">
                <div className="flex items-center gap-2">
                  <img 
                    src={featuredCourse.instructorAvatar} 
                    alt="Instructor" 
                    className="w-8 h-8 rounded-full border border-[#c4c0ff]/30 object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#e3e0f1]">{featuredCourse.instructorName}</p>
                    <p className="text-[10px] text-[#c7c4d8]/40">Principal Engineer</p>
                  </div>
                </div>
                
                <div className="h-6 w-px bg-[#2A2A3E]" />

                <div className="flex items-center gap-1.5 text-amber-400">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span className="text-xs font-bold">{featuredCourse.rating}</span>
                  <span className="text-[11px] text-[#c7c4d8]/40 font-light">({featuredCourse.reviewCount} evaluations)</span>
                </div>
              </div>

              <button 
                onClick={() => handleStartCourse(featuredCourse)}
                className="w-fit px-6 py-3.5 bg-[#c4c0ff] text-[#2000a4] text-sm font-bold rounded-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/15 flex items-center gap-2 cursor-pointer"
              >
                Start Course Journey
                <Play className="h-4 w-4 fill-[#2000a4]" />
              </button>
            </div>
          </section>

          {/* Grid of Courses */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCourses.map((course) => {
              const currentProgress = getCourseProgress(course);
              return (
                <div 
                  key={course.id}
                  onClick={() => handleStartCourse(course)}
                  className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-xl overflow-hidden flex flex-col hover:border-[#c4c0ff]/50 transition-all duration-300 group cursor-pointer active:scale-99"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={course.bannerImage} 
                      alt={course.title}
                      className="w-full h-full object-cover grayscale opacity-50 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        course.level === 'Beginner' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : course.level === 'Intermediate'
                          ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {course.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-semibold text-[#c7c4d8]/50 bg-[#1f1e2a] px-2 py-0.5 rounded border border-[#2a2a3e]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-[#e3e0f1] group-hover:text-[#c4c0ff] transition-colors leading-tight">
                        {course.title}
                      </h3>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-[#2A2A3E]/60">
                      <div>
                        <div className="flex justify-between items-center text-xs text-[#c7c4d8]/50 font-semibold mb-1">
                          <span>Progress</span>
                          <span className="text-[#c4c0ff]">{currentProgress}%</span>
                        </div>
                        <div className="w-full h-1 bg-[#292935] rounded-full overflow-hidden">
                          <div 
                            className="bg-[#c4c0ff] h-full rounded-full transition-all duration-300"
                            style={{ width: `${currentProgress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#c7c4d8]/40">
                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                          <Star className="h-3.5 w-3.5 fill-amber-400 shrink-0" />
                          <span>{course.rating}</span>
                        </div>
                        <span className="font-light">{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Newsletter section */}
          <section className="bg-[#1f1e2a] border border-[#2A2A3E] p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-44 h-44 rounded-full bg-indigo-500/5 blur-2xl z-0" />
            <div className="space-y-2 max-w-lg z-10">
              <h4 className="text-xl font-bold text-[#e3e0f1] flex items-center gap-2">
                <Inbox className="h-5 w-5 text-[#c4c0ff]" />
                Don't miss a lesson.
              </h4>
              <p className="text-sm text-[#c7c4d8]/70 leading-relaxed font-light">
                Join 15,000+ developers getting supreme React 19 tips directly in their inbox every Tuesday. No spam ever.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto shrink-0 z-10">
              <input 
                type="email" 
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="you@company.com"
                className="px-4 py-2.5 bg-[#12121d] border border-[#2A2A3E] rounded-lg text-sm text-[#e3e0f1] w-full md:w-72 outline-none focus:border-[#c4c0ff]/40 transition-all font-light"
              />
              <button 
                type="submit" 
                className="bg-[#c4c0ff] text-[#2000a4] font-bold px-6 py-2.5 rounded-lg text-sm hover:brightness-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-indigo-500/10 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {subscribed && (
              <div className="absolute inset-0 bg-[#1A1A2E] z-20 flex items-center justify-center text-center px-4 animate-fadeIn">
                <p className="text-[#c4c0ff] font-bold text-base flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-400" />
                  Awesome! Welcome to the ReactPath weekly newsletter list.
                </p>
              </div>
            )}
          </section>

        </div>
      ) : (
        
        /* 2. ACTIVE COURSE VIEWER SCREEN */
        <div className="fixed inset-0 bg-[#12121d] z-50 flex flex-col pt-16">
          
          {/* Top Header of Active Lesson (Back Control, Course Title) */}
          <div className="h-14 bg-[#1A1A2E]/90 backdrop-blur-md border-b border-[#2A2A3E] px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  setActiveCourse(null);
                  setActiveLesson(null);
                  setSelectedCourseId(null);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1f1e2a] hover:bg-[#252541] text-[#c7c4d8] rounded-lg border border-[#2A2A3E] text-xs font-semibold cursor-pointer transition-all active:scale-95 shrink-0"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Catalog</span>
              </button>
              
              <div className="h-5 w-px bg-[#2A2A3E] hidden sm:block" />
              
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest text-[#c7c4d8]/40 font-bold">Currently Viewing</p>
                <p className="text-sm font-bold text-[#e3e0f1] truncate max-w-[200px] sm:max-w-md">{activeCourse.title}</p>
              </div>
            </div>

            {/* Micro details */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#c7c4d8]/60 font-medium hidden md:inline">
                Streak: <span className="font-bold text-amber-400">{user.streak} days🔥</span>
              </span>
              <span className="px-2 py-1 bg-indigo-500/10 text-[#c4c0ff] text-[10px] font-bold uppercase rounded border border-indigo-500/20">
                {activeCourse.level}
              </span>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            
            {/* Left Sub-Sidebar (Course Content Navigation) */}
            <aside className="w-72 bg-[#0d0d18] border-r border-[#2A2A3E] flex flex-col overflow-y-auto shrink-0 hidden md:flex">
              
              {/* Progress Panel */}
              <div className="p-5 border-b border-[#2A2A3E]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] text-[#c7c4d8]/50 uppercase font-bold">Course Progress</span>
                  <span className="text-xs font-bold text-[#c4c0ff]">{getCourseProgress(activeCourse)}%</span>
                </div>
                <div className="w-full bg-[#1A1A2E] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#c4c0ff] h-full rounded-full transition-all duration-300" 
                    style={{ width: `${getCourseProgress(activeCourse)}%` }}
                  />
                </div>
              </div>

              {/* Chapters & Lessons Accordion List */}
              <div className="flex-1 py-4 space-y-4 px-3">
                {activeCourse.chapters.map((ch) => {
                  const isExpanded = expandedChapters[ch.id] ?? true;
                  return (
                    <div key={ch.id} className="space-y-1">
                      <button 
                        onClick={() => setExpandedChapters({
                          ...expandedChapters,
                          [ch.id]: !isExpanded
                        })}
                        className="flex items-center justify-between w-full p-2 hover:bg-[#1A1A2E] rounded-lg transition-colors text-left text-xs font-bold tracking-wide text-[#e3e0f1] cursor-pointer"
                      >
                        <span className="truncate pr-2">{ch.title}</span>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-[#c7c4d8]/50 shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-[#c7c4d8]/50 shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="space-y-0.5 pl-1.5">
                          {ch.lessons.map((lesson) => {
                            const isCurrent = activeLesson?.id === lesson.id;
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => handleLessonSelect(lesson)}
                                className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left text-xs transition-all relative ${
                                  isCurrent 
                                    ? 'bg-[#1f1e2a] text-[#c4c0ff]' 
                                    : 'text-[#c7c4d8]/70 hover:bg-[#1A1A2E]/60 hover:text-[#e3e0f1]'
                                }`}
                              >
                                {isCurrent && <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#c4c0ff] rounded-full" />}
                                
                                {lesson.completed ? (
                                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                ) : lesson.type === 'video' ? (
                                  <Video className="h-3.5 w-3.5 text-[#c7c4d8]/40 shrink-0" />
                                ) : lesson.type === 'quiz' ? (
                                  <HelpCircle className="h-3.5 w-3.5 text-[#c7c4d8]/40 shrink-0" />
                                ) : (
                                  <FileText className="h-3.5 w-3.5 text-[#c7c4d8]/40 shrink-0" />
                                )}
                                
                                <span className={`truncate flex-1 ${isCurrent ? 'font-bold' : ''}`}>
                                  {lesson.title}
                                </span>
                                
                                <span className="text-[9px] text-[#c7c4d8]/30 shrink-0 font-light">
                                  {lesson.duration}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* Center Instructional content area */}
            <main className="flex-1 overflow-y-auto bg-[#12121d] pb-32">
              {activeLesson ? (
                <div className="max-w-4xl mx-auto px-6 py-8 sm:px-12 space-y-8">
                  
                  {/* Breadcrumbs */}
                  <nav className="flex items-center gap-1.5 text-[11px] text-[#c7c4d8]/50 uppercase font-semibold">
                    <span>Courses</span>
                    <ChevronRight className="h-3 w-3 shrink-0" />
                    <span className="truncate max-w-[120px]">{activeCourse.title}</span>
                    <ChevronRight className="h-3 w-3 shrink-0" />
                    <span className="text-[#c4c0ff] truncate">Active Lesson</span>
                  </nav>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl font-headline-lg font-bold text-[#e3e0f1] tracking-tight">
                    Using <span className="text-[#c4c0ff]">{activeLesson.title}</span> for High-Performance UI
                  </h1>

                  {/* Body Content */}
                  <div className="space-y-6 text-sm text-[#c7c4d8]/80 leading-relaxed font-light">
                    {activeLesson.contentMarkdown ? (
                      <div className="space-y-4">
                        <p>
                          In React environment operations, the <code className="bg-[#1f1e2a] px-1.5 py-0.5 rounded text-[#c4c0ff] font-mono text-xs">{activeLesson.title}</code> hook allows you to defer updating a heavy chunk of the template tree. It is extremely effective for massive search auto-completes, maps recalculation, and complex tables which might block the main thread.
                        </p>
                        <p>
                          Unlike generic debouncing timers, this hook binds with React's concurrent rendering loop under-the-hood. It starts executing immediately after the prime rendering queue returns idle, ensuring the screen is extremely responsive even under active workloads.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p>
                          Welcome to this core guide module! In this lesson, we breakdown the design philosophy of React 19 frameworks, testing strategies for complex applications, and modular component structures.
                        </p>
                        <p>
                          Make sure to study the sample logic files and test updates yourself using the Playground or our interactive sandboxes!
                        </p>
                      </div>
                    )}

                    {/* Expert Tip card callout */}
                    <div className="bg-[#1f1e2a] border-l-4 border-[#c4c0ff] p-5 rounded-r-xl flex gap-4 shadow-[#6c63ff]/5 shadow-md">
                      <Lightbulb className="h-5 w-5 text-[#c4c0ff] shrink-0 mt-1" />
                      <div>
                        <h4 className="text-sm font-bold text-[#c4c0ff] mb-1">Expert Tip</h4>
                        <p className="text-xs text-[#c7c4d8]/80 font-light leading-relaxed">
                          Unlike debouncing which relies on artificial timeouts, this engine doesn't wait a fixed length of time. It initiates the rendering task the split-second the thread goes quiet.
                        </p>
                      </div>
                    </div>

                    {/* Code block preview */}
                    {activeLesson.codeSnippet && (
                      <div className="border border-[#2A2A3E] rounded-xl overflow-hidden bg-[#0d0d18] shadow-xl">
                        {/* Tab header */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#1f1e2a] border-b border-[#2A2A3E]">
                          <div className="flex items-center gap-1.5 text-xs text-[#c7c4d8]/70">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                            <span className="font-mono text-[#c7c4d8]/40 ml-2">{activeLesson.codeSnippet.fileName}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => handleCopyCode(activeLesson.codeSnippet?.code || '')}
                              className="flex items-center gap-1 text-[11px] text-[#c7c4d8]/50 hover:text-[#c4c0ff] transition-colors cursor-pointer"
                            >
                              {copiedCode ? (
                                <>
                                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                                  <span className="text-emerald-400 font-bold">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>

                            <button 
                              onClick={handleRunCode}
                              className="flex items-center gap-1 text-[11px] text-[#c4c0ff] font-bold hover:underline transition-all cursor-pointer"
                            >
                              <Play className="h-3.5 w-3.5 fill-[#c4c0ff]" />
                              <span>Run Sandbox</span>
                            </button>
                          </div>
                        </div>

                        {/* Text Container with Line numbers */}
                        <div className="p-5 font-mono text-xs flex overflow-x-auto text-[#c7c4d8]/95 leading-relaxed">
                          <div className="text-[#c7c4d8]/20 select-none text-right border-r border-[#2A2A3E]/30 pr-4 mr-4 shrink-0">
                            1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10<br />11<br />12
                          </div>
                          <pre className="text-left select-text">
                            <span className="text-purple-400">import</span> {'{ useState, useDeferredValue }'} <span className="text-purple-400">from</span> <span className="text-emerald-400">'react'</span>;{'\n\n'}
                            <span className="text-purple-400">function</span> <span className="text-blue-400">SearchPage</span>() {'{\n'}
                            {'  '}<span className="text-purple-400">const</span> [query, setQuery] = <span className="text-blue-400">useState</span>(<span className="text-emerald-400">''</span>);{'\n'}
                            {'  '}<span className="text-purple-400">const</span> deferredQuery = <span className="text-blue-400">useDeferredValue</span>(query);{'\n\n'}
                            {'  '}<span className="text-purple-400">return</span> ({'\n'}
                            {'    '}<span className="text-amber-400">&lt;div&gt;</span>{'\n'}
                            {'      '}<span className="text-amber-400">&lt;input</span> value={'{query}'} onChange={'{e =&gt; setQuery(e.target.value)}'} <span className="text-amber-400">/&gt;</span>{'\n'}
                            {'      '}<span className="text-amber-400">&lt;SlowList</span> text={'{deferredQuery}'} <span className="text-amber-400">/&gt;</span>{'\n'}
                            {'    '}<span className="text-amber-400">&lt;/div&gt;</span>{'\n'}
                            {'  '});{'\n'}
                            {'}'}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* Warning note block */}
                    <div className="bg-[#1f1e2a] border-l-4 border-rose-500 p-5 rounded-r-xl flex gap-4">
                      <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-1" />
                      <div>
                        <h4 className="text-sm font-bold text-rose-400 mb-1">Important Note</h4>
                        <p className="text-xs text-[#c7c4d8]/80 font-light leading-relaxed">
                          Ensure elements provided inside the hooks remain stabilized (e.g. primitive values or statically scoped items). Passing objects allocated directly during rendering triggers endless loops.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="h-96 flex flex-col items-center justify-center text-center p-6 text-[#c7c4d8]/40 space-y-3">
                  <BookOpen className="h-10 w-10 text-indigo-400/40" />
                  <p>No active lesson loaded. Please select one on the index block.</p>
                </div>
              )}
            </main>

            {/* Right sub-sidebar (Notes scratchpad, TOC, related) */}
            <aside className="w-80 bg-[#1A1A2E] border-l border-[#2A2A3E] py-8 px-6 flex flex-col gap-8 overflow-y-auto shrink-0 hidden lg:flex">
              
              {/* In this lesson index */}
              <div className="space-y-4">
                <h3 className="text-[10px] text-[#c7c4d8]/40 uppercase font-bold tracking-wider">In this lesson</h3>
                <nav className="space-y-3 text-xs font-semibold">
                  <a className="block text-[#c4c0ff] border-l-2 border-[#c4c0ff] pl-3" href="#">Overview & Objectives</a>
                  <a className="block text-[#c7c4d8]/60 hover:text-[#e3e0f1] pl-3 transition-colors" href="#">Optimal Use Cases</a>
                  <a className="block text-[#c7c4d8]/60 hover:text-[#e3e0f1] pl-3 transition-colors" href="#">Implementation Blueprint</a>
                  <a className="block text-[#c7c4d8]/60 hover:text-[#e3e0f1] pl-3 transition-colors" href="#">System Evaluations</a>
                </nav>
              </div>

              {/* Note Scratchpad module */}
              <div className="bg-[#1f1e2a] border border-[#2A2A3E] p-4 rounded-xl space-y-3 shrink-0">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase text-[#c7c4d8]/50">
                  <span>Quick Notes</span>
                  <Bookmark className="h-3.5 w-3.5 text-[#c4c0ff]" />
                </div>
                <textarea 
                  value={notesText[activeLesson?.id || ''] || ''}
                  onChange={(e) => setNotesText({
                    ...notesText,
                    [activeLesson?.id || '']: e.target.value
                  })}
                  placeholder="Type notes or code tags here (autosaved)..."
                  className="w-full bg-[#12121d] border border-[#2A2A3E] rounded-lg p-2 text-xs text-[#e3e0f1] focus:ring-1 focus:ring-[#c4c0ff] focus:border-transparent outline-none resize-none h-28 leading-normal font-light"
                />
                <p className="text-[9px] text-[#c7c4d8]/30 font-light text-right">Saved inside react memory.</p>
              </div>

              {/* Related topics link list */}
              <div className="space-y-4">
                <h3 className="text-[10px] text-[#c7c4d8]/40 uppercase font-bold tracking-wider">Related Topics</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-[#1f1e2a]/55 border border-transparent hover:border-[#2a2a3e] hover:bg-[#1f1e2a] rounded-lg cursor-pointer group transition-all">
                    <p className="text-xs font-bold text-[#e3e0f1] group-hover:text-[#c4c0ff] transition-colors leading-snug">
                      useTransition vs useDeferredValue
                    </p>
                    <p className="text-[10px] text-[#c7c4d8]/40 mt-1 font-light">Intermediate • 8 minutes read</p>
                  </div>
                  <div className="p-3 bg-[#1f1e2a]/55 border border-transparent hover:border-[#2a2a3e] hover:bg-[#1f1e2a] rounded-lg cursor-pointer group transition-all">
                    <p className="text-xs font-bold text-[#e3e0f1] group-hover:text-[#c4c0ff] transition-colors leading-snug">
                      Concurrent Rendering Foundations
                    </p>
                    <p className="text-[10px] text-[#c7c4d8]/40 mt-1 font-light">Beginner • 12 minutes video</p>
                  </div>
                </div>
              </div>

            </aside>
          </div>

          {/* Bottom active viewer navigations (Marks completed state, moves indexes) */}
          <footer className="fixed bottom-0 right-0 left-0 md:pl-72 h-16 bg-[#1A1A2E]/95 backdrop-blur-md border-t border-[#2A2A3E] px-6 py-3 flex items-center justify-between z-30">
            <div className="flex gap-2.5">
              <button 
                onClick={handlePreviousLesson}
                className="flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-lg bg-[#1f1e2a] border border-[#2A2A3E] text-[#c7c4d8]/80 hover:bg-[#252541] hover:text-[#e3e0f1] cursor-pointer transition-all active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
                disabled={!activeLesson}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Prev</span>
              </button>
              
              <button 
                onClick={handleSaveBookmark}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#1f1e2a] border border-[#2A2A3E] text-[#c7c4d8]/80 hover:bg-[#252541] hover:text-[#e3e0f1] cursor-pointer transition-all active:scale-95"
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Save File</span>
              </button>
            </div>

            <div className="flex gap-2.5 items-center">
              <button 
                onClick={handleMarkAsComplete}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-lg border border-[#c4c0ff]/30 text-[#c4c0ff] bg-[#1f1e2a] hover:bg-[#c4c0ff]/10 cursor-pointer transition-all active:scale-95 shrink-0"
              >
                <Check className="h-4 w-4" />
                <span>Mark Completed</span>
              </button>

              <button 
                onClick={handleNextLesson}
                className="flex items-center gap-1 bg-[#c4c0ff] text-[#2000a4] font-bold px-5 py-2 rounded-lg text-xs hover:brightness-105 active:scale-95 cursor-pointer transition-all shrink-0"
              >
                <span>Next Lesson</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </footer>

          {/* Floaters for run successes / saves */}
          {runSuccess && (
            <div className="fixed bottom-20 right-6 z-55 bg-emerald-500 text-[#12121d] px-4 py-2.5 rounded-lg font-bold text-xs shadow-xl animate-slideUp flex items-center gap-2">
              <Check className="h-4 w-4" />
              <span>Sandbox output check: compiled fully! +120XP received!</span>
            </div>
          )}

          {saveSuccess && (
            <div className="fixed bottom-20 right-6 z-55 bg-indigo-500 text-[#e3e0f1] px-4 py-2.5 rounded-lg font-bold text-xs shadow-xl animate-slideUp flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              <span>File bookmark saved persistently.</span>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
