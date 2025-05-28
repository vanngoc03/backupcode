import React from "react";

const InputFormV2 = ({
  label,
  unit,
  value,
  setValue,
  name,
  small,
  invalidFields,
  setInvalidFields,
  direction,
}) => {
  return (
    <div className={`flex ${direction ? direction : "flex-col"}`}>
      <label className="w-48 flex-none" htmlFor="title">
        {label}
      </label>
      <div className="flex items-center flex-auto flex-col">
        <div className="flex items-center w-full">
          <input
            type="text"
            id="title"
            value={value}
            onChange={(e) =>
              setValue((prev) => ({ ...prev, [name]: e.target.value }))
            }
            onFocus={() => setInvalidFields([])}
            className={`${
              unit ? "rounded-tl-md rounded-bl-md" : "rounded-md"
            } border outline-none flex-auto border-gray-300 p-2`}
          />
          {unit && (
            <span className="p-2 rounded-tr-md rounded-br-md flex-none w-16 flex items-center justify-center bg-gray-200 border border-gray-200">
              {unit}
            </span>
          )}
        </div>
        {invalidFields?.some((item) => item.name === name) && (
          <small className="text-red-500 block w-full">
            {invalidFields?.find((item) => item.name === name)?.message}
          </small>
        )}
      </div>
      {small && <small className="opacity-70 whitespace-nowrap">{small}</small>}
    </div>
  );
};

export default InputFormV2;
