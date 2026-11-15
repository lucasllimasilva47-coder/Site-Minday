import React from 'react';
import { CalendarDays, Clock3, Moon } from 'lucide-react-native';
import { type TabKey } from '../App';
import { brand } from '../utils/constants';
import Mascot from '../components/Mascot';

interface HomeScreenProps {
  onNavigate: (key: TabKey) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  const quick = [
    { label: "Agenda", icon: CalendarDays, color: brand.green, key: "agenda" as TabKey },
    { label: "Pomodoro", icon: Clock3, color: brand.blue, key: "pomodoro" as TabKey },
    { label: "Sono", icon: Moon, color: brand.blue, key: "sono" as TabKey },
  ];

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <Mascot size={96} />
        <div>
          <h1 className="text-3xl font-black">Bem-vindo ao {brand.name}</h1>
          <p className="text-white/70">seu hub de estudos com carinha de jogo</p>
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
            <p className="text-sm text-white/70">Clique para abrir</p>
          </button>
        ))}
      </div>
    </section>
  );
}