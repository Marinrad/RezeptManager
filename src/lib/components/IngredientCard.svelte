<script>
  export let ingredient;
</script>

<div class="ingredient-card">
  <img src={ingredient.image} alt={ingredient.name} class="image">
  <a href="/ingredients/{ingredient._id}" class="recipe-link">{ingredient.name}</a>
</div>