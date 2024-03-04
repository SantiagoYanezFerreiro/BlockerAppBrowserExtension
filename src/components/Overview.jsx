import PropTypes from "prop-types";
import "../Overview.css";
import { IoLockClosedOutline } from "react-icons/io5";

export default function Overview({ sections }) {
  return (
    <div className="overview-container">
      <h1>Active Blocks</h1>
      {sections.map((section, index) => (
        <div key={index} className="section-overview">
          <h3>{section.title}</h3>
          <h3>
            {section.lockMethod === "password" ||
            section.lockMethod === "randomText"
              ? "No breaks"
              : "No Allowance Remaining"}
          </h3>
          <h3>{section.lockMethod}</h3>
          <IoLockClosedOutline />
        </div>
      ))}
    </div>
  );
}

Overview.propTypes = {
  sections: PropTypes.array.isRequired,
};
