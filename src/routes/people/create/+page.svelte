<script>
  let { form } = $props();
</script>

<a href="/recipes">Back</a>
<h1>Neues Rezept erstellen</h1>

<form method="POST" action="?/create">
  <div class="mb-3">
    <label for="" class="form-label">Name</label>
    <input name="name" class="form-control" type="text" required />
  </div>
  
  <div class="mb-3">
    <label for="" class="form-label">Zubereitungszeit (Minuten)</label>
    <input name="duration" class="form-control" type="number" required />
  </div>
  
  <div class="mb-3">
    <label for="" class="form-label">Schwierigkeit</label>
    <select name="difficulty" class="form-control" required>
      <option value="Easy">Einfach</option>
      <option value="Medium">Mittel</option>
      <option value="Hard">Schwer</option>  
    </select>
  </div>

  <div class="mb-3">
    <label for="" class="form-label">Beschreibung</label>
    <textarea name="description" class="form-control" rows="3" required></textarea>
  </div>

  <div class="mb-3">
    <label for="" class="form-label">Portionen</label>
    <input name="servings" class="form-control" type="number" required />
  </div>

  <div class="mb-3">
    <label for="" class="form-label">Zubereitung (eine Anweisung pro Zeile)</label>
    <textarea name="instructions" class="form-control" rows="5" required></textarea>
  </div>

  <div class="mb-3">
    <label for="" class="form-label">Zutaten (JSON Format)</label>
    <textarea name="ingredients" class="form-control" rows="5" required 
      placeholder='[{"ingredient_id": "flour_id", "amount": 250, "unit": "g"}]'></textarea>
  </div>

  <button type="submit" class="btn btn-primary">Rezept erstellen</button>
</form>

{#if form?.success}
  <p>Rezept wurde erstellt!</p>
{/if}