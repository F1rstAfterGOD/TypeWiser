import React, { useMemo, useState } from "react";
import { FreeTypingScreen } from "./components/FreeTypingScreen";
import { AnalysisScreen } from "./components/AnalysisScreen";
import { TrainingScreen } from "./components/TrainingScreen";

type TabId = "free" | "training" | "progress";

const TABS: { id: TabId; label: string }[] = [
  { id: "free", label: "Свободная печать" },
  { id: "training", label: "Тренировки" },
  { id: "progress", label: "Прогресс" }
];

export type MockStats = {
  speed: number;
  accuracy: number;
  time: string;
  mistakes: number;
};

export type WeaknessSeverity = "critical" | "medium" | "low";

export type LetterSummary = {
  character: string;
  totalPresses: number;
  mistakeCount: number;
  avgTime: number;
};

export type Weakness = {
  type: "letter";
  value: string;
  rate: number;
  severity: WeaknessSeverity;
};

export type AnalysisResult = {
  letters: LetterSummary[];
  weaknesses: Weakness[];
};

export type SessionPayload = {
  sourceText: string;
  typedText: string;
  startedAt: number | null;
  finishedAt: number;
};

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("free");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  const mockStats: MockStats = useMemo(
    () => ({
      speed: 240,
      accuracy: 95,
      time: "01:24",
      mistakes: 3
    }),
    []
  );

  const handleAnalyzeSession = (session: SessionPayload) => {
    const { sourceText, typedText, startedAt, finishedAt } = session;
    const length = Math.max(sourceText.length, typedText.length);
    if (length === 0) {
      return;
    }

    const totalDuration =
      startedAt != null ? Math.max(0, finishedAt - startedAt) : length * 320;
    const approxTimePerChar = totalDuration / length || 0;

    const letterStats: Record<
      string,
      { total: number; mistakes: number; times: number[] }
    > = {};

    for (let index = 0; index < length; index += 1) {
      const expected = sourceText[index] ?? "";
      const actual = typedText[index] ?? "";
      const character = actual || expected || " ";
      const isMistake = expected !== actual;

      if (!letterStats[character]) {
        letterStats[character] = { total: 0, mistakes: 0, times: [] };
      }

      letterStats[character].total += 1;
      if (isMistake) {
        letterStats[character].mistakes += 1;
      }
      letterStats[character].times.push(approxTimePerChar);
    }

    const letters: LetterSummary[] = [];
    const weaknesses: Weakness[] = [];

    Object.entries(letterStats).forEach(([character, stats]) => {
      const avgTime =
        stats.times.reduce((sum, value) => sum + value, 0) / stats.times.length || 0;
      const summary: LetterSummary = {
        character,
        totalPresses: stats.total,
        mistakeCount: stats.mistakes,
        avgTime: Math.round(avgTime)
      };
      letters.push(summary);

      if (stats.total >= 5) {
        const rate = (stats.mistakes / stats.total) * 100;
        if (rate > 20) {
          weaknesses.push({
            type: "letter",
            value: character,
            rate,
            severity: "critical"
          });
        } else if (rate > 10) {
          weaknesses.push({
            type: "letter",
            value: character,
            rate,
            severity: "medium"
          });
        }
      }
    });

    letters.sort((left, right) => right.totalPresses - left.totalPresses);
    weaknesses.sort((left, right) => right.rate - left.rate);

    setAnalysis({ letters, weaknesses });
    setActiveTab("progress");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-background to-slate-900 text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-sky-500/15 blur-3xl animate-pulse-soft" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-80 rounded-full bg-cyan-500/10 blur-3xl animate-float-slow" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-500/15 shadow-glow-soft">
              <span className="grad-text text-xl font-semibold">T</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="grad-text text-xl font-semibold sm:text-2xl">
                  TypeWiser
                </h1>
                <span className="chip hidden sm:inline-flex border-accent-soft/70 bg-sky-500/10 text-sky-100/90">
                  умные тренировки печати
                </span>
              </div>
              <p className="text-xs text-slate-400 sm:text-sm">
                Анализ слабых мест, персональные упражнения и красивая визуализация
              </p>
            </div>
          </div>

          <button
            className="group glass-panel flex items-center gap-2 rounded-2xl px-3 py-2 text-xs font-medium text-slate-200 transition hover:-translate-y-0.5 hover:border-accent-soft hover:shadow-glow-strong sm:text-sm"
            type="button"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800/80 text-base">
              <span>👤</span>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-300">
                  Гость
                </span>
                <span className="text-[10px] text-sky-300/80">beta</span>
              </div>
              <p className="text-[11px] text-slate-400 group-hover:text-slate-200">
                Войти, чтобы сохранить прогресс
              </p>
            </div>
          </button>
        </header>

        <nav className="mb-5 flex flex-wrap items-center gap-2 rounded-2xl bg-slate-900/60 p-1 text-xs shadow-glow-soft sm:text-sm">
          {TABS.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "relative flex-1 cursor-pointer rounded-xl px-3 py-2 font-medium transition",
                  "focus-visible:focus-ring",
                  isActive
                    ? "bg-gradient-to-r from-sky-500/70 to-cyan-500/80 text-slate-950 shadow-glow-strong"
                    : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
                ].join(" ")}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="pointer-events-none absolute inset-x-4 -bottom-[3px] h-px bg-gradient-to-r from-transparent via-sky-400/80 to-transparent" />
                )}
              </button>
            );
          })}

          <div className="hidden items-center gap-3 pl-2 pr-1 text-[11px] text-slate-400 sm:flex">
            <div className="flex items-center gap-1">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
              <span>Live-анализ</span>
            </div>
            <span className="h-3 w-px bg-slate-700/70" />
            <span>WS · FastAPI · PostgreSQL (концепт)</span>
          </div>
        </nav>

        <main className="flex flex-1 flex-col gap-4 pb-4 lg:flex-row">
          <section className="flex-1">
            {activeTab === "free" && (
              <FreeTypingScreen stats={mockStats} onAnalyzeSession={handleAnalyzeSession} />
            )}
            {activeTab === "training" && (
              <TrainingScreen analysis={analysis} />
            )}
            {activeTab === "progress" && (
              <AnalysisScreen analysis={analysis} />
            )}
          </section>

          <aside className="mt-2 flex w-full flex-col gap-3 lg:mt-0 lg:w-80">
            <div className="glass-panel-strong relative overflow-hidden p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(45,212,191,0.16),_transparent_55%)]" />
              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-sky-200/80">
                    Текущая сессия
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Ты печатаешь лучше, чем <span className="font-semibold">65%</span> пользователей
                  </p>
                </div>
                <div className="flex flex-col items-end text-right text-xs text-slate-300">
                  <span className="text-[11px] text-slate-400">Скорость</span>
                  <span className="text-lg font-semibold text-sky-200">
                    {mockStats.speed}
                    <span className="ml-0.5 text-[10px] font-normal text-slate-400">
                      зн/мин
                    </span>
                  </span>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-300">
                    ▲ +5 зн/мин за неделю
                  </span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-300">
                <div className="rounded-xl bg-slate-900/70 p-2">
                  <p className="text-[10px] text-slate-400">Точность</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-300">
                    {mockStats.accuracy}%
                  </p>
                </div>
                <div className="rounded-xl bg-slate-900/70 p-2">
                  <p className="text-[10px] text-slate-400">Время</p>
                  <p className="mt-1 text-sm font-semibold text-sky-200">
                    {mockStats.time}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-900/70 p-2">
                  <p className="text-[10px] text-slate-400">Ошибки</p>
                  <p className="mt-1 text-sm font-semibold text-rose-300">
                    {mockStats.mistakes}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-4 text-xs text-slate-300">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Подсказка
              </p>
              <p>
                Начни со{" "}
                <span className="font-medium text-sky-300">
                  свободной печати
                </span>
                . Сервис проанализирует ошибки и{" "}
                <span className="font-medium text-emerald-300">
                  сам подберет тренировки
                </span>
                .
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default App;

