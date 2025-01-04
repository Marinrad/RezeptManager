<script>
  let { form } = $props();
</script>

<div class="add-ingredient-container">
  <a href="/ingredients" class="back-link">← Zurück</a>

  <div class="form-header">  
      <h1>Neue Zutat hinzufügen</h1>
      <p class="subtitle">Erweitern Sie Ihr Zutatenlexikon</p>
  </div>

  <form method="POST" enctype="multipart/form-data" class="ingredient-form">
      <div class="form-section">
          <div class="mb-4">
              <label for="name" class="form-label">Name</label>
              <input name="name" class="form-control" type="text" placeholder="z.B. Karotte" required />
          </div>

          <div class="mb-4">
              <label for="category" class="form-label">Kategorie</label>
              <select name="category" class="form-control" required>
                  <option value="">Auswählen...</option>  
                  <option value="Pasta">Pasta</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Meat">Meat</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Others">Others</option>
              </select>
          </div>

          <div class="mb-4">  
              <label for="calories_per_100g" class="form-label">Kalorien pro 100g</label>
              <input name="calories_per_100g" class="form-control" type="text" placeholder="z.B. 41" required />
          </div>

          <div class="mb-4">
              <label for="unit" class="form-label">Einheit</label>
              <select name="unit" class="form-control" required>
                  <option value="">Auswählen...</option>
                  <option value="g">Gramm</option>  
                  <option value="ml">Milliliter</option>
                  <option value="piece">Piece</option>
              </select>
          </div>
      </div>
      
      <div class="form-section mt-4">
          <h3>📸 Foto</h3>  
          <div class="mb-3">
              <label for="image" class="form-label">Bild hochladen</label>
              <input name="image" class="form-control" type="file" accept="image/png, image/jpeg" required />        
          </div>
      </div>

      <div class="form-actions">  
          <button type="submit" class="btn btn-primary btn-lg">Zutat hinzufügen</button>
      </div>
  </form>

  {#if form?.error || form?.success === false}
      <div class="alert alert-danger mt-4">
          {form?.error || 'Ein Fehler ist aufgetreten'}
      </div>
  {/if}

  {#if form?.success}
      <div class="alert alert-success mt-4">
          Zutat wurde erfolgreich hinzugefügt!
      </div>
  {/if}
</div>