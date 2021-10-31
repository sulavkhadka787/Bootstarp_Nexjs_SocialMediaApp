const ProfileMenuTabs = ({ activeItem, handleItemClick }) => {
  return (
    <>
      <div className="d-flex justify-content-around pt-2">
        <div
          className={
            activeItem === "profile"
              ? "profile-menu-links profile-menu-links-selected"
              : "profile-menu-links"
          }
          onClick={() => handleItemClick("profile")}
        >
          <span>Profile</span>
        </div>
        <div
          className={
            activeItem === "followers"
              ? "profile-menu-links profile-menu-links-selected"
              : "profile-menu-links"
          }
          onClick={() => handleItemClick("followers")}
        >
          <span>Followers</span>
        </div>
        <div
          className={
            activeItem === "following"
              ? "profile-menu-links profile-menu-links-selected"
              : "profile-menu-links"
          }
          onClick={() => handleItemClick("following")}
        >
          <span>Following</span>
        </div>
        <div
          className={
            activeItem === "updateProfile"
              ? "profile-menu-links profile-menu-links-selected"
              : "profile-menu-links"
          }
          onClick={() => handleItemClick("updateProfile")}
        >
          <span>Update Profile</span>
        </div>
        <div
          className={
            activeItem === "settings"
              ? "profile-menu-links profile-menu-links-selected"
              : "profile-menu-links"
          }
          onClick={() => handleItemClick("settings")}
        >
          <span>Settings</span>
        </div>
      </div>
      <hr />
    </>
  );
};

export default ProfileMenuTabs;
