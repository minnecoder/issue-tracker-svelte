import db from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const response = await db.collection('projects').find().toArray();
	const allProjects = JSON.stringify(response);

	return {
		projects: {
			allProjects
		}
	};
};
