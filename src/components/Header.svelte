<script lang="ts">
	import { Icon } from 'svelte-icons-pack';
	import { FaSolidChevronDown } from 'svelte-icons-pack/fa';

	function logout() {
		// sessionStorage.clear()
		// history.push("/")
	}
</script>

<div class="main">
	<div class="nav">
		<div class="left">
			<h3>Issue Tracker</h3>
		</div>
		<ul class="right">
			<li>Notifications</li>
			<div class="dropdown">
				<button class="dropbtn"
					>Users
					<Icon src={FaSolidChevronDown} />
				</button>
				<div class="dropdown-content">
					<button onclick={() => logout()}>Log Out</button>
				</div>
			</div>
		</ul>
	</div>
</div>

<style>
	.main {
		position: fixed;
		top: 0;
		left: 0;
		grid-area: header;
		height: 100px;
		width: 100vw;
		background: #372952;
	}

	.nav {
		display: flex;
		justify-content: space-between;
	}

	.left {
		display: flex;
		align-items: center;
	}
	.left h3 {
		padding: 0 2rem;
		color: white;
		font-size: 2rem;
		@media (max-width: 800px) {
			padding-top: 0.5rem;
			font-size: 1rem;
		}
	}

	.right {
		display: flex;
		align-items: center;
		margin-right: 6rem;
	}
	.right li {
		padding: 0 1rem;
		color: white;
		list-style: none;
	}
	.dropdown button {
		border-radius: 5px;
		border: none;
		font-family: inherit;
		padding: 0.5rem 1rem;
	}
	.dropbtn {
		background: #128deb;
		color: white;
	}
	.dropdown:hover .dropdown-content {
		display: block;
	}
	.dropdown-content {
		background: #a0d1f7;
		display: none;
		position: absolute;
		min-width: 120px;
		box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
		z-index: 1;
	}
	.dropdown-content button {
		background: #a0d1f7;
		float: none;
		color: black;
		padding: 12px 16px;
		text-decoration: none;
		display: block;
		text-align: left;
	}
</style>
