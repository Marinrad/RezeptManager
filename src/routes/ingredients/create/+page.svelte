<script>
    // Nimmt das `form`-Objekt aus den übergebenen Eigenschaften (`$props()`) entgegen.
    // Dieses Objekt wird verwendet, um Formularfeedback (z. B. Fehler oder Erfolgsmeldungen) zu handhaben.
    let { form } = $props();
</script>

<div class="add-ingredient-container">
    <!-- Ein Link, der zurück zur Zutatenliste führt -->
    <a href="/ingredients" class="back-link">← Zurück</a>

    <!-- Überschrift und Beschreibung für das Formular -->
    <div class="form-header">  
        <h1>Neue Zutat hinzufügen</h1>
        <p class="subtitle">Erweitern Sie Ihr Zutatenlexikon</p>
    </div>

    <!-- Formular, das mit der Methode POST gesendet wird -->
    <form method="POST" class="ingredient-form">
        <div class="form-section">
            <!-- Eingabefeld für den Namen der Zutat -->
            <div class="mb-4">
                <label for="name" class="form-label">Name</label>
                <input name="name" class="form-control" type="text" placeholder="z.B. Karotte" required />
            </div>

            <!-- Dropdown zur Auswahl der Kategorie der Zutat -->
            <div class="mb-4">
                <label for="category" class="form-label">Kategorie</label>
                <select name="category" class="form-control" required>
                    <option value="">Auswählen...</option>  
                    <option value="Nudeln">Nudeln</option>
                    <option value="Milchprodukte">Milchprodukte</option>
                    <option value="Fleisch">Fleisch</option>
                    <option value="Gemüse">Gemüse</option>
                    <option value="Obst">Obst</option>
                    <option value="Sonstiges">Sonstiges</option>
                </select>
            </div>

            <!-- Eingabefeld für die Kalorienangabe pro 100g der Zutat -->
            <div class="mb-4">  
                <label for="calories_per_100g" class="form-label">Kalorien pro 100g</label>
                <input name="calories_per_100g" class="form-control" type="text" placeholder="z.B. 41" required />
            </div>

            <!-- Dropdown zur Auswahl der Einheit (Gramm, Milliliter, Stück) -->
            <div class="mb-4">
                <label for="unit" class="form-label">Einheit</label>
                <select name="unit" class="form-control" required>
                    <option value="">Auswählen...</option>
                    <option value="g">Gramm</option>  
                    <option value="ml">Milliliter</option>
                    <option value="piece">Piece</option>
                </select>
            </div>
        </div>

        <!-- Abschnitt mit dem "Absenden"-Button -->
        <div class="form-actions">  
            <button type="submit" class="btn btn-primary btn-lg">Zutat hinzufügen</button>
        </div>
    </form>
</div>
