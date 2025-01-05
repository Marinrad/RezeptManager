<script>
    // Empfängt Daten von der übergeordneten Komponente oder Route
    export let data;
    
    // Extrahiert die Zutat aus den empfangenen Daten
    let ingredient = data.ingredient;
  </script>
  
  <div class="ingredient-detail-container">
    <!-- Link, um zurück zur Zutatenliste zu navigieren -->
    <a href="/ingredients" class="back-link">← Zurück</a>
  
    <!-- Zeigt den Namen der Zutat als Überschrift -->
    <h1>{ingredient.name}</h1>
  
    <div class="ingredient-detail-grid">
        <div class="ingredient-image">
            <!-- Zeigt das Bild der Zutat -->
            <img class="img-fluid" src={ingredient.image} alt={ingredient.name} />
        </div>
        
        <div class="ingredient-info">
            <div class="ingredient-metrics">
                <!-- Zeigt die Kategorie der Zutat -->
                <p><strong>Kategorie:</strong> {ingredient.category}</p>
                
                <!-- Zeigt die Kalorienangabe pro 100g -->
                <p><strong>Kalorien:</strong> {ingredient.calories_per_100g} kcal/100g</p>
                
                <!-- Zeigt die Einheit, falls vorhanden -->
                {#if ingredient.unit}
                    <p><strong>Einheit:</strong> {ingredient.unit}</p>
                {/if}
            </div>
  
            <div class="action-buttons">
                <!-- Link, um die Zutat zu bearbeiten -->
                <a href={`/ingredients/${ingredient._id}/edit`} class="btn btn-edit">
                    Zutat bearbeiten
                </a>
                
                <!-- Formular, um die Zutat zu löschen -->
                <form method="POST" action="?/delete" class="delete-form">
                    <!-- Verstecktes Feld mit der ID der Zutat -->
                    <input type="hidden" name="id" value={ingredient._id}>
                    <!-- Button, um die Zutat zu löschen -->
                    <button class="btn btn-danger">Zutat löschen</button>
                </form>
            </div>
        </div>
    </div>
  </div>
  