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

<style>
  .ingredient-detail-container {
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

  h1 {
    color: #ed8936;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .ingredient-detail-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }

  .ingredient-image img {
    width: 100%;
    height: auto;
    border-radius: 15px;
  }

  .ingredient-info {
    background: #2d3748;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .ingredient-metrics {
    margin-bottom: 2rem;
  }

  .ingredient-metrics p {
    margin-bottom: 0.5rem;
  }

  h3 {
    color: #ed8936;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  ul {
    margin-left: 1.5rem;
    margin-bottom: 2rem;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #4a5568;
  }

  .btn {
    padding: 0.8rem 2rem;
    border-radius: 0.375rem;
    font-weight: 600;
    text-decoration: none;
    text-align: center;
    transition: all 0.2s;
  }

  .btn-edit {
    background-color: #4299e1;
    color: white;
    border: none;
  }

  .btn-edit:hover {
    background-color: #3182ce;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4);
  }

  .btn-danger {
    background-color: #ed8936;
    border-color: #ed8936;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .btn-danger:hover {
    background-color: #dd6b20;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(237, 137, 54, 0.4);
  }

  .delete-form {
    display: inline-block;
  }

  @media (max-width: 768px) {
    .ingredient-detail-grid {
      grid-template-columns: 1fr;
    }

    .action-buttons {
      flex-direction: column;
    }

    .btn {
      width: 100%;
    }
  }
</style>