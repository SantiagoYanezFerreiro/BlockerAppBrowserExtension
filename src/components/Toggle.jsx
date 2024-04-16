import PropTypes from "prop-types";
import "./Toggle.css";

export default function Toggle({ isEnabled, onToggle, label }) {
  return (
    <div className="toggle-container">
      {label && <span className="toggle-label">{label}:</span>}
      <label className="toggle-switch">
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
