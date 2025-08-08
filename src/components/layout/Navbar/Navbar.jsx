import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"

function Navbar() {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbar}`}>
      <div className="container-fluid">
        <Link to={"/"} className={`${styles.navbarLink} ${styles.logo}`}>Units Forge</Link>
        <Link to={"/units-info"} className={`${styles.navbarLink} ${styles.noLogo}`}>All Units Info</Link>
      </div>
    </nav>
  )
}

export default  Navbar;