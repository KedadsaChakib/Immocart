import React, { useState, useEffect,useCallback ,useRef} from "react";

import "../App.css";
import MaPremiereAnnonce from "../components/MaPremiereAnnonce";



function Titre({titre}) {
    return (
        <div className="Titre-Text">
            <p className="Titre">{titre}</p>
        </div>
    )
}

function LesAnnonces({annonces}) {
    return(
        <>
        {annonces?.length > 0 ? (
          <div className="app">
            {annonces.map((Ai) => (
              <MaPremiereAnnonce Ai={Ai} />
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
            <LesAnnonces annonces = {props.annonces}/>
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
    //searchAi(userId)
    }, []);


    return (
        <>
        <MesAnnoncesContainer annonces={annonces} titre={titre} />
        </>
    )
  };
  
  export default MesAnnonces;