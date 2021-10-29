const ProfileMenuTabs = () => {
  return (
    <>
      <div className="d-flex justify-content-around pt-2">
        <div className="profile-menu-links">
          <span>Profile</span>
        </div>
        <div className="profile-menu-links">
          <span>Followers</span>
        </div>
        <div className="profile-menu-links">
          <span>Following</span>
        </div>
        <div className="profile-menu-links">
          <span>Update Profile</span>
        </div>
        <div className="profile-menu-links">
          <span>Settings</span>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ProfileMenuTabs;
