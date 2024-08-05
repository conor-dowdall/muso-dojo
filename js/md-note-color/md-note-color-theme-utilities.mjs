// @ts-check
import MD_NOTE_COLOR_THEMES from "./md-note-color-themes.mjs";

/**
 * returns a MDNoteColorTheme, if one is found in first: default, and
 * second: local storage
 * @param {string} value - the name of the note color theme
 * @returns {import("./md-note-color-themes.mjs").MDNoteColorTheme | undefined}
 */
export function getNoteColorTheme(value) {
  let noteColorTheme;

  noteColorTheme = getNoteColorThemeFromDefault(value);
  if (noteColorTheme == null)
    noteColorTheme = getNoteColorThemeFromLocalStorage(value);

  return noteColorTheme;
}

/**
 * @param {string} value - the name of the note color theme
 * @returns {import("./md-note-color-themes.mjs").MDNoteColorTheme | undefined}
 */
export function getNoteColorThemeFromDefault(value) {
  return MD_NOTE_COLOR_THEMES.find(
    (noteColorTheme) =>
      noteColorTheme.name.toLowerCase() === value.toLowerCase()
  );
}

/**
 *
 * @param {string} value - the name of the note color theme
 * @returns {import("./md-note-color-themes.mjs").MDNoteColorTheme | undefined}
 */
export function getNoteColorThemeFromLocalStorage(value) {
  return getLocalNoteColorThemes()?.find(
    (noteColorTheme) =>
      noteColorTheme.name.toLowerCase() === value.toLowerCase()
  );
}

/**
 * @returns {import("./md-note-color-themes.mjs").MDNoteColorTheme[]}
 */
export function getNoteColorThemes() {
  const localThemes = getLocalNoteColorThemes();
  if (localThemes == null) return MD_NOTE_COLOR_THEMES;
  else return [...MD_NOTE_COLOR_THEMES, ...localThemes];
}

/**
 * @returns {import("./md-note-color-themes.mjs").MDNoteColorTheme[] | undefined}
 */
export function getLocalNoteColorThemes() {
  const localNoteColorThemesTxt = localStorage.getItem("mdNoteColorThemes");
  if (localNoteColorThemesTxt == null) return undefined;

  /** @type {import("./md-note-color-themes.mjs").MDNoteColorTheme[]} */
  const localNoteColorThemesArray = JSON.parse(localNoteColorThemesTxt);
  return localNoteColorThemesArray;
}
