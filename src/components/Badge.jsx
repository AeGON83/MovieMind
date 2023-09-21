import React from "react";

export default function Badge({ text, color }) {
  const style = {
    color: color,
  };
  return (
    <div style={style} className="badge">
      <span>{text}</span>
    </div>
  );
}
