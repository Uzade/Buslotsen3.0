<script>
	import Entry from '../entry.svelte';
	import Modal from '../modal.svelte';
	import { modalNumber } from '../store'

	let entries = [];
	if (typeof window !== 'undefined') {
		const UID = sessionStorage.getItem('UID');
		const password = sessionStorage.getItem('password');

		if (!UID || !password) {
			window.location.href = 'http://localhost:3000/login';
		}
	

	fetch('http://localhost:8080/entries/all', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			requestor: {
				name: UID,
				password: password
			}
		})
	})
		.then((response) => response.json())
		.then((data) => {
			entries = data.data;
			for (const index in entries) {
				if (entries[index].suspect) {
					entries[index].message = entries[index].suspect + ' ' + entries[index].incident;
				} else {
					if (entries[index].school) {
						entries[index].message =
							'Ein Schüler der ' + entries[index].school + ' ' + entries[index].incident;
					} else {
						entries[index].message = 'Ein Schüler ' + entries[index].incident;
					}
				}
			}
			//console.log(entries);
		});
	}
</script>

<div>
	{#if $modalNumber}
		<Modal
			suspect={entries[$modalNumber].suspect}
			school={entries[$modalNumber].school}
			time={entries[$modalNumber].time}
			location={entries[$modalNumber].location}
			incident={entries[$modalNumber].message}
			author={entries[$modalNumber].author.name}
			klasse={entries[$modalNumber].class}
		/>
	{/if}

	{#each entries as entry,i}
		<div on:click={() => $modalNumber = i}>
			<Entry
				author={entry.author.name}
				message={entry.message} 
				createdAt={entry.createdAt} 
			/>
		</div>
	{:else}
		<p>loading...</p>
	{/each}
</div>

<style>
</style>
