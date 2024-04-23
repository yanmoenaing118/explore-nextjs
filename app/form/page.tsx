"use client";

import React, { useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    gender: "",
    country: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">User Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1">
            User Name:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Gender:</label>
          <div>
            <input
              type="radio"
              id="male"
              name="gender"
              value="male"
              onChange={handleChange}
              className="mr-1"
              required
            />
            <label htmlFor="male" className="mr-4">
              Male
            </label>

            <input
              type="radio"
              id="female"
              name="gender"
              value="female"
              onChange={handleChange}
              className="mr-1"
              required
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block mb-1">
            Country:
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Country</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
