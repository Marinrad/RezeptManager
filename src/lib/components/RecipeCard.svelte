<script>
  export let recipe;
 </script>
 
 <div class="recipe-card">
  <div class="image-container">
    <img class="img-fluid" src={recipe.image} alt={recipe.name} />
  </div>
  <div class="details">
    <div class="title">
      <a href={"/recipes/" + recipe._id}>{recipe.name}</a>
    </div>
    <div class="meta">
      <span class="duration">⏱️ {recipe.duration} Min</span>
      <span class="difficulty">📊 {recipe.difficulty}</span>
      <span class="servings">👥 {recipe.servings} Portionen</span>
    </div>
    <div class="description">
      {recipe.description}
    </div>
  </div>
 </div>
 
 <style>
  .recipe-card {
    border: 1px solid #2d3748;
    background-color: #1a202c;
    color: #e2e8f0;
    padding: 1.5em;
    border-radius: 8px;
    transition: transform 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
 
  .recipe-card:hover {
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
    gap: 1rem;
    margin-bottom: 1em;
    color: #a0aec0;
    font-size: 0.9rem;
  }
 
  .description {
    color: #cbd5e0;
    font-size: 1rem;
    line-height: 1.5;
  }
 </style>