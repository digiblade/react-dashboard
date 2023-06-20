import React from "react";
import { Dashboard, Widgets, Archive, Favorite } from "@mui/icons-material";
export default function M_Drawer() {
  return (
    <div className="card-section span-2 sidebar">
      <div className="sidebar-header">Logo</div>
      <hr />
      <div className="sidebar-body">
        <div className="sidebar-body-item">
          <Dashboard />
          Dashboard
        </div>
        <div className="sidebar-body-item active">
          <Widgets />
          All Products
        </div>
        <div className="sidebar-body-item">
          <Archive /> Orders
        </div>
        <div className="sidebar-body-item">
          <Favorite />
          Favorites
        </div>
      </div>
    </div>
  );
}
