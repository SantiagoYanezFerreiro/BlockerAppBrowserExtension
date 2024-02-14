import logoImage from "../img/LogoBlocker.webp";
import "../Logo.css";

export default function Logo() {
  return (
    <a href="/">
      <img src={logoImage} alt="logo" className="logo" />
    </a>
  );
}
