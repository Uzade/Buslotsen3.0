<script>
	export let id;
	export let email;
	export let name;
	export let permitionId;
    let deleted = false;
	let permitionTxt;
	if (permitionId == 0) {
		permitionTxt = 'Buslotse';
	} else if (permitionId == 1) {
		permitionTxt = 'Admin';
	} else if (permitionId == 2) {
		permitionTxt = 'Lehrer';
	}

    function deleteUser(id){
        const dbUrl = import.meta.env.VITE_BACKEND_URL;
        const UID = sessionStorage.getItem('UID');
	    const password = sessionStorage.getItem('password');
		const data = {
			requestor: {
				name: UID,
				password: password
			},
			id: id
		};

		fetch(dbUrl + 'users/delete', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(() => deleted = true);
    }
</script>

<div class="wrapper">
	<div class="text">
		<div class="top">
			<h2 class="name">{name}</h2>
			<p class="id">Id: {id}</p>
		</div>
		<div class="bottom">
			<h4>{email}</h4>
			<h4>Rechte: {permitionTxt}</h4>
		</div>
	</div>
    <div class="button">
        {#if deleted}
             <h3>gelöscht</h3>
        {:else}
            <button on:click={() => deleteUser(id)}>Löschen</button>
        {/if}
    </div>
</div>

<style>
	.top,
	.bottom {
		margin: 0vw 5vw;
		display: flex;
		justify-content: space-between;
	}
	.wrapper {
        display: flex;
		margin: 6%;
		padding: 2%;
		background-image: linear-gradient(to bottom right, rgb(255, 23, 100), rgb(204, 28, 131));
		/*background: url(https://cdn.discordapp.com/attachments/631511256552964107/934516227576041502/unknown.png);*/
	}
</style>
