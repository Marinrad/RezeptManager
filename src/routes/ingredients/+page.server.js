import db from "$lib/db";

export async function load() {
  return {
    ingredients: await db.getIngredients() // Gibt die Zutaten-Daten an die Komponente zurück
  };
}