import { redirect } from '@sveltejs/kit';
import multer from 'multer';
import path from 'path';
import db from '$lib/db';

const storage = multer.diskStorage({
    destination: './static/images/recipes',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const upload = multer({ storage });
const uploadMiddleware = upload.single('image');

export async function load({ params }) {
    try {
        // Hole das Rezept
        const recipe = await db.getRecipe(params.recipe_id);
        // Hole alle verfügbaren Zutaten für das Dropdown
        const ingredients = await db.getIngredients();
        
        return {
            recipe,
            ingredients
        };
    } catch (error) {
        console.error('Fehler beim Laden:', error);
        return {
            error: 'Fehler beim Laden des Rezepts.'
        };
    }
}

export const actions = {
    update: async ({ request, params }) => {
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
                    
                    // Parse die Zutaten aus dem JSON-String
                    let ingredients;
                    try {
                        ingredients = JSON.parse(data.get('ingredients'));
                    } catch (e) {
                        console.error('Fehler beim Parsen der Zutaten:', e);
                        ingredients = [];
                    }

                    const recipe = {
                        _id: params.recipe_id,
                        name: data.get('name'),
                        duration: parseInt(data.get('duration'), 10),
                        difficulty: data.get('difficulty'),
                        description: data.get('description'),
                        servings: parseInt(data.get('servings'), 10),
                        instructions: data.get('instructions').split('\n').filter(step => step.trim() !== ''),
                        ingredients: ingredients // Verwende die geparsten Zutaten
                    };

                    if (request.file) {
                        recipe.image = `/static/images/recipes/${request.file.filename}`;
                    }

                    await db.updateRecipe(recipe);
                    throw redirect(303, `/recipes/${params.recipe_id}?updated=true`);
                } catch (error) {
                    console.error('Fehler beim Aktualisieren:', error);
                    return resolve({
                        success: false,
                        message: 'Fehler beim Aktualisieren des Rezepts.'
                    });
                }
            });
        });
    }
};