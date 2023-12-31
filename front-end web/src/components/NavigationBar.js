import React from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  return (
    <div className="w-1/2 flex justify-end">
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
    <div className="w-1/2 flex justify-end">
      <Link to="dashboard" className="navBarItem">
        dashboard
      </Link>
      <Link to="downloads" className="navBarItem">
        downloads
      </Link>
      <Link to="account" className="navBarItem">
        account
      </Link>
      <Link to="/" className="navBarItem">
        logout
      </Link>
    </div>
  );
}
