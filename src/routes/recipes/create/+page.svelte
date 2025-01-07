<script>
  export let data;
  export let form;

  // Lokale Zustandsvariablen
  let selectedIngredientId = ""; 
  let amount = "";
  let ingredientsList = [];

  // Funktion: Fügt eine Zutat mit Menge zur Liste hinzu
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
        // Zurücksetzen der Eingabefelder
        selectedIngredientId = "";
        amount = "";
      }
    }
  }

  function removeIngredient(index) {
    ingredientsList = ingredientsList.filter((_, i) => i !== index);
  }

  // Funktion: Bereitet die Zutatenliste für das Formular vor
  function handleSubmit(event) {
    const form = event.target;
    const ingredientsInput = form.querySelector('input[name="ingredients"]');
    const dbIngredients = ingredientsList.map(item => ({
      ingredient_id: item.ingredient_id,
      amount: item.amount
    }));
    ingredientsInput.value = JSON.stringify(dbIngredients); // Konvertiert Zutatenliste in JSON
  }
</script>

<!-- CSS-Styles für Formularfelder -->
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

<div class="create-recipe-container">
  <a href="/recipes" class="back-link">← Zurück</a>
  
  <div class="form-header">
    <h1>Neues Rezept erstellen</h1>
    <p class="subtitle">Ein neues kulinarisches Abenteuer beginnt</p>
  </div>

  <!-- Rezept-Erstellungsformular -->
  <form method="POST" action="?/create" class="recipe-form" on:submit={handleSubmit}>
    <div class="form-grid">
      <div class="form-col">
        <div class="form-section">
          <h3>📝 Grundinformationen</h3>

          <div class="mb-4">
            <label for="name" class="form-label">Rezeptname</label>
            <input 
              id="name" 
              name="name" 
              class="form-control" 
              type="text" 
              placeholder="z.B. Italienische Lasagne" 
              required 
            />
          </div>

          <div class="recipe-metrics mb-4">
            <div class="metric-input">
              <label for="duration" class="form-label">Zubereitungszeit</label>
              <div class="input-group">
                <input 
                  id="duration" 
                  name="duration" 
                  class="form-control" 
                  type="text" 
                  placeholder="45" 
                  required 
                />
                <span class="input-group-text" style="width: 45px;">Min</span>
              </div>
            </div>
            
            <div class="metric-input">
              <label for="difficulty" class="form-label">Schwierigkeit</label>
              <select 
                id="difficulty" 
                name="difficulty" 
                class="form-control" 
                required
              >
                <option value="">Auswählen...</option>
                <option value="Easy">Einfach</option>
                <option value="Medium">Mittel</option>
                <option value="Hard">Schwer</option>
              </select>
            </div>

            <div class="metric-input">
              <label for="servings" class="form-label">Portionen</label>
              <input 
                id="servings" 
                name="servings" 
                class="form-control" 
                type="text" 
                placeholder="4" 
                required 
              />
            </div>
          </div>

          <div class="mb-4">
            <label for="description" class="form-label">Beschreibung</label>
            <textarea 
              id="description" 
              name="description" 
              class="form-control" 
              rows="6" 
              placeholder="Kurze Beschreibung des Rezepts..." 
              required
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Rechte Spalte: Zutaten und Zubereitung -->
      <div class="form-col">
        <div class="form-section">
          <h3>📋 Zutaten und Zubereitung</h3>

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
              placeholder=
              "Ofen auf 180°C vorheizen&#10;
Alle trockenen Zutaten vermischen&#10;
 ..." 
              required
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="form-actions">  
      <button type="submit" class="btn btn-primary btn-lg">Rezept erstellen</button>
    </div>
  </form>

  {#if form?.error}
    <div class="alert alert-danger mt-4">
      {form.error}
    </div>
  {/if}

  {#if form?.success}
    <div class="alert alert-success mt-4">
      Rezept wurde erfolgreich erstellt!
    </div>
  {/if}
</div>