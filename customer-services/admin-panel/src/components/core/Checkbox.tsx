import { styled } from "@mui/material/styles";
import { Checkbox as MaterialCheckBox } from "@mui/material";

const CheckboxIcon = styled("span")(() => ({
  display: "grid",
  placeItems: "center",
  margin: 2,
  paddingTop: 2,
  width: 20,
  height: 20,
  border: "1px solid var(--color-neutral-6)",
  borderRadius: 4,
  backgroundColor: "var(--color-neutral-1)",
  color: "var(--color-neutral-1)",

  ".Mui-checked &": {
    backgroundColor: "var(--color-theme-primary)",
    borderColor: "var(--color-theme-primary)",
  },

  ".Mui-disabled &": {
    background: "var(--color-neutral-2)",
    color: "var(--color-neutral-6)",
    borderColor: "var(--color-neutral-6)",
  },

  ".Mui-focusVisible &": {
    borderColor: "var(--color-theme-primary)",
  },
}));

const CheckboxChecked = () => (
  <CheckboxIcon>
    <svg width="12" height="9" viewBox="0 0 12 9" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.0023 1.49374C11.1273 1.61874 11.1898 1.77053 11.1898 1.9491C11.1898 2.12767 11.1273 2.27946 11.0023 2.40446L6.15406 7.25265L5.24334 8.16337C5.11834 8.28837 4.96655 8.35087 4.78798 8.35087C4.60941 8.35087 4.45763 8.28837 4.33263 8.16337L3.42191 7.25265L0.997803 4.82855C0.872803 4.70355 0.810303 4.55176 0.810303 4.37319C0.810303 4.19462 0.872803 4.04283 0.997803 3.91784L1.90852 3.00712C2.03352 2.88212 2.1853 2.81962 2.36387 2.81962C2.54245 2.81962 2.69423 2.88212 2.81923 3.00712L4.78798 4.98257L9.18082 0.583008C9.30582 0.458008 9.45761 0.395508 9.63618 0.395508C9.81475 0.395508 9.96654 0.458008 10.0915 0.583008L11.0023 1.49374Z"
      />
    </svg>
  </CheckboxIcon>
);

export function Checkbox({ ...props }): JSX.Element {
  return (
    <MaterialCheckBox
      sx={{
        p: "12px",
      }}
      icon={<CheckboxIcon />}
      checkedIcon={<CheckboxChecked />}
      {...props}
    />
  );
}
