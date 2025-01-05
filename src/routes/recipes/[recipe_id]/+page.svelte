<script>
  // Nimmt die Rezeptdaten (`data.recipe`) entgegen
  export let data;
  let recipe = data.recipe;

  // Importiert die `page`-Store, um die URL und Suchparameter zu überwachen
  import { page } from '$app/stores';

  // Reaktive Variable: Zeigt Erfolgsmeldung, wenn die URL den Suchparameter `updated=true` enthält
  $: showSuccess = $page.url.searchParams.get('updated') === 'true';
</script>

<!-- Container für die Rezeptdetails -->
<div class="recipe-detail-container">
  <!-- Erfolgsmeldung bei erfolgreicher Aktualisierung -->
  {#if showSuccess}
    <div class="success-message">
      Änderungen wurden erfolgreich gespeichert!
    </div>
  {/if}

  <!-- Link zur Rückkehr auf die Rezeptübersicht -->
  <a href="/recipes" class="back-link">← Zurück</a>

  <!-- Titel des Rezepts -->
  <h1>{recipe.name}</h1>

  <!-- Gitterlayout für Rezeptdetails -->
  <div class="recipe-detail-grid">
    <!-- Rezeptbild -->
    <div class="recipe-image">
      <img class="img-fluid" src={recipe.image} alt={recipe.name} />
    </div>
    
    <!-- Rezeptinformationen -->
    <div class="recipe-info">
      <!-- Metriken wie Zubereitungszeit, Schwierigkeit und Portionen -->
      <div class="recipe-metrics">
        <p><strong>Zubereitungszeit:</strong> {recipe.duration} Minuten</p>
        <p><strong>Schwierigkeit:</strong> {recipe.difficulty}</p>
        <p><strong>Portionen:</strong> {recipe.servings}</p>
      </div>
      
      <!-- Zutatenliste -->
      <div class="recipe-ingredients">
        <h3>Zutaten:</h3>
        <ul>
          {#each recipe.ingredients as ingredient}
            <li>{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
          {/each}
        </ul>
      </div>

      <!-- Zubereitungsschritte -->
      <div class="recipe-instructions">
        <h3>Zubereitung:</h3>
        <ol>
          {#each recipe.instructions as step}
            <li>{step}</li>
          {/each}
        </ol>
      </div>

      <!-- Aktionsbuttons -->
      <div class="action-buttons">
        <!-- Link zur Bearbeitung des Rezepts -->
        <a href={`/recipes/${recipe._id}/edit`} class="btn btn-edit">
          Rezept bearbeiten
        </a>

        <!-- Formular zum Löschen des Rezepts -->
        <form method="POST" action="?/delete" class="delete-form">
          <!-- Verstecktes Eingabefeld mit der Rezept-ID -->
          <input type="hidden" name="id" value={recipe._id}>
          <button class="btn btn-danger">Rezept löschen</button>
        </form>
      </div>
    </div>
  </div>
</div>
