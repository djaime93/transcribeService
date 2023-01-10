import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	console.log(locals);
	cookies.delete('auth');
	throw redirect(303, '/signin');
};
