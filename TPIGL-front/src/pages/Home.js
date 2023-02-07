import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PopUp from '../components/PopUp';
import "./Home.css"
import  Annonce from '../components/Annonce'
import { useState, useEffect } from 'react';
import axios from "axios"
import Search from '../components/Search';
import MyFooter from '../components/MyFooter';
//import data from '../Annonces.json';
const Home = () => {
  const [Annonces,setAnnonces] = useState([]);
  useEffect(() => {
      axios.get('http://192.168.74.104:8000/annonces/get_all')
            .then(res => {
              const lists = Object.entries(res.data).map(item => item[1]);
              console.log(res.data);
              console.log(lists);  
              setAnnonces(lists);
              console.log(Annonces);
            })
            .catch(error => {
            });}, []);
    return ( 
        <div className="home">
            <Navbar></Navbar>
            <h1>Trouver L'immobilier<br/> 
            Qui Vous Convient</h1>
            <h5>Une excellente platforme pour vendre,<br /> 
           louer, échanger des immobilières sans<br /> 
           commisions</h5>
           <div className="image">
           </div>
           <div className="image2"></div>
           <div className="search_container">
              <Search />
           </div>
            <PopUp/>
            <h3 className='H3'>
                Annonces
            </h3>
            <h1 className='H1'>
                Nos Recommendations
            </h1>
            <div className="grid-container">
            {Annonces.map(item => {
                 return(
                <Link className="grid-item" key={item.id} to={`/Annonces/:${item.id}`}>
                  <Annonce picture="" title={item.titre}location={item.location.state + "," + item.location.city} type={item.typeDuBien} category={item.typeDeTransaction} surface={item.surface} date={item.date} price={item.prix} />
                </Link>
                 )
              })}
            </div>
            <div className="container-pourquoi">
                <div className="img">
                  <p>Pourquoi Nous Choisir?</p>
                </div>
                <div className="reasons">
                    <div className='reason1'></div>
                    <div className='reason2'></div>
                    <div className='reason3'></div>
                </div>
            </div>
            <div className="foter">
                <MyFooter/>
            </div>
        </div>
     );
}
 
export default Home;