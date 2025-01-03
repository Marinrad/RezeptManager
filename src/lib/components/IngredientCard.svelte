<script>
  export let ingredient;
</script>

<div class="ingredient-card">
  <div class="image-container">
    <img class="img-fluid" src={ingredient.image} alt={ingredient.name} />
  </div>
  <div class="details">
    <div class="title">
      <a href={"/ingredients/" + ingredient._id}>{ingredient.name}</a>
    </div>
    <div class="meta">
      {#if ingredient.unit && ingredient.quantity}
        <span class="quantity">⚖️ {ingredient.quantity} {ingredient.unit}</span>
      {/if}
      <span class="category">📂 {ingredient.category}</span>
      <span class="calories">🔥 {ingredient.calories_per_100} kcal/100g</span>
    </div>
  </div>
</div>

<style>
  .ingredient-card {
    border: 1px solid #2d3748;
    background-color: #1a202c;
    color: #e2e8f0;
    padding: 1.5em;
    border-radius: 8px;
    transition: transform 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .ingredient-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  .image-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 4px;
  }

  .img-fluid {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .details {
    padding: 1em 0;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  .title a {
    color: #ed8936;
    text-decoration: none;
  }

  .title a:hover {
    color: #f6ad55;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    color: #a0aec0;
    font-size: 0.9rem;
  }

  .quantity {
    font-weight: bold;
  }

  .category {
    font-style: italic;
  }

  .calories {
    color: #f56565;
  }
</style>