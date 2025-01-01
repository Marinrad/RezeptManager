<script>
  export let data;
  let recipe = data.recipe;
</script>

<a href="/recipes">Back</a>

<h1>{recipe.name}</h1>

<div class="row mt-3">
  <div class="col-3">
    <img class="img-fluid" src={recipe.image} alt={recipe.name} />
  </div>
  
  <div class="col">
    <p>Zubereitungszeit: {recipe.duration} Minuten</p>
    <p>Schwierigkeit: {recipe.difficulty}</p>
    <p>Portionen: {recipe.servings}</p>
    
    <h3>Zutaten:</h3>
    <ul>
      {#each recipe.ingredients as ingredient}
        <li>{ingredient.amount} {ingredient.unit} {ingredient.ingredient_id}</li>
      {/each}
    </ul>

    <h3>Zubereitung:</h3>
    <ol>
      {#each recipe.instructions as step}
        <li>{step}</li>
      {/each}
    </ol>

    <form method="POST" action="?/delete">
      <input type="hidden" name="id" value={recipe._id}>
      <button class="btn btn-danger">Rezept löschen</button>
    </form>
  </div>
</div>