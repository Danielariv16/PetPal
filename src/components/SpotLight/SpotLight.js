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


    const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5V3p4eFdzWHJkdUdkZG5XM1RkZGM0TW95TjVkMHdOSWI5V0ZScUxuWEM4NG4zaDhlZiIsImp0aSI6IjY3YzczYWFkMDRhNDM1YzI2YjU0MWQ3ZmIzMjQwNTEyYjYwN2VkOWYyOTk0YzFjZDNiNDZmM2M1NTI2MTViYWY4NTdjMDNjM2YzYjA1NmRiIiwiaWF0IjoxNzAxMjA2NzYwLCJuYmYiOjE3MDEyMDY3NjAsImV4cCI6MTcwMTIxMDM2MCwic3ViIjoiIiwic2NvcGVzIjpbXX0.JHnX88S5z27bEPrHPXefqcnmzyG4NfSMHYdoq828R0R3MMo0kvNAE9HnmodJqp7Gi1T3m3JzF7mafl3dlbCN3ItMiYShsFPSocP9-hpoWs0dogN40Vgr0CykZFfMjl49P4IPZ09NjMcXB__lWijCXt35912z5C0uSd-ARwKn75_tu9BNUhnsL3cYTFIpcebIuohtHlHh5iSNvmkutvnkp8UXFidaVAQvJQGpVHNZED70g-tE2may8df9YEUelhYQvsh6Mzzwp3zrMk_SG4VRH-mSdov6xNwOnCAexBPN9s4MZ6yM-RUsUzLzSD9jvXgDGI6obbEFdylr_G3Uc_GLlQ";

    const apiUrl = 'https://api.petfinder.com/v2/animals';
    console.log(adoptionPets)


    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setAdoptionPets(response.data.animals);
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
            }
        };
        
            
        getData()

    }, [])

    const handleNext = () => {
        setCurrentPetIndex((prevIndex) => (prevIndex + 1) % adoptionPets.length);
      };

    return (
        <>
          <Header />

          <section className='spot_light'>
            <h2 className='spot_light-title'>Meet Our Furry Friends</h2>
            {adoptionPets.length > 0 && (
              <div className='spot_light-container'>
                <img
                  className='spot_light-image'
                  src={adoptionPets[currentPetIndex].photos[0]?.medium || noPhoto}
                  alt={adoptionPets[currentPetIndex].name}
                />
                <h5 className='spot_light-name'>{adoptionPets[currentPetIndex].name}</h5>
                <p className='spot_light-descriptionPet'>{adoptionPets[currentPetIndex].description}</p>
                <div className='spot_light-buttons'>
                    <a
                        href={adoptionPets[currentPetIndex].url}
                        target="_blank" 
                        rel="noopener noreferrer" 
                    >
                        <button className='spot_light-interested'>Want to learn more about {adoptionPets[currentPetIndex].name}? Click here</button>
                    </a>
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