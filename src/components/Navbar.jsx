import { Link } from "react-router-dom";
import "../Navbar.css";
export default function Navbar() {
  return (
    <nav>
      <Link to="/">Overview</Link>
      <Link to="/blocks">Blocks</Link>
      <Link to="/stats">Stats</Link>
      <Link to="/settings">Settings</Link>
    </nav>
  );
}
