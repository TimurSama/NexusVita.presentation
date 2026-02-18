import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface Story {
  id: string;
  user_id: string;
  media_url: string;
  type: 'image' | 'video';
  created_at: string;
  expires_at: string;
  viewed: boolean;
  user: {
    username: string;
    full_name: string;
    avatar_url: string | null;
  };
}

interface StoriesProps {
  userId?: string;
}

export function Stories({ userId }: StoriesProps = {}) {
  const [, setLocation] = useLocation();
  const { user, token } = useAuth();
  const { toast } = useToast();
  
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const fetchStories = useCallback(async () => {
    try {
      const headers: HeadersInit = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const url = userId 
        ? `/api/social/stories?user_id=${userId}`
        : '/api/social/stories/feed';

      const res = await fetch(url, { headers });
      if (res.ok) {
        const data = await res.json();
        setStories(data.stories || []);
      }
    } catch (error) {
      console.error('Fetch stories error:', error);
    } finally {
      setLoading(false);
    }
  }, [token, userId]);

  useEffect(() => {
    fetchStories();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchStories, 30000);
    return () => clearInterval(interval);
  }, [fetchStories]);

  // Group stories by user
  const storiesByUser = stories.reduce((acc, story) => {
    const userId = story.user_id;
    if (!acc[userId]) {
      acc[userId] = {
        user: story.user,
        stories: [],
        hasUnviewed: false,
      };
    }
    acc[userId].stories.push(story);
    if (!story.viewed) {
      acc[userId].hasUnviewed = true;
    }
    return acc;
  }, {} as Record<string, { user: Story['user']; stories: Story[]; hasUnviewed: boolean }>);

  const userStories = Object.values(storiesByUser);

  // Story viewer timer
  useEffect(() => {
    if (!activeStory) return;

    const duration = activeStory.type === 'video' ? 15000 : 5000;
    const interval = 50;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextStory();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeStory, activeIndex]);

  const openStory = (userStory: typeof userStories[0], index: number = 0) => {
    setActiveStory(userStory.stories[index]);
    setActiveIndex(index);
    setProgress(0);
    markAsViewed(userStory.stories[index].id);
  };

  const nextStory = () => {
    if (!activeStory) return;

    const userStory = userStories.find(us => us.user.username === activeStory.user.username);
    if (!userStory) return;

    if (activeIndex < userStory.stories.length - 1) {
      openStory(userStory, activeIndex + 1);
    } else {
      // Move to next user's stories
      const currentUserIndex = userStories.findIndex(us => us.user.username === activeStory.user.username);
      if (currentUserIndex < userStories.length - 1) {
        openStory(userStories[currentUserIndex + 1], 0);
      } else {
        closeStory();
      }
    }
  };

  const prevStory = () => {
    if (!activeStory) return;

    const userStory = userStories.find(us => us.user.username === activeStory.user.username);
    if (!userStory) return;

    if (activeIndex > 0) {
      openStory(userStory, activeIndex - 1);
    } else {
      // Move to previous user's stories
      const currentUserIndex = userStories.findIndex(us => us.user.username === activeStory.user.username);
      if (currentUserIndex > 0) {
        const prevUser = userStories[currentUserIndex - 1];
        openStory(prevUser, prevUser.stories.length - 1);
      }
    }
  };

  const closeStory = () => {
    setActiveStory(null);
    setActiveIndex(0);
    setProgress(0);
  };

  const markAsViewed = async (storyId: string) => {
    if (!token) return;

    try {
      await fetch(`/api/social/stories/${storyId}/view`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Mark viewed error:', error);
    }
  };

  const createStory = () => {
    if (!user) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите, чтобы создать историю",
      });
      setLocation("/login");
      return;
    }
    setLocation("/create-story");
  };

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto py-4 px-4 scrollbar-hide">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-slate-200 animate-pulse" />
            <div className="w-12 h-3 bg-slate-200 rounded mt-2 mx-auto animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Stories Bar */}
      <div className="flex gap-4 overflow-x-auto py-4 px-4 scrollbar-hide border-b border-slate-100">
        {/* Add Story Button */}
        <button 
          onClick={createStory}
          className="flex-shrink-0 flex flex-col items-center gap-1"
        >
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-cyan-400 flex items-center justify-center bg-cyan-50 hover:bg-cyan-100 transition-colors">
            <Plus className="w-6 h-6 text-cyan-500" />
          </div>
          <span className="text-xs text-slate-600 truncate max-w-[64px]">
            {user ? 'Ваша история' : 'Добавить'}
          </span>
        </button>

        {/* User Stories */}
        {userStories.map((userStory) => (
          <button
            key={userStory.user.username}
            onClick={() => openStory(userStory, 0)}
            className="flex-shrink-0 flex flex-col items-center gap-1"
          >
            <div className={`w-16 h-16 rounded-full p-[2px] ${
              userStory.hasUnviewed 
                ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' 
                : 'bg-slate-200'
            }`}>
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                {userStory.user.avatar_url ? (
                  <img
                    src={userStory.user.avatar_url}
                    alt={userStory.user.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
                    {userStory.user.full_name?.charAt(0) || userStory.user.username.charAt(0)}
                  </div>
                )}
              </div>
            </div>
            <span className={`text-xs truncate max-w-[64px] ${
              userStory.hasUnviewed ? 'text-slate-900 font-medium' : 'text-slate-500'
            }`}>
              {userStory.user.username}
            </span>
          </button>
        ))}
      </div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            onClick={closeStory}
          >
            {/* Progress Bars */}
            <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
              {userStories
                .find(us => us.user.username === activeStory.user.username)
                ?.stories.map((_, idx) => (
                  <div key={idx} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-100"
                      style={{
                        width: idx === activeIndex ? `${progress}%` : idx < activeIndex ? '100%' : '0%',
                      }}
                    />
                  </div>
                ))}
            </div>

            {/* Header */}
            <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xs font-semibold">
                  {activeStory.user.avatar_url ? (
                    <img
                      src={activeStory.user.avatar_url}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    activeStory.user.full_name?.charAt(0) || activeStory.user.username.charAt(0)
                  )}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{activeStory.user.username}</p>
                  <p className="text-white/60 text-xs">
                    {new Date(activeStory.created_at).toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              <button 
                onClick={closeStory}
                className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Story Content */}
            <div 
              className="relative w-full h-full max-w-lg mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Click areas for navigation */}
              <div className="absolute inset-0 flex">
                <div className="w-1/2 h-full" onClick={prevStory} />
                <div className="w-1/2 h-full" onClick={nextStory} />
              </div>

              {/* Media */}
              {activeStory.type === 'video' ? (
                <video
                  src={activeStory.media_url}
                  className="w-full h-full object-contain"
                  autoPlay
                  muted
                  playsInline
                  onEnded={nextStory}
                />
              ) : (
                <img
                  src={activeStory.media_url}
                  alt=""
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevStory(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextStory(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
