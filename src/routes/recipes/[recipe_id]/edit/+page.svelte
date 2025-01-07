<script>
  export let data;
  export let form;
  import { goto } from '$app/navigation';
  
  let recipe = data.recipe;
  let selectedIngredientId = "";
  let amount = "";
  // Zutatenliste initialisieren
  let ingredientsList = recipe.ingredients.map(ing => ({
    ingredient_id: ing.ingredient_id,
    name: data.ingredients.find(i => i._id === ing.ingredient_id)?.name,
    amount: ing.amount,
    unit: data.ingredients.find(i => i._id === ing.ingredient_id)?.unit
  }));
 
  // Funktion zum Hinzufügen einer Zutat zur Zutatenliste
  function addIngredient() {
    if (selectedIngredientId && amount) {
      const selectedIngredient = data.ingredients.find(i => i._id === selectedIngredientId);
      if (selectedIngredient) {
        ingredientsList = [
          ...ingredientsList, 
          {
            ingredient_id: selectedIngredient._id,
            name: selectedIngredient.name,
            amount: parseFloat(amount),
            unit: selectedIngredient.unit
          }
        ];
        selectedIngredientId = "";
        amount = "";
      }
    }
  }
 
  // Funktion zum Entfernen einer Zutat aus der Zutatenliste
  function removeIngredient(index) {
    ingredientsList = ingredientsList.filter((_, i) => i !== index);
  }
 
  // Funktion zum Verarbeiten des Formulars
  async function handleSubmit(event) {
    event.preventDefault();
    const dbIngredients = ingredientsList.map(item => ({
      ingredient_id: item.ingredient_id,
      amount: item.amount
    }));
    
    const formEl = event.target;
    formEl.querySelector('input[name="ingredients"]').value = JSON.stringify(dbIngredients);
    
    const formData = new FormData(formEl);
    const response = await fetch(formEl.action, {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      goto('/recipes');
    }
  }
</script>

<div class="edit-recipe-container">
  <a href="/recipes" class="back-link">← Zurück</a>
  
  <div class="form-header">
    <h1>Rezept bearbeiten</h1>
    <p class="subtitle">Rezept "{recipe.name}" bearbeiten</p>
  </div>

  <form method="POST" action="?/update" class="recipe-form" on:submit={handleSubmit}>
    <div class="form-grid">
      <div class="form-col">
        <div class="form-section">
          <h3>📝 Grundinformationen</h3>
          
          <div class="mb-4">
            <label for="name">Rezeptname</label>
            <input 
              id="name" 
              name="name" 
              class="form-control" 
              type="text" 
              value={recipe.name}
              required 
            />
          </div>

          <div class="recipe-metrics mb-4">
            <div class="metric-input">
              <label for="duration">Zubereitungszeit</label>
              <div class="input-group">
                <input 
                  id="duration" 
                  name="duration" 
                  class="form-control" 
                  type="text" 
                  value={recipe.duration}
                  required 
                />
                <span class="input-group-text">Min</span>
              </div>
            </div>
            
            <div class="metric-input">
              <label for="difficulty">Schwierigkeit</label>
              <select 
                id="difficulty" 
                name="difficulty" 
                class="form-control" 
                required
              >
                <option value="">Auswählen...</option>
                <option value="Easy" selected={recipe.difficulty === 'Easy'}>Einfach</option>
                <option value="Medium" selected={recipe.difficulty === 'Medium'}>Mittel</option>
                <option value="Hard" selected={recipe.difficulty === 'Hard'}>Schwer</option>
              </select>
            </div>

            <div class="metric-input">
              <label for="servings">Portionen</label>
              <input 
                id="servings" 
                name="servings" 
                class="form-control" 
                type="text" 
                value={recipe.servings}
                required 
              />
            </div>
          </div>

          <div class="mb-4">
            <label for="description">Beschreibung</label>
            <textarea 
              id="description" 
              name="description" 
              class="form-control" 
              rows="6" 
              required
            >{recipe.description}</textarea>
          </div>
        </div>
      </div>

      <div class="form-col">
        <div class="form-section">
          <h3>📋 Zutaten und Zubereitung</h3>
          
          <div class="mb-4">
            <label for="ingredient-select">Zutaten</label>
            <div class="input-group mb-2">
              <select 
                id="ingredient-select"
                class="form-control"
                bind:value={selectedIngredientId}
              >
                <option value="">Zutat auswählen...</option>
                {#each data.ingredients as ingredient}
                  <option value={ingredient._id}>{ingredient.name}</option>
                {/each}
              </select>
              
              <input 
                type="text"
                class="form-control ingredient-amount"
                placeholder="Menge"
                bind:value={amount}
              />
              <span class="input-group-text">
                {selectedIngredientId ? data.ingredients.find(i => i._id === selectedIngredientId)?.unit : ''}
              </span>
              <button 
                type="button" 
                class="btn btn-secondary"
                on:click={addIngredient}
              >+</button>
            </div>

            <div class="ingredients-list">
              {#each ingredientsList as item, index}
                <div class="ingredient-item">
                  <span>{item.name} - {item.amount} {item.unit}</span>
                  <button 
                    type="button" 
                    class="btn btn-danger btn-sm"
                    on:click={() => removeIngredient(index)}
                  >×</button>
                </div>
              {/each}
            </div>

            <input type="hidden" name="ingredients" value="">
          </div>

          <div class="mb-4">
            <label for="instructions">Zubereitungsschritte</label>
            <textarea 
              id="instructions" 
              name="instructions" 
              class="form-control" 
              rows="10" 
              required
            >{Array.isArray(recipe.instructions) ? recipe.instructions.join('\n') : recipe.instructions}</textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="form-actions">  
      <button type="submit" class="btn btn-primary btn-lg">Änderungen speichern</button>
    </div>
  </form>

  {#if form?.error}
    <div class="alert alert-danger mt-4">{form.error}</div>
  {/if}

  {#if form?.success}
    <div class="alert alert-success mt-4">Rezept wurde erfolgreich aktualisiert!</div>
  {/if}
</div>