<script>
  // Importiert die Daten (`data.recipes`) von der Serverkomponente oder Route
  let { data } = $props();

  // Importiert die RecipeCard-Komponente, die für die Anzeige eines einzelnen Rezepts verwendet wird
  import RecipeCard from "$lib/components/RecipeCard.svelte";

  // Definiert den Suchbegriff, der an das Suchfeld gebunden ist
  let searchTerm = $state('');

  // Definiert die angezeigten Rezepte, initial alle Rezepte aus `data.recipes`
  let displayedRecipes = $state(data.recipes);

  // Reagiert auf Änderungen des Suchbegriffs und filtert die Rezepte basierend auf dem Namen
  $effect(() => {
      displayedRecipes = searchTerm
          ? data.recipes.filter(recipe => 
              recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : data.recipes;
  });
</script>

<!-- Seitenkopf mit Titel und Suchfeld -->
<div class="page-header">
  <!-- Titel der Seite -->
  <h1>Rezeptsammlung</h1> 

  <!-- Suchfeld zur Eingabe des Suchbegriffs -->
  <div class="search-container">
      <!-- Binded das Suchfeld an die Variable `searchTerm` -->
      <input 
          type="text"
          bind:value={searchTerm} 
          placeholder="Rezepte durchsuchen..." 
          class="search-input"
      />
  </div>
</div>

<!-- Aktionsleiste mit Button zur Erstellung eines neuen Rezepts -->
<div class="action-bar">
  <!-- Link zur Seite, um ein neues Rezept zu erstellen -->
  <a href="/recipes/create" class="add-button">
      <span class="icon">➕</span> Neues Rezept
  </a>
</div>

<!-- Liste der angezeigten Rezepte -->
<div class="row mt-4 g-4">
  <!-- Iteriert durch die gefilterten Rezepte -->
  {#each displayedRecipes as recipe} 
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
          <!-- Zeigt eine Rezeptkarte für jedes Rezept an -->
          <RecipeCard {recipe} class="flex-fill hover-effect" />
      </div>
  {/each}
</div>
