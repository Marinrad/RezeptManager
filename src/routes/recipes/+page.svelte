<script>
  let { data } = $props();
  import RecipeCard from "$lib/components/RecipeCard.svelte";
</script>

<p><i>Unsere Rezeptsammlung</i></p>
<div class="button-container">
  <a href="/recipes/create" class="addButton">Neues Rezept</a>
</div>

<div class="row mt-3">
  {#each data.recipes as recipe}
    <div class="col-sm-6 col-md-4 col-lg-3 mb-2 gx-2">
      <RecipeCard {recipe}></RecipeCard>
    </div>
  {/each}
</div>