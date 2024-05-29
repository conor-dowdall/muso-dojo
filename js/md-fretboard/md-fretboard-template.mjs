const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host {
      container-type: size;
      display: grid;
      grid-template-rows: 1fr max-content;
    }

    #fretboard {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
      grid-row: 1 / 2;
    }

    #fret-labels {
      display: grid;
      grid-template-columns: subgrid;
      grid-column: 1 / -1;
      grid-row: 2 / 3;
      align-items: center;
      justify-items: center;
      overflow: hidden;
      font-size: 3.5cqb;
    }

    :host([data-resize]) {
      resize: both;
      overflow: auto;
    }

    :host([data-fret-labels-position="top"]) {
      grid-template-rows: max-content 1fr;
    }

    :host([data-fret-labels-position="top"]) #fretboard {
      grid-row: 2 / 3;
    }

    :host([data-fret-labels-position="top"]) #fret-labels {
      grid-row: 1 / 2;
    }

    :host([data-fret-labels-position="hidden"]) {
      grid-template-rows: 1fr 0;
    }
  </style>

  <div id="fretboard"></div>
  <div id="fret-labels"></div>
`;

export default template;
