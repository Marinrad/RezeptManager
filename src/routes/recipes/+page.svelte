<script>
  let { data } = $props();
  import RecipeCard from "$lib/components/RecipeCard.svelte";
  
  let searchTerm = $state('');
  let displayedRecipes = $state(data.recipes);
  
  $effect(() => {
    displayedRecipes = searchTerm 
      ? data.recipes.filter(recipe => 
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : data.recipes;
  });
</script>

<div class="recipes-header">
  <h1>Rezeptsammlung</h1>
  <div class="search-container">
    <input 
      type="text"
      bind:value={searchTerm}
      placeholder="Rezepte durchsuchen..."
      class="search-input"
    />
  </div>
</div>

<div class="action-bar">
  <a href="/recipes/create" class="add-recipe-btn">
    <span class="icon">➕</span> Neues Rezept
  </a>
</div>

<div class="row mt-4 g-4">
  {#each displayedRecipes as recipe}
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 d-flex">
      <RecipeCard {recipe} class="flex-fill hover-effect" />
    </div>
  {/each}
</div>
 
 <style>
  .recipes-header {
    background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
    padding: 2rem;
    border-radius: 15px;
    margin-bottom: 2rem;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
 
  .search-container {
    max-width: 600px;
    margin: 0 auto;
  }
 
  .search-input {
    width: 100%;
    padding: 1rem 1.5rem;
    border: 2px solid rgba(237, 137, 54, 0.2);
    border-radius: 30px;
    background-color: rgba(26, 32, 44, 0.8);
    color: #fff;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
  }
 
  .search-input:focus {
    outline: none;
    border-color: #ed8936;
    background-color: rgba(26, 32, 44, 0.9);
    box-shadow: 0 0 15px rgba(237, 137, 54, 0.3);
  }
 
  .search-input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
 
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2.8rem;
    font-weight: bold;
    background: linear-gradient(45deg, #ed8936, #f6ad55);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
 
  .action-bar {
    display: flex;
    justify-content: flex-end;
    position: relative;
    z-index: 1;
    margin: 1rem 2rem;
  }
 
  .add-recipe-btn {
    background-color: #ed8936;
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
 
  .add-recipe-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(237, 137, 54, 0.4);
    color: white;
  }
 
  .icon {
    margin-right: 0.5rem;
  }

 
  @media (max-width: 768px) {
    .recipes-header {
      padding: 1.5rem;
    }
 
    h1 {
      font-size: 2rem;
    }
    
    .action-bar {
      margin: 0.5rem 1rem;
    }
  }
 </style>