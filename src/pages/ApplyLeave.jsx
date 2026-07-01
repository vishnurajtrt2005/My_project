import { useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  getCurrentUser,
  getLeaves,
  saveLeaves
} from "../services/storageService";

import {
  calculateDays
} from "../utils/leaveUtils";

import "../styles/form.css";

function ApplyLeave() {

  const currentUser =
    getCurrentUser();

  const [leaveType,
    setLeaveType] =
    useState("");

  const [startDate,
    setStartDate] =
    useState("");

  const [endDate,
    setEndDate] =
    useState("");

  const [reason,
    setReason] =
    useState("");

  const [error,
    setError] =
    useState("");

  const [success,
    setSuccess] =
    useState("");

  const totalDays =
    startDate &&
    endDate
      ? calculateDays(
          startDate,
          endDate
        )
      : 0;

  const handleSubmit =
    (e) => {

      e.preventDefault();

      setError("");
      setSuccess("");

      if (
        !leaveType ||
        !startDate ||
        !endDate ||
        !reason.trim()
      ) {

        setError(
          "Please fill all fields"
        );

        return;
      }

      if (
        new Date(endDate) <
        new Date(startDate)
      ) {

        setError(
          "End date cannot be before start date"
        );

        return;
      }

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      if (
        startDate < today
      ) {

        setError(
          "Cannot apply leave for past dates"
        );

        return;
      }

      const newLeave = {

        id: Date.now(),

        employeeId:
          currentUser.id,

        employeeName:
          currentUser.fullName,

        employeeEmail:
          currentUser.email,

        department:
          currentUser.department,

        leaveType,

        startDate,

        endDate,

        totalDays,

        reason,

        status: "Pending",

        createdAt:
          new Date()
          .toLocaleDateString()
      };

      const leaves =
        getLeaves();

      saveLeaves([
        ...leaves,
        newLeave
      ]);

      setSuccess(
        "Leave request submitted successfully."
      );

      setLeaveType("");
      setStartDate("");
      setEndDate("");
      setReason("");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    };

  return (

    <div className="app-layout">

      <Sidebar />

      <main className="form-page">

        <div className="page-header">

          <h1>
            Apply Leave
          </h1>

          <p>
            Submit and manage leave requests
          </p>

        </div>

        <div className="employee-info">

          <div>
            <h3>
              {currentUser?.fullName}
            </h3>

            <p>
              {currentUser?.email}
            </p>
          </div>

          <div className="department-badge">
            {currentUser?.department}
          </div>

        </div>

        <form
          className="leave-form"
          onSubmit={
            handleSubmit
          }
        >

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          {success && (
            <div className="success-box">
              {success}
            </div>
          )}

          <div className="form-group">

            <label>
              Leave Type
            </label>

            <select
              value={leaveType}
              onChange={(e) =>
                setLeaveType(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Leave Type
              </option>

              <option value="Casual">
                Casual Leave
              </option>

              <option value="Sick">
                Sick Leave
              </option>

              <option value="Earned">
                Earned Leave
              </option>

              <option value="WFH">
                Work From Home
              </option>

            </select>

          </div>

          <div className="date-grid">

            <div className="form-group">

              <label>
                Start Date
              </label>

              <input
                type="date"
                value={
                  startDate
                }
                onChange={(e) =>
                  setStartDate(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>
                End Date
              </label>

              <input
                type="date"
                value={
                  endDate
                }
                onChange={(e) =>
                  setEndDate(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          <div className="form-group">

            <label>
              Reason
            </label>

            <textarea
              rows="5"
              placeholder="Enter reason for leave..."
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }
            />

          </div>

          <div className="leave-preview">

            <h3>
              Leave Summary
            </h3>

            <p>
              Total Days :
              {" "}
              <strong>
                {totalDays}
              </strong>
            </p>

          </div>

          <button
            className="submit-btn"
            type="submit"
          >
            Submit Request
          </button>

        </form>

      </main>

    </div>
  );
}

export default ApplyLeave;