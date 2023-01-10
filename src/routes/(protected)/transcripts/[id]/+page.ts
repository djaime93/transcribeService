import { env } from '$env/dynamic/public';

export const load = ({ fetch, params, locals }) => {
	console.log(params);

	let ASSEMBLY_API_TOKEN = env.PUBLIC_ASSEMBLY_API_TOKEN;
	console.log(ASSEMBLY_API_TOKEN);

	const getTranscript = async (id) => {
		// const response = await fetch(`https://api.assemblyai.com/v2/transcript/${id}`, {
		// 	method: 'GET',
		// 	headers: {
		// 		authorization: ASSEMBLY_API_TOKEN
		// 	}
		// });
		const response = await fetch(`https://api.assemblyai.com/v2/transcript/${id}/paragraphs`, {
			method: 'GET',
			headers: {
				authorization: env.PUBLIC_ASSEMBLY_API_TOKEN
			}
		});
		// const response = await fetch(`https://api.assemblyai.com/v2/transcript/${id}/sentences`, {
		// 	method: 'GET',
		// 	headers: {
		// 		authorization: ASSEMBLY_API_TOKEN
		// 	}
		// });
		let data = await response.json();
		return data;
	};

	return {
		transcription: getTranscript(params.id)
	};
};
