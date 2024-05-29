import mdNoteLabelThemes from "./md-note-label-themes.mjs";
import {
  mdFindObjectKeyValue,
  mdFindArrayIndexWithReplacements,
} from "../md-utilities/md-search-utilities.mjs";

export function mdFindNoteLabelTheme(searchTerm) {
  return mdFindObjectKeyValue(searchTerm, mdNoteLabelThemes);
}

export function mdFindNoteIndex(searchTerm) {
  return mdFindArrayIndexWithReplacements(
    searchTerm,
    mdNoteLabelThemes["All"].labels,
    false // case sensitive = false
  );
}

export function mdGetRootNoteIndex(rootNoteData) {
  if (rootNoteData != null) {
    if (isNaN(rootNoteData)) {
      const noteIndex = mdFindNoteIndex(rootNoteData);
      if (noteIndex >= 0) return noteIndex;
    } else if (rootNoteData >= 0) return rootNoteData % 12;
    throw new TypeError(`invalid attribute value: root-note = ${rootNoteData}`);
  }
  return undefined;
}

export function mdGetReplacementNoteLabelTheme(
  noteLabelThemeName,
  noteSequenceThemeObject
) {
  function mdGetNoteSequenceThemeLabelsLowerCase(themeObject) {
    return Object.fromEntries(
      Object.entries(themeObject.labels).map(([key, value]) => [
        key.toLowerCase(),
        value,
      ])
    );
  }
  const noteLabelTheme = mdFindNoteLabelTheme(noteLabelThemeName);
  const noteSequenceThemeLabels_LC = mdGetNoteSequenceThemeLabelsLowerCase(
    noteSequenceThemeObject
  );
  const newLabels =
    noteSequenceThemeLabels_LC[noteLabelThemeName.toLowerCase()];
  // copy the theme including a deep copy of labels, so original is not overwritten
  const replacementNoteLabelTheme = structuredClone(noteLabelTheme);
  if (newLabels != null)
    Object.keys(newLabels).forEach((noteIndex) => {
      replacementNoteLabelTheme.labels[noteIndex] = newLabels[noteIndex];
    });

  return replacementNoteLabelTheme;
}

export function mdGetNoteLabelThemeObject(
  noteLabelThemeData,
  relativeNoteLabelThemeData,
  noteSequenceThemeObject
) {
  let noteLabelTheme;
  if (noteLabelThemeData != null) {
    if (typeof noteLabelThemeData === "string") {
      // 1. an array of 12 note label values
      if (noteLabelThemeData.charAt(0) === "[")
        noteLabelTheme = { labels: JSON.parse(noteLabelThemeData) };
      // 2. a note-label-theme object
      else if (noteLabelThemeData.charAt(0) === "{")
        noteLabelTheme = JSON.parse(noteLabelThemeData);
      // 3. a note-label-theme name
      else {
        noteLabelTheme = mdFindNoteLabelTheme(noteLabelThemeData);
        if (noteLabelTheme != null) {
          // check note-sequence-theme for labels to overwrite
          // * only check for overwrite labels when a note-label-theme name is used
          if (
            noteSequenceThemeObject != null &&
            noteSequenceThemeObject.labels != null
          )
            noteLabelTheme = mdGetReplacementNoteLabelTheme(
              noteLabelThemeData,
              noteSequenceThemeObject
            );
        }
      }
    } else if (typeof noteLabelThemeData === "object") {
      // 1. an array of 12 note label values
      if (Array.isArray(noteLabelThemeData))
        noteLabelTheme = { labels: noteLabelThemeData };
      // 2. a note-label-theme object
      else noteLabelTheme = noteLabelThemeData;
    }

    if (noteLabelTheme != null) {
      // check relativeNoteLabelThemeData to overwrite relative setting
      if (relativeNoteLabelThemeData != null)
        noteLabelTheme.relative = relativeNoteLabelThemeData;
      return noteLabelTheme;
    } else
      throw new TypeError(
        `invalid attribute value: note-label-theme = "${noteLabelThemeData}"`
      );
  }

  return undefined;
}
