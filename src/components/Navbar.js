import "../Navbar.css";
import { useState } from "react";

function Navbar() {
  // for small size show burger menu
  const [active, setActive] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <div></div>
        <div>COMPANY</div>
      </div>
      <div
        onClick={() => setActive((prev) => !prev)}
        className={`barcontainer ${active && "active "}  `}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div className={`links ${active && "active "}`}>
        <ul>
          <li>
            <a href="/">Home </a>
          </li>
          <li>
            <a href="/">Overview</a>
          </li>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/">Sign out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
