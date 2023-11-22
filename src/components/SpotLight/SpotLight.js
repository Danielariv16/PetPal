import Header from '../Header/Header';
import './SpotLight.scss'
import zeldris from '../images/Untitled design.jpg'

function SpotLight(){
    return (
        <>
        <Header />
        <section className='spot_light'>
            <h2 className='spot_light-title'>Meet Our Furry Friends</h2>
            <div className='spot_light-container'>
                <img className='spot_light-image' src={zeldris}></img>
                <h5 className='spot_light-name'>Zeldris</h5>
                <p className='spot_light-descriptionPet'>
                    Cute,  Intelligent,  Large,  Playful, 
                    Happy,  Affectionate
                    Spot is an amazing dog.</p>
                    <button className='spot_light-buttonLink'>Link</button>
            </div>
            {/* <div className='purpose'>
                <p className='spot_light-purpose'>At PetPal, we believe in creating a world where every pet has a loving home. Our Pet Adoption Spotlight is more than just a feature – it's a commitment to making a positive impact on the lives of pets and their future families.</p>

            </div> */}
        </section>
        </>
    )
}

export default SpotLight;