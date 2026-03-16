import { Check, X } from "@phosphor-icons/react";

const questions = [
  {
    id: 1,
    question: "She __________ to the office every day",
    options: ["go", "goes", "going", "gone"],
    correct: "goes",
  },
  {
    id: 2,
    question:
      "Neither the manager nor the employees __________ aware of the policy.",
    options: ["was", "were", "is", "are"],
    correct: "was",
  },
  {
    id: 3,
    question: "He has been working here __________ five years.",
    options: ["since", "for", "during", "while"],
    correct: "for",
  },
  {
    id: 4,
    question: "The report __________ submitted before the deadline.",
    options: ["must", "must be", "must been", "must being"],
    correct: "must be",
  },
  {
    id: 5,
    question: "If I __________ you, I would apply for the position.",
    options: ["am", "was", "were", "be"],
    correct: "were",
  },
];

export default function GrammarTest({
  answers,
  setAnswers,
  checked,
  setChecked,
}) {
  const allAnswered = questions.every((q) => answers[q.id]);
  const score = checked
    ? questions.filter((q) => answers[q.id] === q.correct).length
    : null;

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="font-jakarta font-bold text-black text-lg mb-1">
            Grammar Test
          </h2>
          <p className="text-sm text-zinc-400">Answer the questions below.</p>
        </div>
        {checked && (
          <div className="flex-shrink-0 flex items-center gap-2 bg-zinc-50 border border-border rounded-2xl px-5 py-3">
            <span className="font-jakarta font-bold text-2xl text-black">
              {score}
            </span>
            <span className="text-zinc-400 font-medium text-sm">
              / {questions.length}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 mb-6">
        {questions.map((q) => {
          const selected = answers[q.id];
          const isWrong = checked && selected && selected !== q.correct;

          return (
            <div key={q.id} className="border border-border rounded-2xl p-5">
              <p className="text-sm font-semibold text-black mb-4">
                {q.id}. {q.question}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {q.options.map((opt) => {
                  const isSelected = selected === opt;
                  const isCorrectOpt = checked && opt === q.correct;
                  const isWrongSelected =
                    checked && isSelected && opt !== q.correct;

                  return (
                    <button
                      key={opt}
                      onClick={() =>
                        !checked && setAnswers((a) => ({ ...a, [q.id]: opt }))
                      }
                      disabled={checked}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all flex items-center gap-1.5
                        ${
                          isCorrectOpt
                            ? "border-success bg-green-50 text-success font-semibold"
                            : isWrongSelected
                              ? "border-primary bg-red-50 text-primary font-semibold"
                              : isSelected
                                ? "border-primary bg-red-50 text-primary font-semibold"
                                : "border-border text-zinc-500 hover:border-zinc-300 disabled:hover:border-border"
                        }`}
                    >
                      {isCorrectOpt && (
                        <Check
                          size={13}
                          weight="bold"
                          className="text-success"
                        />
                      )}
                      {isWrongSelected && (
                        <X size={13} weight="bold" className="text-primary" />
                      )}
                      {opt}
                    </button>
                  );
                })}
              </div>
              {checked && isWrong && (
                <p className="text-xs text-success mt-3">
                  Correct answer: <span className="font-bold">{q.correct}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>

      {!checked ? (
        <button
          onClick={() => setChecked(true)}
          disabled={!allAnswered}
          className={`w-full py-3 rounded-full font-semibold font-jakarta text-sm transition-all
            ${
              allAnswered
                ? "gradient-bg text-white hover:opacity-90"
                : "bg-zinc-100 text-zinc-300 cursor-not-allowed"
            }`}
        >
          Check Answers
        </button>
      ) : (
        <div
          className={`text-center text-sm font-semibold py-3 rounded-full
          ${
            score >= 4
              ? "bg-green-50 text-success"
              : score >= 3
                ? "bg-amber-50 text-amber-500"
                : "bg-red-50 text-primary"
          }`}
        >
          {score >= 4
            ? "Great job! 🎉"
            : score >= 3
              ? "Good effort! Keep it up."
              : "Keep practicing. You'll get there!"}
        </div>
      )}
    </div>
  );
}
