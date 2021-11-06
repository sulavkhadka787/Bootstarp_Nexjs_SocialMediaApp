const Toggle = ({
  popupSettings,
  toggleMessagePopup,
  setPopupSetting,
  setSuccess,
}) => {
  return (
    <>
      <label className="switch">
        <input
          type="checkbox"
          onChange={() => {
            console.log("toggle=>", popupSettings);
            toggleMessagePopup(popupSettings, setPopupSetting, setSuccess);
          }}
          checked={popupSettings}
        />
        <span className="slider"></span>
      </label>
    </>
  );
};

export default Toggle;
