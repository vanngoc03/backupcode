import React from "react";

const InputReadOnly = ({ label, value, direction, editPhone }) => {
  return (
    <div>
      <div className={`flex ${direction ? direction : "flex-col gap-2"}`}>
        <label className="font-medium w-48 flex-none" htmlFor="exactly-address">
          {label}
        </label>
        <div className="flex-auto">
          <input
            value={value || ""}
            id="exactly-address"
            type="text"
            readOnly
            className="border border-gray-300 rounded-md bg-slate-200 p-2 w-full outline-none flex-auto"
          />
          {editPhone && (
            <small className="text-blue-500 hover:text-orange-400 cursor-pointer">
              Đổi số điện thoại
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputReadOnly;
