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
    const [Annonces,setAnnonces] = useState([
       data.map(item => item)
    ]);
    function DataList() {
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);
      
        useEffect(() => {
          setIsLoading(true);
          axios.get('https://your-api-endpoint.com/data')
            .then(response => {
              setAnnonces(response.data);
              setIsLoading(false);
            })
            .catch(error => {
              setError(error);
              setIsLoading(false);
            });
        }, []);
      
        if (isLoading) {
          return <p>Loading...</p>;
        }
        if (error) {
          return <p>An error occurred: {error.message}</p>;
        }
    }
    return ( 
        <div className="home">
            <LogedNavBar/>
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
            {data.map(item => (
                 <Link className="grid-item" key={item.id} to={`/Annonces/:${item.id}`}>
                 <div className="grid-item" key={item.id}><Annonce picture="" title={item.titre}location={item.location.state + "," + item.location.city} type={item.typeDuBien} category={item.typeDeTransaction} surface={item.surface} date={item.date} price={item.prix} /></div>
                 </Link>
             ))}
            </div>
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
            </div>
        </div>
     );
}
 
export default Home;