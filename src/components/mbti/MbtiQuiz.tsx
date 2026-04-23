import { useMemo, useState } from "react";
import { questions, type MbtiSide } from "../../data/mbti/questions";
import { calcMbtiResult } from "../../lib/mbti/calc";

export default function MbtiQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<MbtiSide[]>([]);

  const current = questions[currentIndex];
  const progress = useMemo(() => {
    return Math.round((answers.length / questions.length) * 100);
  }, [answers.length]);

  function choose(side: MbtiSide) {
    const nextAnswers = [...answers, side];

    if (currentIndex === questions.length - 1) {
      const result = calcMbtiResult(nextAnswers);
      const params = new URLSearchParams(
        Object.entries(result.scores).map(([key, value]) => [key, String(value)]),
      );

      window.location.href = `/mbti/result/${result.type}?${params.toString()}`;
      return;
    }

    setAnswers(nextAnswers);
    setCurrentIndex((value) => value + 1);
  }

  function goBack() {
    setAnswers((value) => value.slice(0, -1));
    setCurrentIndex((value) => Math.max(0, value - 1));
  }

  function resetQuiz() {
    setAnswers([]);
    setCurrentIndex(0);
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="text-sm text-slate-300">
          第 {currentIndex + 1} / {questions.length} 题
        </span>

        <div className="flex items-center gap-3">
          <span className="text-sm text-emerald-300">{progress}%</span>

          <button
            type="button"
            onClick={resetQuiz}
            className="rounded-lg border border-white/10 px-3 py-1 text-sm text-slate-200 transition hover:bg-white/10"
          >
            重新开始
          </button>
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-8 text-sm font-semibold text-emerald-300">
        {current.dimension}
      </p>
      <h2 className="mt-2 text-2xl font-bold leading-snug">{current.text}</h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => choose(current.left.side)}
          className="min-h-28 rounded-lg border border-white/10 bg-slate-900/70 p-5 text-left leading-7 transition hover:-translate-y-1 hover:border-sky-400"
        >
          {current.left.label}
        </button>

        <button
          type="button"
          onClick={() => choose(current.right.side)}
          className="min-h-28 rounded-lg border border-white/10 bg-slate-900/70 p-5 text-left leading-7 transition hover:-translate-y-1 hover:border-emerald-400"
        >
          {current.right.label}
        </button>
      </div>

      <div className="mt-5 flex justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={currentIndex === 0}
          className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          上一题
        </button>
        <span className="text-sm text-slate-400">选择更自然、更省力的那一项</span>
      </div>
    </div>
  );
}
