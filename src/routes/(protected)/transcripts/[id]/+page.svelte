<script>
	export let data;
	console.log(data);

	let wordConfidenceLimit = 0.6;

	// let newarr = data.transcription.transcription.paragraphs.map((v) => ({
	// 	...v,
	// 	twClass: 'text-red-300'
	// }));

	// let newarr = data.transcription.transcription.paragraphs.map((v) => ({
	// 	...v,
	// 	twClass: 'text-red-300'
	// }));
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
	</div>

	<table class="flex flex-col gap-6 bg-white p-6 rounded-2xl">
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
</div>
