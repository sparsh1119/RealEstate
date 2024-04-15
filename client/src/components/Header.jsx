import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate , useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import logo from "../assets/PropifyHeader.png"

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
<header className={`bg-rose-950 w-full fixed top-0 z-10  ${scrolling ? "shadow-md shadow-slate-600" : ""}`}>
  <div className="flex justify-between items-center max-w-6xl mx-auto p-1 ">
    <Link to="/">
      <img className="rounded-lg transition duration-200 hover:scale-95" src={logo} alt="cjcjs" />
    </Link>
    <form onSubmit={handleSubmit} className="bg-slate-100 px-3 py-1 rounded-full flex items-center my-1 sm:w-64">
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent focus:outline-none w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button>
        <FaSearch className="text-slate-800" />
      </button>
    </form>
    <ul className="flex gap-4 items-center text-white">
      <Link to="/">
        <li className={`hidden sm:inline hover:underline ${location.pathname ==='/' ? "text-yellow-300" : ""}`}>Home</li>
      </Link>
      <Link to="/about">
        <li className={`hidden sm:inline hover:underline ${location.pathname ==='/about' ? "text-yellow-300" : ""}`}>About</li>
      </Link>
      <Link to="/profile">
        {currentUser ? (
          <img className="rounded-full h-7 w-7 object-cover hidden sm:inline" src={currentUser.avatar} alt="profile" />
        ) : (
          <li className="hover:text-yellow-300">Sign in</li>
        )}
      </Link>
    </ul>
  </div>
</header>
  );
}
