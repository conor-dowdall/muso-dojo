// @ts-check
import MD_NOTE_LABEL_THEMES from "../md-note-label/md-note-label-themes.mjs";
import { mdAttributeToBoolean } from "../md-utilities/md-general-utilities.mjs";
import MDSaveButtonWithState from "../md-element/md-save-button-with-state.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host {
      position: relative;
      display: flex;
      flex-direction: column;
      row-gap: 1em;
      text-align: center;
    }

    :host([editable]) input[type="checkbox"] {
      width: 1.5em;
      height: 1.5em;
    }

    #name-heading {
      margin: 0;
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

    #relative-wrapper {
      > #relative-input {
        ~ #relative-info::after {
          content: "colors are assigned to fixed notes";
        }

        &:checked ~ #relative-info::after {
          content: "colors are assigned relative to the root note";
        }
      }

      > #relative-info {
        margin: 0.2em 0 0 0;
      }
    }

    #controls-wrapper {
      display: flex;
      justify-content: end;

      > md-save-button {
        width: var(--_menu-button-size);
        height: var(--_menu-button-size);
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

  <div id="relative-wrapper">
    <input type="checkbox" name="relative-input" id="relative-input" />
    <label for="relative-input">relative</label>
    <p id="relative-info"></p>
  </div>

  <div id="controls-wrapper">
    <md-save-button-with-state></md-save-button-with-state>
  </div>

  <div id="interaction-blocking-div"></div>
`;

class MDNoteColorThemeComponent extends HTMLElement {
  /** @type {import("./md-note-color-themes.mjs").MDNoteColorTheme}*/
  #mdNoteColorTheme;

  static get observedAttributes() {
    return ["editable", "new-theme"];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.appendChild(template.content.cloneNode(true));

    // the theme component is not editable, by default
    this.#editable = false;

    shadowRoot
      .getElementById("relative-input")
      ?.addEventListener("change", (event) =>
        this.#handleRelativeChecked(event)
      );

    shadowRoot
      .querySelector("md-save-button-with-state")
      ?.addEventListener("click", () => this.#saveTheme());
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "editable":
        this.#editable = mdAttributeToBoolean(newValue);
        break;
      case "new-theme":
        this.#newTheme = mdAttributeToBoolean(newValue);
        break;
      default:
        console.warn("Unrecognized attribute name.");
    }
  }

  #saveTheme() {
    /** @type {import("./md-note-color-themes.mjs").MDNoteColorTheme}*/
    const newNoteColorTheme = {
      name: this.name,
      relative: this.relative,
      colors: this.colors,
    };

    const localNoteColorThemesTxt = localStorage.getItem("mdNoteColorThemes");

    let localNoteColorThemesObj;
    if (localNoteColorThemesTxt != null) {
      localNoteColorThemesObj = JSON.parse(localNoteColorThemesTxt);
      if (
        localNoteColorThemesObj.find(
          (noteColorTheme) => noteColorTheme.name === newNoteColorTheme.name
        )
      )
        localNoteColorThemesObj.push(newNoteColorTheme);
    } else localNoteColorThemesObj = [newNoteColorTheme];

    localStorage.setItem(
      "mdNoteColorThemes",
      JSON.stringify(localNoteColorThemesObj)
    );
  }

  #handleRelativeChecked(event) {
    event.target.checked
      ? this.#setRelativeNoteLabels()
      : this.#setFixedNoteLabels();
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
    const inputsDisabled = !value;

    const disabledInputs = this.shadowRoot?.querySelectorAll("input");
    if (disabledInputs != null)
      disabledInputs.forEach((element) => (element.disabled = inputsDisabled));

    const blockingDiv = this.shadowRoot?.getElementById(
      "interaction-blocking-div"
    );
    if (blockingDiv != null)
      blockingDiv.style.display = value ? "none" : "block";

    const controlsWrapper = this.shadowRoot?.getElementById("controls-wrapper");
    if (controlsWrapper != null)
      controlsWrapper.style.display = value ? "flex" : "none";
  }

  /** @returns {boolean} does this component use a "New Theme" template/look (default = false) */
  get newTheme() {
    return mdAttributeToBoolean(this.getAttribute("new-theme"));
  }

  /** @param {boolean} value - does this component use a "New Theme" template/look (default = false) */
  set newTheme(value) {
    value
      ? this.setAttribute("new-theme", "")
      : this.removeAttribute("new-theme");
  }

  /** @param {boolean} value - does this component use a "New Theme" template/look (default = false) */
  set #newTheme(value) {
    if (value) {
      const nameHeading = this.shadowRoot?.getElementById("name-heading");
      if (nameHeading != null) nameHeading.textContent = "New Theme";
      this.#setFixedNoteLabels();
    }
    // do nothing, if value is false
  }

  /** display relative note labels */
  #setRelativeNoteLabels() {
    this.#setNoteLabels(true);
  }

  /** display fixed note labels */
  #setFixedNoteLabels() {
    this.#setNoteLabels(false);
  }

  /** @param {boolean} relative - display relative note labels or fixed note labels */
  #setNoteLabels(relative) {
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
      ? this.#setRelativeNoteLabels()
      : this.#setFixedNoteLabels();

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

    // the relative section
    // assume colors are assigned to fixed notes, by default
    // the "None" theme is a special case
    if (this.#mdNoteColorTheme.name === "None") {
      const relativeWrapper =
        this.shadowRoot?.getElementById("relative-wrapper");
      if (relativeWrapper != null) relativeWrapper.style.display = "none";
    } else if (this.#mdNoteColorTheme.relative) {
      const relativeInput = /** @type {HTMLInputElement | null} */ (
        this.shadowRoot?.getElementById("relative-input")
      );
      if (relativeInput != null) relativeInput.checked = true;
    }
  }

  #updateNameHeading() {
    const nameHeading = this.shadowRoot?.getElementById("name-heading");
    if (nameHeading != null)
      nameHeading.textContent = this.#mdNoteColorTheme.name;
  }

  get name() {
    return this.#mdNoteColorTheme ? this.#mdNoteColorTheme.name : "New Theme";
  }

  get relative() {
    const relativeInput = /** @type {HTMLInputElement | null} */ (
      this.shadowRoot?.getElementById("relative-input")
    );
    return relativeInput?.checked;
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
