import { redirect } from '@sveltejs/kit';
import db from '$lib/db';

// Die `load`-Funktion lädt die Zutat basierend auf der `ingredient_id` aus den URL-Parametern
export async function load({ params }) {
    const ingredient = await db.getIngredient(params.ingredient_id);
    return {
        ingredient
    };
}

export const actions = {
    // Die `default`-Aktion aktualisiert eine Zutat basierend auf den übermittelten Formulardaten
    default: async ({ request, params }) => {
        try {
            const formData = await request.formData();
            
            const name = formData.get('name')?.trim();
            const category = formData.get('category')?.trim();
            const calories = parseInt(formData.get('calories_per_100g'), 10);
            const unit = formData.get('unit')?.trim();

            if (!name || !category || !unit || isNaN(calories)) {
                return {
                    success: false,
                    error: 'Bitte füllen Sie alle Felder korrekt aus'
                };
            }

            // Zutat mit den neuen Daten aktualisieren
            const ingredient = {
                _id: params.ingredient_id,
                name,
                category,
                calories_per_100g: calories,
                unit
            };

            const result = await db.updateIngredient(ingredient);

            if (result) {
                throw redirect(303, '/ingredients');
            }
            
        } catch (error) {
            if (error.status === 303) {
                throw error;
            }
            
            console.error('Database error:', error);
            return {
                success: false,
                error: 'Ein Fehler ist bei der Datenbankoperation aufgetreten'
            };
        }
    }
};