import db from "$lib/db.js";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  return {
    ingredient: await db.getIngredient(params.ingredient_id)  // Fetching ingredient by ID
  };
}

export const actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    await db.deleteIngredient(data.get("id"));
    redirect(303, "/ingredients");  // Redirecting to ingredients page after deletion
  }
};