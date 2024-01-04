import { faBars, faDashboard, faGear, faHeadSideVirus, faHeart, faMessage, faPeopleRoof, faSearch, faWallet, } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import supabase from '../../Config/SupaBaseClient';

import AdminNavabar from '../../Components/AdminNavabar/AdminNavabar';

import { error } from 'jquery';


const UpdateUser=()=>{
  const [sidebarActive, setSidebarActive] = useState(false);
  

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const [users,setUsers]=useState([])
  let loggedInUserId = localStorage.getItem('loggedInUserId');

 

  const [user2, setUser2]=useState({
    Vendor_ID:'' ,VendorsName:'',ContactNo:'',
    NIC:'' ,Type:'',Description:'',
    Facebook_Link:'' ,Whatsapp_Link:'',Insta_Link:'',professional_name:'',image_url:'',email:''
  })

  console.log(user2)

  useEffect(() => {
    fetchVendors()
  }, [])

  async function fetchVendors(){
    const {data} = await supabase
    .from('Vendors')
    .select('*')
    .eq('Vendor_ID',loggedInUserId)
    setUsers(data)
  }

  

  function handleChange2(event){
    setUser2(prevFormData => {
        return {
           ...prevFormData,
           [event.target.name]: event.target.value
        }
     });
}  

 

  async function deleteVendors(userId){

    const {data, error} = await supabase
    .from('Vendors')
    .delete()
    .eq('Vendor_ID', userId)

    fetchVendors()

    if(error){
      console.log(error)
    }
    if(data){
      console.log(data)
    }
  }

function displayVendors(userId){
    users.map((user)=>{

      if(user.Vendor_ID==userId){
        setUser2({Vendor_ID:user.Vendor_ID,
            VendorsName: user.VendorsName, 
            ContactNo: user.ContactNo,
             NIC: user.NIC,
           Type: user.Type,
            Description: user.Description,
            More: user.More,
            Facebook_Link: user.Facebook_Link,
            Whatsapp_Link: user.Whatsapp_Link,
            Insta_Link: user.Insta_Link, 
            professional_name: user.professional_name,
            
            email: user.email,
           
           })
      }
    })

  }

 async function updateVendors(){
    const {data,error} = await supabase
    .from('Vendors')
    .update({
        Facebook_Link: user2.Facebook_Link,
        Whatsapp_Link: user2.Whatsapp_Link,
        Insta_Link: user2.Insta_Link,
        professional_name:user2.VendorsName,
        image_url:user2.image_url,
       
    })
    .eq('Vendor_ID', loggedInUserId)

    fetchVendors()

    if(error){
      console.log(error)
    }
    if(data){
      console.log(data)
    }
  }

  



    return(
        <div>
        <AdminNavabar/>
       
      <div className="Dashboard"> 
        <div className={`sidebar ${sidebarActive ? 'active' : ''}`}>
        <div class="logo-details">
          <i class="bx bxl-c-plus-plus"></i>
          <span class="logo_name">EVENTO</span>
        </div>
        <ul class="nav-links">
          <li>
            <a href="/admindb" class="active">
              <i class="bx bx-grid-alt"><FontAwesomeIcon icon={faDashboard}/></i>
              <span class="links_name">Dashboard</span>
            </a>
          </li>
  
          <li>
            <a href="/managepkg">
              <i class="bx bx-user"><FontAwesomeIcon icon={faPeopleRoof}/></i>
              <span class="links_name">Manage Vendors</span>
            </a>
          </li>
  
          <li>
            <a href="/createpkg" >
              <i class="bx bx-user"><FontAwesomeIcon icon={faWallet}/></i>
              <span class="links_name">Create Package</span>
            </a>
          </li>
  
          <li>
            <a href="/payment">
            <i class="bx bx-user"><FontAwesomeIcon icon={faPeopleRoof}/></i>
              <span class="links_name">Payment History</span>
            </a>
          </li>
  
          <li>
            <a href="/updateuser">
            <i class="bx bx-user"><FontAwesomeIcon icon={faPeopleRoof}/></i>
              <span class="links_name">Update Profile</span>
            </a>
          </li>
  
         
  
          <li class="log_out">
            <a href="/logout">
              <i class="bx bx-log-out"><FontAwesomeIcon icon={faBars}/></i>
              <span class="links_name">Log out</span>
            </a>
          </li>
          
        </ul>
      </div>
      <section class="home-section">
        <nav>
        <div className="sidebar-button" onClick={toggleSidebar}>
        <i className={`bx ${sidebarActive ? 'bx-menu-alt-right' : 'bx-menu'} sidebarBtn`}><FontAwesomeIcon icon={faBars}/></i>
            <span class="dashboard">Dashboard</span>
          </div>
          
          
        </nav>

      <div class="home-content">
        <div class="overview-boxes">

        </div>
        <div class="sales-boxes" >
          
          <div class="recent-sales box" id='Vendorsboard'>
       

              <form  className='liceform2'>
               
              <input
                  type='text'
                  name='VendorsName'
                  placeholder='Vendors Name'
                  onChange={handleChange2}
                  defaultValue={user2.VendorsName}
                />
                <input
                  type='text'
                  name='Facebook_Link'
                  placeholder='Facebook Link'
                  onChange={handleChange2}
                  defaultValue={user2.Facebook_Link}
                />
                 <input
                  type='text'
                  name='Whatsapp_Link'
                  placeholder=' Whatsapp Link'
                  onChange={handleChange2}
                  defaultValue={user2.Whatsapp_Link}
                />
                 <input
                  type='text'
                  name='Insta_Link'
                  placeholder='Insta Link'
                  onChange={handleChange2}
                  defaultValue={user2.Insta_Link}
                />
                  <input
                  type='text'
                  name='image_url'
                  placeholder='Image Url'
                  onChange={handleChange2}
                  defaultValue={user2.image_url}
                />

                
                <button type='submit'onClick={()=>updateVendors()}>Save Changes</button>
              </form>
            <div class="sales-details">


              <table className='licentable'>
                <thead>
                  <tr>
                    <th className='licenpoth'>V_ID</th>
                    <th className='licenpoth'>V_Name</th>
                    <th className='licenpoth'>ContactNo</th>
                    <th className='licenpoth'>NIC</th>
                    <th className='licenpoth'>Type</th>
                    <th className='licenpoth'>Description</th>
                    <th className='licenpoth'>Facebook Link</th>
                    <th className='licenpoth'>Whatsapp Link</th>
                    <th className='licenpoth'>Insta Link</th>
                    <th className='licenpoth'>professional_name</th>
                   
                    <th className='licenpoth'>email</th>
                   
                  </tr>
                </thead>

                <tbody>
                  {users.map((user)=>
                  
                  <tr key={user.Vendor_ID}>
                  <td className='licenpotd'>{user.Vendor_ID}</td>
                  <td className='licenpotd'>{user.VendorsName}</td>
                  <td className='licenpotd'>{user.ContactNo}</td>
                  <td className='licenpotd'>{user.NIC}</td>
                  <td className='licenpotd'>{user.Details}</td>
                  <td className='licenpotd'>{user.Description}</td>

                  <td className='licenpotd'>{user.Facebook_Link}</td>
                  <td className='licenpotd'>{user.Whatsapp_Link}</td>
                  <td className='licenpotd'>{user.Insta_Link}</td>
                  <td className='licenpotd'>{user.professional_name}</td>
                
                  <td className='licenpotd'>{user.email}</td>
                  <td className='licenpotd'>
                    <button onClick={()=>{deleteVendors(user.Vendor_ID)}} className='licebtn1'>Delete</button>
                    <button onClick={()=>{displayVendors(user.Vendor_ID)}} className='licebtn2'>Edit</button>
                  </td>
                  </tr>

                  )}
                </tbody>
              </table>

            </div>
          </div>
        </div>
      </div>
      
      
    </section>
    
        </div>
    </div>
    )
}
export default UpdateUser;