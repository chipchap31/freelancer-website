import React, { useState } from 'react'
import { BackButton } from '../../components/buttons'
import moment from 'moment';

function LogoQuote() {
    const [deadline, setDeadline] = useState(false);

    const [state, setState] = useState({
        prototype: 1,
        deadline: false
    })


    const [finalPrice, setFinalPrice] = useState(125);

    function onChangeInput(data) {

        setState({ ...state, ...data })


        setFinalPrice(100 + (data.prototype * 25 || state.prototype * 25))



    }
    console.log(state);

    return (
        <>
            <div className='col-8'>
                <BackButton warn={true} />

                <h2 className='mt-4'>Logo Quote</h2>
                <p>Lets get started on your logo quote.</p>

                <form>
                    <div className='form-row d-flex justify-content-between'>
                        <div className='form-group col-md-5'>
                            <label>How many prototypes do you want?</label>
                            <select
                                onChange={() => onChangeInput({ [event.target.name]: Number(event.target.value) })}
                                className="custom-select"
                                name='prototype'>
                                <option value='1'>One</option>
                                <option value='2'>Two</option>
                                <option value='3'>Three</option>

                            </select>
                        </div>


                    </div>

                    <div className='form-row d-flex justify-content-between'>
                        <div className='form-group col-md-6'>
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
                                <input
                                    onChange={e => onChangeInput({ [e.target.name]: e.target.value })}
                                    name='deadline'
                                    className='form-control'
                                    type='date' />
                            </div>
                        )}
                    </div>


                </form>
            </div>
            <div className='col'>
                <h4>Your quote</h4>
                <div className='card p-2'>

                    <ul className='list-group '>
                        <li className='list-group-item'>
                            Number of protoype: {state.prototype} prototype{state.prototype > 1 ? 's' : null}
                        </li>
                        <li className='list-group-item'>
                            Deadline: {!deadline && (
                                'None selected'
                            )}

                            {deadline && (

                                state.deadline ?
                                    moment(state.deadline).format("MMM Do YY") +
                                    " (" + moment(state.deadline)
                                        .startOf('day').fromNow() + ")" : 'None selected'
                            )}
                        </li>

                    </ul>

                    <h5 className='mt-4'>Estimated price: €{finalPrice}</h5>

                </div>
            </div>
        </>
    )
}


export default LogoQuote;