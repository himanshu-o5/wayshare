"use client";
import axios from "axios";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function DriverForm() {
  const { user, isLoaded, isSignedIn } = useUser();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    carType: "",
    carColor: "",
    carNumber: "",
    fuelType: "",
    seatingCapacity: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, profileImage: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    // Profile image required
    if (!profileImage) newErrors.profileImage = "Profile image is required";
    // Required name fields
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    // Phone: 10 digits starting 6-9
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    // Car number: e.g. KA01AB1234
    if (!/^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/.test(formData.carNumber)) {
      newErrors.carNumber = "Enter a valid car plate (e.g. KA01AB1234)";
    }
    // Seating capacity: between 2 and 15
    const seat = parseInt(formData.seatingCapacity, 10);
    if (isNaN(seat) || seat < 2 || seat > 15) {
      newErrors.seatingCapacity = "Seating capacity should be between 2 and 15";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (isLoaded && isSignedIn) {
      try {
        const payload = {
          ...formData,
          email: user.primaryEmailAddress.emailAddress,
          driverId: user.id,
        };
        const res = await axios.post("/api/register/driver", payload, {
          headers: { "Content-Type": "application/json" },
        });
        if (res.status !== 201) {
          alert("Error submitting form");
          return;
        }
        alert("Driver registered successfully");
        window.location.href = "/";
      } catch (error) {
        console.error("Error:", error);
        alert("Error submitting form");
        window.location.href = "/";
      }
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
      errors[field] ? "border-red-500" : "border-gray-300 dark:border-gray-600"
    }`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg space-y-8 transition-colors duration-200"
        noValidate
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Wayshare Driver & Car Information
        </h2>

        {/* Image Upload */}
        <div className="flex flex-col items-center">
          {previewUrl ? (
            <Image
              src={previewUrl}
              width={100}
              height={100}
              alt="Profile Preview"
              className="rounded-full border-2 border-gray-300 dark:border-gray-600 mb-2"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full mb-2 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          <label className="cursor-pointer px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {errors.profileImage && (
            <p className="text-red-500 text-sm mt-1">{errors.profileImage}</p>
          )}
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["firstName", "First Name"],
            ["lastName", "Last Name"],
            ["phone", "Phone"],
            ["carType", "Car Type"],
            ["carColor", "Car Color"],
            ["carNumber", "Car Number"],
            ["seatingCapacity", "Seating Capacity"],
          ].map(([name, label]) => (
            <div key={name} className="flex flex-col">
              <label
                htmlFor={name}
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={
                  name === "seatingCapacity" || name === "phone"
                    ? "number"
                    : "text"
                }
                value={formData[name]}
                onChange={handleChange}
                required
                className={inputClass(name)}
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          <div className="flex flex-col">
            <label
              htmlFor="fuelType"
              className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              required
              className={inputClass("fuelType")}
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="inline-block px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
