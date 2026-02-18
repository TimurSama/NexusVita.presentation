import { useState, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  X, 
  Loader2, 
  Send,
  ImagePlus,
  Type,
  Smile
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";

export default function CreateStory() {
  const [, setLocation] = useLocation();
  const { user, token } = useAuth();
  const { toast } = useToast();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [text, setText] = useState("");
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [textColor, setTextColor] = useState("#ffffff");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }, [toast]);

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast({
        title: "Нет файла",
        description: "Выберите изображение или видео",
        variant: "destructive",
      });
      return;
    }

    if (!token) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите, чтобы создать историю",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }

    try {
      setIsUploading(true);

      // Upload file
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadRes.ok) {
        throw new Error('Upload failed');
      }

      const { url } = await uploadRes.json();

      // Create story
      const res = await fetch('/api/social/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          media_url: url,
          type: selectedFile.type.startsWith('video/') ? 'video' : 'image',
          text: text || undefined,
          text_position: text ? textPosition : undefined,
          text_color: text ? textColor : undefined,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create story');
      }

      toast({
        title: "Готово!",
        description: "Ваша история опубликована на 24 часа",
      });

      // Clean up
      if (preview) URL.revokeObjectURL(preview);
      
      // Navigate back
      setLocation(-1 as any);
    } catch (error) {
      console.error('Create story error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось опубликовать историю",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDiscard = () => {
    if (preview) URL.revokeObjectURL(preview);
    setLocation(-1 as any);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">Войдите, чтобы создать историю</p>
          <Button onClick={() => setLocation("/login")}>Войти</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 flex items-center justify-between">
        <button 
          onClick={handleDiscard}
          className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white rounded-full bg-black/20 backdrop-blur-sm"
        >
          <X className="w-6 h-6" />
        </button>
        <h1 className="text-white font-medium">Новая история</h1>
        <Button 
          onClick={handleSubmit}
          disabled={isUploading || !selectedFile}
          className="bg-white text-black hover:bg-white/90 rounded-full px-4"
        >
          {isUploading ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /></>
          ) : (
            <><Send className="w-4 h-4 mr-2" /> Поделиться</>
          )}
        </Button>
      </header>

      <main className="h-screen flex flex-col">
        {!preview ? (
          // File selector
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*,video/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-6 hover:scale-105 transition-transform"
            >
              <ImagePlus className="w-12 h-12 text-white" />
            </button>
            <p className="text-white text-lg mb-2">Выберите фото или видео</p>
            <p className="text-white/50 text-sm">Максимум 10MB</p>
          </div>
        ) : (
          // Preview with editing
          <div className="flex-1 relative">
            {/* Media preview */}
            {selectedFile?.type.startsWith('video/') ? (
              <video
                src={preview}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <img
                src={preview}
                alt=""
                className="w-full h-full object-cover"
              />
            )}

            {/* Text overlay */}
            {text && (
              <div
                className="absolute text-center font-semibold text-2xl pointer-events-none"
                style={{
                  left: `${textPosition.x}%`,
                  top: `${textPosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                  color: textColor,
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                }}
              >
                {text}
              </div>
            )}

            {/* Bottom toolbar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex items-center gap-2">
                <Input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Добавить текст..."
                  className="flex-1 bg-white/20 border-0 text-white placeholder:text-white/50"
                  maxLength={100}
                />
                <button
                  onClick={() => setTextColor('#ffffff')}
                  className={`w-8 h-8 rounded-full bg-white border-2 ${textColor === '#ffffff' ? 'border-cyan-400' : 'border-transparent'}`}
                />
                <button
                  onClick={() => setTextColor('#000000')}
                  className={`w-8 h-8 rounded-full bg-black border-2 ${textColor === '#000000' ? 'border-cyan-400' : 'border-transparent'}`}
                />
                <button
                  onClick={() => setTextColor('#ef4444')}
                  className={`w-8 h-8 rounded-full bg-red-500 border-2 ${textColor === '#ef4444' ? 'border-cyan-400' : 'border-transparent'}`}
                />
                <button
                  onClick={() => setTextColor('#22c55e')}
                  className={`w-8 h-8 rounded-full bg-green-500 border-2 ${textColor === '#22c55e' ? 'border-cyan-400' : 'border-transparent'}`}
                />
              </div>

              {/* Position slider */}
              {text && (
                <div className="mt-4">
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={textPosition.y}
                    onChange={(e) => setTextPosition(prev => ({ ...prev, y: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
