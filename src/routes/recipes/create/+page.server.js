import db from "$lib/db.js";

export async function load() {
  const ingredients = await db.getIngredients();
  return {
    ingredients
  };
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    let recipe = {
      name: data.get("name"),
      duration: parseInt(data.get("duration")),
      difficulty: data.get("difficulty"),
      description: data.get("description"),
      servings: parseInt(data.get("servings")),
      instructions: data.get("instructions").split('\n').filter(i => i.trim()),
      ingredients: JSON.parse(data.get("ingredients"))
    };
    
    await db.createRecipe(recipe);
    return { success: true };
  },
};