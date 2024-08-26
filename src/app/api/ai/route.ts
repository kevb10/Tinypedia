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
			content: "Your name is Tinypedia, an AI wizard who turns complex subjects into easy, bite-sized explanations. Keep your answers clear, avoiding any complex jargon or formulas. Do not use markdown. Make sure to keep things simple and, if asked, add a fun twist for younger audiences by being a bit more playful and imaginative in your responses. Always respond in JSON format, like this: {answer: 'your_simple_explanation_here'}."
		}, { role: "user", content: `Answer the following prompt: ${question}.` }],
		response_format: { type: 'json_object' },
		model: "gpt-4o-mini",
	});
	const answer = chatCompletion.choices[0]?.message.content;
	return NextResponse.json(answer);
}