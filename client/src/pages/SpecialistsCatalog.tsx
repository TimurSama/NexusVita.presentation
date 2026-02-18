import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock,
  CheckCircle2,
  ChevronRight,
  Heart,
  Calendar,
  ArrowUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  is_online: boolean;
}

const categories = [
  { id: 'all', name: 'Все' },
  { id: 'nutritionist', name: 'Нутрициологи' },
  { id: 'trainer', name: 'Тренеры' },
  { id: 'psychologist', name: 'Психологи' },
  { id: 'coach', name: 'Коучи' },
  { id: 'therapist', name: 'Терапевты' },
  { id: 'yoga', name: 'Йога' },
];

const sortOptions = [
  { id: 'rating', name: 'По рейтингу' },
  { id: 'price_low', name: 'Цена: по возрастанию' },
  { id: 'price_high', name: 'Цена: по убыванию' },
  { id: 'experience', name: 'По опыту' },
];

export default function SpecialistsCatalog() {
  const [, setLocation] = useLocation();
  const { user, token } = useAuth();
  const { toast } = useToast();
  
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("rating");
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadSpecialists();
  }, [selectedCategory, selectedSort, searchQuery]);

  const loadSpecialists = async () => {
    try {
      setLoading(true);
      
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);
      params.append('sort', selectedSort);

      const res = await fetch(`/api/specialists?${params}`);
      if (res.ok) {
        const data = await res.json();
        setSpecialists(data.specialists || []);
      }
    } catch (error) {
      console.error('Load specialists error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (specialistId: string) => {
    if (!token) {
      toast({
        title: "Войдите, чтобы добавить в избранное",
      });
      return;
    }

    const isFavorite = favorites.includes(specialistId);
    
    try {
      const res = await fetch(`/api/specialists/${specialistId}/favorite`, {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (res.ok) {
        setFavorites((prev) => 
          isFavorite 
            ? prev.filter((id) => id !== specialistId)
            : [...prev, specialistId]
        );
      }
    } catch (error) {
      console.error('Favorite error:', error);
    }
  };

  const filteredSpecialists = specialists.filter((s) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        s.full_name.toLowerCase().includes(query) ||
        s.bio.toLowerCase().includes(query) ||
        s.specialization.some((spec) => spec.toLowerCase().includes(query))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Специалисты</h1>
            <Button 
              variant="outline" 
              onClick={() => setLocation('/specialist-offer')}
            >
              Стать специалистом
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по имени, специализации..."
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort and Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-500">
            Найдено: {filteredSpecialists.length}
          </p>
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Specialists Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-slate-200" />
                    <div className="flex-1">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-slate-200 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-3 bg-slate-200 rounded w-full mb-2" />
                  <div className="h-3 bg-slate-200 rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredSpecialists.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">Специалисты не найдены</h3>
            <p className="text-slate-500 mt-1">Попробуйте изменить фильтры поиска</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSpecialists.map((specialist, index) => (
              <motion.div
                key={specialist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                  onClick={() => setLocation(`/specialist/${specialist.username}`)}
                >
                  <CardContent className="p-0">
                    {/* Cover & Avatar */}
                    <div className="relative h-24 bg-gradient-to-r from-cyan-500 to-blue-500">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(specialist.id);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(specialist.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                      </button>
                    </div>
                    <div className="px-4 pb-4">
                      <div className="relative -mt-10 mb-3 flex items-end justify-between">
                        <Avatar className="w-20 h-20 border-4 border-white">
                          <AvatarImage src={specialist.avatar_url || undefined} />
                          <AvatarFallback className="text-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                            {specialist.full_name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {specialist.is_online && (
                          <span className="mb-2 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            Онлайн
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{specialist.full_name}</h3>
                          {specialist.is_verified && (
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {specialist.specialization.slice(0, 3).map((spec) => (
                            <Badge key={spec} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-sm text-slate-500 line-clamp-2">
                          {specialist.bio}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 pt-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{specialist.rating.toFixed(1)}</span>
                            <span className="text-slate-400 text-sm">({specialist.review_count})</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{specialist.experience_years} лет опыта</span>
                          </div>
                        </div>

                        {/* Price & Location */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div>
                            <span className="text-xl font-bold">${specialist.hourly_rate}</span>
                            <span className="text-slate-400 text-sm">/час</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-500 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{specialist.location || 'Онлайн'}</span>
                          </div>
                        </div>

                        {/* CTA */}
                        <Button 
                          className="w-full mt-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation(`/specialist/${specialist.username}/book`);
                          }}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Записаться
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
