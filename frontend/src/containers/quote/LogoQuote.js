import React, { useState } from 'react'
import { BackButton } from '../../components/buttons'


function LogoQuote() {
    const [deadline, setDeadline] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [finalPrice, setFinalPrice] = useState(100)
    return (
        <>
            <div className='col-8'>
                <BackButton warn={true} />

                <h2 className='mt-4'>Logo Quote</h2>
                <p>Lets get started on your logo quote.</p>

                <form>
                    <div className='form-group'>
                        <label>Company name</label>
                        <input className='form-control'
                            type='text'
                            onChange={e => setCompanyName(e.target.value)}
                            value={companyName} />
                    </div>

                    <div className='form-group'>
                        <label>Is there a specific deadline for this project?</label><br />
                        <div className="form-check form-check-inline">
                            <input name='deadline'
                                onChange={() => setDeadline(true)}
                                className="form-check-input"
                                type="radio" id="inlineCheckbox2" />
                            <label className="form-check-label">Yes</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                name='deadline'
                                onChange={() => setDeadline(false)}
                                className="form-check-input" type="radio" />
                            <label className="form-check-label">No</label>
                        </div>
                    </div>
                    {deadline && (
                        <div className='form-group'>
                            <label>Select a date</label><br />
                            <input type='date' />
                        </div>
                    )}
                </form>
            </div>
            <div className='col'>
                <h4>Your quote</h4>
                <div className='card p-2'>

                    <ul className='list-group '>
                        <li className='list-group-item'>
                            Company name: {companyName.toUpperCase()}
                        </li>
                        <li className='list-group-item'>
                            Deadline: {!deadline ? 'No' : 'Select a date.'}
                        </li>

                    </ul>

                    <h5 className='mt-4'>Estimated price: €{finalPrice}</h5>

                </div>
            </div>
        </>
    )
}


export default LogoQuote;