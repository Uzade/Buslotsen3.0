<script lang="ts">

    import { isAdmin } from '../store';

    function logout (e){
        console.log(e);
        sessionStorage.removeItem('UID');
        sessionStorage.removeItem('password')
        window.location.href = 'https://virgin-yukon-sbjct-ratios.trycloudflare.com/login';
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
    {#if loggedIn}
        <button on:click|once={logout}>Logout</button>
    {/if}
    {#if $isAdmin}
        <a href="./admin">Admin</a>
    {/if}
    

</div>
<div id="spacer"></div>

<style>
    :global(body){
        background-color: rgb(20, 20, 20);
        color:rgb(253, 249, 242);
        padding: 0;
        margin: 0;
    }
    #navbar{
        overflow: hidden;
        position: fixed;
        display: flex;
        top: 0;
        width: 100%;
        justify-content:space-around;
        padding-top: 0.7rem;
        padding-bottom: 0.5rem;
        backdrop-filter:blur(3px);
        background:rgba(36, 37, 37, 0.856);
        /*background-color: rgba(255, 42, 244, 0.244); altes Desine*/
    }
    a, button{
        all: unset;
        margin: 3px;
        text-decoration: none;
        padding: 0.7rem;
        background: rgba(0, 195, 255, 0.246);
        /* background-image: linear-gradient(to bottom right, rgb(255, 23, 100), rgb(204, 28, 131)); altes Desine*/
        color: rgba(240, 248, 255, 0.52);
        border-radius: 0.3em;
    }
    #impressum{
        all: unset;
        margin: 3px;
        padding: 0.2em;
        text-decoration: none;
        background: rgb(1, 109, 142);
        /* background-image: linear-gradient(to bottom right, rgb(255, 23, 100), rgb(204, 28, 131)); altes Desine*/
        color: aliceblue;
        border-radius: 0.3em;  
    }
    .impcenter{
        display: flex;
	    justify-content: center;
        background: rgb(88, 97, 96);
        bottom: 0;
    }
    #spacer{
        margin-bottom: 8vh;
    }
</style>

<slot/>
<footer>
    <div class="impcenter">
       <a id="impressum" href="./contact">Impressum &copy;2022</a> 
    </div>
</footer>