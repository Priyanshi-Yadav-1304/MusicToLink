import './App.css';
// import { Footer } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Analytics from "./Components/Analytics";
import Forbidden from "./Components/Forbidden";

// import Home from "./Components/Home";
import InputImage from "./Components/InputImage";
import LinkPut from "./Components/LinkPut";
import Onboarding from "./Components/Onboarding";
import Payment from "./Components/Payment";
import PlayMusic from "./Components/PlayMusic";
import Profile from "./Components/Profile";
import QRMessage from "./Components/QRMessage";
import Services from "./Components/Services";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import UpdateSong from "./Components/UpdateSong";
import NewOtp from './Components/NewOtp';
import NewPayment from './Components/NewPayment';
import NewHome from './Components/NewHome';
import NewSignup from './Components/NewSignup';
function App() {

  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home/>}></Route> */}
          <Route path="/" element={<NewHome/>}></Route>
          <Route path="/signin" element={<Signin/>}></Route>
          <Route path="/link" element={<LinkPut/>}></Route>
          <Route path="/updateSong/:id" element={<UpdateSong/>}></Route>
          <Route path="/inputImage/:id" element={<InputImage/>}></Route>
          <Route path="/:username/:songTitle" element={<PlayMusic/>}></Route>
          <Route path="/:username/:songTitle/Qrcode" element={<QRMessage/>}></Route>
          <Route path="/:username/QrCode" element={<QRMessage/>}></Route>
          <Route path="/signup" element={<NewSignup/>}></Route>
          <Route path="/onboarding" element={<Onboarding/>}></Route>
          <Route path="/:username" element={<Profile />}></Route>
          <Route path="/payment" element={<NewPayment />}></Route>
          <Route path="/admin" element={<Services />}></Route>
          <Route path="/analytics" element={<Analytics />}></Route>
          <Route path="/forbidden" element={<Forbidden />}></Route>
          <Route path="/confirmation/:email" element={<NewOtp />}></Route>  
          <Route path='*' element={<Forbidden />}/>        
        </Routes>
      </Router>
      
    </div>
    
  );
}

export default App;
