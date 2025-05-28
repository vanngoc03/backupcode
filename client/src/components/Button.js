import React, { memo } from "react";

const Button = ({
  text,
  textcolor,
  bgcolor,
  IcAfter,
  onClick,
  fullWidth,
  px,
  IcBefore,
}) => {
  return (
    <button
      type="button"
      className={`py-2 ${px ? px : "px-2"} ${textcolor} ${bgcolor} ${
        fullWidth && "w-full"
      } outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
      onClick={onClick}
    >
      {IcBefore && <IcBefore />}
      <span className="text-center">{text}</span>
      {IcAfter && <IcAfter />}
    </button>
  );
};

export default memo(Button);
