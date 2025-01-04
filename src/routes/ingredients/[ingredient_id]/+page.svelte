<script>
  export let data;
  let ingredient = data.ingredient;
</script>

<div class="ingredient-detail-container">
  <a href="/ingredients" class="back-link">← Zurück</a>

  <h1>{ingredient.name}</h1>

  <div class="ingredient-detail-grid">
      <div class="ingredient-image">
          <img class="img-fluid" src={ingredient.image} alt={ingredient.name} />
      </div>
      
      <div class="ingredient-info">
          <div class="ingredient-metrics">
              <p><strong>Kategorie:</strong> {ingredient.category}</p>
              <p><strong>Kalorien:</strong> {ingredient.calories_per_100g} kcal/100g</p>
              {#if ingredient.unit}
                  <p><strong>Einheit:</strong> {ingredient.unit}</p>
              {/if}
          </div>
          
          {#if ingredient.nutritional_values}
              <div class="nutritional-values">
                  <h3>Nährwerte pro 100g:</h3>
                  <ul>
                      {#each Object.entries(ingredient.nutritional_values) as [key, value]}
                          <li><strong>{key}:</strong> {value}g</li>
                      {/each}
                  </ul>
              </div>
          {/if}

          {#if ingredient.allergens}
              <div class="allergens">
                  <h3>Allergene:</h3>
                  <ul>
                      {#each ingredient.allergens as allergen}
                          <li>{allergen}</li>
                      {/each}
                  </ul>
              </div>
          {/if}

          <div class="action-buttons">
              <a href={`/ingredients/${ingredient._id}/edit`} class="btn btn-edit">
                  Zutat bearbeiten
              </a>
              
              <form method="POST" action="?/delete" class="delete-form">
                  <input type="hidden" name="id" value={ingredient._id}>
                  <button class="btn btn-danger">Zutat löschen</button>
              </form>
          </div>
      </div>
  </div>
</div>