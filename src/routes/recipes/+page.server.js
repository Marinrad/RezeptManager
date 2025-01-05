// Importiert die Datenbank-Funktionen aus der Datei "$lib/db"
import db from "$lib/db";

// Die Funktion `load` wird verwendet, um die Rezeptdaten beim Laden der Seite zu holen
export async function load() {
  return {
    // Holt alle Rezepte aus der Datenbank und gibt sie zurück
    recipes: await db.getRecipes() 
  };
}