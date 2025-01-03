<script>
    let { data, form } = $props();
    let recipe = data.recipe;
  </script>
  
  <div class="edit-recipe-container">
    <a href="/recipes" class="back-link">← Zurück</a>
    
    <div class="form-header">
      <h1>Rezept bearbeiten</h1>
      <p class="subtitle">Rezept "{recipe.name}" bearbeiten</p>
    </div>
  
    <form method="POST" action="?/update" class="recipe-form">
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
                value={recipe.name}
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
                    type="number" 
                    min="1" 
                    value={recipe.duration}
                    required 
                  />
                  <span class="input-group-text">Min</span>
                </div>
              </div>
              
              <div class="metric-input">
                <label for="difficulty" class="form-label">Schwierigkeit</label>
                <select id="difficulty" name="difficulty" class="form-control" required>
                  <option value="">Auswählen...</option>
                  <option value="Easy" selected={recipe.difficulty === 'Easy'}>Einfach</option>
                  <option value="Medium" selected={recipe.difficulty === 'Medium'}>Mittel</option>
                  <option value="Hard" selected={recipe.difficulty === 'Hard'}>Schwer</option>
                </select>
              </div>
  
              <div class="metric-input">
                <label for="servings" class="form-label">Portionen</label>
                <input 
                  id="servings" 
                  name="servings" 
                  class="form-control" 
                  type="number" 
                  min="1" 
                  value={recipe.servings}
                  required 
                />
              </div>
            </div>
  
            <div class="mb-3">
              <label for="description" class="form-label">Beschreibung</label>
              <textarea 
                id="description" 
                name="description" 
                class="form-control" 
                rows="3" 
                required
              >{recipe.description}</textarea>
            </div>
          </div>
        </div>
  
        <div class="form-col">
          <div class="form-section">
            <h3>📋 Zutaten und Zubereitung</h3>
            <div class="mb-3">
              <label for="ingredients" class="form-label">Zutaten</label>
              <textarea 
                id="ingredients" 
                name="ingredients" 
                class="form-control" 
                rows="6" 
                required
              >{recipe.ingredients.map(ing => `${ing.ingredient_id} ${ing.amount}${ing.unit}`).join('\n')}</textarea>
            </div>
  
            <div class="mb-3">
              <label for="instructions" class="form-label">Zubereitungsschritte</label>
              <textarea 
                id="instructions" 
                name="instructions" 
                class="form-control" 
                rows="6" 
                required
              >{recipe.instructions.join('\n')}</textarea>
            </div>
          </div>
        </div>
      </div>
  
      <div class="form-section mt-4">
        <h3>📸 Aktuelles Foto</h3>
        {#if recipe.image}
          <img src={recipe.image} alt={recipe.name} class="current-image mb-3" />
        {/if}
        <div class="mb-3">
          <label for="image" class="form-label">Neues Bild hochladen (optional)</label>
          <input id="image" name="image" class="form-control" type="file" accept="image/*" />
        </div>
      </div>
  
      <div class="form-actions">
        <button type="submit" class="btn btn-primary btn-lg">Änderungen speichern</button>
      </div>
    </form>
  
    {#if form?.success}
      <div class="alert alert-success mt-4">
        Rezept wurde erfolgreich aktualisiert!
      </div>
    {/if}
  </div>
  
  <style>
    .current-image {
      max-width: 200px;
      border-radius: 8px;
    }
  
    .edit-recipe-container {
      max-width: 1200px;
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
  
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  
    .recipe-metrics {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
  
    .metric-input {
      display: flex;
      flex-direction: column;
    }
  
    .metric-input .input-group {
      width: 100%;
    }
  
    .metric-input input[type="number"] {
      text-align: center;
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
  
    .input-group-text {
      background-color: #4a5568;
      border-color: #4a5568;
      color: white;
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
  
    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
      
      .recipe-metrics {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
  </style>