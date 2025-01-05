<script>
  export let ingredient;
</script>

<div class="ingredient-card">
  <!-- Bild des Ingredients -->
  <img class="image" src={ingredient.image} alt={ingredient.name} />
  <!-- Name des Ingredients mit Verlinkung -->
  <a class="recipe-link" href={"/ingredients/" + ingredient._id}>{ingredient.name}</a>
</div>
