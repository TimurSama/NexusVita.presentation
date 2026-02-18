import { useState, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  ImagePlus, 
  X, 
  Loader2, 
  Smile,
  MapPin,
  BarChart3,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import EmojiPicker from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SelectedFile {
  file: File;
  preview: string;
}

export default function CreatePost() {
  const [, setLocation] = useLocation();
  const { user, token } = useAuth();
  const { toast } = useToast();
  
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modules = [
    { id: 'movement', name: 'Движение', icon: Activity, color: 'bg-blue-500' },
    { id: 'nutrition', name: 'Питание', icon: Activity, color: 'bg-green-500' },
    { id: 'sleep', name: 'Сон', icon: Activity, color: 'bg-purple-500' },
    { id: 'psychology', name: 'Психология', icon: Activity, color: 'bg-pink-500' },
    { id: 'medicine', name: 'Медицина', icon: Activity, color: 'bg-red-500' },
    { id: 'relationships', name: 'Отношения', icon: Activity, color: 'bg-orange-500' },
    { id: 'habits', name: 'Привычки', icon: Activity, color: 'bg-cyan-500' },
  ];

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: SelectedFile[] = [];
    Array.from(files).forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Файл слишком большой",
          description: "Максимальный размер файла 10MB",
          variant: "destructive",
        });
        return;
      }
      
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast({
          title: "Неподдерживаемый формат",
          description: "Можно загружать только изображения и видео",
          variant: "destructive",
        });
        return;
      }

      const preview = URL.createObjectURL(file);
      newFiles.push({ file, preview });
    });

    setSelectedFiles((prev) => [...prev, ...newFiles].slice(0, 10));
  }, [toast]);

  const removeFile = useCallback((index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  }, []);

  const onEmojiClick = useCallback((emojiData: any) => {
    setContent((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  }, []);

  const uploadFiles = async (): Promise<string[]> => {
    if (selectedFiles.length === 0) return [];

    const urls: string[] = [];
    
    for (const { file } of selectedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const data = await res.json();
      urls.push(data.url);
    }

    return urls;
  };

  const handleSubmit = async () => {
    if (!content.trim() && selectedFiles.length === 0) {
      toast({
        title: "Пустой пост",
        description: "Добавьте текст или медиа",
        variant: "destructive",
      });
      return;
    }

    if (!token) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите, чтобы опубликовать",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }

    try {
      setIsUploading(true);

      // Upload files first
      const mediaUrls = await uploadFiles();

      // Create post
      const res = await fetch('/api/social/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: content.trim(),
          media_urls: mediaUrls,
          module: selectedModule,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create post');
      }

      toast({
        title: "Опубликовано!",
        description: "Ваш пост успешно опубликован",
      });

      // Clean up
      selectedFiles.forEach(({ preview }) => URL.revokeObjectURL(preview));
      
      // Navigate to profile
      setLocation(`/u/${user?.username}`);
    } catch (error) {
      console.error('Create post error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось опубликовать пост",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDiscard = () => {
    selectedFiles.forEach(({ preview }) => URL.revokeObjectURL(preview));
    setLocation(-1 as any);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Войдите, чтобы создать пост</p>
          <Button onClick={() => setLocation("/login")}>Войти</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button 
            onClick={handleDiscard}
            className="text-slate-600 hover:text-slate-900"
          >
            Отмена
          </button>
          <h1 className="font-semibold">Новая публикация</h1>
          <Button 
            onClick={handleSubmit}
            disabled={isUploading || (!content.trim() && selectedFiles.length === 0)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500"
          >
            {isUploading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Публикация...</>
            ) : (
              'Опубликовать'
            )}
          </Button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* User info */}
          <div className="p-4 flex items-center gap-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold">
              {user.full_name?.charAt(0) || user.username?.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-sm">{user.full_name || user.username}</p>
              <p className="text-xs text-slate-500">@{user.username}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Что нового? Расскажите о своих достижениях..."
              className="min-h-[150px] border-0 resize-none focus-visible:ring-0 text-lg placeholder:text-slate-400"
            />

            {/* Module selector */}
            <div className="mt-4">
              <p className="text-xs text-slate-500 mb-2">Привязать к модулю (опционально)</p>
              <div className="flex flex-wrap gap-2">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      selectedModule === module.id
                        ? `${module.color} text-white`
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <module.icon className="w-3 h-3" />
                    {module.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected files preview */}
          {selectedFiles.length > 0 && (
            <div className="px-4 pb-4">
              <div className={`grid gap-2 ${
                selectedFiles.length === 1 ? 'grid-cols-1' :
                selectedFiles.length === 2 ? 'grid-cols-2' :
                'grid-cols-3'
              }`}>
                {selectedFiles.map(({ preview }, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                    <img
                      src={preview}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Toolbar */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*,video/*"
                multiple
                className="hidden"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={selectedFiles.length >= 10}
                className="text-cyan-500 hover:text-cyan-600 hover:bg-cyan-50"
              >
                <ImagePlus className="w-5 h-5" />
              </Button>

              <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-amber-500 hover:text-amber-600 hover:bg-amber-50"
                  >
                    <Smile className="w-5 h-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="icon"
                className="text-green-500 hover:text-green-600 hover:bg-green-50"
              >
                <BarChart3 className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <MapPin className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-xs text-slate-400">
              {content.length}/2000
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
