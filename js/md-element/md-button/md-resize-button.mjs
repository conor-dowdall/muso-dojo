import { MD_BUTTON_STYLE } from "../../../css/md-style-module.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    ${MD_BUTTON_STYLE}
  </style>

  <button type="button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 -960 960 960"
    >
      <path
        d="m 440,-840 h 80 v 80 h -80 z m 160,0 h 80 v 80 h -80 z m 160,0 h 80 v 80 h -80 z m 0,160 h 80 v 80 h -80 z m -640,160 h 80 v 80 h -80 z m 640,0 h 80 v 80 h -80 z m -640,160 h 80 v 80 h -80 z m 0,160 h 80 v 80 h -80 z m 160,0 h 80 v 80 h -80 z m 160,0 h 80 v 80 h -80 z m 160,0 h 160 v -160 h 80 v 240 H 600 Z M 120,-840 h 240 v 80 H 200 v 160 h -80 z"
      />
    </svg>
  </button>
`;

class MDResizeButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("md-resize-button", MDResizeButton);

export default MDResizeButton;
