<script lang="ts">
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let error = '';

	function demoLogin() {
		sessionStorage.setItem('firstName', 'Demo');
		sessionStorage.setItem('lastName', 'User');
		sessionStorage.setItem('demo', 'true');
		goto('/tickets');
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="loginWrapper">
	<form class="loginForm">
		<h1>Issue Tracker</h1>
		<h4>{error}</h4>
		<div class="inputGroup">
			<label for="email">Email</label>
			<input name="email" type="text" bind:value={email} />
		</div>
		<div class="inputGroup">
			<label for="password">Password</label>
			<input name="password" type="password" bind:value={password} />
		</div>

		<input type="submit" value="Login" />
		<div class="loginLinks">
			<p>Don't have an account? <a href="/register">Register</a></p>
			<p>
				Login as a Demo user <a href="/demo">Click Here</a>
			</p>
		</div>
	</form>
</div>

<style>
	.loginWrapper {
		height: 100vh;
		width: 100%;
	}

	.loginForm {
		position: absolute;
		top: 10%;
		margin-left: auto;
		margin-right: auto;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		background: white;
		width: 30rem;
		padding: 2rem 0;
		border-radius: 5px;
		border: 1px solid #ccc;
	}
	.loginForm h1 {
		text-align: center;
		color: #0d62a4;
		padding-bottom: 0.5rem;
	}

	.loginForm h4 {
		color: red;
	}
	.inputGroup {
		display: flex;
		flex-direction: column;
		margin: 0.5rem 0;
	}
	.loginForm label {
		margin-left: 0.75rem;
	}
	.loginForm input {
		margin: 0.25rem 0.75rem;
		padding: 0.5rem;
		border-radius: 3px;
		border: 1px solid black;
	}
	.loginForm input[type='submit'] {
		margin-top: 0.75rem;
		background: #eb7012;
		color: white;
		border-radius: 3px;
		border: none;
	}
	.loginLinks p {
		padding: 0.5rem 0;
		text-align: center;
	}
	.loginLinks a {
		color: #eb7012;
		text-decoration: none;
	}
</style>
