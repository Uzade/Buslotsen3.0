<script lang="ts">

    import { isAdmin } from '../store';
    import { goto } from '$app/navigation';

    function logout (e){
        console.log(e);
        sessionStorage.removeItem('UID');
        sessionStorage.removeItem('password')
        goto('/login', {replaceState: true});
    }

    let loggedIn = false;
    $: if (typeof window !== 'undefined') {
		const UID = sessionStorage.getItem('UID');
		const password = sessionStorage.getItem('password');

		if (UID && password) {
			loggedIn = true;
		}
	}
</script>


<div id="navbar">
    <a href="./">Overview</a>
    <a href="./post"> New Post</a>
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
        background: linear-gradient(to bottom right, rgb(50, 218, 86),rgb(9, 216, 181) );
        /*background-color: rgba(255, 42, 244, 0.244); altes Desine*/
    }
    a, button{
        all: unset;
        margin: 3px;
        text-decoration: none;
        padding: 0.7rem;
        background: rgb(1, 109, 142);
        /* background-image: linear-gradient(to bottom right, rgb(255, 23, 100), rgb(204, 28, 131)); altes Desine*/
        color: aliceblue;
        border-radius: 0.3em;
    }
</style>

<slot/>