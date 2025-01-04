<script>
  let { data, form } = $props();
  let ingredient = data.ingredient;
</script>

<div class="edit-ingredient-container">
  <a href="/ingredients" class="back-link">← Zurück</a>

  <div class="form-header">  
      <h1>Zutat bearbeiten</h1>
      <p class="subtitle">Aktualisieren Sie die Informationen für {ingredient.name}</p>
  </div>

  <form method="POST" enctype="multipart/form-data" class="ingredient-form">
      <div class="form-section">
          <div class="mb-4">
              <label for="name" class="form-label">Name</label>
              <input 
                  name="name" 
                  class="form-control" 
                  type="text" 
                  value={ingredient.name}
                  required 
              />
          </div>

          <div class="mb-4">
              <label for="category" class="form-label">Kategorie</label>
              <select name="category" class="form-control" required>
                  <option value="">Auswählen...</option>  
                  <option value="Pasta" selected={ingredient.category === 'Pasta'}>Nudeln</option>
                  <option value="Dairy" selected={ingredient.category === 'Dairy'}>Milchprodukte</option>
                  <option value="Meat" selected={ingredient.category === 'Meat'}>Fleisch</option>
                  <option value="Vegetables" selected={ingredient.category === 'Vegetables'}>Gemüse</option>
                  <option value="Fruits" selected={ingredient.category === 'Fruits'}>Obst</option>
                  <option value="Others" selected={ingredient.category === 'Others'}>Sonstiges</option>
              </select>
          </div>

          <div class="mb-4">  
              <label for="calories_per_100g" class="form-label">Kalorien pro 100g</label>
              <input 
                  name="calories_per_100g" 
                  class="form-control" 
                  type="text" 
                  value={ingredient.calories_per_100g}
                  required 
              />
          </div>

          <div class="mb-4">
              <label for="unit" class="form-label">Einheit</label>
              <select name="unit" class="form-control" required>
                  <option value="">Auswählen...</option>
                  <option value="g" selected={ingredient.unit === 'g'}>Gramm</option>  
                  <option value="ml" selected={ingredient.unit === 'ml'}>Milliliter</option>
                  <option value="piece" selected={ingredient.unit === 'piece'}>Stück</option>
              </select>
          </div>
      </div>

      <div class="form-actions">  
          <button type="submit" class="btn btn-primary btn-lg">Änderungen speichern</button>
      </div>
  </form>

  {#if form?.success}
      <div class="alert alert-success mt-4">  
          {form.message}
      </div>
  {/if}
</div>
