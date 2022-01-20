<script lang="ts">
	if (typeof window !== 'undefined') {
		const UID = sessionStorage.getItem('UID');
		const password = sessionStorage.getItem('password');

		if (!UID || !password) {
			window.location.href = 'http://localhost:3000/login';
		}
	}

	let created = false;
	let error = '';

	function onSubmit(e) {
        const UID = sessionStorage.getItem('UID');
		const password = sessionStorage.getItem('password');
		const data = {
			requestor: {
				name: UID,
				password: password
			},
			title: e.target.title.value,
			authorId: Number(e.target.id.value)
		};

		fetch('http://localhost:8080/entries/new', {
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
				/*else if(data.request.status == 'error'){
                    created = true;
                    error = "";
                }*/
			});
	}
</script>

<div>
	<form on:submit|preventDefault={onSubmit}>
		<div>
			<label for="name">Titel:</label>
            <input
            type="text"
            id="title"
            name="title"
            value=""
        />
    	</div>
		<div>
			<label for="name">Authornummer:</label>
			<input
                type="number"
                id="id"
                name="id"
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
