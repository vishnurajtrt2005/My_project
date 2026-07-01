export const DEFAULT_BALANCE = {
  casual: 12,
  sick: 8,
  earned: 4,
  wfh: 30
};

export const calculateDays = (
  startDate,
  endDate
) => {

  const start = new Date(
    startDate
  );

  const end = new Date(
    endDate
  );

  const diff = end - start;

  return (
    Math.floor(
      diff /
      (
        1000 *
        60 *
        60 *
        24
      )
    ) + 1
  );
};

export const getEmployeeLeaves =
(
  leaves,
  employeeName
) => {

  return leaves.filter(
    (leave) =>
      leave.employeeName ===
      employeeName
  );
};

export const getApprovedLeaves =
(
  leaves,
  employeeName
) => {

  return leaves.filter(
    (leave) =>
      leave.employeeName ===
      employeeName &&
      leave.status ===
      "Approved"
  );
};

export const calculateBalance =
(
  approvedLeaves
) => {

  const balance = {
    ...DEFAULT_BALANCE
  };

  approvedLeaves.forEach(
    (leave) => {

      const type =
        leave.leaveType
          .toLowerCase();

      if (
        balance[type] !==
        undefined
      ) {

        balance[type] -=
        leave.totalDays;
      }
    }
  );

  return balance;
};