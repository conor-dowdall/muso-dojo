// @ts-check
import MD_NOTE_LABEL_THEMES from "../md-note-label/md-note-label-themes.mjs";
import { mdAttributeToBoolean } from "../md-utilities/md-general-utilities.mjs";
import "../md-element/md-save-button-with-state.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host {
      position: relative;
      display: block;
    }

    :host([editable]) input[type="checkbox"] {
      width: 1.5em;
      height: 1.5em;
    }

    #name-heading {
      margin: 0 0 0.5em 0;
    }

    #note-colors-wrapper {
      display: flex;
      flex-flow: row wrap;
      gap: 0.5em;

      > .note-color-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 0.1em;

        > [id|="note-color-input"] {
          width: 2.5em;
          height: 2.5em;
        }
      }
    }

    #interaction-blocking-div {
      position: absolute;
      inset: 0;
    }
  </style>

  <h3 id="name-heading"></h3>

  <div id="note-colors-wrapper">
    <div class="note-color-wrapper">
      <input type="checkbox" id="note-checkbox-0" disabled />
      <label for="note-color-input-0" id="note-color-label-0"></label>
      <input type="color" id="note-color-input-0" disabled />
    </div>
    <div class="note-color-wrapper">
      <input type="checkbox" id="note-checkbox-1" disabled />
      <label for="note-color-input-1" id="note-color-label-1"></label>
      <input type="color" id="note-color-input-1" disabled />
    </div>
    <div class="note-color-wrapper">
      <input type="checkbox" id="note-checkbox-2" disabled />
      <label for="note-color-input-2" id="note-color-label-2"></label>
      <input type="color" id="note-color-input-2" disabled />
    </div>
    <div class="note-color-wrapper">
      <input type="checkbox" id="note-checkbox-3" disabled />
      <label for="note-color-input-3" id="note-color-label-3"></label>
      <input type="color" id="note-color-input-3" disabled />
    </div>
    <div class="note-color-wrapper">
      <input type="checkbox" id="note-checkbox-4" disabled />
      <label for="note-color-input-4" id="note-color-label-4"></label>
      <input type="color" id="note-color-input-4" disabled />
    </div>
    <div class="note-color-wrapper">
      <input type="checkbox" id="note-checkbox-5" disabled />
      <label for="note-color-input-5" id="note-color-label-5"></label>
      <input type="color" id="note-color-input-5" disabled />
    </div>
    <div class="note-color-wrapper">
      <input type="checkbox" id="note-checkbox-6" disabled />
      <label for="note-color-input-6" id="note-color-label-6"></label>
      <input type="color" id="note-color-input-6" disabled />
    </div>
    <div class="note-color-wrapper">
      <input type="checkbox" id="note-checkbox-7" disabled />
      <label for="note-color-input-7" id="note-color-label-7"></label>
      <input type="color" id="note-color-input-7" disabled />
    </div>
    <div class="note-color-wrapper">
      <input type="checkbox" id="note-checkbox-8" disabled />
      <label for="note-color-input-8" id="note-color-label-8"></label>
      <input type="color" id="note-color-input-8" disabled />
    </div>
    <div class="note-color-wrapper">
      <input type="checkbox" id="note-checkbox-9" disabled />
      <label for="note-color-input-9" id="note-color-label-9"></label>
      <input type="color" id="note-color-input-9" disabled />
    </div>
    <div class="note-color-wrapper">
      <input type="checkbox" id="note-checkbox-10" disabled />
      <label for="note-color-input-10" id="note-color-label-10"></label>
      <input type="color" id="note-color-input-10" disabled />
    </div>
    <div class="note-color-wrapper">
      <input type="checkbox" id="note-checkbox-11" disabled />
      <label for="note-color-input-11" id="note-color-label-11"></label>
      <input type="color" id="note-color-input-11" disabled />
    </div>
  </div>

  <div id="interaction-blocking-div"></div>
`;

class MDNoteColorThemeComponent extends HTMLElement {
  /** @type {import("./md-note-color-themes.mjs").MDNoteColorTheme} */
  #mdNoteColorTheme;

  static get observedAttributes() {
    return ["editable"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    // the theme component is not editable, by default
    this.#editable = false;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "editable":
        this.#editable = mdAttributeToBoolean(newValue);
        break;
      default:
        console.warn("Unrecognized attribute name.");
    }
  }

  /** @returns {boolean} allow the notes to be enabled/disabled and the colors to be chosen (default = false) */
  get editable() {
    return mdAttributeToBoolean(this.getAttribute("editable"));
  }

  /** @param {boolean} value - allow the notes to be enabled/disabled and the colors to be chosen (default = false) */
  set editable(value) {
    value
      ? this.setAttribute("editable", "")
      : this.removeAttribute("editable");
  }

  /** @param {boolean} value - allow the notes to be enabled/disabled and the colors to be chosen (default = false) */
  set #editable(value) {
    const nameHeading = this.shadowRoot?.getElementById("name-heading");
    if (nameHeading != null)
      if (value) nameHeading.contentEditable = "true";
      else nameHeading.contentEditable = "false";

    const inputsDisabled = !value;
    const disabledInputs = this.shadowRoot?.querySelectorAll("input");
    if (disabledInputs != null)
      disabledInputs.forEach((element) => (element.disabled = inputsDisabled));

    const blockingDiv = this.shadowRoot?.getElementById(
      "interaction-blocking-div"
    );
    if (blockingDiv != null)
      blockingDiv.style.display = value ? "none" : "block";
  }

  /** display relative note labels */
  setRelativeNoteLabels() {
    this.setNoteLabels(true);
  }

  /** display fixed note labels */
  setFixedNoteLabels() {
    this.setNoteLabels(false);
  }

  /** @param {boolean} relative - display relative note labels or fixed note labels */
  setNoteLabels(relative) {
    const noteLabelThemeName = relative ? "Relative" : "Flat";
    const noteLabels = MD_NOTE_LABEL_THEMES.find(
      (noteLabelTheme) => noteLabelTheme.name === noteLabelThemeName
    );
    noteLabels?.labels.forEach((noteLabel, index) => {
      const noteColorLabel = this.shadowRoot?.getElementById(
        "note-color-label-" + index
      );
      if (noteColorLabel != null) noteColorLabel.textContent = noteLabel;
    });
  }

  /** @returns {import("./md-note-color-themes.mjs").MDNoteColorTheme | undefined} a valid MDNoteColorTheme, if one is set */
  get mdNoteColorTheme() {
    return this.#mdNoteColorTheme;
  }

  /** @param {import("./md-note-color-themes.mjs").MDNoteColorTheme} value - a valid MDNoteColorTheme */
  set mdNoteColorTheme(value) {
    this.#mdNoteColorTheme = value;

    const nameHeading = this.shadowRoot?.getElementById("name-heading");
    if (nameHeading != null)
      nameHeading.textContent = this.#mdNoteColorTheme.name;

    this.#mdNoteColorTheme.relative
      ? this.setRelativeNoteLabels()
      : this.setFixedNoteLabels();

    // set the colors and color-labels.
    this.#mdNoteColorTheme.colors.forEach((color, index) => {
      // an empty string (i.e. color == "") is false
      if (color) {
        const noteCheckbox = /** @type {HTMLInputElement | null} */ (
          this.shadowRoot?.getElementById("note-checkbox-" + index)
        );
        if (noteCheckbox != null) noteCheckbox.checked = true;

        const noteColorInput = /** @type {HTMLInputElement | null} */ (
          this.shadowRoot?.getElementById("note-color-input-" + index)
        );
        if (noteColorInput != null) noteColorInput.value = color;
      }
    });
  }

  get name() {
    return this.#mdNoteColorTheme ? this.#mdNoteColorTheme.name : "New Theme";
  }

  get relative() {
    return this.#mdNoteColorTheme?.relative;
  }

  /**
   * @returns {[string, string, string, string, string, string, string, string, string, string, string, string]}
   * an array of RGB colors
   */
  get colors() {
    /** @type {[string, string, string, string, string, string, string, string, string, string, string, string]} */
    const colors = ["", "", "", "", "", "", "", "", "", "", "", ""];

    const noteColorInputs = this.shadowRoot?.querySelectorAll(
      '[id|="note-color-input"]'
    );

    const noteCheckboxes = this.shadowRoot?.querySelectorAll(
      '[id|="note-checkbox"]'
    );

    noteColorInputs?.forEach((noteColorInput, i) => {
      if (
        noteCheckboxes != null &&
        /** @type {HTMLInputElement} */ (noteCheckboxes[i]).checked
      )
        colors[i] = /** @type {HTMLInputElement} */ (noteColorInput).value;
    });

    return colors;
  }
}

customElements.define(
  "md-note-color-theme-component",
  MDNoteColorThemeComponent
);

export default MDNoteColorThemeComponent;
