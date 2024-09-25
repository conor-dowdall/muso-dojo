export const MD_BUTTON_STYLE = /* CSS */ `
  button {
    font: inherit;
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    border-radius: var(--_md-border-radius-small-percent);
    padding: var(--_md-padding-small);

    > svg {
      fill: currentcolor;
      width: 100%;
      height: 100%;
    }

    &:hover {
      background-color: var(--_md-hover-bg-color);
    }
  }
`;

export const MD_SELECTABLE_OPTION = /* CSS */ `
  .selectable-option {
    > label {
      display: block;
      border: 0.1em solid;
      border-radius: var(--_md-border-radius-small-em);
      padding: var(--_md-padding-large);

      &:hover {
        background-color: var(--_md-hover-bg-color);
      }
    }

    > input:checked + label {
      background-color: var(--_md-hover-bg-color);
    }
  }
`;
