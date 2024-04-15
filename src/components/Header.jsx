// /components/Header.jsx
import React from "react";

const Header = () => {
  return (
    <header className="bg-white text-white p-4">
      <div className="flex justify-center space-x-72">
        <a href="/" className="text-black font-bold">Hava Durumu Sorgulama</a>
        <button className="bg-blue-800 text-white rounded">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1.6em"
            width="1.6em"
          >
            <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
