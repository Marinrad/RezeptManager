<script>
    let { form } = $props();
  </script>
  
  <a href="/ingredients">Back</a>
  <h1>Neue Zutat hinzufügen</h1>
  
  <form method="POST" action="?/create">
    <div class="mb-3">
      <label for="" class="form-label">Name</label>
      <input name="name" class="form-control" type="text" required />
    </div>
    
    <div class="mb-3">
      <label for="" class="form-label">Bild-URL</label>
      <input name="image" class="form-control" type="text" required />
    </div>
    
    <div class="mb-3">
      <label for="" class="form-label">Kategorie</label>
      <select name="category" class="form-control" required>
        <option value="Pasta">Pasta</option>
        <option value="Dairy">Dairy</option>
        <option value="Meat">Meat</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Fruits">Fruits</option>
        <option value="Others">Others</option>
      </select>
    </div>
    
    <div class="mb-3">
      <label for="" class="form-label">Kalorien pro 100 g</label>
      <input name="calories_per_100g" class="form-control" type="number" step="0.1" required />
    </div>
  
    <div class="mb-3">
      <label for="" class="form-label">Einheit</label>
      <select name="unit" class="form-control" required>
        <option value="g">g</option>
        <option value="ml">ml</option>
        <option value="piece">Stück</option>
      </select>
    </div>
  
    <button type="submit" class="btn btn-primary">Zutat hinzufügen</button>
  </form>
  
  {#if form?.success}
    <p>Zutat wurde hinzugefügt!</p>
  {/if}
  