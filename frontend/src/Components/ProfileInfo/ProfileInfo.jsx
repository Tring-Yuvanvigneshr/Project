import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { UPDATE_CUSTOMER } from "../../graphQl/mutation/userMutation.js";
import { setCustomerDetails } from "../../redux/slices/customerSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";

const ProfileInfo = () => {
  const customerDetails = useSelector((state) => state.customer.customerDetails);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    latitude: 0,
    longitude: 0,
    locationSet: false,
  });

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);


  useEffect(() => {
    if (customerDetails) {
      setFormData({
        name: customerDetails.name || "",
        email: user.email || "",
        mobile: customerDetails.phone || "",
        address: customerDetails.address || "",
        city: customerDetails.city || "",
        latitude: customerDetails.latitude || 0,
        longitude: customerDetails.longitude || 0,
        locationSet: !!customerDetails.latitude,
      });
    }
  }, [customerDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.name.trim() === "") {
      toast.error("Name cannot be empty.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      toast.error("Phone number must be exactly 10 digits.");
      return false;
    }

    return true;
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({
            ...formData,
            latitude,
            longitude,
            locationSet: true,
          });

          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${import.meta.env.VITE_OPENCAGE_API_KEY}`
            );
            const data = await response.json();

            const city = data.results[0].components.city || data.results[0].components.state;
            const address = data.results[0].formatted;

            setFormData((prev) => ({
              ...prev,
              city,
              address,
            }));

            toast.success("Address fetched successfully!");
          } catch (error) {
            toast.error("Failed to fetch address.");
          }
        },
        () => {
          toast.error("Failed to fetch location. Please allow location access.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const { data } = await updateCustomer({
        variables: {
          userId: user.id,
          name: formData.name,
          phone: formData.mobile,
          address: formData.address,
          city: formData.city,
          latitude: formData.latitude,
          longitude: formData.longitude,
        },
      });

      // dispatch(setCustomerDetails(data.updateCustomer));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile!");
    }
  };

  return (
    <div className="profile-info">
      <h3>Update Profile Information</h3>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
        />

  
        <label>Mobile No</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <button
          type="button"
          className={`get-location-btn ${formData.locationSet ? 'success' : ''}`}
          onClick={handleGetLocation}
        >
          {formData.locationSet ? "Location Set ✔" : "Get Current Location"}
        </button>

        <button type="submit" className="save-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileInfo;
