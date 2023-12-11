import { baseUrl } from "~/app/utils";
import Card from "~/components/card";

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
