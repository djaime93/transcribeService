import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

export const load: PageServerLoad = async ({ locals }) => {

	let ASSEMBLY_API_KEY = locals.assemblyApiKey
	return { AAK: ASSEMBLY_API_KEY}
};

export const actions: Actions = {
	upload: async ({ cookies, request, locals }) => {
		const data = await request.formData();
		const file = data.get('file');

		// fs.readFile()
		// const response = await fetch(
		//     'https://api.assemblyai.com/v2',
		//     {
		//         method: 'POST',
		//         headers: {
		//             authorization: env.PUBLIC_ASSEMBLY_API_TOKEN,
		//             'transfer-encoding': 'chunked'
		//         }
		//     }
		// );

		// const axios = require('axios');
		// const fs = require('fs');
		const assembly = axios.create({
			baseURL: 'https://api.assemblyai.com/v2',
			headers: {
				authorization: env.PUBLIC_ASSEMBLY_API_TOKEN,
				'transfer-encoding': 'chunked'
			}
		});

		// console.log(assembly);
		console.log(file);

		// fs.readFile(file, (err, data) => {
		// 	if (err) return console.error(err);

		// 	assembly
		// 		.post('/upload', data)
		// 		.then((res) => console.log(res.data))
		// 		.catch((err) => console.error(err));
		// });
	}
};
