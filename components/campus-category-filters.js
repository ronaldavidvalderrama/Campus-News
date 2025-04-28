class CampusCategoryFilters extends HTMLElement {
    constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.categorías = ["Todas", "Eventos", "Investigación", "servicios", "Vida estudiantil"];
    }

    connectedCallback() {
    this.render();
    }

    render() {
    this.shadowRoot.innerHTML = `
        <style>
        .filtros {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            padding: 10px;
            background: #e0f2f1;
        }
        button {
            padding: 8px 16px;
            border: none;
            background: #264653;
            color: white;
            cursor: pointer;
            border-radius: 4px;
            font-size: 14px;
        }
        button:hover {
            background: #1e3e4f;
        }
        </style>
        <div class="filtros">
            ${this.categorías
            .map(
                (cat) => `<button data-cat="${cat}">${cat}</button>`
            )
            .join("")}
        </div>
        `;

        this.shadowRoot.querySelectorAll("button").forEach((btn) => {
            btn.addEventListener("click", () => {
            const category = btn.dataset.cat;
            this.dispatchEvent(
                new CustomEvent("campus:category-change", {
                    detail: { category },
                    bubbles: true,
                    composed: true,
                })
            );
            });
        });
    }
}

customElements.define("campus-category-filters", CampusCategoryFilters);
