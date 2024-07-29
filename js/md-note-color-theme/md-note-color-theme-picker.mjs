import MD_NOTE_COLOR_THEMES from "./md-note-color-themes.mjs";
import MDNoteColorThemeComponent from "./md-note-color-theme-component.mjs";
import "./md-note-color-theme-editor.mjs";
import "../md-element/md-dialog.mjs";
import "../md-element/md-button/md-edit-button.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    #note-color-picker-wrapper {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      justify-content: center;
      column-gap: 2em;
      margin-block-end: 4em;

      > .note-color-radio-input-wrapper {
        display: flex;
        flex-direction: row;
        column-gap: 0.5em;

        > #note-color-radio-input-none + label {
          line-height: var(--_menu-button-size-large);
        }

        > #note-color-radio-input-color {
          + label {
            width: var(--_menu-button-size-large);
            height: var(--_menu-button-size-large);

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

    md-edit-button {
      display: block;
      margin-inline: auto;
      margin-block-start: var(--_margin-small);
      width: var(--_menu-button-size-large);
      height: var(--_menu-button-size-large);
    }

    #note-color-theme-picker-wrapper {
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      row-gap: 1.5em;
    }

    .selectable-option {
      > label {
        display: block;
        border: 0.1em solid;
        border-radius: var(--_border-radius-small-em);
        padding: 1em;

        &:hover {
          background-color: var(--_hover-bg-color);
        }
      }

      > input:checked + label {
        background-color: var(--_hover-bg-color);
      }
    }
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

  <h2>Note Color Theme</h2>

  <div id="note-color-theme-picker-wrapper">
    <div id="add-new-note-color-theme" class="selectable-option">
      <label>
        <h3>Theme Editor</h3>
        <md-edit-button></md-edit-button>
        <dialog is="md-dialog" id="add-new-note-color-theme-dialog">
          <md-note-color-theme-editor></md-note-color-theme-editor>
        </dialog>
      </label>
    </div>
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

class MDNoteColorThemePicker extends HTMLElement {
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
    const addNewNoteColorThemeOption = this.querySelector(
      "#add-new-note-color-theme"
    );
    const addNewNoteColorThemeDialog = this.querySelector(
      "#add-new-note-color-theme-dialog"
    );
    addNewNoteColorThemeOption.addEventListener("click", () => {
      addNewNoteColorThemeDialog.showModal();
    });

    const noteColorThemePickerWrapper = this.querySelector(
      "#note-color-theme-picker-wrapper"
    );
    MD_NOTE_COLOR_THEMES.forEach((MD_NOTE_COLOR_THEME, index) => {
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

customElements.define("md-note-color-theme-picker", MDNoteColorThemePicker);

export default MDNoteColorThemePicker;
