<script>
  export let ingredient;
</script>

<div class="ingredient-card">
  <img class="image" src={ingredient.image} alt={ingredient.name} />
  <a class="ingredient-link" href={"/ingredients/" + ingredient._id}>{ingredient.name}</a>
</div>