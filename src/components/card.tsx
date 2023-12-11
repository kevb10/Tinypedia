import { type QA } from "~/app/types";
import { generateId } from "~/app/utils";

export default function Card({ id, question, answer }: QA) {
  return (
    <div
      key={generateId(question)}
      className="relative flex content-start items-start  space-x-3 rounded-lg border border-indigo-500 bg-none px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-indigo-200"
    >
      <div className="min-w-0 flex-1">
        <a href={`/q/${id}`} className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-md font-medium capitalize text-indigo-300">
            {question}
          </p>
          <p className="pt-5 text-sm text-indigo-50">{answer}</p>
        </a>
      </div>
    </div>
  );
}
