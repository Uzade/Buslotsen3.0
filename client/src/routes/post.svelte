<script lang="ts">
	import { goto } from '$app/navigation';
	import { authorId } from '../store';
	if (typeof window !== 'undefined') {
		const UID = sessionStorage.getItem('UID');
		const password = sessionStorage.getItem('password');

		if (!UID || !password) {
			goto('/login', {replaceState: true});
		}
	}

	let created = false;
	let error = '';

	function onSubmit(e) {
		const dbUrl = import.meta.env.VITE_BACKEND_URL;
        const UID = sessionStorage.getItem('UID');
		const password = sessionStorage.getItem('password');
		const data = {
			requestor: {
				name: UID,
				password: password
			},
			suspect: e.target.suspect.value,
			school: e.target.schule.value,
			class: e.target.class.value,
			time: e.target.time.value,
			location: e.target.location.value,
			incident: e.target.incident.value,
			authorId: $authorId

		};

		fetch(dbUrl + 'entries/new', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.request.status == 'done') {
					created = true;
					error = '';
				} //TODO implement error display after error messaages are implemented in backend
				else{
                    console.log(data);
                }
			});
	}
</script>

<div>
	<form on:submit|preventDefault={onSubmit}>
		<div>
			<label for="suspect">Täter:</label>
            <input
            type="text"
            id="suspect"
            name="suspect"
            value=""
        />
    	</div>
		<div>
			<label for="schule">Schule:</label>
			<input
                type="text"
                id="schule"
                name="schule"
                value=""
            />
		</div>
		<div>
			<label for="class">Klasse:</label>
			<input
                type="text"
                id="class"
                name="class"
                value=""
            />
		</div>
		<div>
			<label for="time">Uhrzeit:</label>
			<input type="datetime-local" id="time"
       			name="time" value="{new Date()}"
			/>
		</div>
		<div>
			<label for="name">Ort</label>
			<input
                type="text"
                id="location"
                name="location"
                value=""
            />
		</div>
		<div>
			<label for="name">Vorfall</label>
			<input
                type="text"
                id="incident"
                name="incident"
                value=""
            />
		</div>
		<button type="submit">Submit</button>
		{#if created}
			<h4>Entry sucessfully created</h4>
		{/if}
	</form>
</div>

<style>
    
</style>
