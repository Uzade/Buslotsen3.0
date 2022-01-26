<script lang="ts">

</script>

<div class="wrapper">
    <h2>Neuer Nutzer</h2>
    <div>
        <label for="name">Name:</label>
        <input
        type="text"
        id="name"
        name="name"
        value=""
    />
    </div>
    <div>
        <label for="email">E-Mail:</label>
        <input
            type="email"
            id="email"
            name="email"
            value=""
        />
    </div>
    <div>
        <label for="password">Password:</label>
        <input
            type="password"
            id="password"
            name="password"
            value=""
        />
    </div>
    <form>
        <input type="radio" id="busl" name="permitions" value=0>
        <label for="buls">Buslotse</label><br>
        <input type="radio" id="admin" name="permitions" value=1>
        <label for="admin">Admin</label><br>
        <input type="radio" id="teacher" name="permitions" value=2>
        <label for="teacher">Lehrer</label><br><br>
    </form> 
</div>

<style>
    .wrapper{
        padding: 2%;
        margin: 6%;
        background-color: rgb(2, 190, 103);
    }
</style>