// Import necessary dependencies and components
import supabase from '../../Config/SupaBaseClient';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function SignIn() {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('Vendors')
        .select('*')
        .eq('email', formData.email)
        .eq('NIC', formData.password);

      if (error) throw error;

      if (data.length > 0) {
       
        
        console.log(data[0].Vendor_ID);
        const vendorId = data[0].Vendor_ID; // Retrieve Vendor_ID
        localStorage.setItem('loggedInUserId', vendorId); // Save Vendor_ID in localStorage
  

        //localStorage.setItem('loggedInUserId', userId);

        console.log('Sign-in successful:', data);
        
        navigate('/admindb');
      } else {
        console.log('Invalid credentials');
      }
    } 
    catch (error) {
      alert(error.message);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="sign-in-background">
    <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
      <h2 className="title">Sign in</h2>
      <div className="input-field">
        <i className="fas fa-user">
          <FontAwesomeIcon icon={faEnvelope} />
        </i>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock">
          <FontAwesomeIcon icon={faLock} />
        </i>
        <input
          onChange={handleChange}
          name="password"
          placeholder="Enter password"
          autoComplete="off"
          maxLength="100"
          minLength="8"
          type={showPassword ? 'text' : 'password'}
          required
        />
      </div>
      <i className="showps2" onClick={togglePasswordVisibility}>
        
      </i>
      <button type="submit" className="btn">
        Sign In
      </button>
    </form>
    </div>
  );
}

export default SignIn;
