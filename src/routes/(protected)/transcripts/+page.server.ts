import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

export const load: PageServerLoad = async ({ locals }) => {

	const response = await fetch('https://api.assemblyai.com/v2/transcript', {
		method: 'GET',
		headers: {
			authorization: env.PUBLIC_ASSEMBLY_API_TOKEN
		}
	});

	let data = await response.json();

	let ASSEMBLY_API_KEY = locals.assemblyApiKey;

	console.log(data);
	return { transcripts: data.transcripts, pageDetails: data.page_details, AAK: ASSEMBLY_API_KEY };
};
