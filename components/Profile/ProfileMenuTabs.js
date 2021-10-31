const ProfileMenuTabs = ({
  activeItem,
  handleItemClick,
  followersLength,
  followingLength,
  loggedUserFollowStats,
  ownAccount,
}) => {
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
          <span>{followersLength} Followers</span>
        </div>
        {ownAccount ? (
          <>
            <div
              className={
                activeItem === "following"
                  ? "profile-menu-links profile-menu-links-selected"
                  : "profile-menu-links"
              }
              onClick={() => handleItemClick("following")}
            >
              <span>
                {loggedUserFollowStats.following.length > 0
                  ? loggedUserFollowStats.following.length
                  : 0}
                Following
              </span>
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

            <hr />
          </>
        ) : (
          <>
            <div
              className={
                activeItem === "following"
                  ? "profile-menu-links profile-menu-links-selected"
                  : "profile-menu-links"
              }
              onClick={() => handleItemClick("following")}
            >
              <span>{followingLength} Following</span>
            </div>
            <hr />
          </>
        )}
      </div>
    </>
  );
};

export default ProfileMenuTabs;
