import { redirect } from '@sveltejs/kit';
import multer from 'multer';
import path from 'path';
import db from '$lib/db';

const storage = multer.diskStorage({
    destination: './static/images/ingredients',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const upload = multer({ storage });
const uploadMiddleware = upload.single('image');

export async function load({ params }) {
    const ingredient = await db.getIngredient(params.ingredient_id);
    return {
        ingredient
    };
}

export const actions = {
    default: async ({ request, params }) => {
        return new Promise((resolve) => {
            uploadMiddleware(request, null, async (err) => {
                if (err) {
                    return resolve({
                        success: false,
                        message: 'Fehler beim Hochladen der Datei.'
                    });
                }

                try {
                    const data = await request.formData();
                    const ingredient = {
                        _id: params.ingredient_id,
                        name: data.get('name'),
                        category: data.get('category'),
                        calories_per_100g: parseInt(data.get('calories_per_100g'), 10),
                        unit: data.get('unit')
                    };

                    if (request.file) {
                        ingredient.image = `/static/images/ingredients/${request.file.filename}`;
                    }

                    await db.updateIngredient(ingredient);
                    // Hier leiten wir zur Hauptübersicht zurück
                    throw redirect(303, '/ingredients?updated=true');
                } catch (error) {
                    return resolve({
                        success: false,
                        message: 'Fehler beim Aktualisieren der Zutat.'
                    });
                }
            });
        });
    }
};