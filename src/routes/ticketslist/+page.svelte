<script lang="ts">
	import { goto } from '$app/navigation';
	let { data } = $props();
	let tickets = JSON.parse(data.tickets);

	const dateConverter = (dateTime: string): string => {
		dateTime = JSON.stringify(dateTime, null, 2);
		const [year, month, day] = dateTime.substr(1, 10).split('-');
		return `${month}/${day}/${year}`;
	};
</script>

<svelte:head>
	<title>Tickets List</title>
</svelte:head>

<div class="wrapper">
	<div class="tableTitle">
		<h3>Tickets for {data.fullName}</h3>
		<a class="createTicketBtn" href="/createticket">Create A Ticket</a>
	</div>

	<table class="table">
		<thead>
			<tr>
				<th>Title</th>
				<th>Created</th>
				<th>Assigned Developer</th>
				<th>Ticket Priority</th>
				<th>Ticket Status</th>
				<th>Ticket Type</th>
			</tr>
		</thead>
		<tbody>
			{#if tickets && tickets.length > 0}
				{#each tickets as ticket, index}
					<tr onclick={() => goto('/ticketdetails/' + ticket._id)}>
						<td>{ticket.title}</td>
						<td>{dateConverter(ticket.createdOn)}</td>
						<td>{ticket.assignedDev}</td>
						<td>{ticket.ticketPriority}</td>
						<td>{ticket.ticketStatus}</td>
						<td>{ticket.ticketType}</td>
					</tr>
				{/each}
			{:else}
				<tr>
					<td colspan="6">No tickets found</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: space-between;
		background: white;
		grid-area: ticketarea;
		overflow-y: scroll;
		border: solid 1px #ccc;
		border-radius: 5px;
	}

	/* @media only screen and (max-width: 800px) {
		flex-direction: column;
		table,
		thead,
		tbody,
		th,
		td,
		tr {
			display: block;
		}
		thead tr {
			position: absolute;
			top: -9999px;
			left: -9999px;
		}
		tr {
			border: 1px solid #ccc;
		}
		td {
			border: none;
			border-bottom: 1px solid #eee;
			position: relative;
			padding-left: 200px;
			margin-left: 150px;
		}
		td:before {
			position: absolute;
			top: 12px;
			left: 6px;
			width: 200px;
			padding-right: 40px;
			white-space: nowrap;
			margin-left: -150px;
		}
		td:nth-of-type(1):before {
			content: 'Title';
		}
		td:nth-of-type(2):before {
			content: 'Created';
		}
		td:nth-of-type(3):before {
			content: 'Assigned Developer';
		}
		td:nth-of-type(4):before {
			content: 'Ticket Priority';
		}
		td:nth-of-type(5):before {
			content: 'Ticket Status';
		}
		td:nth-of-type(6):before {
			content: 'Ticket Type';
		}
	} */

	.table {
		width: 100%;
		height: 2rem;
		border-collapse: collapse;
	}
	.table thead th {
		height: 2rem;
		padding: 0.5rem;
		text-align: left;
		background: #e7f3fd;
	}

	.table td {
		height: 0.5rem;
		padding: 0.5rem;
		text-align: left;
		border-bottom: solid 1px #eee;
	}

	.table tbody tr {
		cursor: pointer;
	}

	.tableTitle {
		/* height: 2rem; */
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1rem;
	}

	.createTicketBtn {
		text-decoration: none;
		padding: 0.5rem;
		background: #eb7012;
		border: none;
		color: white;
		border-radius: 5px;
		font-size: 0.75rem;
	}
</style>
