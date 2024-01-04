import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faDashboard,
  faSearch,
  faPeopleRoof,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import supabase from "../../Config/SupaBaseClient";
import AdminNavabar from "../../Components/AdminNavabar/AdminNavabar";

const AdminDB = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    // Retrieve Vendor_ID from localStorage
    const loggedInUserId = localStorage.getItem("loggedInUserId");

   

    if (loggedInUserId){
      console.log("Logged In User ID:", loggedInUserId);


      supabase
        .from("Vendors")
        .select("*")
        .eq("Vendor_ID", loggedInUserId)
        .then(({ data, error }) => {
          if (error) throw error;

          if (data.length > 0) {
            const userData = data[0];
            setUser(userData);
          } else {
            console.log("User not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error.message);
        });
    } else {
      console.log("User ID not found in local storage");
      // Handle the case where user ID is not present in local storage
    }
  }

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div>
      <AdminNavabar />

      <div className="Dashboard">
        <div className={`sidebar ${sidebarActive ? "active" : ""}`}>
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
              <a href="/managepkg">
                <i class="bx bx-user">
                  <FontAwesomeIcon icon={faPeopleRoof} />
                </i>
                <span class="links_name">Manage Packages</span>
              </a>
            </li>

            <li>
              <a href="/createpkg">
                <i class="bx bx-user">
                  <FontAwesomeIcon icon={faWallet} />
                </i>
                <span class="links_name">Create Package</span>
              </a>
            </li>

            <li>
              <a href="/payment">
                <i class="bx bx-user">
                  <FontAwesomeIcon icon={faPeopleRoof} />
                </i>
                <span class="links_name">Booking Log</span>
              </a>
            </li>

            <li>
              <a href="/updateuser">
                <i class="bx bx-user">
                  <FontAwesomeIcon icon={faPeopleRoof} />
                </i>
                <span class="links_name">Update Profile</span>
              </a>
            </li>

            <li class="log_out">
              <a href="">
                <i class="bx bx-log-out">
                  <FontAwesomeIcon icon={faBars} />
                </i>
                <span class="links_name">Log out</span>
              </a>
            </li>
          </ul>
        </div>

        <section className="home-section">
          <nav>
            <div className="sidebar-button" onClick={toggleSidebar}>
              <i
                className={`bx ${
                  sidebarActive ? "bx-menu-alt-right" : "bx-menu"
                } sidebarBtn`}
              >
                <FontAwesomeIcon icon={faBars} />
              </i>
              <span className="dashboard">Dashboard</span>
            </div>
          </nav>

          <div className="home-content">
            <div className="overview-boxes">
              <div class="box">
                <div class="right-side">
                  <div class="box-topic">Manage </div>
                  <div class="number">Packages</div>
                  <div class="indicator">
                    <i class="bx bx-up-arrow-alt"></i>
                    <a href="/managepkg">
                      <span class="text">Go to Page</span>
                    </a>
                  </div>
                </div>
                <i class="bx bx-cart-alt cart"></i>
              </div>
              <div class="box">
                <div class="right-side">
                  <div class="box-topic">Create</div>
                  <div class="number">Package</div>
                  <div class="indicator">
                    <i class="bx bx-up-arrow-alt"></i>
                    <a href="/createpkg">
                      <span class="text">Go to Page</span>
                    </a>
                  </div>
                </div>
                <i class="bx bxs-cart-add cart two"></i>
              </div>
              <div class="box">
                <div class="right-side">
                  <div class="box-topic">Payment</div>
                  <div class="number">History</div>
                  <div class="indicator">
                    <i class="bx bx-up-arrow-alt"></i>
                    <a href="/payment">
                      <span class="text">Go to Page</span>
                    </a>
                  </div>
                </div>
                <i class="bx bx-cart cart three"></i>
              </div>
              <div class="box">
                <div class="right-side">
                  <div class="box-topic">Update</div>
                  <div class="number">Profile</div>
                  <div class="indicator">
                    <i class="bx bx-down-arrow-alt down"></i>
                    <a href="/updateuser">
                      <span class="text">Go to Page</span>
                    </a>
                  </div>
                </div>
                <i class="bx bxs-cart-download cart four"></i>
              </div>
            </div>

            <div>
              <div className="sales-boxes">
                <div className="recent-sales box">
                  <div className="profheader">
                    <h2 className="profah31">
                      <p>Profile</p>
                    </h2>
                    <div>
                      <img
                        className="profheader1"
                        src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049__480.png"
                        alt=""
                      />
                      <h3 className="profh3">{user?.username}</h3>
                    </div>
                  </div>
                  <div className="profadata">
                    <div>
                      <p className="profap1">
                        <strong>Full Name:</strong>
                      </p>
                      <p className="profap">{user?.VendorsName}</p>
                    </div>
                    <div>
                      <p className="profap1">
                        <strong>Type:</strong>
                      </p>
                      <p className="profap">{user?.Type}</p>
                    </div>
                    <div>
                      <p className="profap1">
                        <strong>Email:</strong>
                      </p>
                      <p className="profap">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <div class="top-sales box"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDB;
