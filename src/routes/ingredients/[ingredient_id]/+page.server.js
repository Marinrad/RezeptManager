// Importiert die Datenbankfunktionen aus "$lib/db.js"
// Diese werden verwendet, um mit der Zutaten-Datenbank zu kommunizieren.
import db from "$lib/db.js";

// Importiert die redirect-Funktion aus SvelteKit, um Weiterleitungen auszuführen
import { redirect } from "@sveltejs/kit";

// Lädt die Daten für die Zutat basierend auf der übergebenen ID
export async function load({ params }) {
  return {
    // Ruft die spezifische Zutat aus der Datenbank ab.
    // `params.ingredient_id` enthält die ID der Zutat aus der URL.
    ingredient: await db.getIngredient(params.ingredient_id)
  };
}

// Definiert die serverseitigen Aktionen, die von der Seite ausgeführt werden können
export const actions = {
  // "delete"-Aktion: Wird ausgeführt, um eine Zutat zu löschen
  delete: async ({ request }) => {
    // Holt die Formulardaten aus der Anfrage
    const data = await request.formData();

    // Löscht die Zutat aus der Datenbank anhand der übermittelten ID
    await db.deleteIngredient(data.get("id"));

    // Leitet den Benutzer nach erfolgreichem Löschen der Zutat
    // auf die Zutatenliste ("/ingredients") weiter
    redirect(303, "/ingredients"); 
  }
};