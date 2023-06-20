import React from "react";

export default function M_Category({
  profile,
  categoryName = "",
  onClick = () => {},
  active = false,
  id = "",
}) {
  return (
    <div
      className={`category-card ${active ? "active" : ""}`}
      onClick={() => onClick(id)}
    >
      <img src={profile} className="category-image-fluid" alt="" srcset="" />
      <div className="title">{categoryName}</div>
    </div>
  );
}
