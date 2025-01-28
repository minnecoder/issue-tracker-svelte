<script lang="ts">
	import { goto } from '$app/navigation';
	// svelte-ignore non_reactive_update
	let projects: { _id: string; title: string; description: string; tickets: string[] }[] = [];

	let { data } = $props();
	projects = JSON.parse(data.projects.allProjects);

	// TODO: figure out what to be the "id" for projectticket
</script>

<div class="main">
	<div class="title">
		<h2>Projects</h2>
		<a class="addProjectBtn" href="/createproject">Add A Project</a>
	</div>
	<div class="dataTitles">
		<p>Title</p>
		<p>Description</p>
		<p># of Tickets</p>
	</div>
	<div class="dataItems">
		{#each projects as project}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<div class="dataItem" onclick={() => goto(`/projectticket/${project._id}`)}>
				<p>{project.title}</p>
				<p>{project.description}</p>
				<p>{project.tickets.length}</p>
			</div>
		{/each}
	</div>
</div>

<style>
	.main {
		width: calc(100vw - 150px);
		background: #f8f8fe;
	}

	.title {
		width: 80%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		padding: 1rem 2rem;
	}
	.title h2 {
		padding: 0.5rem 0 0 8rem;
	}

	.addProjectBtn {
		padding: 0.5rem;
		background: #eb7012;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
		text-decoration: none;
		font-size: 0.75rem;
		border-radius: 5px;
		box-shadow: 1px 1px 9px 0px rgba(187, 186, 196, 1);
	}
	.dataTitles {
		width: 80%;
		margin: 0 auto;
		display: flex;
		height: 3rem;
		border-radius: 20px;
		align-items: center;
		justify-content: space-between;
		padding: 0 1rem 0 1rem;
	}
	.dataTitles p {
		color: #968aaf;
	}

	.dataTitles p:nth-of-type(2) {
		padding-left: 5rem;
	}

	.dataItem {
		width: 80%;
		margin: 1rem auto;
		display: flex;
		height: 3rem;
		cursor: pointer;
		align-items: center;
		justify-content: space-between;
		padding: 0 1rem 0 1rem;
		background: white;
		border-radius: 20px;
		box-shadow: 1px 1px 9px 0px rgba(187, 186, 196, 1);
	}
</style>
