import { backendUrl } from "../index";
import { components } from "react-select";
import { isDisabled } from "@testing-library/user-event/dist/utils";

export const MultiValueLanguage = (props) => {
  return (
    <components.MultiValue {...props}>
      <span className="select-box">
        <img src={`${backendUrl}/flags/${props.data.value}_flag.jpg`} className="select-flag" alt={props.data.label} />
        <span className="select-box-label">{props.data.label}</span>
      </span>
    </components.MultiValue>
  );
};

export const MultiValueSport = (props) => {
  return (
    <components.MultiValue {...props}>
      <span className="select-box">
        <img src={`${backendUrl}/icons/sports/${props.data.value}_icon.svg`} className="select-icon" alt={props.data.label} />
        <span className="select-box-label">{props.data.label}</span>
      </span>
    </components.MultiValue>
  );
};

export const MultiValueRequiredItems = (props) => {
  return (
    <components.MultiValue {...props}>
      <span className="select-box">
        <img
          src={`${backendUrl}/icons/required-items/${props.data.value}_icon_white.svg`}
          className="select-icon"
          alt={props.data.label}
        />
        <span className="select-box-label">{props.data.label}</span>
      </span>
    </components.MultiValue>
  );
};

export const MultiValueStyles = {
  multiValue: (base) => ({
    ...base,
    borderRadius: `12px`,
    background: `var(--light-mode-primary-1)`,
    color: `var(--light-mode-typeface-inverted)`,
  }),
  multiValueRemove: (base) => ({
    ...base,
    borderRadius: `0 12px 12px 0`,
    "&:hover": { background: `var(--light-mode-warning)`, color: `var(--light-mode-typeface-inverted)` },
  }),
  control: (base, state) => ({
    minWidth: `0`,
    display: `flex`,
    transition: `200ms ease-out`,
    color: state.isDisabled ? `var(--light-mode-disabled-typeface)` : `var(--light-mode-typeface-inverted)`,
    border: state.isFocused || state.isSelected ? `none` : `none`,
    boxShadow: state.isFocused || state.isSelected ? `var(--light-mode-elevation-4)` : ``,
    borderRadius: `4px`,
    borderBottom: !state.isDisabled
      ? state.isFocused
        ? "3px solid var(--light-mode-primary-1)"
        : `3px solid var(--light-mode-typeface)`
      : `3px solid var(--light-mode-disabled-typeface)`,
    "&:hover": {
      boxShadow: `var(--light-mode-elevation-4)`,
      borderBottom: "3px solid var(--light-mode-primary-1)",
    },
  }),
  option: (base, state) => ({
    ...base,
    background: (state.isSelected || state.isFocused) && !state.isDisabled ? `var(--light-mode-primary-1)` : `none`,
    color:
      (state.isSelected || state.isFocused) && !state.isDisabled
        ? `var(--light-mode-typeface-inverted)`
        : `` || (state.isDisabled && `var(--light-mode-disabled-typeface)`),
  }),
};

export const SingleValueStyles = {
  control: (base, state) => ({
    minWidth: `0`,
    display: `flex`,
    transition: `200ms ease-out`,
    color: state.isDisabled ? `var(--light-mode-disabled-typeface)` : `var(--light-mode-typeface-inverted)`,
    border: state.isFocused || state.isSelected ? `none` : `none`,
    boxShadow: state.isFocused || state.isSelected ? `var(--light-mode-elevation-4)` : ``,
    borderRadius: `4px`,
    borderBottom: !state.isDisabled
      ? state.isFocused
        ? "3px solid var(--light-mode-primary-1)"
        : `3px solid var(--light-mode-typeface)`
      : `3px solid var(--light-mode-disabled-typeface)`,
    "&:hover": {
      boxShadow: `var(--light-mode-elevation-4)`,
      borderBottom: "3px solid var(--light-mode-primary-1)",
    },
  }),
  option: (base, state) => ({
    ...base,
    background: (state.isSelected || state.isFocused) && !state.isDisabled ? `var(--light-mode-primary-1)` : `none`,
    color:
      (state.isSelected || state.isFocused) && !state.isDisabled
        ? `var(--light-mode-typeface-inverted)`
        : `` || (state.isDisabled && `var(--light-mode-disabled-typeface)`),
  }),
};
