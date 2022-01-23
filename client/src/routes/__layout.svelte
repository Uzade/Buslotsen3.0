<script lang="ts">

    import { isAdmin } from '../store';

    function logout (e){
        console.log(e);
        sessionStorage.removeItem('UID');
        sessionStorage.removeItem('password')
        window.location.href = 'http://localhost:3000/login';
    }

    let loggedIn = false;
    if (typeof window !== 'undefined') {
		const UID = sessionStorage.getItem('UID');
		const password = sessionStorage.getItem('password');

		if (UID || password) {
			loggedIn = true;
		}
	}
</script>


<div id="navbar">
    <a href="./">Overview</a>
    <a href="./post"> New Post</a>
    <a href="./contact">Contakt</a>
    {#if loggedIn}
        <button on:click|once={logout}>Logout</button>
    {/if}
    {#if $isAdmin}
        <a href="./admin">Admin</a>
    {/if}
    

</div>

<style>
    :global(body){
        background-color: rgb(20, 20, 20);
        color:rgb(253, 249, 242);
        padding: 0;
        margin: 0;
    }
    #navbar{
        display: flex;
        justify-content:center;
        padding-top: 1rem;
        padding-bottom: 0.5rem;
        background-color: rgba(255, 42, 244, 0.244);
    }
    a, button{
        all: unset;
        margin: 3px;
        text-decoration: none;
        padding: 0.7rem;
        background-image: linear-gradient(to bottom right, rgb(255, 23, 100), rgb(204, 28, 131));
        color: aliceblue;
    }
</style>

<slot/>