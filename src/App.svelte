<script>

	export let name;

	let count = 0;

	function handleClick(event) {
		count += 1;
	}
</script>

<style>
	h1 {
		color: purple;
	}
</style>

<h1>Hello {name}!</h1>

<button on:click={handleClick}>
Count : {count}
</button>

