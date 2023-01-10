<script>
	import { PUBLIC_ASSEMBLY_API_TOKEN } from '$env/static/public';

	export let transcript;
	export let aak;

	let ASSEMBLY_API_TOKEN = aak;

	const startTranscription = async (upload_url) => {
		let audioUrlData = { audio_url: upload_url };
		console.log(audioUrlData);

		// const response = await fetch(`https://api.assemblyai.com/v2/`, {
		// 	method: 'POST',
		// 	headers: {
		// 		authorization: ASSEMBLY_API_TOKEN,
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify(audioUrlData)
		// });
		// let data = await response.json();
		// console.log(data.text);
	};

	const getTranscript = async (id) => {
		const response = await fetch(`https://api.assemblyai.com/v2/transcript/${id}`, {
			method: 'GET',
			headers: {
				authorization: ASSEMBLY_API_TOKEN
			}
		});
		let data = await response.json();
	};

	const getTranscripts = async () => {
		const response = await fetch('https://api.assemblyai.com/v2/transcript', {
			method: 'GET',
			headers: {
				authorization: ASSEMBLY_API_TOKEN
			}
		});
		let data = await response.json();
		transcripts = data.transcripts;
		pageDetails = data.pageDetails;
	};
</script>

<div class="p-6 hover:bg-gray-300">
	<!-- <div>{JSON.stringify(transcript)}</div> -->
	<div>{transcript.id}</div>
	<div>{transcript.resource_url}</div>
	<div>{transcript.status}</div>
	<div>{transcript.created}</div>
	<div>{transcript.completed}</div>
	<div>{transcript.audio_url}</div>

	{#if transcript.status === 'queued'}
		<button class="bg-blue-300" on:click={() => startTranscription(transcript.audio_url)}
			>Start Transciption</button
		>
	{:else if transcript.status === 'processing'}
		<button class="bg-blue-300" on:click={getTranscripts}>Check Status</button>
	{:else if transcript.status === 'completed'}
		<button class="bg-blue-300" on:click={() => getTranscript(transcript.id)}>Get transcript</button
		>
	{/if}
	<a href="transcripts/{transcript.id}">more details</a>
</div>
