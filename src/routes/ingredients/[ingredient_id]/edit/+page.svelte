<script>
    let props = $props();
    let { ingredient } = props.data;
</script>

<div class="edit-ingredient-container">
    <a href="/ingredients" class="back-link">← Zurück</a>

    <div class="form-header">  
        <h1>Zutat bearbeiten</h1>
        <p class="subtitle">Aktualisieren Sie die Informationen für {ingredient.name}</p>
    </div>

    <!-- Formular zum Bearbeiten der Zutat -->
    <form method="POST" class="ingredient-form">
        <table class="ingredients-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Kategorie</th>
                    <th>Kalorien pro 100g</th>
                    <th>Einheit</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <input 
                            name="name" 
                            class="form-control" 
                            type="text" 
                            value={ingredient.name} 
                            required 
                        />
                    </td>
                    <td>
                        <select name="category" class="form-control" required>
                            <option value="">Auswählen...</option>
                            {#each ['Nudeln', 'Milchprodukte', 'Fleisch', 'Gemüse', 'Obst', 'Sonstiges'] as category}
                                <option 
                                    value={category} 
                                    selected={ingredient.category === category}
                                >
                                    {category}
                                </option>
                            {/each}
                        </select>
                    </td>
                    <td>
                        <input 
                            name="calories_per_100g" 
                            class="form-control" 
                            type="text" 
                            value={ingredient.calories_per_100g}
                            required 
                        />
                    </td>
                    <td>
                        <select name="unit" class="form-control" required>
                            <option value="">Auswählen...</option>
                            {#each [
                                { value: 'g', label: 'Gramm' },
                                { value: 'ml', label: 'Milliliter' },
                                { value: 'stück', label: 'Stück' }
                            ] as unit}
                                <option 
                                    value={unit.value} 
                                    selected={ingredient.unit === unit.value}
                                >
                                    {unit.label}
                                </option>
                            {/each}
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="form-actions">  
            <button type="submit" class="btn btn-primary">Änderungen speichern</button>
        </div>
    </form>
</div>