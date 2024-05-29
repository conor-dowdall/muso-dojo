import { mdAttributeToProperty } from "../md-utilities/md-general-utilities.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      width: min-content;
    }
  </style>
`;

/**
 * An instrument-multitool class for specific instrument-multitools
 * to inherit from, e.g. fretboard-multitool.
 *
 * References to this.instrumentMenu and this.instrument must
 * be included in any subclasses, e.g.
 *
 * this.instrumentMenu = this.shadowRoot.querySelector("md-fretboard-menu");
 * this.instrument = this.shadowRoot.querySelector("md-fretboard");
 *
 * @extends {HTMLElement}
 */
class MDInstrumentMultitool extends HTMLElement {
  constructor(props) {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.addEventListener("md-prop-change", (event) =>
      this.#handlePropChangeEvent(event)
    );
  }

  connectedCallback() {
    this.#setInitialMenuPropValues();
  }

  /**
   * Get all prop setters in the menu's shadow root,
   * loop over them, and get the instrument's value for each prop.
   * Set this as the initial value for each menu prop setter.
   */
  #setInitialMenuPropValues() {
    this.instrumentMenu.shadowRoot
      .querySelectorAll("[data-prop-setter]")
      .forEach((propSetter) => {
        switch (propSetter.type) {
          case "checkbox":
            propSetter.checked =
              this.instrument[
                mdAttributeToProperty(propSetter.dataset.propSetter)
              ];
            break;
          case "text":
          case "number":
          case "select-one":
            propSetter.value =
              this.instrument[
                mdAttributeToProperty(propSetter.dataset.propSetter)
              ];
            break;
          case "color":
            propSetter.value =
              this.instrument[
                mdAttributeToProperty(propSetter.dataset.propSetter)
              ];
            // change event sets the containing note color radio input's value
            propSetter.dispatchEvent(new Event("change"));
            break;
          case "md-resize-button":
            propSetter.on =
              this.instrument[
                mdAttributeToProperty(propSetter.dataset.propSetter)
              ];
            break;
          case "radio":
            if (
              propSetter.value.toLowerCase() ===
              this.instrument[
                mdAttributeToProperty(propSetter.dataset.propSetter)
              ].toLowerCase()
            )
              propSetter.checked = true;
            break;
          default:
            console.warn(
              `MDInstrumentMultitool: unknown prop-setter = ${propSetter.type} in instrument menu`
            );
        }
      });
  }

  /**
   * Handle a prop change, which should have an object containing {name, value}
   * in the detail property of the event.
   */
  #handlePropChangeEvent(event) {
    /** handle special case for resize prop change */
    if (event.detail.name === "resize") {
      if (event.detail.value === true) {
        this.instrument.style.outline = "1px solid currentcolor";
      } else {
        this.instrument.style.outline = "initial";
        this.instrumentMenu.shadowRoot.getElementById(
          "width-text-input"
        ).value = this.instrument.width;
        this.instrumentMenu.shadowRoot.getElementById(
          "height-text-input"
        ).value = this.instrument.height;
      }
    }

    /** set the new prop value on the instrument */
    this.instrument[mdAttributeToProperty(event.detail.name)] =
      event.detail.value;
  }
}

export default MDInstrumentMultitool;
