export type Task = { 
  id: string; 
  title: string; 
  status: "Pendente" | "Em andamento" | "Concluída";
  date?: string;
  category?: string;
};

export type ClassItem = { 
  id: string; 
  name: string; 
  time: string;
  weekdays?: string[];
};

export type SleepRecord = { 
  id: string; 
  start: string; 
  end?: string; 
  duration?: string;
  quality?: "Inadequado" | "Adequado" | "Excessivo";
};