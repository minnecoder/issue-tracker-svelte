import bcrypt from 'bcryptjs';
import db from '$lib/db';
import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {    
    const formData = await request.formData();
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password') as string;
    
    
    // Check if user is already used
    const userExists = await db.collection('users').findOne({ email: email });
    if (userExists)
        return fail(400, { error: "Email already exists" });

    // Create hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
        const user = await db.collection('users').insertOne({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            role: "user",
        });

    if(!user)   
        return fail(500, { error: "Server Error" });
    
    // TODO: Figure out where to redirect the user
    throw redirect(303, '/login');
}
}