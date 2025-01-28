<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	let projects = JSON.parse(data.projects);

	let ticket = {
		project: '',
		title: '',
		description: '',
		ticketType: '',
		ticketPriority: '',
		user: ''
	};
</script>

<div class="wrapper">
	<a class="closeBtn" href="/tickets">Close</a>
	<h1>Create A Ticket</h1>
	<form method="POST" action="/createticket">
		<label>
			Project
			<select name="project" bind:value={ticket.project}>
				{#each projects as project}
					<option value={project._id}>
						{project.title}
					</option>
				{/each}
			</select>
		</label>
		<input name="title" type="text" bind:value={ticket.title} placeholder="Title" />

		<input
			name="description"
			type="text"
			bind:value={ticket.description}
			placeholder="Description"
		/>
		<label>
			Ticket Priority
			<select name="ticketPriority" bind:value={ticket.ticketPriority}>
				<option value="">-</option>
				<option value="Lowest">Lowest</option>
				<option value="Low">Low</option>
				<option value="Medium">Medium</option>
				<option value="High">High</option>
				<option value="Highest">Highest</option>
			</select>
		</label>
		<label>
			Ticket Type
			<select name="ticketType" bind:value={ticket.ticketType}>
				<option value="">-</option>
				<option value="Bug">Bug</option>
				<option value="New Feature">New Feature</option>
				<option value="Improvement">Improvement</option>
				<option value="Task">Task</option>
				<option value="Testing">Testing</option>
			</select>
		</label>
		<button type="submit" class="submitBtn">Submit</button>
	</form>
</div>

<style>
	.wrapper {
		position: absolute;
		top: 15%;
		left: 14%;
		width: 80%;
		height: 80%;
		background: #128deb;
		border-radius: 10px;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		@media (max-width: 800px) {
			margin: 1rem;
		}
	}

	h1 {
		font-size: 2.5rem;
		text-align: center;
		padding: 0.5rem 0;
		margin-top: 0.5rem;
		color: white;
		@media (max-width: 650px) {
			font-size: 1.5rem;
			text-align: left;
			margin-left: 1rem;
		}
	}
	label {
		color: white;
	}

	input[type='text'] {
		width: 50%;
		padding: 1.5rem;
		margin: 0.75rem;
	}

	select {
		padding: 1.5rem;
		margin: 0.5rem;
	}

	.submitBtn {
		width: 8rem;
		padding: 1.5rem;
		margin: 0.5rem;
		background: #eb7012;
		color: white;
		border-radius: 5px;
		border: none;
	}

	.closeBtn {
		background: #eb7012;
		border-radius: 5px;
		padding: 1rem;
		margin: 0.5rem;
		position: absolute;
		top: 10px;
		right: 15px;
		color: white;
		font-size: 0.75rem;
		text-decoration: none;
		@media (max-width: 800px) {
			top: 2px;
			right: 2px;
		}
	}
</style>
