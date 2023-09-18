import React from "react";

export default function Badge({ text, color }) {
  const style = {
    backgroundColor: color.dark,
    color: color.light,
    border: `solid 1px ${color.light}`,
  };
  return (
    <div style={style} className="badge">
      <span>{text}</span>
    </div>
  );
}
