import "../Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <div className="logo-small"></div>
        <div className="list-links">
          <ul className="column-link">
            <li className="title-link">Links</li>
            <li className="title-link">
              <a href="/">Contact us</a>
            </li>
            <li className="title-link">
              <a href="/">About Company</a>
            </li>
            <li className="title-link">
              <a href="/">Careers</a>
            </li>
            <li className="title-link">
              <a href="/">News</a>
            </li>
          </ul>
        </div>
        <div className="list-links">
          <ul className="column-link">
            <li className="title-link">Follow</li>
            <li className="title-link">
              <a href="/">Instagram</a>
            </li>
            <li className="title-link">
              <a href="/">Linkedin</a>
            </li>
            <li className="title-link">
              <a href="/">Facebook</a>
            </li>
          </ul>
        </div>
        <div className="list-links">
          <ul className="column-link">
            <li className="title-link">Support</li>
            <li className="title-link">
              <a href="/">Documentation</a>
            </li>
            <li className="title-link">
              <a href="/">Get help</a>
            </li>
            <li className="title-link">
              <a href="/">Service status</a>
            </li>
          </ul>
        </div>
        <div className="list-links">
          <ul className="column-link">
            <li className="title-link">About</li>
            <li className="title-link">
              <a href="/">Terms of service</a>
            </li>
            <li className="title-link">
              <a href="/">Privacy Policy</a>
            </li>
            <li className="title-link">
              <a href="/">Security</a>
            </li>
            <li className="title-link">
              <a href="/">Sitemap</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        &copy; {1900 + new Date().getYear()} Company Inc. All rights reserverd
      </div>
    </div>
  );
}

export default Footer;
