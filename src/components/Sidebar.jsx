import { Link,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import {
  FaHome,
  FaFileAlt,
  FaHistory,
  FaChartPie,
  FaCalendarAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import {
  getCurrentUser,
  logoutUser
} from "../services/storageService";

import {
  FaBell
} from "react-icons/fa";

import "../styles/sidebar.css";

function Sidebar(){

  const navigate=useNavigate();

  const [currentUser,setCurrentUser]=
    useState(getCurrentUser());

  useEffect(()=>{

    const refreshUser=()=>{

      setCurrentUser(
        getCurrentUser()
      );

    };

    window.addEventListener(
      "userUpdated",
      refreshUser
    );

    return()=>{

      window.removeEventListener(
        "userUpdated",
        refreshUser
      );

    };

  },[]);

  const handleLogout=()=>{

    logoutUser();

    navigate("/");

  };

  return(

    <div className="sidebar">

      <div>

        <div className="sidebar-header">

          <h2>ELMS Pro</h2>

          <div className="sidebar-profile">

            {currentUser?.profileImage ? (

              <img
                src={currentUser.profileImage}
                alt="Profile"
                className="sidebar-profile-img"
              />

            ) : (

              <div className="sidebar-profile-avatar">

                {currentUser?.fullName
                  ?.charAt(0)
                  ?.toUpperCase()}

              </div>

            )}

          </div>

        </div>

        <nav>

          {/* <Link to="/notifications">
          <FaBell />Notifications
          </Link> */}

          <Link to="/dashboard">
            <FaHome />
            Dashboard
          </Link>

          <Link to="/apply-leave">
            <FaFileAlt />
            Apply Leave
          </Link>

          <Link to="/leave-history">
            <FaHistory />
            History
          </Link>

          <Link to="/analytics">
            <FaChartPie />
            Analytics
          </Link>

          <Link to="/calendar">
            <FaCalendarAlt />
            Calendar
          </Link>

          <Link to="/settings">
            <FaCog />
            Settings
          </Link>

          {currentUser?.role==="admin" && (

            <Link to="/admin">
              <FaUsers />
              Admin
            </Link>

          )}

        </nav>

      </div>

      <div className="sidebar-footer">

        <div className="user-info">

          <h4>
            {currentUser?.fullName}
          </h4>

          <p>
            {currentUser?.department}
          </p>

        </div>

        <button
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </div>

  );
}

export default Sidebar;