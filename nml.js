class NeknajMarkupLanguageElement extends HTMLElement {
    constructor () {
        super();
        // Shadow DOMの作成
        const shadow = this.attachShadow({ mode: 'open' });

        // 子要素を表示するためのコンテナを作成
        this.container = document.createElement('div');
        this.container.classList.add("NDDS");
        shadow.appendChild(this.container);

        const styleLink = document.createElement('link');
        styleLink.setAttribute('rel', 'stylesheet');
        styleLink.setAttribute('href', currentScriptDir+'/defaultmodule/default.css');
        shadow.appendChild(styleLink);

        // MutationObserverの設定
        this.observer = new MutationObserver(() => {
            this.update();
        });

        // 子要素の変更を監視
        this.observer.observe(this, { childList: true, subtree: true });
    }

    connectedCallback() {
        this.update();
    }

    update() {
        this.container.innerHTML = ``;
        NML_Runtime.Converter(this.textContent,this.container,NML_Module);
    }

    disconnectedCallback() {
        // オブザーバーを停止
        this.observer.disconnect();
    }
    set innerHTML(value) {
        super.innerHTML = value; // 親クラスの innerHTML を設定
        this.update(); // Shadow DOM の更新
    }

    get innerHTML() {
        return super.innerHTML; // 親クラスの innerHTML を取得
    }
}

const currentScript = document.currentScript;
const currentScriptDir = currentScript.src.split("/").slice(0,-1).join("/");


var NML_Runtime = {};
var NML_Module = {};

window.addEventListener("load",async ()=>{
    NML_Runtime = await import('./runtime/eval.js');
    NML_Module.default = await import('./defaultmodule/default.js');
    customElements.define("nml-view", NeknajMarkupLanguageElement);
})