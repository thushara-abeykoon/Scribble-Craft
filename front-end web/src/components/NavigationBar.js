import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <div className="w-96 flex justify-around">
      <Link to="downloads" className="navBarItem">
        downloads
      </Link>
      <Link to="about" className="navBarItem">
        about
      </Link>
      <Link to="register" className="navBarItem">
        register
      </Link>
      <Link to="login" className="navBarItem">
        login
      </Link>
    </div>
  );
}

export function NavBarUser() {
  return (
    <div>
      <Link to="dashboard" className="navBarItem">
        dashboard
      </Link>
      <Link to="editor" className="navBarItem">
        editor
      </Link>
      <Link to="downloads" className="navBarItem">
        downloads
      </Link>
      <Link to="/" className="navBarItem">
        logout
      </Link>
    </div>
  );
}
