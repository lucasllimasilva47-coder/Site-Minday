import { Home, CalendarDays, AlarmClock, Moon, UserRound } from 'lucide-react-native';
import { type TabKey } from '../App';
import { brand, tabs } from '../utils/constants';
import Button from './ui/Button';
import Mascot from './Mascot';

const iconMap = {
  Home,
  CalendarDays,
  AlarmClock,
  Moon,
  UserRound,
};

interface HeaderProps {
  current: TabKey;
  onNavigate: (key: TabKey) => void;
}

export default function Header({ current, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-white/10 backdrop-blur-sm" style={{ background: "rgba(11,27,45,0.7)" }}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Mascot size={40} />
          <div>
            <div className="text-xl font-extrabold tracking-wide">{brand.name}</div>
            <div className="text-xs text-white/70">organize seu dia com diversão</div>
          </div>
        </div>
        <nav className="hidden gap-2 sm:flex">
          {tabs.map((t) => {
            const IconComponent = iconMap[t.icon];
            return (
              <Button
                key={t.key}
                className={`${current === t.key ? "bg-emerald-500" : "bg-white/10 hover:bg-white/20"} border-0 text-white`}
                onClick={() => onNavigate(t.key)}
              >
                <IconComponent className="mr-2 h-4 w-4" /> {t.label}
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}