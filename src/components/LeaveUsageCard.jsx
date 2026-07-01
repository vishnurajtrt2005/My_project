function LeaveUsageCard({
  used,
  total
}) {

  const percentage =
    Math.min(
      Math.round(
        (used / total) * 100
      ),
      100
    );

  return (
    <div className="usage-card">

      <h3>
        Annual Leave Usage
      </h3>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width:
              `${percentage}%`
          }}
        />
      </div>

      <div className="usage-details">
        <span>
          Used: {used}
        </span>

        <span>
          Remaining:
          {total - used}
        </span>
      </div>

      <h2>
        {percentage}%
      </h2>

    </div>
  );
}

export default LeaveUsageCard;