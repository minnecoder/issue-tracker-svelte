<script lang="ts">
	import DateDiff from '../lib/DateDiff';

	interface TicketComment {
		created: string;
		user: string;
		comment: string;
	}

	interface TicketHistory {
		created: string;
		user: string;
		propertyChanged: string;
		oldValue: string;
		newValue: string;
	}

	let data = $props();
	$inspect(data.ticket);

	const comments = data.ticket.ticketComment as TicketComment[];
	const histories = data.ticket.ticketHistory as TicketHistory[];

	comments.sort((a: TicketComment, b: TicketComment) => {
		let da = new Date(a.created);
		let db = new Date(b.created);
		return da.getTime() - db.getTime();
	});
	histories.sort((a: TicketHistory, b: TicketHistory) => {
		let da = new Date(a.created);
		let db = new Date(b.created);
		return da.getTime() - db.getTime();
	});
</script>

<div class="wrapper">
	{#each comments as comment}
		<div class="ticketComment">
			<div>
				{comment.user} commented <span>{DateDiff(comment.created)}</span>
			</div>
			<p>{comment.comment}</p>
		</div>
	{/each}
	{#each histories as history}
		<div class="ticketChange">
			<p>
				{history.user} changed {history.propertyChanged} from {history.oldValue} to {history.newValue}
				<span>{DateDiff(history.created)}</span>
			</p>
		</div>
	{/each}
</div>

<style>
	.ticketChange {
		display: flex;
		justify-content: space-between;
		background: #e7f3fd;
		margin: 0.5rem;
		padding: 0.5rem;
	}
	.ticketChange span {
		padding-top: 0.25rem;
		padding-left: 0.25rem;
		font-size: 12px;
		color: #b2b9be;
	}

	.ticketComment {
		display: flex;
		flex-direction: column;
		padding: 0.5rem;
	}
	div {
		padding: 0.5rem;
		background: #e7f3fd;
	}
	span {
		padding-top: 0.25rem;
		font-size: 12px;
		color: #b2b9be;
	}
	p {
		margin-top: 0.25rem;
		padding: 0.75rem;
		border-left: solid 1px #ccc;
	}
</style>
