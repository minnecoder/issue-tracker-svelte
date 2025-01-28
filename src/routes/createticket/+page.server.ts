import db from "$lib/db";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { ObjectId } from "mongodb";

interface Project {
    _id: ObjectId;
    title: string;
    description: string;
    tickets: string[];
}

export const load: PageServerLoad = async () => {
    const response = await db.collection('projects').find().toArray();
    const allProjects = JSON.stringify(response);

    return {
        projects: allProjects
    }
}

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        let project = formData.get('project') as string;
        const title = formData.get('title');
        const description = formData.get('description');
        const ticketType = formData.get('ticketType');
        const ticketPriority = formData.get('ticketPriority');

        // Save ticket to database
        const ticket = await db.collection('tickets').insertOne({
            title: title,
            description: description,
            ticketType: ticketType,
            ticketPriority: ticketPriority,
            assignedDev: '',

        });
        if (!ticket.insertedId)
            return fail(400, { error: "Failed to create ticket" });

        project = project.replace(/"/g, "");

        // Add ticket object id to project tickets array
        const updateProject = await db.collection<Project>('projects').updateOne(
            { _id: new ObjectId(project) },
            { $push: { tickets: ticket.insertedId } } as any
        );

        if (!updateProject.modifiedCount)
            return fail(400, { error: "Failed to add ticket to project" });

        throw redirect(302, '/ticketslist');
    }
}
