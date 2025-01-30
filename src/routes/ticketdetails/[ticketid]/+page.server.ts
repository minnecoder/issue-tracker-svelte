import db from '$lib/db';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const ticketid = params.ticketid;

	const response = await db.collection('tickets').findOne({ _id: new ObjectId(ticketid) });

	return {
		ticket: JSON.stringify(response)
	};
};

export const actions: Actions = {
	addComment: async ({ request, cookies }) => {
		const formData = await request.formData();
		const ticketComment = formData.get('ticketComment');
		const ticketid = formData.get('ticketid');

		const sessionCookie = cookies.get('session');

		const response = await db
			.collection('tickets')
			.findOneAndUpdate({ _id: new ObjectId(ticketid?.toString()) }, {
				$push: {
					ticketComment: { comment: ticketComment, user: sessionCookie, created: new Date() }
				}
			} as any);
	},

	updateTicket: async ({ request }) => {
		const formData = await request.formData();
		let changesArray = formData.get('changesArray');
		const ticketid = formData.get('ticketid');

		if (!changesArray || !ticketid) {
			return { success: false, error: 'Missing required data' };
		}

		changesArray = JSON.parse(changesArray as string);

		const response = await db
			.collection('tickets')
			.findOneAndUpdate({ _id: new ObjectId(ticketid?.toString()) }, {
				$push: { ticketHistory: { $each: changesArray } }
			} as any);

		return { success: true };
	}
};
