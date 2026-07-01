function ProfileCard({ user }) {
  return (
    <div className="profile-card">

      {user?.profileImage ? (
        <img
          src={user.profileImage}
          alt="Profile"
          className="avatar-image"
        />
      ) : (
        <div className="avatar">
          {user?.fullName?.charAt(0)?.toUpperCase()}
        </div>
      )}

      <div className="profile-details">
        <h2>{user?.fullName}</h2>

        <p>{user?.email}</p>

        <div className="profile-meta">
          <span className="department-badge">
            {user?.department}
          </span>

          <span className="role-badge">
            {user?.role}
          </span>
        </div>
      </div>

    </div>
  );
}

export default ProfileCard;