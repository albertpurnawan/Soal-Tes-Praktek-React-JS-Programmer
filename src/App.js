import React, { useState, useRef } from "react";
//import styles
import "./styles/app.scss";


//import router
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';

//import pages
import LoginPage from "./pages/Login";
import MainPage from "./pages/Main";
import ProtectedRoute from "./components/protectedRoute";
import NavbarComp from "./components/NavbarComp";
import FooterComp from "./components/FooterComp";

function App() {
  const [data, setData] = useState([{}])
  return (
    <div class="App">

      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/detail" exact component={() => <DetailPage />} /> */}
          {/* <Route path="/Main" element={<ProtectedRoute exact component={() => <MainPage />} />}  exact component={() => <LoginPage />} /> */}
        </Routes>
      </Router>
    </div>
  )
};

export default App;
