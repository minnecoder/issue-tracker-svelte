<script lang="ts">
	let email = '';
	let password = '';
	let error = '';

	function demoLogin() {
		sessionStorage.setItem('firstName', 'Demo');
		sessionStorage.setItem('lastName', 'User');
		sessionStorage.setItem('demo', 'true');
		history.push('/tickets');
	}
</script>

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
			<button
				onclick={() => {
					history.push('/register');
				}}
			>
				Register User
			</button>
			<button onclick={() => demoLogin()}> Login as a Demo User </button>
		</div>
	</form>
</div>

<style>
	.wrapper {
		background: #128deb;
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
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		border-radius: 5px;
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
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	}
	.loginLinks {
		display: flex;
		flex-direction: column;
		padding: 0.5rem 0;
	}
	.loginLinks button {
		background: #128deb;
		margin: 0.5rem;
		padding: 1rem;
		color: white;
		border-radius: 5px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	}
</style>
