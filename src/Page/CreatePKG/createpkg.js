import {
  faBars,
  faDashboard,
  faGear,
  faHeadSideVirus,
  faHeart,
  faMessage,
  faPeopleRoof,
  faSearch,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import supabase from "../../Config/SupaBaseClient";

import AdminNavabar from "../../Components/AdminNavabar/AdminNavabar";

import { error } from "jquery";

const CreatePKG = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  let loggedInUserId = localStorage.getItem('loggedInUserId');

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({
    ServicePackagePrice: "",
    Vendor_ID: "",
    Features: "",
    service_pack_name: "",
    service_pack_dis: "",
    type: "",
  });

  useEffect(() => {
    fetchServicePackages();
  }, []);

  async function fetchServicePackages() {
    const { data } = await supabase.from("ServicePackages").select("*");
    setUsers(data);
  }

  function handleChange(event) {
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function createServicePackages() {
    await supabase.from("ServicePackages").insert({
      ServicePackagePrice: user.ServicePackagePrice,
      Vendor_ID: loggedInUserId,
      Features: user.Features,
      service_pack_name: user.service_pack_name,
      service_pack_dis: user.service_pack_dis,
      type: user.type,
    });
    
  }

  async function deleteServicePackages(userId) {
    const { data, error } = await supabase
      .from("ServicePackages")
      .delete()
      .eq("PackageID", userId);

    fetchServicePackages();

    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
    }
  }
  return (
    <div>
      <AdminNavabar />

      <div className="Dashboard">
        <div className={`sidebar ${sidebarActive ? "active" : ""}`}>
          <div class="logo-service_pack_name">
            <i class="bx bxl-c-plus-plus"></i>
            <span class="logo_name">EVENTO</span>
          </div>
          <ul class="nav-links">
            <li>
              <a href="/admindb" class="active">
                <i class="bx bx-grid-alt">
                  <FontAwesomeIcon icon={faDashboard} />
                </i>
                <span class="links_name">Dashboard</span>
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
              <a href="/logout">
                <i class="bx bx-log-out">
                  <FontAwesomeIcon icon={faBars} />
                </i>
                <span class="links_name">Log out</span>
              </a>
            </li>
          </ul>
        </div>
        <section class="home-section">
          <nav>
            <div className="sidebar-button" onClick={toggleSidebar}>
              <i
                className={`bx ${
                  sidebarActive ? "bx-menu-alt-right" : "bx-menu"
                } sidebarBtn`}
              >
                <FontAwesomeIcon icon={faBars} />
              </i>
              <span class="dashboard">Dashboard</span>
            </div>
          </nav>

          <div class="home-content">
            <div class="overview-boxes"></div>
            <div class="sales-boxes">
              <div class="recent-sales box" id="ServicePackagesboard">
                <form onSubmit={createServicePackages} className="liceform1">
                  <input
                    type="text"
                    placeholder="Service Package Price"
                    name="ServicePackagePrice"
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    placeholder="Features"
                    name="Features"
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    placeholder="Service Pack Name"
                    name="service_pack_name"
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    placeholder="Service Pack Dis"
                    name="service_pack_dis"
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    placeholder="type"
                    name="type"
                    onChange={handleChange}
                  />

                  <button type="submit" onClick={createServicePackages}>Create</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default CreatePKG;
