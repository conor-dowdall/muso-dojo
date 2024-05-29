const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    :host {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      container-type: size;
    }

    #note-color-area {
      pointer
      position: absolute;
      width: 90%;
      height: 90%;
      border-radius: 20%;
      --_md-note-color: var(--md-note-color, transparent);
      --_md-note-color-0: var(--md-note-color-0, var(--_md-note-color));
      --_md-note-color-1: var(--md-note-color-1, var(--_md-note-color));
      --_md-note-color-2: var(--md-note-color-2, var(--_md-note-color));
      --_md-note-color-3: var(--md-note-color-3, var(--_md-note-color));
      --_md-note-color-4: var(--md-note-color-4, var(--_md-note-color));
      --_md-note-color-5: var(--md-note-color-5, var(--_md-note-color));
      --_md-note-color-6: var(--md-note-color-6, var(--_md-note-color));
      --_md-note-color-7: var(--md-note-color-7, var(--_md-note-color));
      --_md-note-color-8: var(--md-note-color-8, var(--_md-note-color));
      --_md-note-color-9: var(--md-note-color-9, var(--_md-note-color));
      --_md-note-color-10: var(--md-note-color-10, var(--_md-note-color));
      --_md-note-color-11: var(--md-note-color-11, var(--_md-note-color));
    }

    #note-label-area {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      font-size: 31cqi;
      /* 2.581 ~ = (100/31) * (80/100) */
      @container (aspect-ratio > 2.581/1) {
        font-size: 80cqb;
      }

      --_text-color: white;
      --_shadow-size: 0.1em;
      --_shadow-blur: 0.2em;
      --_shadow-color: black;

      color: var(--_text-color);

      text-shadow: 0 0 0.2em var(--_shadow-color),
        0 0 0.3em var(--_shadow-color),
        var(--_shadow-size) var(--_shadow-size) var(--_shadow-blur)
          var(--_shadow-color),
        var(--_shadow-size) calc(-1 * var(--_shadow-size)) var(--_shadow-blur)
          var(--_shadow-color),
        calc(-1 * var(--_shadow-size)) var(--_shadow-size) var(--_shadow-blur)
          var(--_shadow-color),
        calc(-1 * var(--_shadow-size)) calc(-1 * var(--_shadow-size))
          var(--_shadow-blur) var(--_shadow-color);
    }
  </style>

  <div id="note-color-area"></div>
  <div id="note-label-area"></div>
`;

export default template;
