import React from 'react';
import LogedNavBar from '../components/LogedNavBar';
import PopUp from '../components/PopUp';
import "./Home.css"
import  Annonce from '../components/Annonce'
import Search from '../components/Search';
import { useState, useEffect } from 'react';
import MyFooter from '../components/MyFooter';
import axios from "axios";
import data from "../Annonces.json"
import { Link } from "react-router-dom"
const Home = () => {
    const [Annonces,setAnnonces] = useState([]);
    useEffect(() => {
      axios.get('http://172.20.10.3:8000/annonces/get_all')
            .then(response => {
              console.log (response.data)
              console.log(Object.values(response.data))
              setAnnonces(Object.values(response.data))
            })
            .catch(error => {
              console.log("An error has occured")
            }
          );}, []);

    function DataList() {
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);
      
  if (isLoading) {
          return <p>Loading...</p>;
        }
        if (error) {
          return <p>An error occurred: {error.message}</p>;
        }
    }
    return ( 
      <>
        <LogedNavBar/>
        <div className="home">
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
            <h3 className='H3'>
                Annonces
            </h3>
            <h1 className='H1'>
                Nos Recommendations
            </h1>
            <div className="grid-container">
            {Annonces.map(item => (
                  <Link className="grid-item" key={item.id} to={`/Annonces/:${item.id}`}>   
                  {/* {console.log(item.image)} */}
                   <div className="grid-item" key={item.id}><Annonce picture={item.image} title={item.titre}location={item.commune +" ," + item.wilaya} type={item.letype} category={item.categorie} surface={item.surface} date={item.data} price={item.prix} /></div>
                  </Link>
             ))}
            </div>
{/*             
            <div className="container-pourquoi">
                <div className="img"></div>
                <div className="reasons">
                    <div className='reason1'></div>
                    <div className='reason2'></div>
                    <div className='reason3'></div>
                </div>
            </div>
            <div className="foter">
                <MyFooter/>
            </div> */}
        </div>
      </>
     );
}
 
export default Home;