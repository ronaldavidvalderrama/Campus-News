class campusNewsDetail extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.article = null;
        this.render();
    }

    connectedCallback() {
        window.addEventListener("campus:article-selected", (e) => {
            const id = e.detail.id;
            const articles = window.campusArticles || [];
            const found = articles.find((a) => a.id === id);
            this.article = found;
            thid.render();
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>
            .detail {
            padding: 16px;
            border-left: 2px solid #264653;
            background: #f9f9f9;
            margin-top: 12px;
        }
        h2 {
            margin-top: 0;
            color: #264653;
        }
        .meta {
            font-size: 14px;
            color: #777;
            margin-bottom: 12px;
        }
        .content {
            font-size: 15px;
            line-height: 1.6;
        }
        </style>
        ${
            this.article
            ? `<div class="detail">
                <h2>${this.article.title}</h2>
                <div class="meta">
                    Por ${this.article.author} - ${this.article.date}
                </div>
                <div class="content">
                    ${this.article.content}
                </div>
                </div>`
            : `<p style="padding: 16px;">Selecciona un artículo para verlo en detalle.</p>`
        }
    `;
  }
}

customElements.define("campus-news-detail", campusNewsDetail);
