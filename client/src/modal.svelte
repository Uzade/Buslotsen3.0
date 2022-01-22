<script lang="ts">
	import { modalNumber, modalPostId } from './store';

	export let suspect;
	export let school;
	export let time;
	export let location;
	export let incident;
	export let author;
	export let klasse;

	const UID = sessionStorage.getItem('UID');
	const password = sessionStorage.getItem('password');

	function deleteEntry(entry: Number) {
		const dbUrl = import.meta.env.VITE_BACKEND_URL;
		const data = {
			requestor: {
				name: UID,
				password: password
			},
			id: entry
		};

		fetch(dbUrl + 'entries/delete', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(() => $modalNumber = null)
	}
</script>

<div class="modal-container" on:click={() => ($modalNumber = null)}>
	<div class="modal" on:click|stopPropagation>
		<h1>Vorfall: {incident}</h1>
		<h2>Name: {suspect}</h2>
		<h4>aus der Klasse {klasse} der {school}</h4>
		<p>Der Vorfall hat sich {location} um {time} abgespielt</p>
		<p>gemeldet von {author}</p>
		<button id="close" on:click={() => ($modalNumber = null)}> X </button>
		<button on:click={() => deleteEntry($modalPostId)}> Löschen </button>
	</div>
</div>

<style>
	* {
		box-sizing: border-box;
	}
	.modal-container {
		background-color: rgba(0, 0, 0, 0.3);
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal {
		background-color: white;
		border-radius: 5px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		padding: 2vh 4vw;
		color: black;
		max-width: 90vw;
	}
</style>
