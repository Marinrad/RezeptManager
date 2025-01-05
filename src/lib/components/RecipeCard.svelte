<script>
  // Exportiert die Variable 'recipe', damit sie von einer übergeordneten Komponente oder Datei übergeben werden kann.
  // 'recipe' enthält alle relevanten Informationen zu einem Rezept (z.B. Name, Bild, Beschreibung).
  export let recipe;
</script>

<!-- Verknüpft die externe CSS-Datei, um das Styling der Komponente zu definieren -->
<link rel="stylesheet" href="/src/routes/styles.css">

<!-- Die Hauptstruktur der Rezeptkarte -->
<div class="recipe-card">
  <!-- Rezeptbild: Wird dynamisch aus der 'recipe.image'-Eigenschaft geladen -->
  <img class="image" src={recipe.image} alt={recipe.name} />

  <!-- Rezeptname: Klickbarer Link, der zur Detailseite des Rezepts führt -->
  <a class="recipe-link" href={"/recipes/" + recipe._id}>{recipe.name}</a>

  <!-- Zusätzliche Informationen zum Rezept -->
  <div class="info">
    <!-- Dauer des Rezepts in Minuten -->
    <span>⏱️ {recipe.duration} Minuten</span>
    <!-- Schwierigkeitsgrad des Rezepts -->
    <span>📊 {recipe.difficulty}</span>
    <!-- Anzahl der Portionen -->
    <span>👥 {recipe.servings} Portionen</span>
  </div>

  <!-- Kurzbeschreibung des Rezepts -->
  <p>{recipe.description}</p>
</div>
