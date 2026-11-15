import React, { useState } from 'react';
import { Moon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Mascot from '../components/Mascot';
import { SleepRecord } from '../types';
import { cryptoRandomId, fmtDate, diffTime } from '../utils/helpers';

export default function SleepScreen() {
  const [records, setRecords] = useState<SleepRecord[]>([]);
  const [ongoingId, setOngoingId] = useState<string | null>(null);

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
          return { ...rec, end, duration: diffTime(rec.start, end) };
        })
      );
      setOngoingId(null);
    }
  };

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <Card className="bg-white/5 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5"/> Sono
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-3xl bg-black/20 p-6 text-center">
            <Mascot size={72} />
            <div className="mt-3 text-lg">
              {ongoingId ? "Registro em andamento" : "Pronto para registrar"}
            </div>
            <Button onClick={onRegister} className="mt-4 bg-sky-500 hover:bg-sky-600">
              {ongoingId ? "Encerrar registro" : "Registrar sono"}
            </Button>
          </div>
          
          <div>
            <h3 className="mb-3 text-lg font-bold">Registros</h3>
            <ul className="space-y-3">
              {records.length === 0 && (
                <li className="rounded-xl bg-black/20 p-4 text-white/70">
                  Sem registros ainda.
                </li>
              )}
              {records.map((r) => (
                <li key={r.id} className="flex items-center justify-between rounded-xl bg-black/20 p-4">
                  <div>
                    <div className="text-sm text-white/70">Início</div>
                    <div className="font-semibold">{fmtDate(r.start)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/70">Fim</div>
                    <div className="font-semibold">{r.end ? fmtDate(r.end) : "—"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/70">Duração</div>
                    <div className="font-semibold">
                      {r.duration ?? (ongoingId === r.id ? "gravando..." : "—")}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/5">
        <CardHeader>
          <CardTitle className="text-white">Qualidade do sono</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-white/80">
          <p>
            Depois de registrar uma noite de sono, você pode adicionar notas como "dormi bem" ou "acordei cedo".
          </p>
        </CardContent>
      </Card>
    </section>
  );
}