// @ts-check
import MDNoteColorThemeComponent from "./md-note-color-theme-component.mjs";
import MD_NOTE_COLOR_THEMES from "./md-note-color-themes.mjs";
import {
  getNoteColorTheme,
  getNoteColorThemeFromLocalStorage,
  getNoteColorThemes,
} from "./md-note-color-theme-utilities.mjs";
import "../md-element/md-button/md-save-button.mjs";
import "../md-element/md-button/md-delete-button.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--_md-margin-large);
    }

    #template-area-wrapper {
      #template-select-wrapper {
        display: flex;
        height: var(--_md-menu-button-size);
        align-items: center;
        justify-content: center;
        gap: var(--_md-margin-small);
      }

      & h3 {
        text-align: center;
        margin: 0 0 var(--_md-margin-xsmall) 0;
      }

      & md-delete-button {
        display: none;
        width: var(--_md-menu-button-size);
        height: var(--_md-menu-button-size);
        border-radius: var(--_md-border-radius-small-percent);
        padding: var(--_md-padding-small);

        &:hover {
          background-color: var(--_md-hover-bg-color);
        }
      }
    }

    #relative-wrapper {
      text-align: center;
      input[type="checkbox"] {
        width: var(--_md-checkbox-size-large);
        height: var(--_md-checkbox-size-large);
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
        margin: var(--_md-margin-xsmall) 0 0 0;
      }
    }

    #controls-wrapper {
      display: flex;
      justify-content: end;

      > md-save-button {
        width: var(--_md-menu-button-size-large);
        height: var(--_md-menu-button-size-large);
        border-radius: var(--_md-border-radius-small-percent);
        padding: var(--_md-padding-small);

        &:hover {
          background-color: var(--_md-hover-bg-color);
        }
      }
    }
  </style>

  <div id="template-area-wrapper">
    <label for="note-color-theme-select"><h3>Template</h3></label>
    <div id="template-select-wrapper">
      <select
        name="note-color-theme-select"
        id="note-color-theme-select"
      ></select>
      <md-delete-button></md-delete-button>
    </div>
  </div>

  <md-note-color-theme-component editable></md-note-color-theme-component>

  <div id="relative-wrapper">
    <input type="checkbox" name="relative-input" id="relative-input" />
    <label for="relative-input">relative</label>
    <p id="relative-info"></p>
  </div>

  <div id="controls-wrapper">
    <md-save-button></md-save-button>
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

    this.#populateThemeSelect();

    this.#mdNoteColorThemeComponent.mdNoteColorTheme = MD_NOTE_COLOR_THEMES[0];
    this.#mdNoteColorThemeComponent.name = "Custom Theme";

    const themeSelect = /** @type {HTMLSelectElement | null} */ (
      shadowRoot.getElementById("note-color-theme-select")
    );
    const relativeInput = /** @type {HTMLInputElement | null} **/ (
      shadowRoot.getElementById("relative-input")
    );

    themeSelect?.addEventListener("change", () => {
      const theme = getNoteColorTheme(themeSelect.value);
      if (theme != null) {
        const deleteThemeButton = /** @type {HTMLButtonElement | null} **/ (
          shadowRoot.querySelector("md-delete-button")
        );
        if (deleteThemeButton != null) {
          deleteThemeButton.style.display = getNoteColorThemeFromLocalStorage(
            themeSelect.value
          )
            ? "inline-block"
            : "none";
        } else console.warn("delete-theme-button cannot be found");

        this.#mdNoteColorThemeComponent.mdNoteColorTheme = theme;
        if (relativeInput != null)
          if (this.#mdNoteColorThemeComponent.relative != null)
            relativeInput.checked = this.#mdNoteColorThemeComponent.relative;
          else
            console.warn("mdNoteColorThemeComponent.relative may be undefined");
        else console.warn("relative-input element cannot be found");
      } else console.warn("unknown note color theme selected (somehow!)");
    });

    relativeInput?.addEventListener("change", (event) => {
      this.#mdNoteColorThemeComponent.relative = relativeInput.checked;
    });

    shadowRoot
      .querySelector("md-save-button")
      ?.addEventListener("click", () => this.#saveTheme());
  }

  #populateThemeSelect() {
    const themeSelect = /** @type {HTMLSelectElement | null} */ (
      this.shadowRoot?.getElementById("note-color-theme-select")
    );
    if (themeSelect != null) {
      themeSelect.replaceChildren();
      getNoteColorThemes().forEach((MD_NOTE_COLOR_THEME) => {
        const themeOption = document.createElement("option");
        themeOption.textContent = MD_NOTE_COLOR_THEME.name;
        themeSelect.appendChild(themeOption);
      });
    } else console.warn("theme select element cannot be found");
  }

  #saveTheme() {
    this.#mdNoteColorThemeComponent.syncNameWithHeading();
    this.#mdNoteColorThemeComponent.syncColorsWithColorInputs();

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

    this.dispatchEvent(
      new CustomEvent("md-save-note-color-theme", {
        bubbles: true,
      })
    );

    this.#populateThemeSelect();
  }
}

customElements.define("md-note-color-theme-editor", MDNoteColorThemeEditor);

export default MDNoteColorThemeEditor;
