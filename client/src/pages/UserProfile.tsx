import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  MapPin, 
  Link as LinkIcon,
  Calendar,
  Grid3X3,
  Bookmark,
  UserPlus,
  UserCheck,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  created_at: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  is_verified: boolean;
  role: string;
  is_following?: boolean;
}

interface Post {
  id: string;
  user_id: string;
  content: string;
  media_urls: string[];
  likes_count: number;
  comments_count: number;
  created_at: string;
  is_liked?: boolean;
  is_saved?: boolean;
  user: {
    username: string;
    full_name: string;
    avatar_url: string | null;
  };
}

interface Comment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  user: {
    username: string;
    full_name: string;
    avatar_url: string | null;
  };
}

export default function UserProfile() {
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [followersList, setFollowersList] = useState<UserProfile[]>([]);
  const [followingList, setFollowingList] = useState<UserProfile[]>([]);

  const isOwnProfile = user?.id === profile?.id;

  useEffect(() => {
    if (username) {
      loadProfile();
    }
  }, [username, user?.id]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const headers: HeadersInit = {};
      if (user?.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }

      // Загружаем профиль
      const profileRes = await fetch(`/api/users/${username}`, { headers });
      if (!profileRes.ok) {
        if (profileRes.status === 404) {
          toast({
            title: "Пользователь не найден",
            description: "Такого пользователя не существует",
            variant: "destructive",
          });
          setLocation("/");
          return;
        }
        throw new Error("Ошибка загрузки профиля");
      }
      const profileData = await profileRes.json();
      setProfile(profileData);
      setIsFollowing(profileData.is_following || false);

      // Загружаем посты
      const postsRes = await fetch(`/api/users/${username}/posts`, { headers });
      if (postsRes.ok) {
        const postsData = await postsRes.json();
        setPosts(postsData);
      }

      // Загружаем сохраненные посты (только для своего профиля)
      if (isOwnProfile) {
        const savedRes = await fetch(`/api/users/${username}/saved`, { headers });
        if (savedRes.ok) {
          const savedData = await savedRes.json();
          setSavedPosts(savedData);
        }
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить профиль",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async () => {
    if (!user) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите, чтобы подписаться",
      });
      setLocation("/login");
      return;
    }

    try {
      const method = isFollowing ? 'DELETE' : 'POST';
      const res = await fetch(`/api/users/${profile?.id}/follow`, {
        method,
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        setIsFollowing(!isFollowing);
        setProfile(prev => prev ? {
          ...prev,
          followers_count: isFollowing ? prev.followers_count - 1 : prev.followers_count + 1
        } : null);
        
        toast({
          title: isFollowing ? "Отписка оформлена" : "Подписка оформлена",
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось выполнить действие",
        variant: "destructive",
      });
    }
  };

  const handleLike = async (postId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!user) {
      toast({ title: "Войдите, чтобы поставить лайк" });
      return;
    }

    try {
      const post = posts.find(p => p.id === postId) || savedPosts.find(p => p.id === postId);
      const isLiked = post?.is_liked;

      const res = await fetch(`/api/posts/${postId}/like`, {
        method: isLiked ? 'DELETE' : 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const updatePost = (p: Post) => p.id === postId ? {
          ...p,
          is_liked: !isLiked,
          likes_count: isLiked ? p.likes_count - 1 : p.likes_count + 1
        } : p;
        
        setPosts(prev => prev.map(updatePost));
        setSavedPosts(prev => prev.map(updatePost));
        if (selectedPost?.id === postId) {
          setSelectedPost(updatePost(selectedPost));
        }
      }
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  const handleSave = async (postId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!user) {
      toast({ title: "Войдите, чтобы сохранить" });
      return;
    }

    try {
      const post = posts.find(p => p.id === postId);
      const isSaved = post?.is_saved;

      const res = await fetch(`/api/posts/${postId}/save`, {
        method: isSaved ? 'DELETE' : 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        setPosts(prev => prev.map(p => p.id === postId ? {
          ...p,
          is_saved: !isSaved
        } : p));
      }
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  const openPost = async (post: Post) => {
    setSelectedPost(post);
    try {
      const headers: HeadersInit = {};
      if (user?.token) {
        headers['Authorization'] = `Bearer ${user.token}`;
      }
      const res = await fetch(`/api/posts/${post.id}/comments`, { headers });
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (error) {
      console.error("Comments load error:", error);
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user || !selectedPost) return;

    try {
      const res = await fetch(`/api/posts/${selectedPost.id}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (res.ok) {
        const comment = await res.json();
        setComments(prev => [comment, ...prev]);
        setNewComment("");
        
        setPosts(prev => prev.map(p => p.id === selectedPost.id ? {
          ...p,
          comments_count: p.comments_count + 1
        } : p));
        setSelectedPost(prev => prev ? {
          ...prev,
          comments_count: prev.comments_count + 1
        } : null);
      }
    } catch (error) {
      console.error("Comment error:", error);
    }
  };

  const loadFollowers = async () => {
    try {
      const res = await fetch(`/api/users/${profile?.id}/followers`);
      if (res.ok) {
        const data = await res.json();
        setFollowersList(data);
      }
    } catch (error) {
      console.error("Followers load error:", error);
    }
  };

  const loadFollowing = async () => {
    try {
      const res = await fetch(`/api/users/${profile?.id}/following`);
      if (res.ok) {
        const data = await res.json();
        setFollowingList(data);
      }
    } catch (error) {
      console.error("Following load error:", error);
    }
  };

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: profile?.full_name || profile?.username,
        text: profile?.bio || '',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Ссылка скопирована" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setLocation("/")}
            className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent"
          >
            NexusVita
          </button>
          <div className="flex items-center gap-4">
            {!user && (
              <Button variant="ghost" onClick={() => setLocation("/login")}>
                Войти
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start">
              <Avatar className="w-24 h-24 md:w-36 md:h-36 ring-4 ring-cyan-100">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="text-2xl md:text-4xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                  {profile.full_name?.charAt(0) || profile.username.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <div className="flex-1">
              {/* Username & Actions */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">{profile.username}</h1>
                  {profile.is_verified && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  {profile.role === 'specialist' && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                      Специалист
                    </span>
                  )}
                  {profile.role === 'center_admin' && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded-full">
                      Центр
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isOwnProfile ? (
                    <Button 
                      variant="outline" 
                      onClick={() => setLocation("/settings")}
                      className="flex-1 md:flex-none"
                    >
                      Редактировать профиль
                    </Button>
                  ) : (
                    <Button
                      onClick={handleFollow}
                      variant={isFollowing ? "outline" : "default"}
                      className={isFollowing ? "" : "bg-gradient-to-r from-cyan-500 to-blue-500"}
                    >
                      {isFollowing ? (
                        <><UserCheck className="w-4 h-4 mr-2" /> Подписки</>
                      ) : (
                        <><UserPlus className="w-4 h-4 mr-2" /> Подписаться</>
                      )}
                    </Button>
                  )}
                  <Button variant="outline" size="icon" onClick={shareProfile}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center md:justify-start gap-6 md:gap-8 mb-4">
                <div className="text-center md:text-left">
                  <span className="font-semibold">{profile.posts_count}</span>
                  <span className="text-slate-500 ml-1">публикаций</span>
                </div>
                <Sheet open={followersOpen} onOpenChange={setFollowersOpen}>
                  <SheetTrigger asChild>
                    <button 
                      className="text-center md:text-left hover:opacity-70 transition-opacity"
                      onClick={loadFollowers}
                    >
                      <span className="font-semibold">{profile.followers_count}</span>
                      <span className="text-slate-500 ml-1">подписчиков</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Подписчики</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-4">
                      {followersList.map(follower => (
                        <div 
                          key={follower.id} 
                          className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg"
                          onClick={() => {
                            setFollowersOpen(false);
                            setLocation(`/u/${follower.username}`);
                          }}
                        >
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={follower.avatar_url || undefined} />
                            <AvatarFallback>{follower.full_name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{follower.username}</p>
                            <p className="text-xs text-slate-500">{follower.full_name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
                <Sheet open={followingOpen} onOpenChange={setFollowingOpen}>
                  <SheetTrigger asChild>
                    <button 
                      className="text-center md:text-left hover:opacity-70 transition-opacity"
                      onClick={loadFollowing}
                    >
                      <span className="font-semibold">{profile.following_count}</span>
                      <span className="text-slate-500 ml-1">подписок</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Подписки</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-4">
                      {followingList.map(following => (
                        <div 
                          key={following.id} 
                          className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg"
                          onClick={() => {
                            setFollowingOpen(false);
                            setLocation(`/u/${following.username}`);
                          }}
                        >
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={following.avatar_url || undefined} />
                            <AvatarFallback>{following.full_name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{following.username}</p>
                            <p className="text-xs text-slate-500">{following.full_name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Bio */}
              <div>
                <h2 className="font-semibold">{profile.full_name}</h2>
                {profile.bio && (
                  <p className="text-slate-600 mt-1 whitespace-pre-wrap">{profile.bio}</p>
                )}
                {profile.location && (
                  <div className="flex items-center gap-1 text-slate-500 mt-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </div>
                )}
                {profile.website && (
                  <a 
                    href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-cyan-600 mt-1 text-sm hover:underline"
                  >
                    <LinkIcon className="w-4 h-4" />
                    {profile.website}
                  </a>
                )}
                <div className="flex items-center gap-1 text-slate-400 mt-3 text-xs">
                  <Calendar className="w-3 h-3" />
                  Присоединился {new Date(profile.created_at).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full justify-center bg-white border-b border-slate-200 rounded-none h-12">
            <TabsTrigger value="posts" className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 rounded-none">
              <Grid3X3 className="w-4 h-4 mr-2" />
              Публикации
            </TabsTrigger>
            {isOwnProfile && (
              <TabsTrigger value="saved" className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-500 rounded-none">
                <Bookmark className="w-4 h-4 mr-2" />
                Сохраненное
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="posts" className="mt-6">
            {posts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <Grid3X3 className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">Публикаций пока нет</h3>
                <p className="text-slate-500 mt-1">
                  {isOwnProfile ? "Поделитесь своими мыслями и достижениями" : "Пользователь еще ничего не опубликовал"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1 md:gap-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => openPost(post)}
                  >
                    {post.media_urls && post.media_urls[0] ? (
                      <img
                        src={post.media_urls[0]}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center p-4">
                        <p className="text-xs text-slate-600 line-clamp-3">{post.content}</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                      <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5 fill-current" />
                        <span className="font-medium">{post.likes_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-medium">{post.comments_count}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {isOwnProfile && (
            <TabsContent value="saved" className="mt-6">
              {savedPosts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                    <Bookmark className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">Сохраненных публикаций нет</h3>
                  <p className="text-slate-500 mt-1">
                    Сохраняйте понравившиеся публикации, чтобы вернуться к ним позже
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                  {savedPosts.map((post) => (
                    <div
                      key={post.id}
                      className="aspect-square relative group cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => openPost(post)}
                    >
                      {post.media_urls && post.media_urls[0] ? (
                        <img
                          src={post.media_urls[0]}
                          alt=""
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center p-4">
                          <p className="text-xs text-slate-600 line-clamp-3">{post.content}</p>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white">
                        <div className="flex items-center gap-1">
                          <Heart className="w-5 h-5 fill-current" />
                          <span className="font-medium">{post.likes_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-5 h-5" />
                          <span className="font-medium">{post.comments_count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          )}
        </Tabs>
      </main>

      {/* Post Modal */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          {selectedPost && (
            <div className="flex flex-col md:flex-row h-[80vh]">
              {/* Media */}
              <div className="md:w-1/2 bg-black flex items-center justify-center">
                {selectedPost.media_urls && selectedPost.media_urls[0] ? (
                  <img
                    src={selectedPost.media_urls[0]}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-white p-8">{selectedPost.content}</div>
                )}
              </div>

              {/* Info & Comments */}
              <div className="md:w-1/2 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={selectedPost.user.avatar_url || undefined} />
                      <AvatarFallback>{selectedPost.user.full_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{selectedPost.user.username}</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                {/* Comments */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Post content */}
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={selectedPost.user.avatar_url || undefined} />
                      <AvatarFallback>{selectedPost.user.full_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="font-medium mr-2">{selectedPost.user.username}</span>
                      <span className="text-slate-700">{selectedPost.content}</span>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(selectedPost.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>

                  {/* Comments list */}
                  {comments.map(comment => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment.user.avatar_url || undefined} />
                        <AvatarFallback>{comment.user.full_name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="font-medium mr-2">{comment.user.username}</span>
                        <span className="text-slate-700">{comment.content}</span>
                        <p className="text-xs text-slate-400 mt-1">
                          {new Date(comment.created_at).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => handleLike(selectedPost.id)}
                        className={selectedPost.is_liked ? "text-red-500" : "text-slate-700 hover:text-red-500"}
                      >
                        <Heart className={`w-6 h-6 ${selectedPost.is_liked ? "fill-current" : ""}`} />
                      </button>
                      <button className="text-slate-700 hover:text-cyan-500">
                        <MessageCircle className="w-6 h-6" />
                      </button>
                      <button className="text-slate-700 hover:text-cyan-500">
                        <Share2 className="w-6 h-6" />
                      </button>
                    </div>
                    <button 
                      onClick={() => handleSave(selectedPost.id)}
                      className={selectedPost.is_saved ? "text-cyan-500" : "text-slate-700 hover:text-cyan-500"}
                    >
                      <Bookmark className={`w-6 h-6 ${selectedPost.is_saved ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <div className="mb-2">
                    <span className="font-medium">{selectedPost.likes_count.toLocaleString()}</span>
                    <span className="text-slate-500 ml-1">отметок "Нравится"</span>
                  </div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide mb-4">
                    {new Date(selectedPost.created_at).toLocaleDateString('ru-RU', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>

                  {/* Add comment */}
                  {user && (
                    <form onSubmit={submitComment} className="flex gap-3">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Добавьте комментарий..."
                        className="flex-1 bg-transparent outline-none text-sm"
                      />
                      <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="text-cyan-500 font-medium text-sm disabled:opacity-50"
                      >
                        Опубликовать
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
