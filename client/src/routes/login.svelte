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
<<<<<<< HEAD
			<input type="text" id="UID" name="UID" value="" placeholder="Username" />
		</div>
		<div>
            <br>
			<input type="password" id="password" name="password" value="" placeholder="Password" />
=======
			<label for="name">Username</label> <br />
			<input type="text" id="UID" name="UID" value="" />
		</div>
		<div class="moin">
			<label for="name">Password</label> <br />
			<input type="password" id="password" name="password" value="" />
>>>>>>> 660e2a0655473f965989525ec1abfcf924d176f4
		</div>
		<div class="center">
			<button type="submit">Absenden</button>
		</div>		
	</form>
</div>

<style>
<<<<<<< HEAD
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
        background-image: linear-gradient(to bottom right, rgb(255, 23, 100), rgb(204, 28, 131));
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
	background: darkmagenta;
	padding: 3px;
	border-radius:5vw ;
	text-align: center;
	color: rgb(255, 255, 255);
}
=======
>>>>>>> 660e2a0655473f965989525ec1abfcf924d176f4
</style>
