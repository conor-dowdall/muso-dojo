// @ts-check
import MDNoteColorThemeComponent from "./md-note-color-theme-component.mjs";
import MD_NOTE_COLOR_THEMES from "./md-note-color-themes.mjs";

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

  <select name="note-color-theme-select" id="note-color-theme-select"></select>

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

    /** @type{MDNoteColorThemeComponent | null} */
    const themeComponent = shadowRoot.querySelector(
      "md-note-color-theme-component"
    );
    if (themeComponent != null)
      this.#mdNoteColorThemeComponent = themeComponent;

    const themeSelect = shadowRoot.getElementById("note-color-theme-select");
    MD_NOTE_COLOR_THEMES.forEach((MD_NOTE_COLOR_THEME) => {
      const themeOption = document.createElement("option");
      themeOption.textContent = MD_NOTE_COLOR_THEME.name;
      themeSelect?.appendChild(themeOption);
    });
    this.#mdNoteColorThemeComponent.mdNoteColorTheme = MD_NOTE_COLOR_THEMES[0];
    this.#mdNoteColorThemeComponent.name = "My Theme";

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
