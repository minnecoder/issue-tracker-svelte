import db from '$lib/db';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';
import type { Actions, ServerLoadEvent } from '@sveltejs/kit';

export const load: PageServerLoad = async (event: ServerLoadEvent) => {

    const ticketid = event.params.ticketid;

    const response = await db.collection('tickets').findOne({ _id: new ObjectId(ticketid) });

    return {
        ticket: JSON.stringify(response)
    };
};

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const ticketComment = formData.get('ticketComment');
        const ticketid = formData.get('ticketid');

        console.log('ticketComment', ticketComment);



        const response = await db.collection('tickets').findOneAndUpdate(
            { _id: new ObjectId(ticketid) },
            { $push: { ticketComment: ticketComment } } as any
        );





    }
}