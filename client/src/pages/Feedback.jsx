import React, { useState } from "react";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from 'react-router-dom';

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: `${currentUser.username}`,
    feedback: "",
    rating: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const ratingChanged = (newRating) => {
    setFormData({
      ...formData,
      rating: newRating
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/user/feedback/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        setError(data.message);
      } else {
        setFormData({ ...formData, feedback: "", rating: "" }); 
        
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
  <div className="h-screen flex flex-col mt-10">
<div className="max-w-lg my-auto mx-12 p-3  bg-white rounded-lg shadow-lg">
  <h1 className="text-3xl font-bold font-sans text-gray-700   my-7">Feedback</h1>
  <form onSubmit={handleSubmit} className="flex flex-col gap-3">
    <h1 className="text-center">{currentUser.username}</h1>
    <textarea
      id="feedback"
      placeholder="Give feedback"
      className="border p-3 rounded-lg focus:outline-none focus:border-slate-700"
      required
      rows={5}
      cols={50}
      value={formData.feedback}
      onChange={handleChange}
    />
    <div className="flex flex-col items-center">
      <label htmlFor="rating" className="text-gray-800">Rate Us:</label>
      <ReactStars
        count={5}
        value={formData.rating}
        onChange={ratingChanged}
        size={48}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
    </div>
    <button
      type="submit"
      className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
      disabled={loading}
    >
      {loading ? "Submitting..." : "Submit"}
    </button>
    {error && <p className="text-red-500">{error}</p>}
  </form>
</div>
</div>
  );
}
