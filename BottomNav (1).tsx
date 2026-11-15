
import { Home, CalendarDays, AlarmClock, Moon, UserRound } from 'lucide-react-native';
import { type TabKey } from '../App';
import { tabs } from '../utils/constants';

const iconMap = {
  Home,
  CalendarDays,
  AlarmClock,
  Moon,
  UserRound,
};

interface BottomNavProps {
  current: TabKey;
  onNavigate: (key: TabKey) => void;
}

export default function BottomNav({ current, onNavigate }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-black/30 backdrop-blur">
      <div className="mx-auto grid max-w-5xl grid-cols-5 px-2 py-2">
        {tabs.map((t) => {
          const IconComponent = iconMap[t.icon];
          return (
            <button
              key={t.key}
              onClick={() => onNavigate(t.key)}
              className={`flex flex-col items-center gap-1 rounded-xl py-2 transition-colors duration-200 ${
                current === t.key ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              <IconComponent className={`h-5 w-5 ${current === t.key ? "" : "opacity-70"}`} />
              <span className="text-[11px] font-medium">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}