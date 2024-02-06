import React, { useRef } from "react";

const InputTag = ({
  changeHandler,
  label,
  value,
  placeholder,
  type,
  defaultValue,
  required,
  maxLength,
  minLength,
  width,
  maxWidth,
  PY,
}) => {
  return (
    <div className={`flex flex-col relative  ${maxWidth && maxWidth} `}>
      {label && (
        <label className=" text-card-heading text-sm leading-[14px] font-semibold  pb-2">
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        className={`${type == "number" && ""} ${width ? width : "w-full"
          } px-4 ${PY ? PY : "py-4"
          } border border-navborder bg-summary-cards rounded-xl text-sm !leading-none text-card-subheading flex outline-none`}
        onChange={changeHandler}
        value={value}
        defaultValue={defaultValue}
        type={type ? type : "text"}
        required={required ? required : false}
        maxLength={maxLength ? maxLength : 10000}
        min={minLength ? minLength : 0}
      />
    </div>
  );
};

export default InputTag;
