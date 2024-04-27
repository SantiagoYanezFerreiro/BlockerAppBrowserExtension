import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Stats() {
  const blockedData = [
    { name: "App 1", blocked: 4 },
    { name: "App 2", blocked: 9 },
    { name: "Website 1", blocked: 5 },
    { name: "Website 2", blocked: 7 },
  ];

  const BlockedStats = ({ data }) => (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft" }} />
      <Tooltip />
      <Legend />
      <Bar dataKey="blocked" fill="#82ca9d" />
    </BarChart>
  );

  return (
    <div>
      <h1>Stats</h1>
      <h2>Blocked Websites</h2>
      <BlockedStats data={blockedData} />
      <h2>Blocked Applications</h2>
      <h2>Websites Statistics</h2>
      <h2>Application Statistics</h2>
    </div>
  );
}

Stats.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      blocked: PropTypes.number.isRequired,
    })
  ).isRequired,
};
