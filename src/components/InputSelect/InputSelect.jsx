import {
  Select as MUISelect,
  MenuItem,
  FormControl as MUIFormControl,
  FormHelperText as MUIFormHelperText,
  styled,
} from "@mui/material";

const InputSelect = ({
  name,
  value,
  onChange,
  options,
  label,
  ...remaining
}) => {
  return (
    <StyledMUIFormControl sx={{ minWidth: 120 }}>
      <StyledFormHelperText sx={{ color: "white" }}>
        {label}
      </StyledFormHelperText>
      <StyledMUISelect
        {...remaining}
        name={name}
        value={value}
        onChange={onChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {options.map((option, index) => {
          return (
            <MenuItem sx={{ color: "black" }} key={index} value={option?.value}>
              {option?.name}
            </MenuItem>
          );
        })}
      </StyledMUISelect>
    </StyledMUIFormControl>
  );
};

const StyledMUIFormControl = styled(MUIFormControl)(() => ({
  margin: "0 !important",
}));

const StyledFormHelperText = styled(MUIFormHelperText)(() => {
  return {
    margin: "0.5rem 0 ",
    fontSize: "0.8rem",
    "&.MuiFormHelperText-root.MuiFormHelperText-sizeMedium.MuiFormHelperText-contained":
      {
        "&.Mui-focused": {
          color: "white",
        },
      },
  };
});

const StyledMUISelect = styled(MUISelect)(() => {
  return {
    minWidth: "500px",
    border: " 2px solid rgba(53, 56, 64,0.4)",
    color: "white !important",
    ".MuiOutlinedInput-notchedOutline": {
      display: "none",
    },

    "&.Mui-focused": {
      border: "2px solid var(--clr-primary)",
    },
    svg: {
      fill: "white",
    },
    // "&:hover": {
    //   border: "2px solid blue",
    // },
  };
});

export default InputSelect;
