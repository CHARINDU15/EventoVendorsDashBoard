import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faDashboard, faPeopleRoof, faSearch, faWallet } from '@fortawesome/free-solid-svg-icons';
import './Payment.css';
import supabase from '../../Config/SupaBaseClient';
import AdminNavabar from '../../Components/AdminNavabar/AdminNavabar';

const Payments = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  let loggedInUserId = localStorage.getItem('loggedInUserId');
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

 

useEffect(() => {
  // Function to fetch data from Supabase function
  const fetchVendorData = async (myID) => {
    try {
      // Call your Supabase function
      console.log("MyID", loggedInUserId);
     
        let { data:responseData, error } = await supabase
  .rpc('get_vendor_pack_booking', {
    vendor_id_param : myID
  })
      if (error) {
        throw error;
      }
      console.log(responseData);
      setData(responseData);
       // Set the retrieved data to state
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  fetchVendorData(loggedInUserId);
  fetchPaymentHistory(); // Call the function when component mounts
}, []);
  const fetchPaymentHistory = async () => {
    try {
      const { data } = await supabase.from('PaymentHistory').select('*');
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching payment history:', error);
    }
  };

  return (
    <div>
      <AdminNavabar />

      <div className="Dashboard">
        <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
          <div className="logo-details">
            <i className="bx bxl-c-plus-plus"></i>
            <span className="logo_name">EVENTO</span>
          </div>
          <ul className="nav-links">
            <li>
              <a href="/admindb" className="active">
                <i className="bx bx-grid-alt">
                  <FontAwesomeIcon icon={faDashboard} />
                </i>
                <span className="links_name">Dashboard</span>
              </a>
            </li>

            <li>
              <a href="/Createpkg">
                <i className="bx bx-user">
                  <FontAwesomeIcon icon={faPeopleRoof} />
                </i>
                <span className="links_name">Create Packages</span>
              </a>
            </li>

            <li>
              <a href="/createpkg">
                <i className="bx bx-user">
                  <FontAwesomeIcon icon={faWallet} />
                </i>
                <span className="links_name">Create Package</span>
              </a>
            </li>

            <li>
              <a href="/payment">
                <i className="bx bx-user">
                  <FontAwesomeIcon icon={faPeopleRoof} />
                </i>
                <span className="links_name">Booking Log</span>
              </a>
            </li>

            <li>
              <a href="/updateuser">
                <i className="bx bx-user">
                  <FontAwesomeIcon icon={faPeopleRoof} />
                </i>
                <span className="links_name">Update Profile</span>
              </a>
            </li>

            <li className="log_out">
              <a href="/logout">
                <i className="bx bx-log-out">
                  <FontAwesomeIcon icon={faBars} />
                </i>
                <span className="links_name">Log out</span>
              </a>
            </li>
          </ul>
        </div>
        <section className="home-section">
          <nav>
            <div className="sidebar-button" onClick={toggleSidebar}>
              <i
                className={`bx ${
                  sidebarActive ? 'bx-menu-alt-right' : 'bx-menu'
                } sidebarBtn`}
              >
                <FontAwesomeIcon icon={faBars} />
              </i>
              <span className="dashboard">Dashboard</span>
            </div>
           
           
          </nav>

          <div className="home-content">
            <div className="overview-boxes">
              <h2>Booking Log</h2>
              <table>
                <thead>
                  <tr>
                    <th>Package Name</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Customer Name</th>
                    <th>Contact No</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.service_pack_name}</td>
                      <td>{payment.ServicePackagePrice}</td>
                      <td>{payment.BookingDate}</td>
                      <td>{payment.Name}</td>
                      <td>{payment.ContactNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Payments;
