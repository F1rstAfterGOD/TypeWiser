import React from "react";
import type { AnalysisResult } from "../App";

type Props = {
  analysis: AnalysisResult | null;
};

export const AnalysisScreen: React.FC<Props> = ({ analysis }) => {
  const hasDynamicWeaknesses =
    analysis != null && analysis.weaknesses.length > 0;

  const topWeaknesses = hasDynamicWeaknesses
    ? analysis!.weaknesses.slice(0, 3)
    : null;

  return (
    <div className="glass-panel h-full overflow-hidden p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="chip mb-1 bg-slate-900/80 text-slate-200">
            Профиль печати
          </p>
          <h2 className="grad-text text-lg font-semibold">
            📊 ТВОЙ ПРОФИЛЬ ПЕЧАТИ
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            {hasDynamicWeaknesses
              ? "Анализ последней сессии печати — слабые буквы и прогресс."
              : "Демонстрационный экран на основе описания из ТЗ. Напечатай текст и нажми «Завершить сессию», чтобы увидеть живой анализ."}
          </p>
        </div>
        <button
          type="button"
          className="rounded-xl bg-sky-500/10 px-3 py-1.5 text-xs font-medium text-sky-200 ring-1 ring-sky-500/40 transition hover:bg-sky-500/20"
        >
          Обновить анализ
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="space-y-4 text-xs">
          <div className="glass-panel border-slate-800/80 p-3 sm:p-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold uppercase tracking-wide text-rose-300">
                🔴 КРИТИЧЕСКИЕ БУКВЫ
              </h3>
              <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] text-rose-200">
                Ошибки &gt; 20%
              </span>
            </div>
            <div className="space-y-2 text-[11px] text-slate-200">
              {hasDynamicWeaknesses && topWeaknesses
                ? topWeaknesses.map((item) => {
                    const roundedRate = Math.round(item.rate);
                    const barWidth =
                      roundedRate >= 40
                        ? "w-5/6"
                        : roundedRate >= 30
                        ? "w-3/4"
                        : "w-2/3";
                    const letterSummary = analysis!.letters.find(
                      (entry) => entry.character === item.value
                    );
                    return (
                      <div
                        key={item.value}
                        className="flex items-center justify-between gap-3 rounded-xl bg-slate-900/80 px-2 py-1.5"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/15 text-sm font-semibold text-rose-200">
                            {item.value}
                          </div>
                          <div>
                            <p className="text-[11px] text-slate-300">
                              Ошибки{" "}
                              <span className="font-semibold text-rose-300">
                                {roundedRate}%
                              </span>
                            </p>
                            <p className="text-[10px] text-slate-500">
                              Среднее время{" "}
                              <span className="text-slate-300">
                                {letterSummary?.avgTime ?? 0} мс
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="hidden w-28 flex-col gap-1 sm:flex">
                          <div className="h-1.5 rounded-full bg-slate-800">
                            <div
                              className={`h-1.5 rounded-full bg-gradient-to-r from-rose-400 via-rose-500 to-orange-400 ${barWidth}`}
                            />
                          </div>
                          <span className="self-end text-[9px] text-slate-400">
                            {item.severity === "critical"
                              ? "Критично"
                              : "Средняя важность"}
                          </span>
                        </div>
                      </div>
                    );
                  })
                : [
                    { char: "х", rate: 35, time: 420, bar: "w-5/6" },
                    { char: "ж", rate: 28, time: 390, bar: "w-3/4" },
                    { char: "ц", rate: 22, time: 360, bar: "w-2/3" }
                  ].map((item) => (
                    <div
                      key={item.char}
                      className="flex items-center justify-between gap-3 rounded-xl bg-slate-900/80 px-2 py-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/15 text-sm font-semibold text-rose-200">
                          {item.char}
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-300">
                            Ошибки{" "}
                            <span className="font-semibold text-rose-300">
                              {item.rate}%
                            </span>
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Скорость{" "}
                            <span className="text-slate-300">
                              {item.time} мс
                            </span>{" "}
                            (ср. 280 мс)
                          </p>
                        </div>
                      </div>
                      <div className="hidden w-28 flex-col gap-1 sm:flex">
                        <div className="h-1.5 rounded-full bg-slate-800">
                          <div
                            className={`h-1.5 rounded-full bg-gradient-to-r from-rose-400 via-rose-500 to-orange-400 ${item.bar}`}
                          />
                        </div>
                        <span className="self-end text-[9px] text-slate-400">
                          Критично
                        </span>
                      </div>
                    </div>
                  ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="glass-panel border-slate-800/80 p-3">
              <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-amber-300">
                🟡 ПРОБЛЕМНЫЕ СОЧЕТАНИЯ
              </h3>
              <ul className="space-y-1.5 text-[11px] text-slate-200">
                <li>• &quot;ый&quot; — 45% ошибок в словах с этим окончанием</li>
                <li>• &quot;пр&quot; — скорость печати на 40% ниже средней</li>
                <li>• &quot;ол&quot; — частые пропуски букв</li>
              </ul>
            </div>

            <div className="glass-panel border-slate-800/80 p-3">
              <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-emerald-300">
                🟢 СИЛЬНЫЕ СТОРОНЫ
              </h3>
              <ul className="space-y-1.5 text-[11px] text-slate-200">
                <li>• Гласные буквы — менее 3% ошибок</li>
                <li>• Скорость печати английских слов на 15% выше средней</li>
                <li>• Пробел и знаки препинания — почти идеально</li>
              </ul>
            </div>
          </div>

          <div className="glass-panel border-slate-800/80 p-3">
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-sky-300">
              📈 ПРОГРЕСС ЗА ПОСЛЕДНЮЮ НЕДЕЛЮ
            </h3>
            <ul className="space-y-1.5 text-[11px] text-slate-200">
              <li>• Буква &quot;х&quot;: ошибки ↓ с 45% до 35%</li>
              <li>• Буква &quot;ф&quot;: ошибки ↓ с 30% до 18%</li>
              <li>• Общая скорость: ↑ на 5 зн/мин</li>
            </ul>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="glass-panel border-slate-800/80 p-3">
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-sky-300">
              🔥 Тепловая карта клавиатуры (концепт)
            </h3>
            <div className="space-y-1.5 font-mono text-[11px] text-slate-200">
              <p>q [░░] w [▓▓] e [▓▓] r [░░] t [░░] y [░░] u [░░] i [░░] o [░░] p [░░]</p>
              <p>a [▓▓] s [░░] d [░░] f [▓▓] g [░░] h [░░] j [░░] k [░░] l [░░]</p>
              <p>z [░░] x [██] c [░░] v [░░] b [░░] n [░░] m [░░]</p>
            </div>
            <p className="mt-2 text-[10px] text-slate-400">
              ░░ — нормально, ▓▓ — медленно, ██ — критически (красный).
              В реальном сервисе здесь будет интерактивная визуализация.
            </p>
          </div>

          <div className="glass-panel border-slate-800/80 p-3">
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-sky-300">
              🎯 Следующий шаг
            </h3>
            <p className="mb-3 text-[11px] text-slate-200">
              {hasDynamicWeaknesses && topWeaknesses
                ? (() => {
                    const criticalLetters = topWeaknesses
                      .filter((item) => item.severity === "critical")
                      .map((item) => `«${item.value}»`);
                    const target =
                      criticalLetters.length > 0
                        ? criticalLetters.join(", ")
                        : `«${topWeaknesses[0].value}»`;
                    return (
                      <>
                        На основе текущего анализа мы рекомендуем{" "}
                        <span className="text-emerald-300">
                          тренировку &quot;Слабое звено&quot;
                        </span>{" "}
                        по буквам {target}, а также{" "}
                        <span className="text-amber-300">
                          &quot;Битву комбинаций&quot; для сложных сочетаний
                        </span>
                        .
                      </>
                    );
                  })()
                : (
                  <>
                    На основе текущего анализа мы рекомендуем{" "}
                    <span className="text-emerald-300">
                      тренировку &quot;Слабое звено&quot;
                    </span>{" "}
                    по буквам &quot;х&quot; и &quot;ж&quot;, а также{" "}
                    <span className="text-amber-300">
                      &quot;Битву комбинаций&quot; для &quot;ый&quot; и &quot;пр&quot;
                    </span>
                    .
                  </>
                  )}
            </p>
            <button
              type="button"
              className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-3 py-2 text-xs font-semibold text-slate-950 shadow-glow-soft transition hover:shadow-glow-strong"
            >
              Начать тренировку слабых мест
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

