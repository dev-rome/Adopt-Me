import { useState } from "react";

const Carousel = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  const handleImageClick = (image) => {
    setActiveImage(image);
  };

  return (
    <div className="carousel">
      <img src={activeImage} alt="animal" />
      <div className="carousel-smaller">
        {images.map((photo) => (
          <img
            key={photo}
            src={photo}
            className={photo === activeImage ? "active" : ""}
            alt="animal thumbnail"
            onClick={() => handleImageClick(photo)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
