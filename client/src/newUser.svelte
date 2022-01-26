<script lang="ts">
	let permitionId = 0;
    let created = false;
	function onChange(e) {
		permitionId = e.currentTarget.value;
	}
	function onSubmit(e) {
		const dbUrl = import.meta.env.VITE_BACKEND_URL;
		const UID = sessionStorage.getItem('UID');
		const password = sessionStorage.getItem('password');
		const data = {
			requestor: {
				name: UID,
				password: password
			},
			name: e.target.name.value,
			email: e.target.email.value,
			password: e.target.password.value,
			permitionId: permitionId
		};
        fetch(dbUrl + 'users/new', {
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
				} //TODO implement error display after error messaages are implemented in backend
				else{
                    console.log(data);
                }
			});
	}
</script>

<div class="wrapper">
	<form on:submit|preventDefault={onSubmit}>
		<h2>Neuer Nutzer</h2>
		<div>
			<label for="name">Name:</label>
			<input type="text" id="name" name="name" value="" />
		</div>
		<div>
			<label for="email">E-Mail:</label>
			<input type="email" id="email" name="email" value="" />
		</div>
		<div>
			<label for="password">Password:</label>
			<input type="password" id="password" name="password" value="" />
		</div>
		<form>
			<input
				type="radio"
				on:change={onChange}
				id="busl"
				name="permitions"
				checked={true}
				value="0"
			/>
			<label for="buls">Buslotse</label><br />
			<input type="radio" on:change={onChange} id="admin" name="permitions" value="1" />
			<label for="admin">Admin</label><br />
			<input type="radio" on:change={onChange} id="teacher" name="permitions" value="2" />
			<label for="teacher">Lehrer</label><br /><br />
		</form>
        {#if created}
            <h3>Nutzer erstellt</h3>
        {:else}
            <button type="submit">Senden</button>
        {/if}
		
	</form>
</div>

<style>
	.wrapper {
		padding: 2%;
		margin: 6%;
		background-color: rgb(2, 190, 103);
	}
</style>
