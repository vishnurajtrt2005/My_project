import { useState } from "react";
import Sidebar from "../components/Sidebar";

import {
  getCurrentUser,
  setCurrentUser,
  getUsers,
  saveUsers
} from "../services/storageService";

import {
  FaCamera,
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaLock,
  FaSave
} from "react-icons/fa";

import "../styles/settings.css";

function Settings() {

  const currentUser =
    getCurrentUser();

  const [fullName,setFullName] =
    useState(
      currentUser.fullName || ""
    );

  const [email,setEmail] =
    useState(
      currentUser.email || ""
    );

  const [department,setDepartment] =
    useState(
      currentUser.department || ""
    );

  const [password,setPassword] =
    useState("");

  const [confirmPassword,setConfirmPassword] =
    useState("");

  const [profileImage,setProfileImage] =
    useState(
      currentUser.profileImage || ""
    );

  const [message,setMessage] =
    useState("");

  const handleImageUpload = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {

      setProfileImage(
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {

    if (
      password &&
      password !==
      confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return;
    }

    const users =
      getUsers();

    const updatedUsers =
      users.map(user =>

        user.id ===
        currentUser.id

          ? {
              ...user,
              fullName,
              email,
              department,
              profileImage,
              ...(password && {
                password
              })
            }

          : user
      );

    saveUsers(
      updatedUsers
    );

    const updatedCurrentUser = {

      ...currentUser,

      fullName,

      email,

      department,

      profileImage,

      ...(password && {
        password
      })
    };

   setCurrentUser(
  updatedCurrentUser
);

window.dispatchEvent(
  new Event("userUpdated")
);

    setMessage(
  "Profile Updated Successfully"
);

setTimeout(()=>{

  window.location.reload();

},500);
  };

  return (

    <div className="app-layout">

      <Sidebar />

      <div className="settings-page">

        <div className="settings-header">

          <div className="profile-section">

            <div className="profile-image">

              {profileImage ? (

                <img
                  src={profileImage}
                  alt="profile"
                />

              ) : (

                <span>
                  {fullName
                    ?.charAt(0)
                    ?.toUpperCase()}
                </span>

              )}

              <label>

                <FaCamera />

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageUpload
                  }
                  hidden
                />

              </label>

            </div>

            <div>

              <h1>
                {fullName}
              </h1>

              <p>
                {department}
              </p>

              <span className="role-badge">
                {currentUser.role}
              </span>

            </div>

          </div>

        </div>

        <div className="settings-grid">

          <div className="settings-card">

            <h2>
              Account Information
            </h2>

            <div className="input-group">

              <FaUser />

              <input
                type="text"
                value={fullName}
                onChange={(e)=>
                  setFullName(
                    e.target.value
                  )
                }
                placeholder="Full Name"
              />

            </div>

            <div className="input-group">

              <FaEnvelope />

              <input
                type="email"
                value={email}
                onChange={(e)=>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="Email"
              />

            </div>

            <div className="input-group">

              <FaBuilding />

              <input
                type="text"
                value={department}
                onChange={(e)=>
                  setDepartment(
                    e.target.value
                  )
                }
                placeholder="Department"
              />

            </div>

          </div>

          <div className="settings-card">

            <h2>
              Security
            </h2>

            <div className="input-group">

              <FaLock />

              <input
                type="password"
                value={password}
                onChange={(e)=>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="New Password"
              />

            </div>

            <div className="input-group">

              <FaLock />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e)=>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                placeholder="Confirm Password"
              />

            </div>

          </div>

        </div>

        {message && (

          <div className="success-box">

            {message}

          </div>

        )}

        <button
          className="save-btn"
          onClick={handleSave}
        >

          <FaSave />

          Save Changes

        </button>

      </div>

    </div>
  );
}

export default Settings;