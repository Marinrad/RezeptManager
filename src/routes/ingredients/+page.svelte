<script>
  // Holt die übergebenen Daten (Zutaten) aus den Props
  let { data } = $props();

  // Importiert die Komponente für die Anzeige einer Zutat
  import IngredientCard from "$lib/components/IngredientCard.svelte";

  // Speichert den Suchbegriff
  let searchTerm = $state('');
  
  // Zeigt standardmäßig alle Zutaten an
  let displayedIngredients = $state(data.ingredients); 

  // Aktualisiert die angezeigten Zutaten basierend auf dem Suchbegriff
  $effect(() => {
      displayedIngredients = searchTerm 
          ? data.ingredients.filter(ingredient => 
              ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          : data.ingredients;
  });
</script>

<div class="page-header">
  <h1>Zutatensammlung</h1>
  <div class="search-container">
      <!-- Bindet das Eingabefeld an den Suchbegriff -->
      <input 
          type="text"
          bind:value={searchTerm}
          placeholder="Zutaten durchsuchen..."
          class="search-input"
      />
  </div>
</div>

<div class="action-bar">
  <!-- Link zum Hinzufügen einer neuen Zutat -->
  <a href="/ingredients/create" class="add-button">
      <span class="icon">➕</span> Neue Zutat
  </a>
</div>

<div class="row mt-4 g-4">
  <!-- Iteriert über die angezeigten Zutaten -->
  {#each displayedIngredients as ingredient}
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
          <!-- Zeigt jede Zutat mit der IngredientCard-Komponente an -->
          <IngredientCard {ingredient} class="flex-fill hover-effect" />
      </div>
  {/each}
</div>
