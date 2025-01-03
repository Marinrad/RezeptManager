<!-- /ingredients/[ingredient_id]/edit/+page.svelte -->
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
      
      <div class="form-section mt-4">
        <h3>📸 Aktuelles Foto</h3>
        {#if ingredient.image}
          <img src={ingredient.image} alt={ingredient.name} class="current-image" />
        {/if}
        <div class="mb-3">
          <label for="image" class="form-label">Neues Bild hochladen (optional)</label>
          <input name="image" class="form-control" type="file" accept="image/png, image/jpeg" />
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
  
  <style>
    /* Übernehme das gleiche Styling wie vom Create-Formular */
    .edit-ingredient-container {
      max-width: 800px;  
      margin: 2rem auto;
      padding: 0 1rem;
    }
  
    .back-link {
      color: #ed8936;
      text-decoration: none;
      font-weight: 500;
      display: inline-block;
      margin-bottom: 2rem;
    }
   
    .back-link:hover {
      color: #dd6b20;
    }
    
    .form-header {
      text-align: center;
      margin-bottom: 3rem;
    }
   
    .form-header h1 {
      color: #ed8936;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
   
    .subtitle {
      color: #a0aec0;
      font-size: 1.1rem;
    }
  
    .form-section {
      background: #2d3748;
      padding: 2rem;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
   
    .form-section h3 {
      color: #ed8936;
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
    }
    
    .form-control {
      background-color: #1a202c;
      border: 1px solid #4a5568;
      color: #e2e8f0;
    }
    
    .form-control::placeholder {
      color: #718096;
    }
    
    .form-control:focus {
      background-color: #2d3748;
      border-color: #ed8936;
      box-shadow: 0 0 0 0.2rem rgba(237, 137, 54, 0.25);
      color: #ffffff;
    }
  
    .current-image {
      max-width: 200px;
      border-radius: 8px;
      margin-bottom: 1rem;
    }
    
    .form-actions {
      text-align: center;
      margin-top: 3rem;
    }
    
    .btn-primary {
      background-color: #ed8936;
      border-color: #ed8936;
      padding: 0.8rem 2rem;
      font-weight: 600;
    }
    
    .btn-primary:hover {
      background-color: #dd6b20;
      border-color: #dd6b20;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(237, 137, 54, 0.4);
    }
  </style>