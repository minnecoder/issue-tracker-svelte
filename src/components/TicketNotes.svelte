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
			<div class="commentHeader">
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
		/* background: #e7f3fd; */
		background: rgba(40, 100, 230, 0.493);
		margin: 0.5rem;
		padding: 0.5rem;
		width: 40rem;
		border-radius: 5px;
	}
	.ticketChange span {
		padding-top: 0.25rem;
		padding-left: 0.25rem;
		font-size: 12px;
		color: #e9e9e9;
	}

	.ticketComment {
		display: flex;
		flex-direction: column;
		margin: 0.5rem;
		padding: 0.5rem;
		background: rgba(17, 178, 253, 0.507);
		border-radius: 5px;
		width: 40rem;
	}
	.commentHeader {
		padding: 0.5rem;
		/* background: #e7f3fd; */
		background: rgba(17, 178, 253, 0.315);
	}
	span {
		padding-top: 0.25rem;
		font-size: 12px;
		color: #e9e9e9;
	}
	.ticketChange p {
		margin-top: 0.25rem;
		padding: 0.75rem;
	}

	.ticketComment p {
		font-style: italic;
		margin-top: 0.25rem;
		padding: 0.75rem;
	}
</style>
