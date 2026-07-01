import Calendar from "react-calendar";
import Sidebar from "../components/Sidebar";

import {
  FaCalendarCheck,
  FaCheckCircle
} from "react-icons/fa";

import {
  getLeaves
} from "../services/storageService";

// import "react-calendar/dist/Calendar.css";
import "../styles/calendar.css";

function CalendarView() {

  const leaves =
    getLeaves();

  const approvedLeaves =
    leaves.filter(
      leave =>
      leave.status ===
      "Approved"
    );

  const approvedDates =
    approvedLeaves.map(
      leave =>
      leave.startDate
    );

  return (

    <div className="app-layout">

      <Sidebar />

      <main className="calendar-page">

        <div className="calendar-header">

          <h1>
            Leave Calendar
          </h1>

          <p>
            Track approved leave schedules across employees
          </p>

        </div>

        <div className="calendar-stats">

          <div className="calendar-stat-card">

            <div className="calendar-icon">

              <FaCalendarCheck />

            </div>

            <div>

              <h4>
                Approved Requests
              </h4>

              <h2>
                {approvedLeaves.length}
              </h2>

            </div>

          </div>

        </div>

        <div className="calendar-layout">

          <div className="calendar-card">

            <h2>
              Leave Schedule
            </h2>

            <Calendar

              tileClassName={
                ({ date }) => {

                  const formatted =
                    date
                    .toISOString()
                    .split("T")[0];

                  return approvedDates.includes(
                    formatted
                  )
                    ? "approved-date"
                    : null;
                }
              }

            />

          </div>

          <div className="upcoming-card">

            <h2>
              Upcoming Approved Leaves
            </h2>

            {
              approvedLeaves.length === 0 ? (

                <div className="empty-box">

                  <p>
                    No approved leaves available.
                  </p>

                </div>

              ) : (

                approvedLeaves
                .slice(-6)
                .reverse()
                .map((leave) => (

                  <div
                    className="leave-item"
                    key={leave.id}
                  >

                    <div>

                      <strong>
                        {leave.employeeName}
                      </strong>

                      <p>
                        {leave.leaveType}
                      </p>

                    </div>

                    <div className="leave-status">

                      <FaCheckCircle />

                      <span>
                        {leave.startDate}
                      </span>

                    </div>

                  </div>

                ))

              )
            }

          </div>

        </div>

      </main>

    </div>

  );
}

export default CalendarView;