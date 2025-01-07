import { redirect } from '@sveltejs/kit';
import db from '$lib/db';

// Die `load`-Funktion lädt das Rezept und die Zutaten aus der Datenbank
export async function load({ params }) {
    try {
        // Parallel laden von Rezept und Zutaten
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
    // Die `update`-Aktion aktualisiert ein Rezept basierend auf den übermittelten Formulardaten
    update: async ({ request, params }) => {
        try {
            // Formulardaten aus der Anfrage abrufen
            const data = await request.formData();
            // Zutaten aus den Formulardaten extrahieren und parsen
            const ingredients = JSON.parse(data.get('ingredients') || '[]');

            // Rezeptdaten aus den Formulardaten extrahieren und in ein Objekt umwandeln
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

            // Rezept in der Datenbank aktualisieren
            await db.updateRecipe(recipe);
            // Nach erfolgreicher Aktualisierung zur Rezeptliste weiterleiten
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