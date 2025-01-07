import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  return {
    ingredient: await db.getIngredient(params.ingredient_id)
  };
}

export const actions = {
  // Die `delete`-Aktion löscht eine Zutat basierend auf der übermittelten ID
  delete: async ({ request }) => {
    const data = await request.formData();

    await db.deleteIngredient(data.get("id"));

    throw redirect(303, "/ingredients"); 
  }
};