/**
 * Contient la fonction Map et la rend disponible en export par défaut.
 * @file
 * @author Vincent LE GOFF
 * @version 0.0.1
 */

/**
 * Génération de la section de description des activités
 * @param {Array} tab 
 * @returns {HTMLelement}
 */
export default function Cards({tab, setTab}){

  return (
    <div className="col-md-5 row overflow-auto p-1 pe-2 mx-2 accordion" style={{height:"80vh", border:"1px solid #acabab"}}>
      {tab.map((id)=>{
        return (
          <div id={"heading-"+id._id} key={"heading-"+id._id} className="card w-100 m-1 accordion-item px-0">
            <h5 className="accordion-header">
              <button className="accordion-button collapsed p-2" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse-"+id._id} aria-expanded="false" aria-controls={id._id}>
                {id.name} - {id.hobby}
              </button>
            </h5>
            <div id={"collapse-"+id._id} className="accordion-collapse collapse">
              <div className="accordion-body">
                {id.about}
              </div>
            </div>
          </div>
        )
      })}
      </div>
  )
}