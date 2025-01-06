import db from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
  const recipe = await db.getRecipe(params.recipe_id);
  
  const ingredients = await Promise.all(
    recipe.ingredients.map(async ({ ingredient_id, amount }) => {
      const { name, unit } = await db.getIngredient(ingredient_id);
      return { amount, name, unit };
    })
  );

  return {
    recipe: { ...recipe, ingredients }
  };
};

export const actions = {
  delete: async ({ request }) => {
    try {
      const formData = await request.formData();
      await db.deleteRecipe(formData.get("id"));
      return { success: true };
    } catch (error) {
      console.error('Delete error:', error);
      return {
        status: 500,
        error: 'Failed to delete recipe'
      };
    } finally {
      throw redirect(303, "/recipes");
    }
  }
};