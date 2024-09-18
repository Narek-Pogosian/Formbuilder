import { getLatestAnswers } from "@/server/data-access/form";

async function Answers({ id }: { id: string }) {
  const answers = await getLatestAnswers(id);

  return (
    <ul className="grid gap-8 md:grid-cols-2">
      {answers.map((a) => {
        // eslint-disable-next-line
        const obj = JSON.parse(a.answers?.toString() ?? "") as Record<
          string,
          string
        >;

        return (
          <li key={a.id} className="shadow-card space-y-1 rounded p-4">
            <p className="mb-3 text-sm text-foreground-muted">
              {a.createdAt.toLocaleDateString()}
            </p>
            {Object.entries(obj).map(([key, value]) => (
              <p key={key} className="text-sm">
                <span className="mr-2 font-semibold">{key}:</span>
                <span>{value}</span>
              </p>
            ))}
          </li>
        );
      })}
    </ul>
  );
}

export default Answers;
