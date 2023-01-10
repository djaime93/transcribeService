<script>
	import TranscriptCard from '../../../components/TranscriptCard.svelte';
	/** @type {import('./$types').PageData} */
	export let data;

	let pageDetails = data.pageDetails;

	let ASSEMBLY_API_TOKEN = data.AAK;

	let queuedTranscripts = data.transcripts.filter((transcript) => transcript.status === 'queued');
	let processingTranscripts = data.transcripts.filter(
		(transcript) => transcript.status === 'processing'
	);
	let completedTranscripts = data.transcripts.filter(
		(transcript) => transcript.status === 'completed'
	);

	let transcripts = data.transcripts;

	$: {
		// console.log(transcripts);
		queuedTranscripts = transcripts.filter((transcript) => transcript.status === 'queued');
		processingTranscripts = transcripts.filter((transcript) => transcript.status === 'processing');
		completedTranscripts = transcripts.filter((transcript) => transcript.status === 'completed');
	}

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
		console.log(data.text);
	};

	const getTranscripts = async () => {
		const response = await fetch('https://api.assemblyai.com/v2/transcript', {
			method: 'GET',
			headers: {
				authorization: ASSEMBLY_API_TOKEN
			}
		});
		let data = await response.json();
		console.log(data);
		transcripts = data.transcripts;
		pageDetails = data.pageDetails;
	};

	const getTranscriptsPagination = async (url) => {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				authorization: ASSEMBLY_API_TOKEN
			}
		});
		let data = await response.json();
		console.log(data);
		transcripts = data.transcripts;
		pageDetails = data.pageDetails;
	};
</script>

<!-- <h1>{JSON.stringify(data.pageDetails)}</h1> -->
<!-- <h1>{JSON.stringify(data.transcripts)}</h1> -->

<div>
	<div>
		<button on:click={() => getTranscriptsPagination(data.pageDetails.prev_url)}>previous</button>
		<button on:click={() => getTranscriptsPagination(data.pageDetails.next_url)}>next</button>
	</div>
</div>

<!-- {#each queuedTranscripts as transcript}
    <TranscriptCard transcript={transcript} aak={data.AAK}/>
{/each}
{#each processingTranscripts as transcript}
    <TranscriptCard transcript={transcript} aak={data.AAK}/>
{/each}
{#each completedTranscripts as transcript}
    <TranscriptCard transcript={transcript} aak={data.AAK}/>
{/each} -->

<table class="flex flex-col p-6 gap-2 bg-gray-100">
	<!-- <thead>
		<tr>
			<th>id</th>
			<th>id</th>
			<th>id</th>
			<th>id</th>
		</tr>
	</thead> -->
	<tbody>
		{#each queuedTranscripts as transcript}
			<tr class="flex p-6 hover:bg-gray-300 w-full justify-between bg-white my-2 rounded-2xl">
				<td> <a href="transcripts/{transcript.id}"> {transcript.id}</a></td>
				<td class="bg-yellow-400 py-2 px-2 rounded-xl">{transcript.status}</td>
				<td>
					<div>{transcript.created}</div>
					<div>{transcript.completed}</div>
				</td>
				<td class="flex gap-2 items-center">
					<button
						class="bg-blue-300 py-2 px-6 rounded-xl"
						on:click={() => startTranscription(transcript.audio_url)}>Transcibe</button
					>
					<a href="transcripts/{transcript.id}">
						<img class="h-6" src="/icons/open.png" alt="" />
					</a>
				</td>
			</tr>
		{/each}

		{#each processingTranscripts as transcript}
			<tr class="flex p-6 hover:bg-gray-300 w-full justify-between bg-white my-2 rounded-2xl">
				<td> <a href="transcripts/{transcript.id}"> {transcript.id}</a></td>
				<td class="bg-red-400 py-2 px-2 rounded-xl">{transcript.status}</td>
				<td>
					<div>{transcript.created}</div>
					<div>{transcript.completed}</div>
				</td>
				<td class="flex gap-2 items-center">
					<button class="bg-blue-300 py-2 px-6 rounded-xl" on:click={getTranscripts}
						>Check Status</button
					>
					<a href="transcripts/{transcript.id}">
						<img class="h-6" src="/icons/open.png" alt="" />
					</a>
				</td>
			</tr>
		{/each}

		{#each completedTranscripts as transcript}
			<tr class="flex p-6 hover:bg-gray-300 w-full justify-between bg-white my-2 rounded-2xl">
				<td> <a href="transcripts/{transcript.id}"> {transcript.id}</a></td>
				<td class="bg-green-400 py-2 px-2 rounded-xl">{transcript.status}</td>
				<td>
					<div>{transcript.created}</div>
					<div>{transcript.completed}</div>
				</td>
				<td class="flex gap-2 items-center">
					<button
						class="bg-gray-300 py-2 px-6 rounded-xl"
						on:click={() => getTranscript(transcript.id)}
					>
						<img class="h-6" src="/icons/download (7).png" alt="" />
					</button>
					<a href="transcripts/{transcript.id}">
						<img class="h-6" src="/icons/open.png" alt="" />
					</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<!-- <div class="flex flex-col p-6 gap-2 bg-gray-100">
	{#each queuedTranscripts as transcript}
		<div class="flex p-6 hover:bg-gray-300 w-full justify-between bg-white rounded-2xl">
			<div>{transcript.id}</div>
			<div class="bg-yellow-400 py-2 px-2 rounded-xl">{transcript.status}</div>
			<div>
				<div>{transcript.created}</div>
				<div>{transcript.completed}</div>
			</div>
			<div>
				<button
					class="bg-blue-300 py-2 px-6 rounded-xl"
					on:click={() => startTranscription(transcript.audio_url)}>Transcibe</button
				>
				<a href="transcripts/{transcript.id}">more details</a>
			</div>
		</div>
	{/each}

	{#each processingTranscripts as transcript}
		<div class="flex p-6 hover:bg-gray-300 w-full justify-between bg-white rounded-2xl">
			<div>{transcript.id}</div>
			<div class="bg-red-400 py-2 px-2 rounded-xl">{transcript.status}</div>
			<div>
				<div>{transcript.created}</div>
				<div>{transcript.completed}</div>
			</div>
			<div>
				<button class="bg-blue-300 py-2 px-6 rounded-xl" on:click={getTranscripts}
					>Check Status</button
				>
				<a href="transcripts/{transcript.id}">more details</a>
			</div>
		</div>
	{/each}

	{#each completedTranscripts as transcript}
		<div class="flex p-6 hover:bg-gray-300 w-full justify-between bg-white rounded-2xl">
			<div>{transcript.id}</div>
			<div class="bg-green-400 py-2 px-2 rounded-xl">{transcript.status}</div>
			<div>
				<div>{transcript.created}</div>
				<div>{transcript.completed}</div>
			</div>
			<div>
				<button
					class="bg-blue-300 py-2 px-6 rounded-xl"
					on:click={() => getTranscript(transcript.id)}>Get Transcipt</button
				>
				<a href="transcripts/{transcript.id}">more details</a>
			</div>
		</div>
	{/each}
</div> -->
