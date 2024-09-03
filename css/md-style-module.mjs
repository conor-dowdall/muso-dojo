export const MD_BUTTON_STYLE = /* CSS */ `    
button {
    font: inherit;
    width: 100%;
    height: 100%;
    border: none;
    padding: 0;
    background-color: transparent;
    
    > svg {
      fill: currentcolor;
      width: 100%;
      height: 100%;
    }
  }
`;

export const MD_HOVER_STYLE = /* CSS */ `
  .md-hover {
    border-radius: var(--_md-border-radius-small-percent);
    padding: var(--_md-padding-small);

    &:hover {
      background-color: var(--_md-hover-bg-color);
    }
  }
`;
