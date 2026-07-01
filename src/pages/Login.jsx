import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUserTie,
  FaEnvelope,
  FaLock,
  FaBuilding,
  FaUserPlus,
  FaSignInAlt
} from "react-icons/fa";

import defaultUsers from "../data/defaultUsers";

import {
  getUsers,
  saveUsers,
  addUser,
  setCurrentUser,
  getCurrentUser
} from "../services/storageService";

import "../styles/login.css";

function Login() {

  const navigate = useNavigate();

  const [isRegister, setIsRegister] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [formData, setFormData] =
    useState({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "",
      role: ""
    });

  useEffect(() => {

    let users = getUsers();

    if (users.length === 0) {

      saveUsers(defaultUsers);
    }

    const currentUser =
      getCurrentUser();

    if (currentUser) {

      navigate(
        currentUser.role === "admin"
          ? "/admin"
          : "/dashboard"
      );
    }

  }, [navigate]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

    setError("");
  };

  const validateRegistration =
    () => {

      if (
        !formData.fullName.trim()
      ) {

        setError(
          "Full Name is required"
        );

        return false;
      }

      if (
        formData.fullName
          .trim()
          .length < 3
      ) {

        setError(
          "Full Name must be at least 3 characters"
        );

        return false;
      }

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (
        !emailPattern.test(
          formData.email
        )
      ) {

        setError(
          "Please enter a valid email address"
        );

        return false;
      }

      if (
        !formData.department.trim()
      ) {

        setError(
          "Department is required"
        );

        return false;
      }

      if (
        !formData.role
      ) {

        setError(
          "Please select a role"
        );

        return false;
      }

      if (
        formData.password.length < 6
      ) {

        setError(
          "Password must be at least 6 characters"
        );

        return false;
      }

      const passwordPattern =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

      if (
        !passwordPattern.test(
          formData.password
        )
      ) {

        setError(
          "Password must contain uppercase, lowercase and number"
        );

        return false;
      }

      if (
        formData.password !==
        formData.confirmPassword
      ) {

        setError(
          "Passwords do not match"
        );

        return false;
      }

      const existingUser =
        getUsers().find(
          (user) =>
            user.email.toLowerCase() ===
            formData.email.toLowerCase()
        );

      if (existingUser) {

        setError(
          "Email already registered"
        );

        return false;
      }

      return true;
    };

  const handleRegister =
    () => {

      setError("");
      setSuccess("");

      if (
        !validateRegistration()
      ) {
        return;
      }

      const newUser = {

        id: Date.now(),

        fullName:
          formData.fullName,

        email:
          formData.email,

        password:
          formData.password,

        department:
          formData.department,

        role:
          formData.role
      };

      addUser(newUser);

      setSuccess(
        "Registration Successful. Please Login."
      );

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        department: "",
        role: ""
      });

      setIsRegister(false);
    };

  const handleLogin =
    () => {

      setError("");

      if (
        !formData.email.trim()
      ) {

        setError(
          "Email is required"
        );

        return;
      }

      if (
        !formData.password.trim()
      ) {

        setError(
          "Password is required"
        );

        return;
      }

      if (
        !formData.role
      ) {

        setError(
          "Please select a role"
        );

        return;
      }

      const user =
        getUsers().find(
          (u) =>
            u.email.toLowerCase() ===
              formData.email.toLowerCase() &&
            u.password ===
              formData.password &&
            u.role ===
              formData.role
        );

      if (!user) {

        setError(
          "Invalid credentials or role"
        );

        return;
      }

      setCurrentUser(user);

      navigate(
        user.role === "admin"
          ? "/admin"
          : "/dashboard"
      );
    };

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="brand">

          <h1>
            ELMS PRO
          </h1>

          <p>
            Employee Leave Management System
          </p>

        </div>

        <h2>

          {isRegister
            ? "Create Account"
            : "Welcome Back"}

        </h2>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {success && (
          <div className="success">
            {success}
          </div>
        )}

        {isRegister && (

          <>
            <div className="input-group">

              <FaUserTie />

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
              />

            </div>

            <div className="input-group">

              <FaBuilding />

              <input
                type="text"
                name="department"
                placeholder="Department"
                value={
                  formData.department
                }
                onChange={
                  handleChange
                }
              />

            </div>

          </>

        )}

        <div className="input-group">

          <FaEnvelope />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
          />

        </div>

        <div className="input-group">

          <FaLock />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
          />

        </div>

        {isRegister && (

          <div className="input-group">

            <FaLock />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={
                formData.confirmPassword
              }
              onChange={
                handleChange
              }
            />

          </div>

        )}

        <select
          className="role-select"
          name="role"
          value={
            formData.role
          }
          onChange={
            handleChange
          }
        >

          <option value="">
            Select Role
          </option>

          <option value="employee">
            Employee
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        <button className="login-btn"
          onClick={
            isRegister
              ? handleRegister
              : handleLogin
          }
        >

          {isRegister ? (
            <>
              <FaUserPlus />
              {" "}
              Register
            </>
          ) : (
            <>
              <FaSignInAlt />
              {" "}
              Login
            </>
          )}

        </button>

        <p
          className="switch-mode"
          onClick={() => {

            setError("");
            setSuccess("");

            setIsRegister(
              !isRegister
            );
          }}
        >

          {isRegister
            ? "Already have an account? Login"
            : "New User? Register"}

        </p>

        <div className="login-footer">

          ELMS Pro © 2026

          <br />

          <span>
            Employee Leave Management System
          </span>

        </div>

      </div>

    </div>
  );
}

export default Login;