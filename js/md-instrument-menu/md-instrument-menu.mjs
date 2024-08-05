import template from "./md-instrument-menu-template.mjs";

/**
 * A base class that specific Muso Dojo instrument-menus should inherit from,
 * for example MDFretboardMenu.
 *
 * All prop setters that are added to this, should not use a shadow dom because:
 * 1) change events should filter up from them to be dealt with here (in #handleChangeEvent)
 * 2) the fretboard multitool can scan for [data-prop-setter] values in this menu's shadow root
 *    and set the initial menu values from the instrument's initial values
 *
 * @extends HTMLElement
 */
class MDInstrumentMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.addEventListener("change", (event) =>
      this.#handleChangeEvent(event)
    );

    const noteColorThemeButton = this.shadowRoot.getElementById(
      "note-color-theme-button"
    );
    const noteColorThemeDialog = this.shadowRoot.getElementById(
      "note-color-theme-dialog"
    );
    noteColorThemeButton.addEventListener("click", () =>
      noteColorThemeDialog.showModal()
    );

    const settingsButton = this.shadowRoot.getElementById("settings-button");
    const settingsDialog = this.shadowRoot.getElementById("settings-dialog");
    settingsButton.addEventListener("click", () => settingsDialog.showModal());
  }

  /**
   * When one of the prop setter's value changes, dispatch an "md-prop-change"
   * custom event from the md-instrument-menu element. The details of the change
   * are attached to the custom event's detail property, in an Object describing the
   * prop change: {name, value}.
   */
  #handleChangeEvent(event) {
    switch (event.target.type) {
      case "checkbox":
        this.#mdPropChange(
          event.target.dataset.propSetter,
          event.target.checked
        );
        break;
      case "text":
      case "number":
      case "select-one":
      case "color":
        this.#mdPropChange(event.target.dataset.propSetter, event.target.value);
        break;
      case "md-resize-button":
        this.#mdPropChange("resize", event.target.on);
        break;
      case "radio":
        this.#mdPropChange(event.target.dataset.propSetter, event.target.value);
        break;
      default:
        console.warn(
          `MDInstrumentMenu: unknown event.target.type = ${event.target.type} in instrument menu's change event`
        );
    }
  }

  /**
   * A method to dispatch a md-prop-change custom event when a prop changes,
   * which contains {name, value} in an object in the event's detail property.
   * @param {string} name - the name of the prop that changed
   * @param {string|boolean} value - the value of the prop that changed
   */
  #mdPropChange(name, value) {
    console.log(
      "md-prop-change event emitted from instrument menu:",
      name,
      value
    );
    this.dispatchEvent(
      new CustomEvent("md-prop-change", {
        bubbles: true,
        composed: true,
        detail: { name, value },
      })
    );
  }
}

export default MDInstrumentMenu;
