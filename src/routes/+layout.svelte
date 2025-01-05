<script>
  import "./styles.css";
  
  // Destructuring der Props um Child-Komponenten zu ermöglichen
  // Dies erlaubt uns, Inhalte zwischen den Layout-Tags zu platzieren und zu rendern
  // Beispiel: <Layout><h1>Dies ist ein Child</h1></Layout>
  let { children } = $props();

</script>

<!-- 
  Haupt-Navigationsleiste
  navbar-expand-lg: Navigation expandiert ab Breakpoint lg (992px)
  Unter 992px wird ein Hamburger-Menü angezeigt
-->
<nav class="navbar navbar-expand-lg">
  <!-- 
    container-fluid nutzt die volle Verfügbare Breite mit Padding
    Im Gegensatz zu container, der eine max-width hat
  -->
  <div class="container-fluid">
    <!-- Brand/Logo mit Home-Link -->
    <a class="navbar-brand" href="/">🍽️ Rezeptmanager</a>

    <!-- 
      Hamburger-Menü Button (erscheint nur unter 992px)
      data-bs-toggle="collapse": Aktiviert Bootstrap's Toggle-Funktionalität
      data-bs-target="#navbarNav": Verbindet Button mit dem Collapse-Element
      aria-* Attribute für Accessibility/Barrierefreiheit
    -->
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

    <!-- 
      Kollabierbarer Bereich der Navigation
      Wird bei kleinen Bildschirmen ein-/ausgeklappt
      ID entspricht dem data-bs-target des Toggle-Buttons
    -->
    <div class="collapse navbar-collapse" id="navbarNav">
      <!-- 
        Navigation Links Liste
        me-auto: Margin-end auto, schiebt Elemente nach links (Bootstrap 5 Utility-Klasse)
      -->
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

<!-- 
  Container für den Hauptinhalt
  mt-4: Margin-top mit Größe 4 (1.5rem in Bootstrap)
  {@render children()} rendert alle Komponenten/Elemente, die zwischen den Layout-Tags platziert wurden
-->
<div class="container mt-4">
  {@render children()}
</div>