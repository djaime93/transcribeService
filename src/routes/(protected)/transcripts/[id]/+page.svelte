<script>
	export let data;
	console.log(data);

	let wordConfidenceLimit = 0.6;
	let visibleTime = false;

	// let newarr = data.transcription.transcription.paragraphs.map((v) => ({
	// 	...v,
	// 	twClass: 'text-red-300'
	// }));

	// let newarr = data.transcription.transcription.paragraphs.map((v) => ({
	// 	...v,
	// 	twClass: 'text-red-300'
	// }));

	// $: {
	// 	visibleTime
	// }

	let toggleTime = () => {
		visibleTime = !visibleTime;
	};

	function timeConversion(duration) {
		const portions = [];

		const msInHour = 1000 * 60 * 60;
		const hours = Math.trunc(duration / msInHour);
		if (hours > 0) {
			portions.push(hours + 'h');
			duration = duration - hours * msInHour;
		}

		const msInMinute = 1000 * 60;
		const minutes = Math.trunc(duration / msInMinute);
		if (minutes > 0) {
			portions.push(minutes + 'm');
			duration = duration - minutes * msInMinute;
		}

		const seconds = Math.trunc(duration / 1000);
		if (seconds > 0) {
			portions.push(seconds + 's');
		}

		return portions.join(' ');
	}
</script>

<!-- <div> -->
<!-- {JSON.stringify(newarr[0])} -->
<!-- {JSON.stringify(data.transcription.transcription.paragraphs[0].confidence)}
	{JSON.stringify(data.transcription.transcription.paragraphs[0])}
	{JSON.stringify(data.transcription.transcription.paragraphs[0].words[0].confidence)}
	{JSON.stringify(data.transcription.transcription.confidence)}
	{JSON.stringify(data.transcription.transcription.audio_duration)} -->
<!-- </div> -->
<div class="bg-gray-100 p-6">
	<div class="flex gap-6 py-10 text-xl">
		<div>
			<div>confidence level limit</div>
			<input class="text-center rounded-2xl py-2" type="text" bind:value={wordConfidenceLimit} />
		</div>
		<div>
			<div>duration</div>
			<div>{timeConversion(data.transcription.audio_duration * 1000)}</div>
		</div>
		<div />
	</div>

	<label class="relative inline-flex items-center cursor-pointer">
		<input type="checkbox" value="" class="sr-only peer" on:click={toggleTime}/>
		<div
			class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
		/>
		<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-600">timestamps</span>
	</label>

	{#if visibleTime}
		<table class="flex flex-col gap-6 bg-white p-6 rounded-2xl">
			<thead>
				<th />
			</thead>
			{#each data.transcription.paragraphs as paragraph}
				<!-- <div>{paragraph.start}</div>
		<div>{paragraph.end}</div> -->

				<!-- <div>{paragraph.text}</div> -->
				<tbody>
					<tr class="flex justify-start hover:bg-gray-100">
						<td class="pr-6 w-40 text-end text-gray-400">{timeConversion(paragraph.start)}</td>
						<td class="flex w-full">
							<p>
								{#each paragraph.words as word}
									<span class={word.confidence <= wordConfidenceLimit ? 'text-red-600' : ''}>
										{word.text}
									</span>
									<!-- {word.confidence} -->
								{/each}
							</p>
						</td>
					</tr>
				</tbody>
			{/each}
		</table>
	{:else if !visibleTime}
		<div class="flex flex-col gap-6 bg-white p-6 rounded-2xl">
			{#each data.transcription.paragraphs as paragraph}
				<!-- <div>{paragraph.start}</div>
		<div>{paragraph.end}</div> -->

				<!-- <div>{paragraph.text}</div> -->

				<div class="flex">
					<p>
						{#each paragraph.words as word}
							<span class={word.confidence <= wordConfidenceLimit ? 'text-red-600' : ''}>
								{word.text}
							</span>
							<!-- {word.confidence} -->
						{/each}
					</p>
				</div>
			{/each}
		</div>
	{/if}
</div>
