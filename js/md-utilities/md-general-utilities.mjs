export function mdGetLinearGradientFromColorArray(
  noteColorArray,
  colorBlurFactor = 0.2,
  inverted = false
) {
  const gradientDirection = inverted ? "to bottom" : "to top";
  let gradientText = `linear-gradient(${gradientDirection}, `;

  const noteColorArrayLength = noteColorArray.length;
  const colorBlurSizePercent = colorBlurFactor * (100 / noteColorArrayLength);
  const colorSizePercent =
    (100 - colorBlurSizePercent * (noteColorArrayLength - 1)) /
    noteColorArrayLength;

  noteColorArray.forEach((noteColor, i) => {
    if (i === 0) gradientText += `${noteColor} ${colorSizePercent}%, `;
    else if (i === noteColorArrayLength - 1)
      gradientText += `${noteColor} ${100 - colorSizePercent}%) `;
    else
      gradientText += `${noteColor} ${
        i * colorSizePercent + i * colorBlurSizePercent
      }% ${(i + 1) * colorSizePercent + i * colorBlurSizePercent}%, `;
  });

  return gradientText;
}

/** an id-creating Generator Function */
function* mdInitIdGenerator() {
  let i = 0;
  while (true) yield i++;
}

const mdGenerateNewId = mdInitIdGenerator();

export function mdGetNewId() {
  return mdGenerateNewId.next().value.toString();
}

/**
 * A function to turn a kebab-case string into a camelCase string.
 * @param {string} value - the kebab-case string to convert to camelCase
 * @returns {string} the converted camelCase string
 */
export function mdAttributeToProperty(value) {
  return value.replace(/-./g, (x) => x[1].toUpperCase());
}

/**
 * A function to turn an attribute value (or anything, really) into a boolean.
 * @param {any} value - the value to turn into a boolean
 * @returns {boolean} the converted boolean value
 */
export function mdAttributeToBoolean(value) {
  if (typeof value === "string") {
    switch (value) {
      case "":
        return true;
      case "false":
      case "0":
        return false;
    }
  }
  return Boolean(value);
}

// GTE0 = greater than or equal to zero (>=0)
export function mdAttributeToGTE0(value) {
  if (typeof value === "string") value = parseFloat(value);
  if (typeof value === "number") if (value >= 0) return value;
  throw new RangeError(
    `invalid attribute value: should be a number greater than or equal to 0: value = ${value}`
  );
}
