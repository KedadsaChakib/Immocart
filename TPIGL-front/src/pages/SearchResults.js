import LogedNavBar from "../components/LogedNavBar";
import Annonce from "../components/Annonce";
import {useState,useEffect } from "react"
import "./SearchResults.css"
import Search from "../components/Search"
import Footer from "../components/MyFooter"
import Navbar from "../components/Navbar";
import PopUp from "../components/PopUp";
const SearchResults = () => {
    const [Annonces,setAnnonces] = useState([
        { id: 1, picture:"", title:"Vente Appartement F5 Saoula", location: "Saoula, Alger", type: "Appartement",category: "Vente", surface: "100", date: "12/02/2022", price: "1000000"},
        { id: 2,picture:"", title:"Vente Appartement F5 Saoula", location: "Saoula, Alger", type: "Appartement",category: "Vente", surface: "100", date: "21/03/2021", price: "800000"},
        { id: 3,picture:"", title:"Echange Appartement F5 Setif", location: "AinArnat, Setif", type: "Appartement",category: "Location", surface: "80", date: "12/02/2023", price: "2000000"},
        { id: 4,picture:"", title:"Vente Appartement F5 Saoula", location: "Saoula, Alger", type: "Appartement",category: "Vacance", surface: "100", date: "7/02/2022", price: "3000000"},
        { id: 5,picture:"", title:"Vente Appartement F5 Saoula", location: "Saoula, Alger", type: "Appartement",category: "Echange", surface: "100", date: "2/02/2022", price: "1300000"},
        { id: 6,picture:"", title:"Vente Appartement F5 Saoula", location: "Saoula, Alger", type: "Appartement",category: "Vente", surface: "100", date: "05/02/2022", price: "1000000"},
    ]);
    const current = window.location.pathname
    useEffect(() =>{
        console.log(current)
    },[])
    return ( 
       <div className="SearchResults">
        {current==="/HomeConnected/SearchResults" ? <LogedNavBar/>:<Navbar />}
        <div className="Search"><Search/></div>
        <div className="grid-container">
        {Annonces.map(item => (
                 <div className="grid-item" key={item.id}><Annonce picture="" title={item.title}location={item.location} type={item.type} category={item.category} surface={item.surface} date={item.date} price={item.price} /></div>
             ))}
        </div>
        {current==="/HomeConnected/SearchResults" ? null:<PopUp />}
        <div id="footer"><Footer /></div>
       </div> 
     );
}


export default SearchResults;