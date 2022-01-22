<script lang="ts">
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
        /*background: rgb(25, 161, 36);*/
        background: linear-gradient(to bottom right, rgb(50, 218, 86),rgb(9, 183, 216) );
        /*background-color: rgba(255, 42, 244, 0.244); altes Desine*/
    }
    a, button{
        all: unset;
        margin: 3px;
        text-decoration: none;
        padding: 0.7rem;
        background: rgb(1, 109, 142);
        /*background-image: linear-gradient(to bottom right, rgb(15, 184, 218), rgb(34, 143, 57));*/
        /* background-image: linear-gradient(to bottom right, rgb(255, 23, 100), rgb(204, 28, 131)); altes Desine*/
        color: aliceblue;
    }
</style>

<slot/>