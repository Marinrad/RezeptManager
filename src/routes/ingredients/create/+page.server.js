import { redirect } from '@sveltejs/kit';
import db from '$lib/db.js';

export const actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();
            
            // Daten aus dem Formular extrahieren und trimmen
            const data = {
                name: formData.get('name')?.trim(),
                category: formData.get('category')?.trim(),
                calories_per_100g: parseInt(formData.get('calories_per_100g'), 10),
                unit: formData.get('unit')?.trim(),
            };

            // Validierung der Formulardaten
            const validationErrors = validateIngredient(data);
            if (validationErrors) {
                return {
                    success: false,
                    error: validationErrors
                };
            }

            const ingredient = {
                ...data,
                image: '/images/ingredients/placeholder.png'
            };

            // Zutat in der Datenbank erstellen
            const result = await db.createIngredient(ingredient);
            
            if (result) {
                throw redirect(303, '/ingredients');
            }
            
        } catch (error) {
            if (error.status === 303) throw error;
            
            console.error('Database error:', error);
            return {
                success: false,
                error: 'Ein Fehler ist bei der Datenbankoperation aufgetreten'
            };
        }
    }
};

function validateIngredient(data) {
    const { name, category, calories_per_100g, unit } = data;
    
    // Überprüfen, ob alle Felder korrekt ausgefüllt sind
    if (!name || !category || !unit || isNaN(calories_per_100g)) {
        return 'Bitte füllen Sie alle Felder korrekt aus';
    }
    
    return null;
}