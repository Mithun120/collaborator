import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clients = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch the images from the server
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:4000/clientapi/clientget');
      setImages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <h3>Our clients!</h3>
      {images.map((image) => (
        <img
          key={image._id}
          src={image.clientImg}
          alt="Client"
          style={{ width: '200px', height: '200px', margin: '10px' }}
        />
      ))}
    </div>
  );
};

export default Clients;
