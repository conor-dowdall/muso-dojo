const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <svg
    style="fill: currentcolor; width: 100%; height: 100%;"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 -960 960 960"
  >
    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
  </svg>
`;

class MDPlusButton extends HTMLButtonElement {
  constructor() {
    super();
    this.type = "button";
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("md-plus-button", MDPlusButton, {
  extends: "button",
});

export default MDPlusButton;
