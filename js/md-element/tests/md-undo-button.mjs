const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <svg
    style="fill: currentcolor; width: 100%; height: 100%;"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 -960 960 960"
  >
    <path
      d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"
    />
  </svg>
`;

class MDUndoButton extends HTMLButtonElement {
  constructor() {
    super();
    this.type = "button";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("md-undo-button", MDUndoButton, {
  extends: "button",
});

export default MDUndoButton;
