import React, { useState, useEffect,useCallback ,useRef} from "react";
import { useJsApiLoader, GoogleMap, MarkerF} from "@react-google-maps/api";
import Geocode from "react-geocode";
import Autocomplete  from "react-google-autocomplete";
import LogedNavBar from "../components/LogedNavBar";
// import { type } from "@testing-library/user-event/dist/type";

import DeposerPhotos from "./DeposerPhotos";
import { Link } from "react-router-dom";
import axios from "axios";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)

const FormPage1 = ({data , setData}) => {
  // const [description, setDescription] = useState("");
  // const [selected, setSelected] = React.useState("");
  const [mapLocation,setMapLocation] =useState({
    address: "",
    area : "",
    city : "",
    state :"",
    zoom: 5,
    mapPosition:{
      lat:30,
      lng:4,
    },
    markerPosition:{
      lat:30,
      lng:4,
    },
  });

  const [className, setClassName] = useState({
    1: 'button-form-on-click',
    2: 'button-form',
    3: 'button-form',
    4: 'button-form',
  });

  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
})
  if (!isLoaded) {
    return <div style={{textAlign:"center",margin:"100px",fontSize:"40px",fontWeight:"200"}}>Waiting...</div>
  }

  const getCity = (addressArray)=>{
    let city ='';
    for (let index = 0; index < addressArray.length; index++) {
      if(addressArray[index].types[0] && 'administrative_area_level_2'=== addressArray[index].types[0]){
        city= addressArray[index].long_name;
        return city
      }
    }
  }

  const getArea = (addressArray)=>{
    let area ='';
    for (let index = 0; index < addressArray.length; index++) {
      if (addressArray[index].types[0]) {
        for (let j = 0; j < addressArray.length; j++) {
          if('sublocality_level_1' === addressArray[index].types[j] || 'locality' === addressArray[index].types[j]){
            area= addressArray[index].long_name;
            return area  
        }
        }
      }
    }
  }

  const getState = (addressArray)=>{
    let state ='';
    for (let index = 0; index < addressArray.length; index++) {
      for (let index = 0; index < addressArray.length; index++) {
        if(addressArray[index].types[0] && 'administrative_area_level_1'=== addressArray[index].types[0]){
          state= addressArray[index].long_name;
          return state
        }  
      }
    }
  }

  const onMarkerDragEnd = (event)=>{
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    Geocode.fromLatLng(newLat,newLng)
    .then(response =>{
      const address = response.results[0].formatted_address,
            addressArray = response.results[0].address_components,
            city = getCity(addressArray),
            area = getArea(addressArray),
            state = getState(addressArray);
            
            setMapLocation({
              address : (address) ? address : "",
              area : (area) ? area : "",
              city : (city) ? city : "",
              state : (state) ? state : "",
              zoom:10,
              markerPosition : {
                lat:newLat,
                lng:newLng,
              },
              mapPosition : {
                lat:newLat,
                lng:newLng,
              }
            })
            setData(values => ({...values, location : {
              address : (address) ? address : "",
              area : (area) ? area : "",
              city : (city) ? city : "",
              state : (state) ? state : "",
              zoom:10,
              markerPosition : {
                lat:newLat,
                lng:newLng,
              },
              mapPosition : {
                lat:newLat,
                lng:newLng,
              }
            },}))
            // console.log(addressArray)
            //  console.log(mapLocation)
    })    
  }
  
  const onPlaceSelected =(place)=>{
    console.log('plc', place);
    if (place) {
      const address = place.formatted_address,
      addressArray = place.address_components,
      city = getCity(addressArray),
      area = getArea(addressArray),
      state = getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
      
      console.log(addressArray)
      console.log('latvalue', latValue)
      console.log('lngValue', lngValue)
      // console.log("city"+city)
      // console.log("area"+area)
      // console.log("state"+state) 
      // console.log("latValue"+latValue)
      // console.log("lngValue"+lngValue)
  
      // Set these values in the state.
      setMapLocation({
          address: (address) ? address : '',
          area: (area) ? area : '',
          city: (city) ? city : '',
          state: (state) ? state : '',
          zoom: 10,
          markerPosition: {
              lat: latValue,
              lng: lngValue
          },
          mapPosition: {
              lat: latValue,
              lng: lngValue
          },
      })
      setData(values => ({...values, location : {
        address: (address) ? address : '',
        area: (area) ? area : '',
        city: (city) ? city : '',
        state: (state) ? state : '',
        zoom: 10,
        markerPosition: {
            lat: latValue,
            lng: lngValue
        },
        mapPosition: {
            lat: latValue,
            lng: lngValue
        },
      },}))
    }
  }
  // const changeSelectOptionHandler = (event) => {
  //   setSelected(event.target.value);
  // };
  
  // const algorithm = [
  //   "Searching Algorithm",
  //   "Sorting Algorithm",
  //   "Graph Algorithm",
  // ];
  // const language = ["C++", "Java", "Python", "C#"];
  // const dataStructure = ["Arrays", "LinkedList", "Stack", "Queue"];
  
  // let type = null;
  
  // let options = null;
  
  // if (selected === "Algorithm") {
  //   type = algorithm;
  // } else if (selected === "Language") {
  //   type = language;
  // } else if (selected === "Data Structure") {
  //   type = dataStructure;
  // }
  
  // if (type) {
  //   options = type.map((el) => <option key={el}>{el}</option>);
  // }

const handleChange = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setData(values => ({...values, [name]: value}))
  console.log(data)
}
  
  const changeTransactionType =(e)=>{
    if(e.target.name ==='vente'){
      setClassName(
        {
          1: 'button-form-on-click',
          2: 'button-form',
          3: 'button-form',
          4: 'button-form',
        }
      )
      setData(values => ({...values, typeDeTransaction : "VENTE"}))
    }else if(e.target.name ==='location'){
      setClassName(
        {
          1: 'button-form',
          2: 'button-form-on-click',
          3: 'button-form',
          4: 'button-form',
        }
      )
      setData(values => ({...values, typeDeTransaction : "LOCATION"}))
    }else if(e.target.name ==='echange'){
      setClassName(
        {
          1: 'button-form',
          2: 'button-form',
          3: 'button-form-on-click',
          4: 'button-form',
        }
      )
      setData(values => ({...values, typeDeTransaction : "ECHANGE"}))
    }else if(e.target.name ==='vacances'){
      setClassName(
        {
          1: 'button-form',
          2: 'button-form',
          3: 'button-form',
          4: 'button-form-on-click',
        }
      )
      setData(values => ({...values, typeDeTransaction : "VACANCES"}))
    }
  }
  return(
    <>
    <LogedNavBar />
    <div className="loading">
        <div className="rectangle"></div>
        <div className="circle1">
            <div className="numero1">1</div>
            <div className="circle-text1">Caracteristiques principales</div>
        </div>
        <div className="circle2">
            <div className="numero2">2</div>
            <div className="circle-text2">Photos de mon annonce</div>
        </div>
    </div>
        <div className="large-container">
        <div className="form">
            <div className="sub-container" >
                <div className="sub-container-entete"><label className="sub-container-entete-label">TYPE DE LA TRANSACTION* : </label><span>{data.typeDeTransaction}</span></div>
                <div className="button-form-section">
                    <button className={className[1]} onClick={changeTransactionType} name='vente' style={{border:"0px",}}>Vente</button> 
                    <button className={className[2]} onClick={changeTransactionType} name='location' style={{border:"0px",}}>Location</button> 
                    <button className={className[3]} onClick={changeTransactionType} name='echange' style={{border:"0px",}}>Echange</button> 
                    <button className={className[4]} onClick={changeTransactionType} name='vacances' style={{border:"0px",}}>Vacances</button> 
                </div>
            </div>
            <div className="sub-container" >
                <div className="sub-container-entete"><label className="sub-container-entete-label">TYPE DU BIEN* : </label></div>
                {/* <img src="" alt="line" /> */}
                <div className="type-du-bien-section">
                <select id="type-du-bien-select" name="typeDuBien" onChange={handleChange}>
                    <option value="Appartement">Appartement</option>
                    <option value="Terrain">Terrain</option>
                    <option value="Terrain agricole">Terrain Agricole</option>
                    <option value="Maison">Maison</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Villa">Villa</option>
                </select>
                </div>
            </div>
            <div className="sub-container" >
                <div className="sub-container-entete"><label className="sub-container-entete-label">SURFACE DU BIEN* : </label></div>
                <div className="surface-section"><input type="number" name="surface" value={data.surface || ""} onChange={handleChange}/><span>m<sup>2</sup></span></div>
            </div>
            <div className="sub-container" >
                <div className="sub-container-entete"><label className="sub-container-entete-label">PRIX DU BIEN* : </label></div>
                <div className="prix-section"><input type="number" name="prix" value={data.prix || ""} onChange={handleChange}/> <span>DA</span> </div>
              </div>
            <div className="sub-container" >
                <div className="sub-container-entete"><label className="sub-container-entete-label">LOCALISATION* : </label></div>
                <div className="location-section">
                  {/* <div className="location-form-1-champ-section">
                      <label>Wilaya</label>
                      <select onChange={changeSelectOptionHandler}>
                      <option>Choose...</option>
                      <option>Algorithm</option>
                      <option>Language</option>
                      <option>Data Structure</option>
                      </select>
                  </div>
                  <div className="location-form-1-champ-section">
                  <label>Commune</label>
                      <select>
                      {
                        /** This is where we have used our options variable 
                          options
                      }
                      </select>
                  </div> */}
                  <div className="location-form-1-champ-section" >
                  <label style={{width :"100%",}}>Adresse du bien (Vous pouvez l'indiquer avec le marqueur rouge sur la map)</label>

                  {/* <input style={{width:"97%",height:"30px",paddingLeft:16,}} type='text' placeholder="Quartier,Ville,Wilaya" ref={originRef} onChange={handleMapChange} name="Address"/> */}
                    {/* </Autocomplete> */}
                    <Autocomplete 
                    apiKey= {process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
                    style={{width:"95%",height:"30px",paddingLeft:16,}}
                    types={['(regions)']}
                    onPlaceSelected={onPlaceSelected}
                    />
                  
                  <div className="location-form-1-champ-map">
                    <div style={{width:"100%",height:"250px"}}>
                    <GoogleMap center = {{lat : mapLocation.mapPosition.lat ,lng : mapLocation.mapPosition.lng }} zoom = {mapLocation.zoom} mapContainerStyle={{width: '100%', height: '100%'}} options ={{zoomcontrol: false,streetViewControl: false,mapTypeControl:false,fullscreenControl:false}}>
                    {/* <Marker position ={{lat : mapLocation.markerPosition.lat ,lng : mapLocation.markerPosition.lng }} draggable ={true} onDragEnd={onMarkerDragEnd}/>  */}
                    <MarkerF position ={{lat : mapLocation.markerPosition.lat ,lng : mapLocation.markerPosition.lng }} draggable ={true} onDragEnd={onMarkerDragEnd} /> 
                    </GoogleMap>
                    </div>
                  </div>
                  </div>
                </div>
            </div>
            <div className="sub-container" >
                <div className="sub-container-entete"><label className="sub-container-entete-label">DESCRIPTION* : </label></div>
                <div className="description-section"><textarea  style = {{padding:"10px"}}className="description-area"  onChange={handleChange} name="description"/></div>
            </div>
            </div>
    </div>
            </>
  )
}
const DeposerAnnonce = () => {
  
const [page,setPage] = useState(0);
const [data, setData] = useState({
    typeDeTransaction : "VENTE",
    typeDuBien :"appartement",
    surface : 0,
    prix :0,
    location:{},
    description :"",
  })
const [photos,setPhotos]= useState([])
const PageDisplay = ()=> {
  if (page === 0) {
    return <FormPage1 data={data} setData={setData} />
  }else {
    return <DeposerPhotos data={data} setData={setData} passPhotosToParent = {setPhotos}/>
  }
}
  const handleSubmit = (event) => {
    const formData = new FormData();
    const jsonFile = JSON.stringify(data);
    formData.append('annonce', jsonFile);
    // console.log(jsonFile)
    formData.append('images', photos)
  // event.preventDefault();
  const ddata = {data,photos}
  console.log("the photos and the data are ")
  console.log(data)
  console.log(photos)
  console.log("the form data = ")
  console.log(formData)
  console.log("Ddata")
  console.log(ddata)
  axios.post("http://172.20.10.3:8000/annonces/ajouter", ddata)    
  .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    })
};
  // console.log(inputs);


  return (
    <>
        {PageDisplay()}
        <button className="continuer"
          disabled = {page === 0}
          onClick={()=>{setPage((currPage)=>currPage-1)}}>
          Retour
        </button>
        <button className="continuer" 
          // disabled = {page === 1}
          onClick={(event)=>{
            setPage((currPage)=>currPage+1)
            // console.log(photos)
            if (page){
              handleSubmit(event);
            }
            }}>
            { (page) ? <Link to="/MonCompte/MesAnnonces" className="nav-container-center-icons-icon">Terminer</Link> : <>Continuer</>}
        </button>
    </>
  )
}

export default DeposerAnnonce;