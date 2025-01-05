// Importiert die Datenbank-Funktionen und die Redirect-Funktion von SvelteKit
import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

// `load`-Funktion: Holt das Rezept und ergänzt die Zutateninformationen
export async function load({ params }) {
  // Holt das Rezept basierend auf der Rezept-ID aus den URL-Parametern
  const recipe = await db.getRecipe(params.recipe_id);

  // Ergänzt die Zutateninformationen (Name und Einheit) basierend auf der Zutaten-ID
  const ingredients = await Promise.all(
    recipe.ingredients.map(async (ingredient) => {
      // Holt die Details der Zutat aus der Datenbank
      const ingredientDetails = await db.getIngredient(ingredient.ingredient_id);
      return {
        amount: ingredient.amount, // Menge der Zutat
        name: ingredientDetails.name, // Name der Zutat, z. B. "Olivenöl"
        unit: ingredientDetails.unit  // Einheit der Zutat, z. B. "ml"
      };
    })
  );

  // Aktualisiert die Zutatenliste im Rezept mit den detaillierten Informationen
  recipe.ingredients = ingredients;

  // Gibt das Rezept zurück, damit es in der Benutzeroberfläche angezeigt werden kann
  return {
    recipe
  };
}

// `actions`-Objekt: Beinhaltet serverseitige Aktionen
export const actions = {
  // `delete`-Aktion: Löscht ein Rezept aus der Datenbank
  delete: async ({ request }) => {
    // Holt die Formulardaten aus der Anfrage
    const data = await request.formData();

    // Löscht das Rezept basierend auf der übermittelten ID
    await db.deleteRecipe(data.get("id"));

    // Leitet den Benutzer nach dem Löschen zur Rezeptübersicht weiter
    redirect(303, "/recipes");
  }
};