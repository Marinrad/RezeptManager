<script>
  let { data } = $props();
  import RecipeCard from "$lib/components/RecipeCard.svelte";

  let searchTerm = $state('');
  let displayedRecipes = $state(data.recipes);

  // $effect --> 1x laden bei start und bei neuen eingaben
  $effect(() => {
    displayedRecipes = searchTerm
      ? data.recipes.filter(recipe => //  ? --> one liner if statement
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : data.recipes;
  });
</script>

<div class="outer-container">
  <div class="inner-container">
    <div class="page-header">
      <h1>Rezeptsammlung</h1> 
      <div class="search-container">
        <input 
          type="text"
          bind:value={searchTerm} 
          placeholder="Rezepte durchsuchen..." 
          class="search-input"
        />
      </div>
    </div>

    <div class="action-bar">
      <a href="/recipes/create" class="add-button">
        <span class="icon">➕</span> Neues Rezept
      </a>
    </div>

    <div class="recipe-grid">
      {#each displayedRecipes as recipe} 
        <div class="recipe-card-wrapper">
          <RecipeCard {recipe} />
        </div>
      {/each}
    </div>
  </div>
</div>