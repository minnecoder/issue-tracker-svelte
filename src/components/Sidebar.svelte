<script lang="ts">
	import { Icon } from 'svelte-icons-pack';
	import { AiOutlineDashboard, AiOutlineProject } from 'svelte-icons-pack/ai';
	import { IoTicket, IoTicketOutline } from 'svelte-icons-pack/io';
</script>

<div class="main">
	<ul>
		<li>
			<a class="sidebarLink" href="/dashboard">
				<Icon src={AiOutlineDashboard} color="white" size="2rem" />
				Dashboard
			</a>
		</li>
		<li>
			<a class="sidebarLink" href="/projectslist">
				<Icon src={AiOutlineProject} color="white" size="2rem" />
				Projects
			</a>
		</li>
		<li>
			<a class="sidebarLink" href="/ticketslist">
				<Icon src={IoTicket} color="white" size="2rem" />
				My Tickets
			</a>
		</li>
	</ul>
</div>

<style>
	.main {
		position: fixed;
		top: 100px;
		left: 0;
		height: calc(100vh - 100px);
		background: #372952;
		border-right: solid 1px #ddd;
		padding-right: 2rem;
	}

	.main ul {
		height: 100%;
	}

	.main li {
		list-style: none;
	}

	.main a {
		text-decoration: none;
	}

	.sidebarLink {
		color: white;
		font-weight: 600;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem 0;
		justify-content: space-between;
	}
</style>
