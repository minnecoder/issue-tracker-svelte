import db from "$lib/db";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        let title = formData.get('title');
        let description = formData.get('description');

        const project = await db.collection('projects').insertOne({
            title: title,
            description: description,
            tickets: []
        })

        if (!project.insertedId)
            return fail(400, { error: "Failed to create project" });

        redirect(303, '/projectslist');




    }
}