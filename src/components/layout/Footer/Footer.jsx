import styles from "./Footer.module.css"

function Footer() {
  return (
    <footer className={`text-light py-4 mt-5 ${styles.footer}`} >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="mb-3 mb-md-0">
          <span>&copy; {new Date().getFullYear()} Units Forge. All rights reserved.</span>
        </div>
        <ul className={`list-unstyled d-flex gap-3 mb-0 ${styles.footerLink}`}>
          <li>
            <a
              href="https://github.com/malaquiazmarcos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              GitHub
            </a>
          </li>
          <li>
            <a 
              href="https://www.linkedin.com/in/marcos-daniel-malaquias-5710a9186" 
              target="_blank"
              className="text-decoration-none"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/malaquiazmarcos/unit-converter-app/issues" 
              target="_blank"
              className="text-decoration-none"
            >
              Report
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}


export default Footer;