import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar,
  TrendingUp,
  Settings,
  Plus,
  Search,
  MoreVertical,
  Mail,
  Phone,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  BarChart3,
  UserPlus,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Employee {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone: string;
  avatar_url: string | null;
  specialization: string[];
  status: 'active' | 'inactive' | 'on_leave';
  clients_count: number;
  rating: number;
  join_date: string;
}

interface Client {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  avatar_url: string | null;
  status: 'active' | 'inactive';
  last_visit: string;
  total_visits: number;
  total_spent: number;
  assigned_employee: string | null;
}

interface Appointment {
  id: string;
  client_name: string;
  employee_name: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
}

export default function CenterCRM() {
  const [, setLocation] = useLocation();
  const { user, token } = useAuth();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);

  // Form states
  const [newEmployee, setNewEmployee] = useState({
    email: '',
    full_name: '',
    specialization: '',
    phone: '',
  });

  const [newClient, setNewClient] = useState({
    full_name: '',
    email: '',
    phone: '',
    assigned_employee: '',
  });

  useEffect(() => {
    if (token) {
      loadCenterData();
    }
  }, [token]);

  const loadCenterData = async () => {
    try {
      setLoading(true);
      
      // Load employees
      const empRes = await fetch('/api/center/employees', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (empRes.ok) {
        const empData = await empRes.json();
        setEmployees(empData.employees || []);
      }

      // Load clients
      const cliRes = await fetch('/api/center/clients', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (cliRes.ok) {
        const cliData = await cliRes.json();
        setClients(cliData.clients || []);
      }

      // Load appointments
      const appRes = await fetch('/api/center/appointments', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (appRes.ok) {
        const appData = await appRes.json();
        setAppointments(appData.appointments || []);
      }
    } catch (error) {
      console.error('Load center data error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async () => {
    try {
      const res = await fetch('/api/center/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newEmployee),
      });

      if (!res.ok) throw new Error('Failed to add employee');

      toast({ title: "Сотрудник добавлен" });
      setShowAddEmployee(false);
      setNewEmployee({ email: '', full_name: '', specialization: '', phone: '' });
      loadCenterData();
    } catch (error) {
      toast({ 
        title: "Ошибка", 
        description: "Не удалось добавить сотрудника",
        variant: "destructive" 
      });
    }
  };

  const handleAddClient = async () => {
    try {
      const res = await fetch('/api/center/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newClient),
      });

      if (!res.ok) throw new Error('Failed to add client');

      toast({ title: "Клиент добавлен" });
      setShowAddClient(false);
      setNewClient({ full_name: '', email: '', phone: '', assigned_employee: '' });
      loadCenterData();
    } catch (error) {
      toast({ 
        title: "Ошибка", 
        description: "Не удалось добавить клиента",
        variant: "destructive" 
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Активен</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Неактивен</Badge>;
      case 'on_leave':
        return <Badge className="bg-yellow-100 text-yellow-800">Отпуск</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-100 text-blue-800">Подтверждено</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Ожидание</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Завершено</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Отменено</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Stats
  const stats = {
    totalEmployees: employees.length,
    activeEmployees: employees.filter(e => e.status === 'active').length,
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'active').length,
    todayAppointments: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
    weeklyRevenue: appointments
      .filter(a => a.status === 'completed')
      .reduce((sum, a) => sum + a.price, 0),
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Войдите для доступа к CRM</p>
          <Button onClick={() => setLocation("/login")}>Войти</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-lg">CRM Центра</h1>
                <p className="text-sm text-slate-500">Управление центром здоровья</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setLocation('/center/settings')}>
                <Settings className="w-4 h-4 mr-2" />
                Настройки
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="dashboard">Дашборд</TabsTrigger>
            <TabsTrigger value="employees">Сотрудники</TabsTrigger>
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
            <TabsTrigger value="schedule">Расписание</TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Сотрудники</p>
                      <p className="text-2xl font-bold">{stats.totalEmployees}</p>
                      <p className="text-xs text-green-600">{stats.activeEmployees} активных</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Клиенты</p>
                      <p className="text-2xl font-bold">{stats.totalClients}</p>
                      <p className="text-xs text-green-600">{stats.activeClients} активных</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Записи сегодня</p>
                      <p className="text-2xl font-bold">{stats.todayAppointments}</p>
                      <p className="text-xs text-slate-500">всего на сегодня</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Выручка (неделя)</p>
                      <p className="text-2xl font-bold">${stats.weeklyRevenue}</p>
                      <p className="text-xs text-green-600">+12% к прошлой неделе</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ближайшие записи</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {appointments.slice(0, 5).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium">{app.client_name}</p>
                          <p className="text-sm text-slate-500">{app.service} • {app.employee_name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{app.time}</p>
                          {getStatusBadge(app.status)}
                        </div>
                      </div>
                    ))}
                    {appointments.length === 0 && (
                      <p className="text-center text-slate-500 py-4">Нет предстоящих записей</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Активность сотрудников</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {employees.slice(0, 5).map((emp) => (
                      <div key={emp.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={emp.avatar_url || undefined} />
                          <AvatarFallback>{emp.full_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{emp.full_name}</p>
                          <p className="text-sm text-slate-500">{emp.clients_count} клиентов</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm">{emp.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Employees */}
          <TabsContent value="employees">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Сотрудники</CardTitle>
                <Dialog open={showAddEmployee} onOpenChange={setShowAddEmployee}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Новый сотрудник</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label>ФИО</Label>
                        <Input
                          value={newEmployee.full_name}
                          onChange={(e) => setNewEmployee({...newEmployee, full_name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={newEmployee.email}
                          onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Телефон</Label>
                        <Input
                          value={newEmployee.phone}
                          onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Специализация</Label>
                        <Input
                          value={newEmployee.specialization}
                          onChange={(e) => setNewEmployee({...newEmployee, specialization: e.target.value})}
                          placeholder="Например: Нутрициолог"
                        />
                      </div>
                      <Button onClick={handleAddEmployee} className="w-full">
                        Добавить сотрудника
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {employees.map((emp) => (
                    <div key={emp.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={emp.avatar_url || undefined} />
                          <AvatarFallback>{emp.full_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{emp.full_name}</p>
                          <p className="text-sm text-slate-500">{emp.specialization.join(', ')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(emp.status)}
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="w-4 h-4 text-slate-400" />
                          {emp.clients_count}
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients */}
          <TabsContent value="clients">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Клиенты</CardTitle>
                <Dialog open={showAddClient} onOpenChange={setShowAddClient}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить клиента
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Новый клиент</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label>ФИО</Label>
                        <Input
                          value={newClient.full_name}
                          onChange={(e) => setNewClient({...newClient, full_name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={newClient.email}
                          onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Телефон</Label>
                        <Input
                          value={newClient.phone}
                          onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Ответственный</Label>
                        <select
                          className="w-full h-10 px-3 rounded-md border border-input bg-background"
                          value={newClient.assigned_employee}
                          onChange={(e) => setNewClient({...newClient, assigned_employee: e.target.value})}
                        >
                          <option value="">Выберите...</option>
                          {employees.map((emp) => (
                            <option key={emp.id} value={emp.id}>{emp.full_name}</option>
                          ))}
                        </select>
                      </div>
                      <Button onClick={handleAddClient} className="w-full">
                        Добавить клиента
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {clients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={client.avatar_url || undefined} />
                          <AvatarFallback>{client.full_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{client.full_name}</p>
                          <div className="flex items-center gap-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" /> {client.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" /> {client.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {getStatusBadge(client.status)}
                        <div className="text-right text-sm">
                          <p className="font-medium">${client.total_spent}</p>
                          <p className="text-slate-500">всего</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Расписание</CardTitle>
                <Button onClick={() => setLocation('/center/schedule/new')}>
                  <Plus className="w-4 h-4 mr-2" />
                  Новая запись
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-6">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => (
                    <button
                      key={day}
                      className={`p-3 rounded-lg text-center transition-colors ${
                        i === 0 ? 'bg-cyan-500 text-white' : 'bg-slate-100 hover:bg-slate-200'
                      }`}
                    >
                      <p className="text-xs opacity-80">{day}</p>
                      <p className="font-bold">{15 + i}</p>
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                    <div key={time} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-16 text-sm font-medium">{time}</div>
                      <div className="flex-1">
                        {appointments.filter(a => a.time === time).map((app) => (
                          <div key={app.id} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                            <div>
                              <p className="font-medium">{app.client_name}</p>
                              <p className="text-xs text-slate-500">{app.service}</p>
                            </div>
                            {getStatusBadge(app.status)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
