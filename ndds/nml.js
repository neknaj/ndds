class NeknajMarkupLanguageElement extends HTMLElement {
    constructor () {
        super();
        // Shadow DOMの作成
        this.shadow = this.attachShadow({ mode: 'open' });

        // 子要素を表示するためのコンテナを作成
        this.container = document.createElement('div');
        this.container.classList.add("NDDS");
        this.shadow.appendChild(this.container);
        NML_Elements.push(this);

        // MutationObserverの設定
        this.observer = new MutationObserver(() => {
            this.update();
        });

        for (let i of NML_Modules.style) {
            const styleLink = document.createElement('link');
            styleLink.setAttribute('rel', 'stylesheet');
            styleLink.setAttribute('href', i.startsWith("http")?i:(currentScriptDir+'/modules/'+i+".css"));
            this.shadow.appendChild(styleLink);
        }

        // 子要素の変更を監視
        this.observer.observe(this, { childList: true, subtree: true });
        this.struct = {doctitle:"",child:[]};
    }

    connectedCallback() {
        this.update();
    }

    update() {
        this.container.innerHTML = ``;
        this.struct = NML_Runtime.Converter(this.textContent,this.container);
        document.dispatchEvent(new CustomEvent("NMLUpdate",{bubbles:true,cancelable:true}));
    }

    disconnectedCallback() {
        // オブザーバーを停止
        this.observer.disconnect();
    }
    set innerHTML(value) {
        super.innerHTML = value; // 親クラスの innerHTML を設定
        this.update(); // Shadow DOM の更新
    }

    get innerNML() {
        return this.textContent; // 親クラスの innerHTML を取得
    }
    get innerHTML() {
        return this.container.innerHTML; // コンテナの innerHTML を取得
    }
}

const currentScript = document.currentScript;
const currentScriptDir = currentScript.src.split("/").slice(0,-1).join("/");


const NML_Modules = JSON.parse(fRead(currentScriptDir+'/modules/'+"modules.json"));

function NMLquerySelector(selector) {
    for (let i of NML_Elements) {
        if (i.shadow.querySelector(selector)!=null) {
            return i.shadow.querySelector(selector);
        }
    }
    return null;
}

var NML_Elements = [];
var NML_Runtime = {};
var NML_Module = {Inline:{},Block:{},Chain:{}};

window.addEventListener("load",async ()=>{
    for (let i of NML_Modules.theme) {
        const styleLink = document.createElement('link');
        styleLink.setAttribute('rel', 'stylesheet');
        styleLink.setAttribute('href', i.startsWith("http")?i:(currentScriptDir+'/modules/'+i+".css"));
        document.head.appendChild(styleLink);
    }
    NML_Runtime = await import(currentScriptDir+'/runtime/eval.js');
    for (let i of NML_Modules.js) {
        const module = await import(currentScriptDir+'/modules/'+i+".js")
        for (let j of Object.keys(module.Inline)) {
            NML_Module.Inline[j] = module.Inline[j]
        }
        for (let j of Object.keys(module.Block)) {
            NML_Module.Block[j] = module.Block[j]
        }
        for (let j of Object.keys(module.Chain)) {
            NML_Module.Chain[j] = module.Chain[j]
        }
    }
    NML_Runtime.setModule(NML_Module);
    // console.log(NML_Module)
    customElements.define("nml-view", NeknajMarkupLanguageElement);
})

function fRead(filename) {
    var hr = new XMLHttpRequest();
    hr.open("GET", filename, false);
    hr.send(null);
    if (hr.status == 200 || hr.status == 304) {
        return hr.responseText.replace(/\r\n/g, "\n");
    }
    else {
        throw "err " + filename;
    }
};