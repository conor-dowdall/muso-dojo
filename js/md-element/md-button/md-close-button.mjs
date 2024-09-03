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
        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
      />
    </svg>
  </button>
`;

class MDCloseButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("md-close-button", MDCloseButton);

export default MDCloseButton;
