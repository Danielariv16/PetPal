import Header from '../Header/Header';
import './Porfile.scss';
import porfileEdit from '../images/edit.png';
import addPic from '../images/add.png'
import { Link } from 'react-router-dom';

function Porfile(){
    return (
        <>
        <Header />
        <section className='porfile_section'>
            <div className='porfile_section-container1'>
                <div className='porfile_section-aboutYou'>
                    <h4 className='porfile_section-name'>Daniela</h4>
                    <p className='porfile_section-about'>
                        Major es amante a cazar, le gusta dormir y comer mucho
                    </p>
                </div>
                <div className='porfile_section-porfilePic'>
                    <div  className='porfile_section-pic'></div>
                    {/* <img className='porfile_section-pic'></img> */}
                </div>
            </div>
                <div className='porfile_section-buttons'>
                    <img className='porfile_section-edit' src={porfileEdit}></img>
                    <Link to={'/add-post'}>
                        <img className='porfile_section-add' src={addPic}></img>
                    </Link>
                </div>
                <section className='pictures'>
                    {/* <img className='images'></img> */}
                    <div className='images'></div>
                </section>
        </section>
        </>
    )
}

export default Porfile