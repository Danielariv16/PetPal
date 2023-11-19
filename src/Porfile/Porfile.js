import Header from '../Header/Header';
import './Porfile.scss';
import porfileEdit from '../images/icons8-registration-30.png';
import addPic from '../images/icons8-add-30.png'

function Porfile(){
    return (
        <>
        <Header />
        <section className='porfile_section'>
            <div className='porfile_section-container1'>
                <div className='porfile_section-aboutYou'>
                    <h6 className='porfile_section-name'>Daniela</h6>
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
                    <img className='porfile_section-add' src={addPic}></img>
                </div>
        </section>
        </>
    )
}

export default Porfile