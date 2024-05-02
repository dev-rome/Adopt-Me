interface IPetProps {
  name: string;
  animal: string;
  breed: string;
  id: number;
}

const Pet = ({ name, animal, breed }: IPetProps) => {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{animal}</h2>
      <h2>{breed}</h2>
    </div>
  );
};

export default Pet;
