import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { FaArrowRight } from "react-icons/fa";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formdata, setFormdata] = useState({});
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log("Upload is " + progress + "% done");
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormdata({ ...formdata, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async (e) => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row mt-20 justify-center items-start md:items-stretch p-3 max-w-screen">
  <div className="w-full md:w-1/2 md:mr-5 bg-white shadow-lg rounded-lg p-6">
    <h1 className="text-3xl font-bold font-sans text-gray-700 mb-7">
      Your Profile
    </h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
      <div className="flex flex-row  gap-4 ">
        {/* Image Upload */}
        <div className="">
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formdata.avatar || currentUser.avatar}
            alt="Display Image"
            className="rounded-full size-60 object-cover cursor-pointer"
          />
          <p className="text-sm text-white">
            {fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePercent > 0 && filePercent < 100 ? (
              <span className="text-slate-700">{`Uploading ${filePercent}%`}</span>
            ) : filePercent === 100 ? (
              <span className="text-green-700">
                Image successfully uploaded!
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
        {/* Other Form Fields */}
        <div className="flex flex-col gap-4 w-[75%]">
          <input
            type="text"
            placeholder="username"
            id="username"
            defaultValue={currentUser.username}
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="border p-3 rounded-lg w-full"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="uppercase bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "loading..." : "Update"}
          </button>
        </div>
      </div>
    </form>
    <div className="flex justify-between mt-5">
      <span
        onClick={handleDeleteUser}
        className="text-red-700 cursor-pointer"
      >
        Delete Account
      </span>
      <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
        Sign Out
      </span>
    </div>
    <p className="text-red-700 mt-7">{error ? error : ""}</p>
    <p className="text-green-700 mt-7">
      {updateSuccess ? "Updated Successfully !" : ""}
    </p>
    <div className="flex justify-between bg-white">
      <Link
        className="bg-green-700 text-white p-3 text-center uppercase rounded-lg hover:opacity-95"
        to={"/feedback"}
      >
        <span className="font-bold">Give Feedback</span>
      </Link>
      
      <Link
        className="bg-green-700 text-white p-3 text-center uppercase rounded-lg hover:opacity-95"
        to={"/create-listing"}
      >
        <span className="font-bold">Create Listing</span>
      </Link>

      <div className="flex items-center justify-center">
  <button onClick={handleShowListing} className="bg-blue-700 hover:opacity-90 text-white font-bold py-2 px-4 border rounded">
    See Your Listing
  </button>
  <FaArrowRight className="ml-2" />
</div>
    </div>
  </div>
  <div className="w-full md:w-1/2 md:ml-5 ">
    <div className="flex flex-col ">
      
      <p className="text-red-700 mt-5">
        {showListingError ? "Error showing listing" : ""}
      </p>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold font-sans text-gray-700 ">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4 bg-gray-100"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-gray-700 font-semibold hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col gap-2 item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-white bg-red-700 p-1 hover:opacity-90 rounded-md uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-white bg-green-700 hover:opacity-90 p-1 px-4 rounded-md uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>
  );
}
