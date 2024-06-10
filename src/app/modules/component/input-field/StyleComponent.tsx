export const autocompleteStyle = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: 'white',
    borderColor: '#CED4DA',
    minHeight: '32px',
    // height: '32px',
    borderRadius: "0.475rem",
    boxShadow: 'none',
    padding: "0 .6rem",
    '&:hover': {
      borderColor: '#CED4DA',
    },
  }),

  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "white",
    color: '#000',
    margin: "5px",
    width: "calc(100% - 10px)",
    cursor: state?.isDisabled ? 'not-allowed' : 'default',
    borderRadius: "8px",
    ':active': {
      ...provided[':active'],
      backgroundColor: !state?.isDisabled
        ? state?.isSelected
          ? "#d8eefb"
          : "#d8eefb"
        : undefined,
      color: "#000",
    },
    ':hover': {
      ...provided[':hover'],
      backgroundColor: !state?.isDisabled
        ? state?.isSelected
          ? "#d8eefb"
          : "#d8eefb"
        : undefined,
      color: "#000",
    },
    zIndex: state.isSelected ? 9999 : 'auto',
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    padding: '2px 0 0',
  }),

  input: (provided: any) => ({
    ...provided,
    margin: '0px',
  }),

  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    padding: 0,
    display: 'none',
  }),

  indicatorsContainer: (provided: any) => ({
    ...provided,
    height: 'calc(100% -2px)',
  }),

  clearIndicator: (provided: any) => ({
    ...provided,
    padding: 0,
  }),

  dropdownIndicator: (provided: any) => ({
    ...provided,
    padding: "0 4px 0 0",
  }),

  multiValue: (provided: any, state: any) => ({
    ...provided,
    height: "20px",
    margin: "0 2px 2px 0",
  }),

  multiValueLabel: (provided: any, state: any) => ({
    ...provided,
    display: "flex",
    alignItems: "center"
  }),
};

export const variantStandardStyle = {
  control: (provided: any, state: any) => ({
    ...provided,
    border: 'none',
    borderBottom: state.isFocused ? '2px solid #369DC3' : '1px solid #A9A9A9',
    boxShadow: 'none',
    borderRadius: 0,
    padding: "0px",
    '&:hover': {
      borderBottom: state.isFocused ? '2px solid #369DC3' : '1px solid #A9A9A9',
    },
  }),
}

export const multiValueRemove = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: '#ededed',
    '&:hover': {
      backgroundColor: '#ededed',
    },
  }),
  multiValueRemove: (provided: any, state: any) => ({
    ...provided,
    display: 'none',
  }),
};

export const heightSelectMutil = (height: string, maxHeight: string = "auto") => {
  return {
    control: (provided: any, state: any) => ({
      ...provided,
      height: height,
      maxHeight: maxHeight ? maxHeight : height,
      alignItems: "flex-start",
      overflowY: 'auto',
      padding: "5px 0 0 6px",
    }),

    valueContainer: (provided: any) => ({
      ...provided,
      height: 'none',
    }),
  }
};

export const heightAutocomplete = (height: string) => {
  return {
    control: (provided: any, state: any) => ({
      ...provided,
      height: height,
      minHeight: height,
    }),
  }
};