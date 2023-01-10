import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	console.log(locals);
	if (!locals.user) {
		throw redirect(303, '/signin');
	}
};

export const actions: Actions = {
	login: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		const password = data.get('password');
		console.log(password);
		console.log(locals);
		cookies.set('auth', 'regularusertoken', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60
			// maxAge: 60 * 60 * 24 * 7,
		});

		throw redirect(303, '/');
	},
	logout: async ({ cookies, request, locals }) => {
		cookies.set('auth', '', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60
			// maxAge: 60 * 60 * 24 * 7,
		});
	}
};
