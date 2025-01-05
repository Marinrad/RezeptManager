<!--
  Script:
  - Daten werden von der Serverkomponente übergeben und enthalten die Details der Zutat.
  - Die Zutat wird in der Variablen `ingredient` gespeichert.
-->
<script>
    let { data } = $props();
    let ingredient = data.ingredient;
</script>

<!-- 
  Container:
  - Enthält die gesamte Benutzeroberfläche für die Bearbeitung einer Zutat.
-->
<div class="edit-ingredient-container">
    <!-- Link zur Rückkehr auf die Zutatenliste -->
    <a href="/ingredients" class="back-link">← Zurück</a>

    <!-- Überschrift und Untertitel für die Bearbeitungsseite -->
    <div class="form-header">  
        <h1>Zutat bearbeiten</h1>
        <p class="subtitle">Aktualisieren Sie die Informationen für {ingredient.name}</p>
    </div>

    <!--
      Formular:
      - Sendet die aktualisierten Daten der Zutat mit der `POST`-Methode an den Server.
    -->
    <form method="POST" class="ingredient-form">
        <div class="form-section">
            <!-- Eingabefeld für den Namen der Zutat -->
            <div class="mb-4">
                <label for="name" class="form-label">Name</label>
                <input 
                    name="name" 
                    class="form-control" 
                    type="text" 
                    value={ingredient.name} 
                    required 
                />
            </div>

            <!-- Dropdown-Menü für die Kategorie der Zutat -->
            <div class="mb-4">
                <label for="category" class="form-label">Kategorie</label>
                <select name="category" class="form-control" required>
                    <option value="">Auswählen...</option>  
                    <option value="Nudeln" selected={ingredient.category === 'Nudeln'}>Nudeln</option>
                    <option value="Milchprodukte" selected={ingredient.category === 'Milchprodukte'}>Milchprodukte</option>
                    <option value="Fleisch" selected={ingredient.category === 'Fleisch'}>Fleisch</option>
                    <option value="Gemüse" selected={ingredient.category === 'Gemüse'}>Gemüse</option>
                    <option value="Obst" selected={ingredient.category === 'Obst'}>Obst</option>
                    <option value="Sonstiges" selected={ingredient.category === 'Sonstiges'}>Sonstiges</option>
                </select>
            </div>

            <!-- Eingabefeld für die Kalorienangabe pro 100g -->
            <div class="mb-4">  
                <label for="calories_per_100g" class="form-label">Kalorien pro 100g</label>
                <input 
                    name="calories_per_100g" 
                    class="form-control" 
                    type="text" 
                    value={ingredient.calories_per_100g}
                    required 
                />
            </div>

            <!-- Dropdown-Menü für die Einheit der Zutat -->
            <div class="mb-4">
                <label for="unit" class="form-label">Einheit</label>
                <select name="unit" class="form-control" required>
                    <option value="">Auswählen...</option>
                    <option value="g" selected={ingredient.unit === 'g'}>Gramm</option>  
                    <option value="ml" selected={ingredient.unit === 'ml'}>Milliliter</option>
                    <option value="piece" selected={ingredient.unit === 'piece'}>Stück</option>
                </select>
            </div>
        </div>

        <!-- Absenden des Formulars -->
        <div class="form-actions">  
            <button type="submit" class="btn btn-primary btn-lg">Änderungen speichern</button>
        </div>
    </form>
</div>