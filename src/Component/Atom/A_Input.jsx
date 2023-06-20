import React from "react";
import { Search } from "@mui/icons-material";
export default function A_Input({
  onChange = () => {},
  placeholder,
  style = {},
  icon,
  inputBarStyle = {},
  id = "uniqueId",
  key = "uniqueKey",
  value,
  type = "text",
}) {
  return (
    <div className="search-bar" style={inputBarStyle} key={key}>
      <div className="form-group" style={inputBarStyle}>
        {icon ? icon : <Search />}
        <input
          id={id}
          type={type}
          style={style}
          onChange={onChange}
          className="form-control"
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
}
