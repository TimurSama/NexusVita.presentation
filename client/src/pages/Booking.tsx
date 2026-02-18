import { useState, useEffect } from "react";
import { useLocation, useParams, useSearch } from "wouter";
import { motion } from "framer-motion";
import { 
  ChevronLeft,
  Calendar,
  Clock,
  Video,
  MapPin,
  CreditCard,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface Specialist {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  hourly_rate: number;
  specialization: string[];
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function Booking() {
  const [, setLocation] = useLocation();
  const { username } = useParams<{ username: string }>();
  const search = useSearch();
  const { user, token } = useAuth();
  const { toast } = useToast();
  
  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<'online' | 'offline'>('online');
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Parse query params
  useEffect(() => {
    const params = new URLSearchParams(search);
    const day = params.get('day');
    const time = params.get('time');
    if (time) setSelectedTime(time);
  }, [search]);

  useEffect(() => {
    if (username) {
      loadSpecialist();
    }
  }, [username]);

  const loadSpecialist = async () => {
    try {
      const res = await fetch(`/api/specialists/${username}`);
      if (res.ok) {
        const data = await res.json();
        setSpecialist(data.specialist);
      }
    } catch (error) {
      console.error('Load specialist error:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const generateTimeSlots = (): TimeSlot[] => {
    const slots = [];
    for (let hour = 9; hour <= 20; hour++) {
      slots.push({ time: `${hour}:00`, available: Math.random() > 0.3 });
      slots.push({ time: `${hour}:30`, available: Math.random() > 0.3 });
    }
    return slots;
  };

  const handleSubmit = async () => {
    if (!token) {
      toast({
        title: "Требуется авторизация",
        description: "Войдите, чтобы записаться",
        variant: "destructive",
      });
      setLocation("/login");
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Выберите дату и время",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          specialist_id: specialist?.id,
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime,
          session_type: sessionType,
          notes,
        }),
      });

      if (!res.ok) {
        throw new Error('Booking failed');
      }

      setStep(3);
      toast({
        title: "Запись подтверждена!",
        description: "Ожидайте подтверждения от специалиста",
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось создать запись",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (!specialist) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p>Специалист не найден</p>
      </div>
    );
  }

  const dates = generateDates();
  const timeSlots = generateTimeSlots();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => step > 1 ? setStep((s) => (s - 1) as 1 | 2 | 3) : setLocation(`/specialist/${username}`)}
              className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-semibold">Запись на консультацию</h1>
              <p className="text-sm text-slate-500">{specialist.full_name}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  s <= step ? 'bg-cyan-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-500" />
                  Выберите дату
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {dates.map((date) => (
                    <button
                      key={date.toISOString()}
                      onClick={() => setSelectedDate(date)}
                      className={`flex-shrink-0 w-16 py-3 rounded-xl text-center transition-colors ${
                        selectedDate.toDateString() === date.toDateString()
                          ? 'bg-cyan-500 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <p className="text-xs uppercase">{date.toLocaleDateString('ru-RU', { weekday: 'short' })}</p>
                      <p className="text-xl font-bold">{date.getDate()}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-5 h-5 text-cyan-500" />
                  Выберите время
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                        selectedTime === slot.time
                          ? 'bg-cyan-500 text-white'
                          : slot.available
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          : 'bg-slate-50 text-slate-300 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full"
              disabled={!selectedTime}
              onClick={() => setStep(2)}
            >
              Продолжить
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Session Type */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Тип консультации</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  onClick={() => setSessionType('online')}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                    sessionType === 'online'
                      ? 'border-cyan-500 bg-cyan-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      sessionType === 'online' ? 'bg-cyan-500 text-white' : 'bg-slate-100'
                    }`}>
                      <Video className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Онлайн</p>
                      <p className="text-sm text-slate-500">Видеозвонок</p>
                    </div>
                    {sessionType === 'online' && <CheckCircle2 className="w-5 h-5 text-cyan-500" />}
                  </div>
                </button>

                <button
                  onClick={() => setSessionType('offline')}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-colors ${
                    sessionType === 'offline'
                      ? 'border-cyan-500 bg-cyan-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      sessionType === 'offline' ? 'bg-cyan-500 text-white' : 'bg-slate-100'
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Офлайн</p>
                      <p className="text-sm text-slate-500">Личная встреча</p>
                    </div>
                    {sessionType === 'offline' && <CheckCircle2 className="w-5 h-5 text-cyan-500" />}
                  </div>
                </button>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Дополнительная информация</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Расскажите о ваших целях или вопросах..."
                  className="w-full h-32 p-3 rounded-lg border border-slate-200 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </CardContent>
            </Card>

            <Button 
              className="w-full"
              onClick={() => setStep(3)}
            >
              Перейти к оплате
            </Button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Детали записи</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  {specialist.avatar_url ? (
                    <img src={specialist.avatar_url} alt="" className="w-12 h-12 rounded-full" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      {specialist.full_name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{specialist.full_name}</p>
                    <p className="text-sm text-slate-500">{specialist.specialization.join(', ')}</p>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Дата</span>
                    <span className="font-medium">
                      {selectedDate.toLocaleDateString('ru-RU', { 
                        day: 'numeric', 
                        month: 'long',
                        weekday: 'short'
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Время</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Формат</span>
                    <span className="font-medium">{sessionType === 'online' ? 'Онлайн' : 'Офлайн'}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Итого</span>
                    <span className="text-2xl font-bold">${specialist.hourly_rate}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">
                    Оплата напрямую специалисту (комиссия 5%)
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-cyan-500" />
                  Способ оплаты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setLocation(`/wallet`)}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white mr-3">
                    U
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Unity Token</p>
                    <p className="text-xs text-slate-500">Скидка 15%</p>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast({ title: "В разработке" })}
                >
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white mr-3">
                    ₿
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Криптовалюта</p>
                    <p className="text-xs text-slate-500">BTC, ETH, USDT</p>
                  </div>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => toast({ title: "В разработке" })}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white mr-3">
                    💳
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Банковская карта</p>
                    <p className="text-xs text-slate-500">Visa, Mastercard</p>
                  </div>
                </Button>
              </CardContent>
            </Card>

            <Button 
              className="w-full"
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Обработка...</>
              ) : (
                'Подтвердить запись'
              )}
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
