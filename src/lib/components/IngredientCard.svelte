<script>
  export let ingredient;
</script>

<div class="ingredient-card">
  <img class="image" src={ingredient.image} alt={ingredient.name} />
  <a href={"/ingredients/" + ingredient._id}>{ingredient.name}</a>
</div>

<style>
  .ingredient-card {
    width: 300px;
    height: 300px;
    padding: 1rem;
    border-radius: 8px;
    background: #1a202c;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
  }

  a {
    display: block;
    margin-top: 1rem;
    color: #ed8936;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
  }
</style>