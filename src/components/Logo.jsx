import { Link } from "react-router-dom";
import logoImage from "../img/Blocker.png";
import "../Logo.css";

export default function Logo() {
  return (
    <Link to="/">
      <img src={logoImage} alt="Website Blocker Logo" className="logo" />
    </Link>
  );
}
