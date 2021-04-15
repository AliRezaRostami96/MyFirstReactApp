import React from 'react';
import ShowPet from './showPet';

const SearchResult = ({ pets }) => {
    console.log("SearchResult");
    console.log(pets);
    return (
        <div className="search-result">
            {
                pets.length === 0 ? (
                    <h1>No Pets Found</h1>
                ) : (
                    pets.map(pet => (
                        <ShowPet
                            animal={pet.type}
                            key={pet.id}
                            name={pet.name}
                            breed={pet.breeds.primary}
                        // media={pet.photos}
                        // location={`${pet.contact.address.city}, ${pet.contact.address.state}`}
                        // id={pet.id}
                        />
                    ))
                )
            }
        </div>
    )
}

export default SearchResult;