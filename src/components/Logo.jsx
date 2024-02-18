import { Link } from "react-router-dom";
import { TbLockSquareRounded } from "react-icons/tb";
import "../Logo.css";

export default function Logo() {
  return (
    <Link to="/">
      <TbLockSquareRounded alt="Website Blocker Logo" className="logo" />
    </Link>
  );
}
