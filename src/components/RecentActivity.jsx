function RecentActivity({
  leaves
}) {

  const recentLeaves =
    [...leaves]
      .reverse()
      .slice(0, 5);

  const getStatusClass =
    (status) => {

      if (
        status === "Approved"
      ) {
        return "status-approved";
      }

      if (
        status === "Rejected"
      ) {
        return "status-rejected";
      }

      return "status-pending";
    };

  return (

    <div className="activity-card">

      <h3>
        Recent Activity
      </h3>

      {
        recentLeaves.length === 0 ? (

          <p>
            No leave requests yet.
          </p>

        ) : (

          <ul>

            {
              recentLeaves.map(
                (leave) => (

                  <li
                    key={leave.id}
                  >

                    <div>

                      <strong>
                        {
                          leave.leaveType
                        }
                      </strong>

                    </div>

                    <span
                      className={
                        getStatusClass(
                          leave.status
                        )
                      }
                    >

                      {
                        leave.status
                      }

                    </span>

                  </li>
                )
              )
            }

          </ul>
        )
      }

    </div>
  );
}

export default RecentActivity;