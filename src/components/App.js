/**
 * Fichier principal du code
 * @file
 * @author Vincent LE GOFF
 * @version 0.0.1
 */

//On importe ce qui est nécessaire
import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import Map from "./Map";
import "../styles/App.css";

/**
 * Notre application qui va retourner du HTML
 * @returns {HTMLelement}
 */
function App() {
  const [center, setCenter] = useState([43.61074631597313, 3.8666064112801197]);

  //Gestion de l'URL de l'API
  var u =
    "https://sportihome.com/api/spots/getAllMarkersInBounds/-85.05112900000015,-385.2417626795645/85.05112900000006,163.2430935830218";
  const saveURL = localStorage.getItem("resURL");
  const [url, setURL] = useState(saveURL ? JSON.parse(saveURL) : u);
  useEffect(() => {
    localStorage.setItem("resURL", JSON.stringify(url));
  }, [url]);

  //Gestion du tableau de valeur en fonction de l'API
  const save = localStorage.getItem("resAPI");
  const [tab, setTab] = useState(save ? JSON.parse(save) : []);
  useEffect(() => {
    localStorage.setItem("resAPI", JSON.stringify(tab));
  }, [tab]);

  /**
   * Variable qui permettra de gérer les favoris de l'utilisateur
   */
  // const [favHobbies, setFavHobbies]=useState([])

  //On effectue l'appel à l'API à chaque fois que l'URL change
  useEffect(() => {
    fetch(url, {
      method: `POST`,
      headers: {
        authorization: "BaseAuth W1lcmxsa=",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        setTab(res);
        localStorage.setItem("resAPI", JSON.stringify(tab));
      });
  }, [url]);

  return (
    <div className="container">
      <div className="row">
        <SearchBar url={url} setURL={setURL} tab={tab} setTab={setTab} />
        <Cards tab={tab} setTab={setTab} />
        <div className="col-md-6 mx-auto text-center">
          <Map
            center={center}
            setCenter={setCenter}
            url={url}
            setURL={setURL}
            tab={tab}
            setTab={setTab}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
