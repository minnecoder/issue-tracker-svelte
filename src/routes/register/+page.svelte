<script>
	let firstName = '';
	let lastName = '';
	let email = '';
	let password = '';
	let error = '';
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="wrapper">
	<form class="loginForm" method="POST" action="/register">
		<h1>Register</h1>
		<h4>{error}</h4>
		<div class="inputGroup">
			<label for="firstName">First Name</label>
			<input name="firstName" type="text" bind:value={firstName} />
		</div>
		<div class="inputGroup">
			<label for="lastName">Last Name</label>
			<input name="lastName" type="text" bind:value={lastName} />
		</div>
		<div class="inputGroup">
			<label for="email">Email</label>
			<input name="email" type="text" bind:value={email} />
		</div>
		<div class="inputGroup">
			<label for="password">Password</label>
			<input name="password" type="password" bind:value={password} />
		</div>

		<input type="submit" value="Register User" />

		<p>Already have an account? <a href="/login">Login</a></p>
	</form>
</div>

<style>
	.wrapper {
		height: 100vh;
		width: 100%;
	}

	.loginForm {
		border: solid 1px #ccc;
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
		border-radius: 10px;
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
	.loginForm p {
		text-align: center;
	}
	.loginForm a {
		color: #eb7012;
		text-decoration: none;
	}
</style>
