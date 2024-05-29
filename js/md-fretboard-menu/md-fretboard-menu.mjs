import MDInstrumentMenu from "../md-instrument-menu/md-instrument-menu.mjs";
import template from "./md-fretboard-menu-template.mjs";

/**
 * A class representing Muso Dojo's menu element for the interactive fretboard element.
 * @extends MDInstrumentMenu
 */
class MDFretboardMenu extends MDInstrumentMenu {
  constructor() {
    super();
    const settingsDialogWrapper = this.shadowRoot.getElementById(
      "settings-dialog-wrapper"
    );
    settingsDialogWrapper.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("md-fretboard-menu", MDFretboardMenu);

export default MDFretboardMenu;
