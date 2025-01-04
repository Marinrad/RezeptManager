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
   const collection = db.collection("recipes");
   const recipes = await collection.find({}).toArray();
   // Convert MongoDB ObjectIds to strings for frontend compatibility
   return recipes.map(recipe => ({
     ...recipe,
     _id: recipe._id.toString()
   }));
 } catch (error) {
   throw new DatabaseError('Fehler beim Abrufen der Rezepte', 'getRecipes');
 }
}

// Retrieve a single recipe by its ID
async function getRecipe(id) {
 try {
   const collection = db.collection("recipes");
   const recipe = await collection.findOne({ _id: new ObjectId(id) });

   if (!recipe) {
     throw new DatabaseError(`Rezept mit ID ${id} nicht gefunden`, 'getRecipe');
   }
   return { ...recipe, _id: recipe._id.toString() };
 } catch (error) {
   throw new DatabaseError('Fehler beim Abrufen des Rezepts', 'getRecipe');
 }
}


// Create a new recipe in the database
async function createRecipe(recipe) {
 if (!recipe.name) {
   throw new DatabaseError('Name ist erforderlich', 'createRecipe');
 }

 // Set default image if none provided
 recipe.image = recipe.image || "/images/recipe-default.png";
 
 try {
   const collection = db.collection("recipes");
   const result = await collection.insertOne(recipe);
   return result.insertedId.toString();
 } catch (error) {
   throw new DatabaseError('Fehler beim Erstellen des Rezepts', 'createRecipe');
 }
}

// Update an existing recipe
async function updateRecipe(recipe) {
 if (!recipe._id) {
   throw new DatabaseError('ID ist erforderlich', 'updateRecipe');
 }

 try {
   // Remove _id from update data as MongoDB doesn't allow _id updates
   const { _id, ...updateData } = recipe;
   const collection = db.collection("recipes");
   const result = await collection.updateOne(
     { _id: new ObjectId(_id) },
     { $set: updateData }
   );

   if (result.matchedCount === 0) {
     throw new DatabaseError(`Rezept mit ID ${_id} nicht gefunden`, 'updateRecipe');
   }
   return _id;
 } catch (error) {
   throw new DatabaseError('Fehler beim Aktualisieren des Rezepts', 'updateRecipe');
 }
}

// Delete a recipe by its ID
async function deleteRecipe(id) {
 if (!id) {
   throw new DatabaseError('ID ist erforderlich', 'deleteRecipe');
 }

 try {
   const collection = db.collection("recipes");
   const result = await collection.deleteOne({ _id: new ObjectId(id) });

   if (result.deletedCount === 0) {
     throw new DatabaseError(`Rezept mit ID ${id} nicht gefunden`, 'deleteRecipe');
   }
   return id;
 } catch (error) {
   throw new DatabaseError('Fehler beim Löschen des Rezepts', 'deleteRecipe');
 }
}

async function searchRecipes(searchTerm) {
  try {
    const collection = db.collection("recipes");
    const recipes = await collection.find({ 
      name: { $regex: searchTerm, $options: 'i' }
    }).toArray();
    return recipes.map(recipe => ({
      ...recipe,
      _id: recipe._id.toString()
    }));
  } catch (error) {
    throw new DatabaseError('Fehler bei der Rezeptsuche', 'searchRecipes');
  }
}

//////////////////////////////////////////
// Ingredient Operations
//////////////////////////////////////////

// Retrieve all ingredients from the database
async function getIngredients() {
  try {
    const collection = db.collection("ingredients");
    const ingredients = await collection.find({}).toArray();
    return ingredients.map(ingredient => ({
      ...ingredient,
      _id: ingredient._id.toString(),
    }));
  } catch (error) {
    throw new DatabaseError("Fehler beim Abrufen der Zutaten", "getIngredients");
  }
}

// Retrieve a single ingredient by its ID
async function getIngredient(id) {
  try {
    const collection = db.collection("ingredients");
    const ingredient = await collection.findOne({ _id: new ObjectId(id) });

    if (!ingredient) {
      throw new DatabaseError(`Zutat mit ID ${id} nicht gefunden`, "getIngredient");
    }
    return { ...ingredient, _id: ingredient._id.toString() };
  } catch (error) {
    throw new DatabaseError("Fehler beim Abrufen der Zutat", "getIngredient");
  }
}

// Create a new ingredient in the database
async function createIngredient(ingredient) {
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
    const collection = db.collection("ingredients");
    const result = await collection.insertOne(ingredient);
    return result.insertedId.toString();
  } catch (error) {
    throw new DatabaseError("Fehler beim Erstellen der Zutat", "createIngredient");
  }
}

// Update an existing ingredient
async function updateIngredient(ingredient) {
  if (!ingredient._id) {
    throw new DatabaseError("ID ist erforderlich", "updateIngredient");
  }

  try {
    // Remove _id from update data as MongoDB doesn't allow _id updates
    const { _id, ...updateData } = ingredient;
    const collection = db.collection("ingredients");
    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      throw new DatabaseError(`Zutat mit ID ${_id} nicht gefunden`, "updateIngredient");
    }
    return _id;
  } catch (error) {
    throw new DatabaseError("Fehler beim Aktualisieren der Zutat", "updateIngredient");
  }
}

// Delete an ingredient by its ID
async function deleteIngredient(id) {
  if (!id) {
    throw new DatabaseError("ID ist erforderlich", "deleteIngredient");
  }

  try {
    const collection = db.collection("ingredients");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      throw new DatabaseError(`Zutat mit ID ${id} nicht gefunden`, "deleteIngredient");
    }
    return id;
  } catch (error) {
    throw new DatabaseError("Fehler beim Löschen der Zutat", "deleteIngredient");
  }
}

async function searchIngredients(searchTerm) {
  try {
    const collection = db.collection("ingredients");
    const ingredients = await collection.find({ 
      name: { $regex: searchTerm, $options: 'i' }
    }).toArray();
    return ingredients.map(ingredient => ({
      ...ingredient,
      _id: ingredient._id.toString()
    }));
  } catch (error) {
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