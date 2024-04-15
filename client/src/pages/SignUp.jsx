import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row  bg-repeat bg-[length:400px_300px]  bg-signImage	">

      <div className="md:w-1/2 py-20 mr-20 px-8 md:px-12 lg:px-24 xl:px-32 ">
        <div className="p-9   bg-white rounded-lg shadow-lg ">
        <h1 className="text-3xl font-bold font-sans text-gray-700 mb-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg"
            id="username"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-blue-600 text-white p-3 uppercase rounded-lg hover:opacity-95"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <div className="flex items-center gap-4">
  <hr className="flex-1 border-t border-gray-300" />
  <p className="text-gray-600">Or login using</p>
  <hr className="flex-1 border-t border-gray-300" />
</div>
          <OAuth />
        </form>
        <div className="flex flex-col gap-1 mt-2">
          <p>Already registered?</p>
          <Link to="/sign-in" className="text-blue-500">
            Sign in
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>

      <div className="md:w-1/2 p-10 self-center">
        <div className="bg-gray-900 bg-opacity-80 rounded-lg p-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-200">Things you Can Do with Propify Account</h1>
          <ul className="list-disc pl-5 text-gray-200 text-lg">
            <li>Post one Single Property for FREE</li>
            <li>Set property alerts for your requirement</li>
            <li>Get accessed by over 1 Lakh buyers</li>
            <li>Performance in search & Track responses & views online</li>
            <li>Add detailed property information & multiple photos per listing</li>
            <li>Showcase your property as Rental, PG or for Sale</li>
            <li>Get instant queries over Phone, Email and SMS</li>
          </ul>
        </div>
      </div>

    </div>
  );
}
