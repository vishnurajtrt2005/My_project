const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";
const LEAVES_KEY = "leaveRequests";

export const getUsers = () => {
  return JSON.parse(
    localStorage.getItem(USERS_KEY)
  ) || [];
};

export const saveUsers = (users) => {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
};

export const addUser = (user) => {
  const users = getUsers();
  users.push(user);
  saveUsers(users);
};

export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find(
    (user) =>
      user.email.toLowerCase() ===
      email.toLowerCase()
  );
};

export const getCurrentUser = () => {

  return JSON.parse(
    localStorage.getItem(
      CURRENT_USER_KEY
    )
  );
};

export const setCurrentUser = (
  user
) => {

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  );
};

export const logoutUser = () => {

  localStorage.removeItem(
    CURRENT_USER_KEY
  );
};

export const isLoggedIn = () => {

  return !!localStorage.getItem(
    CURRENT_USER_KEY
  );
};

export const getLeaves = () => {

  return JSON.parse(
    localStorage.getItem(
      LEAVES_KEY
    )
  ) || [];
};

export const saveLeaves = (
  leaves
) => {

  localStorage.setItem(
    LEAVES_KEY,
    JSON.stringify(leaves)
  );
};