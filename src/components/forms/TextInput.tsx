import React, { forwardRef } from "react";
import classNames from "classnames";
import { capitalizeFirstLetter } from "~/utils/formatters";
import { type FieldError } from "react-hook-form";

export type InputType = "text" | "email";

type InputProps = {
  name: string;
  label?: string;
  className?: string;
  error: FieldError | undefined;
  generateLabel?: boolean;
} & React.ComponentProps<"input">;

const TextInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      // id,
      name,
      label,
      type = "text",
      className = "",
      placeholder,
      error,
      generateLabel = true,
      ...props
    },
    ref
  ) => {
    const labelStr = label || capitalizeFirstLetter(name);
    const placeholderStr = placeholder || labelStr || undefined;

    return (
      <div className="flex w-full flex-col gap-y-2">
        {label || (generateLabel && <label htmlFor={name}>{labelStr}</label>)}
        <input
          name={name}
          type={type}
          ref={ref}
          aria-label={labelStr}
          placeholder={placeholderStr}
          className={classNames([
            "relative inline-flex w-full rounded border border-gray-300 bg-gray-50 p-4 leading-none text-gray-700 placeholder-gray-500 transition-colors ease-in-out hover:border-blue-400 focus:border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-30",
            className,
          ])}
          {...props}
        />
        {error && <span className="text-red-600">{error.message}</span>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
