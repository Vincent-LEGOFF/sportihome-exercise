/**
 * Contient la fonction Map et la rend disponible en export par défaut.
 * @file
 * @author Vincent LE GOFF
 * @version 0.0.1
 */

//On importe ce qui est nécessaire
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import '../styles/Map.css'

//Ici on rentre la clé de l'API Mapbox
mapboxgl.accessToken =
  'pk.eyJ1IjoidmluY2VjZGF3MjAyMCIsImEiOiJja25xYTI2MGkwMzE2MnBudDA4ZWdvYW01In0._AcUUDnpui7l-H11UkvAlg';

/**
 * Fonction qui va générer la map
 * @param {string} url 
 * @param {Array} tab
 * @param {Array} center
 * @returns {HTMLelement}
 */
export default function Map({url, setURL, center, setCenter, tab, setTab}){
   
  /**
   * Fonction qui permet de mettre uniquement la première lettre d'un string en maj
   * @param {string} str 
   * @returns 
   */
  function strUcFirst(str){
    let s=str.charAt(0).toUpperCase()
    str=str.toLowerCase().substr(1)
    s+=str
    let aux=""
    for(let i=0; i<s.length;i++){
        if(s.charAt(i)==="_"){
            aux+=" "
        }else{
            aux+=s.charAt(i)
        }
    }
    return aux;
  }

  const mapContainerRef = useRef(null);
  const [lat, setLat] = useState(center[0]);
  const [lng, setLng] = useState(center[1]);
  const [zoom, setZoom] = useState(8);

  // On initilalise notre carte
  useEffect(() => {

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // map.options
    map.setMaxZoom(10)

    // Ajout des outils de zoom
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    //Ajout du bouton de géolocalisation
    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showAccuracyCircle:false
        
      }));
    
    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

  
    /**
     * Ajout de markers
     */
    tab.map((id)=>{
        var popup = new mapboxgl.Popup({closeButton:false }).setHTML(
          "<p>"+id.name+"</p>"+"<p>"+strUcFirst(id.hobby)+"</p>"
          );

        popup.on('open',function(){
          window.location.href="#heading-"+id._id;
          document.querySelector("#heading-"+id._id+">h5>button").className = "accordion-button collapsed p-2 ps-1 bg-info text-light";
        })

        popup.on('close',function(){
          document.querySelector("#heading-"+id._id+">h5>button").className = "accordion-button collapsed p-2 ps-1";
        })

        var marker = new mapboxgl.Marker().setLngLat(id.loc.coordinates).setPopup(popup).addTo(map)
        return marker
    })

    /**
     * Au clic sur le bouton on rafraichit les données qui peuvent apparaître sur la map 
     */
    document.querySelector("#refreshMap").onclick = ()=>{
      var ne = map.getBounds().getNorthEast()
      var sw = map.getBounds().getSouthWest()
      var link='https://sportihome.com/api/spots/getAllMarkersInBounds/'+sw.lng+','+sw.lat+'/'+ne.lng+','+ne.lat
      setURL(link)
    } 

    return () => map.remove();
    
  },[tab,url]); // eslint-disable-line react-hooks/exhaustive-deps
  


  return (
    <div className="w-100">
      <button id="refreshMap" className="btn btn-info text-light p-1 px-2 mb-1 text-align-right">Refresh</button>     
      <div className='map-container' ref={mapContainerRef} ></div>
    </div>
    
  );
};
