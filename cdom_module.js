export function elm(type, prop, children) {
    const elm = document.createElement(type);
    const propkey = Object.keys(prop);
    for (const key of propkey) {
        if (key == "data") {
            for (let k of Object.keys(prop[key])) {
                elm.dataset[k] = prop[key][k];
            }
        } else {
            elm.setAttribute(key, prop[key]);
        }
    }
    for (const child of children) {
        elm.appendChild(child);
    }
    return elm;
}

export function textelm(text) {
    return document.createTextNode(text);
}

Element.prototype.Add = Element.prototype.appendChild;

Element.prototype.Listen = function(type, listener, options) {
    this.addEventListener(type, listener, options);
    return this;
};

Element.prototype.addProp = function(prop) {
    const propkey = Object.keys(prop);
    for (const key of propkey) {
        if (key == "data") {
            for (let k of Object.keys(prop[key])) {
                this.dataset[k] = prop[key][k];
            }
        } else {
            this.setAttribute(key, prop[key]);
        }
    }
    return this;
};

Element.prototype.addClass = function(name) {
    this.classList.add(name);
    return this;
}