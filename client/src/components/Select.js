import React, { memo } from "react";

const Select = ({
  label,
  options,
  type,
  value,
  setValue,
  name,
  invalidFields,
  setInvalidFields,
}) => {
  const handleErrorText = () => {
    let nameInvalid = invalidFields?.find((item) => item.name === name);
    let addressInvalid = invalidFields?.find((item) => item.name === "address");

    return (
      `${nameInvalid ? nameInvalid.message : ""}` ||
      `${addressInvalid ? addressInvalid.message : ""}`
    );
  };

  return (
    <div className="flex flex-col gap-2 flex-1">
      <label className="font-medium" htmlFor={`select-${type}`}>
        {label}
      </label>
      <select
        id={`select-${type}`}
        className="outline-none border border-gray-300 p-2 rounded-md w-full"
        value={value}
        onChange={(e) =>
          !name
            ? setValue(e.target.value)
            : setValue((prev) => ({ ...prev, [name]: e.target.value }))
        } // Hàm setValue được gọi tại đây
        onFocus={() => setInvalidFields([])}
      >
        <option value="">{`--Chọn ${label}--`}</option>
        {Array.isArray(options) &&
          options.map((item) => (
            <option
              key={`${type}-${item.code || item.id || item.value || item.name}`}
              value={type === "category" ? item.code : item.id}
            >
              {type === "category" ? item.value : item.name}
            </option>
          ))}
      </select>
      {invalidFields && (
        <small className="text-red-500">{handleErrorText()}</small>
      )}
    </div>
  );
};

export default memo(Select);
