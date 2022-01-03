
<script>
    import Entry from "../entry.svelte"

    let entries = [];
    fetch("http://localhost:8080/entries/all", { method: 'GET'})
    .then(response => response.json())
    .then(data => {
        entries = data.data;
        //console.log(entries);
    });
    $: console.log(entries);

</script>

<div>

    {#each entries as entry}
        <Entry author={entry.author.name} message={entry.title} createdAt={entry.createdAt}/>
    {:else}
        <p>loading...</p>
    {/each}
</div>


<style>
    
</style>