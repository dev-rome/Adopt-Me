import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Modal from "../components/Modal";
import AdoptedPetContext from "../context/AdoptedPetContext";
import fetchPet from "../services/fetchPet";
import Carousel from "../components/Carousel";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const [, setAdoptedPet] = useContext(AdoptedPetContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const results = useQuery({ queryKey: ["details", id], queryFn: fetchPet });

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <h1>{pet.name}</h1>
      <h2>
        {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
      </h2>
      <p>{pet.description}</p>
      {showModal ? (
        <Modal>
          <div>
            <h1>Would you like to adopt {pet.name}?</h1>
            <div className="buttons">
              <button
                onClick={() => {
                  setAdoptedPet(pet);
                  navigate("/");
                }}
              >
                Yes
              </button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      ) : null}
      <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
    </div>
  );
};

export default Details;
