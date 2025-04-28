class CampusDebugPanel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.state = {
            category: "Todas",
            selectedId: null,
            total: 0,
            filtered: 0,
        };
        this.visible = false;
        this.render();
        }

    connectedCallback() {
        window.addEventListener("campus:debug-update", (e) => {
            this.state = e.detail;
            this.render();
        });
        }

    toggleVisibility() {
        this.visible = !this.visible;
        this.render();
    }


    render() {
        this.shadowRoot.innerHTML = `
            <style>
            .debug {
                border: 1px dashed #ccc;
                background: #fffbea;
                padding: 12px;
                margin-top: 20px;
                font-size: 14px;
                display: ${this.visible ? "block" : "none"};
            }
            button {
                margin-top: 10px;
                padding: 6px 12px;
                background: #264653;
                color: white;
                border: none;
                cursor: pointer;
            }
            button:hover {
                background: #1e3e4f;
            }
            </style>
            <button id="toggle">🔧 Mostrar/ocultar depuración</button>
            <div class="debug">
            <strong>Estado actual:</strong><br>
            Categoría: ${this.state.category}<br>
            Artículo seleccionado: ${this.state.selectedId ?? "Ninguno"}<br>
            Total artículos: ${this.state.total}<br>
            Filtrados: ${this.state.filtered}
            </div>
        `;

        this.shadowRoot.querySelector("#toggle").onclick = () => this.toggleVisibility();
        }
}

customElements.define("campus-debug-panel", CampusDebugPanel);
