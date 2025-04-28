import { campusArticles } from "../main.js";

class CampusNewsApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.currentCategory = "Todas";
    this.selectedArticleId = null;
  }

  connectedCallback() {
    this.render();

    // Escucha eventos personalizados desde los componentes hijos
    this.addEventListener("campus:category-change", (e) => {
      this.currentCategory = e.detail.category;
      this.selectedArticleId = null; // Reiniciar selección
      this.render();
      this.updateDebug();
    });

    this.addEventListener("campus:article-select", (e) => {
      this.selectedArticleId = e.detail.id;
      this.render();
      this.updateDebug();
    });
  }

  getFilteredArticles() {
    if (this.currentCategory === "Todas") return campusArticles;
    return campusArticles.filter(article => article.category === this.currentCategory);
  }

  getSelectedArticle() {
    return campusArticles.find(article => article.id === this.selectedArticleId);
  }

  updateDebug() {
    this.dispatchEvent(new CustomEvent("campus:debug-update", {
      detail: {
        category: this.currentCategory,
        selectedId: this.selectedArticleId,
        total: campusArticles.length,
        filtered: this.getFilteredArticles().length
      },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    this.shadowRoot.innerHTML = `
      <campus-category-filters></campus-category-filters>
      <campus-news-list></campus-news-list>
      <campus-news-detail></campus-news-detail>
      <campus-debug-panel></campus-debug-panel>
    `;

    // Pasa artículos filtrados al <campus-news-list>
    const list = this.shadowRoot.querySelector("campus-news-list");
    list.articles = this.getFilteredArticles();

    // Pasa artículo seleccionado al <campus-news-detail>
    const detail = this.shadowRoot.querySelector("campus-news-detail");
    detail.article = this.getSelectedArticle();
  }
}

customElements.define("campus-news-app", CampusNewsApp);
