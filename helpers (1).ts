import { Task } from '../types';

export function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString();
}

export function diffTime(aIso: string, bIso: string) {
  const a = new Date(aIso).getTime();
  const b = new Date(bIso).getTime();
  const ms = Math.max(0, b - a);
  const min = Math.round(ms / 60000);
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${String(m).padStart(2, "0")}min`;
}

export function cryptoRandomId() {
  // gera um id simples e único
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}

export function getBadgeColor(status: Task["status"]) {
  switch (status) {
    case "Pendente":
      return "bg-yellow-500";
    case "Em andamento":
      return "bg-sky-500";
    case "Concluída":
      return "bg-emerald-500";
    default:
      return "bg-gray-500";
  }
}

export function getCategoryColor(category?: string) {
  switch (category) {
    case "Estudo":
      return "bg-purple-500";
    case "Tarefa":
      return "bg-blue-500";
    case "Prova":
      return "bg-red-500";
    case "Trabalho":
      return "bg-orange-500";
    case "Pessoal":
      return "bg-pink-500";
    default:
      return "bg-gray-500";
  }
}

export function getHoursFromDuration(duration?: string): number {
  if (!duration) return 0;
  const match = duration.match(/^(\d+)h/);
  return match ? parseInt(match[1], 10) : 0;
}

export function evaluateSleepQuality(duration?: string): "Inadequado" | "Adequado" | "Excessivo" {
  const hours = getHoursFromDuration(duration);
  
  if (hours < 6) return "Inadequado";
  if (hours > 9) return "Excessivo";
  return "Adequado";
}

export function getSleepQualityColor(quality?: string) {
  switch (quality) {
    case "Inadequado":
      return "bg-red-500";
    case "Adequado":
      return "bg-emerald-500";
    case "Excessivo":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
}
