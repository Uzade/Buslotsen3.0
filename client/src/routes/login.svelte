<script>
	import { isAdmin, authorId } from '../store'
	import { goto } from '$app/navigation';

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
					sessionStorage.setItem('UID', e.target.UID.value);
					sessionStorage.setItem('password', e.target.password.value);
					$authorId = data.data.userId;
					console.log($authorId);
					if(data.data.permitionId == 1){
						console.log(data.data.permitionId);
						console.log("is doch admin");
						$isAdmin = true;
					}
					goto('/', {replaceState: true});
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
			<button type="submit"> Login </button>
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
        background: rgb(1, 109, 142);
        color: aliceblue;
		border-radius: 0.3em;
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
	background: linear-gradient(to right, rgb(50, 218, 86),rgb(9, 216, 181) );
	/*background: linear-gradient(to bottom right, rgb(50, 218, 86),rgb(20, 80, 5) );*/
	padding: 3px;
	border-radius: 0.3em;
	text-align: center;
}
::placeholder{
	color: floralwhite;
}
</style>
