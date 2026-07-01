import { useState } from "react";
import Sidebar from "../components/Sidebar";
import {getLeaves,saveLeaves} from "../services/storageService";
import {FaUsers,FaCheckCircle,FaClock, FaTimesCircle,FaSearch} from "react-icons/fa";
import "../styles/admin.css";

function AdminPanel() {

  const [search,setSearch] = useState("");

  const [statusFilter,setStatusFilter] = useState("");

  const [leaves,setLeaves] = useState(getLeaves());

  const updateStatus = (id, status) => {

      const updatedLeaves =
        leaves.map((leave) => leave.id === id ? { ...leave, status } : leave );

      saveLeaves(updatedLeaves);

      setLeaves(updatedLeaves);
    };

  let filteredLeaves = [...leaves];

  if (search) {

    filteredLeaves = filteredLeaves.filter(
        (leave) => leave.employeeName ?.toLowerCase()
            .includes( search.toLowerCase() ));
  }

  if (statusFilter) {

    filteredLeaves = filteredLeaves.filter(
       (leave) =>
          leave.status === statusFilter );
  }

  const approved =
    leaves.filter( (leave) =>
        leave.status == "Approved" ).length;

  const pending =
    leaves.filter((leave) => leave.status === "Pending" ).length;

  const rejected = leaves.filter( (leave) =>
        leave.status === "Rejected" ).length;

  return (

    <div className="app-layout">
      <Sidebar />
      <main className="admin-page">

        <div className="page-header">
          <h1>
            HR Admin Panel
          </h1>

          <p>
            Manage employee leave requests
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total">
              <FaUsers />
            </div>

            <div>
              <h4>
                Total Requests
              </h4>

              <h2>
                {leaves.length}
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

        <div className="admin-card">
          <div className="filters">
            <div className="search-box">

              <FaSearch />

              <input type="text" placeholder="Search Employee" value={search}
                onChange={(e) => setSearch( e.target.value )
                } />

            </div>

            <select value={
                statusFilter
              }
              onChange={(e) => setStatusFilter( e.target.value )
              }>

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
            filteredLeaves.length === 0 ? (

              <div className="empty-state">

                No Leave Requests Found

              </div>

            ) : (

              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>

                      <th>
                        Employee
                      </th>

                      <th>
                        Department
                      </th>

                      <th>
                        Leave Type
                      </th>

                      <th>
                        Days
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredLeaves.map(
                        (leave) => (

                          <tr
                            key={
                              leave.id
                            }
                          >

                            <td>
                              {
                                leave.employeeName
                              }
                            </td>

                            <td>
                              {
                                leave.department
                              }
                            </td>

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

                              <span
                                className={`status-badge ${leave.status.toLowerCase()}`}
                              >

                                {
                                  leave.status
                                }

                              </span>

                            </td>

                            <td>

                              {
                                leave.status === "Pending" ? (

                                  <div className="action-buttons">

                                    <button className="approve-btn"
                                      onClick={() => updateStatus( leave.id, "Approved" ) }>
                                      Approve
                                    </button>

                                    <button className="reject-btn"
                                      onClick={() => updateStatus( leave.id, "Rejected" ) }>
                                      Reject
                                    </button>

                                  </div>

                                ) : (

                                  <span>
                                    Completed
                                  </span>

                                )
                              }

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

export default AdminPanel;