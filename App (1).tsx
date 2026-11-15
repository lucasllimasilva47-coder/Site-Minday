import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "./hooks/useLanguage";
import { LanguageSelector } from "./components/LanguageSelector";

// =============================
// Componentes Recriados (Substituindo bibliotecas externas)
// =============================

// Ícones Lucide (convertidos para SVG)
const Home = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const CalendarDays = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>;
const AlarmClock = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="13" r="8"/><path d="M5 3L2 6"/><path d="M22 6L19 3"/><path d="M6.38 18.78L4.35 20.81"/><path d="M17.64 18.78L19.67 20.81"/><path d="M12 9v4l2 2"/></svg>;
const Moon = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>;
const UserRound = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>;
const BookOpen = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const CheckCircle2 = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
const Clock3 = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>;
const PencilLine = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M18.4 8.6a2.12 2.12 0 0 1 3 3L16 19l-4 1 1-4Z"/><path d="M2 13v3a2 2 0 0 0 2 2h3l9.5-9.5-4-4L4 10.5V13"/></svg>;
const Play = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>;
const Pause = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/></svg>;
const RefreshCw = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9c-7.6 0-1.5 6.4-3 9"/><path d="M3 12a9 9 0 0 0 9 9c7.7 0 1.5-6.4 3-9"/><path d="M17 2v4h4"/><path d="M7 22v-4H3"/></svg>;
const Settings = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.25.43a2 2 0 0 0 0 2.73l.08.15a2 2 0 0 1-1.72 1l-.18.43a2 2 0 0 0 0 2l.18.43a2 2 0 0 1 1.73 1l.25.43a2 2 0 0 0 .73 2.73l.15.08a2 2 0 0 1 2 0l.43-.25a2 2 0 0 1 1-1.73v-.18a2 2 0 0 0 2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const Plus = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>;
const ListTodo = (props: any) => <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="6" height="6" rx="1"/><path d="m13 12 2 2 4-4"/><path d="M13 6h8"/><path d="M13 18h8"/><rect x="3" y="17" width="6" height="6" rx="1"/></svg>;

// Separador estável para o timer (evita glitches de renderização de fonte)
const Colon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 16 24" aria-hidden="true">
    <circle cx="8" cy="7" r="2.5" fill="currentColor" />
    <circle cx="8" cy="17" r="2.5" fill="currentColor" />
  </svg>
);

// Botão Simples com classes do Tailwind
const Button = ({ children, className = "", ...props }: any) => (
  <button className={`flex items-center justify-center rounded-xl px-4 py-2 font-semibold text-white transition-colors duration-200 ease-in-out ${className}`} {...props}>
    {children}
  </button>
);

// Input de texto estilizado
const Input = ({ className = "", ...props }: any) => (
  <input className={`w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sky-500 ${className}`} {...props} />
);

// Componentes Card
const Card = ({ children, className = "", ...props }: any) => (
  <div className={`rounded-3xl p-6 shadow-xl ring-1 ring-white/10 ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "", ...props }: any) => (
  <div className={`mb-4 flex items-center justify-between ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", ...props }: any) => (
  <h2 className={`text-2xl font-bold ${className}`} {...props}>
    {children}
  </h2>
);

const CardContent = ({ children, className = "", ...props }: any) => (
  <div className={`space-y-4 ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, className = "", ...props }: any) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase text-white ${className}`} {...props}>
    {children}
  </span>
);


// =============================
// Lógica e Telas Principais
// =============================
const brand = {
  name: "MinDay",
  green: "#22c55e",
  blue: "#3b82f6",
  red: "#ef4444",
  yellow: "#f59e0b",
  bg: "#0b1b2d",
};

type Task = { id: string; title: string; status: "Pendente" | "Em andamento" | "Concluída"; date?: string; category?: string };
type ClassItem = { id: string; name: string; time: string; weekdays?: string[] };
type SleepRecord = { id: string; start: string; end?: string; duration?: string; quality?: "Inadequado" | "Adequado" | "Excessivo" };

function Mascot({ size = 88 }: { size?: number }) {
  // Mascote simples em SVG (estilo cartoon)
  return (
    <svg width={size} height={size} viewBox="0 0 128 128" className="drop-shadow-md">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ffd166"/>
          <stop offset="100%" stopColor="#ffb703"/>
        </linearGradient>
      </defs>
      <circle cx="64" cy="64" r="56" fill="url(#g1)"/>
      <path d="M34 40c10-12 44-12 60 0-18 2-46 2-60 0z" fill="#8b4513" opacity=".9"/>
      <circle cx="46" cy="66" r="7" fill="#1f2937"/>
      <circle cx="82" cy="66" r="7" fill="#1f2937"/>
      <path d="M48 86c10 10 22 10 32 0" stroke="#1f2937" strokeWidth="6" fill="none" strokeLinecap="round"/>
      <circle cx="34" cy="76" r="6" fill="#ffa69e"/>
      <circle cx="94" cy="76" r="6" fill="#ffa69e"/>
    </svg>
  );
}

export default function App() {
  const { t } = useLanguage();
  
  const tabs = [
    { key: "home", label: t("home"), icon: Home },
    { key: "agenda", label: t("agenda"), icon: CalendarDays },
    { key: "pomodoro", label: t("pomodoro"), icon: AlarmClock },
    { key: "sono", label: t("sono"), icon: Moon },
    { key: "perfil", label: t("perfil"), icon: UserRound },
  ] as const;

  type TabKey = typeof tabs[number]["key"];

  const [tab, setTab] = useState<TabKey>(() => {
    try {
      const saved = localStorage.getItem("minday.tab");
      if (saved) return saved as TabKey;
    } catch {}
    return "home";
  });
  
  useEffect(() => {
    try { localStorage.setItem("minday.tab", tab); } catch {}
  }, [tab]);

  return (
    <div className="min-h-screen w-full text-white" style={{ background: brand.bg }}>
      <Header onNavigate={setTab} current={tab} tabs={tabs} />
      <main className="mx-auto max-w-5xl px-4 pb-28 pt-6 sm:pt-10">
        {tab === "home" && <HomeScreen onNavigate={setTab} />}
        {tab === "agenda" && <AgendaScreen />}
        {tab === "pomodoro" && <PomodoroScreen />}
        {tab === "sono" && <SleepScreen />}
        {tab === "perfil" && <ProfileScreen />}
      </main>
      <BottomNav current={tab} onNavigate={setTab} tabs={tabs} />
    </div>
  );
}

function Header({ current, onNavigate, tabs }: { current: any; onNavigate: (k: any) => void; tabs: readonly any[] }) {
  const { t } = useLanguage();
  
  return (
    <header className="sticky top-0 z-20 w-full border-b border-white/10 backdrop-blur-sm" style={{ background: "rgba(11,27,45,0.7)" }}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Mascot size={40} />
          <div>
            <div className="text-xl font-extrabold tracking-wide">{brand.name}</div>
            <div className="text-xs text-white/70">{t("tagline")}</div>
          </div>
        </div>
        <nav className="hidden gap-2 sm:flex">
          {tabs.map((t) => (
            <Button
              key={t.key}
              className={`${current === t.key ? "bg-emerald-500" : "bg-white/10 hover:bg-white/20"} border-0 text-white`}
              onClick={() => onNavigate(t.key)}
            >
              <t.icon className="mr-2 h-4 w-4" /> {t.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function BottomNav({ current, onNavigate, tabs }: { current: any; onNavigate: (k: any) => void; tabs: readonly any[] }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-5 px-2 py-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onNavigate(t.key)}
            className={`flex flex-col items-center gap-1 rounded-xl py-2 transition-colors duration-200 ${
              current === t.key ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            <t.icon className={`h-5 w-5 ${current === t.key ? "" : "opacity-70"}`} />
            <span className="text-[11px] font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (k: any) => void }) {
  const { t } = useLanguage();
  
  const quick = [
    { label: t("agenda"), icon: CalendarDays, color: brand.green, key: "agenda" },
    { label: t("pomodoro"), icon: Clock3, color: brand.blue, key: "pomodoro" },
    { label: t("sono"), icon: Moon, color: brand.blue, key: "sono" },
  ];
  
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <Mascot size={96} />
        <div>
          <h1 className="text-3xl font-black">{t("welcome")} {brand.name}</h1>
          <p className="text-white/70">{t("subtitle")}</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {quick.map((q) => (
          <button
            key={q.label}
            onClick={() => onNavigate(q.key)}
            className="rounded-2xl p-5 text-left shadow-lg ring-1 ring-white/10 transition-transform duration-200 hover:scale-102 active:scale-98"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div className="mb-4 inline-flex rounded-2xl p-3" style={{ background: q.color }}>
              <q.icon className="h-6 w-6" />
            </div>
            <div className="text-xl font-bold">{q.label}</div>
            <p className="text-sm text-white/70">{t("clickToOpen")}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

function AgendaScreen() {
  const { t } = useLanguage();
  
  const [classes, setClasses] = useState<ClassItem[]>(() => {
    try {
      const raw = localStorage.getItem("minday.classes");
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      { id: cryptoRandomId(), name: "Matemática", time: "08:00", weekdays: ["Seg", "Qua", "Sex"] },
      { id: cryptoRandomId(), name: "História", time: "10:00", weekdays: ["Ter", "Qui"] },
    ];
  });
  
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem("minday.tasks");
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      { id: cryptoRandomId(), title: "Estudar capítulo 3", status: "Pendente", date: "2023-10-15", category: "Estudo" },
      { id: cryptoRandomId(), title: "Exercício de Química", status: "Em andamento", date: "2023-10-16", category: "Tarefa" },
    ];
  });
  
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
  const [taskCategoryInput, setTaskCategoryInput] = useState("Estudo");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "status" | "category">("date");
  const [searchQuery, setSearchQuery] = useState("");

  const weekdays = [
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sexta",
    "Sáb",
    "Dom"
  ];
  const categories = ["Estudo", "Tarefa", "Projeto", "Pessoal"];

  const toggleWeekday = (day: string) => {
    setClassWeekdaysInput((prev) => {
      if (prev.includes(day)) {
        return prev.filter((d) => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const cycleStatus = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        let next: Task["status"];
        switch (task.status) {
          case "Pendente":
            next = "Em andamento";
            break;
          case "Em andamento":
            next = "Concluída";
            break;
          case "Concluída":
          default:
            next = "Pendente";
        }
        return { ...task, status: next };
      })
    );
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const removeClass = (id: string) => {
    setClasses((prev) => prev.filter((cls) => cls.id !== id));
  };

  const addTask = (e: any) => {
    e.preventDefault();
    if (!taskInput) return;
    setTasks((t) => [
      ...t, 
      { 
        id: cryptoRandomId(), 
        title: taskInput, 
        status: "Pendente",
        date: taskDateInput || new Date().toISOString().split('T')[0],
        category: taskCategoryInput || "Estudo"
      }
    ]);
    setTaskInput("");
    setTaskDateInput("");
  };
  
  const addClass = (e: any) => {
    e.preventDefault();
    if (!classNameInput || !classTimeInput) return;
    setClasses((c) => [
      ...c, 
      { 
        id: cryptoRandomId(), 
        name: classNameInput, 
        time: classTimeInput,
        weekdays: classWeekdaysInput.length > 0 ? classWeekdaysInput : undefined
      }
    ]);
    setClassNameInput("");
    setClassTimeInput("");
    setClassWeekdaysInput([]);
  };

  // Filtragem e ordenação de tarefas
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Filtro por status
        if (filterStatus && task.status !== filterStatus) return false;
        
        // Filtro por categoria
        if (filterCategory && task.category !== filterCategory) return false;
        
        // Filtro por busca
        if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        
        return true;
      })
      .sort((a, b) => {
        // Ordenação
        if (sortBy === "date") {
          return (a.date || "") > (b.date || "") ? 1 : -1;
        } else if (sortBy === "status") {
          return a.status > b.status ? 1 : -1;
        } else if (sortBy === "category") {
          return (a.category || "") > (b.category || "") ? 1 : -1;
        }
        return 0;
      });
  }, [tasks, filterStatus, filterCategory, searchQuery, sortBy]);

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <Card className="bg-white/5 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white"><BookOpen className="h-5 w-5"/> {t("classes")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={addClass} className="space-y-3">
            <div className="flex gap-2">
              <Input value={classNameInput} onChange={(e: any) => setClassNameInput(e.target.value)} placeholder={t("enterClassName")} className="bg-white/10 text-white placeholder:text-white/50"/>
              <Input value={classTimeInput} onChange={(e: any) => setClassTimeInput(e.target.value)} placeholder="08:00" className="w-28 bg-white/10 text-white placeholder:text-white/50"/>
            </div>
            <div className="flex flex-wrap gap-2">
              {weekdays.map((day) => (
                <Button
                  key={day}
                  type="button"
                  onClick={() => toggleWeekday(day)}
                  className={`px-3 py-1 text-xs rounded-full border border-emerald-500 transition-colors duration-150 shadow-sm font-semibold ${classWeekdaysInput.includes(day) ? "bg-emerald-500 text-white" : "bg-white/10 text-emerald-500 hover:bg-emerald-100/20"}`}
                >
                  {day}
                </Button>
              ))}
            </div>
            <Button className="bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg hover:from-emerald-500 hover:to-emerald-700"><Plus className="mr-1 h-4 w-4"/>{t("addClass")}</Button>
          </form>
          <ul className="space-y-3">
            {classes.map((c) => (
              <li key={c.id} className="rounded-xl bg-black/20 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3"><CalendarDays className="h-4 w-4 opacity-80"/> <span className="font-semibold">{c.name}</span></div>
                  <span className="text-sm text-white/70">{c.time}</span>
                </div>
                {c.weekdays && c.weekdays.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {c.weekdays.map((day) => (
                      <Badge key={day} className="bg-sky-500 text-xs">{day}</Badge>
                    ))}
                  </div>
                )}
                <div className="mt-2 flex justify-end">
                  <Button 
                    onClick={() => removeClass(c.id)} 
                    className="bg-gradient-to-r from-rose-400 to-rose-600 shadow-md hover:from-rose-500 hover:to-rose-700 text-xs px-3 py-1 rounded-full"
                  >
                    🗑 Remover
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-white/5 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white"><ListTodo className="h-5 w-5"/> {t("tasks")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={addTask} className="space-y-3">
            <Input value={taskInput} onChange={(e: any) => setTaskInput(e.target.value)} placeholder={t("enterTask")} className="bg-white/10 text-white placeholder:text-white/50"/>
            <div className="flex gap-2">
              <Input 
                type="date" 
                value={taskDateInput} 
                onChange={(e: any) => setTaskDateInput(e.target.value)} 
                className="bg-white/10 text-white placeholder:text-white/50"
              />
              <select 
                value={taskCategoryInput} 
                onChange={(e: any) => setTaskCategoryInput(e.target.value)}
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <Button className="bg-gradient-to-r from-sky-400 to-sky-600 shadow-lg hover:from-sky-500 hover:to-sky-700"><Plus className="mr-1 h-4 w-4"/>{t("addTask")}</Button>
          </form>
          
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => setFilterStatus(null)} 
                className={`px-2 py-1 text-xs ${filterStatus === null ? "bg-sky-500" : "bg-white/10"}`}
              >
                {t("all")}
              </Button>
              {["Pendente", "Em andamento", "Concluída"].map((status) => (
                <Button 
                  key={status} 
                  onClick={() => setFilterStatus(status as any)} 
                  className={`px-2 py-1 text-xs ${filterStatus === status ? badgeColor(status as any) : "bg-white/10"}`}
                >
                  {status}
                </Button>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => setFilterCategory(null)} 
                className={`px-2 py-1 text-xs ${filterCategory === null ? "bg-sky-500" : "bg-white/10"}`}
              >
                {t("allCategories")}
              </Button>
              {categories.map((cat) => (
                <Button 
                  key={cat} 
                  onClick={() => setFilterCategory(cat)} 
                  className={`px-2 py-1 text-xs ${filterCategory === cat ? getCategoryColor(cat) : "bg-white/10"}`}
                >
                  {cat}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input 
                value={searchQuery} 
                onChange={(e: any) => setSearchQuery(e.target.value)} 
                placeholder={t("search")} 
                className="bg-white/10 text-white placeholder:text-white/50"
              />
              <select 
                value={sortBy} 
                onChange={(e: any) => setSortBy(e.target.value as any)}
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="date">{t("sortByDate")}</option>
                <option value="status">{t("sortByStatus")}</option>
                <option value="category">{t("sortByCategory")}</option>
              </select>
            </div>
          </div>
          
          <ul className="space-y-3">
            {filteredTasks.length === 0 && (
              <li className="rounded-xl bg-black/20 p-4 text-white/70">{t("noTasksFound")}</li>
            )}
            {filteredTasks.map((task) => (
              <li key={task.id} className="rounded-xl bg-black/20 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className={`${badgeColor(task.status)} mr-2`}>{task.status}</Badge>
                    <span className="font-semibold">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="bg-white/10 text-white hover:bg-white/20 text-xs px-3 py-1 rounded-full border border-sky-500" onClick={() => cycleStatus(task.id)}>
                      🔄 Próximo
                    </Button>
                    <Button 
                      onClick={() => removeTask(task.id)} 
                      className="bg-gradient-to-r from-rose-400 to-rose-600 shadow-md hover:from-rose-500 hover:to-rose-700 text-xs px-3 py-1 rounded-full"
                    >
                      🗑 Remover
                    </Button>
                  </div>
                </div>
                <div className="mt-2 flex justify-between text-sm text-white/70">
                  {task.date && <div>{task.date}</div>}
                  {task.category && <Badge className={getCategoryColor(task.category)}>{task.category}</Badge>}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}

function badgeColor(status: Task["status"]) {
  switch (status) {
    case "Pendente":
      return "bg-yellow-500";
    case "Em andamento":
      return "bg-sky-500";
    case "Concluída":
      return "bg-emerald-500";
  }
}

function getCategoryColor(category: string) {
  switch (category) {
    case "Estudo":
      return "bg-purple-500";
    case "Tarefa":
      return "bg-sky-500";
    case "Projeto":
      return "bg-emerald-500";
    case "Pessoal":
      return "bg-rose-500";
    default:
      return "bg-gray-500";
  }
}

function PomodoroScreen() {
  const { t } = useLanguage();
  
  const MODES = {
    Facil: { study: 25 * 60, break: 5 * 60, color: brand.green },
    Medio: { study: 40 * 60, break: 10 * 60, color: brand.yellow },
    Dificil: { study: 60 * 60, break: 15 * 60, color: brand.red },
  } as const;
  
  type ModeKey = keyof typeof MODES;

  const [mode, setMode] = useState<ModeKey>(() => {
    try {
      const raw = localStorage.getItem("minday.pomodoro");
      if (raw) {
        const p = JSON.parse(raw);
        return (p.mode as ModeKey) ?? "Facil";
      }
    } catch {}
    return "Facil";
  });
  
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [seconds, setSeconds] = useState<number>(() => {
    try {
      const raw = localStorage.getItem("minday.pomodoro");
      if (raw) {
        const p = JSON.parse(raw);
        if (typeof p.seconds === "number") return p.seconds;
      }
    } catch {}
    return MODES["Facil"].study;
  });
  
  const [cycles, setCycles] = useState<number>(() => {
    try {
      const raw = localStorage.getItem("minday.pomodoro");
      if (raw) {
        const p = JSON.parse(raw);
        return Number(p.cycles) || 0;
      }
    } catch {}
    return 0;
  });
  
  const intervalRef = useRef<number | null>(null);

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(
        "minday.pomodoro",
        JSON.stringify({ mode, isBreak, seconds, cycles })
      );
    } catch {}
  }, [mode, isBreak, seconds, cycles]);

  useEffect(() => {
    // quando muda o modo, reseta para estudo
    setIsBreak(false);
    setSeconds(MODES[mode].study);
    setIsRunning(false);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  }, [mode]);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          // troca de fase
          if (!isBreak) {
            setIsBreak(true);
            return MODES[mode].break;
          } else {
            setIsBreak(false);
            setCycles((c) => c + 1);
            return MODES[mode].study;
          }
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isRunning, isBreak, mode]);

  const toggle = () => {
    setIsRunning((prev) => {
      const next = !prev;
      if (!next && intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return next;
    });
  };
  
  const reset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setSeconds(MODES[mode].study);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <Card className="bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">{t("pomodoro")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-white">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(MODES) as ModeKey[]).map((k) => {
              const studyM = Math.round(MODES[k].study / 60);
              const breakM = Math.round(MODES[k].break / 60);
              const label = k === "Facil" ? t("easy") : k === "Medio" ? t("medium") : t("hard");
              return (
                <Button
                  key={k}
                  onClick={() => setMode(k)}
                  className={`border-0 ${k === mode ? "" : "opacity-70"}`}
                  style={{ background: MODES[k].color }}
                >
                  {label} {studyM}/{breakM} min
                </Button>
              );
            })}
          </div>

          <div className="rounded-3xl bg-black/20 p-8 text-center">
            <div className="mb-2 text-sm uppercase tracking-widest text-white/70">{isBreak ? t("break") : t("study")}</div>
            <div className="mb-6 text-6xl font-black whitespace-nowrap flex items-center justify-center gap-3">
              <span>{mm}</span>
              <Colon size={18} />
              <span>{ss}</span>
            </div>
            <div className="flex justify-center gap-3">
              <Button onClick={toggle} className="bg-emerald-500 hover:bg-emerald-600">
                {isRunning ? <Pause className="mr-2 h-4 w-4"/> : <Play className="mr-2 h-4 w-4"/>}
                {isRunning ? t("pause") : t("start")}
              </Button>
              <Button onClick={reset} className="bg-rose-500 hover:bg-rose-600"><RefreshCw className="mr-2 h-4 w-4"/>{t("reset")}</Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/80">
            <CheckCircle2 className="h-5 w-5"/> {t("cyclesCompleted")} <span className="font-bold text-white">{cycles}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">{t("quickTip")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-white/80">
          <p>{t("pomodoroTip")}</p>
        </CardContent>
      </Card>
    </section>
  );
}

function SleepScreen() {
  const { t } = useLanguage();
  
  const [records, setRecords] = useState<SleepRecord[]>(() => {
    try {
      const raw = localStorage.getItem("minday.sleep.records");
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  });
  
  const [ongoingId, setOngoingId] = useState<string | null>(() => {
    try {
      return localStorage.getItem("minday.sleep.ongoingId");
    } catch {}
    return null;
  });

  const nowIso = () => new Date().toISOString();

  const onRegister = () => {
    if (!ongoingId) {
      const id = cryptoRandomId();
      setRecords((r) => [{ id, start: nowIso() }, ...r]);
      setOngoingId(id);
    } else {
      setRecords((r) =>
        r.map((rec) => {
          if (rec.id !== ongoingId) return rec;
          const end = nowIso();
          const duration = diffTime(rec.start, end);
          const hours = getHoursFromDuration(duration);
          const quality = evaluateSleepQuality(hours);
          return { ...rec, end, duration, quality };
        })
      );
      setOngoingId(null);
    }
  };

  const removeSleepRecord = (id: string) => {
    setRecords((r) => r.filter((rec) => rec.id !== id));
  };

  // persist sleep
  useEffect(() => {
    try { localStorage.setItem("minday.sleep.records", JSON.stringify(records)); } catch {}
  }, [records]);
  
  useEffect(() => {
    try {
      if (ongoingId) localStorage.setItem("minday.sleep.ongoingId", ongoingId);
      else localStorage.removeItem("minday.sleep.ongoingId");
    } catch {}
  }, [ongoingId]);

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <Card className="bg-white/5 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Moon className="h-5 w-5"/> {t("sleep")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-3xl bg-black/20 p-6 text-center">
            <Mascot size={72} />
            <div className="mt-3 text-lg">{ongoingId ? t("recordingInProgress") : t("readyToRecord")}</div>
            <Button onClick={onRegister} className="mt-4 bg-sky-500 hover:bg-sky-600">
              {ongoingId ? t("endRecording") : t("recordSleep")}
            </Button>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-bold">{t("records")}</h3>
            <ul className="space-y-3">
              {records.length === 0 && (
                <li className="rounded-xl bg-black/20 p-4 text-white/70">{t("noRecordsYet")}</li>
              )}
              {records.map((r) => (
                <li key={r.id} className="flex flex-col rounded-xl bg-black/20 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white/70">{t("startTime")}</div>
                      <div className="font-semibold">{fmtDate(r.start)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/70">{t("endTime")}</div>
                      <div className="font-semibold">{r.end ? fmtDate(r.end) : "—"}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/70">{t("duration")}</div>
                      <div className="font-semibold">{r.duration ?? (r.end ? r.duration : t("recording"))}</div>
                    </div>
                  </div>
                  {r.quality && (
                    <div className="mt-3 flex items-center justify-between">
                      <Badge className={getSleepQualityColor(r.quality)}>
                        {t("sleepQuality")}: {t(r.quality.toLowerCase())}
                      </Badge>
                      <Button 
                        onClick={() => removeSleepRecord(r.id)} 
                        className="bg-gradient-to-r from-rose-400 to-rose-600 shadow-md hover:from-rose-500 hover:to-rose-700 text-xs px-3 py-1 rounded-full"
                      >
                        🗑 Remover
                      </Button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">{t("sleepQuality")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-white/80">
          <p>{t("sleepQualityTip")}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-500">{t("inadequado")}</Badge>
              <span>&lt; 6 {t("hours")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-500">{t("adequado")}</Badge>
              <span>6-9 {t("hours")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500">{t("excessivo")}</Badge>
              <span>&gt; 9 {t("hours")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function ProfileScreen() {
  const { t } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);
  
  const [name, setName] = useState<string>(() => {
    try {
      return localStorage.getItem("minday.profile.name") || "Usuário";
    } catch {}
    return "Usuário";
  });
  
  const [bio, setBio] = useState<string>(() => {
    try {
      return localStorage.getItem("minday.profile.bio") || "Estudante focado no MinDay!";
    } catch {}
    return "Estudante focado no MinDay!";
  });
  
  useEffect(() => {
    try { localStorage.setItem("minday.profile.name", name); } catch {}
  }, [name]);
  
  useEffect(() => {
    try { localStorage.setItem("minday.profile.bio", bio); } catch {}
  }, [bio]);
  
  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Mascot size={80} />
        <div>
          <div className="text-3xl font-black">{name}</div>
          <div className="text-white/70">{t("profile")}</div>
        </div>
      </div>
      <Card className="bg-white/5 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><PencilLine className="h-5 w-5"/> {t("editProfile")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="block text-sm text-white/80">{t("name")}</label>
          <Input value={name} onChange={(e: any) => setName(e.target.value)} className="bg-white/10 text-white placeholder:text-white/50"/>
          <label className="mt-3 block text-sm text-white/80">{t("about")}</label>
          <Input value={bio} onChange={(e: any) => setBio(e.target.value)} className="bg-white/10 text-white placeholder:text-white/50"/>
          <div className="pt-2 text-white/70">{t("profileTip")}</div>
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => setShowSettings(!showSettings)}><Settings className="mr-2 h-4 w-4"/> {t("settings")}</Button>
        <Button className="bg-rose-500 hover:bg-rose-600">{t("logout")}</Button>
      </div>
      
      {showSettings && (
        <Card className="bg-white/5 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5"/> {t("settings")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-white/80 text-sm">Idioma: <span className="font-bold">Português</span></div>
            <div className="text-xs text-white/60 mt-2">O idioma do aplicativo está fixo em português.</div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}

// ===== util =====
function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function diffTime(aIso: string, bIso: string) {
  const a = new Date(aIso).getTime();
  const b = new Date(bIso).getTime();
  const ms = Math.max(0, b - a);
  const min = Math.floor(ms / 60000);
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${String(m).padStart(2, "0")}min`;
}

function getHoursFromDuration(duration: string): number {
  // Extrai as horas de uma string no formato "Xh YYmin"
  const match = duration.match(/^(\d+)h/);
  if (match && match[1]) {
    return parseInt(match[1], 10);
  }
  return 0;
}

function evaluateSleepQuality(hours: number): "Inadequado" | "Adequado" | "Excessivo" {
  if (hours < 6) return "Inadequado";
  if (hours <= 9) return "Adequado";
  return "Excessivo";
}

function getSleepQualityColor(quality: string): string {
  switch (quality) {
    case "Inadequado":
      return "bg-yellow-500";
    case "Adequado":
      return "bg-emerald-500";
    case "Excessivo":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
}

function cryptoRandomId() {
  // gera um id simples e único
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}