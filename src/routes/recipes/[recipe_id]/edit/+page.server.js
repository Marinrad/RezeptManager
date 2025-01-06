import { redirect } from '@sveltejs/kit';
import db from '$lib/db';

export async function load({ params }) {
    try {
        const [recipe, ingredients] = await Promise.all([
            db.getRecipe(params.recipe_id),
            db.getIngredients()
        ]);
        return { recipe, ingredients };
    } catch (error) {
        console.error('Fehler beim Laden:', error);
        return { error: 'Fehler beim Laden des Rezepts.' };
    }
}

export const actions = {
    update: async ({ request, params }) => {
        try {
            const data = await request.formData();
            const ingredients = JSON.parse(data.get('ingredients') || '[]');

            const recipe = {
                _id: params.recipe_id,
                name: data.get('name'),
                duration: parseInt(data.get('duration')),
                difficulty: data.get('difficulty'),
                description: data.get('description'),
                servings: parseInt(data.get('servings')),
                instructions: data.get('instructions').split('\n').filter(Boolean),
                ingredients
            };

            await db.updateRecipe(recipe);
            throw redirect(303, '/recipes');
        } catch (error) {
            if (error instanceof redirect) {
                throw error;
            }
            console.error('Fehler beim Aktualisieren:', error);
            return {
                success: false,
                error: 'Fehler beim Aktualisieren des Rezepts.'
            };
        }
    }
};