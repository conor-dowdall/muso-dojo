import MDInstrument from "../md-instrument/md-instrument.mjs";
import template from "./md-instrument-note-template.mjs";

class MDInstrumentNote extends MDInstrument {
  static get observedAttributes() {
    return [...MDInstrument.observedAttributes, "midi-note-number"];
  }

  constructor() {
    super();
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  get midiNoteNumber() {
    return this.props.midiNoteNumber;
  }
  set midiNoteNumber(value) {
    this.props.midiNoteNumber = parseInt(value);
    this.render();
  }
  get noteIndex() {
    return this.midiNoteNumber % 12;
  }

  get noteLabel() {
    return this.props.noteLabel;
  }
  set noteLabel(value) {
    this.props.noteLabel = value;
    this.render();
  }

  renderNoteColor() {
    const noteColorArea = this.shadowRoot.getElementById("note-color-area");
    noteColorArea.style.backgroundColor = `var(--_md-note-color-${this.noteIndex}`;
  }

  renderNoteLabel() {
    const noteLabelArea = this.shadowRoot.getElementById("note-label-area");
    noteLabelArea.textContent = this.noteLabel;
  }

  render() {
    if (this.isConnected && this.doRender) {
      this.renderNoteColor();
      this.renderNoteLabel();
    }
  }
}

customElements.define("md-instrument-note", MDInstrumentNote);

export default MDInstrumentNote;
