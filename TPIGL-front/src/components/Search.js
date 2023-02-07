import React from "react";
import "./Search.css"
import {useState } from "react"
import axios from "axios";
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
    //const wilayas = new Set(data.map(item => (item.wilaya_name)));
    const filteredData = data.filter(item => item.wilaya_name === city);
    console.log(city)
    console.log(region)
    console.log(filteredData);
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
        console.log(search)
        e.preventDefault();

        axios.post('http://your-api-endpoint.com/submit-form', search)
        .then(response => {
            console.log(response);
            setSearch('')}
        )
        .catch(error => {
            console.error(error);
        })
        console.log(window.location.pathname)
        window.location.pathname==="/" ?  window.location.href = "SearchResults" : window.location.href = "./HomeConnected/SearchResults"
      } 
    return(
        <>
        <div className="search">
                 <input type="text" className="recherche" placeholder="Vente terrain Saoula" onChange={(e) => setSearch(e.target.value)}/>
                 <button className="rechercher" onClick={handleSubmit}>Rechercher</button>
                 <button className="filtrer" onClick={handleSubmitFilter}>filtrer</button>
              </div>
              <div className="filter">
              <form onSubmit={handleSubmit} className="for">
      <select value={category} className="category" onChange={(e) => setCategory(e.target.value)}>
        <option value="">Catégorie</option>
        <option value="Vente">Vente</option>
        <option value="Echange">Echange</option>
        <option value="Location">Location</option>
        <option value="Vacance">Vacance</option>
      </select>
      <select value={city} className="city" onChange={(e) => setCity(e.target.value)}>
        <option value="">Wilaya</option>
        {wilayas.map(item => (
                 <option key={item.id} value={item}>{item}</option>
        ))}
      </select>
      
      <select value={region} className="region" onChange={(e) => setRegion(e.target.value)}>
        <option value="">Commune</option>
        {
        filteredData.map(item => (
                 <option key={item.id} value={item.commune_name}>{item.commune_name}</option>
        ))}
      </select>
      <select value={type} className="type" onChange={(e) => setType(e.target.value)}>
        <option value="">Type</option>
        <option value="Terrain">Terrain</option>
        <option value="Terrain Agricole">Terrain Agricole</option>
        <option value="Appartement">Appartement</option>
        <option value="Maison">Maison</option>
        <option value="Bungalow">Bungalow</option>
      </select>
      {/*<select value={period} className="period" onChange={(e) => setPeriod(e.target.value)}>*/}
      <div className="periode">
      <input type="date"  className="de" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)}/>
      <input type="date"  className="à" value={dateTo} onChange={(e) => setDateTo(e.target.value)}/>
      </div>
    </form>
              </div>
        </>
    )
}
export default Home;