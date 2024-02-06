import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function ReactSelectDropDown({
  options,
  isMulti,
  placeholder,
  changehandler,
  defaultvaluearray,
  defaultValue,
  isDisabled
}) {
  const { theme } = useTheme();
  const [fills, setFills] = useState("#047857");

  useEffect(() => {
    switch (theme) {
      case "emerald":
        setFills("#047857");
        break;
      case "orange":
        setFills("#FF8E6C");
        break;
      case "blue":
        setFills("#1E40AF");
        break;
      case "purple":
        setFills("#7E22CE");
        break;
      case "dark":
        setFills("#059669");
        break;
    }
  }, [theme]);
  // Define custom color styles
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? fills : "white", // Customize the background color when an option is selected
      color: state.isSelected ? "white" : "black", // Customize the text color when an option is selected
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: fills, // Customize the background color of the selected value
      color: "white", // Customize the text color of the selected value
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white", // Customize the text color of the label in the selected value
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white", // Customize the color of the "x" icon to remove a selected value
      ":hover": {
        backgroundColor: "white", // Customize the background color when hovering over the "x" icon
        color: "black", // Customize the text color when hovering over the "x" icon
      },
    }),
  };

  return (
    <Select
      className="react-select-container "
      classNamePrefix="react-select"
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={isMulti ? defaultvaluearray : defaultValue}
      placeholder={placeholder}
      onChange={changehandler}
      isMulti={isMulti}
      options={options}
      isDisabled={isDisabled}
      styles={customStyles} // Apply the custom styles to the Select component
    />
  );
}
