import "./WarningDialog.css";

const WarningDialog = ({ isVisible, message, hideWarning }) => {
  return (
    <div className={`warning-dialog ${isVisible ? "visible" : "hidden"}`}>
      <div className="content">
        <p>{message}</p>
        <button onClick={hideWarning}>Close</button>
      </div>
    </div>
  );
};

export default WarningDialog;
