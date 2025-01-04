<script>
  export let recipe;
</script>

<div class="recipe-card">
  <img class="image" src={recipe.image} alt={recipe.name} />
  <a class="recipe-link" href={"/recipes/" + recipe._id}>{recipe.name}</a>
  <div class="info">
      <span>⏱️ {recipe.duration} Min</span>
      <span>📊 {recipe.difficulty}</span>
      <span>👥 {recipe.servings} Portionen</span>
  </div>
  <p>{recipe.description}</p>
</div>