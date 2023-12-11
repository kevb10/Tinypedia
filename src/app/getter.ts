
import { type TinypediaAnswer } from "./types";
import { baseUrl } from "./utils";

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