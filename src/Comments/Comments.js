import arrow from '../images/icons8-arrow-24.png';
import './Comments.scss';

function Comments(){
    return (
        <section className='comments_section'>
            <div className='comments_section-nav'>
                <div className='comments_back'>
                    <img src={arrow} alt='back arrow'></img>
                    <p className='back'>Back</p>
                </div>
            <h5 className='comments_title'>COMMENTS</h5>
            </div>


        </section>
    )
}

export default Comments 