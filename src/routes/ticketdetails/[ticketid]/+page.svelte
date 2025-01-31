<script lang="ts">
	import { enhance } from '$app/forms';
	import TicketNotes from '../../../components/TicketNotes.svelte';
	import { Icon } from 'svelte-icons-pack';
	import { FiEdit } from 'svelte-icons-pack/fi';

	let data = $props();
	const ticket = $state(JSON.parse(data.data.ticket));

	let isEdited = $state(false);
	let ticketComment = $state('');
	let newValue = $state({
		ticketPriority: ticket.ticketPriority,
		ticketType: ticket.ticketType,
		ticketStatus: ticket.ticketStatus
	});

	interface TicketChange {
		user: string;
		propertyChanged: string;
		property: string;
		oldValue: string;
		newValue: string;
		created: Date;
	}
	const changes: TicketChange[] = [];

	$effect(() => {
		if (newValue.ticketPriority !== ticket.ticketPriority) {
			changes.push({
				user: ticket.submitter,
				propertyChanged: 'Priority',
				property: 'ticketPriority',
				oldValue: ticket.ticketPriority,
				newValue: newValue.ticketPriority,
				created: new Date()
			});
		}

		if (newValue.ticketType !== ticket.ticketType) {
			changes.push({
				user: ticket.submitter,
				propertyChanged: 'Ticket Type',
				property: 'ticketType',
				oldValue: ticket.ticketType,
				newValue: newValue.ticketType,
				created: new Date()
			});
		}

		if (newValue.ticketStatus !== ticket.ticketStatus) {
			changes.push({
				user: ticket.submitter,
				propertyChanged: 'TicketStatus',
				property: 'ticketStatus',
				oldValue: ticket.ticketStatus,
				newValue: newValue.ticketStatus,
				created: new Date()
			});
		}
	});

	function toggleEdited() {
		if (isEdited) {
			isEdited = false;
		} else {
			isEdited = true;
		}
	}
</script>

<svelte:head>
	<title>Ticket Details</title>
</svelte:head>

<div class="wrapper">
	<div class="ticketInfo">
		<div class="ticketTitle">
			<h2>{ticket.title}</h2>
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_static_element_interactions -->
			<span onclick={toggleEdited}>
				<Icon src={FiEdit} />
				Edit
			</span>
		</div>
		<div class="info">
			<div>
				<section class="infoItem">
					<p>Assigned To</p>
					<p>{ticket.assignedDev}</p>
				</section>
				<section class="infoItem">
					<p>Created By</p>
					<p>{ticket.submitter}</p>
				</section>
			</div>

			{#if isEdited}
				<form
					method="POST"
					use:enhance={({ formData }) => {
						formData.append('changesArray', JSON.stringify(changes));
						formData.append('ticketid', ticket._id);
					}}
					action="?/updateTicket"
					class="edit-ticket"
				>
					<section class="infoItem">
						<p>Type</p>
						<select name="ticketType" bind:value={newValue.ticketType}>
							<option value="Bug">Bug</option>
							<option value="New Feature">New Feature</option>
							<option value="Improvement">Improvement</option>
							<option value="Task">Task</option>
							<option value="Testing">Testing</option>
						</select>
					</section>
					<section class="infoItem">
						<p>Status</p>
						<select name="ticketStatus" bind:value={newValue.ticketStatus}>
							<option value="Open">Open</option>
							<option value="Resolved">Resolved</option>
							<option value="Closed">Closed</option>
							<option value="Reopened">Reopened</option>
							<option value="In Progress">In Progress</option>
						</select>
					</section>
					<section class="infoItem">
						<p>Priority</p>
						<select name="ticketPriority" bind:value={newValue.ticketPriority}>
							<option value="Lowest">Lowest</option>
							<option value="Low">Low</option>
							<option value="Medium">Medium</option>
							<option value="High">High</option>
							<option value="Highest">Highest</option>
						</select>
					</section>
					<button type="submit" class="submitBtn">Submit</button>
				</form>
			{:else}
				<div>
					<section class="infoItem">
						<p>Type</p>
						<p>{ticket.ticketType}</p>
					</section>
					<section class="infoItem">
						<p>Status</p>
						<p>{ticket.ticketStatus}</p>
					</section>
					<section class="infoItem">
						<p>Priority</p>
						<p>{ticket.ticketPriority}</p>
					</section>
				</div>
			{/if}
		</div>
		<section class="infoItem">
			<p>Ticket Description</p>
			<p class="description">{ticket.description}</p>
		</section>
		<section class="infoItem">
			<p>Ticket Comments and Changes</p>
			<TicketNotes {ticket} />
			<form
				class="ticketComment"
				use:enhance={({ formData }) => formData.append('ticketid', ticket._id)}
				method="POST"
				action="?/addComment"
			>
				<!-- svelte-ignore element_invalid_self_closing_tag -->
				<textarea name="ticketComment" bind:value={ticketComment} cols="30" rows="10" />
				<button class="commentBtn" type="submit">Submit</button>
			</form>
		</section>
	</div>
</div>

<style>
	.wrapper {
		background: white;
		border: 1px solid #ccc;
		border-radius: 5px;
		width: calc(100vw - 200px);
	}
	.ticketTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 0.5rem;
		h2 {
			margin-left: 0.25rem;
		}
		span {
			cursor: pointer;
			margin-right: 2rem;
			padding: 0.5rem;
			color: white;
			background: #eb7012;
			border-radius: 5px;
		}
	}

	.description {
		padding-top: 0.5rem;
	}
	.infoItem {
		padding: 0.5rem;

		p:nth-child(1) {
			text-transform: uppercase;
			color: #abb1b6;
			font-weight: 500;
			padding-bottom: 0.25rem;
		}
	}
	.info {
		display: flex;
		flex-direction: column-reverse;
		justify-content: space-between;
		border-bottom: solid 1px #ddd;
		margin: 0 1rem;
		div {
			display: flex;
			justify-content: space-between;
		}
		select {
			border: none;
			padding: 0.75rem;
			border-radius: 5px;
		}
		.submitBtn {
			width: 6rem;
			/* padding: 0.5rem; */
			/* margin: 0.5rem; */
			background: #eb7012;
			color: white;
			border-radius: 5px;
			border: none;
		}
	}
	.ticketInfo {
		margin: 0.5rem;
		h2 {
			padding: 0.5rem 0;
		}
	}

	.edit-ticket {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		@media (max-width: 800px) {
			width: 200px;
			display: flex;
			flex-wrap: wrap;
		}
	}

	.ticketComment {
		display: flex;
		flex-direction: column;
		width: 40rem;
		margin: 0 1rem;
		@media (max-width: 800px) {
			width: 20rem;
		}

		textarea {
			border: solid 1px black;
		}

		button {
			margin-top: 0.5rem;
			padding: 0.5rem;
			width: 6rem;
			background: #eb7012;
			color: white;
			border-radius: 5px;
		}
	}
	.commentBtn {
		margin-top: 0.5rem;
		padding: 0.5rem;
		width: 6rem;
		background: #eb7012;
		color: white;
		border-radius: 5px;
		border: none;
	}
</style>
