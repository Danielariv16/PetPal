import arrow from '../images/arrow.png';
import './Comments.scss';


function Comments(){


    const handleBackClick = () => {
    window.history.back();
      };
    
    return (
        <section className='comments_section'>
            <div className='comments_section-nav'>
                <div className='comments_back'>
                <button className='button-back 'onClick={handleBackClick}>
                    <img className='comments_section-arrow'src={arrow} alt='back arrow'></img>
                </button>
                    <p className='back'>Back</p>
                </div>
            <h5 className='comments_title'>COMMENTS</h5>
            </div>
            <div className='all_comments'>
                {/* <img className='comments_section-profile'></img> */}
                <div className='comments_section-profile'></div>
                <div className='all_comments-commentName'>
                    <h6 className='all_comments-name'>Daniela</h6>
                    <p className='post-comment'>Me encanto estoo onsdoSADNInbdsibDIJBED
                    QHWDBqhwdbiuQWBDLabdw
                    wdbkhBDWiuqwbduiqbdwiqnLDHUWQHD
                    JBDIUAhebdiubBDIHDWBIUWB</p>
                    
                </div>
            </div>
            <footer className='footer'>
                <textarea className='comment-input' placeholder='Add a comment for ...'></textarea>
            </footer>
        </section>
    )
}

export default Comments 