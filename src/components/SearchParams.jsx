import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "../hooks/useBreedList";
import fetchSearch from "../services/fetchSearch";
import Results from "./Results";
import AdoptedPetContext from "../context/AdoptedPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery({
    queryKey: ["search", requestParams],
    queryFn: fetchSearch,
  });
  const pets = results.data?.pets ?? [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const obj = {
      location: fromData.get("location"),
      animal: fromData.get("animal"),
      breed: fromData.get("breed"),
    };
    setRequestParams(obj);
  };

  const handleAnimalChange = (e) => {
    setAnimal(e.target.value);
  };

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            value={animal}
            onChange={handleAnimalChange}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select name="breed" id="breed" disabled={!breeds.length}>
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>

      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
