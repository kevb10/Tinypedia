"use client";

import { getAnswer } from "./getter";
import { useState } from "react";
import { incrementRequestCount, isRateLimited } from "./ratelimit";

import Card from "~/components/card";
import useSWR from "swr";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { type QA } from "./types";

export default function Main() {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [shouldDisableButton, setShouldDisableButton] = useState(false);

  const { data: last4QAs } = useSWR("/api/db", (url) =>
    fetch(url).then((res) => res.json()),
  );

  async function handleFormSubmit(event: any) {
    if (isRateLimited()) {
      alert("Slow down lol. try again in 30 seconds.");
      return;
    }

    event.preventDefault();
    const question = event.target?.form.question.value;
    if (!question) return;

    // if (answer) {
    //   question += `. Really dumb it down for me. Explain it like I'm 5 years-old. Don't be afraid to be a little silly and little funny.`;
    //   setShouldDisableButton(true);
    // }

    const aiAnswer = await getAnswer(question);
    setAnswer(aiAnswer);
    setQuestion("");
    incrementRequestCount();
    await fetch("/api/db", {
      method: "POST",
      body: JSON.stringify({ question, answer: aiAnswer }),
    });
  }

  function resetInput() {
    setAnswer("");
    setShouldDisableButton(false);
    setQuestion("");
  }

  return (
    <>
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
          value={question}
          placeholder="Ask me anything"
          onChange={(event) => setQuestion(event.target.value)}
        />
        <div className="flex flex-inline gap-x-4">
        <button
          type="submit"
          className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-800 shadow-sm hover:bg-indigo-100   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={handleFormSubmit}
          disabled={shouldDisableButton}
        >
          Ask
        </button>
        {!!answer || !!(answer && question) && (
        <button
          type="button"
          className="flex flex-inline gap-x-2 p-2 items-center rounded-md text-white shadow-sm outline outline-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={resetInput}
        >
          <ArrowPathIcon className="h-5 w-5" />
          Clear
        </button>
        )}
        </div>
      </form>
      {!answer ? (
        <div className="pt-10">
          <p className="text-md text-center font-medium text-indigo-200">
            Recently asked:
          </p>
          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
            {last4QAs?.map((qa: QA, index: number) => <Card key={index} {...qa} />)}
          </div>
        </div>
      ) : (
        <div className="w-max-xl pt-12 text-white">
          <p className="text-3xl">{answer}</p>
        </div>
      )}
    </>
  );
}
