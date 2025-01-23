import db from '$lib/db';
import { ObjectId } from 'mongodb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// TODO: Need to iterate through the array of ticket ids from project

	const projectid = event.params.projectid;

	const response = await db.collection('projects').findOne({ _id: new ObjectId(projectid) });

	const ids = response?.tickets;

	// ensure that all IDs are valid Mongo ObjectIds
	const objectIds = ids.map((id: number) => new ObjectId(id));

	// get all of the tickets from the project
	const results = await db
		.collection('tickets')
		.find({ _id: { $in: objectIds } })
		.toArray();

	return {
		tickets: JSON.stringify(results),
		title: response?.title
	};
};
