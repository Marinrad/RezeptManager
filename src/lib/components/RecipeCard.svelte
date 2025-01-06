<script>
  export let recipe;
</script>

<div class="recipe-card">
  <img src={recipe.image} alt={recipe.name} class="image">
  <a href="/recipes/{recipe._id}" class="recipe-link">{recipe.name}</a>
  <div class="info">
    <span>⏱️ {recipe.duration} Minuten</span>
    <span>📊 {recipe.difficulty}</span>
    <span>👥 {recipe.servings} Portionen</span>
  </div>
  <p>{recipe.description}</p>
</div>