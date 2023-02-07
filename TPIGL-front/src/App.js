import React, { useState, useEffect,useCallback ,useRef} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import InscriptionForm from './pages/InscriptionForm';
import MesAnnonces from "./pages/MesAnnonces";
import MonProfil from "./pages/MonProfil";
import DetailsAnnonce from "./pages/DetailsAnnonce";
import DeposerAnnonce from "./pages/DeposerAnnonce";
import DeposerPhotos from './pages/DeposerPhotos';
import MonCompteLayout from './pages/MonCompteLayout';
import SearchResults from './pages/SearchResults';
import LogedNavBar from "./components/LogedNavBar";
import MyFooter from "./components/MyFooter";
import HomeConnected from "./pages/HomeConnected"
import "./App.css";
import "./Form.css";
import Navbar from "./components/Navbar";
import ProfilUtilisateur from "./pages/ProfilUtilisateur";
//import Admin from "./pages/admin";


const App = () => {
  return ( 
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/HomeConnected" element={<HomeConnected />}/>
          <Route path="/HomeConnected/MonCompte/" element={<MonCompteLayout />}> {/*Here the big / we put here the main and then inside of it we have all the routes inside example /monprofil /mesannonces /ajouterannonces */}
            <Route index element={<MonProfil />} />
            <Route path="MesAnnonces" element={<MesAnnonces />} />
        </Route>
          <Route path="/HomeConnected" element={<HomeConnected />}/>
          <Route path="/InscriptionForm" element={<InscriptionForm />}/>
          <Route path="MonCompte/MesAnnonces" element={<MesAnnonces />} />
          <Route path="HomeConnected/DeposerAnnonce" element={<DeposerAnnonce />} />
          <Route path="/SearchResults" element={<SearchResults />}></Route>
          <Route path="/HomeConnected/SearchResults" element={<SearchResults />}></Route>
          <Route path="/Annonces/:id" element={<DetailsAnnonce />} />
          <Route path="HomeConnected/Profil/:id" element={<ProfilUtilisateur />} />
          <Route path="Profil/:id" element={<ProfilUtilisateur />} />
          {/*<Route path="/admin" element={<Admin />} />*/}
          <Route path="*" element= {<h1>NotFound</h1>} />
        </Routes>
      </div>
  );
};
export default App;