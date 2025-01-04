import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  const recipe = await db.getRecipe(params.recipe_id);

  // Zutateninformationen erweitern (name + unit aus der Zutatendatenbank)
  const ingredients = await Promise.all(
    recipe.ingredients.map(async (ingredient) => {
      const ingredientDetails = await db.getIngredient(ingredient.ingredient_id);
      return {
        amount: ingredient.amount,
        name: ingredientDetails.name, // Name der Zutat, z. B. "Olive Oil"
        unit: ingredientDetails.unit  // Einheit der Zutat, z. B. "ml"
      };
    })
  );

  recipe.ingredients = ingredients;

  return {
    recipe
  };
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    await db.deleteRecipe(data.get("id"));
    redirect(303, "/recipes"); // Nach dem Löschen zur Rezepte-Seite weiterleiten
  }
};
