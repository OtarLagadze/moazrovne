"use client";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export default function Filter({
  options,
  placeholder,
  onChange,
  defaultValue = false,
}) {
  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      onChange={onChange}
      defaultValue={defaultValue}
      isMulti
      placeholder={placeholder}
      options={options}
    />
  );
}
