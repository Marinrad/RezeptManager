import { redirect } from '@sveltejs/kit';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import db from '$lib/db.js';

// Stelle sicher, dass der Upload-Ordner existiert
const uploadDir = 'static/images/ingredients'; // Pfad ohne führenden Punkt
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Behalte den originalen Dateinamen bei
        const originalname = file.originalname;
        cb(null, originalname);
    }
});

const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Nur .png und .jpg/.jpeg Dateien sind erlaubt'), false);
        }
    }
});

export const actions = {
    default: async ({ request }) => {
        return new Promise((resolve) => {
            const uploadSingle = upload.single('image');

            uploadSingle(request, null, async (err) => {
                if (err) {
                    console.error('Upload error:', err);
                    return resolve({ 
                        success: false, 
                        error: err.message || 'Fehler beim Bildupload'
                    });
                }

                try {
                    const formData = await request.formData();
                    
                    // Validiere die Formulardaten
                    const name = formData.get('name')?.trim();
                    const category = formData.get('category')?.trim();
                    const calories = parseInt(formData.get('calories_per_100g'), 10);
                    const unit = formData.get('unit')?.trim();

                    if (!name || !category || !unit || isNaN(calories)) {
                        return resolve({
                            success: false,
                            error: 'Bitte füllen Sie alle Felder korrekt aus'
                        });
                    }

                    const ingredient = {
                        name,
                        category,
                        calories_per_100g: calories,
                        unit,
                        // Setze den korrekten Bildpfad
                        image: request.file 
                            ? `/images/ingredients/${request.file.originalname}`
                            : '/images/ingredients/default.png'
                    };

                    console.log('Saving ingredient:', ingredient); // Debug-Ausgabe

                    try {
                        await db.createIngredient(ingredient);
                        throw redirect(303, '/ingredients');
                    } catch (error) {
                        if (error instanceof Error && error.message.includes('redirect')) {
                            throw error;
                        }

                        console.error('Database error:', error);
                        
                        // Lösche das hochgeladene Bild bei Datenbankfehlern
                        if (request.file) {
                            fs.unlink(path.join(uploadDir, request.file.filename), (unlinkErr) => {
                                if (unlinkErr) console.error('Error deleting file:', unlinkErr);
                            });
                        }

                        return resolve({
                            success: false,
                            error: error.message || 'Fehler beim Speichern in der Datenbank'
                        });
                    }
                } catch (error) {
                    if (error instanceof Error && error.message.includes('redirect')) {
                        throw error;
                    }

                    console.error('Server error:', error);
                    
                    // Cleanup bei allgemeinen Fehlern
                    if (request.file) {
                        fs.unlink(path.join(uploadDir, request.file.filename), (unlinkErr) => {
                            if (unlinkErr) console.error('Error deleting file:', unlinkErr);
                        });
                    }

                    return resolve({
                        success: false,
                        error: 'Ein unerwarteter Fehler ist aufgetreten'
                    });
                }
            });
        });
    }
};