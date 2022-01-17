<script>
	if (typeof window !== 'undefined') {
		const UID = sessionStorage.getItem('UID');
		const password = sessionStorage.getItem('password');

		if (!UID || !password) {
			window.location.href = 'http://localhost:3000/login';
		}
	}

	import Entry from '../entry.svelte';

	let entries = [];
	fetch('http://localhost:8080/entries/all', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			requestor: {
				name: 'KarlHeinz',
				password: 'test12345'
			}
		})
	})
		.then((response) => response.json())
		.then((data) => {
			entries = data.data;
			//console.log(entries);
		});
	//$: console.log(entries);
</script>

<div>
	{#each entries as entry}
		<Entry author={entry.author.name} message={entry.title} createdAt={entry.createdAt} />
	{:else}
		<p>loading...</p>
	{/each}
</div>

<style>
</style>
