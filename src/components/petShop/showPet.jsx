import React from 'react';

const ShowPet = ({animal, name, breed}) => {
    return (
        <div className="pet">
            <h2>{name}</h2>
            <h3>{animal}</h3>
            <h3>{breed}</h3>
            <hr/>
        </div>
    )
}
export default ShowPet;