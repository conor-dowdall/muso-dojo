import "./md-close-button.mjs";

const template = document.createElement("template");
template.innerHTML = /* HTML */ `
  <style>
    /* This component doesn't use the shadow DOM
    but some custom styles are needed.
    Hopefully, this class name is complicated enough
    to not be used or applied anywhere else! */
    .md-dialog-local-component-style {
      padding: 0.75em;
      border-radius: 1em;

      & h2 {
        text-align: center;
      }

      & h3 {
        margin: 0;
      }

      &::backdrop {
        backdrop-filter: brightness(60%) contrast(60%);
      }

      > md-close-button {
        position: sticky;
        z-index: 9999;
        top: 0;
        margin-inline-start: auto;
        display: block;
        width: var(--_menu-button-size-large);
        height: var(--_menu-button-size-large);
        border-radius: 20%;
        padding: 0.3em;

        &:hover {
          background-color: color-mix(in srgb, currentcolor 15%, transparent);
        }
      }
    }
  </style>

  <md-close-button></md-close-button>
`;

class MDDialog extends HTMLDialogElement {
  constructor() {
    super();
    // Use this.prepend, because this element doesn't use the Shadow DOM
    // and therefore, slots aren't available.
    // Using this.append, the <md-close-button> comes last in the DOM order
    // (elements inside the <md-dialog> tag come first!)
    // and that is unusual, especially for keyboard (tab) navigation.
    this.prepend(template.content.cloneNode(true));
    this.classList.add("md-dialog-local-component-style");

    const closeButton = this.querySelector("md-close-button");
    closeButton.addEventListener("click", (event) => {
      // nested dialogs require event.stopPropagation()
      event.stopPropagation();
      this.close();
    });
  }
}

customElements.define("md-dialog", MDDialog, {
  extends: "dialog",
});

export default MDDialog;
