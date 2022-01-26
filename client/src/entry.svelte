
<script>
    export let author;
    export let message;
    export let createdAt;
</script>

<div class="wrapper">
    <div class="top">
        <p class="author">{author}</p>
        <p class="time">{createdAt}</p>
    </div>
    <h2>{message}</h2>
</div>

<style>
    .author{
        color: rgb(240, 227, 233);
    }
    .time{
        font-size: 12px;
    }
    .top{
        display: flex;
        justify-content: space-between;
    }
    .wrapper{
        margin: 6%;
        padding: 2%;
        background-image: linear-gradient(to bottom right, rgb(255, 23, 100), rgb(204, 28, 131));
        /*background: url(https://cdn.discordapp.com/attachments/631511256552964107/934516227576041502/unknown.png);*/
    }
</style>