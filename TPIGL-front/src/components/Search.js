import React from "react";
import "./Search.css"
import {useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

import data from "../algeria_cities.json"
const Home = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [type, setType] = useState('');
    const [dateFrom,setDateFrom] = useState('');
    const [dateTo,setDateTo] = useState('');
    const wilayas = [...new Set(data.map(item => item.wilaya_name))];

    const [searchInfo,setSearchInfo] = useState({
      rech : "",
      wilaya : "",
      commune : "",
      "type-ann" : "",
      "date-debut" :"",
      "date-fin" :"",
    })
  const filteredData = data.filter(item => item.wilaya_name ===searchInfo.wilaya);
    // console.log(city)
    // console.log(region)
    // console.log(filteredData);

    const handleSubmitFilter = (e) => {
        e.preventDefault();
        const formFilter = {category,city,region,type,dateFrom,dateTo}
        console.log(formFilter);
        axios.post('http://your-api-endpoint.com/submit-form', formFilter)
          .then(response => {
            console.log(response);
            setCategory('');
            setCity('');
            setRegion('');
            setType('');
            setDateFrom('');
            setDateTo('');
          }
          )
          .catch(error => {
            console.error(error);
          });
        }
      const handleSubmit = (e) => {
        // console.log(search)
        // e.preventDefault();
        axios.post(`http://172.20.10.3:8000/annonces/filt`, JSON.stringify(searchInfo))
    .then(response => {
      //console.log(Object.values(response.data));
      console.log(response.data)
      localStorage.setItem('responseData',(JSON.stringify(response.data)))
      // console.log()
      
    })
    .catch(error => {
      console.error(error);
    });
        // console.log(window.location.pathname)
         window.location.pathname==="/" ?  window.location.href = "SearchResults" : window.location.href = "./SearchResults"
      } 

      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setSearchInfo(values => ({...values, [name]: value}))
        console.log(searchInfo)
      }
    return(
        <>
        <div className="search">
                 <input name="rech" type="text" className="recherche" placeholder="Vente terrain Saoula" onChange={handleChange}/>
                 <button className="rechercher" onClick={handleSubmit}> Rechercher</button>
                 {/* <button className="filtrer" onClick={handleSubmitFilter}>filtrer</button> */}
        </div>
        <div className="filter">
          <form className="for">
            <select name="type-ann" value={searchInfo["type-ann"]} className="category" onChange={handleChange}>
              <option value="">Catégorie</option>
              <option value="Vente">Vente</option>
              <option value="Echange">Echange</option>
              <option value="Location">Location</option>
              <option value="VACANCES">Vacances</option>
            </select>

            <select name="wilaya" value={searchInfo["wilaya"]} className="city" onChange={handleChange}>
              <option value={searchInfo.wilaya}>{searchInfo.wilaya}</option>
                {wilayas.map(item => (
              <option key={item.id} value={item}>{item}</option>
              ))}
            </select>
                
            <select name="commune" value={searchInfo["commune"]} className="region" onChange={handleChange}>
              <option value={searchInfo.commune}>{searchInfo.commune}</option>
              {filteredData.map(item => (
              <option key={item.id} value={item.commune_name}>{item.commune_name}</option>
              ))}
            </select>
              
            {/*<select name="typeDuBien" value={type} className="type" onChange={handleChange}>
              <option value="">Type</option>
              <option value="Terrain">Terrain</option>
              <option value="Appartement">Appartement</option>
              <option value="Terrain Agricole">Terrain Agricole</option>
              <option value="Maison">Maison</option>
              <option value="Bungalow">Bungalow</option>
            </select>*/}
              
            <div className="periode">
              <input type="date"  name="date-debut" className="de" value={searchInfo["date-debut"]} onChange={handleChange}/>
              <input type="date"  name="date-fin" className="à" value={searchInfo["date-fin"]} onChange={handleChange}/>
            </div>
          </form>
        </div>
        </>
    )
}
export default Home;