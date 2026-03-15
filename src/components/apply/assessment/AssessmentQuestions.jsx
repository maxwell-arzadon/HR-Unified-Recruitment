import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "Were you recruited by a Studio Account (SA) Owner/Manager?",
    type: "radio",
    options: ["Yes", "No"],
  },
  {
    id: 2,
    question: "How many hours can you allot for this job?",
    type: "radio",
    options: ["3 hours or less", "4 to 10 hours", "Others (specify)"],
  },
  {
    id: 3,
    question: "Describe your most embarrassing moment",
    type: "textarea",
    hint: "Minimum 100 characters required. Be honest and detailed",
    minChars: 100,
  },
];

export default function AssessmentQuestions() {
  const [answers, setAnswers] = useState({});

  const setAnswer = (id, value) => setAnswers(a => ({ ...a, [id]: value }));

  return (
    <div>
      <h2 className="font-jakarta font-bold text-black text-lg mb-1">Assessment Questions</h2>
      <p className="text-sm text-zinc-400 mb-6">Answer all questions honestly. This helps us understand you better.</p>

      <div className="flex flex-col gap-4">
        {questions.map(q => (
          <div key={q.id} className="border border-border rounded-2xl p-5">
            <p className="text-sm font-semibold text-black mb-4">{q.id}. {q.question}</p>

            {q.type === "radio" && (
              <div className="flex flex-col gap-3">
                {q.options.map(opt => (
                  <label
                    key={opt}
                    onClick={() => setAnswer(q.id, opt)}
                    className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-all
                      ${answers[q.id] === opt ? "border-primary bg-red-50" : "border-border hover:border-zinc-300"}`}
                  >
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                      ${answers[q.id] === opt ? "border-primary" : "border-zinc-300"}`}>
                      {answers[q.id] === opt && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <span className="text-sm text-black">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {q.type === "textarea" && (
              <div>
                {q.hint && <p className="text-xs text-zinc-400 mb-3">{q.hint}</p>}
                <textarea
                  rows={5}
                  placeholder="Answer here..."
                  value={answers[q.id] || ""}
                  onChange={e => setAnswer(q.id, e.target.value)}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm placeholder-zinc-300 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                />
                <div className="text-right text-xs text-zinc-400 mt-1">
                  {(answers[q.id] || "").length} / {q.minChars}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}