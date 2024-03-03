import PropTypes from "prop-types";
import "../Overview.css";

export default function Overview({ sections }) {
  return (
    <div className="overview-container">
      {sections.map((section, index) => (
        <div key={index} className="section-overview">
          <h3>{section.title}</h3>
          <h3>Time Remaining</h3>
          <h3>Blocked Until</h3>
        </div>
      ))}
    </div>
  );
}

Overview.propTypes = {
  sections: PropTypes.array.isRequired,
};
