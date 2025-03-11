import Select from "react-select";

export default function Filter({
  options,
  placeholder,
  onChange,
  defaultValue = false,
}) {
  return (
    <Select
      onChange={onChange}
      defaultValue={defaultValue}
      isMulti
      placeholder={placeholder}
      options={options}
    />
  );
}
