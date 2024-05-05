interface IPetProps {
  id: number;
  name: string;
  animal: string;
  breed: string;
  images: string[];
  location: string;
}

const Pet = ({ name, animal, breed, images, location, id }: IPetProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{animal}</h2>
      <h2>{breed}</h2>
    </div>
  );
};

export default Pet;
