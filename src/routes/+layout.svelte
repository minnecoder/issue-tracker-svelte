<script>
	import '../app.css';
	import Sidebar from '../components/Sidebar.svelte';
	import Header from '../components/Header.svelte';
	import { page } from '$app/stores';

	$: isAuthRoute =
		$page.url.pathname.startsWith('/login') || $page.url.pathname.startsWith('/register');
</script>

<div class="layout" class:auth-layout={isAuthRoute}>
	{#if !isAuthRoute}
		<Header />
		<Sidebar />
	{/if}
	<main class:auth-main={isAuthRoute}>
		<slot />
	</main>
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: 150px 1fr 1fr;
		grid-template-rows: 100px 1fr;
		grid-template-areas:
			'header header header'
			'sidebar main main';
		height: 100vh;
	}

	.auth-layout {
		display: block;
	}

	main {
		grid-area: main;
		padding: 2rem;
		background-color: #f5f5f5;
	}

	.auth-main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		padding: 0;
	}
</style>
