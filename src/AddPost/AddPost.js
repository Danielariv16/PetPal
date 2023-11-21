import Header from '../Header/Header';
import './AddPost.scss';
import share from '../images/share.png';
import arrow from '../images/arrow.png';


function AddPost(){

    const handleBackClick = () => {
        window.history.back();
          };

    return (
        <>
        <Header />
        <div className='comments_back'>
            <button className='button-back 'onClick={handleBackClick}>
                <img className='comments_section-arrow'src={arrow} alt='back arrow'></img>
            </button>
            <p className='back'>Back</p>
        </div>
        <section className='add_post'>
            <h6 className='add_post-addImg'>ADD YOUR IMAGE</h6>
            <h6 className='add_post-addDesc'>ADD DESCRIPTION</h6>
            <button className='add_post-share'>Share <img className='share-image'src={share}></img> </button>

        </section>
        </>
    )
}

export default AddPost