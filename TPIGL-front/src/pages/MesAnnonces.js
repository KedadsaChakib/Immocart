import React, { useState, useEffect,useCallback ,useRef} from "react";
import axios from "axios";
import LogedNavBar from "../components/LogedNavBar";
import MenuBar from "../components/MenuBar";

import "../App.css";
import MaPremiereAnnonce from "../components/MaPremiereAnnonce";



function Titre({titre}) {
    return (
        <div className="Titre-Text">
            <p className="Titre">{titre}</p>
        </div>
    )
}

function LesAnnonces({annonces,setAnnonces}) {
  
  const handleClick =(index,id)=>{
      const newAnnonces = annonces.filter((_, i) => i !== index);
      setAnnonces(newAnnonces);
      
      axios.post(`http://172.20.10.3:8000/annonces/supprimer/${id}`)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });

    };
    return(
        <>
        {annonces?.length > 0 ? (
          <div className="app">
            {annonces.map((Ai,index) => (
              <MaPremiereAnnonce Ai={Ai} handleClick={handleClick} index={index}/>
            ))}
          </div>
        ) : (
          <div>
            <h2>Vous n'avez deposer aucune annonce</h2>
          </div>
        )}
        </>
    )
}
function MesAnnoncesContainer(props) {
    return(
        <div className="c-page">
            <Titre titre = {props.titre} />
            <LesAnnonces annonces = {props.annonces} setAnnonces={props.setAnnonces}/>
    </div>
    )
}

const MesAnnonces = () => {
    const titre = "Mes Annonces"
    const [annonces, setAnnonces] = useState([
    {
      Titre: "Vente appartement saoula",
      Date: "05/12/2022",
      imagePri: "https://",
    },
    {
      Titre: "Vente appartement saoula",
      Date: "05/12/2022",
      imagePri: "https://",
    },
  ]);

  useEffect(() => {
    axios.get('http://172.20.10.3:8000/annonces/mes_annonces')
          .then(response => {
            console.log (response.data)
            console.log(Object.values(response.data))
            setAnnonces(Object.values(response.data))
          })
          .catch(error => {
            console.log("An error has occured")
          }
        );}, []);


    return (
        <>
        {/* <LogedNavBar />
        <MenuBar /> */}
        <MesAnnoncesContainer annonces={annonces} titre={titre} setAnnonces={setAnnonces}/>
        </>
    )
  };
  
  export default MesAnnonces;
     