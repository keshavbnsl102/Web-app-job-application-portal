import React from "react"
const CatInput = (props) => {
  return (
    props.education.map((val, idx)=> {
      let catId = `insti-${idx}`, ageId = `start-${idx}`, yoyo= `end-${idx}`
      return (
        <div key={idx}>
          <label htmlFor={catId}>{`Institute #${idx + 1}`}</label>
          <input
            type="text"
            name={catId}
            data-id={idx}
            id={catId}
            value={props.education[idx].Institute} 
            className="Institute"
          />
          <br />
          <label htmlFor={ageId}>Startyear</label>
          <input
            type="text"
            name={ageId}
            data-id={idx}
            id={ageId}
            value={props.education[idx].Startdate} 
            className="Startdate"
          />
          <br />
          <label htmlFor={yoyo}>Endyear</label>
          <input
            type="text"
            name={yoyo}
            data-id={idx}
            id={yoyo}
            value={props.education[idx].Enddate} 
            className="Enddate"
          />
        </div>
      )
    })
  )
}
export default CatInput