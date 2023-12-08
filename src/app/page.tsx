"use client";

import { getAnswer } from "./getter";
import { useState } from "react";
import { incrementRequestCount, isRateLimited } from "./ratelimit";

export default function Main() {
  const [answer, setAnswer] = useState("");
  const [shouldDisableButton, setShouldDisableButton] = useState(false);

  async function handleFormSubmit(event: any) {
    if (isRateLimited()) {
      alert("Slow down lol. try again in 30 seconds.");
      return;
    }

    event.preventDefault();
    let question = event.target?.form.question.value;
    if (!question) return;

    if (answer) {
      question += `. Really dumb it down for me. Explain it like I'm 5 years-old. Don't be afraid to be a little silly and little funny.`;
      setShouldDisableButton(true);
    }

    const aiAnswer = await getAnswer(question);
    setAnswer(aiAnswer);
    incrementRequestCount();
  }

  function resetInput() {
    setAnswer("");
    setShouldDisableButton(false);
  }

  return (
    <div className="h-full w-full bg-indigo-800 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative isolate h-full min-h-screen w-full overflow-hidden  px-6 py-24 sm:px-24 xl:py-32">
          <h2 className="mx-auto max-w-2xl text-center text-4xl font-bold tracking-tight text-white sm:text-4xl">
            Tinypedia
          </h2>
          <p className="mx-auto text-center text-sm text-indigo-200">
            like Wikipedia but super simple to understand
          </p>
          <form className="mx-auto mt-10 flex max-w-md gap-x-4">
            <label htmlFor="question" className="sr-only">
              Ask me anything
            </label>
            <input
              id="question"
              name="question"
              type="text"
              required
              className="bg-indigo/5 min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-indigo-800 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder="Ask me anything"
              onChange={resetInput}
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-800 shadow-sm hover:bg-indigo-100   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={handleFormSubmit}
              disabled={shouldDisableButton}
            >
              {!answer ? "Ask" : `Explain Like I'm 5`}
            </button>
          </form>
          <div className="w-max-xl pt-12 text-white">
            <p className="text-3xl">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
