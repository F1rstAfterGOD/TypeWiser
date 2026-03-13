import React, { useEffect, useMemo, useRef, useState } from "react";
import type { MockStats, SessionPayload } from "../App";

type TypingMode = "free" | "ru_words" | "en_words";

type Props = {
  stats: MockStats;
  onAnalyzeSession?: (payload: SessionPayload) => void;
};

const SAMPLE_TEXT =
  "Вот текст, который ты печатаешь. Каждая буква подсвечивается по мере набора. Ошибки показываются красным — удобно и наглядно.";

const RU_DICTIONARY: string[] = [
  "клавиатура",
  "скорость",
  "программа",
  "алгоритм",
  "учебник",
  "система",
  "реакция",
  "символ",
  "практика",
  "развитие",
  "типография",
  "мгновенно",
  "ошибка",
  "комбинация",
  "буква",
  "тренировка"
];

const EN_DICTIONARY: string[] = [
  "keyboard",
  "speed",
  "program",
  "algorithm",
  "system",
  "practice",
  "reaction",
  "symbol",
  "accuracy",
  "session",
  "mistake",
  "typing",
  "training",
  "profile",
  "progress",
  "focus"
];

export const FreeTypingScreen: React.FC<Props> = ({
  stats,
  onAnalyzeSession
}) => {
  const [sourceText, setSourceText] = useState(SAMPLE_TEXT);
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [mode, setMode] = useState<TypingMode>("free");
  const typingAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!startedAt && typed.length > 0) {
      setStartedAt(performance.now());
    }
  }, [typed, startedAt]);

  const { errorsCount, liveAccuracy, currentChar } = useMemo(() => {
    let errors = 0;
    for (let i = 0; i < typed.length; i += 1) {
      if (typed[i] !== sourceText[i]) {
        errors += 1;
      }
    }
    const accuracy =
      typed.length === 0
        ? 100
        : Math.max(0, Math.round(((typed.length - errors) / typed.length) * 100));

    return {
      errorsCount: errors,
      liveAccuracy: accuracy,
      currentChar: sourceText[typed.length] ?? ""
    };
  }, [typed, sourceText]);

  const liveSpeed = useMemo(() => {
    if (!startedAt || typed.length === 0) {
      return stats.speed;
    }
    const elapsedMinutes = (performance.now() - startedAt) / 1000 / 60;
    if (elapsedMinutes === 0) {
      return stats.speed;
    }
    const speed = Math.round(typed.length / elapsedMinutes);
    return speed;
  }, [stats.speed, startedAt, typed.length]);

  // Автофокус при первом рендере
  useEffect(() => {
    if (typingAreaRef.current) {
      typingAreaRef.current.focus();
    }
  }, []);

  // Автопрокрутка текста вниз при наборе (словно "перелистывание")
  useEffect(() => {
    if (typingAreaRef.current) {
      typingAreaRef.current.scrollTop = typingAreaRef.current.scrollHeight;
    }
  }, [typed]);

  // Для режимов словаря автоматически добавляем новые слова,
  // когда пользователь подходит к концу текущей последовательности.
  useEffect(() => {
    if (mode === "free") {
      return;
    }
    const remaining = sourceText.length - typed.length;
    if (remaining > 25) {
      return;
    }

    const base = mode === "ru_words" ? RU_DICTIONARY : EN_DICTIONARY;
    const extraWords: string[] = [];
    for (let index = 0; index < 20; index += 1) {
      const word = base[Math.floor(Math.random() * base.length)];
      extraWords.push(word);
    }
    setSourceText((previous) => `${previous} ${extraWords.join(" ")}`.trim());
  }, [mode, sourceText.length, typed.length]);

  const handleTextChange = (value: string) => {
    setMode("free");
    setSourceText(value || SAMPLE_TEXT);
    setTyped("");
    setStartedAt(null);
  };

  const regenerateFromDictionary = (targetMode: TypingMode) => {
    if (targetMode === "free") {
      return;
    }
    const base = targetMode === "ru_words" ? RU_DICTIONARY : EN_DICTIONARY;
    const words: string[] = [];
    const length = 30;
    for (let index = 0; index < length; index += 1) {
      const word = base[Math.floor(Math.random() * base.length)];
      words.push(word);
    }
    const generated = words.join(" ");
    setMode(targetMode);
    setSourceText(generated);
    setTyped("");
    setStartedAt(null);
  };

  const handleTypingKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
    const { key } = event;

    if (key === "Backspace") {
      event.preventDefault();
      setTyped((previous) => previous.slice(0, -1));
      return;
    }

    if (key === "Enter") {
      event.preventDefault();
      setTyped((previous) => `${previous}\n`);
      return;
    }

    if (key.length === 1) {
      event.preventDefault();
      setTyped((previous) => previous + key);
      return;
    }

    if (key === "Tab") {
      event.preventDefault();
      setTyped((previous) => `${previous}  `);
      return;
    }

    // Блокируем стрелки и служебные, чтобы не было ощущения "залипания"
    if (
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "ArrowUp" ||
      key === "ArrowDown"
    ) {
      event.preventDefault();
    }
  };

  const progress = Math.min(
    100,
    sourceText.length === 0 ? 0 : Math.round((typed.length / sourceText.length) * 100)
  );

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="glass-panel-strong relative overflow-hidden p-4 sm:p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_65%),radial-gradient(circle_at_bottom,_rgba(15,118,110,0.16),_transparent_60%)]" />
        <div className="relative mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="chip mb-1 border-sky-500/60 bg-sky-500/10 text-sky-100">
              Свободная печать
            </p>
            <p className="text-sm text-slate-200">
              Печатай любой текст — мы анализируем каждую клавишу в реальном времени.
            </p>
          </div>
            <div className="flex items-center gap-3 text-xs">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400">Live-скорость</span>
              <span className="text-base font-semibold text-sky-200">
                {liveSpeed}
                <span className="ml-0.5 text-[10px] font-normal text-slate-400">
                  зн/мин
                </span>
              </span>
            </div>
            <div className="h-10 w-px bg-slate-700/60" />
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-slate-400">Live-точность</span>
              <span className="text-base font-semibold text-emerald-300">
                {liveAccuracy}%
              </span>
            </div>
          </div>
        </div>

        <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
          {/* Левая часть: текст для печати и настройки */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/70 p-1">
                {[
                  { id: "free", label: "Свободный текст" },
                  { id: "ru_words", label: "Русские слова" },
                  { id: "en_words", label: "English words" }
                ].map((item) => {
                  const isActive = mode === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        item.id === "free"
                          ? setMode("free")
                          : regenerateFromDictionary(item.id as TypingMode)
                      }
                      className={[
                        "rounded-xl px-2.5 py-1 transition",
                        isActive
                          ? "bg-sky-500/80 text-slate-950"
                          : "text-slate-300 hover:bg-slate-800"
                      ].join(" ")}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                onClick={() => regenerateFromDictionary(mode)}
                disabled={mode === "free"}
                className="rounded-xl border border-slate-700/80 px-2.5 py-1 text-[11px] font-medium text-slate-200 transition hover:border-sky-500/70 hover:text-sky-200 disabled:cursor-not-allowed disabled:border-slate-800 disabled:text-slate-500"
              >
                Сгенерировать заново
              </button>
            </div>
            <label className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Текст для печати
            </label>
            <textarea
              className="glass-panel h-28 w-full resize-none border-slate-700/70 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 shadow-inner outline-none transition focus:ring-2 focus:ring-sky-500/70 focus:ring-offset-2 focus:ring-offset-slate-900"
              value={sourceText}
              onChange={(event) => handleTextChange(event.target.value)}
              placeholder="Вставь сюда текст для тренировки или пиши свои мысли…"
            />
            <p className="text-[11px] text-slate-400">
              Можно вставить код, статью или любой текст —{" "}
              <span className="text-sky-300">анализируем все до символа</span>.
            </p>
          </div>

          {/* Правая часть: большая область печати без внутреннего скролла */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-medium uppercase tracking-wide text-slate-400">
                Область печати
              </label>
              <span className="rounded-full bg-slate-900/80 px-2 py-0.5 text-[10px] text-slate-300">
                Текущее слово:{" "}
                <span className="text-sky-300">
                  {typed.split(/\s+/).filter(Boolean).pop() ?? "—"}
                </span>
              </span>
            </div>

            <div className="glass-panel relative flex min-h-[260px] flex-col justify-between border-slate-800/80">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.13),_transparent_65%)]" />
              <div
                ref={typingAreaRef}
                tabIndex={0}
                onKeyDown={handleTypingKeyDown}
                className="relative px-3 pt-3 pr-4 text-sm leading-relaxed text-slate-300 outline-none focus:ring-2 focus:ring-sky-500/70 focus:ring-offset-2 focus:ring-offset-slate-900 whitespace-pre-wrap break-words"
              >
                {Array.from(
                  { length: Math.max(sourceText.length, typed.length) },
                  (_, index) => {
                    const expectedChar = sourceText[index] ?? "";
                    const typedChar = typed[index];
                    const isTyped = index < typed.length;
                    const isBeyondSource = index >= sourceText.length;
                    const isError =
                      isTyped &&
                      (isBeyondSource ? Boolean(typedChar) : typedChar !== expectedChar);
                    const isCurrent = index === typed.length;

                    let className = "";
                    if (isTyped && !isError) {
                      className = "text-emerald-200";
                    } else if (isError) {
                      className =
                        "bg-rose-500/20 text-rose-200 underline decoration-rose-300/80 decoration-2";
                    } else if (isCurrent) {
                      className =
                        "relative text-sky-100 after:typing-caret after:ml-[1px]";
                    } else {
                      className = "text-slate-500";
                    }

                    const charToShow = expectedChar || typedChar || " ";

                    if (charToShow === "\n") {
                      return <br key={`br-${index}`} />;
                    }

                    return (
                      <span key={`${charToShow}-${index}`} className={className}>
                        {charToShow}
                      </span>
                    );
                  }
                )}
                {typed.length >= sourceText.length && (
                  <span className="typing-caret ml-[1px]" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel flex flex-col gap-3 p-3 text-xs sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div className="flex flex-1 flex-wrap gap-2">
          <div className="flex items-center gap-2 rounded-xl bg-slate-900/80 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.9)]" />
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Скорость
              </p>
              <p className="text-sm font-semibold text-slate-100">
                {liveSpeed}
                <span className="ml-1 text-[10px] font-normal text-slate-400">
                  зн/мин
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-900/80 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-300/90" />
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Точность
              </p>
              <p className="text-sm font-semibold text-emerald-300">
                {liveAccuracy}%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-900/80 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Ошибок
              </p>
              <p className="text-sm font-semibold text-rose-300">
                {errorsCount}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-900/80 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            <div>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">
                Прогресс текста
              </p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-24 rounded-full bg-slate-800">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400 transition-[width]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-300">{progress}%</span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onAnalyzeSession?.({
              sourceText,
              typedText: typed,
              startedAt,
              finishedAt: performance.now()
            })
          }
          className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-3 py-2 text-[11px] font-semibold text-slate-950 shadow-glow-soft transition hover:shadow-glow-strong sm:w-auto"
        >
          Завершить сессию и проанализировать
        </button>
      </div>
    </div>
  );
};

