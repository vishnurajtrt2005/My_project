import { Link } from "react-router-dom";

import {
  FaFileAlt,
  FaHistory,
  FaCalendarAlt,
  FaChartPie
} from "react-icons/fa";

function QuickActions() {

  return (

    <div className="quick-actions">

      <h3>
        Quick Actions
      </h3>

      <div className="action-grid">

        <Link
          to="/apply-leave"
          className="action-btn"
        >
          <FaFileAlt />
          Apply Leave
        </Link>

        <Link
          to="/leave-history"
          className="action-btn"
        >
          <FaHistory />
          History
        </Link>

        <Link
          to="/calendar"
          className="action-btn"
        >
          <FaCalendarAlt />
          Calendar
        </Link>

        <Link
          to="/analytics"
          className="action-btn"
        >
          <FaChartPie />
          Analytics
        </Link>

      </div>

    </div>
  );
}

export default QuickActions;