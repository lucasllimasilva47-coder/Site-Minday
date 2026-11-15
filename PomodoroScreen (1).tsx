import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RefreshCw, CheckCircle2 } from 'lucide-react-native';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { brand } from '../utils/constants';

const MODES = {
  Facil: { study: 25 * 60, break: 5 * 60, color: brand.green },
  Medio: { study: 40 * 60, break: 10 * 60, color: brand.yellow },
  Dificil: { study: 60 * 60, break: 15 * 60, color: brand.red },
} as const;

type ModeKey = keyof typeof MODES;

export default function PomodoroScreen() {
  const [mode, setMode] = useState<ModeKey>("Facil");
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [seconds, setSeconds] = useState(MODES[mode].study);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<number | null>(null);

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

  const toggle = () => setIsRunning((r) => !r);
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
          <CardTitle className="text-white">Pomodoro</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-white">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(MODES) as ModeKey[]).map((k) => (
              <Button 
                key={k} 
                onClick={() => setMode(k)} 
                className={`border-0 ${k === mode ? "" : "opacity-70"}`} 
                style={{ background: MODES[k].color }}
              >
                {k === "Facil" ? "Fácil" : k === "Medio" ? "Médio" : "Difícil"} ({MODES[k].study/60}/{MODES[k].break/60})
              </Button>
            ))}
          </div>

          <div className="rounded-3xl bg-black/20 p-8 text-center">
            <div className="mb-2 text-sm uppercase tracking-widest text-white/70">
              {isBreak ? "Descanso" : "Estudo"}
            </div>
            <div className="mb-6 text-6xl font-black tabular-nums">{mm}:{ss}</div>
            <div className="flex justify-center gap-3">
              <Button onClick={toggle} className="bg-emerald-500 hover:bg-emerald-600">
                {isRunning ? <Pause className="mr-2 h-4 w-4"/> : <Play className="mr-2 h-4 w-4"/>}
                {isRunning ? "Pausar" : "Iniciar"}
              </Button>
              <Button onClick={reset} className="bg-rose-500 hover:bg-rose-600">
                <RefreshCw className="mr-2 h-4 w-4"/>Resetar
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-white/80">
            <CheckCircle2 className="h-5 w-5"/> 
            Ciclos concluídos: <span className="font-bold text-white">{cycles}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">Dica rápida</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-white/80">
          <p>
            Use os ciclos para estudar focado e faça pequenas pausas para recuperar energia. No modo Difícil, aumente a água e
            reduza distrações.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}