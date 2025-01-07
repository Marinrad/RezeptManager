<script>
    export let data;
    
    let ingredient = data.ingredient;
</script>

<div class="ingredient-detail-container">
    <a href="/ingredients" class="back-link">← Zurück</a>

    <h1>{ingredient.name}</h1>

    <div class="ingredient-detail-grid">
        <div class="ingredient-image">
            <img class="img-fluid" src={ingredient.image} alt={ingredient.name} />
        </div>
        
        <div class="ingredient-info">
            <div class="ingredient-metrics">
                <p><strong>Kategorie:</strong> {ingredient.category}</p>
                
                <p><strong>Kalorien:</strong> {ingredient.calories_per_100g} kcal/100g</p>
                
                {#if ingredient.unit}
                    <p><strong>Einheit:</strong> {ingredient.unit}</p>
                {/if}
            </div>

            <div class="action-buttons">
                <a href={`/ingredients/${ingredient._id}/edit`} class="btn btn-edit">
                    Zutat bearbeiten
                </a>
                
                <!-- Formular zum Löschen der Zutat -->
                <form method="POST" action="?/delete" class="delete-form">
                    <!-- Verstecktes Eingabefeld mit der ID der Zutat -->
                    <input type="hidden" name="id" value={ingredient._id}>
                    <button class="btn btn-danger">Zutat löschen</button>
                </form>
            </div>
        </div>
    </div>
</div>