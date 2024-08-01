import {
  mdAttributeToProperty,
  mdAttributeToBoolean,
} from "../md-utilities/md-general-utilities.mjs";
import { getNoteColorTheme } from "../md-note-color-theme/md-note-color-theme-utilities.mjs";

/**
 * A base class that specific Muso Dojo instruments should inherit from,
 * for example MDFretboard.
 *
 * Observes attribute and property changes for:
 * "props-theme", "width", "height", "resize",
 * "note-label", "note-label-theme",
 * "note-color","note-color-theme",
 *
 * Creates a props object to store all property values.
 *
 * @extends HTMLElement
 */
class MDInstrument extends HTMLElement {
  static get observedAttributes() {
    return [
      "props-theme",
      "width",
      "height",
      "resize",
      "note-label",
      "note-label-theme",
      "note-color",
      "note-color-theme",
    ];
  }
  /** Store all the properties that define the instrument in
   * this props object. */
  props = {};

  /** A boolean to prevent unnecessary render method calls
   * before connectedCallback() is called. */
  isConnected = false;

  /** A boolean to prevent unnecessary render method calls
   * when multiple properties are to be set at once. */
  doRender = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    console.log(this.constructor.name, "connected");
    this.isConnected = true;
    this.doRender = true;
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[mdAttributeToProperty(name)] = newValue;
  }

  get propsTheme() {
    return this.props;
  }
  set propsTheme(value) {
    console.log("set props theme");
    this.doRender = false;

    const newPropsTheme = typeof value === "string" ? JSON.parse(value) : value;

    Object.entries(newPropsTheme).forEach(([attributeName, attributeValue]) => {
      console.log("set prop", attributeName, attributeValue);
      this[mdAttributeToProperty(attributeName)] = attributeValue;
    });

    this.doRender = true;
    this.render();
  }

  get width() {
    return this.style.width;
  }
  set width(value) {
    this.style.width = value;
    this.props.width = value;
  }

  get height() {
    return this.style.height;
  }
  set height(value) {
    this.style.height = value;
    this.props.height = value;
  }

  get resize() {
    return this.props.resize ?? false;
  }
  set resize(value) {
    const bool = mdAttributeToBoolean(value);
    if (bool) this.dataset.resize = "";
    else delete this.dataset.resize;
    this.props.resize = bool;
  }

  get noteLabel() {
    return this.props.noteLabel;
  }
  set noteLabel(value) {
    this.props.noteLabel = value;
    if (this.isConnected) {
      const instrumentNotes =
        this.shadowRoot.querySelectorAll("md-instrument-note");
      instrumentNotes.forEach((instrumentNote) => {
        instrumentNote.noteLabel = value;
      });
    }
  }

  get noteLabelTheme() {
    return this.props.noteLabelTheme;
  }
  set noteLabelTheme(value) {}

  get noteColor() {
    return this.props.noteColor ?? "";
  }
  set noteColor(value) {
    this.style.setProperty(`--md-note-color`, value);
    this.props.noteColor = value;
  }

  get noteColorTheme() {
    return this.props.noteColorTheme ?? "None";
  }
  set noteColorTheme(value) {
    const newNoteColorTheme = getNoteColorTheme(value);

    if (newNoteColorTheme != null) {
      newNoteColorTheme.colors.forEach((color, index) =>
        this.style.setProperty(`--md-note-color-${index}`, color)
      );
      this.props.noteColorTheme = value;
    }
  }

  render() {
    console.warm(`You should override this method!
    Wrap your render method in the following if statement:
    if (this.isConnected && this.doRender) {
      // your code here
    }
    `);
  }
}

export default MDInstrument;
