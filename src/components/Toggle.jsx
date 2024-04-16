import PropTypes from "prop-types";
import "../Toggle.css";

export default function Toggle({ isEnabled, onToggle, label }) {
  return (
    <div className="toggle-container">
      <label className="toggle-switch">
        {label && (
          <span className="toggle-label">{isEnabled ? "On" : "Off"}</span>
        )}
        <input type="checkbox" checked={isEnabled} onChange={onToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

Toggle.propTypes = {
  isEnabled: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  label: PropTypes.string,
};
