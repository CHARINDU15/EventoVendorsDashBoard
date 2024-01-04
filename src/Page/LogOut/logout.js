import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import supabase from '../../Config/SupaBaseClient.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import './logout.css';

function LogOut() {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleSignOut = () => {
    const isConfirmed = window.confirm("Are you sure you want to sign out?");
    if (isConfirmed) {
      supabase.auth.signOut();
      localStorage.removeItem('loggedInUserId');
      // You can add any additional logic after signing out
      // Remove the item from local storage


      navigate("/"); // Navigate to the login page after signing out
    }
  };

  return (
    <div className="logutcontainer">
      <div className="btnsignout">
        <button className="regsignout" type="button" onClick={handleSignOut}>
          <FontAwesomeIcon icon={faRightFromBracket}/>Sign Out
        </button>
      </div>
    </div>
  );
}

export default LogOut;
