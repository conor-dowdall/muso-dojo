import MDNoteColorThemeComponent from "./md-note-color-theme-component.mjs";
import "./md-note-color-theme-editor.mjs";
import "../md-element/md-dialog.mjs";
import "../md-element/md-button/md-edit-button.mjs";
import { getNoteColorThemes } from "./md-note-color-theme-utilities.mjs";
import { MD_SELECTABLE_OPTION } from "../md-css/md-css-module.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    h2 {
      text-align: center;
    }

    #note-color-picker-wrapper {
      display: flex;
      justify-content: center;
      column-gap: var(--_md-margin-xlarge);

      > .note-color-radio-input-wrapper {
        display: flex;
        column-gap: var(--_md-margin-small);

        > #note-color-radio-input-none + label {
          line-height: var(--_md-menu-button-size-large);

          > h3 {
            margin: 0;
          }
        }

        > #note-color-radio-input-color {
          + label {
            width: var(--_md-menu-button-size-large);
            height: var(--_md-menu-button-size-large);

            > #note-color-color-input {
              width: 100%;
              height: 100%;
            }
          }

          &:not(:checked) + label #note-color-color-input {
            pointer-events: none;
          }
        }
      }
    }

    #note-color-theme-heading {
      margin-block-start: var(--_md-margin-xlarge);
    }

    #note-color-theme-editor-option {
      width: fit-content;
      margin: var(--_md-margin-large) auto;

      & h3 {
        margin: 0 0 var(--_md-margin-small) 0;
      }

      & md-edit-button {
        display: block;
        margin-inline: auto;
        width: var(--_md-menu-button-size-large);
        height: var(--_md-menu-button-size-large);
      }
    }

    #note-color-theme-picker-wrapper {
      display: flex;
      flex-direction: column;
      text-align: center;
      row-gap: var(--_md-margin-large);
    }

    ${MD_SELECTABLE_OPTION}
  </style>

  <h2>Default Note Color</h2>

  <div id="note-color-picker-wrapper">
    <!-- color "None" input -->
    <div class="note-color-radio-input-wrapper selectable-option">
      <input
        type="radio"
        name="note-color-radio-input"
        id="note-color-radio-input-none"
        value=""
        data-prop-setter="note-color"
      />
      <label for="note-color-radio-input-none"><h3>None</h3></label>
    </div>
    <!-- set color "value" input as checked and overwrite in 
      MDInstrumentMultitool.setInitialMenuPropValues() if necessary-->
    <div class="note-color-radio-input-wrapper selectable-option">
      <input
        type="radio"
        name="note-color-radio-input"
        id="note-color-radio-input-color"
        value="change-me"
        checked
        data-prop-setter="note-color"
      />
      <label for="note-color-radio-input-color">
        <input
          type="color"
          id="note-color-color-input"
          data-prop-setter="note-color"
        />
      </label>
    </div>
  </div>

  <h2 id="note-color-theme-heading">Note Color Theme</h2>

  <div id="note-color-theme-editor-option" class="selectable-option">
    <label>
      <h3>Theme Editor</h3>
      <md-edit-button></md-edit-button>
      <dialog is="md-dialog" id="note-color-theme-editor-dialog">
        <md-note-color-theme-editor></md-note-color-theme-editor>
      </dialog>
    </label>
  </div>

  <div id="note-color-theme-picker-wrapper">
    <!-- programmatically add note-color-theme options here -->
  </div>
`;

const noteColorThemeTemplate = document.createElement("template");
noteColorThemeTemplate.innerHTML = /* HTML */ `
  <div class="note-color-theme-radio-input-wrapper selectable-option">
    <input
      type="radio"
      name="note-color-theme-radio-input"
      id="change-me"
      value="change-me"
      data-prop-setter="note-color-theme"
    />
    <label for="change-me"></label>
  </div>
`;

class MDNoteColorInterface extends HTMLElement {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));

    // note color
    const noteColorRadioInputColor = this.querySelector(
      "#note-color-radio-input-color"
    );
    const noteColorColorInput = this.querySelector("#note-color-color-input");
    noteColorRadioInputColor.value = noteColorColorInput.value;
    noteColorColorInput.addEventListener("change", () => {
      noteColorRadioInputColor.value = noteColorColorInput.value;
    });

    // note color theme
    const noteColorThemeEditorOption = this.querySelector(
      "#note-color-theme-editor-option"
    );
    const noteColorThemeEditorDialog = this.querySelector(
      "#note-color-theme-editor-dialog"
    );
    noteColorThemeEditorOption.addEventListener("click", () => {
      noteColorThemeEditorDialog.showModal();
    });

    this.#populateNoteColorThemePickerWrapper();

    this.addEventListener("md-save-note-color-theme", () => {
      this.#populateNoteColorThemePickerWrapper();
    });
  }

  #populateNoteColorThemePickerWrapper() {
    const noteColorThemePickerWrapper = this.querySelector(
      "#note-color-theme-picker-wrapper"
    );

    noteColorThemePickerWrapper.replaceChildren();

    getNoteColorThemes().forEach((MD_NOTE_COLOR_THEME, index) => {
      noteColorThemePickerWrapper.append(
        this.#getNoteColorThemeOption(MD_NOTE_COLOR_THEME, index)
      );
    });
  }

  #getNoteColorThemeOption(MD_NOTE_COLOR_THEME, index) {
    const noteColorThemeOption = noteColorThemeTemplate.content.cloneNode(true);

    const noteColorThemeRadioInput =
      noteColorThemeOption.querySelector("input");
    noteColorThemeRadioInput.id = `note-color-theme-picker-${index}`;
    noteColorThemeRadioInput.value = MD_NOTE_COLOR_THEME.name;

    const noteColorThemeLabel = noteColorThemeOption.querySelector("label");
    noteColorThemeLabel.htmlFor = `note-color-theme-picker-${index}`;

    const noteColorThemeComponent = new MDNoteColorThemeComponent();
    noteColorThemeComponent.mdNoteColorTheme = MD_NOTE_COLOR_THEME;
    noteColorThemeLabel.append(noteColorThemeComponent);

    return noteColorThemeOption;
  }
}

customElements.define("md-note-color-interface", MDNoteColorInterface);

export default MDNoteColorInterface;
