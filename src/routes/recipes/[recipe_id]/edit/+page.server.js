// Importiert benötigte Module und Datenbankfunktionen
import { redirect } from '@sveltejs/kit';
import multer from 'multer';
import path from 'path';
import db from '$lib/db';

// Konfiguriert Multer für das Hochladen von Bildern
const storage = multer.diskStorage({
    // Zielverzeichnis für die hochgeladenen Dateien
    destination: './static/images/recipes',
    // Generiert einen eindeutigen Dateinamen basierend auf Zeitstempel
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Holt die Dateiendung
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

// Erstellt die Middleware für das Hochladen von Dateien
const upload = multer({ storage });
const uploadMiddleware = upload.single('image');

// `load`-Funktion: Lädt Rezept- und Zutateninformationen
export async function load({ params }) {
    try {
        // Holt das Rezept basierend auf der Rezept-ID
        const recipe = await db.getRecipe(params.recipe_id);
        // Holt alle verfügbaren Zutaten aus der Datenbank
        const ingredients = await db.getIngredients();
        
        return {
            recipe, // Gibt das Rezept zurück
            ingredients // Gibt die Zutaten zurück
        };
    } catch (error) {
        console.error('Fehler beim Laden:', error);
        return {
            error: 'Fehler beim Laden des Rezepts.' // Fehlernachricht für die Benutzeroberfläche
        };
    }
}

// `actions`-Objekt: Beinhaltet serverseitige Aktionen
export const actions = {
    // `update`-Aktion: Aktualisiert ein Rezept
    update: async ({ request, params }) => {
        return new Promise((resolve) => {
            // Verarbeitet die Datei mit der Upload-Middleware
            uploadMiddleware(request, null, async (err) => {
                if (err) {
                    return resolve({
                        success: false,
                        message: 'Fehler beim Hochladen der Datei.' // Fehlernachricht bei Dateifehler
                    });
                }

                try {
                    // Holt die Formulardaten aus der Anfrage
                    const data = await request.formData();
                    
                    // Parse die Zutaten aus dem JSON-String
                    let ingredients;
                    try {
                        ingredients = JSON.parse(data.get('ingredients')); // Konvertiert JSON zu einem Array
                    } catch (e) {
                        console.error('Fehler beim Parsen der Zutaten:', e);
                        ingredients = []; // Leere Zutatenliste bei Fehler
                    }

                    // Erstellt ein aktualisiertes Rezept-Objekt
                    const recipe = {
                        _id: params.recipe_id, // Rezept-ID
                        name: data.get('name'), // Rezeptname
                        duration: parseInt(data.get('duration'), 10), // Zubereitungszeit
                        difficulty: data.get('difficulty'), // Schwierigkeitsgrad
                        description: data.get('description'), // Beschreibung
                        servings: parseInt(data.get('servings'), 10), // Anzahl der Portionen
                        // Trennt die Anweisungen in einzelne Schritte
                        instructions: data.get('instructions').split('\n').filter(step => step.trim() !== ''),
                        ingredients // Verknüpfte Zutatenliste
                    };

                    // Fügt ein Bild hinzu, wenn eine Datei hochgeladen wurde
                    if (request.file) {
                        recipe.image = `/static/images/recipes/${request.file.filename}`;
                    }

                    // Aktualisiert das Rezept in der Datenbank
                    await db.updateRecipe(recipe);

                    // Leitet zur Rezeptseite weiter und zeigt eine Erfolgsmeldung
                    throw redirect(303, `/recipes/${params.recipe_id}?updated=true`);
                } catch (error) {
                    console.error('Fehler beim Aktualisieren:', error);
                    return resolve({
                        success: false,
                        message: 'Fehler beim Aktualisieren des Rezepts.' // Fehlernachricht bei Aktualisierungsfehler
                    });
                }
            });
        });
    }
};
