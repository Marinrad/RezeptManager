import { redirect } from '@sveltejs/kit';
import multer from 'multer';
import path from 'path';
import db from '$lib/db';

const storage = multer.diskStorage({
    destination: './static/images/recipes',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });
const uploadMiddleware = upload.single('image');

export async function load({ params }) {
    try {
        const [recipe, ingredients] = await Promise.all([
            db.getRecipe(params.recipe_id),
            db.getIngredients()
        ]);
        return { recipe, ingredients };
    } catch (error) {
        console.error('Fehler beim Laden:', error);
        return { error: 'Fehler beim Laden des Rezepts.' };
    }
}

export const actions = {
    update: async ({ request, params }) => {
        return new Promise((resolve) => {
            uploadMiddleware(request, null, async (err) => {
                if (err) {
                    return resolve({ success: false, message: 'Fehler beim Hochladen der Datei.' });
                }

                try {
                    const data = await request.formData();
                    const ingredients = JSON.parse(data.get('ingredients') || '[]');

                    const recipe = {
                        _id: params.recipe_id,
                        name: data.get('name'),
                        duration: parseInt(data.get('duration')),
                        difficulty: data.get('difficulty'),
                        description: data.get('description'),
                        servings: parseInt(data.get('servings')),
                        instructions: data.get('instructions').split('\n').filter(Boolean),
                        ingredients
                    };

                    if (request.file) {
                        recipe.image = `/static/images/recipes/${request.file.filename}`;
                    }

                    await db.updateRecipe(recipe);
                    throw redirect(303, '/recipes'); // Weiterleitung zur Übersichtsseite nach erfolgreicher Aktualisierung

                } catch (error) {
                    console.error('Fehler beim Aktualisieren:', error);
                    return resolve({ success: false, message: 'Fehler beim Aktualisieren des Rezepts.' });
                }
            });
        });
    }
};