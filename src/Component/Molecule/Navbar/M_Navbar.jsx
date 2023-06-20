import React from "react";
import A_Input from "../../Atom/A_Input";
import profile from "../../../Assets/Image/profile.jpg";
export default function M_Navbar() {
  return (
    <nav>
      <div className="logo">Logo</div>
      <A_Input placeholder={"Search..."} />
      <div className="profile">
        <img src={profile} className="circle-avatar" alt="" />
        <div className="profile-details">
          <div className="heading">Akash Chourasia</div>
          <div className="subheading">Akash@gmail.com</div>
        </div>
      </div>
    </nav>
  );
}
