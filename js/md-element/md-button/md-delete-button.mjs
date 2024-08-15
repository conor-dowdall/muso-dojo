import MD_BUTTON_STYLE from "./md-button-style.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    ${MD_BUTTON_STYLE}
  </style>

  <button type="button">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 -960 960 960"
    >
      <path
        d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
      />
    </svg>
  </button>
`;

class MDDeleteButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("md-delete-button", MDDeleteButton);

export default MDDeleteButton;
