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

<div class="login">
	<form on:submit|preventDefault={onSubmit}>
		<div>
			<input type="text" id="UID" name="UID" value="" placeholder="Username" />
		</div>
		<div>
            <br>
			<input type="password" id="password" name="password" value="" placeholder="Password" />
		</div>
		<div class="center">
			<button type="submit">Absenden</button>
		</div>		
	</form>
</div>

<style>
.login{
	display: flex;
	justify-content: center;
	margin-top: 15vh;
}
button{
        all: unset;
        margin: 3px;
        text-decoration: none;
        padding: 0.7rem;
        background-image: linear-gradient(to bottom right, rgb(15, 184, 218), rgb(34, 143, 57));
        color: aliceblue;
    }
.center{
	display: flex;
	justify-content: center;
	margin-top: 3vh;
}
input{
	all: unset;
	position: relative;
	font-size: 3vh;
	background: linear-gradient(to bottom right, rgb(50, 218, 86),rgb(9, 183, 216) );
	padding: 3px;
	border-radius:5vw ;
	text-align: center;
}
::placeholder{
	color: floralwhite;
}
</style>
