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

export const actions = {
    default: async ({ request }) => {
        return new Promise((resolve) => {
            uploadMiddleware(request, null, async (err) => {
                if (err) {
                    return resolve({ success: false });
                }

                try {
                    const data = await request.formData();
                    const ingredient = {
                        name: data.get('name'),
                        category: data.get('category'),
                        calories_per_100g: data.get('calories_per_100g'),
                        unit: data.get('unit'),
                        image: `/images/ingredients/${request.file.filename}`
                    };

                    await db.createIngredient(ingredient);
                    throw redirect(303, '/ingredients');
                } catch (error) {
                    console.error(error);
                    return resolve({ success: false });
                }
            });
        });
    }
};