import Header from '../Header/Header';
import './SpotLight.scss'
import next from '../../images/next.png';
import noPhoto from '../../images/no-photo.png'
import axios from 'axios';
import {useEffect, useState} from 'react'
import { Link } from "react-router-dom";



function SpotLight(){

    const [adoptionPets, setAdoptionPets] = useState([])
    const [currentPetIndex, setCurrentPetIndex] = useState(0);

    useEffect(() => {
      const petData = require('../../pets.json');
      setAdoptionPets(petData);
    }, []);



    const handleNext = () => {
        setCurrentPetIndex((prevIndex) => (prevIndex + 1) % adoptionPets?.length);
      };

    return (
        <>
          <Header />

          <section className='spot_light'>
            <h2 className='spot_light-title'>Meet Our Furry Friends</h2>
            {adoptionPets?.length > 0 && (
              <div className='spot_light-container'>
                <img
                  className='spot_light-image'
                  src={adoptionPets[currentPetIndex].photos[0]?.medium || noPhoto}
                  alt={adoptionPets[currentPetIndex].name}
                />
                <h5 className='spot_light-name'>{adoptionPets[currentPetIndex].name}</h5>
                <p className='spot_light-descriptionPet'>{adoptionPets[currentPetIndex].description}</p>
                <div className='spot_light-buttons'>
                  <div className='spot_light-learn'>
                    <p className='spot_light-interested'>Want to learn more about {adoptionPets[currentPetIndex].name}?   
                      <a
                          href={adoptionPets[currentPetIndex].url}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className='click-here'
                          > Click here</a>
                      </p>

                  </div>
                    <button className='spot_light-buttonLink' 
                    onClick={handleNext}>
                    <img alt='next image' src={next} 
                    className='spot_light-buttonNext'>
                    </img>
                    </button>
                </div>
              </div>
            )}
          </section>
        </>
      );
}

export default SpotLight;