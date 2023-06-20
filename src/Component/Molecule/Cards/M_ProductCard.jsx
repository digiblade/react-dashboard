import React from "react";
import { FavoriteBorder } from "@mui/icons-material";
export default function M_ProductCard({
  profile,
  title,
  description,
  productDetails,
  onClick = (event) => {},
}) {
  return (
    <div className="product-card" onClick={() => onClick(productDetails)}>
      <FavoriteBorder className="fav-icon" />

      <img className="product-image-fluid" src={profile} alt="" />
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </div>
  );
}
