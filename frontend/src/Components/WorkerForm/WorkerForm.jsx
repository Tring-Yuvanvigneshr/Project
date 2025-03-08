// import React, { useState } from "react";
// import { useMutation, gql } from "@apollo/client";
// import "./workerForm.css";
// import { useNavigate } from "react-router-dom";
// import Snackbar from "@mui/material/Snackbar";
// import Alert from "@mui/material/Alert";
// import { useParams } from "react-router-dom";


// const CREATE_WORKER = gql`
//   mutation CreateWorker(
//     $userId: ID!
//     $name: String!
//     $phone: String!
//     $profession: String!
//     $experience: Int!
//     $aadhar_number: String!
//     $latitude: Float!
//     $longitude: Float!
//     $address: String!
//     $city: String!
//   ) {
//     createWorker(
//         userId: $userId
//         name: $name
//         phone: $phone
//         profession: $profession
//         experience: $experience
//         aadhar_number: $aadhar_number
//         latitude: $latitude
//         longitude: $longitude
//         address: $address
//         city: $city
//     ) {
//       id
//       name
//       phone
//       profession
//     }
//   }
// `;

// export default function AddWorkerForm() {
//   const { id }= useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     userId: "",
//     name: "",
//     phone: "",
//     profession: "",
//     experience: "",
//     aadhar_number: "",
//     latitude: 0,
//     longitude: 0,
//     address: "",
//     city: "",
//     locationSet: false,
//   });

//   const [createWorker] = useMutation(CREATE_WORKER);
//   const [open, setOpen] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");
//   const [toastSeverity, setToastSeverity] = useState("success");

//   const showToast = (message, severity = "success") => {
//     setToastMessage(message);
//     setToastSeverity(severity);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleGetLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           setFormData({
//             ...formData,
//             latitude,
//             longitude,
//             locationSet: true,
//           });

//           showToast("Location fetched successfully!");

//           try {
//             const response = await fetch(
//               `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${import.meta.env.VITE_OPENCAGE_API_KEY}`
//             );
//             const data = await response.json();

//             const city =
//               data.results[0].components.city ||
//               data.results[0].components.state;
//             const address = data.results[0].formatted;

//             setFormData((prev) => ({
//               ...prev,
//               city,
//               address,
//             }));

//             showToast("Address fetched successfully!");
//           } catch (error) {
//             showToast("Failed to fetch address. Enter manually.", "error");
//           }
//         },
//         (error) => {
//           showToast("Failed to fetch location. Allow location access.", "error");
//         }
//       );
//     } else {
//       showToast("Geolocation is not supported by this browser.", "error");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.profession.trim() === "") {
//       showToast("Please enter a profession!", "error");
//       return;
//     }

//     if (formData.experience < 0) {
//       showToast("Experience cannot be negative!", "error");
//       return;
//     }

//     if (formData.aadhar_number.length !== 12) {
//       showToast("Aadhar number must be 12 digits!", "error");
//       return;
//     }

//     if (formData.phone.length !== 10) {
//       showToast("Phone number must be 10 digits!", "error");
//       return;
//     }

//     if (!formData.locationSet) {
//       showToast("Please set your location!", "error");
//       return;
//     }

//     try {
//       console.log(formData);
      
//       await createWorker({
//         variables: {
//           userId: id,
//           phone: formData.phone,
//           profession: formData.profession,
//           experience: parseInt(formData.experience, 10),
//           aadhar_number: formData.aadhar_number,
//           latitude: formData.latitude,
//           longitude: formData.longitude,
//           address: formData.address,
//           city: formData.city,
//           name: formData.name,
//         },
//       });

//       showToast("Worker profile created successfully!", "success");
//       navigate("/dashboard");
//     } catch (err) {
//       showToast("Failed to create worker profile!", "error");
//       console.error("Error creating worker:", err);
//     }
//   };

//   return (
//     <div className="profile-info">
//       <h3>Create Worker Profile</h3>
//       <form onSubmit={handleSubmit}>
//         <label>Name</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />

//         <label>Phone Number</label>
//         <input
//           type="text"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           required
//         />

//         <label>Profession</label>
//         <input
//           type="text"
//           name="profession"
//           value={formData.profession}
//           onChange={handleChange}
//           required
//         />

//         <label>Experience (in years)</label>
//         <input
//           type="number"
//           name="experience"
//           value={formData.experience}
//           onChange={handleChange}
//           required
//         />

//         <label>Aadhar Number</label>
//         <input
//           type="text"
//           name="aadhar_number"
//           value={formData.aadhar_number}
//           onChange={handleChange}
//           required
//         />

//         <label>Set Location</label>
//         <button
//           type="button"
//           className={`get-location-btn ${
//             formData.locationSet ? "success" : ""
//           }`}
//           onClick={handleGetLocation}
//         >
//           {formData.locationSet ? "Location Set ✔" : "Get Current Location"}
//         </button>

//         <label>City</label>
//         <input
//           type="text"
//           name="city"
//           value={formData.city}
//           onChange={handleChange}
//         />

//         <label>Address</label>
//         <textarea
//           name="address"
//           value={formData.address}
//           onChange={handleChange}
//         />

//         <button type="submit" className="save-btn">
//           Create Worker Profile
//         </button>
//       </form>

//       <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
//         <Alert
//           onClose={handleClose}
//           severity={toastSeverity}
//           sx={{ width: "100%" }}
//         >
//           {toastMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import "./workerForm.css";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CREATE_WORKER = gql`
  mutation CreateWorker(
    $userId: ID!
    $name: String!
    $phone: String!
    $profession: String!
    $experience: Int!
    $aadhar_number: String!
    $latitude: Float!
    $longitude: Float!
    $address: String!
    $city: String!
  ) {
    createWorker(
      userId: $userId
      name: $name
      phone: $phone
      profession: $profession
      experience: $experience
      aadhar_number: $aadhar_number
      latitude: $latitude
      longitude: $longitude
      address: $address
      city: $city
    ) {
      id
      name
      phone
      profession
    }
  }
`;

export default function AddWorkerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    phone: "",
    profession: "",
    experience: "",
    aadhar_number: "",
    latitude: 0,
    longitude: 0,
    address: "",
    city: "",
    locationSet: false,
  });

  const [createWorker] = useMutation(CREATE_WORKER);
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  const showToast = (message, severity = "success") => {
    setToastMessage(message);
    setToastSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

          showToast("Location fetched successfully!");

          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${import.meta.env.VITE_OPENCAGE_API_KEY}`
            );
            const data = await response.json();

            const city =
              data.results[0].components.city ||
              data.results[0].components.state;
            const address = data.results[0].formatted;

            setFormData((prev) => ({
              ...prev,
              city,
              address,
            }));

            showToast("Address fetched successfully!");
          } catch (error) {
            showToast("Failed to fetch address. Enter manually.", "error");
          }
        },
        (error) => {
          showToast("Failed to fetch location. Allow location access.", "error");
        }
      );
    } else {
      showToast("Geolocation is not supported by this browser.", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.profession.trim() === "") {
      showToast("Please select a profession!", "error");
      return;
    }

    if (formData.experience < 0) {
      showToast("Experience cannot be negative!", "error");
      return;
    }

    if (formData.aadhar_number.length !== 12) {
      showToast("Aadhar number must be 12 digits!", "error");
      return;
    }

    if (formData.phone.length !== 10) {
      showToast("Phone number must be 10 digits!", "error");
      return;
    }

    if (!formData.locationSet) {
      showToast("Please set your location!", "error");
      return;
    }

    try {
      await createWorker({
        variables: {
          userId: id,
          phone: formData.phone,
          profession: formData.profession,
          experience: parseInt(formData.experience, 10),
          aadhar_number: formData.aadhar_number,
          latitude: formData.latitude,
          longitude: formData.longitude,
          address: formData.address,
          city: formData.city,
          name: formData.name,
        },
      });

      showToast("Worker profile created successfully!", "success");
      navigate("/dashboard");
    } catch (err) {
      showToast("Failed to create worker profile!", "error");
      console.error("Error creating worker:", err);
    }
  };

  return (
    <div className="profile-info">
      <h3>Create Worker Profile</h3>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Profession</label>
        <select
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          required
        >
          <option value="">Select Profession</option>
          <option value="Plumber">Plumber</option>
          <option value="Electrician">Electrician</option>
          <option value="Carpenter">Carpenter</option>
          <option value="Mechanic">Mechanic</option>
          <option value="Painter">Painter</option>
          <option value="Cleaner">Cleaner</option>
          <option value="AC Technician">AC Technician</option>
          <option value="Pest Control">Pest Control</option>
          <option value="Appliance Repairer">Appliance Repairer</option>
          <option value="Gardener">Gardener</option>
        </select>

        <label>Experience (in years)</label>
        <input
          type="number"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <label>Aadhar Number</label>
        <input
          type="text"
          name="aadhar_number"
          value={formData.aadhar_number}
          onChange={handleChange}
          required
        />

        <label>Set Location</label>
        <button
          type="button"
          className={`get-location-btn ${
            formData.locationSet ? "success" : ""
          }`}
          onClick={handleGetLocation}
        >
          {formData.locationSet ? "Location Set ✔" : "Get Current Location"}
        </button>

        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <button type="submit" className="save-btn">
          Create Worker Profile
        </button>
      </form>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={toastSeverity}
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
