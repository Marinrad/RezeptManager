<script>
  export let recipe;
</script>

<div class="recipe-card">
  <img src={recipe.image} alt={recipe.name} />
  <a href={"/recipes/" + recipe._id}>{recipe.name}</a>
  <div class="info">
    <span>⏱️ {recipe.duration} Min</span>
    <span>📊 {recipe.difficulty}</span>
    <span>👥 {recipe.servings} Portionen</span>
  </div>
  <p>{recipe.description}</p>
</div>

<style>
  .recipe-card {
    width: 300px;
    padding: 1rem;
    border-radius: 8px;
    background: #1a202c;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    color: #e2e8f0;
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
  }

  a {
    display: block;
    margin: 1rem 0;
    color: #ed8936;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
  }

  .info {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    color: #a0aec0;
    font-size: 0.9rem;
  }

  p {
    color: #cbd5e0;
    line-height: 1.5;
  }
</style>