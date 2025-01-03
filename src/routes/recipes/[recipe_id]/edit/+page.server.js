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
    const recipe = await db.getRecipe(params.recipe_id);
    return {
        recipe
    };
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
                    const recipe = {
                        _id: params.recipe_id,
                        name: data.get('name'),
                        duration: parseInt(data.get('duration'), 10),
                        difficulty: data.get('difficulty'),
                        description: data.get('description'),
                        servings: parseInt(data.get('servings'), 10),
                        instructions: data.get('instructions').split('\n').filter(step => step.trim() !== ''),
                        ingredients: data.get('ingredients').split('\n')
                            .filter(line => line.trim())
                            .map(line => {
                                const [ingredient_id, amount, unit] = line.trim().split(' ');
                                return { ingredient_id, amount: parseInt(amount), unit };
                            })
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