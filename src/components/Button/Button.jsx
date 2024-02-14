import React from "react";

export default function Button({
  children,
  index,
  onClick,
  disabled,
  className
}) {
  return (
    <button
      className={className}
      disabled={disabled}
      key={index}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
