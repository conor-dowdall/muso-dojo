import "./md-resize-button.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host([on]) > md-resize-button {
      border-bottom: 0.2em solid currentcolor;
    }
  </style>

  <md-resize-button></md-resize-button>
`;

class MDResizeButtonWithState extends HTMLElement {
  #on = false;
  static get observedAttributes() {
    return ["on"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.type = "md-resize-button";
    this.setAttribute("type", "md-resize-button");
    this.dataset.propSetter = "resize";

    this.addEventListener("click", () => this.#handleClickEvent());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "on") this.#on = newValue == null ? false : true;
  }

  get on() {
    return this.#on;
  }
  /** @param {boolean} value - set button on or not on */
  set on(value) {
    if (value) this.setAttribute("on", "");
    else this.removeAttribute("on");
  }

  /** when this element is clicked:
   * toggle the "on" boolean attribute/property and
   * dispatch a change event */
  #handleClickEvent() {
    this.on = !this.on;
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: true,
      })
    );
  }
}

customElements.define("md-resize-button-with-state", MDResizeButtonWithState);

export default MDResizeButtonWithState;
