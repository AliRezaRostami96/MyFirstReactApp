import React, { useEffect, useState } from 'react';
import useDropDown from '../myHooks/useDropDown';
import pet, { ANIMALS } from '@frontendmasters/pet';
import SearchResult from './searchResult';
const ChooseReact = () => {
    const newAnimalOptionsList = ANIMALS.map((name) => { return { optionName: name, value: name } });
    const [animal, AnimalDropDown] = useDropDown("animalSelectBox", "Select Animal", newAnimalOptionsList, "dog");
    const [breeds, setBreeds] = useState([]);
    const [breed, BreedDropDown, setBread] = useDropDown("breedSelectBox", "Select Breed", breeds, "");
    const [pets, setPets] = useState([]);
    const [location, setLocation] = useState("Seattle, WA");
    async function searchAnimals() {
        const { animals } = await pet.animals({ location, breed, type: animal });
        console.log("searchAnimals");
        console.log(animals);
        setPets(animals);
    }
    useEffect(() => {
        setBreeds([]);
        setBread("");
        pet.breeds(animal).then(
            ({ breeds }) => {
                if (breeds && breeds.length > 0) {
                    const newBreedOptionsList = breeds.map(({ name }) => { return { optionName: name, value: name } });
                    setBreeds(newBreedOptionsList);
                } else {
                    alert("sorry FronEndMasters Server not response")
                }
            }, console.error);
    }, [animal]);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            searchAnimals();
        }}>
            <h3>Choose Your Pet</h3>
            <div>
                <label htmlFor="location">
                    Location:
                    <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} />
                </label>
                <br />
                <AnimalDropDown />
                <br />
                <BreedDropDown />
                <br />
                <button type='submit'>search</button>
                <br />
                <SearchResult pets={pets} />
            </div>
        </form>
    )
}

export default ChooseReact;