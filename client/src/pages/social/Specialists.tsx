import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, MapPin, Calendar, MessageCircle, Heart, Users, Activity } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function Specialists() {
  const [searchMode, setSearchMode] = useState<'search' | 'dating'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [specialty, setSpecialty] = useState('all');

  const specialties = [
    { value: 'all', label: 'Все специализации' },
    { value: 'doctor', label: 'Врачи' },
    { value: 'trainer', label: 'Тренеры' },
    { value: 'nutritionist', label: 'Нутрициологи' },
    { value: 'psychologist', label: 'Психологи' },
    { value: 'coach', label: 'Коучи' },
  ];

  const specialists = [
    {
      id: '1',
      name: 'Доктор Анна Смирнова',
      specialty: 'Кардиолог',
      avatar: '',
      rating: 4.9,
      reviews: 127,
      location: 'Москва',
      price: '$150',
      experience: '15 лет',
      online: true,
      description: 'Специализация: профилактика сердечно-сосудистых заболеваний',
      tags: ['Кардиология', 'Профилактика', 'Онлайн'],
    },
    {
      id: '2',
      name: 'Иван Петров',
      specialty: 'Фитнес-тренер',
      avatar: '',
      rating: 4.8,
      reviews: 89,
      location: 'Санкт-Петербург',
      price: '$80',
      experience: '8 лет',
      online: true,
      description: 'Персональные тренировки, реабилитация после травм',
      tags: ['Силовые', 'Кардио', 'Реабилитация'],
    },
    {
      id: '3',
      name: 'Мария Козлова',
      specialty: 'Нутрициолог',
      avatar: '',
      rating: 4.9,
      reviews: 203,
      location: 'Онлайн',
      price: '$100',
      experience: '12 лет',
      online: true,
      description: 'Персональные планы питания, работа с пищевыми расстройствами',
      tags: ['Диетология', 'Питание', 'Здоровье'],
    },
  ];

  const datingMatches = [
    {
      id: '1',
      name: 'Алексей',
      age: 32,
      avatar: '',
      healthScore: 88,
      compatibility: 92,
      interests: ['Бег', 'Йога', 'Здоровое питание'],
      location: '5 км',
      bio: 'Активный образ жизни, ищу единомышленников',
    },
    {
      id: '2',
      name: 'Елена',
      age: 28,
      avatar: '',
      healthScore: 85,
      compatibility: 89,
      interests: ['Медитация', 'Вегетарианство', 'Спорт'],
      location: '8 км',
      bio: 'Увлекаюсь здоровым образом жизни и саморазвитием',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0 pt-20">
      <div className="container py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2 engraved-text">Специалисты</h1>
          <p className="text-foreground/60">
            Найдите своего идеального эксперта или единомышленника
          </p>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="engraved-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Label htmlFor="mode-toggle" className="font-semibold">Режим поиска:</Label>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${searchMode === 'search' ? 'font-bold' : 'text-foreground/60'}`}>
                    Поиск специалиста
                  </span>
                  <Switch
                    id="mode-toggle"
                    checked={searchMode === 'dating'}
                    onCheckedChange={(checked) => setSearchMode(checked ? 'dating' : 'search')}
                  />
                  <span className={`text-sm ${searchMode === 'dating' ? 'font-bold' : 'text-foreground/60'}`}>
                    Дейтинг по метрикам
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {searchMode === 'search' ? (
          <>
            {/* Search Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 space-y-4"
            >
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <Input
                    placeholder="Поиск специалиста..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 engraved-input"
                  />
                </div>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger className="w-64 engraved-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((spec) => (
                      <SelectItem key={spec.value} value={spec.value}>
                        {spec.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" className="engraved-button-outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Фильтры
                </Button>
              </div>
            </motion.div>

            {/* Specialists List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialists.map((specialist, idx) => (
                <motion.div
                  key={specialist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <Card className="engraved-card hover:scale-105 transition-transform cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={specialist.avatar} />
                          <AvatarFallback>{specialist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="engraved-text">{specialist.name}</CardTitle>
                          <CardDescription>{specialist.specialty}</CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{specialist.rating}</span>
                            <span className="text-sm text-foreground/60">({specialist.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70 mb-4">{specialist.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {specialist.tags.map((tag, tIdx) => (
                          <Badge key={tIdx} variant="secondary" className="engraved-badge">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-2 text-foreground/60">
                          <MapPin className="w-4 h-4" />
                          {specialist.location}
                        </div>
                        <div className="font-semibold text-primary">{specialist.price}/час</div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 engraved-button">
                          <Calendar className="w-4 h-4 mr-2" />
                          Записаться
                        </Button>
                        <Button variant="outline" className="engraved-button-outline">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Dating Mode */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <Card className="engraved-card p-4">
                <p className="text-sm text-foreground/70">
                  Находите единомышленников на основе ваших метрик здоровья, целей и интересов
                </p>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {datingMatches.map((match, idx) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                >
                  <Card className="engraved-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={match.avatar} />
                          <AvatarFallback>{match.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold engraved-text">{match.name}, {match.age}</h3>
                            <Badge className="engraved-badge bg-green-500">
                              Совместимость: {match.compatibility}%
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-foreground/60 mb-2">
                            <span className="flex items-center gap-1">
                              <Activity className="w-4 h-4" />
                              Здоровье: {match.healthScore}%
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {match.location}
                            </span>
                          </div>
                          <p className="text-sm text-foreground/70 mb-3">{match.bio}</p>
                          <div className="flex flex-wrap gap-2">
                            {match.interests.map((interest, iIdx) => (
                              <Badge key={iIdx} variant="secondary" className="engraved-badge">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 engraved-button">
                          <Heart className="w-4 h-4 mr-2" />
                          Нравится
                        </Button>
                        <Button variant="outline" className="flex-1 engraved-button-outline">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Написать
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
