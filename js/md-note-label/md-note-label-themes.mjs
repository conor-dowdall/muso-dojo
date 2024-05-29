// @ts-check

/**
 * A Muso Dojo note label theme.
 * @typedef {object} MD_NOTE_LABEL_THEME
 * @property {string} name - the name of the Muso Dojo note label theme
 * @property {boolean} relative - if true, the labels will start
 * relative to the root note, that is set elsewhere. If false, the
 * labels will be fixed (note#0 = label#0). Defaults to false
 * @property {[string, string, string, string, string, string, string, string, string, string, string, string]} labels -
 * the array of 12 note labels, indexed from 0 to 11.
 */

/** @type {MD_NOTE_LABEL_THEME[]} */
const MD_NOTE_LABEL_THEMES = [
  {
    name: "All",
    relative: false,
    labels: [
      "C / C♮ / D♭♭ / B♯",
      "D♭ / C♯ / B♯♯",
      "D / D♮ / E♭♭ / C♯♯",
      "E♭ / F♭♭ / D♯",
      "E / E♮ / F♭ / D♯♯",
      "F / F♮ / G♭♭ / E♯",
      "G♭ / F♯ / E♯♯",
      "G / G♮ / A♭♭ / F♯♯",
      "A♭ / G♯",
      "A / A♮ / B♭♭ / G♯♯",
      "B♭ / C♭♭ / A♯",
      "B / B♮ / C♭ / A♯♯",
    ],
  },
  {
    name: "Sharp",
    relative: false,
    labels: ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"],
  },
  {
    name: "Flat",
    relative: false,
    labels: ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"],
  },
  {
    name: "Quality",
    relative: true,
    labels: [
      "P1",
      "m2",
      "M2",
      "m3",
      "M3",
      "P4",
      "d5",
      "P5",
      "m6",
      "M6",
      "m7",
      "M7",
    ],
  },
  {
    name: "Relative",
    relative: true,
    labels: ["1", "♭2", "2", "♭3", "3", "4", "♭5", "5", "♭6", "6", "♭7", "7"],
  },
  {
    name: "Extension",
    relative: true,
    labels: [
      "1",
      "♭9",
      "9",
      "♭3",
      "3",
      "11",
      "♭5",
      "5",
      "♭13",
      "13",
      "♭7",
      "7",
    ],
  },
  {
    name: "Solfege Do",
    relative: true,
    labels: [
      "do",
      "ra",
      "re",
      "me",
      "mi",
      "fa",
      "fi",
      "sol",
      "le",
      "la",
      "te",
      "ti",
    ],
  },
  {
    name: "Solfege La",
    relative: true,
    labels: [
      "la",
      "te",
      "ti",
      "do",
      "di",
      "re",
      "re",
      "mi",
      "fa",
      "fi",
      "sol",
      "si",
    ],
  },
  // set these as empty labels so that they are a valid option that can be overwritten
  {
    name: "Triad",
    relative: true,
    labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
  },
  {
    name: "Roman Triad",
    relative: true,
    labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
  },
  {
    name: "Seventh",
    relative: true,
    labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
  },
  {
    name: "Roman Seventh",
    relative: true,
    labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
  },
];

export default MD_NOTE_LABEL_THEMES;
