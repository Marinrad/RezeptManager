import { json } from '@sveltejs/kit';
import multer from 'multer';
import path from 'path';
import db from '../../../lib/db'; // Importiere die DB-Operationen aus db.js

// Multer-Konfiguration für Dateiupload
const storage = multer.diskStorage({
    destination: './static/images/ingredients', // Pfad, wo die Bilder gespeichert werden
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Datei-Endung (.png, .jpg)
        cb(null, `${file.fieldname}-${Date.now()}${ext}`); // z.B. image-1234567890.png
    }
});

const upload = multer({ storage });
const uploadMiddleware = upload.single('image');

// Aktionen-Handler für POST
export const actions = {
    default: async ({ request }) => {
        return new Promise((resolve) => {
            // Verarbeite die Datei mit Multer
            uploadMiddleware(request, null, async (err) => {
                if (err) {
                    console.error('Fehler beim Hochladen der Datei:', err);
                    return resolve(json({ success: false, message: 'Fehler beim Hochladen der Datei.' }));
                }

                try {
                    // Daten aus der Anfrage (FormData) abrufen
                    const data = await request.formData();
                    const name = data.get('name');
                    const category = data.get('category');
                    const calories_per_100g = parseInt(data.get('calories_per_100g'), 10);
                    const unit = data.get('unit');

                    // Relativer Pfad zum gespeicherten Bild
                    const imagePath = `/static/images/ingredients/${request.file.filename}`;

                    // Zutat-Daten erstellen
                    const ingredient = {
                        name,
                        image: imagePath,
                        category,
                        calories_per_100g,
                        unit
                    };

                    // Zutat in die Datenbank speichern
                    const insertedId = await db.createIngredient(ingredient);

                    resolve(json({ success: true, message: 'Zutat wurde erfolgreich hinzugefügt!', id: insertedId }));
                } catch (error) {
                    console.error('Fehler beim Speichern der Zutat:', error);
                    resolve(json({ success: false, message: 'Fehler beim Speichern der Zutat.' }));
                }
            });
        });
    }
};