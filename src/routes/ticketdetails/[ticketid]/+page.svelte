<script lang="ts">
	import { enhance } from '$app/forms';
	import TicketNotes from '../../../components/TicketNotes.svelte';
	import { Icon } from 'svelte-icons-pack';
	import { FiEdit } from 'svelte-icons-pack/fi';

	let data = $props();
	const ticket = $state(JSON.parse(data.data.ticket));

	$inspect(ticket._id);

	let isEdited = $state(false);
	let ticketComment = $state('');
	// const stuff = $state({
	// 	ticketPriority: '',
	// 	ticketType: '',
	// 	ticketStatus: '',
	// 	ticketComment: ''
	// });

	// async function handleSubmit(event) {
	// 	event.preventDefault();
	// 	const arr = [];
	// 	const firstName = sessionStorage.getItem('firstName');
	// 	const lastName = sessionStorage.getItem('lastName');
	// 	const fullName = `${firstName} ${lastName}`;
	// 	// verify if each input is different
	// 	// if an input is different add object of data to an array
	// 	if (data.ticketType !== state.ticketType && state.ticketType !== '') {
	// 		arr.push({
	// 			user: fullName,
	// 			propertyChanged: 'Ticket Type',
	// 			property: 'ticketType',
	// 			oldValue: data.ticketType,
	// 			newValue: state.ticketType
	// 		});
	// 	}
	// 	if (data.ticketStatus !== state.ticketStatus && state.ticketStatus !== '') {
	// 		arr.push({
	// 			user: fullName,
	// 			propertyChanged: 'Ticket Status',
	// 			property: 'ticketStatus',
	// 			oldValue: data.ticketStatus,
	// 			newValue: state.ticketStatus
	// 		});
	// 	}
	// 	if (data.ticketPriority !== state.ticketPriority && state.ticketPriority !== '') {
	// 		arr.push({
	// 			user: fullName,
	// 			propertyChanged: 'Ticket Priority',
	// 			property: 'ticketPriority',
	// 			oldValue: data.ticketPriority,
	// 			newValue: state.ticketPriority
	// 		});
	// 	}
	// 	// iterate through array of objects and send each item to API end point
	// 	for (let i = 0; i < arr.length; i++) {
	// 		if (sessionStorage.getItem('demo') !== null) {
	// 			await fetch('/api/v1/tickethistory', {
	// 				method: 'PUT',
	// 				mode: 'cors',
	// 				headers: { 'Content-Type': 'application/json' },
	// 				body: JSON.stringify({
	// 					id: data._id,
	// 					user: arr[i].user,
	// 					propertyChanged: arr[i].propertyChanged,
	// 					property: arr[i].property,
	// 					oldValue: arr[i].oldValue,
	// 					newValue: arr[i].newValue
	// 				})
	// 			});
	// 		}
	// 	}
	// 	// after complettion set isEdited to false
	// 	setIsEdited(false);
	// 	window.location.reload();
	// }

	// async function submitComment() {
	// 	const firstName = sessionStorage.getItem('firstName');
	// 	const lastName = sessionStorage.getItem('lastName');
	// 	const fullName = `${firstName} ${lastName}`;
	// 	await fetch('/api/v1/ticketcomment', {
	// 		method: 'PUT',
	// 		mode: 'cors',
	// 		headers: { 'Content-Type': 'application/json' },
	// 		body: JSON.stringify({
	// 			id: data._id,
	// 			user: fullName,
	// 			comment: state.ticketComment
	// 		})
	// 	});
	// 	setState({ ticketComment: '' });
	// 	window.location.reload();
	// }

	function toggleEdited() {
		if (isEdited) {
			isEdited = false;
		} else {
			isEdited = true;
		}
	}
</script>

<div class="wrapper">
	<div class="ticketInfo">
		<div class="ticketTitle">
			<h2>{data.title}</h2>
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
				<div class="edit-ticket">
					<section class="infoItem">
						<p>Type</p>
						<select name="ticketType" value={ticket.ticketType}>
							<option value="">-</option>
							<option value="Bug">Bug</option>
							<option value="New Feature">New Feature</option>
							<option value="Improvement">Improvement</option>
							<option value="Task">Task</option>
							<option value="Testing">Testing</option>
						</select>
					</section>
					<section class="infoItem">
						<p>Status</p>
						<select name="ticketStatus" value={ticket.ticketStatus}>
							<option value="">-</option>
							<option value="Open">Open</option>
							<option value="Resolved">Resolved</option>
							<option value="Closed">Closed</option>
							<option value="Reopened">Reopened</option>
							<option value="In Progress">In Progress</option>
						</select>
					</section>
					<section class="infoItem">
						<p>Priority</p>
						<select name="ticketPriority" value={ticket.ticketPriority}>
							<option value="">-</option>
							<option value="Lowest">Lowest</option>
							<option value="Low">Low</option>
							<option value="Medium">Medium</option>
							<option value="High">High</option>
							<option value="Highest">Highest</option>
						</select>
					</section>
					<button type="submit" class="submitBtn">Submit</button>
				</div>
			{:else}
				<div>
					<section class="infoItem">
						<p>Type</p>
						<p>{data.ticketType}</p>
					</section>
					<section class="infoItem">
						<p>Status</p>
						<p>{data.ticketStatus}</p>
					</section>
					<section class="infoItem">
						<p>Priority</p>
						<p>{data.ticketPriority}</p>
					</section>
				</div>
			{/if}
		</div>

		<p class="description">{data.description}</p>
	</div>
	<TicketNotes {ticket} />
	<form
		class="ticketComment"
		use:enhance={({ formData }) => formData.append('ticketid', ticket._id)}
		method="POST"
		action="/ticketdetails/[ticketid]"
	>
		<!-- svelte-ignore element_invalid_self_closing_tag -->
		<textarea name="ticketComment" bind:value={ticketComment} cols="30" rows="10" />
		<button type="submit">Submit</button>
	</form>
</div>

<style>
	.wrapper {
		background: white;
		border-left: 1px solid #ccc;
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
			border: 1px solid black;
		}
		.submitBtn {
			width: 8rem;
			padding: 0.5rem;
			margin: 0.5rem;
			background: #eb7012;
			color: white;
			border-radius: 5px;
		}
	}
	.ticketInfo {
		margin: 0.5rem;
		h2 {
			padding: 0.5rem 0;
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
		input[type='text'] {
			height: 5rem;
			border: solid 1px black;
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
		.edit-ticket {
			@media (max-width: 800px) {
				width: 200px;
				display: flex;
				flex-wrap: wrap;
			}
		}
		.edit-ticket section {
			background: red;
		}
	}
</style>
