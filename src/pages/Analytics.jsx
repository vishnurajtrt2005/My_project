import Sidebar from "../components/Sidebar";

import {
  getLeaves
} from "../services/storageService";

import {
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaTimesCircle
} from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

import "../styles/analytics.css";

function Analytics() {

  const leaves =
    getLeaves();

  const totalLeaves =
    leaves.length;

  const approved =
    leaves.filter(
      leave =>
      leave.status ===
      "Approved"
    ).length;

  const pending =
    leaves.filter(
      leave =>
      leave.status ===
      "Pending"
    ).length;

  const rejected =
    leaves.filter(
      leave =>
      leave.status ===
      "Rejected"
    ).length;

  const approvalRate =
    totalLeaves > 0
      ? Math.round(
          (approved /
            totalLeaves) *
            100
        )
      : 0;

  const statusData = [

    {
      name:"Approved",
      value:approved
    },

    {
      name:"Pending",
      value:pending
    },

    {
      name:"Rejected",
      value:rejected
    }

  ];

  const leaveTypeCounts = {};

  leaves.forEach(
    leave => {

      const type =
        leave.leaveType;

      leaveTypeCounts[type] =
        (leaveTypeCounts[type] || 0)
        + 1;
    }
  );

  const leaveTypeData =
    Object.keys(
      leaveTypeCounts
    ).map(type => ({

      name:type,

      value:
      leaveTypeCounts[type]

    }));

  const COLORS = [

    "#4f46e5",
    "#10b981",
    "#ef4444",
    "#f59e0b"

  ];

  return (

    <div className="app-layout">

      <Sidebar />

      <main className="analytics-page">

        <div className="page-header">

          <h1>
            Leave Analytics
          </h1>

          <p>
            Workforce leave insights and trends
          </p>

        </div>

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon total">

              <FaFileAlt />

            </div>

            <div>

              <h4>
                Total Requests
              </h4>

              <h2>
                {totalLeaves}
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

        <div className="approval-card">

          <h3>
            Approval Rate
          </h3>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width:
                `${approvalRate}%`
              }}
            ></div>

          </div>

          <h2>
            {approvalRate}%
          </h2>

        </div>

        {
          totalLeaves === 0 ? (

            <div className="empty-state">

              <h2>
                No Analytics Available
              </h2>

              <p>
                Apply leave requests to generate insights.
              </p>

            </div>

          ) : (

            <div className="charts-grid">

              <div className="chart-card">

                <h2>
                  Leave Status Overview
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={350}
                >

                  <BarChart
                    data={
                      statusData
                    }
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                    />

                    <XAxis
                      dataKey="name"
                    />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="value"
                      fill="#4f46e5"
                      radius={[
                        8,
                        8,
                        0,
                        0
                      ]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

              <div className="chart-card">

                <h2>
                  Leave Type Distribution
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={350}
                >

                  <PieChart>

                    <Pie
                      data={
                        leaveTypeData
                      }
                      dataKey="value"
                      nameKey="name"
                      outerRadius={120}
                      label
                    >

                      {
                        leaveTypeData.map(
                          (
                            item,
                            index
                          ) => (

                            <Cell
                              key={index}
                              fill={
                                COLORS[
                                  index %
                                  COLORS.length
                                ]
                              }
                            />

                          )
                        )
                      }

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

          )
        }

      </main>

    </div>

  );
}

export default Analytics;