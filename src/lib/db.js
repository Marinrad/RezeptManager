// Database connection setup
import { MongoClient, ObjectId } from "mongodb";
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);
await client.connect();
const db = client.db("RecipeDB");

// Custom error class for database operations
class DatabaseError extends Error {
 constructor(message, operation) {
   super(message);
   this.name = 'DatabaseError';
   this.operation = operation;
 }
}

//////////////////////////////////////////
// Recipe Operations
//////////////////////////////////////////

// Retrieve all recipes from the database
async function getRecipes() {
  try {
    // Holt die Sammlung "recipes" aus der Datenbank
    const collection = db.collection("recipes");

    // Holt alle Rezepte aus der Sammlung
    const recipes = await collection.find({}).toArray();

    // Konvertiert die MongoDB ObjectIds in Strings für die Verwendung im Frontend
    return recipes.map(recipe => ({
      ...recipe,
      _id: recipe._id.toString()
    }));
  } catch (error) {
    // Fehlerbehandlung beim Abrufen aller Rezepte
    throw new DatabaseError('Fehler beim Abrufen der Rezepte', 'getRecipes');
  }
}

// Retrieve a single recipe by its ID
async function getRecipe(id) {
  try {
    // Holt die Sammlung "recipes" aus der Datenbank
    const collection = db.collection("recipes");

    // Findet ein Rezept anhand seiner ID
    const recipe = await collection.findOne({ _id: new ObjectId(id) });

    // Überprüft, ob das Rezept existiert, und gibt einen Fehler zurück, wenn nicht
    if (!recipe) {
      throw new DatabaseError(`Rezept mit ID ${id} nicht gefunden`, 'getRecipe');
    }

    // Konvertiert die MongoDB ObjectId in einen String und gibt das Rezept zurück
    return { ...recipe, _id: recipe._id.toString() };
  } catch (error) {
    // Fehlerbehandlung beim Abrufen eines einzelnen Rezepts
    throw new DatabaseError('Fehler beim Abrufen des Rezepts', 'getRecipe');
  }
}

// Create a new recipe in the database
async function createRecipe(recipe) {
  // Validiert, dass der Name des Rezepts vorhanden ist
  if (!recipe.name) {
    throw new DatabaseError('Name ist erforderlich', 'createRecipe');
  }

  // Setzt ein Standardbild, falls keines angegeben wurde
  recipe.image = recipe.image || "/images/recipe-default.png";
 
  try {
    // Fügt das neue Rezept in die Sammlung "recipes" ein
    const collection = db.collection("recipes");
    const result = await collection.insertOne(recipe);

    // Gibt die ID des eingefügten Rezepts zurück
    return result.insertedId.toString();
  } catch (error) {
    // Fehlerbehandlung beim Erstellen eines neuen Rezepts
    throw new DatabaseError('Fehler beim Erstellen des Rezepts', 'createRecipe');
  }
}

// Update an existing recipe
async function updateRecipe(recipe) {
  // Überprüft, ob die ID des Rezepts vorhanden ist
  if (!recipe._id) {
    throw new DatabaseError('ID ist erforderlich', 'updateRecipe');
  }

  try {
    // Entfernt die ID aus den Aktualisierungsdaten, da MongoDB keine _id-Aktualisierungen erlaubt
    const { _id, ...updateData } = recipe;

    // Aktualisiert das Rezept in der Sammlung "recipes"
    const collection = db.collection("recipes");
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    // Überprüft, ob ein Rezept mit der angegebenen ID gefunden wurde
    if (result.matchedCount === 0) {
      throw new DatabaseError(`Rezept mit ID ${_id} nicht gefunden`, 'updateRecipe');
    }

    // Gibt die ID des aktualisierten Rezepts zurück
    return _id;
  } catch (error) {
    // Fehlerbehandlung beim Aktualisieren eines Rezepts
    throw new DatabaseError('Fehler beim Aktualisieren des Rezepts', 'updateRecipe');
  }
}

// Delete a recipe by its ID
async function deleteRecipe(id) {
  // Überprüft, ob die ID des Rezepts vorhanden ist
  if (!id) {
    throw new DatabaseError('ID ist erforderlich', 'deleteRecipe');
  }

  try {
    // Löscht das Rezept aus der Sammlung "recipes" anhand seiner ID
    const collection = db.collection("recipes");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    // Überprüft, ob ein Rezept mit der angegebenen ID gelöscht wurde
    if (result.deletedCount === 0) {
      throw new DatabaseError(`Rezept mit ID ${id} nicht gefunden`, 'deleteRecipe');
    }

    // Gibt die ID des gelöschten Rezepts zurück
    return id;
  } catch (error) {
    // Fehlerbehandlung beim Löschen eines Rezepts
    throw new DatabaseError('Fehler beim Löschen des Rezepts', 'deleteRecipe');
  }
}

// Search recipes by a search term
async function searchRecipes(searchTerm) {
  try {
    // Sucht nach Rezepten, deren Namen den Suchbegriff enthalten (case-insensitive)
    const collection = db.collection("recipes");
    const recipes = await collection.find({ 
      name: { $regex: searchTerm, $options: 'i' }
    }).toArray();

    // Konvertiert die MongoDB ObjectIds in Strings für die Verwendung im Frontend
    return recipes.map(recipe => ({
      ...recipe,
      _id: recipe._id.toString()
    }));
  } catch (error) {
    // Fehlerbehandlung bei der Rezeptsuche
    throw new DatabaseError('Fehler bei der Rezeptsuche', 'searchRecipes');
  }
}

//////////////////////////////////////////
// Ingredient Operations
//////////////////////////////////////////

// Retrieve all ingredients from the database
async function getIngredients() {
  try {
    // Holt die Sammlung "ingredients" aus der Datenbank
    const collection = db.collection("ingredients");

    // Holt alle Zutaten aus der Sammlung und wandelt sie in ein Array um
    const ingredients = await collection.find({}).toArray();

    // Konvertiert die MongoDB ObjectIds in Strings für die Verwendung im Frontend
    return ingredients.map(ingredient => ({
      ...ingredient,
      _id: ingredient._id.toString(),
    }));
  } catch (error) {
    // Fehlerbehandlung beim Abrufen aller Zutaten
    throw new DatabaseError("Fehler beim Abrufen der Zutaten", "getIngredients");
  }
}

// Retrieve a single ingredient by its ID
async function getIngredient(id) {
  try {
    // Holt die Sammlung "ingredients" aus der Datenbank
    const collection = db.collection("ingredients");

    // Findet eine Zutat anhand ihrer ID
    const ingredient = await collection.findOne({ _id: new ObjectId(id) });

    // Überprüft, ob die Zutat existiert, und gibt einen Fehler zurück, wenn nicht
    if (!ingredient) {
      throw new DatabaseError(`Zutat mit ID ${id} nicht gefunden`, "getIngredient");
    }

    // Konvertiert die MongoDB ObjectId in einen String und gibt die Zutat zurück
    return { ...ingredient, _id: ingredient._id.toString() };
  } catch (error) {
    // Fehlerbehandlung beim Abrufen einer einzelnen Zutat
    throw new DatabaseError("Fehler beim Abrufen der Zutat", "getIngredient");
  }
}

// Create a new ingredient in the database
async function createIngredient(ingredient) {
  // Überprüft, ob die erforderlichen Felder vorhanden sind
  if (!ingredient.name) {
    throw new DatabaseError("Name ist erforderlich", "createIngredient");
  }
  if (!ingredient.category) {
    throw new DatabaseError("Kategorie ist erforderlich", "createIngredient");
  }
  if (!ingredient.unit) {
    throw new DatabaseError("Einheit ist erforderlich", "createIngredient");
  }
  if (ingredient.calories_per_100g == null) {
    throw new DatabaseError("Kalorien pro 100g sind erforderlich", "createIngredient");
  }

  try {
    // Fügt die neue Zutat in die Sammlung "ingredients" ein
    const collection = db.collection("ingredients");
    const result = await collection.insertOne(ingredient);

    // Gibt die ID der eingefügten Zutat zurück
    return result.insertedId.toString();
  } catch (error) {
    // Fehlerbehandlung beim Erstellen einer neuen Zutat
    throw new DatabaseError("Fehler beim Erstellen der Zutat", "createIngredient");
  }
}

// Update an existing ingredient
async function updateIngredient(ingredient) {
  // Überprüft, ob die ID der Zutat vorhanden ist
  if (!ingredient._id) {
    throw new DatabaseError("ID ist erforderlich", "updateIngredient");
  }

  try {
    // Entfernt die ID aus den Aktualisierungsdaten, da MongoDB keine _id-Aktualisierungen erlaubt
    const { _id, ...updateData } = ingredient;

    // Aktualisiert die Zutat in der Sammlung "ingredients"
    const collection = db.collection("ingredients");
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    // Überprüft, ob eine Zutat mit der angegebenen ID gefunden wurde
    if (result.matchedCount === 0) {
      throw new DatabaseError(`Zutat mit ID ${_id} nicht gefunden`, "updateIngredient");
    }

    // Gibt die ID der aktualisierten Zutat zurück
    return _id;
  } catch (error) {
    // Fehlerbehandlung beim Aktualisieren einer Zutat
    throw new DatabaseError("Fehler beim Aktualisieren der Zutat", "updateIngredient");
  }
}

// Delete an ingredient by its ID
async function deleteIngredient(id) {
  // Überprüft, ob die ID der Zutat vorhanden ist
  if (!id) {
    throw new DatabaseError("ID ist erforderlich", "deleteIngredient");
  }

  try {
    // Löscht die Zutat aus der Sammlung "ingredients" anhand ihrer ID
    const collection = db.collection("ingredients");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    // Überprüft, ob eine Zutat mit der angegebenen ID gelöscht wurde
    if (result.deletedCount === 0) {
      throw new DatabaseError(`Zutat mit ID ${id} nicht gefunden`, "deleteIngredient");
    }

    // Gibt die ID der gelöschten Zutat zurück
    return id;
  } catch (error) {
    // Fehlerbehandlung beim Löschen einer Zutat
    throw new DatabaseError("Fehler beim Löschen der Zutat", "deleteIngredient");
  }
}

// Search ingredients by a search term
async function searchIngredients(searchTerm) {
  try {
    // Sucht nach Zutaten, deren Namen den Suchbegriff enthalten (case-insensitive)
    const collection = db.collection("ingredients");
    const ingredients = await collection.find({ 
      name: { $regex: searchTerm, $options: 'i' }
    }).toArray();

    // Konvertiert die MongoDB ObjectIds in Strings für die Verwendung im Frontend
    return ingredients.map(ingredient => ({
      ...ingredient,
      _id: ingredient._id.toString()
    }));
  } catch (error) {
    // Fehlerbehandlung bei der Zutatensuche
    throw new DatabaseError('Fehler bei der Zutatensuche', 'searchIngredients');
  }
}

//////////////////////////////////////////
// Export all database operations
//////////////////////////////////////////

export default {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
  getIngredients,
  getIngredient,
  createIngredient,
  updateIngredient, 
  deleteIngredient,
  searchIngredients,
};