<script>
    let { data } = $props();
    import IngredientCard from "$lib/components/IngredientCard.svelte";
  </script>
  
  <p><i>Unsere Zutaten</i></p>
  <div class="button-container">
    <a href="/ingredients/create" class="addButton">Neue Zutat</a>
  </div>
  
  <div class="row mt-3">
    {#each data.ingredients as ingredient}
      <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
        <IngredientCard {ingredient}></IngredientCard>
      </div>
    {/each}
  </div>  