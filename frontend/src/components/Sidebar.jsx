import "./sidebar.css";
import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
    const [visible, setVisible] = useState(false)

    const toggle = () => {
        setVisible(!visible)
    }

    return (
        <nav className="sidebar" style={{height: 0}}>
            <FontAwesomeIcon icon={faBars} className="hamburger-menu" onClick={toggle} />
            <ul className={`menu ${visible ? "menuOpen" : "menuClose"}`}>
                <li><a href="https://www.youtube.com">aaaaaaa</a></li>
                <li>a</li>
                <li>a</li>
            </ul>
        </nav>
    )
}

export default Sidebar;
