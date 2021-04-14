import React, { useEffect, useState } from 'react';
import useDropDown from '../myHooks/useDropDown';
import pets, { ANIMALS } from '@frontendmasters/pet';
const ChooseReact = () => {
    const newAnimalOptionsList = ANIMALS.map((name) => { return { optionName: name, value: name } });
    const [animal, AnimalDropDown] = useDropDown("animalSelectBox", "Select Animal", newAnimalOptionsList, "dog");
    const [breeds, setBreeds] = useState([]);
    const [breed, BreedDropDown, setBread] = useDropDown("breedSelectBox", "Select Breed", breeds, "");
    useEffect(() => {
        setBreeds([]);
        setBread("");
        pets.breeds(animal).then(
            ({ breeds }) => {
                if(breeds && breeds.length > 0) {
                    const newBreedOptionsList = breeds.map(({ name }) => { return { optionName: name, value: name } });
                    setBreeds(newBreedOptionsList); 
                } else {
                    alert("sorry FronEndMasters Server not response")
                }
            }, console.error);
    }, [animal]);

    return (
        <form>
            <h3>Choose Your Pet</h3>
            <div>
                <AnimalDropDown />
                <br />
                <BreedDropDown />
            </div>
        </form>
    )
}

export default ChooseReact;