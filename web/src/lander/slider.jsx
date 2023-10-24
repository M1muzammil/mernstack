import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Carousel } from 'react-bootstrap';
import mmm from '../lander/image/mmm.jpeg'
import mmmm from '../lander/image/mmmm.jpeg'
import mmmmm from '../lander/image/mmmmm.jpeg'
function Slider() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={mmm}
          alt="First slide"
          height={300}
        
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={mmmm}
          alt="Second slide"
          height={300}
          
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={mmmmm}
          alt="Third slide"
          
          height={300}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
