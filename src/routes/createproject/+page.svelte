<script lang="ts">
	let title = '';
	let description = '';
</script>

<svelte:head>
	<title>Create Project</title>
</svelte:head>

<div class="wrapper">
	<a class="closeBtn" href="/projectslist">Close</a>
	<h1>Add Project</h1>
	<form method="POST" action="/createproject">
		<input name="title" type="text" bind:value={title} placeholder="Title" />

		<input name="description" type="text" bind:value={description} placeholder="Description" />
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
		background: #fff;
		border-radius: 10px;
		border: 1px solid #ccc;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h1 {
		font-size: 2.5rem;
		text-align: center;
		padding: 0.5rem 0;
		margin-top: 5rem;
		color: eee;
	}

	input[type='text'] {
		width: 50%;
		padding: 1.5rem;
		margin: 0.75rem;
		border-radius: 5px;
		border: solid 1px #ccc;
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
		text-decoration: none;
		font-size: 0.75rem;
	}
</style>
