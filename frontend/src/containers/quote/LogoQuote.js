import React, { useState } from 'react'
import { BackButton } from '../../components/buttons'
import moment from 'moment';
import { connect } from 'react-redux';


function LogoQuote(props) {

    console.log(props);

    const initState = {
        firstname: '',
        lastname: '',
        email: '',
        companyName: '',
        prototype: 1,
        deadline: false,
        deadlineDate: false,
        estimate: 125,
        submitDisable: true
    }
    const [state, setState] = useState(initState);

    function onChangeInput(data) {




        function calculateEstimate() {
            // check if a date is selected
            const dateNow = moment(new Date);
            const prototypePrice = 100 + (25 * data.prototype);

            const dateExist = data.deadlineDate || false;
            // convert to date
            const date = dateExist ? moment(data.deadlineDate) : false

            const dateDiff = data.deadlineDate ? date.diff(dateNow, 'days') : 0;

            const dateDiffMult = 10 - dateDiff;
            const deadlineExistPrice = prototypePrice + ((dateDiffMult >= 0 ? dateDiffMult : 0) * 50);
            if (!data.deadline) {
                return prototypePrice;


            } else if (data.deadlineDate) {
                if (deadlineExistPrice > 0) {
                    return deadlineExistPrice
                } else {
                    return prototypePrice
                }
            } else {
                return prototypePrice
            }
        }
        setState({
            ...state,
            ...data,
            deadlineDate: data.deadline ? data.deadlineDate : false,
            estimate: calculateEstimate(),
            submitDisable: data.companyName && data.email ? false : true
        })
    }





    return (
        <>

            <div className='col-8'>
                <BackButton warn={true} />

                <h2 className='mt-4'>Logo Quote</h2>
                <p>Lets get started on your logo quote.</p>

                <form>
                    <div className='form-row'>
                        <div className='col'>
                            <label>First name</label>
                            <input
                                className='form-control'
                                name='firstname'
                                onChange={e => onChangeInput({
                                    ...state, [e.target.name]: e.target.value
                                })}
                                value={state.firstname} />
                        </div>

                        <div className='col'>
                            <label>Last name</label>
                            <input
                                className='form-control'
                                name='lastname'
                                onChange={e => onChangeInput({
                                    ...state, [e.target.name]: e.target.value
                                })}
                                value={state.lastname} />
                        </div>
                    </div>
                    <div className='form-row mt-3'>
                        <div className='form-group required col'>
                            <label htmlFor="id-company-name">Company name</label>
                            <input
                                value={state.companyName}
                                onChange={e => onChangeInput(
                                    { ...state, [e.target.name]: e.target.value }
                                )}
                                name='companyName'
                                className='form-control'
                                type="text"
                                id='id-company-name' />
                        </div>
                        <div className='form-group required col'>
                            <label>Email</label>
                            <input
                                className='form-control'
                                type='email'
                                name='email'
                                value={state.email}
                                onChange={e => onChangeInput({ ...state, [e.target.name]: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='form-row d-flex justify-content-between mt-3'>
                        <div className='col'>
                            <div className='form-group '>
                                <label>Is there a specific deadline for this project?</label><br />
                                <div className="form-check form-check-inline">
                                    <input name='deadline'
                                        onChange={e => onChangeInput({ ...state, [e.target.name]: true })}
                                        className="form-check-input"
                                        type="radio" id="inlineCheckbox2" />
                                    <label className="form-check-label">Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        name='deadline'
                                        onChange={e => onChangeInput({ ...state, [e.target.name]: false })}
                                        className="form-check-input" type="radio" />
                                    <label className="form-check-label">No</label>
                                </div>
                            </div>
                            {state.deadline && (
                                <div className='form-group '>
                                    <label>Please pick a suitable deadline for your project.</label><br />
                                    <input
                                        onChange={e => onChangeInput({ ...state, [e.target.name]: e.target.value })}
                                        name='deadlineDate'
                                        className='form-control'
                                        value={state.deadlineDate}
                                        type='date' />
                                </div>
                            )}
                        </div>

                        <div className='form-group col'>
                            <label>How many prototypes do you want?</label>
                            <select
                                onChange={e => onChangeInput({
                                    ...state,
                                    [e.target.name]: Number(e.target.value)
                                })}
                                className="custom-select"
                                name='prototype'>
                                <option value='1'>One</option>
                                <option value='2'>Two</option>
                                <option value='3'>Three</option>

                            </select>
                        </div>


                    </div>





                </form>
            </div>
            <div className='col'>
                <h4>Your quote</h4>
                <div className='card p-2'>

                    <ul className='list-group '>
                        <li className='list-group-item'>
                            Prototype amount: {state.prototype} prototype{state.prototype > 1 ? 's' : null}
                        </li>
                        <li className='list-group-item'>
                            Deadline: {!state.deadline && (
                                'None selected'
                            )}

                            {state.deadline && (

                                state.deadlineDate ?
                                    moment(state.deadlineDate).format("MMM Do YY") +
                                    " (" + moment(state.deadlineDate)
                                        .startOf('day').fromNow() + ")" : 'None selected'
                            )}
                        </li>

                    </ul>

                    <h5 className='mt-4'>Estimated price: €{state.estimate}</h5>
                    {!props.user && (
                        <button
                            data-toggle='modal'
                            data-target='#prompt-login'
                            className='btn btn-secondary'
                            type='button'
                            disabled={state.submitDisable ? 'disabled' : null} >
                            Get Quote
                         </button>
                    )}
                    {props.user && (
                        <button
                            disabled={state.submitDisable ? 'disabled' : null}
                            className='btn btn-secondary mt-3'>Get quote</button>
                    )}


                </div>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        user: state.userReducer
    }
}

export default connect(mapStateToProps)(LogoQuote);