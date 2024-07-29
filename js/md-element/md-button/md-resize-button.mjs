import MD_BUTTON_STYLE from "./md-button-style.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host([on]) > button {
      border-bottom: 0.2em solid currentcolor;
    }
    ${MD_BUTTON_STYLE}
  </style>
  <button type="button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 -960 960 960"
    >
      <path
        d="m 440,-840 h 80 v 80 h -80 z m 160,0 h 80 v 80 h -80 z m 160,0 h 80 v 80 h -80 z m 0,160 h 80 v 80 h -80 z m -640,160 h 80 v 80 h -80 z m 640,0 h 80 v 80 h -80 z m -640,160 h 80 v 80 h -80 z m 0,160 h 80 v 80 h -80 z m 160,0 h 80 v 80 h -80 z m 160,0 h 80 v 80 h -80 z m 160,0 h 160 v -160 h 80 v 240 H 600 Z M 120,-840 h 240 v 80 H 200 v 160 h -80 z"
      />
    </svg>
  </button>
`;

class MDResizeButton extends HTMLElement {
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

customElements.define("md-resize-button", MDResizeButton);

export default MDResizeButton;
