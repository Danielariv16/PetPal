import Header from '../Header/Header';
import './AddPost.scss';
import share from '../images/share.png';

function AddPost(){
    return (
        <>
        <Header />
        <section className='add_post'>
            <h6 className='add_post-addImg'>ADD YOUR IMAGE</h6>
            <h6 className='add_post-addDesc'>ADD DESCRIPTION</h6>
            <button className='add_post-share'>Share <img className='share-image'src={share}></img> </button>

        </section>
        </>
    )
}

export default AddPost