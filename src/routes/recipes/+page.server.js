import db from "$lib/db";

export async function load() {
  return {
    people: await db.getRecipes() // Return the recipes data to the component
  }
}
