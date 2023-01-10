import type { Handle } from '@sveltejs/kit';
import { authenticateUser } from './lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = authenticateUser(event);
	if (event.locals.user) {
		event.locals.assemblyApiKey = 'ddbcf5b8719d4b62b068dd160447fdec';
	} else {
		event.locals.assemblyApiKey = null;
	}

	const response = await resolve(event);

	return response;
};
// export const handle: Handle = async ({ event, resolve }) => {
// 	event.locals.user = authenticateUser(event);

// 	const response = await resolve(event);

// 	return response;
// };
