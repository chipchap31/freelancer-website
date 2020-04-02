import React from 'react';
import { Link } from 'react-router-dom';
import landingImg from '../../public/images/landing.png'
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
                <div class="card">
                <div class="card-body">
                <h5 class="card-title">Icons</h5>
                    This is some text within a card body.
                </div>
                </div>
                </div>
                </div>
            </section>
        </main>
    )
}