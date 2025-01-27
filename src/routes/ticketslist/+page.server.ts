import db from '$lib/db';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


export const load: PageServerLoad = async ({ cookies }) => {
    const sessionCookie = cookies.get('session');

    if (!sessionCookie) {
        throw redirect(303, '/login');
    }

    const tickets = await db.collection('tickets').find({ assignedDev: sessionCookie }).toArray()
    const allTickets = JSON.stringify(tickets);

    return {
        fullName: sessionCookie,
        tickets: allTickets
    };
};