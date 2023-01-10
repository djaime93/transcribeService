<script>
	const style = {
		wrapper: `w-full h-screen flex justify-center items-center flex-col gap-6 text-4xl`,
		inputPass: `focus:outline-none text-center`
	};

	let password = '';
</script>

<div class={style.wrapper}>
	<div class="flex text-center">Enter:</div>
	<form method="POST" action="?/login">
		<input bind:value={password} class={style.inputPass} type="password" name="password" autofocus />
	</form>

</div>
