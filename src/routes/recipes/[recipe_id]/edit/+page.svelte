<!-- EditRecipe.svelte -->
<script>
  let { data, form } = $props();
  let recipe = data.recipe;
  
  let selectedIngredientId = "";
  let amount = "";
  // Initialisiere die Zutatenliste mit den vorhandenen Zutaten
  let ingredientsList = recipe.ingredients.map(ing => {
    const ingredientData = data.ingredients.find(i => i._id === ing.ingredient_id);
    return {
      ingredient_id: ing.ingredient_id,
      name: ingredientData?.name,
      amount: ing.amount,
      unit: ingredientData?.unit
    };
  });
 
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
 
  function removeIngredient(index) {
    ingredientsList = ingredientsList.filter((_, i) => i !== index);
  }
 
  function handleSubmit(event) {
    const form = event.target;
    const ingredientsInput = form.querySelector('input[name="ingredients"]');
    const dbIngredients = ingredientsList.map(item => ({
      ingredient_id: item.ingredient_id,
      amount: item.amount
    }));
    ingredientsInput.value = JSON.stringify(dbIngredients);
  }
</script>

<style>
  .input-group-text,
  .form-control,
  .btn {
    height: 38px !important;
    line-height: 1.5 !important;
    padding-top: 0.375rem !important;
    padding-bottom: 0.375rem !important;
  }

  .input-group-text {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  textarea.form-control {
    height: auto !important;
  }
</style>

<div class="edit-recipe-container">
  <a href="/recipes" class="back-link">← Zurück</a>
  
  <div class="form-header">
    <h1>Rezept bearbeiten</h1>
    <p class="subtitle">Rezept "{recipe.name}" bearbeiten</p>
  </div>

  <form method="POST" action="?/update" class="recipe-form" on:submit={handleSubmit}>
    <div class="form-grid">
      <!-- Linke Spalte -->
      <div class="form-col">
        <div class="form-section">
          <h3>📝 Grundinformationen</h3>
          
          <!-- Rezeptname -->
          <div class="mb-4">
            <label for="name" class="form-label">Rezeptname</label>
            <input 
              id="name" 
              name="name" 
              class="form-control" 
              type="text" 
              value={recipe.name}
              required 
            />
          </div>

          <!-- Metriken -->
          <div class="recipe-metrics mb-4">
            <!-- Zubereitungszeit -->
            <div class="metric-input">
              <label for="duration" class="form-label">Zubereitungszeit</label>
              <div class="input-group">
                <input 
                  id="duration" 
                  name="duration" 
                  class="form-control" 
                  type="number" 
                  value={recipe.duration}
                  required 
                />
                <span class="input-group-text" style="width: 45px;">Min</span>
              </div>
            </div>
            
            <!-- Schwierigkeit -->
            <div class="metric-input">
              <label for="difficulty" class="form-label">Schwierigkeit</label>
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

            <!-- Portionen -->
            <div class="metric-input">
              <label for="servings" class="form-label">Portionen</label>
              <input 
                id="servings" 
                name="servings" 
                class="form-control" 
                type="number" 
                value={recipe.servings}
                required 
              />
            </div>
          </div>

          <!-- Beschreibung -->
          <div class="mb-4">
            <label for="description" class="form-label">Beschreibung</label>
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

      <!-- Rechte Spalte -->
      <div class="form-col">
        <div class="form-section">
          <h3>📋 Zutaten und Zubereitung</h3>
          
          <!-- Zutaten -->
          <div class="mb-4">
            <label for="ingredient-select" class="form-label">Zutaten</label>
            <div class="input-group mb-2">
              <select 
                id="ingredient-select"
                class="form-control"
                bind:value={selectedIngredientId}
              >
                <option value="">Zutat auswählen...</option>
                {#each data.ingredients as ingredient}
                  <option value={ingredient._id}>
                    {ingredient.name}
                  </option>
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
              >
                +
              </button>
            </div>

            <!-- Zutatenliste -->
            <div class="ingredients-list">
              {#each ingredientsList as item, index}
                <div class="ingredient-item">
                  <span>
                    {item.name} - {item.amount} {item.unit}
                  </span>
                  <button 
                    type="button" 
                    class="btn btn-danger btn-sm"
                    on:click={() => removeIngredient(index)}
                  >
                    ×
                  </button>
                </div>
              {/each}
            </div>

            <input type="hidden" name="ingredients" value="">
          </div>

          <!-- Zubereitungsschritte -->
          <div class="mb-4">
            <label for="instructions" class="form-label">Zubereitungsschritte</label>
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

    <!-- Formular-Aktionen -->
    <div class="form-actions">  
      <button type="submit" class="btn btn-primary btn-lg">Änderungen speichern</button>
    </div>
  </form>

  <!-- Feedback-Meldungen -->
  {#if form?.error}
    <div class="alert alert-danger mt-4">
      {form.error}
    </div>
  {/if}

  {#if form?.success}
    <div class="alert alert-success mt-4">
      Rezept wurde erfolgreich aktualisiert!
    </div>
  {/if}
</div>