const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <input
    id="even-frets-checkbox-input"
    type="checkbox"
    data-prop-setter="even-frets"
  />
  <label for="even-frets-checkbox-input">
    <h3>even frets</h3>
    <p>set the frets to be equal in width</p>
  </label>

  <select
    id="fret-labels-position-select"
    data-prop-setter="fret-labels-position"
  >
    <option value="bottom">bottom</option>
    <option value="top">top</option>
    <option value="hidden">hidden</option>
  </select>
  <label for="fret-labels-position-select">
    <h3>fret labels position</h3>
    <p>where to draw the fret labels</p>
  </label>

  <input
    id="from-fret-number-input"
    type="number"
    data-prop-setter="from-fret"
    min="0"
    max="1000"
    step="1"
  />
  <label for="from-fret-number-input">
    <h3>from fret</h3>
    <p>the value of the lowest fret (minimum = 0)</p>
  </label>

  <input
    id="to-fret-number-input"
    type="number"
    data-prop-setter="to-fret"
    min="0"
    max="1000"
    step="1"
  />
  <label for="to-fret-number-input">
    <h3>to fret</h3>
    <p>the value of the highest fret (minimum = 0)</p>
  </label>
`;

export default template;
