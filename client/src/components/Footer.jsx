import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import LogoFooter from "../assets/Propify_transparent.png";

export default function Footer() {
  return (
        <footer className="bg-gray-800 border-y">
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 flex flex-col items-center justify-center">
            <div className="mb-6">
              <Link to="/" className="flex items-center">
                <img src={LogoFooter} className="h-24" alt="Logo" />
              </Link>
            </div>
            <div className="md:flex md:justify-between w-full">
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 ">
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                    Resources
                  </h2>
                  <ul className="text-gray-100 font-medium">
                    <li className="mb-4">
                      <Link to="/" className="hover:underline">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/about" className="hover:underline">
                        About
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                    Follow us
                  </h2>
                  <ul className="text-gray-100 font-medium">
                    <li className="mb-4">
                      <a
                        href="https://github.com/sparsh1119"
                        className="hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Github
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://linkedin.com/in/sparsh1119"
                        className="hover:underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Linkedin
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase">
                    Legal
                  </h2>
                  <ul className="text-gray-100 font-medium">
                    <li className="mb-4">
                      <Link to="#" className="hover:underline">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to="#" className="hover:underline">
                        Terms &amp; Conditions
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between w-full">
              <span className="text-sm text-gray-300 sm:text-center">
                Copyrights © 2024 | All Rights Reserved.
              </span>
    
              <div className="flex gap-3 text-lg text-white">
                <FaLinkedin />
                <FaGoogle />
                <FaTwitter />
                <FaYoutube />
              </div>
            </div>
    
            <div className="text-center text-gray-200">
              Made with ❤️
              <a
                href="https://linkedin.com/in/sparsh1119/"
                className="text-blue-500 hover:underline"
              >
                &nbsp; sparshjaiswal &nbsp;
              </a>
            </div>
          </div>
        </footer>
 
    
  );
}
