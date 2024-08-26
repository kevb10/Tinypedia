export const baseUrl = process.env.NEXT_PUBLIC_ENV === 'local' ? 'http://localhost:3000' : "https://www.tinypedia.co";

export const generateId = (question: string) => question.toLowerCase()
	.replace(/[^a-z0-9]/g, '-')
	.replace(/-+$/, '') // Remove trailing dash
	.substring(0, 36);