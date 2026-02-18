import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { motion } from "framer-motion";
import { 
  Star, 
  MapPin, 
  Clock,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Share2,
  ChevronLeft,
  Award,
  BookOpen,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Specialist {
  id: string;
  user_id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  bio: string;
  specialization: string[];
  hourly_rate: number;
  rating: number;
  review_count: number;
  location: string;
  experience_years: number;
  is_verified: boolean;
  education: string[];
  certifications: string[];
  languages: string[];
  availability: {
    day: string;
    slots: string[];
  }[];
}

interface Review {
  id: string;
  user: {
    full_name: string;
    avatar_url: string | null;
  };
  rating: number;
  comment: string;
  created_at: string;
}

export default function SpecialistProfile() {
  const [, setLocation] = useLocation();
  const { username } = useParams<{ username: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    if (username) {
      loadSpecialist();
    }
  }, [username]);

  const loadSpecialist = async () => {
    try {
      setLoading(true);
      
      const res = await fetch(`/api/specialists/${username}`);
      if (res.ok) {
        const data = await res.json();
        setSpecialist(data.specialist);
        setReviews(data.reviews || []);
      }
    } catch (error) {
      console.error('Load specialist error:', error);
    } finally {
      setLoading(false);
    }
  };

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: specialist?.full_name,
        text: specialist?.bio,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Ссылка скопирована" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!specialist) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Специалист не найден</p>
          <Button onClick={() => setLocation('/specialists')}>К каталогу</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={() => setLocation('/specialists')}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <button 
                onClick={shareProfile}
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage src={specialist.avatar_url || undefined} />
              <AvatarFallback className="text-3xl bg-white/20 text-white">
                {specialist.full_name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <div className="text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <h1 className="text-2xl font-bold">{specialist.full_name}</h1>
                {specialist.is_verified && (
                  <CheckCircle2 className="w-6 h-6 text-white" />
                )}
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                {specialist.specialization.map((spec) => (
                  <Badge key={spec} className="bg-white/20 text-white border-0">
                    {spec}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  <span className="font-medium">{specialist.rating.toFixed(1)}</span>
                  <span>({specialist.review_count} отзывов)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{specialist.experience_years} лет опыта</span>
                </div>
              </div>
            </div>

            {/* Price Card */}
            <Card className="bg-white text-slate-900 min-w-[200px]">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold">${specialist.hourly_rate}</p>
                <p className="text-slate-500 text-sm">за час консультации</p>
                <Button 
                  className="w-full mt-3"
                  onClick={() => setLocation(`/specialist/${specialist.username}/book`)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Записаться
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="about">Обо мне</TabsTrigger>
            <TabsTrigger value="schedule">Расписание</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы ({reviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            {/* Bio */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-500" />
                  О специалисте
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 whitespace-pre-wrap">{specialist.bio}</p>
              </CardContent>
            </Card>

            {/* Education */}
            {specialist.education && specialist.education.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-cyan-500" />
                    Образование
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {specialist.education.map((edu, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-slate-600">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Certifications */}
            {specialist.certifications && specialist.certifications.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-cyan-500" />
                    Сертификаты
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {specialist.certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-slate-600">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Languages & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Локация</p>
                      <p className="font-medium">{specialist.location || 'Онлайн'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-500">Языки</p>
                      <p className="font-medium">{specialist.languages?.join(', ') || 'Русский'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Доступное время</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {specialist.availability?.map((day) => (
                    <div key={day.day} className="border rounded-lg p-4">
                      <p className="font-medium mb-2">{day.day}</p>
                      <div className="flex flex-wrap gap-2">
                        {day.slots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setLocation(`/specialist/${specialist.username}/book?day=${day.day}&time=${slot}`)}
                            className="px-3 py-1.5 bg-cyan-50 text-cyan-700 rounded-lg text-sm hover:bg-cyan-100 transition-colors"
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full mt-6"
                  onClick={() => setLocation(`/specialist/${specialist.username}/book`)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Выбрать дату и время
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-slate-500">Пока нет отзывов</p>
                  </CardContent>
                </Card>
              ) : (
                reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.user.avatar_url || undefined} />
                          <AvatarFallback>
                            {review.user.full_name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{review.user.full_name}</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              <span>{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-sm text-slate-500">
                            {new Date(review.created_at).toLocaleDateString('ru-RU')}
                          </p>
                          <p className="text-slate-600 mt-2">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
