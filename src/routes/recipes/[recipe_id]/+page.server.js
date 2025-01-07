import db from '$lib/db.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
  // Rezept aus der Datenbank abrufen
  const recipe = await db.getRecipe(params.recipe_id);
  
  // Zutateninformationen abrufen und mit Mengenangaben kombinieren
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
  // Die `delete`-Aktion löscht ein Rezept basierend auf der übermittelten ID
  delete: async ({ request }) => {
    try {
      // Formulardaten aus der Anfrage abrufen
      const formData = await request.formData();
      // Rezept in der Datenbank löschen
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