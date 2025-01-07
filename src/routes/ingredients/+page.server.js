import db from "$lib/db";

export async function load() {
  try {
    const ingredients = await db.getIngredients();
    return {
      ingredients
    };
  } catch (error) {
    console.error('Fehler beim Laden der Zutaten:', error);
    return {
      ingredients: [],
      error: 'Zutaten konnten nicht geladen werden'
    };
  }
}