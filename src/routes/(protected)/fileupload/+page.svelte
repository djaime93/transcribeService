<script>
	import { redirect } from '@sveltejs/kit';
	import axios from 'axios';
	export let data;
	let files = [];

	const startTranscription = async (upload_url) => {
		let audioUrlData = { audio_url: upload_url };
		console.log(audioUrlData);

		const response = await fetch(`https://api.assemblyai.com/v2/`, {
			method: 'POST',
			headers: {
				authorization: data.AAK,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(audioUrlData)
		});
		let dataRes = await response.json();
		console.log(dataRes.text);
	};

	let uploadFile = (file) => {
		const assembly = axios.create({
			baseURL: 'https://api.assemblyai.com/v2',
			headers: {
				authorization: data.AAK,
				'transfer-encoding': 'chunked'
			}
		});

		// console.log(assembly);
		console.log(file);

		// fs.readFile(file, (err, data) => {
		// 	if (err) return console.error(err);

		assembly
			.post('/upload', data)
			.then((res) => {
				console.log(res.data);
				startTranscription(data.upload_url);
				// throw redirect(303, '/');
			})
			.catch((err) => console.error(err));
		// });
	};

	$: {
		if (files) {
			console.log(files[0]);
		}
	}
</script>

<div class="flex justify-center items-center w-full h-screen">
	<form class="flex flex-col gap-10" method="POST" action="?/upload">
		<input type="file" accept="audio/*" name="file" bind:files />
		<button type="submit" class="bg-blue-300 px-4 py-6 rounded-2xl">submit</button>
	</form>
	<button
		type="submit"
		class="bg-blue-300 px-4 py-6 rounded-2xl"
		on:click={() => uploadFile(files[0])}>submit</button
	>
</div>
