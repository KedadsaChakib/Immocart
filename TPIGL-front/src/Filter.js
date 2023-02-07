import React, { useState,useEffect } from "react";
import "./Filter.css"
import data  from "../../../algeria_cities.json"
const Filter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [period, setPeriod] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform search based on the selected filters
    console.log(
      `Searching for "${searchTerm}" in "${category}" "${city}" "${region}" "${type}" "${period}"`
    );
  };


  return (
    <form onSubmit={handleSubmit} className="form">
      <select value={category} className="category" onChange={(e) => setCategory(e.target.value)}>
        <option value="">Catégorie</option>
        <option value="category1"></option>
        <option value="category2"></option>
        <option value="category3"></option>
      </select>
      <select value={city} className="city" onChange={(e) => setCity(e.target.value)}>
        <option value=""> Wilaya</option>
        {data.map(item => (
                 <option key={item.id} value="region1">{item.wilaya_name}</option>
        ))}
      </select>
      <select value={region} className="region" onChange={(e) => setRegion(e.target.value)}>
        <option value="">Commne</option>
        {data.map(item => (
                 <option key={item.id} value="region1">{item.commune_name}</option>
        ))}

        {/*<option value="region1">Region 1</option>
        <option value="region2">Region 2</option>
        <option value="region3">Region 3</option>*/}
      </select>
      <select value={type} className="type" onChange={(e) => setType(e.target.value)}>
        <option value="">Type</option>
        <option value="type1">Type 1</option>
        <option value="type2">Type 2</option>
        <option value="type3">Type 3</option>
      </select>
      <select value={period} className="period" onChange={(e) => setPeriod(e.target.value)}>
        <option value="">périodes</option>
        <option value="period1">Period 1</option>
        <option value="period2">Period 2</option>
        <option value="period3">Period 3</option>
      </select>
    </form>
  );
};

export default Filter;
