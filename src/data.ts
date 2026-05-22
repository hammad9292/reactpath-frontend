/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, QuizQuestion, LeaderboardUser, ForumPost } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'react-19-complete',
    title: 'React 19 — Complete Guide',
    level: 'Advanced',
    description: 'Master the latest features of React 19, including Server Components, Actions, and the new compiler. The definitive path from apprentice to expert.',
    instructorName: 'Sarah Drasner',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqtLC7u-NkHjwxyLIes0lFyIPWCRT28YzpmgxCvt0junVcY4AvQ2bPsJnE-TATKO6b7n4yZcTahawB4OuPWqaesjl_u5EgCuAjok6WbZvlvibVu__DAqS8vNzlB1HiQx_ErkUgIKcVqWTccWck4IGg_g86DK3Wrfl3sXD93_MLRwTPxM_xIM_vlVoMF5lJshIjrPY4TkCd6GJyGspgG6aglcVdsDFBKzH1uGSutHBrx1CIx-fvlRcCcU9lVvws3Kwr8fKrJ2SfNUE',
    rating: 4.9,
    reviewCount: 842,
    duration: '24 lessons • 18h 15m',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU2zEfVmxd_s6kKMbIAZS9N00MQeJYjmBHL5pxkWJbsE5O-u_goywwTncC2Eo0K1UW9__01fq0xOXxeFdSGAZXpjkojn1EGeuteY6eR4JbDetD6B1COf-p-2Ib7Ef1sZaxyi7ggywcayuQgv8-o5b-sGLPxg2y6ZisR1u9HCtPFr7ci0h3zLefI1qPH9MmOVQSLFSzjElORkrvgS7vmfKA3ydXozvUzNyaimgAfFsplS6Q6SsieJQvX0rD_MG6Ic7efBYftNHKl9o',
    tags: ['React 19', 'RSC', 'Compiler'],
    progress: 45,
    enrolledCount: '2.4k students enrolled',
    isFeatured: true,
    chapters: [
      {
        id: 'r19-intro',
        title: '1. Introduction to React 19 Roadmap',
        lessons: [
          { id: 'l-r19-1', title: 'Welcome to React 19 Complete Guide', duration: '12m', type: 'video', completed: true },
          { id: 'l-r19-2', title: 'Why React 19 is a Paradigm Shift', duration: '18m', type: 'video', completed: true },
          { id: 'l-r19-3', title: 'Setting Up Your React 19 Project', duration: '15m', type: 'text', completed: true }
        ]
      },
      {
        id: 'r19-compiler',
        title: '2. The React Compiler (React Forget)',
        lessons: [
          { id: 'l-r19-4', title: 'Understanding Auto-memoization', duration: '20m', type: 'video', completed: true },
          { id: 'l-r19-5', title: 'Configuring Compiler Rules', duration: '25m', type: 'text', completed: false },
          { id: 'l-r19-6', title: 'Testing Compiler Compatibility', duration: '14m', type: 'video', completed: false }
        ]
      },
      {
        id: 'r19-server-components',
        title: '3. Server Components & Server Actions',
        lessons: [
          { id: 'l-r19-7', title: 'React Server Components deep-dive', duration: '35m', type: 'video', completed: false },
          { id: 'l-r19-8', title: 'Building forms with Actions & useActionState', duration: '28m', type: 'video', completed: false },
          { id: 'l-r19-9', title: 'Optimistic Updates with useOptimistic', duration: '22m', type: 'text', completed: false }
        ]
      }
    ]
  },
  {
    id: 'modern-react-foundations',
    title: 'Modern React Foundations',
    level: 'Beginner',
    description: 'Build robust, highly scalable React applications starting from the fundamental principles of hooks, virtual DOM, and component design.',
    instructorName: 'Sarah Drasner',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqtLC7u-NkHjwxyLIes0lFyIPWCRT28YzpmgxCvt0junVcY4AvQ2bPsJnE-TATKO6b7n4yZcTahawB4OuPWqaesjl_u5EgCuAjok6WbZvlvibVu__DAqS8vNzlB1HiQx_ErkUgIKcVqWTccWck4IGg_g86DK3Wrfl3sXD93_MLRwTPxM_xIM_vlVoMF5lJshIjrPY4TkCd6GJyGspgG6aglcVdsDFBKzH1uGSutHBrx1CIx-fvlRcCcU9lVvws3Kwr8fKrJ2SfNUE',
    rating: 4.8,
    reviewCount: 312,
    duration: '12h 40m',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1QaUVq2P5gGLKMk6GIArqON3regwUoRYHFPe2qqbkqppniDDZLnSnCNd6hns4KRnyjShSU2wXVw-z31DWZRv-3P0RkBIsBdSrF14Se8QEHBc4VM6sqyATDa7clZUHTGZtb_sZ_bDnNuRNSVqE9_Q1-HOnuShihjjjEXt2eKEdxqhSrITTR9ju_ZXYxrLB9DwJHuuIv4OooCwVSXfxsr4GuVq6EjW0zXNtQZ3W8W_Txt7NTv85uRaB_xEBIxCFjSC2oTiutIQV4Uc',
    tags: ['Hooks', 'JSX'],
    progress: 65,
    enrolledCount: '1.2k students enrolled',
    chapters: [
      {
        id: 'hooks-deep-dive',
        title: '1. Hooks Deep Dive',
        lessons: [
          { id: 'l-mrf-1', title: 'Understanding useMemo', duration: '15m', type: 'video', completed: true },
          { id: 'l-mrf-2', title: 'Mastering useCallback', duration: '18m', type: 'text', completed: true }
        ]
      },
      {
        id: 'advanced-ui-patterns',
        title: '2. Advanced UI Patterns',
        lessons: [
          {
            id: 'l-mrf-3',
            title: 'useDeferredValue',
            duration: '12m',
            type: 'video',
            completed: false,
            contentMarkdown: `In React 18, the \`useDeferredValue\` hook allows you to defer updating a part of the UI. It's particularly useful when you have a large list or a heavy computation that might block the main thread during typing or other high-frequency interactions.

### Why not just use Debouncing?

Unlike debouncing, \`useDeferredValue\` does not wait for a fixed amount of time (e.g. 300ms). Instead, it schedules a deferred render immediately after the urgent render finishes. If the user continues typing, React will abandon the old deferred render and start a new one based on the latest input. This prevents UI lagging while maintaining an incredibly responsive frame rate.

### Common Use Cases
1. **Search Auto-complete Lists**: Keeping the search input field silky smooth by deferring the heavy filtration of lists below.
2. **Heavy Charts or Visualizations**: Retaining fast input controls while delaying data canvas recalculations.`,
            codeSnippet: {
              fileName: 'SearchFilter.jsx',
              code: `import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <SlowList text={deferredQuery} />
    </div>
  );
}`,
              language: 'jsx'
            }
          },
          { id: 'l-mrf-4', title: 'Concurrent Transitions', duration: '15m', type: 'text', completed: false },
          { id: 'l-mrf-5', title: 'Quiz: Scheduling', duration: '10m', type: 'quiz', completed: false }
        ]
      }
    ]
  },
  {
    id: 'advanced-state-patterns',
    title: 'Advanced State Patterns',
    level: 'Intermediate',
    description: 'Deep dive into data flow paradigms. Compare Redux, Zustand, Recoil, and Context APIs under production workload conditions.',
    instructorName: 'Sarah Drasner',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqtLC7u-NkHjwxyLIes0lFyIPWCRT28YzpmgxCvt0junVcY4AvQ2bPsJnE-TATKO6b7n4yZcTahawB4OuPWqaesjl_u5EgCuAjok6WbZvlvibVu__DAqS8vNzlB1HiQx_ErkUgIKcVqWTccWck4IGg_g86DK3Wrfl3sXD93_MLRwTPxM_xIM_vlVoMF5lJshIjrPY4TkCd6GJyGspgG6aglcVdsDFBKzH1uGSutHBrx1CIx-fvlRcCcU9lVvws3Kwr8fKrJ2SfNUE',
    rating: 4.9,
    reviewCount: 418,
    duration: '18h 15m',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzDE0LfWrWatKrtbkneKMDpyfO-BplxqdiBt2NscsqkRjIAqXIyGC0XCizBs3M4c8HSK8GzH9v-rPsiO2oKg31xQEB62uK9CzHxcMCv-GS81HcLYyBUJOYufPqbd2k8hkazkf5Ozl8AqD0Z9uVS6kvWPtiaGxbE5uDfH41nV6z35tQQqhymBOaMuPC56Q7iQHFSqp8SbhiUVN-FLOjZbI70K-EN4Z6LZHCw_LtuKOH3_pgxwj9Lan-E7A4vp03uWnz8CztUnl6nYY',
    tags: ['Redux', 'Zustand'],
    progress: 0,
    enrolledCount: '811 students enrolled',
    chapters: [
      {
        id: 'redux-mastery',
        title: '1. Redux Toolkit Advanced',
        lessons: [
          { id: 'l-asp-1', title: 'Why Redux is still relevant', duration: '20m', type: 'video', completed: false },
          { id: 'l-asp-2', title: 'Slices, Thunks, and Middleware', duration: '25m', type: 'video', completed: false }
        ]
      },
      {
        id: 'zustand-mastery',
        title: '2. Lightweight Zustand Flows',
        lessons: [
          { id: 'l-asp-3', title: 'Zustand vs Redux Toolkit', duration: '15m', type: 'text', completed: false },
          { id: 'l-asp-4', title: 'Slices and atomic updates in Zustand', duration: '18m', type: 'video', completed: false }
        ]
      }
    ]
  },
  {
    id: 'server-side-mastery',
    title: 'Server-Side Mastery',
    level: 'Advanced',
    description: 'Master server-side rendering, static generation, streaming, and full-stack architecture using Next.js and React 19 RSC.',
    instructorName: 'Sarah Drasner',
    instructorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqtLC7u-NkHjwxyLIes0lFyIPWCRT28YzpmgxCvt0junVcY4AvQ2bPsJnE-TATKO6b7n4yZcTahawB4OuPWqaesjl_u5EgCuAjok6WbZvlvibVu__DAqS8vNzlB1HiQx_ErkUgIKcVqWTccWck4IGg_g86DK3Wrfl3sXD93_MLRwTPxM_xIM_vlVoMF5lJshIjrPY4TkCd6GJyGspgG6aglcVdsDFBKzH1uGSutHBrx1CIx-fvlRcCcU9lVvws3Kwr8fKrJ2SfNUE',
    rating: 5.0,
    reviewCount: 226,
    duration: '22h 30m',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_QPKGMbPYFYZyx0bJZXrNsVTFVQT3iGK634-o3W2xeZPosD-iQP191k8_dhe3cbE-OBV7WZINN0LXy3Gt0wa1H3JULlCRzUs9XYMw6FzlDNNpmvLY7hD6QDW4p924ELvneX3aFsCvdn1JNICq-0RpTR3sWvAlvsE8g1zcaLq2jCr7v6_DOr3IOWi4T7psJTMk-T38r9qw1JUqUifbnAkbVjprTu3QbFqJCy4cnsvGvn-LDp1LXAvl7txHBIbPiJwudJxM5ySb0BQ',
    tags: ['Next.js', 'RSC'],
    progress: 12,
    enrolledCount: '522 students enrolled',
    chapters: [
      {
        id: 'ssr-rsc',
        title: '1. Next.js App Router Architecture',
        lessons: [
          { id: 'l-ssm-1', title: 'Comparing SSR, SSG, ISR, and CSR', duration: '28m', type: 'video', completed: true },
          { id: 'l-ssm-2', title: 'How React Server Components load', duration: '32m', type: 'video', completed: false }
        ]
      }
    ]
  }
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-use-ref',
    question: 'Which hook would you use to store a value that persists across renders but doesn\'t trigger a re-render?',
    codeSnippet: {
      fileName: 'Counter.jsx',
      code: `function Counter() {
  /* TODO: Which hook goes here? */
  const renderCount = ???( 0 );

  useEffect(() => {
    renderCount.current += 1;
  });

  return <div id="rendered-cnt">I have rendered {renderCount.current} times</div>;
}`
    },
    options: [
      { key: 'A', title: 'useState', description: 'Manages reactive state that triggers re-renders on change.' },
      { key: 'B', title: 'useEffect', description: 'Handles side effects and synchronizes with external systems.' },
      { key: 'C', title: 'useRef', description: 'Stores mutable values that don\'t trigger renders when updated.' },
      { key: 'D', title: 'useMemo', description: 'Memoizes expensive computations between re-renders.' }
    ],
    correctAnswer: 'C',
    proTip: 'Think about the "Box" model in React. You need a container that stays the same while its contents change.'
  },
  {
    id: 'q-use-deferred',
    question: 'What is the primary difference between useDeferredValue and typical debouncing techniques?',
    options: [
      { key: 'A', title: 'Interval constraints', description: 'useDeferredValue waits a fixed 200ms by default before executing the render.' },
      { key: 'B', title: 'Main-thread coordination', description: 'useDeferredValue evaluates immediately when the main thread goes idle, preventing drop in frames.' },
      { key: 'C', title: 'State integration', description: 'Debouncing uses native React state while useDeferredValue runs outside React entirely.' },
      { key: 'D', title: 'No difference', description: 'They perform the exact same operational routines.' }
    ],
    correctAnswer: 'B',
    proTip: 'Debouncing relies on hard timeouts. useDeferredValue is integrated into React\'s concurrent scheduler to adapt to thread capacity.'
  },
  {
    id: 'q-rsc-client',
    question: 'How do you explicitly declare a file as a Client Component in modern React full-stack architectures?',
    codeSnippet: {
      fileName: 'Button.jsx',
      code: `/* TODO: Insert directive */
import { useState } from 'react';

export default function InteractiveButton() {
  const [clicked, setClicked] = useState(false);
  return <button onClick={() => setClicked(true)}>Click Me</button>;
}`
    },
    options: [
      { key: 'A', title: '"client only"', description: 'The legacy standard from alpha frameworks.' },
      { key: 'B', title: '"use state"', description: 'Directly indicating state usage.' },
      { key: 'C', title: '"use client"', description: 'Specifies the boundary to bundle this and its imports for the browser.' },
      { key: 'D', title: '"browser environment"', description: 'The global standard for node loaders.' }
    ],
    correctAnswer: 'C',
    proTip: 'This directive must sit at the very top of the file, before any import statements.'
  }
];

export const INITIAL_LEADERBOARD_USERS: LeaderboardUser[] = [
  { rank: 1, name: 'Marcus Dev', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjdW_HfZJApvlkXHaQSLv5JOy5eUfr3gNJ3mkOmcM9oyV_qOlTG2dW5eYcPI-iHmlp0ZcFjOyov1Ya_1jNSOecQRDe0MkPmuHYrO7OLQUDyjpb87XmKwxVpi61J8R2ceKFE1ldplrfYUqbcJXA_EsMK7ObgtAKtSJsYRrkrYmpmwPOsT_erkByIY54gZjjJQ06SDhBUyr-F9jeeXPrYkp0scWzePqUvOVFFjPdrCP-rLMFkbjYwxIRvQfnIAyj2_uG8Sz_Jd9jR6k', level: 50, xp: 24800, streak: 120, badge: 'TOP CONTRIBUTOR', badges: ['speed', 'code', 'fire'] },
  { rank: 2, name: 'Sarah K.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqtLC7u-NkHjwxyLIes0lFyIPWCRT28YzpmgxCvt0junVcY4AvQ2bPsJnE-TATKO6b7n4yZcTahawB4OuPWqaesjl_u5EgCuAjok6WbZvlvibVu__DAqS8vNzlB1HiQx_ErkUgIKcVqWTccWck4IGg_g86DK3Wrfl3sXD93_MLRwTPxM_xIM_vlVoMF5lJshIjrPY4TkCd6GJyGspgG6aglcVdsDFBKzH1uGSutHBrx1CIx-fvlRcCcU9lVvws3Kwr8fKrJ2SfNUE', level: 42, xp: 18240, streak: 35, badges: ['speed', 'fire'] },
  { rank: 3, name: 'Elena R.', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1QaUVq2P5gGLKMk6GIArqON3regwUoRYHFPe2qqbkqppniDDZLnSnCNd6hns4KRnyjShSU2wXVw-z31DWZRv-3P0RkBIsBdSrF14Se8QEHBc4VM6sqyATDa7clZUHTGZtb_sZ_bDnNuRNSVqE9_Q1-HOnuShihjjjEXt2eKEdxqhSrITTR9ju_ZXYxrLB9DwJHuuIv4OooCwVSXfxsr4GuVq6EjW0zXNtQZ3W8W_Txt7NTv85uRaB_xEBIxCFjSC2oTiutIQV4Uc', level: 38, xp: 15900, streak: 18, badges: ['code'] },
  { rank: 4, name: 'Felix Wander', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100', level: 35, xp: 14205, streak: 12, badges: ['speed', 'checked'] },
  { rank: 5, name: 'Ahmad', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDI4YViomewaHJ5tdy9cJRcA-0QG4_GNqq_DPZVD11X5n0mexDAJnaIO25O-ztNa2TY0W2WOmqwSeGPIRNbpcrETdMeA1gfxXEERiwhNosCxJYgle4Y2xPrjP88MjAHMyC8W8KY01vx7Mt9MPChxymvZP7dW06ju29Fl30-EFb61eu5cs1JiJjxsNBImacT_a2NrBxr8fEd0r5X_tofnHkMwpUBFNYsiYOyZeufGVdxYLWsHXGLwRQPiCm5pWJPGXCsSnar52GSGE', level: 34, xp: 12850, streak: 45, isCurrentUser: true, badges: ['checked', 'speed', 'heart'] },
  { rank: 6, name: 'Chloe Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100', level: 32, xp: 11920, streak: 2, badges: ['rocket'] },
  { rank: 7, name: 'Liam O\'Conner', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100', level: 30, xp: 10450, streak: 8, badges: ['shield'] },
  { rank: 8, name: 'Tariq Al-Mansoori', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100', level: 29, xp: 9810, streak: 15, badges: ['speed'] },
  { rank: 9, name: 'Yuki Hashimoto', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100', level: 28, xp: 8750, streak: 24, badges: ['fire'] },
  { rank: 10, name: 'Sophia Sterling', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100', level: 25, xp: 7900, streak: 4, badges: ['code'] }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'post-1',
    title: 'How does React 19 Compiler handles manual useMemo calls?',
    authorName: 'Ahmad',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDI4YViomewaHJ5tdy9cJRcA-0QG4_GNqq_DPZVD11X5n0mexDAJnaIO25O-ztNa2TY0W2WOmqwSeGPIRNbpcrETdMeA1gfxXEERiwhNosCxJYgle4Y2xPrjP88MjAHMyC8W8KY01vx7Mt9MPChxymvZP7dW06ju29Fl30-EFb61eu5cs1JiJjxsNBImacT_a2NrBxr8fEd0r5X_tofnHkMwpUBFNYsiYOyZeufGVdxYLWsHXGLwRQPiCm5pWJPGXCsSnar52GSGE',
    content: 'Greeting devs! I have been building a complex layout list using React 19 Compiler. Should I still manually write useMemo hooks, or will the new compiler completely optimize these loops away? Would love to know the current performance implications of leaving existing hooks as they are.',
    category: 'React 19 & Compiler',
    likes: 24,
    repliesCount: 3,
    createdAt: '2 hours ago',
    replies: [
      {
        id: 'reply-1',
        authorName: 'Sarah Drasner',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqtLC7u-NkHjwxyLIes0lFyIPWCRT28YzpmgxCvt0junVcY4AvQ2bPsJnE-TATKO6b7n4yZcTahawB4OuPWqaesjl_u5EgCuAjok6WbZvlvibVu__DAqS8vNzlB1HiQx_ErkUgIKcVqWTccWck4IGg_g86DK3Wrfl3sXD93_MLRwTPxM_xIM_vlVoMF5lJshIjrPY4TkCd6GJyGspgG6aglcVdsDFBKzH1uGSutHBrx1CIx-fvlRcCcU9lVvws3Kwr8fKrJ2SfNUE',
        content: 'Historically, manually optimization was required. With React 19, the compiler automatically detects state mutations and dependencies, auto-memoizing both component returns and callback definitions. You do not need to delete older hooks – the compiler is fully backwards-compatible – but for new components, you can safely omit useMemo and useCallback!',
        createdAt: '1 hour ago'
      },
      {
        id: 'reply-2',
        authorName: 'Marcus Dev',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjdW_HfZJApvlkXHaQSLv5JOy5eUfr3gNJ3mkOmcM9oyV_qOlTG2dW5eYcPI-iHmlp0ZcFjOyov1Ya_1jNSOecQRDe0MkPmuHYrO7OLQUDyjpb87XmKwxVpi61J8R2ceKFE1ldplrfYUqbcJXA_EsMK7ObgtAKtSJsYRrkrYmpmwPOsT_erkByIY54gZjjJQ06SDhBUyr-F9jeeXPrYkp0scWzePqUvOVFFjPdrCP-rLMFkbjYwxIRvQfnIAyj2_uG8Sz_Jd9jR6k',
        content: 'Exactly what Sarah said! Plus, we noticed a minor size decrease in our custom hook declarations after letting the compiler perform the structural memoization under-the-hood.',
        createdAt: '45 mins ago'
      }
    ]
  },
  {
    id: 'post-2',
    title: 'Zustand slices or multiple stores for enterprise projects?',
    authorName: 'Felix Wander',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100',
    content: 'We are structuring an analytics app with multiple domains. Is it better to maintain a single massive store sliced into modular actions, or create distinct hook-based stores for each feature?',
    category: 'State Management',
    likes: 12,
    repliesCount: 1,
    createdAt: 'Yesterday',
    replies: [
      {
        id: 'reply-3',
        authorName: 'Elena R.',
        authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1QaUVq2P5gGLKMk6GIArqON3regwUoRYHFPe2qqbkqppniDDZLnSnCNd6hns4KRnyjShSU2wXVw-z31DWZRv-3P0RkBIsBdSrF14Se8QEHBc4VM6sqyATDa7clZUHTGZtb_sZ_bDnNuRNSVqE9_Q1-HOnuShihjjjEXt2eKEdxqhSrITTR9ju_ZXYxrLB9DwJHuuIv4OooCwVSXfxsr4GuVq6EjW0zXNtQZ3W8W_Txt7NTv85uRaB_xEBIxCFjSC2oTiutIQV4Uc',
        content: 'The single-store with combined slices pattern is usually preferred. It allows custom middleware (like persistence or DevTools loggers) to monitor the entire state, and makes it incredibly easy to cross-reference states between different features.',
        createdAt: '12 hours ago'
      }
    ]
  }
];
