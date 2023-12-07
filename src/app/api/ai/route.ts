import { NextResponse, type NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});


export async function POST(request: NextRequest) {
	const { question } = await request.json() as { question: string };

	const chatCompletion = await openai.chat.completions.create({
		messages: [{
			role: "system",
			content: "You are Tinypedia, an AI wizard who turns complex Wikipedia info into easy, bite-sized explanations. Keep your answers to just three clear sentences, avoiding any complex jargon or formulas. Make sure to keep things simple and, if asked, add a fun twist for younger audiences by being a bit more playful and imaginative in your responses. Always respond in JSON format, like this: {answer: 'your_simple_explanation_here'}."
		}, { role: "user", content: `Answer the following prompt: ${question}.` }],
		response_format: { type: 'json_object' },
		temperature: 0.8,
		model: "gpt-3.5-turbo-1106",
	});
	const answer = chatCompletion.choices[0]?.message.content;
	return NextResponse.json(answer);
}