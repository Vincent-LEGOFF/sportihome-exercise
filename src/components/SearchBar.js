/**
 * Contient la fonction Map et la rend disponible en export par défaut.
 * @file
 * @author Vincent LE GOFF
 * @version 0.0.1
 */

//On importe ce qui est nécessaire
import { sportsList } from '../datas/sportsList'
import '../styles/SearchBar.css'

/**
 * Fonction qui va générer
 * @param {string} url 
 * @param {Array} tab
 * @returns {HTMLelement}
 */
export default function SearchBar({url, setURL,tab, setTab}){

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

    /**
     * Au clic sur le bouton valider, on filtre les données
     * @param e 
     * @returns {void}
     */
    function handleSubmit(e){
        //On n'envoie pas le formulaire
        e.preventDefault()
        //On récupère toutes les checkbox que l'on a coché
        var sports=document.querySelectorAll('input[type=checkbox]:checked')         
        var aux=[]

        sports.forEach(function(sport){
            aux.push(sport.name)
        })

        if(aux.length!==0){  

            var u='https://sportihome.com/api/spots/getAllMarkersInBounds/-85.05112900000015,-385.2417626795645/85.05112900000006,163.2430935830218'
            const saveURL=localStorage.getItem('resURL')          
            setURL(saveURL ? JSON.parse(saveURL) : u)
    
            var aux2=[]
            tab.map((act)=>{
                aux.map((filtre)=>{
                    if(act.hobby==filtre){
                        aux2.push(act)
                    }
                })
            })

            setTab(aux2)

        }else{
            setURL('https://sportihome.com/api/spots/getAllMarkersInBounds/-85.05112900000015,-385.2417626795645/85.05112900000006,163.2430935830218')
            console.log(tab)
        }
    }

    return (
        <div className="col-md-12 row mb-3">
            <div className="col-md-6 row">
                <form className="row" method="POST" onSubmit={handleSubmit}>
                    <div className="dropdown w-50 p-0">
                        <div className="maxHSearchbar btn btn-info rounded-0 rounded-start border border-dark border-1 text-light p-1 px-2 w-100 dropdown-toggle" >
                            Filtrer par sports
                            <div className="overflow-auto bg-info text-light mt-1">
                            {sportsList.map((val)=>{
                                return (
                                <div key={val} >
                                    <label placement="bottom-start" data-popper-placement="bottom-start"> <input type="checkbox" className="me-3" id={val} name={val} value={strUcFirst(val)} key={val} />
                                    {strUcFirst(val)}</label>
                                </div>
                                )
                            })}
                            </div>
                        </div> 
                    </div>
                    <div className="w-auto p-0">
                      <button className="p-1 px-2 rounded-end border-1 bg-info text-light" type="sumit">valider</button>
                    </div>
                </form>
            </div>
        </div>
    )
}