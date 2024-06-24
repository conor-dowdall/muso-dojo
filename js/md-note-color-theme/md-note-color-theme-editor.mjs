// @ts-check
import MDNoteColorThemeComponent from "./md-note-color-theme-component.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
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

      > md-save-button-with-state {
        width: var(--_menu-button-size);
        height: var(--_menu-button-size);
      }
    }
  </style>

  <md-note-color-theme-component editable></md-note-color-theme-component>

  <div id="relative-wrapper">
    <input type="checkbox" name="relative-input" id="relative-input" />
    <label for="relative-input">relative</label>
    <p id="relative-info"></p>
  </div>

  <div id="controls-wrapper">
    <md-save-button-with-state></md-save-button-with-state>
  </div>
`;

class MDNoteColorThemeEditor extends HTMLElement {
  /** @type {MDNoteColorThemeComponent} */
  #mdNoteColorThemeComponent;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    shadowRoot
      .getElementById("relative-input")
      ?.addEventListener("change", (event) =>
        this.#handleRelativeChecked(event)
      );

    shadowRoot
      .querySelector("md-save-button-with-state")
      ?.addEventListener("click", () => this.#saveTheme());
  }

  #saveTheme() {
    /** @type {import("./md-note-color-themes.mjs").MDNoteColorTheme} */
    const newNoteColorTheme = {
      name: this.#mdNoteColorThemeComponent.name,
      relative: this.#mdNoteColorThemeComponent.relative,
      colors: this.#mdNoteColorThemeComponent.colors,
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
      ? this.#mdNoteColorThemeComponent.setRelativeNoteLabels()
      : this.#mdNoteColorThemeComponent.setFixedNoteLabels();
  }
}

customElements.define("md-note-color-theme-editor", MDNoteColorThemeEditor);

export default MDNoteColorThemeEditor;
