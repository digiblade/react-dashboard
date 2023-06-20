import React from "react";
import noContent from "../../../Assets/nodata.jpg";
export default function M_NoContent({
  resMessage = "Sorry No Content Available",
}) {
  return (
    <div className="no-content">
      <img src={noContent} className="no-content-image" alt="" srcset="" />
      <p className="no-content-message">{resMessage}</p>
    </div>
  );
}
