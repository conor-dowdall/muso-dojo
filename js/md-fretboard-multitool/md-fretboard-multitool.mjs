import MDInstrumentMultitool from "../md-instrument-multitool/md-instrument-multitool.mjs";
import "../md-fretboard/md-fretboard.mjs";
import "../md-fretboard-menu/md-fretboard-menu.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <md-fretboard-menu></md-fretboard-menu>
  <md-fretboard note-label="🟢"></md-fretboard>
`;

class MDFretboardMultitool extends MDInstrumentMultitool {
  constructor(props) {
    super();
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.instrumentMenu = this.shadowRoot.querySelector("md-fretboard-menu");
    this.instrument = this.shadowRoot.querySelector("md-fretboard");
  }
}

customElements.define("md-fretboard-multitool", MDFretboardMultitool);

export default MDFretboardMultitool;
