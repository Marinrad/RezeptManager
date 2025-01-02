<script>
  export let data;
  let recipe = data.recipe;
</script>

<div class="recipe-detail-container">
  <a href="/recipes" class="back-link">← Zurück</a>

  <h1>{recipe.name}</h1>

  <div class="recipe-detail-grid">
    <div class="recipe-image">
      <img class="img-fluid" src={recipe.image} alt={recipe.name} />
    </div>
    
    <div class="recipe-info">
      <div class="recipe-metrics">
        <p><strong>Zubereitungszeit:</strong> {recipe.duration} Minuten</p>
        <p><strong>Schwierigkeit:</strong> {recipe.difficulty}</p>
        <p><strong>Portionen:</strong> {recipe.servings}</p>
      </div>
      
      <div class="recipe-ingredients">
        <h3>Zutaten:</h3>
        <ul>
          {#each recipe.ingredients as ingredient}
            <li>{ingredient.amount} {ingredient.unit} {ingredient.ingredient_id}</li>
          {/each}
        </ul>
      </div>

      <div class="recipe-instructions">
        <h3>Zubereitung:</h3>
        <ol>
          {#each recipe.instructions as step}
            <li>{step}</li>
          {/each}
        </ol>
      </div>

      <div class="recipe-actions">
        <form method="POST" action="?/delete">
          <input type="hidden" name="id" value={recipe._id}>
          <button class="btn btn-danger">Rezept löschen</button>
        </form>
      </div>
    </div>
  </div>
</div>

<style>
  .recipe-detail-container {
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

  .recipe-detail-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }

  .recipe-image img {
    width: 100%;
    height: auto;
    border-radius: 15px;
  }

  .recipe-info {
    background: #2d3748;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .recipe-metrics {
    margin-bottom: 2rem;
  }

  .recipe-metrics p {
    margin-bottom: 0.5rem;
  }

  h3 {
    color: #ed8936;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  ul, ol {
    margin-left: 1.5rem;
    margin-bottom: 2rem;
  }

  .btn-danger {
    background-color: #ed8936;
    border-color: #ed8936; 
    padding: 0.8rem 2rem;
    font-weight: 600;
  }
  
  .btn-danger:hover {
    background-color: #dd6b20;
    border-color: #dd6b20;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(237, 137, 54, 0.4);
  }

  @media (max-width: 768px) {
    .recipe-detail-grid {
      grid-template-columns: 1fr;
    }
  }
</style>