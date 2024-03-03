import PropTypes from "prop-types";

export default function Overview({ sections }) {
  return (
    <div className="overview-container">
      {sections.map((section, index) => (
        <div key={index} className="section-overview">
          <h3>{section.title}</h3>
        </div>
      ))}
    </div>
  );
}

Overview.propTypes = {
  sections: PropTypes.array.isRequired,
};
