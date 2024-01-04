import { React, useEffect, useState } from "react";
import "./user.css";
import supabase from '../../Config/SupaBaseClient';

const UserLogin = ({ name, id, email, phoneNumber }) => {
  const [user, setUser] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState(null);
  const [customerId, setCustomerID] = useState("");

  useEffect(() => {
    const getUserOnLoad = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      setUser(user);
    };

    getUserOnLoad();
    setCustomerID(user && user.id);
    console.log(customerId);
  }, []);
  useEffect(() => {
    const fetchSpecificCustomer = async () => {
      try {
        // Fetch a specific customer by ID from the Customer table
        const { data, error } = await supabase
          .from("Customer")
          .select("'Name', 'ContactNumber', 'NIC'")
          .eq("CustomerID", customerId)
          .single(); // Use .single() to fetch a single record

        if (error) {
          throw error;
        }

        // Set the retrieved customer data to state
        setCustomerData(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      }
    };

    // Call the fetchSpecificCustomer function
    fetchSpecificCustomer();
  }, [customerId]);

  return (
    <>
      {customerData && (
        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
          <div className="usercontainer py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-lg-6 mb-4 mb-lg-0">
                <div
                  className="card user mb-3"
                  style={{ borderRadius: ".5rem" }}
                >
                  <div className="hi">
                  <div className="row g-0">
                    <div
                      className=" col-md-4 gradient-custom text-center text-white"
                      style={{
                        borderTopLeftRadius: ".5rem",
                        borderBottomLeftRadius: ".5rem",
                      }}
                    >
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        alt="Avatar"
                        className="img-fluid my-5"
                        style={{ width: "80px" }}
                      />
                      <i className="far fa-edit mb-5"></i>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body p-4">
                        <h6>Information</h6>
                        <hr className=" mt-0 mb-4" />
                        <div className=" row pt-1">
                          <div className=" col-6 mb-3">
                            <h6>Name</h6>
                            <p className="user text-muted">{customerData.Name}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>ID</h6>
                            <p className="user text-muted">
                              {user && user.email}
                            </p>
                          </div>
                        </div>
                        
                        <h6>Contact</h6>
                       
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col-6 mb-3">
                            <h6>Email</h6>
                            <p className="text-muted"> {user && user.email}</p>
                          </div>
                          <div className="col-6 mb-3">
                            <h6>Phone Number </h6>
                            <p className="text-muted">{customerData.ContactNumber}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UserLogin;