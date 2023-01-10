import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const load: PageServerLoad = async ({ locals }) => {
	console.log(locals);
};

export const actions: Actions = {
	login: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		const password = data.get('password');
		console.log(password);
		console.log(locals);
		if (password === env.PUBLIC_MAIN_PASSWORD) {
			cookies.set('auth', 'regularusertoken', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7
			});
			cookies.set('token', env.PUBLIC_ASSEMBLY_API_TOKEN, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 7
			});
			throw redirect(303, '/');
		} else {
			error(404, 'Incorrect Password');
			console.log('incorrect');
		}
	},
	logout: async ({ cookies, request, locals }) => {
		cookies.delete('auth');
	}
};
