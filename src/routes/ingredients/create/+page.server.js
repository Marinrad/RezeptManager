import { redirect } from '@sveltejs/kit';
import db from '$lib/db.js';

export const actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();
            
            // Validate form data
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

            const ingredient = {
                name,
                category,
                calories_per_100g: calories,
                unit,
                image: '/images/ingredients/placeholder.png'
            };

            // Speichern in der Datenbank
            const result = await db.createIngredient(ingredient);
            
            // Wenn das Speichern erfolgreich war, redirect ausführen
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