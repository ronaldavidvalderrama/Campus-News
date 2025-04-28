class campusNewsItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
    }

    set article(data) {
        this._article = data;
        this.render();
    }

    render() {
        if (!this._article) return;

        this.shadowRoot.innerHTML = `
            <style>
                .item {
                padding: 12px;
                border-bottom: 1px solid #ddd;
                cursor: pointer;
            }
            .item:hover {
                background: #f0f4f8;
            }
            h3 {
                margin: 0 0 6px;
                font-size: 16px;
                color: #264653;
            }
            p {
                margin: 0;
                font-size: 14px;
                color: #444;
            }
            .date {
                font-size: 12px;
                color: #888;
                margin-top: 4px;
            }
            </style>
            <div class="item">
                <h3>${this._article.title}</h3>
                <p>${this._article.summary}</p>
                <div class="date">${this._article.date}</div>
            </div>
    `;

    this.shadowRoot.querySelector('.item').addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('campus:article-select', {
            detail: { id: this.article.id },
            bubbles: true,
            composed: true
        }));
    });
    }
}
customElements.define("campus-news-item", campusNewsItem);


