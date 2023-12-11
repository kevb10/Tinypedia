import { type QA } from "~/app/types";
import { baseUrl } from "~/app/utils";
import Card from "~/components/card";

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const QAs = await fetch(baseUrl + "/api/db").then((res) => res.json());

  return QAs.map((QA: QA) => ({
    id: QA.id,
  }));
}

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  const qa = await fetch(baseUrl + `/api/db?id=${id}`).then((res) =>
    res.json(),
  );

  return {
    title: `Tinypedia - ${qa.question}`,
    description: qa.answer,
    googleBot: {
      index: true,
      follow: false,
    },
  };
}

export default async function QuestionPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const qa = await fetch(baseUrl + `/api/db?id=${id}`).then((res) =>
    res.json(),
  );

  return (
    <div className="pt-5 text-lg text-white">
      <Card {...qa} />
    </div>
  );
}
