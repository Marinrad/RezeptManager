// Importiert die Datenbankfunktionen
import db from "$lib/db";

// Holt Zutaten aus der Datenbank und gibt sie zurück
export async function load() {
  return {
    ingredients: await db.getIngredients()
  };
}