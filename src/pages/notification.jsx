import Sidebar from "../components/Sidebar";
import Notification from "../components/Notification";

import {
  getCurrentUser,
  getLeaves
} from "../services/storageService";

function Notifications() {

  const currentUser =
    getCurrentUser();

  const leaves =
    getLeaves();

  const userLeaves =
    leaves.filter(
      leave =>
        leave.employeeName ===
        currentUser.name
    );

  const notifications =
    userLeaves.map(
      leave => {

        let type =
          "success";

        let message =
          "";

        if (
          leave.status ===
          "Approved"
        ) {

          message =
            `${leave.leaveType} leave approved`;

        } else if (
          leave.status ===
          "Rejected"
        ) {

          type = "error";

          message =
            `${leave.leaveType} leave rejected`;

        } else {

          type = "warning";

          message =
            `${leave.leaveType} leave pending approval`;
        }

        return {
          id: leave.id,
          type,
          message
        };
      }
    );

  return (

    <div className="app-layout">

      <Sidebar />

      <div className="notifications-page">

        <h1>
          Notifications
        </h1>

        {
          notifications.length === 0
          ? (
            <p>
              No notifications available.
            </p>
          )
          : (
            notifications
              .reverse()
              .map(
                item => (

                  <Notification
                    key={item.id}
                    message={
                      item.message
                    }
                    type={
                      item.type
                    }
                  />

                )
              )
          )
        }

      </div>

    </div>
  );
}

export default Notifications;