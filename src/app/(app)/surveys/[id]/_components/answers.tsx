import { getAnswers } from "@/server/data-access/form";

async function Answers({ id }: { id: string }) {
  const answers = await getAnswers(id);
  return <div>{JSON.stringify(answers, null, 2)}</div>;
}

export default Answers;
