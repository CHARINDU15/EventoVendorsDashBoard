import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdminDB from './Page/AdminDB/admindb';
import ManagePKG from './Page/ManagePKG/managepkg';
import CreatePKG from './Page/CreatePKG/createpkg';
import Payments from './Page/Payments/Payment';
import SignIn from './Page/SignIn/login';
import UpdateUser from './Page/UpdateUser/updateuser';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <main>
            <Routes>
            <Route path="/" element={<SignIn/>} />
            <Route path="/admindb" element={<AdminDB/>} />
           <Route path ="/createpkg" element={<CreatePKG/>}/>
            <Route path='/managepkg' element={<ManagePKG/>}/>
            <Route path='/payment' element={<Payments/>}/>
            <Route path='/updateuser' element={<UpdateUser/>}/>
            </Routes>
          </main>
    
      </BrowserRouter>
    </div>
  );
}

export default App;
