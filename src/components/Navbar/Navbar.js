import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaCoins } from "react-icons/fa";
import URL from "../../config/URLconfig";
import axios from "axios";

export default function Navbar() {
  useEffect(() => {
    axios
      .get(`${URL}/api/auth/user`, { withCredentials: true })
      .then((response) => {
        console.log(response.data.data);
        const { email, name, picture } = response.data.data;
        localStorage.setItem("email", email);
        localStorage.setItem("username", name);
        localStorage.setItem("img", picture);
        console.log(localStorage.getItem("img"));
      })
      .catch(() => {});
  }, []);

  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const searchResults = [
    "Khoá học Java backend cho người mới",
    "Khoá học JavaScript cho người mới",
    "Làm chủ Axios trong React",
  ];

  const handleSelect = (value) => {
    setInputValue(value); // Cập nhật giá trị input
    setIsFocused(false); // Ẩn form kết quả
  };

  const handleGoogleLogout = async () => {
    try {
      await axios.get(`${URL}/api/auth/logout/google`, {
        withCredentials: true,
      }); // Gửi yêu cầu logout Google
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("img");
      localStorage.removeItem("email");
      localStorage.removeItem("img");
      window.location.href = "/"; // Chuyển về trang login hoặc home
    } catch (error) {
      console.error("Google Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-30 h-fit">
      <div className="max-w-screen mx-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center">
            <img className="h-16" src="/image2.jpg" alt="Logo" />
          </Link>
          <h3 className="text-xl font-semibold text-gray-800">Code Arena</h3>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-md">
      {/* Search Input */}
      <input
        type="text"
        value={inputValue}
        placeholder="Search courses..."
        className="w-full border rounded-full pl-10 pr-4 py-2 text-sm border-gray-500 focus:outline-none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Tránh mất focus ngay khi click vào danh sách
        onChange={(e) => setInputValue(e.target.value)}
      />
      <FaSearch className="absolute left-3 top-2.5 text-gray-500" />

      {/* Results - Hiện khi isFocused = true */}
      {isFocused && (
        <div
          className="absolute left-0 w-full mt-2 bg-white border rounded-lg shadow-lg z-10"
          onMouseDown={(e) => e.preventDefault()} // Giữ form khi click vào danh sách
        >
          <ul className="max-h-48 overflow-y-auto">
            {searchResults.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 text-gray-700 hover:bg-cyan-100 cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

        {/* User or Login */}
        <div className="flex items-center space-x-4">
          {localStorage.getItem("username") ? (
            <>
              <img
                src={
                  localStorage.getItem("token")
                    ? localStorage.getItem("img")
                    : "http://pngimg.com/uploads/google/google_PNG19635.png"
                }
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-gray-600">
                {localStorage.getItem("username")}
              </span>
              <button
                onClick={() => {
                  handleGoogleLogout();
                }}
                className="text-cyan-500 hover:text-cyan-700 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300">
              <Link to="/login" className="no-underline text-white">
                Start Learning
              </Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
