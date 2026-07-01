import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/ProfileCard";
import DashboardCard from "../components/DashboardCard";
import RecentActivity from "../components/RecentActivity";
import LeaveUsageCard from "../components/LeaveUsageCard";
import QuickActions from "../components/QuickActions";

import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaCalendarCheck,
  FaUmbrellaBeach,
  FaChartLine
} from "react-icons/fa";

import {
  getCurrentUser,
  getLeaves
} from "../services/storageService";

import "../styles/dashboard.css";

function Dashboard() {

  const currentUser =
    getCurrentUser();

  const leaves =
    getLeaves();

  const employeeLeaves =
    leaves.filter(
      (leave) =>
        leave.employeeName ===
        currentUser?.fullName
    );

  const approved =
    employeeLeaves.filter(
      (leave) =>
        leave.status ===
        "Approved"
    );

  const pending =
    employeeLeaves.filter(
      (leave) =>
        leave.status ===
        "Pending"
    );

  const rejected =
    employeeLeaves.filter(
      (leave) =>
        leave.status ===
        "Rejected"
    );

  const TOTAL_ANNUAL_LEAVES = 24;

  const approvedDays =
    approved.reduce(
      (sum, leave) =>
        sum +
        (leave.totalDays || 0),
      0
    );

  const remainingLeaves =
    TOTAL_ANNUAL_LEAVES -
    approvedDays;

  const leaveUsagePercentage =
    Math.min(
      (
        approvedDays /
        TOTAL_ANNUAL_LEAVES
      ) * 100,
      100
    );

  return (

    <div className="app-layout">

      <Sidebar />

      <main className="dashboard">

        <div className="dashboard-header">

          <div>

            <h1>
              Dashboard
            </h1>

            <p>
              Welcome back,
              {" "}
              {currentUser?.fullName}
            </p>

          </div>

        </div>

        <div className="welcome-banner">

          <div>

            <h2>
              Welcome,
              {" "}
              {currentUser?.fullName}
            </h2>

            <p>
              Manage leave requests,
              approvals and employee
              activities from one place.
            </p>

          </div>

          <div className="banner-badge">

            {currentUser?.department}

          </div>

        </div>

        <ProfileCard
          user={currentUser}
        />

        <div className="dashboard-grid">

          <DashboardCard
            title="Total Requests"
            value={
              employeeLeaves.length
            }
            icon={
              <FaCalendarCheck />
            }
          />

          <DashboardCard
            title="Approved"
            value={
              approved.length
            }
            icon={
              <FaCheckCircle />
            }
          />

          <DashboardCard
            title="Pending"
            value={
              pending.length
            }
            icon={
              <FaClock />
            }
          />

          <DashboardCard
            title="Rejected"
            value={
              rejected.length
            }
            icon={
              <FaTimesCircle />
            }
          />

          <DashboardCard
            title="Available Leaves"
            value={
              remainingLeaves
            }
            icon={
              <FaCalendarCheck />
            }
          />

          <DashboardCard
            title="Used Leaves"
            value={
              approvedDays
            }
            icon={
              <FaUmbrellaBeach />
            }
          />

          <DashboardCard
            title="Usage %"
            value={`${leaveUsagePercentage.toFixed(0)}%`}
            icon={
              <FaChartLine />
            }
          />

        </div>

        <div className="dashboard-widgets">

          <LeaveUsageCard
            used={approvedDays}
            total={24}
          />

          {
            employeeLeaves.length > 0 ? (

              <RecentActivity
                leaves={
                  employeeLeaves
                }
              />

            ) : (

              <div className="empty-state">

                No leave requests found.

              </div>

            )
          }

        </div>

        <QuickActions />

        {
          remainingLeaves <= 5 && (

            <div className="warning-box">

              ⚠ Your leave balance is
              running low. Consider
              planning future leave
              requests carefully.

            </div>

          )
        }

      </main>

    </div>

  );
}

export default Dashboard;