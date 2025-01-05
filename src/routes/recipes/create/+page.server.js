// Importiert die Redirect-Funktion von SvelteKit und die Datenbank-Funktionen
import { redirect } from '@sveltejs/kit';
import db from "$lib/db.js";

// Die Load-Funktion wird verwendet, um Zutaten beim Laden der Seite abzurufen
export async function load() {
    try {
        // Holt die Zutaten aus der Datenbank
        const ingredients = await db.getIngredients();
        return {
            ingredients // Gibt die Zutaten zurück
        };
    } catch (error) {
        // Fehlerbehandlung beim Laden der Zutaten
        console.error('Error loading ingredients:', error);
        return {
            ingredients: [], // Gibt eine leere Liste zurück
            error: 'Fehler beim Laden der Zutaten' // Fehlermeldung für die UI
        };
    }
}

// Aktionen, die durch Formular-Interaktionen ausgelöst werden
export const actions = {
    // Die `create`-Aktion wird verwendet, um ein neues Rezept zu erstellen
    create: async ({ request }) => {
        try {
            // Holt die Formulardaten aus der Anfrage
            const data = await request.formData();

            // Validiert die erforderlichen Felder aus dem Formular
            const name = data.get("name")?.trim();
            const duration = parseInt(data.get("duration"));
            const difficulty = data.get("difficulty")?.trim();
            const description = data.get("description")?.trim();
            const servings = parseInt(data.get("servings"));
            const instructions = data.get("instructions")?.trim();
            const ingredientsData = data.get("ingredients");

            // Überprüft, ob alle Felder ausgefüllt sind
            if (!name || !duration || !difficulty || !description || !servings || !instructions || !ingredientsData) {
                return {
                    success: false,
                    error: 'Bitte füllen Sie alle Felder aus' // Fehlermeldung bei unvollständigen Daten
                };
            }

            // Erstellt ein Rezept-Objekt mit den gesammelten und verarbeiteten Daten
            let recipe = {
                name,
                duration,
                difficulty,
                description,
                servings,
                // Teilt die Anweisungen in einzelne Schritte auf, getrennt durch Zeilenumbrüche
                instructions: instructions.split('\n').filter(i => i.trim()),
                // Konvertiert die Zutaten-Daten in ein JSON-Objekt
                ingredients: JSON.parse(ingredientsData),
                // Platzhalterbild für das Rezept
                image: '/images/recipes/placeholder.png'
            };

            // Speichert das Rezept in der Datenbank
            await db.createRecipe(recipe);

            // Erfolgreiche Erstellung: Leitet den Benutzer zur Rezeptliste weiter
            throw redirect(303, '/recipes');
        } catch (error) {
            // Behandelt Redirects separat
            if (error.status === 303) {
                throw error;
            }

            // Fehlerbehandlung bei der Rezept-Erstellung
            console.error('Error creating recipe:', error);
            return {
                success: false,
                error: 'Ein Fehler ist bei der Datenbankoperation aufgetreten' // Fehlermeldung für die UI
            };
        }
    }
};
