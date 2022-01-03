
<div id="navbar">
    <a href="./">Overview</a>
    <a href="./post"> New Post</a>
    <a href="./contact">Contakt</a>

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
    a{
        margin: 3px;
        text-decoration: none;
        padding: 1rem;
        background-image: linear-gradient(to bottom right, rgb(255, 23, 100), rgb(204, 28, 131));
        color: aliceblue;
    }
</style>

<slot/>