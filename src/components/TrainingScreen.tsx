import React, { useMemo } from "react";
import type { AnalysisResult } from "../App";

type Props = {
  analysis: AnalysisResult | null;
};

const RU_SAMPLE_WORDS: string[] = [
  "хаос",
  "холод",
  "характер",
  "хорошо",
  "химия",
  "хобби",
  "хоровод",
  "хитрый",
  "хештег"
];

export const TrainingScreen: React.FC<Props> = ({ analysis }) => {
  const focusLetter = useMemo(() => {
    if (!analysis || analysis.weaknesses.length === 0) {
      return "х";
    }
    const critical = analysis.weaknesses.find(
      (item) => item.severity === "critical"
    );
    return (critical ?? analysis.weaknesses[0]).value;
  }, [analysis]);

  const levelWords = useMemo(() => {
    const words =
      focusLetter === "х"
        ? RU_SAMPLE_WORDS
        : RU_SAMPLE_WORDS.filter((word) => word.includes(focusLetter));

    if (words.length === 0) {
      return [
        `${focusLetter}${focusLetter}`,
        `${focusLetter}а`,
        `${focusLetter}о`
      ];
    }

    return {
      warmup: words.slice(0, 4),
      main: words.slice(0, 6),
      hard: words.slice(3, 9)
    };
  }, [focusLetter]);

  return (
    <div className="glass-panel h-full overflow-hidden p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="chip mb-1 bg-emerald-500/10 text-emerald-200">
            Умные тренировки
          </p>
          <h2 className="grad-text text-lg font-semibold">
            🏋️ ТРЕНИРОВКА: БУКВА &quot;{focusLetter.toUpperCase()}&quot;
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Режим &quot;Слабое звено&quot; подбирает слова с самой слабой буквой последней сессии.
          </p>
        </div>
        <div className="hidden text-[11px] text-slate-400 sm:block">
          <p>Режим: Слабое звено</p>
          <p>Фокус: буква &quot;х&quot;, сочетания &quot;ха&quot;, &quot;хо&quot;</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-4 text-xs">
          <div className="glass-panel border-slate-800/80 p-3 sm:p-4">
            <div className="mb-2 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Уровень 1/4
                </p>
                <p className="text-sm text-slate-200">Разминка</p>
              </div>
              <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300">
                Прогресс: 4/10 слов
              </span>
            </div>
            <div className="mb-3 h-1.5 w-full rounded-full bg-slate-800">
              <div className="h-1.5 w-2/5 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-400" />
            </div>
            <p className="mb-3 text-sm text-slate-200">
              {(Array.isArray(levelWords)
                ? levelWords
                : levelWords.warmup
              ).join(" · ")}
            </p>
            <div className="mb-3 h-2 w-full rounded-full bg-slate-900/80">
              <div className="h-2 w-1/5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400" />
            </div>
            <p className="text-[11px] text-slate-400">
              Цель уровня — разогреть пальцы и привыкнуть к позиции буквы &quot;х&quot;
              на клавиатуре.
            </p>
          </div>

          <div className="glass-panel border-slate-800/80 p-3 sm:p-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Текущее слово
            </p>
            <p className="mb-3 text-sm font-semibold text-slate-100">
              ХОРОШО
            </p>
            <div className="glass-panel border-slate-800/80 bg-slate-950/70 px-3 py-6 text-center text-sm text-slate-200">
              <span className="font-mono tracking-wide">
                хорош<span className="text-rose-300 underline decoration-rose-400/80 decoration-2">
                  _
                </span>
              </span>
            </div>
            <p className="mt-3 text-[11px] text-slate-400">
              Неправильная буква подсвечивается красным. В реальной версии здесь
              анализируются биграммы и время нажатия.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="glass-panel border-slate-800/80 p-3">
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
              Прогресс тренировки
            </h3>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-300">Общий прогресс</span>
              <span className="text-[11px] text-slate-200">4/10 слов</span>
            </div>
            <div className="mb-3 h-1.5 w-full rounded-full bg-slate-900/80">
              <div className="h-1.5 w-2/5 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-cyan-400" />
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-200">
              <div className="rounded-xl bg-slate-900/80 p-2">
                <p className="text-[10px] text-slate-400">Точность</p>
                <p className="text-sm font-semibold text-emerald-300">92%</p>
              </div>
              <div className="rounded-xl bg-slate-900/80 p-2">
                <p className="text-[10px] text-slate-400">Ошибок</p>
                <p className="text-sm font-semibold text-rose-300">1</p>
              </div>
            </div>
          </div>

          <div className="glass-panel border-slate-800/80 p-3">
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-sky-300">
              Уровни сложности
            </h3>
            <ul className="space-y-1.5 text-[11px] text-slate-200">
              <li>• Уровень 1 (легко): ха, хо, хи, хе</li>
              <li>• Уровень 2 (средне): халат, холод, хитрый</li>
              <li>• Уровень 3 (сложно): хорошо, хоровод, характеризовать</li>
              <li>• Уровень 4 (эксперт): электрофикация, экстраординарный</li>
            </ul>
          </div>

          <div className="glass-panel border-slate-800/80 p-3">
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-sky-300">
              Управление тренировкой
            </h3>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-xl bg-slate-900/90 px-3 py-2 text-[11px] font-semibold text-slate-200 ring-1 ring-slate-700/80 transition hover:bg-slate-800/90"
              >
                Пропустить
              </button>
              <button
                type="button"
                className="flex-1 rounded-xl bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-300 px-3 py-2 text-[11px] font-semibold text-slate-950 shadow-glow-soft transition hover:shadow-glow-strong"
              >
                Закончить тренировку
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

