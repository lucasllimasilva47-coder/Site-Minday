import React, { useState, useEffect } from 'react';
import { BookOpen, ListTodo, Plus, CalendarDays, Trash2, Calendar, Filter, SortAsc, Tag, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { ClassItem, type Task } from '../types';
import { cryptoRandomId, getBadgeColor, fmtDate, getCategoryColor } from '../utils/helpers';

export default function AgendaScreen() {
  // Recuperar dados do localStorage ao iniciar
  const [classes, setClasses] = useState<ClassItem[]>(() => {
    try {
      const saved = localStorage.getItem("minday.classes");
      return saved ? JSON.parse(saved) : [
        { id: cryptoRandomId(), name: "Matemática", time: "08:00", weekdays: ["Segunda", "Quarta"] },
        { id: cryptoRandomId(), name: "História", time: "10:00", weekdays: ["Terça", "Quinta"] },
      ];
    } catch {
      return [
        { id: cryptoRandomId(), name: "Matemática", time: "08:00", weekdays: ["Segunda", "Quarta"] },
        { id: cryptoRandomId(), name: "História", time: "10:00", weekdays: ["Terça", "Quinta"] },
      ];
    }
  });
  
  const [tasks, setTasks] = useState<(Task & { category?: string })[]>(() => {
    try {
      const saved = localStorage.getItem("minday.tasks");
      return saved ? JSON.parse(saved) : [
        { id: cryptoRandomId(), title: "Estudar capítulo 3", status: "Pendente", date: new Date().toISOString(), category: "Estudo" },
        { id: cryptoRandomId(), title: "Exercício de Química", status: "Em andamento", date: new Date().toISOString(), category: "Tarefa" },
      ];
    } catch {
      return [
        { id: cryptoRandomId(), title: "Estudar capítulo 3", status: "Pendente", date: new Date().toISOString(), category: "Estudo" },
        { id: cryptoRandomId(), title: "Exercício de Química", status: "Em andamento", date: new Date().toISOString(), category: "Tarefa" },
      ];
    }
  });
  
  // Salvar dados no localStorage quando mudam
  useEffect(() => {
    try { localStorage.setItem("minday.classes", JSON.stringify(classes)); } catch {}
  }, [classes]);
  
  useEffect(() => {
    try { localStorage.setItem("minday.tasks", JSON.stringify(tasks)); } catch {}
  }, [tasks]);
  
  const [classNameInput, setClassNameInput] = useState("");
  const [classTimeInput, setClassTimeInput] = useState("");
  const [classWeekdaysInput, setClassWeekdaysInput] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState("");
  const [taskDateInput, setTaskDateInput] = useState("");
  const [taskCategoryInput, setTaskCategoryInput] = useState("Tarefa");
  
  // Filtros e ordenação
  const [filterStatus, setFilterStatus] = useState<Task["status"] | "Todas">("Todas");
  const [filterCategory, setFilterCategory] = useState<string | "Todas">("Todas");
  const [sortBy, setSortBy] = useState<"date" | "title" | "status">("date");
  const [searchQuery, setSearchQuery] = useState("");

  const cycleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        
        let newStatus: Task["status"];
        switch (t.status) {
          case "Pendente":
            newStatus = "Em andamento";
            break;
          case "Em andamento":
            newStatus = "Concluída";
            break;
          case "Concluída":
            newStatus = "Pendente";
            break;
          default:
            newStatus = "Pendente";
        }
        
        return { ...t, status: newStatus };
      })
    );
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput) return;
    setTasks((t) => [...t, { 
      id: cryptoRandomId(), 
      title: taskInput, 
      status: "Pendente",
      date: taskDateInput || new Date().toISOString(),
      category: taskCategoryInput
    }]);
    setTaskInput("");
    setTaskDateInput("");
  };
  
  const removeTask = (id: string) => {
    setTasks((t) => t.filter(task => task.id !== id));
  };
  
  const addClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classNameInput || !classTimeInput || classWeekdaysInput.length === 0) return;
    setClasses((c) => [...c, { 
      id: cryptoRandomId(), 
      name: classNameInput, 
      time: classTimeInput,
      weekdays: classWeekdaysInput
    }]);
    setClassNameInput("");
    setClassTimeInput("");
    setClassWeekdaysInput([]);
  };
  
  const removeClass = (id: string) => {
    setClasses((c) => c.filter(cls => cls.id !== id));
  };
  
  const toggleWeekday = (day: string) => {
    setClassWeekdaysInput(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day) 
        : [...prev, day]
    );
  };
  
  const weekdays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
  const categories = ["Tarefa", "Estudo", "Prova", "Trabalho", "Pessoal", "Outro"];
  
  // Filtragem e ordenação de tarefas
  const filteredAndSortedTasks = tasks
    .filter(task => {
      // Filtrar por status
      if (filterStatus !== "Todas" && task.status !== filterStatus) return false;
      
      // Filtrar por categoria
      if (filterCategory !== "Todas" && task.category !== filterCategory) return false;
      
      // Filtrar por pesquisa
      if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      return true;
    })
    .sort((a, b) => {
      // Ordenar por data, título ou status
      if (sortBy === "date") {
        return new Date(b.date || "").getTime() - new Date(a.date || "").getTime();
      } else if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "status") {
        const statusOrder = { "Pendente": 0, "Em andamento": 1, "Concluída": 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      return 0;
    });

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <Card className="bg-white/5 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <BookOpen className="h-5 w-5"/> Aulas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={addClass} className="space-y-4">
            <div className="flex gap-2">
              <Input 
                value={classNameInput} 
                onChange={(e) => setClassNameInput(e.target.value)} 
                placeholder="Nome da aula" 
                className="bg-white/10 text-white placeholder:text-white/50"
              />
              <Input 
                value={classTimeInput} 
                onChange={(e) => setClassTimeInput(e.target.value)} 
                placeholder="08:00" 
                className="w-28 bg-white/10 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <p className="mb-2 text-sm text-white/70">Dias da semana:</p>
              <div className="flex flex-wrap gap-2">
                {weekdays.map(day => (
                  <Button 
                    key={day} 
                    type="button"
                    onClick={() => toggleWeekday(day)}
                    className={`px-2 py-1 text-xs ${classWeekdaysInput.includes(day) 
                      ? 'bg-emerald-500 hover:bg-emerald-600' 
                      : 'bg-white/10 hover:bg-white/20'}`}
                  >
                    {day.substring(0, 3)}
                  </Button>
                ))}
              </div>
            </div>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <Plus className="mr-1 h-4 w-4"/>Adicionar
            </Button>
          </form>
          <ul className="space-y-3">
            {classes.map((c) => (
              <li key={c.id} className="flex flex-col rounded-xl bg-black/20 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CalendarDays className="h-4 w-4 opacity-80"/> 
                    <span className="font-semibold">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/70">{c.time}</span>
                    <Button 
                      onClick={() => removeClass(c.id)} 
                      className="h-8 w-8 rounded-full bg-red-500/20 p-0 hover:bg-red-500/40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {c.weekdays.map(day => (
                    <span key={day} className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs">
                      {day.substring(0, 3)}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-white/5 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <ListTodo className="h-5 w-5"/> Trabalhos / Atividades
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={addTask} className="space-y-4">
            <div className="flex gap-2">
              <Input 
                value={taskInput} 
                onChange={(e) => setTaskInput(e.target.value)} 
                placeholder="Nova tarefa" 
                className="bg-white/10 text-white placeholder:text-white/50"
              />
              <Input 
                type="date"
                value={taskDateInput} 
                onChange={(e) => setTaskDateInput(e.target.value ? new Date(e.target.value).toISOString() : "")} 
                className="w-40 bg-white/10 text-white placeholder:text-white/50"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={taskCategoryInput}
                onChange={(e) => setTaskCategoryInput(e.target.value)}
                className="rounded-md bg-white/10 px-3 py-2 text-white placeholder:text-white/50"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Button className="bg-sky-500 hover:bg-sky-600">
                <Plus className="mr-1 h-4 w-4"/>Adicionar
              </Button>
            </div>
          </form>
          
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                <Search className="h-4 w-4 text-white/70" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar tarefas..."
                  className="w-40 bg-white/10 text-white placeholder:text-white/50"
                />
              </div>
              
              <div className="flex items-center gap-1">
                <Filter className="h-4 w-4 text-white/70" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="rounded-md bg-white/10 px-2 py-1 text-sm text-white"
                >
                  <option value="Todas">Todos status</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Concluída">Concluída</option>
                </select>
              </div>
              
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4 text-white/70" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="rounded-md bg-white/10 px-2 py-1 text-sm text-white"
                >
                  <option value="Todas">Todas categorias</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-1">
                <SortAsc className="h-4 w-4 text-white/70" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-md bg-white/10 px-2 py-1 text-sm text-white"
                >
                  <option value="date">Data</option>
                  <option value="title">Título</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>
          </div>
          <ul className="space-y-3">
            {filteredAndSortedTasks.map((task) => (
              <li key={task.id} className="flex flex-col rounded-xl bg-black/20 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={`${getBadgeColor(task.status)} mr-2`}>{task.status}</Badge>
                    <span className="font-semibold">{task.title}</span>
                    {task.category && (
                      <Badge className={`${getCategoryColor(task.category)} ml-2`}>{task.category}</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      className="bg-white/10 text-white hover:bg-white/20" 
                      onClick={() => cycleStatus(task.id)}
                    >
                      Próximo status
                    </Button>
                    <Button 
                      onClick={() => removeTask(task.id)} 
                      className="h-8 w-8 rounded-full bg-red-500/20 p-0 hover:bg-red-500/40"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {task.date && (
                  <div className="mt-2 flex items-center gap-1 text-sm text-white/70">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(task.date).toLocaleDateString()}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}