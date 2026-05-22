/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Search, 
  Plus, 
  ArrowLeft, 
  Send,
  Sparkles,
  Award,
  AlertCircle,
  Hash,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { ForumPost } from '../types';

interface CommunityViewProps {
  initialPosts: ForumPost[];
  currentUserAvatar: string;
}

export default function CommunityView({ initialPosts, currentUserAvatar }: CommunityViewProps) {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  
  // Filtering & search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Create new post form state
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('React 19 & Compiler');

  // Reply state
  const [replyText, setReplyText] = useState('');

  const categories = ['All', 'React 19 & Compiler', 'State Management', 'General Q&A', 'Tutorials'];

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      authorName: 'Ahmad',
      authorAvatar: currentUserAvatar,
      content: newContent,
      category: newCategory,
      likes: 1,
      repliesCount: 0,
      createdAt: 'Just now',
      likedByCurrentUser: true,
      replies: []
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowCreateForm(false);
  };

  const handleLikePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // don't open thread details
    
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        const isLiked = post.likedByCurrentUser;
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
          likedByCurrentUser: !isLiked
        };
      }
      return post;
    }));

    // If currently examining the details, keep details state in sync
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost((prev) => {
        if (!prev) return null;
        const isLiked = prev.likedByCurrentUser;
        return {
          ...prev,
          likes: isLiked ? prev.likes - 1 : prev.likes + 1,
          likedByCurrentUser: !isLiked
        };
      });
    }
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedPost) return;

    const newReply = {
      id: `reply-${Date.now()}`,
      authorName: 'Ahmad',
      authorAvatar: currentUserAvatar,
      content: replyText,
      createdAt: 'Just now'
    };

    const updatedPosts = posts.map((post) => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          repliesCount: post.repliesCount + 1,
          replies: [...post.replies, newReply]
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    // Keep selected expanded state updated
    setSelectedPost({
      ...selectedPost,
      repliesCount: selectedPost.repliesCount + 1,
      replies: [...selectedPost.replies, newReply]
    });
    setReplyText('');
  };

  const handleDeletePost = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete your post?')) {
      setPosts(posts.filter(p => p.id !== postId));
      if (selectedPost?.id === postId) {
        setSelectedPost(null);
      }
    }
  };

  // Filter core posts list
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-24">
      
      {/* 1. THREAD DETAIL VIEW MODAL SECTION */}
      {selectedPost ? (
        <div className="space-y-6">
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1f1e2a] hover:bg-[#252541]/90 text-[#c7c4d8]/85 rounded-lg border border-[#2A2A3E] text-xs font-semibold cursor-pointer transition-all active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Threads</span>
          </button>

          {/* Original Question Card */}
          <article className="bg-[#1A1A2E] border border-[#2A2A3E] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold uppercase rounded">
                {selectedPost.category}
              </span>
              <span className="text-xs text-[#c7c4d8]/30 font-light">{selectedPost.createdAt}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-[#e3e0f1] leading-snug">
                {selectedPost.title}
              </h1>
            </div>

            {/* Author card details */}
            <div className="flex items-center gap-3 py-3 border-y border-[#2A2A3E]/40">
              <img src={selectedPost.authorAvatar} alt="author" className="w-9 h-9 rounded-full object-cover border border-[#2A2A3E]" />
              <div>
                <p className="text-sm font-bold text-[#e3e0f1] flex items-center gap-2">
                  {selectedPost.authorName}
                  {selectedPost.authorName === 'Sarah Drasner' && (
                    <span className="bg-[#E4F222]/10 text-[#E4F222] border border-[#E4F222]/20 text-[8px] font-bold uppercase px-1.5 py-0.5 rounded">
                      INSTRUCTOR
                    </span>
                  )}
                </p>
                <p className="text-[10px] text-[#c7c4d8]/30">Member developer</p>
              </div>
            </div>

            <p className="text-sm text-[#c7c4d8]/80 leading-relaxed font-light">
              {selectedPost.content}
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-4 text-xs font-semibold pt-4">
              <button 
                onClick={(e) => handleLikePost(selectedPost.id, e)}
                className={`flex items-center gap-1.5 px-3 py-1.5 bg-[#12121d] rounded-lg border border-[#2A2A3E] cursor-pointer transition-all active:scale-95 ${
                  selectedPost.likedByCurrentUser ? 'text-rose-400 border-rose-500/20 bg-rose-500/5' : 'text-[#c7c4d8]/60 hover:text-[#e3e0f1]'
                }`}
              >
                <Heart className={`h-4 w-4 ${selectedPost.likedByCurrentUser ? 'fill-rose-400' : ''}`} />
                <span>{selectedPost.likes} Likes</span>
              </button>

              <span className="text-[#c7c4d8]/45">
                {selectedPost.repliesCount} Responses
              </span>
            </div>
          </article>

          {/* Comment Thread replies list */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#e3e0f1] uppercase tracking-wider">Responses ({selectedPost.replies.length})</h3>
            
            <div className="space-y-4">
              {selectedPost.replies.map((reply) => (
                <div key={reply.id} className="bg-[#1A1A2E]/60 border border-[#2A2A3E]/30 p-5 rounded-2xl space-y-4 relative">
                  
                  {/* Replier header details */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={reply.authorAvatar} alt="replier" className="w-8 h-8 rounded-full border border-[#2A2A3E] object-cover shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-[#e3e0f1] flex items-center gap-1.5">
                          {reply.authorName}
                          {reply.authorName === 'Sarah Drasner' && (
                            <span className="bg-[#E4F222]/10 text-[#E4F222] border border-[#E4F222]/20 text-[8px] font-bold uppercase px-1.5 rounded">
                              INSTRUCTOR
                            </span>
                          )}
                        </p>
                        <p className="text-[9px] text-[#c7c4d8]/30">Academic support</p>
                      </div>
                    </div>

                    <span className="text-[10px] text-[#c7c4d8]/30 font-light">{reply.createdAt}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#c7c4d8]/85 leading-relaxed font-light">
                    {reply.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Form to submit a new reply */}
          <form onSubmit={handleAddReply} className="bg-[#1A1A2E] border border-[#2A2A3E] p-5 rounded-2xl space-y-4 shadow-xl">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-[#c7c4d8]/50">
              <span>Write Your Answer Reply</span>
              <span>Logged as Ahmad</span>
            </div>
            
            <textarea 
              required
              rows={3}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Provide a constructive, supportive breakdown for your peer..."
              className="w-full bg-[#12121d] border border-[#2A2A3E] rounded-xl p-3 text-sm text-[#e3e0f1] outline-none focus:border-[#c4c0ff]/40 resize-none leading-relaxed font-light"
            />

            <div className="flex justify-end">
              <button 
                type="submit"
                className="bg-[#c4c0ff] text-[#2000a4] font-bold px-5 py-2 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-md shadow-indigo-500/5 hover:brightness-105"
              >
                <Send className="h-3.5 w-3.5 fill-[#2000a4]" />
                <span>Publish Response</span>
              </button>
            </div>
          </form>

        </div>
      ) : (
        
        /* 2. GENERAL FEED THREADS LIST */
        <div className="space-y-6">
          
          {/* Top category, create & search controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {/* Left Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#c4c0ff] text-[#2000a4] font-bold shadow-md shadow-indigo-500/5' 
                        : 'border border-[#2a2a3e] text-[#c7c4d8]/70 hover:border-[#c4c0ff]/40 hover:text-[#e3e0f1]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Right block: create CTA & search */}
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <div className="relative flex items-center bg-[#1f1e2a] px-3 py-1.5 rounded-lg border border-[#2A2A3E] focus-within:border-[#c4c0ff]/40 w-full md:w-48 transition-all shrink-0">
                <Search className="h-3.5 w-3.5 text-[#c7c4d8]/40 mr-2" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search forum..." 
                  className="bg-transparent border-none text-xs text-[#e3e0f1] w-full outline-none focus:ring-0 placeholder-[#c7c4d8]/30 font-light"
                />
              </div>

              <button 
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-[#c4c0ff] text-[#2000a4] font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 hover:brightness-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <Plus className="h-4 w-4 stroke-[3px]" />
                <span>New Thread</span>
              </button>
            </div>
          </div>

          {/* Accordion form to create a new thread */}
          {showCreateForm && (
            <form onSubmit={handleCreatePost} className="bg-[#1A1A2E] border border-[#2A2A3E] p-6 rounded-2xl space-y-4 shadow-xl animate-fadeIn">
              <h3 className="text-base font-bold text-[#e3e0f1]">Create New Forum Discussion</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-[#c7c4d8]/40 uppercase">Discussion Title</label>
                    <input 
                      type="text" 
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Can someone explain Concurrent transitions loop limits?"
                      className="w-full bg-[#12121d] border border-[#2A2A3E] rounded-lg p-2.5 text-xs text-[#e3e0f1] outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-[#c7c4d8]/40 uppercase">Topic Category</label>
                    <select 
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-[#12121d] border border-[#2A2A3E] rounded-lg p-2.5 text-xs text-[#e3e0f1] outline-none"
                    >
                      <option value="React 19 & Compiler">React 19 & Compiler</option>
                      <option value="State Management">State Management</option>
                      <option value="General Q&A">General Q&A</option>
                      <option value="Tutorials">Tutorials</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#c7c4d8]/40 uppercase">Core Content Question Details</label>
                  <textarea 
                    required
                    rows={4}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Provide full description. Share your react component blocks, error traces, or logic requirements..."
                    className="w-full bg-[#12121d] border border-[#2A2A3E] rounded-lg p-3 text-xs text-[#e3e0f1] outline-none resize-none font-light leading-relaxed"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 bg-[#12121d] border border-[#2A2A3E] text-[#c7c4d8]/70 hover:text-[#e3e0f1] font-semibold text-xs rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-[#c4c0ff] text-[#2000a4] font-bold text-xs rounded-lg cursor-pointer hover:brightness-105 transition-all"
                >
                  Publish Thread
                </button>
              </div>
            </form>
          )}

          {/* Listing Rows Cards */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <article 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-[#1A1A2E] border border-[#2A2A3E]/75 rounded-2xl p-6 hover:border-[#c4c0ff]/40 cursor-pointer group transition-all duration-300 shadow-lg flex flex-col sm:flex-row justify-between items-start gap-4"
              >
                {/* Text Content */}
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[9px] font-bold uppercase rounded">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-[#c7c4d8]/40">{post.createdAt}</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base sm:text-lg font-bold text-[#e3e0f1] group-hover:text-[#c4c0ff] transition-colors leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#c7c4d8]/60 line-clamp-2 leading-relaxed font-light">
                      {post.content}
                    </p>
                  </div>

                  {/* Author profile tag */}
                  <div className="flex items-center gap-2 pt-2">
                    <img src={post.authorAvatar} alt="avatar" className="w-6 h-6 rounded-full object-cover border border-[#2A2A3E]" />
                    <span className="text-[11px] font-bold text-[#c7c4d8]/70">{post.authorName}</span>
                    <span className="text-[#c7c4d8]/10">•</span>
                    <span className="text-[10px] text-[#c7c4d8]/40">Active Developer</span>
                  </div>
                </div>

                {/* Micro Counters Panel */}
                <div className="flex sm:flex-col gap-3 shrink-0 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 sm:border-l border-[#2A2A3E]/40 sm:pl-6 text-xs font-semibold justify-between sm:justify-center items-center">
                  
                  {/* Like icon click */}
                  <button 
                    onClick={(e) => handleLikePost(post.id, e)}
                    className={`flex items-center gap-1 px-3 py-1.5 bg-[#12121d] rounded-lg border border-[#2A2A3E] cursor-pointer transition-all active:scale-95 text-xs ${
                      post.likedByCurrentUser ? 'text-rose-400 border-rose-500/20 bg-rose-500/5' : 'text-[#c7c4d8]/60 hover:text-[#e3e0f1]'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${post.likedByCurrentUser ? 'fill-rose-400' : ''}`} />
                    <span>{post.likes}</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-[#c7c4d8]/55 border border-transparent px-3 py-1.5">
                    <MessageSquare className="h-4 w-4 shrink-0 text-[#c7c4d8]/40" />
                    <span>{post.repliesCount} replies</span>
                  </div>

                  {/* Trash delete for ahmad's post */}
                  {post.authorName === 'Ahmad' && (
                    <button 
                      onClick={(e) => handleDeletePost(post.id, e)}
                      className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors border border-rose-500/10 cursor-pointer"
                      title="Delete thread"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

              </article>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
