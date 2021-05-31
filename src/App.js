import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

/*
Instructions:
Recreate https://dog.ceo/dog-api/breeds-list
1) Create a dropdown that will show all the main dog breeds
   API for dog names: https://dog.ceo/api/breeds/list/all
2) Once a breed is selected, render an image based off the selected breed
3) When the Fetch! button is clicked, the application should grab and
   render a different image for the selected breed.
*/

export default function App() {
  const [breeds, setBreeds] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedBreed, setSelectedBreed] = useState("");

  useEffect(() => {
    axios
      .get("https://dog.ceo/api/breeds/list/all")
      .then((res) => res.data)
      .then((resData) => {
        setBreeds(Object.keys(resData.message));
        return Object.keys(resData.message);
      })
      .then((breeds) => {
        const firstBreed = breeds[0];
        fetchImage(firstBreed);
        setSelectedBreed(firstBreed);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchImage = async (breedName) => {
    axios
      .get(`https://dog.ceo/api/breed/${breedName}/images/random`)
      .then((res) => setImageUrl(res.data.message))
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    fetchImage(e.target.value);
    setSelectedBreed(e.target.value);
  };

  const dropDown = (
    <select onChange={handleChange}>
      {breeds.map((breedName, i) => (
        <option value={breedName} key={i}>
          {breedName}
        </option>
      ))}
    </select>
  );

  return (
    <div className="App">
      <h1>Breed List</h1>
      <h2>https://dog.ceo/api/breed/{dropDown}/images/random</h2>
      <button className="button" onClick={() => fetchImage(selectedBreed)}>
        Fetch!
      </button>
      <img className="image" alt={selectedBreed} src={imageUrl} />
    </div>
  );
}
