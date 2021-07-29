import React from "react"
const CatInpu = (props) => {
  return (
    props.skill.map((val, idx)=> {
      let catId = `cat-${idx}`, ageId = `age-${idx}`
      return (
        <div key={idx}>
          <label htmlFor={catId}>{`Skill/language #${idx + 1}`}</label>
          <input
            type="text"
            name={catId}
            data-id={idx}
            id={catId}
            value={props.skill[idx].id} 
            className="id"
          />
        </div>
      )
    })
  )
}
export default CatInpu