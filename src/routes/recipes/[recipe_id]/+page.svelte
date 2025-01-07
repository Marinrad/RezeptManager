<script>
  export let data;
  let recipe = data.recipe;

  import { page } from '$app/stores';

  // Überprüfen, ob der `updated`-Parameter in der URL vorhanden ist, um eine Erfolgsmeldung anzuzeigen
  $: showSuccess = $page.url.searchParams.get('updated') === 'true';
</script>

<div class="recipe-detail-container">
  {#if showSuccess}
    <div class="success-message">
      Änderungen wurden erfolgreich gespeichert!
    </div>
  {/if}

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
            <!-- Zutatenliste anzeigen -->
            <li>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
          {/each}
        </ul>
      </div>

      <div class="recipe-instructions">
        <h3>Zubereitung:</h3>
        <ol>
          {#each recipe.instructions as step}
            <!-- Zubereitungsschritte anzeigen -->
            <li>{step}</li>
          {/each}
        </ol>
      </div>

      <div class="action-buttons">
        <a href={`/recipes/${recipe._id}/edit`} class="btn btn-edit" data-sveltekit-preload-data>
          Rezept bearbeiten
        </a>

        <!-- Formular zum Löschen des Rezepts -->
        <form method="POST" action="?/delete" class="delete-form">
          <!-- Verstecktes Eingabefeld mit der ID des Rezepts -->
          <input type="hidden" name="id" value={recipe._id}>
          <button type="submit" class="btn btn-danger">Rezept löschen</button>
        </form>
      </div>
    </div>
  </div>
</div>