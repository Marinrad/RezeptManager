import db from "$lib/db";

export async function load() {
  return {
    recipes: await db.getRecipes() // Gibt die Rezeptdaten an die Komponente zurück
  }
}