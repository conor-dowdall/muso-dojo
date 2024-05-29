import template from "./md-fretboard-template.mjs";
import MDInstrument from "../md-instrument/md-instrument.mjs";
import MDInstrumentNote from "../md-instrument-note/md-instrument-note.mjs";
import { mdAttributeToBoolean } from "../md-utilities/md-general-utilities.mjs";

/**
 * A class representing Muso Dojo's interactive fretboard element
 * @extends MDInstrument
 */
class MDFretboard extends MDInstrument {
  static get observedAttributes() {
    return [
      ...MDInstrument.observedAttributes,
      "fret-labels-position",
      "even-frets",
      "from-fret",
      "to-fret",
    ];
  }

  constructor() {
    super();
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.fretboardDiv = this.shadowRoot.getElementById("fretboard");
    this.fretLabelsDiv = this.shadowRoot.getElementById("fret-labels");

    // TODO
    this.width = "55rem";
    this.height = "20rem";
  }

  /** @returns {"bottom" | "top" | "hidden"} the fret labels position relative to the main fretboard area (default = "bottom") */
  get fretLabelsPosition() {
    return this.props.fretLabelsPosition ?? "bottom";
  }
  /** @param {"bottom" | "top" | "hidden"} value - the fret labels position relative to the main fretboard area (default = "bottom") */
  set fretLabelsPosition(value) {
    this.dataset.fretLabelsPosition = value;
    this.props.fretLabelsPosition = value;
  }

  /** @returns {number} the value of the lowest fret on the fretboard (default = 0) */
  get fromFret() {
    return this.props.fromFret ?? 0;
  }
  /** @param {number | string} value - the value of the lowest fret on the fretboard (default = 0) */
  set fromFret(value) {
    this.props.fromFret = parseInt(value);
    this.render();
  }

  /** @returns {number} the value of the highest fret on the fretboard (default = 12) */
  get toFret() {
    return this.props.toFret ?? 12;
  }
  /** @param {number | string} value - the value of the highest fret on the fretboard (default = 12) */
  set toFret(value) {
    this.props.toFret = parseInt(value);
    this.render();
  }

  /** @returns {boolean} whether to render the frets with the same width or with smaller frets towards the bridge (default = false) */
  get evenFrets() {
    return this.props.evenFrets ?? false;
  }
  /** @param {boolean} value - whether to render the frets with the same width or with smaller frets towards the bridge (default = false) */
  set evenFrets(value) {
    this.props.evenFrets = mdAttributeToBoolean(value);
    this.renderGridTemplateColumns();
  }

  /** @returns {number} the total number of frets rendered, including the open string area (fret 0) */
  get numFrets() {
    return this.toFret - this.fromFret + 1;
  }

  /** @typedef {number[] | number[][]} Tuning */
  /** @returns {Tuning} the midi numbers that represent the tuning of the open strings on the fretboard, from bottom of fretboard up ( default = standard guitar tuning) */
  get tuning() {
    return this.props.tuning ?? [40, 45, 50, 55, 59, 64]; // EADGBE
  }
  /** @param {Tuning} value - the midi numbers that represent the tuning of the open strings on the fretboard, from bottom of fretboard up ( default = standard guitar tuning) */
  set tuning(value) {
    this.props.tuning = value;
    this.render();
  }

  get numCourses() {
    return this.tuning.length;
  }

  get gridTemplateColumns() {
    if (this.evenFrets) return `repeat(${this.numFrets}, 1fr)`;
    let template = "";
    for (let i = 0; i < this.numFrets; i++)
      template = `${Math.pow(2, i / 12)}fr ${template}`;
    return template;
  }

  renderGridTemplateColumns() {
    this.style.gridTemplateColumns = this.gridTemplateColumns;
  }

  renderCourseFrets() {
    for (let course = 1; course <= this.numCourses; course++) {
      for (let fret = 0; fret < this.numFrets; fret++) {
        /** @type {MDInstrumentNote} */
        const note = document.createElement("md-instrument-note");
        note.noteLabel = this.noteLabel;
        note.midiNoteNumber =
          this.tuning[this.numCourses - course] + this.fromFret + fret;
        this.fretboardDiv.append(note);
      }
    }
  }

  renderFretLabels() {
    this.fretLabelsDiv.innerHTML = "";
    for (let i = 0; i < this.numFrets; i++) {
      const fretLabel = document.createElement("div");
      fretLabel.textContent = this.fromFret + i;
      this.fretLabelsDiv.append(fretLabel);
    }
  }

  render() {
    if (this.isConnected && this.doRender) {
      this.fretboardDiv.innerHTML = "";
      this.renderGridTemplateColumns();
      this.renderCourseFrets();
      this.renderFretLabels();
    }
  }
}

customElements.define("md-fretboard", MDFretboard);

export default MDFretboard;
