import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER_DETAILS } from "../../graphQl/mutation/userMutation";
import "./profile.css";

const ProfileInfo = ({ userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
    locationSet: false,
  });

  const [updateUserDetails, { loading, error }] = useMutation(UPDATE_USER_DETAILS);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUserDetails({
        variables: {
          userId,
          name: formData.name,
          phone: formData.mobile,
          address: formData.address,
          city: formData.city,
        },
      });

      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile-info">
      <h3>Personal Information</h3>

      <label>Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />

      <label>Email</label>
      <input type="email" name="email" value={formData.email} disabled />

      <label>Mobile No</label>
      <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />

      <label>Address</label>
      <textarea name="address" value={formData.address} onChange={handleChange}></textarea>

      <label>City</label>
      <input type="text" name="city" value={formData.city} onChange={handleChange} />

      <button className="save-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {error && <p className="error">Error: {error.message}</p>}
    </div>
  );
};

export default ProfileInfo;
