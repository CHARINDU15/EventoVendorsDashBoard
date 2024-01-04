import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import LogOut from '../../Page/LogOut/logout';
import './AdminNavabar.css';

// Import individual icons you are using
import { faDashboard, faHome, faPhone, faRightFromBracket, faUser, faUserFriends } from "@fortawesome/free-solid-svg-icons";

// If you have a specific path for the image, replace the empty string with the correct path
// import imgg1 from "../../Images/headlogo1.png";

function AdminNavabar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    };

    return (
        <span className="headhead">
            <header>
                {/* Use the imported image here */}
                {/* <h3><img src={imgg1} className="imggg1" alt="Logo" /></h3> */}
                <nav ref={navRef}>
                    {/* Add your navigation links here */}
                    <p className="adminlogout"><LogOut /></p>
                    <button
                        className="nav-btn nav-close-btn"
                        onClick={showNavbar}>
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </nav>
                <button
                    className="nav-btn"
                    onClick={showNavbar}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </header>
        </span>
    );
}

export default AdminNavabar;
