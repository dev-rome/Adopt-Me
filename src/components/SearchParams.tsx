import { useState, useEffect } from "react";
import useBreedList from "../hooks/useBreedList";
import Results from "./Results";

interface IPetProps {
  id: number;
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
  city: string;
  state: string;
}

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState<IPetProps[]>([]);
  const [breeds] = useBreedList(animal);

  const url = `https://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    requestPets();
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleAnimalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnimal(e.target.value);
    setBreed("");
  };

  const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBreed(e.target.value);
  };

  const requestPets = async () => {
    try {
      const res = await fetch(url);
      const json = await res.json();
      setPets(json.pets as IPetProps[]);
    } catch (error) {
      console.error("Failed to fetch pets:", error);
      setPets([]);
    }
  };

  useEffect(() => {
    requestPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="search-params">
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">
          Location
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
            value={location}
            onChange={handleLocationChange}
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
          <select
            name="breed"
            id="breed"
            disabled={!breeds.length}
            value={breed}
            onChange={handleBreedChange}
          >
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
