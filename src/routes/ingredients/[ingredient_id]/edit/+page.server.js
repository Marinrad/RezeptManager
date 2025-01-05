import { redirect } from '@sveltejs/kit';
import db from '$lib/db';

export async function load({ params }) {
    // Holt die Zutat basierend auf der ID aus den URL-Parametern
    const ingredient = await db.getIngredient(params.ingredient_id);
    return {
        ingredient
    };
}

export const actions = {
    default: async ({ request, params }) => {
        try {
            const formData = await request.formData();
            
            // Validierung der Formulardaten
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

            // Zutat-Objekt mit aktualisierten Werten erstellen
            const ingredient = {
                _id: params.ingredient_id,
                name,
                category,
                calories_per_100g: calories,
                unit
            };

            // Zutat in der Datenbank aktualisieren
            const result = await db.updateIngredient(ingredient);

            // Weiterleitung, wenn das Update erfolgreich war
            if (result) {
                throw redirect(303, '/ingredients');
            }
            
        } catch (error) {
            // Wenn es ein Redirect ist, diesen durchlassen
            if (error.status === 303) {
                throw error;
            }
            
            // Alle anderen Fehler als Datenbankfehler behandeln
            console.error('Database error:', error);
            return {
                success: false,
                error: 'Ein Fehler ist bei der Datenbankoperation aufgetreten'
            };
        }
    }
};