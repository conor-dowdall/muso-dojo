import "../md-note-color-theme/md-note-color-theme-picker.mjs";
import "../md-element/md-button/md-palette-button.mjs";
import "../md-element/md-button/md-resize-button.mjs";
import "../md-element/md-button/md-settings-button.mjs";
import "../md-element/md-dialog.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host {
      --_menu-button-size: var(--menu-button-size, 2em);
      --_menu-button-size-large: var(--menu-button-size-large, 2.5em);
      --_checkbox-size-large: var(--checkbox-size-large, 1.5em);
      --_hover-bg-color: var(
        --hover-bg-color,
        color-mix(in srgb, currentcolor 15%, transparent)
      );
      --_border-radius-small-em: var(--border-radius-small-em, 1em);
      --_border-radius-small-percent: var(--border-radius-small-percent, 1em);
      --_border-radius-large-vw: var(--border-radius-large-vw, 10000vw);
      --_margin-small: var(--margin-small, 0.5em);

      display: flex;
      justify-content: flex-end;
    }

    .menu-button {
      width: var(--_menu-button-size);
      height: var(--_menu-button-size);
      padding: 0.5em;
    }

    #settings-dialog-wrapper {
      display: grid;
      grid-template-columns: 6em auto;
      gap: 2em 1em;

      > [data-prop-setter] {
        font: inherit;
        height: 1.5em;
        + label {
          > p {
            margin-block: 0;
          }
        }
      }
    }
  </style>

  <!-- color button and dialog -->
  <md-palette-button
    id="note-color-theme-button"
    class="menu-button"
  ></md-palette-button>
  <dialog is="md-dialog" id="note-color-theme-dialog">
    <md-note-color-theme-picker></md-note-color-theme-picker>
  </dialog>

  <!-- resize button -->
  <md-resize-button class="menu-button"></md-resize-button>

  <!-- settings button and dialog -->
  <md-settings-button
    id="settings-button"
    class="menu-button"
  ></md-settings-button>
  <dialog is="md-dialog" id="settings-dialog">
    <h2>Instrument Settings</h2>
    <div id="settings-dialog-wrapper">
      <!-- instrument width prop -->
      <input id="width-text-input" type="text" data-prop-setter="width" />
      <label for="width-text-input">
        <h3>width</h3>
        <p>the width of the instrument in CSS units, e.g. 750px, 40em, etc.</p>
      </label>
      <!-- instrument height prop  -->
      <input id="height-text-input" type="text" data-prop-setter="height" />
      <label for="height-text-input">
        <h3>height</h3>
        <p>the height of the instrument in CSS units, e.g. 300px, 20em, etc.</p>
      </label>
    </div>
  </dialog>
`;

export default template;
