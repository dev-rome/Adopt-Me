import Pet from "./Pet";

interface IPet {
  id: number;
  name: string;
  animal: string;
  breed: string;
  images: string[];
  city: string;
  state: string;
}

interface ResultsProps {
  pets: IPet[];
}

const Results = ({ pets }: ResultsProps) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
            key={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
