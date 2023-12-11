
import { createClient } from '@supabase/supabase-js'
import { generateId } from './utils'

const supabaseUrl = 'https://vtvxswtherggiwyrzxvn.supabase.co'
const supabaseKey = process.env.SUPABASE_API_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)
console.log(supabaseKey)
export async function getAllQAs(limit?: number, orderBy?: string) {
	const { data, error } = await supabase
		.from('qa')
		.select()
		.limit(limit ?? 10)
		.order(orderBy ?? 'created_at', { ascending: false });

	if (error) throw error;

	return data;
}

export async function insertQA(question: string, answer: string) {
	const id = generateId(question);

	const { data, error } = await supabase
		.from('qa')
		.insert([{ id, question, answer }]);

	if (error) throw error;

	return data;
}

export async function getQAById(id: string) {
	const { data, error } = await supabase
		.from('qa')
		.select()
		.eq('id', id)
		.single();

	if (error) throw error;

	return data;
}