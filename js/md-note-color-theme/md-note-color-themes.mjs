// @ts-check

/**
 * A Muso Dojo note color theme.
 * @typedef {object} MDNoteColorTheme
 * @property {string} name - the name of the Muso Dojo note color theme
 * @property {boolean} [relative] - if true, the colors will start
 * relative to the root note, that is set elsewhere. If false, the
 * colors will be fixed (note#0 = color#0). Default = false.
 * @property {[string, string, string, string, string, string, string, string, string, string, string, string]} colors -
 * the array of 12 RGB note colors in hexadecimal format, indexed from 0 to 11.
 */

/** @type {MDNoteColorTheme[]} */
const MD_NOTE_COLOR_THEMES = [
  {
    name: "None",
    relative: false,
    colors: ["", "", "", "", "", "", "", "", "", "", "", ""],
  },
  {
    name: "Muso Dojo",
    relative: false,
    colors: [
      "#ED2929",
      "#9F000F",
      "#78C7C7",
      "#00008B",
      "#FF9933",
      "#EBEB19",
      "#286704",
      "#99CC33",
      "#660099",
      "#CC00FF",
      "#BF6A1F",
      "#FF9EE6",
    ],
  },
  {
    name: "Boomwhackers",
    relative: false,
    colors: [
      "#E21C48",
      "#F26622",
      "#F99D1C",
      "#FFCC33",
      "#FFF32B",
      "#BCD85F",
      "#62BC47",
      "#009C95",
      "#0071BB",
      "#5E50A1",
      "#8D5BA6",
      "#CF3E96",
    ],
  },
  {
    name: "Root is Red",
    relative: true,
    colors: ["#ED2929", "", "", "", "", "", "", "", "", "", "", ""],
  },
];

export default MD_NOTE_COLOR_THEMES;
