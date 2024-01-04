import { faBars, faDashboard, faGear, faHeadSideVirus, faHeart, faMessage, faPeopleRoof, faSearch, faWallet, } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import supabase from '../../Config/SupaBaseClient';
import './managepkg.css';
import AdminNavabar from '../../Components/AdminNavabar/AdminNavabar';

import { error } from 'jquery';


const ManagePKG=()=>{
  const [sidebarActive, setSidebarActive] = useState(false);
  let loggedInUserId = localStorage.getItem('loggedInUserId');


  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const [users,setUsers]=useState([])

 

  const [user2, setUser2]=useState({
    ServicePackageID:'' ,ServicePackagePrice:'',Vendor_ID:'',
    Features:'' ,service_pack_name:'',service_pack_dis:'',
    type:'' 
  })

  console.log(user2)

  useEffect(() => {
    fetchServicePackages()
  }, [])

  async function fetchServicePackages(){
    const {data} = await supabase
    .from('ServicePackages')
    .select('*')
    .eq('Vendor_ID',loggedInUserId)
    setUsers(data)
  }

  

  function handleChange2(event){
    setUser2(prevFormData =>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
}  

 

  async function deleteServicePackages(userId){

    const {data, error} = await supabase
    .from('ServicePackages')
    .delete()
    .eq('ServicePackageID', userId)

    fetchServicePackages()

    if(error){
      console.log(error)
    }
    if(data){
      console.log(data)
    }
  }

function displayServicePackages(userId){
    users.map((user)=>{

      if(user.ServicePackageID==userId){
        setUser2({ServicePackageID:user.ServicePackageID,ServicePackagePrice: user.ServicePackagePrice, 
            Vendor_ID: user.Vendor_ID,
            Features: user.Features,
            service_pack_name: user.service_pack_name,
            service_pack_dis: user.service_pack_dis,
            type: user.type,
            Image_Url: user.Image_Url,
            type_card_hedder: user.type_card_hedder,
            package_featues: user.package_featues,})
      }
    })

  }

 async function updateServicePackages(userId){
    const {data,error} = await supabase
    .from('ServicePackages')
    .update({ServicePackagePrice: user2.ServicePackagePrice, 
        Vendor_ID: user2.Vendor_ID,
        Features: user2.Features,
        service_pack_name: user2.service_pack_name,
        service_pack_dis: user2.service_pack_dis,
        type: user2.type,
        Image_Url: user2.Image_Url,
        type_card_hedder: user2.type_card_hedder,
        package_featues: user2.package_featues,
    })
    .eq('ServicePackageID', userId)

    fetchServicePackages()

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
        <div class="logo-service_pack_name">
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
              <span class="links_name">Manage Packages</span>
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
              <span class="links_name">Booking Log</span>
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
          
          <div class="recent-sales box" id='ServicePackagesboard'>
       

              <form  className='liceform2'>
               
              <input
                  type='text'
                  name='ServicePackagePrice'
                  onChange={handleChange2}
                  defaultValue={user2.ServicePackagePrice}
                />
                <input
                  type='text'
                  name='Features'
                  onChange={handleChange2}
                  defaultValue={user2.Features}
                />
                 

                
                <button type='submit' onClick={()=>updateServicePackages(user2.ServicePackageID)}>Save Changes</button>
              </form>
            <div class="sales-service_pack_name">


              <table className='licentable'>
                <thead>
                  <tr>
                    <th className='licenpoth'>Service Package ID</th>
                    <th className='licenpoth'>Service Package Price</th>
                    <th className='licenpoth'>Vendor ID</th>
                    <th className='licenpoth'>Features</th>
                    <th className='licenpoth'>Service Pack Name</th>
                    <th className='licenpoth'>Service Pack Dis</th>
                    <th className='licenpoth'>Type</th>
                
          
                   
                  </tr>
                </thead>

                <tbody>
                  {users.map((user)=>
                  
                  <tr key={user.id}>
                  <td className='licenpotd'>{user.ServicePackageID}</td>
                  <td className='licenpotd'>{user.ServicePackagePrice}</td>
                  <td className='licenpotd'>{user.Vendor_ID}</td>
                  <td className='licenpotd'>{user.Features}</td>
                  <td className='licenpotd'>{user.service_pack_name}</td>
                  <td className='licenpotd'>{user.service_pack_dis}</td>
                  <td className='licenpotd'>{user.type}</td>
                  
                  <td className='licenpotd'>
                    <button onClick={()=>{deleteServicePackages(user.ServicePackageID)}} className='licebtn1'>Delete</button>
                    <button onClick={()=>{displayServicePackages(user.ServicePackageID)}} className='licebtn2'>Edit</button>
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
export default ManagePKG;