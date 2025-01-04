import { redirect } from '@sveltejs/kit';
import db from "$lib/db.js";

export async function load() {
    try {
        const ingredients = await db.getIngredients();
        return {
            ingredients
        };
    } catch (error) {
        console.error('Error loading ingredients:', error);
        return {
            ingredients: [],
            error: 'Fehler beim Laden der Zutaten'
        };
    }
}

export const actions = {
    create: async ({ request }) => {
        try {
            const data = await request.formData();
            
            // Validate required fields
            const name = data.get("name")?.trim();
            const duration = parseInt(data.get("duration"));
            const difficulty = data.get("difficulty")?.trim();
            const description = data.get("description")?.trim();
            const servings = parseInt(data.get("servings"));
            const instructions = data.get("instructions")?.trim();
            const ingredientsData = data.get("ingredients");

            if (!name || !duration || !difficulty || !description || !servings || !instructions || !ingredientsData) {
                return {
                    success: false,
                    error: 'Bitte füllen Sie alle Felder aus'
                };
            }

            let recipe = {
                name,
                duration,
                difficulty,
                description,
                servings,
                instructions: instructions.split('\n').filter(i => i.trim()),
                ingredients: JSON.parse(ingredientsData),
                image: '/images/recipes/placeholder.png'
            };
            
            // Save to database
            await db.createRecipe(recipe);
            
            // Redirect on success
            throw redirect(303, '/recipes');
            
        } catch (error) {
            // Handle redirect separately
            if (error.status === 303) {
                throw error;
            }
            
            console.error('Error creating recipe:', error);
            return {
                success: false,
                error: 'Ein Fehler ist bei der Datenbankoperation aufgetreten'
            };
        }
    }
};