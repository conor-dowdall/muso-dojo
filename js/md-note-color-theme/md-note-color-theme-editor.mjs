// @ts-check
import MDNoteColorThemeComponent from "./md-note-color-theme-component.mjs";
import MD_NOTE_COLOR_THEMES from "./md-note-color-themes.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    #template-area-wrapper {
      > label > h3 {
        margin: margin: 0 0 var(--_margin-small) 0;
      }
    }

    #relative-wrapper {
      input[type="checkbox"] {
        width: var(--_checkbox-size-large);
        height: var(--_checkbox-size-large);
      }

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

        &:hover {
          background-color: var(--_hover-bg-color);
        }
      }
    }
  </style>

  <div id="template-area-wrapper">
    <label for="note-color-theme-select"><h3>Template</h3></label>
    <select
      name="note-color-theme-select"
      id="note-color-theme-select"
    ></select>
  </div>

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

    /** @type {MDNoteColorThemeComponent | null} */
    const themeComponent = shadowRoot.querySelector(
      "md-note-color-theme-component"
    );
    if (themeComponent != null)
      this.#mdNoteColorThemeComponent = themeComponent;
    else console.warn("md-note-color-theme-component cannot be found");

    const themeSelect = /** @type {HTMLSelectElement | null} */ (
      shadowRoot.getElementById("note-color-theme-select")
    );

    MD_NOTE_COLOR_THEMES.forEach((MD_NOTE_COLOR_THEME) => {
      const themeOption = document.createElement("option");
      themeOption.textContent = MD_NOTE_COLOR_THEME.name;
      themeSelect?.appendChild(themeOption);
    });

    this.#mdNoteColorThemeComponent.mdNoteColorTheme = MD_NOTE_COLOR_THEMES[0];
    this.#mdNoteColorThemeComponent.name = "Custom Theme";

    const relativeInput = /** @type {HTMLInputElement | null} **/ (
      shadowRoot.getElementById("relative-input")
    );

    themeSelect?.addEventListener("change", () => {
      const theme = MD_NOTE_COLOR_THEMES.find(
        (MD_NOTE_COLOR_THEME) => MD_NOTE_COLOR_THEME.name === themeSelect.value
      );
      if (theme != null) {
        this.#mdNoteColorThemeComponent.mdNoteColorTheme = theme;
        if (relativeInput != null)
          if (this.#mdNoteColorThemeComponent.relative != null)
            relativeInput.checked = this.#mdNoteColorThemeComponent.relative;
          else
            console.warn("mdNoteColorThemeComponent.relative may be undefined");
        else console.warn("relative-input element cannot be found");
      }
    });

    relativeInput?.addEventListener("change", (event) =>
      this.#handleRelativeChecked(event)
    );

    shadowRoot
      .querySelector("md-save-button-with-state")
      ?.addEventListener("click", () => this.#saveTheme());
  }

  #saveTheme() {
    this.#mdNoteColorThemeComponent.syncNameWithHeading();

    const localNoteColorThemesTxt = localStorage.getItem("mdNoteColorThemes");

    let localNoteColorThemesObj;
    if (localNoteColorThemesTxt != null) {
      localNoteColorThemesObj = JSON.parse(localNoteColorThemesTxt);
      const alreadyExists = localNoteColorThemesObj.findIndex(
        (noteColorTheme) =>
          noteColorTheme.name === this.#mdNoteColorThemeComponent.name
      );
      if (alreadyExists < 0)
        localNoteColorThemesObj.push(
          this.#mdNoteColorThemeComponent.mdNoteColorTheme
        );
      else
        localNoteColorThemesObj[alreadyExists] =
          this.#mdNoteColorThemeComponent.mdNoteColorTheme;
    } else
      localNoteColorThemesObj = [
        this.#mdNoteColorThemeComponent.mdNoteColorTheme,
      ];

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
