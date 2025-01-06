<script>
    let { form } = $props();

    const categories = [
        'Nudeln',
        'Milchprodukte',
        'Fleisch',
        'Gemüse',
        'Obst',
        'Sonstiges'
    ];

    const units = [
        { value: 'g', label: 'Gramm' },
        { value: 'ml', label: 'Milliliter' },
        { value: 'stück', label: 'Stück' }
    ];
</script>

<div class="edit-ingredient-container">
    <a href="/ingredients" class="back-link">← Zurück</a>

    <div class="form-header">  
        <h1>Neue Zutat hinzufügen</h1>
        <p class="subtitle">Erweitern Sie Ihr Zutatenlexikon</p>
    </div>

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
                            placeholder="z.B. Karotte"
                            required 
                        />
                    </td>
                    <td>
                        <select name="category" class="form-control" required>
                            <option value="">Auswählen...</option>
                            {#each categories as category}
                                <option value={category}>{category}</option>
                            {/each}
                        </select>
                    </td>
                    <td>
                        <input 
                            name="calories_per_100g" 
                            class="form-control" 
                            type="text" 
                            placeholder="z.B. 41"
                            required 
                        />
                    </td>
                    <td>
                        <select name="unit" class="form-control" required>
                            <option value="">Auswählen...</option>
                            {#each units as {value, label}}
                                <option {value}>{label}</option>
                            {/each}
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        {#if form?.error}
            <div class="alert alert-danger" role="alert">
                {form.error}
            </div>
        {/if}

        <div class="form-actions">  
            <button type="submit" class="btn btn-primary">Zutat hinzufügen</button>
        </div>
    </form>
</div>