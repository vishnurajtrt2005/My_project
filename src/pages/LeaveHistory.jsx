import { useState } from "react";

import Sidebar from "../components/Sidebar";
import StatusBadge from "../components/StatusBadge";

import {
  getCurrentUser,
  getLeaves
} from "../services/storageService";

import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSearch
} from "react-icons/fa";

import "../styles/history.css";

function LeaveHistory() {

  const currentUser =
    getCurrentUser();

  const [search,
    setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("");

  const leaves =
    getLeaves();

  let employeeLeaves =
    leaves.filter(
      (leave) =>
        leave.employeeName ===
        currentUser?.fullName
    );

  if (search) {

    employeeLeaves =
      employeeLeaves.filter(
        (leave) =>
          leave.leaveType
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
  }

  if (statusFilter) {

    employeeLeaves =
      employeeLeaves.filter(
        (leave) =>
          leave.status ===
          statusFilter
      );
  }

  const approved =
    employeeLeaves.filter(
      (leave) =>
        leave.status ===
        "Approved"
    ).length;

  const pending =
    employeeLeaves.filter(
      (leave) =>
        leave.status ===
        "Pending"
    ).length;

  const rejected =
    employeeLeaves.filter(
      (leave) =>
        leave.status ===
        "Rejected"
    ).length;

  return (

    <div className="app-layout">

      <Sidebar />

      <main className="history-page">

        <div className="page-header">

          <div>

            <h1>
              Leave History
            </h1>

            <p>
              View and track all your leave requests
            </p>

          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon total">

              <FaCalendarAlt />

            </div>

            <div>

              <h4>
                Total Requests
              </h4>

              <h2>
                {employeeLeaves.length}
              </h2>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon approved">

              <FaCheckCircle />

            </div>

            <div>

              <h4>
                Approved
              </h4>

              <h2>
                {approved}
              </h2>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon pending">

              <FaClock />

            </div>

            <div>

              <h4>
                Pending
              </h4>

              <h2>
                {pending}
              </h2>

            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon rejected">

              <FaTimesCircle />

            </div>

            <div>

              <h4>
                Rejected
              </h4>

              <h2>
                {rejected}
              </h2>

            </div>

          </div>

        </div>

        <div className="history-card">

          <div className="filters">

            <div className="search-box">

              <FaSearch />

              <input
                type="text"
                placeholder="Search Leave Type"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

            <select
              value={
                statusFilter
              }
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >

              <option value="">
                All Status
              </option>

              <option value="Pending">
                Pending
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

          </div>

          {
            employeeLeaves.length === 0 ? (

              <div className="empty-state">

                <h3>
                  No Leave Records Found
                </h3>

                <p>
                  Apply for a leave request to see records here.
                </p>

              </div>

            ) : (

              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>

                      <th>
                        Leave Type
                      </th>

                      <th>
                        Days
                      </th>

                      <th>
                        Start Date
                      </th>

                      <th>
                        End Date
                      </th>

                      <th>
                        Applied On
                      </th>

                      <th>
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      employeeLeaves.map(
                        (leave) => (

                          <tr
                            key={
                              leave.id
                            }
                          >

                            <td>
                              {
                                leave.leaveType
                              }
                            </td>

                            <td>
                              {
                                leave.totalDays
                              }
                            </td>

                            <td>
                              {
                                leave.startDate
                              }
                            </td>

                            <td>
                              {
                                leave.endDate
                              }
                            </td>

                            <td>
                              {
                                leave.createdAt
                              }
                            </td>

                            <td>

                              <StatusBadge
                                status={
                                  leave.status
                                }
                              />

                            </td>

                          </tr>

                        )
                      )
                    }

                  </tbody>

                </table>

              </div>

            )
          }

        </div>

      </main>

    </div>

  );
}

export default LeaveHistory;