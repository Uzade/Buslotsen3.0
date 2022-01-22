<script>
	import { isAdmin } from '../store'
	function onSubmit(e) {
		const dbUrl = import.meta.env.VITE_BACKEND_URL;
		const data = {
			name: e.target.UID.value,
			password: e.target.password.value
		};

		fetch(dbUrl + 'users/login/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.request.status == 'done') {
					console.log('Logged in!');
					sessionStorage.setItem('UID', e.target.UID.value);
					sessionStorage.setItem('password', e.target.password.value);
					if(data.data.permitionId = 1){
						$isAdmin = true;
					}
					window.location.href = 'http://localhost:3000/';
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
			<label for="name">Username</label> <br />
			<input type="text" id="UID" name="UID" value="" />
		</div>
		<div class="moin">
			<label for="name">Password</label> <br />
			<input type="password" id="password" name="password" value="" />
		</div>
		<button type="submit">Submit</button>
	</form>
</div>

<style>
</style>
