class MDButtonWithState extends HTMLElement {
  #inactive = false;
  #eventType = "md-change-me";

  static get observedAttributes() {
    return ["inactive", "event-type"];
  }

  constructor() {
    super();
    /** add event listener by default and remove if inactive attribute is present */
    this.addEventListener("click", this.dispatchCustomEvent);
  }

  // TODO: inactive attribute as property
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "inactive":
        if (newValue == null) {
          this.addEventListener("click", this.dispatchCustomEvent);
          this.style.opacity = 1;
        } else {
          this.removeEventListener("click", this.dispatchCustomEvent);
          this.style.opacity = 0.5;
        }
        break;
      case "event-type":
        this.#eventType = newValue;
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

  get eventType() {
    return this.#eventType;
  }
  set eventType(value) {
    this.setAttribute("event-type", value);
  }

  dispatchCustomEvent() {
    this.dispatchEvent(new CustomEvent(this.eventType));
  }
}

customElements.define("md-button-with-state", MDButtonWithState);

export default MDButtonWithState;
