<script>
  import "./styles.css";
  let { children } = $props();
</script>

<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">🍽️ Rezeptmanager</a>
    
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link" href="/recipes">📖 Rezepte</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/ingredients">🥕 Zutaten</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-4">
  {@render children()}
</div>