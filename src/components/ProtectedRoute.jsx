import {
  Navigate
} from "react-router-dom";

import {
  getCurrentUser
} from "../services/storageService";

function ProtectedRoute({
  children,
  role
}) {

  const currentUser =
    getCurrentUser();

  if (!currentUser) {

    return (
      <Navigate
        to="/"
      />
    );
  }

  if (
    role &&
    currentUser.role !==
      role
  ) {

    return (
      <Navigate
        to="/dashboard"
      />
    );
  }

  return children;
}

export default ProtectedRoute;