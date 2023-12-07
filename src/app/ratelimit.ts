// Rate limit the current user to 10 requests per minute

const RATE_LIMIT_KEY = 'rateLimit';
const MAX_REQUESTS = 10;
const TIME_WINDOW = 60 * 1000; // 1 minute in milliseconds

export function isRateLimited(): boolean {
	const rateLimitData = localStorage.getItem(RATE_LIMIT_KEY);
	if (rateLimitData) {
		const { timestamp, count } = JSON.parse(rateLimitData);
		const currentTime = Date.now();
		if (currentTime - timestamp < TIME_WINDOW && count >= MAX_REQUESTS) {
			return true;
		}
	}
	console.log(rateLimitData)
	return false;
}

export function incrementRequestCount(): void {
	const rateLimitData = localStorage.getItem(RATE_LIMIT_KEY);
	if (rateLimitData) {
		const { timestamp, count } = JSON.parse(rateLimitData);
		const currentTime = Date.now();
		if (currentTime - timestamp < TIME_WINDOW) {
			if (count >= MAX_REQUESTS) {
				throw new Error('Rate limit exceeded');
			}
			localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ timestamp, count: count + 1 }));
			return;
		}
	}
	localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ timestamp: Date.now(), count: 1 }));
}
