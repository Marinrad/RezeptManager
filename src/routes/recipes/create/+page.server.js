import { redirect } from '@sveltejs/kit';
import db from "$lib/db.js";

// Die Load-Funktion wird verwendet, um Zutaten beim Laden der Seite abzurufen
export async function load() {
    try {
        const ingredients = await db.getIngredients();
        return {
            ingredients // Gibt die Zutaten zurück
        };
    } catch (error) {
        console.error('Error loading ingredients:', error);
        return {
            ingredients: [], // Gibt eine leere Liste zurück
            error: 'Fehler beim Laden der Zutaten'
        };
    }
}

export const actions = {
    // Die `create`-Aktion wird verwendet, um ein neues Rezept zu erstellen
    create: async ({ request }) => {
        try {
            const data = await request.formData();

            // Validiert die erforderlichen Felder aus dem Formular
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

            // Erstellt ein Rezept-Objekt mit den gesammelten und verarbeiteten Daten
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

            // Speichert das Rezept in der Datenbank
            await db.createRecipe(recipe);

            throw redirect(303, '/recipes');
        } catch (error) {
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
