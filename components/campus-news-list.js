class campusNewsList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    set articles(data) {
        this._article = data;
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
            .list {
                padding: 12px;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            </style>
            <div class="list"></div>
        `;

        const listEl = this.shadowRoot.querySelector(".list");

        if (this._article && this._article.length > 0) {
            this._article.forEach(article => {
                const item = document.createElement("campus-news-item");
                item.article = article;
                listEl.appendChild(item);
            });
        }else {
            listEl.innerHTML = "<p>No hay artículos disponibles</p>";
        }
    }
}

customElements.define("campus-news-list", campusNewsList);


