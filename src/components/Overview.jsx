import PropTypes from "prop-types";
import "../Overview.css";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { calculateRemainingTime } from "../utils/utils.js";

export default function Overview({ sections }) {
  return (
    <div className="overview-wrapper">
      <div className="overview-container">
        <h1>Active Blocks</h1>
        {sections.map((section, index) => (
          <div key={index} className="section-overview">
            <h3 className="overview-section-title">{section.title}</h3>
            <h3 className="overview-section-lock-message">
              {section.lockMethod === "password" ||
              section.lockMethod === "randomText"
                ? "No Breaks"
                : section.allowanceTime > 0
                ? `${section.allowanceTime} minutes remaining`
                : "No Allowance"}
            </h3>
            <h3 className="overview-section-lock-type">{section.lockMethod}</h3>
            <div className="lock-icon-container">
              <IoLockClosedOutline />
              {section.lockMethod === "timer" && section.locked && (
                <p>{calculateRemainingTime(section.lockValue)}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="blocks-link">
        <Link to="/blocks">Start a new Block</Link>
      </div>
    </div>
  );
}

Overview.propTypes = {
  sections: PropTypes.array.isRequired,
};
