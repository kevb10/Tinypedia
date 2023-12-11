import { type MetadataRoute } from 'next'
import { getAllQAs } from './supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap[]> {
	const qas = await getAllQAs(100000000);
	const urls = qas.map(qa => ({
		url: `https://www.tinypedia.co/q/${qa.id}`,
		lastModified: new Date(qa.created_at),
		changeFrequency: 'daily',
		priority: 0.7,
	})) as any;
	return [
		{
			url: `https://www.tinypedia.co`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		...urls
	]
}