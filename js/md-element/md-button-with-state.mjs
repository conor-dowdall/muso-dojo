class MDButtonWithState extends HTMLElement {
  #inactive = false;

  static get observedAttributes() {
    return ["inactive"];
  }

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "inactive":
        if (newValue == null) {
          this.#inactive = false;
          this.style.opacity = 1;
        } else {
          this.#inactive = true;
          this.style.opacity = 0.5;
        }
        break;
      default:
        console.warn("Unrecognized attribute name.");
    }
  }

  get inactive() {
    return this.#inactive;
  }

  set inactive(value) {
    if (value) this.setAttribute("inactive", "");
    else this.removeAttribute("inactive");
  }
}

customElements.define("md-button-with-state", MDButtonWithState);

export default MDButtonWithState;
