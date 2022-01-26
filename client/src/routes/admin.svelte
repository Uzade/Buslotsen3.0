<script>
	import { isAdmin } from '../store';
	import { goto } from '$app/navigation';
	import User from '../user.svelte';
	import NewUser from '../newUser.svelte';

	const dbUrl = import.meta.env.VITE_BACKEND_URL;

	let users = [];

	if (typeof window !== 'undefined') {
		const UID = sessionStorage.getItem('UID');
		const password = sessionStorage.getItem('password');
		if (!$isAdmin) {
			goto('/login', { replaceState: true });
		}
		if (!UID || !password) {
			goto('/login', { replaceState: true });
		}

		fetch(dbUrl + 'users/all', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				requestor: {
					name: UID,
					password: password
				}
			})
		})
			.then((response) => response.json())
			.then((data) => {
				users = data.data;
			});
	}
</script>

<div>
	<NewUser/>
	{#each users as user}
		<User 
            id={user.id} 
            email={user.email} 
            name={user.name} 
            permitionId={user.permitionId}
        />
	{:else}
		<!-- empty list -->
	{/each}
</div>
