<script lang="ts">
	import { goto } from '$app/navigation';

	let { data } = $props();
	let tickets = JSON.parse(data.tickets);
	let title = data.title;

	const dateConverter = (dateTime: string) => {
		const date = dateTime.substr(0, 10).split('-');
		date.push(date.splice(0, 1)[0]);
		return date.join('/');
	};
</script>

<svelte:head>
	<title>Project Tickets</title>
</svelte:head>

<div class="wrapper">
	<div class="tableTitle">
		<h3>Tickets for {title}</h3>
		<a class="createTicket" href="/createticket">Create A Ticket</a>
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
			{#each tickets as ticket}
				<tr onclick={() => goto('/ticketdetails/' + ticket._id)}>
					<td>{ticket.title}</td>
					<td>{dateConverter(ticket.createdOn)}</td>
					<td>{ticket.assignedDev}</td>
					<td>{ticket.ticketPriority}</td>
					<td>{ticket.ticketStatus}</td>
					<td>{ticket.ticketType}</td>
				</tr>
			{/each}
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
		width: calc(100vw - 200px);
		overflow-y: scroll;
	}
	/* @media only screen and  (max-width: 800px){
    flex-direction: column;
    table, thead, tbody, th, td, tr {
    display: block;
  }
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  tr { border: 1px solid #ccc; }
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
  td:nth-of-type(1):before { content: "Title"; }
  td:nth-of-type(2):before { content: "Created"; }
  td:nth-of-type(3):before { content: "Assigned Developer"; }
  td:nth-of-type(4):before { content: "Ticket Priority";}
  td:nth-of-type(5):before {content: "Ticket Status"}
  td:nth-of-type(6):before {content: "Ticket Type"}
} */

	.table {
		width: 100%;
		border-collapse: collapse;
	}
	thead th {
		padding: 0.5rem;
		text-align: left;
		background: #e7f3fd;
	}

	td {
		padding: 0.5rem;
		text-align: left;
		border-bottom: solid 1px #eee;
	}

	tbody tr {
		cursor: pointer;
	}

	.tableTitle {
		display: flex;
		justify-content: space-between;
		padding: 1rem 1rem;
	}
	.tableTitle h3 {
		padding-top: 0.25rem;
	}

	.createTicket {
		display: flex;
		align-items: center;
		text-decoration: none;
		padding: 0.5rem;
		background: #eb7012;
		border: none;
		color: white;
		border-radius: 5px;
		font-size: 0.75rem;
	}
</style>
