import MDButtonWithState from "./md-button-with-state.mjs";
import MD_BUTTON_STYLE from "./md-button-style.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    ${MD_BUTTON_STYLE}
  </style>

  <button type="button">
    <svg
      style="fill: currentcolor; width: 100%; height: 100%;"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 -960 960 960"
    >
      <path
        d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"
      />
    </svg>
  </button>
`;

class MDSaveButtonWithState extends MDButtonWithState {
  constructor() {
    super();
    this.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.eventType = "md-save";
  }
}

customElements.define("md-save-button-with-state", MDSaveButtonWithState);

export default MDSaveButtonWithState;
