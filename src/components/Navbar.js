import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles["navbar-container"]}>
        <h1 className={styles.logo}>منصه Abo Omar التعليميه</h1>

        <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
          <ul className={styles["nav-links"]}>
            <li>
              <Link to="/" onClick={() => setIsOpen(false)}>الرئيسية</Link>
            </li>
            <li>
              <a
                href="https://wa.me/966569129887"
                target="_blank"
                rel="noopener noreferrer"
                className={styles["btn-whatsapp"]}
                onClick={() => setIsOpen(false)}
              >
                اتصل بنا
              </a>
            </li>
          </ul>
        </nav>

        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}

export default Navbar;