
import { type TinypediaAnswer } from "./type";

const baseUrl = process.env.NEXT_PUBLIC_ENV === 'local' ? 'http://localhost:3001' : "https://tinypedia-d04xa503p-kevb10.vercel.app";

export async function getAnswer(question: string): Promise<string> {
	const response = await fetch(baseUrl + "/api/ai", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ question }),
	});
	const answerStringJSON = await response.json() as string;
	const { answer } = JSON.parse(answerStringJSON) as TinypediaAnswer;
	return answer;
}