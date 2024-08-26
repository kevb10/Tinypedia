// Rate limit the current user to 10 requests per minute

const RATE_LIMIT_KEY = 'rateLimit';
const RATE_LIMITED_COUNT_KEY = 'ratedLimitedCount';
const MAX_REQUESTS = 10;
const TIME_WINDOW = 60 * 1000; // 1 minute in milliseconds
const maxRateLimitedCount = 3;

export function isRateLimited(): boolean {
	const rateLimitData = localStorage.getItem(RATE_LIMIT_KEY);
	const rateLimitedCountData = localStorage.getItem(RATE_LIMITED_COUNT_KEY);
	if (rateLimitData) {
		const { timestamp, count } = JSON.parse(rateLimitData);
		const currentTime = Date.now();
		if (currentTime - timestamp < TIME_WINDOW && count >= MAX_REQUESTS) {
			return true;
		}
	}

	const rateLimitedCount = rateLimitedCountData ? parseInt(rateLimitedCountData) : 0;

	if (rateLimitedCount >= maxRateLimitedCount) {
		return true
	}

	return false;
}

export function incrementRequestCount(): void {
	const rateLimitData = localStorage.getItem(RATE_LIMIT_KEY);
	const rateLimitedCountData = localStorage.getItem(RATE_LIMITED_COUNT_KEY);
	if (rateLimitData) {
		const { timestamp, count } = JSON.parse(rateLimitData);
		const currentTime = Date.now();
		if (currentTime - timestamp < TIME_WINDOW) {
			if (count >= MAX_REQUESTS) {
				const rateLimitedCount = rateLimitedCountData ? parseInt(rateLimitedCountData) : 0;
				localStorage.setItem(RATE_LIMITED_COUNT_KEY, (rateLimitedCount + 1).toString());
				throw new Error('Rate limit exceeded');
			}
			localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ timestamp, count: count + 1 }));
			return;
		}
	}
	localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ timestamp: Date.now(), count: 1 }));
}
