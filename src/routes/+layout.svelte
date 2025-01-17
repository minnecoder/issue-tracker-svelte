<script>
	import '../app.css';
	import Sidebar from '../components/Sidebar.svelte';
	import Header from '../components/Header.svelte';
</script>

<div class="layout">
	<Header />
	<Sidebar />
	<main>
		<slot />
	</main>
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: 200px 1fr 1fr;
		grid-template-rows: 100px 1fr;
		grid-template-areas:
			'header header header'
			'sidebar main main';
		grid-gap: 0;
		background: white;
	}
	main {
		flex: 1;
		padding: 1rem;
	}
</style>
