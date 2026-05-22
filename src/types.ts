/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'quiz';
  completed: boolean;
  contentMarkdown?: string;
  codeSnippet?: {
    fileName: string;
    code: string;
    language: string;
  };
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  instructorName: string;
  instructorAvatar: string;
  rating: number;
  reviewCount: number;
  duration: string;
  bannerImage: string;
  tags: string[];
  progress: number;
  enrolledCount: string;
  isFeatured?: boolean;
  chapters: Chapter[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: {
    fileName: string;
    code: string;
  };
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    title: string;
    description: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  proTip: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  streak: number;
  badge?: string;
  isCurrentUser?: boolean;
  badges: string[];
}

export interface ForumPost {
  id: string;
  title: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  category: string;
  likes: number;
  repliesCount: number;
  createdAt: string;
  likedByCurrentUser?: boolean;
  replies: {
    id: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    createdAt: string;
  }[];
}

export interface UserStats {
  name: string;
  avatar: string;
  title: string;
  level: number;
  xp: number;
  streak: number;
  globalRank: number;
  joinedDate: string;
  location: string;
}

export interface UserSettings {
  interfaceTheme: 'dark' | 'light';
  accentColor: string; // e.g. '#6C63FF'
  editorFontSize: number; // in pixels, e.g. 14
  emailNotifications: boolean;
  pushNotifications: boolean;
}
