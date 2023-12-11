import { type NextRequest, NextResponse } from "next/server";
import { getAllQAs, getQAById, insertQA } from "~/app/supabase";

export async function GET(request: NextRequest) {
	const queryParam = request.nextUrl.searchParams
	const questionId = queryParam.get('id');

	if (questionId) {
		const data = await getQAById(questionId);
		return NextResponse.json(data);
	}

	const data = await getAllQAs(4);
	return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
	const payload = await request.json();

	const data = await insertQA(payload.question, payload.answer);
	return NextResponse.json(data);
}