import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));

      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));

    }
  };



  return (
    <div className="flex flex-col md:flex-row bg-[length:400px_300px] bg-signImage h-screen  ">
      <div className="md:w-1/2 pt-20 md:px-12 lg:px-24 xl:px-32 ">
        <div className="p-4  bg-white rounded-lg shadow-lg  ">
          <h1 className="text-3xl font-bold font-sans text-gray-700 my-7">Sign In</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
            <input
              type="text"
              placeholder="email"
              className="border p-3 rounded-lg"
              id="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              className="border p-3 rounded-lg"
              id="password"
              onChange={handleChange}
            />
            <button
              disabled={loading}
              className="bg-blue-600 text-white p-3 uppercase rounded-lg hover:opacity-95 "
            >
              {loading ? "Loading..." : "Sign-In"}
            </button>
            <div className="flex items-center gap-4">
              <hr className="flex-1 border-t border-gray-300" />
              <p className="text-gray-600">Or login using</p>
              <hr className="flex-1 border-t border-gray-300" />
            </div>

            <OAuth />
          </form>
          <div className="flex gap-1 mt-2">
            <p>New to Propify?</p>
            <Link to={"/sign-up"} className="text-blue-500">
              Sign up
            </Link>
          </div>
          {error && <p className="text-red-500 mt-5">{error}</p>}
        </div>
      </div>
    </div>
  );
}
