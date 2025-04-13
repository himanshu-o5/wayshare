"use client";
import axios from "axios";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isLoaded && isSignedIn){
      try {
        const res = await axios.post(
          "/api/register/driver",
          { ...formData, email: user.primaryEmailAddress.emailAddress, driverId: user.id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status !== 201) {
          alert("Error submitting form");
          return;
        }
        
        // Redirect to the driver dashboard or show a success message
        alert("Driver registered successfully");
        window.location.href = "/";

      } catch (error) {
        console.error("Error:", error);
        alert("Error submitting form");
        window.location.href = "/";
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Wayshare Driver & Car Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "firstName",
            "lastName",
            "phone",
            "carType",
            "carColor",
            "carNumber",
            "seatingCapacity",
          ].map((field) => (
            <div key={field}>
              <label
                className="block mb-1 font-medium capitalize"
                htmlFor={field}
              >
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={field === "seatingCapacity" || field === "phone" ? "number" : "text"}
                name={field}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 font-medium" htmlFor="fuelType">
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
