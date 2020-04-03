import React from 'react';
import { Link } from 'react-router-dom';
import landingImg from '../../templates/images/landing.png';
import posterImg from '../../templates/images/poster.png';
export default () => {
    return (
        <main>
            <section id='landing' className='padded'>
                <div className='container'>
                    <div className='row justify-content-between'>
                    <div className='col-lg-6'>
                        <h1>Freelance Graphic Designer</h1>
                        <p>Bootstrap includes a wide range of shorthand responsive margin and padding utility classes to modify an element’s appearance.</p>
                        <Link className='btn btn-primary' to='hire-me'>Hire me</Link>
                    </div>
                    <div className='col-lg-5'>
                        <img src={landingImg}  alt='landing-image'/>
                    </div>
                    </div>
                </div>    
            </section> 

            <section id='services' className='padded'>
                <div className='container'>
                    <h2>What can I offer?</h2>
                    <div className='row'>
                        <div className='row'>
                            <div className='col-4'>
                                <img src={posterImg} alt='poster-image' />  
                            </div> 
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}