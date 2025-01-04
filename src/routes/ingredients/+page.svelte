<script>
  let { data } = $props();
  import IngredientCard from "$lib/components/IngredientCard.svelte";
  
  let searchTerm = $state('');
  let displayedIngredients = $state(data.ingredients); 
  
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
      <input 
          type="text"
          bind:value={searchTerm}
          placeholder="Zutaten durchsuchen..."
          class="search-input"
      />
  </div>
</div>

<div class="action-bar">
  <a href="/ingredients/create" class="add-button">
      <span class="icon">➕</span> Neue Zutat
  </a>
</div>

<div class="row mt-4 g-4">
  {#each displayedIngredients as ingredient}
      <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
          <IngredientCard {ingredient} class="flex-fill hover-effect" />
      </div>
  {/each}
</div>
