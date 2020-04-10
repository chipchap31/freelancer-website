import React from 'react';
import { BackButton } from '../components/buttons';
import { connect } from 'react-redux';
import { onChangeLogoQuote } from '../actions';
import moment from 'moment';
function QuoteLogo(props) {

    const { logoInput, onChangeLogoQuote } = props;
    console.log(logoInput);
    const deadlineDate = moment(logoInput.deadlineDate).format("MMM Do YY");
    const deadlineDay = moment(logoInput.deadlineDate).startOf('day').fromNow();
    return (
        <>
            <div className='col-8'>
                <BackButton warn={false} />

                <h2 className='mt-4'>Logo Quote</h2>
                <p>Lets get started on your logo quote.</p>

                <form>
                    <div className='form-row'>

                        {/* Logo quote input for the first name */}

                        <div className='form-group col'>
                            <label htmlFor='id-firstname'>First name</label>
                            <input
                                id='id-firstname'
                                className='form-control'
                                name='firstname'
                                onChange={e => onChangeLogoQuote({
                                    ...logoInput,
                                    [e.target.name]:
                                        e.target.value
                                })}
                                value={logoInput.firstname} />
                        </div>

                        {/* Logo quote input for the last name */}

                        <div className='form-group col'>
                            <label htmlFor='id-lastname'>Last name</label>
                            <input
                                onChange={e => onChangeLogoQuote({
                                    ...logoInput,
                                    [e.target.name]:
                                        e.target.value
                                })}
                                id='id-lastname'
                                className='form-control'
                                name='lastname'

                                value={logoInput.lastname} />
                        </div>
                    </div>
                    <div className='form-row mt-3'>
                        <div className='form-group required col'>
                            <label htmlFor="id-company-name">Company name</label>
                            <input
                                value={logoInput.companyName}
                                onChange={e => onChangeLogoQuote({
                                    ...logoInput,
                                    [e.target.name]:
                                        e.target.value
                                })}
                                name='companyName'
                                className='form-control'
                                type="text"
                                id='id-company-name' />
                        </div>
                        <div className='form-group required col'>
                            <label htmlFor='id-email'>Email</label>
                            <input

                                id='id-email'
                                className='form-control'
                                type='email'
                                name='email'
                                onChange={e => onChangeLogoQuote({
                                    ...logoInput,
                                    [e.target.name]:
                                        e.target.value
                                })}
                                value={logoInput.email}
                            />
                        </div>
                    </div>
                    <div className='form-row d-flex justify-content-between mt-3'>
                        <div className='form-group col'>
                            <label htmlFor=''>How many prototypes do you want?</label>
                            <select
                                onChange={e => onChangeLogoQuote({
                                    ...logoInput,
                                    [e.target.name]:
                                        Number(e.target.value)
                                })}
                                className="custom-select"
                                name='prototypeAmount'>
                                <option value='1'>One</option>
                                <option value='2'>Two</option>
                                <option value='3'>Three</option>

                            </select>
                        </div>
                        <div className='col'>
                            <div className='form-group '>
                                <label htmlFor='id-deadline'>Is there a specific deadline for this project?</label><br />
                                <div className="form-check form-check-inline">
                                    <input
                                        onChange={e => onChangeLogoQuote({
                                            ...logoInput,
                                            [e.target.name]:
                                                true
                                        })}
                                        id='id-yes'
                                        name='deadline'
                                        className="form-check-input"
                                        type="radio" />
                                    <label htmlFor='id-yes' className="form-check-label">Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        onChange={e => onChangeLogoQuote({
                                            ...logoInput,
                                            [e.target.name]:
                                                false
                                        })}
                                        id='id-no'
                                        name='deadline'
                                        className="form-check-input" type="radio" />
                                    <label htmlFor='id-no' className="form-check-label">No</label>
                                </div>
                            </div>
                            {logoInput.deadline && (
                                <div className='form-group '>
                                    <label>Please pick a suitable deadline for your project.</label><br />
                                    <input
                                        onChange={e => onChangeLogoQuote({
                                            ...logoInput,
                                            [e.target.name]:
                                                e.target.value
                                        })}
                                        name='deadlineDate'
                                        className='form-control'
                                        value={logoInput.deadlineDate}
                                        type='date' />
                                </div>
                            )}
                        </div>




                    </div>
                </form>
            </div>
            <div className='col'>
                <h4>Your quote</h4>
                <div className='card p-2'>

                    <ul className='list-group '>
                        <li className='list-group-item'>
                            Prototype amount: {logoInput.prototype} prototype{logoInput.prototype > 1 ? 's' : null}
                        </li>
                        <li className={`list-group-item ${logoInput.deadlineDateInvalid && logoInput.deadline ? 'text-danger' : ''}`}>
                            Deadline: {logoInput.deadline && logoInput.deadlineDate ? `${deadlineDate}(${deadlineDay})` : 'None selected'}
                        </li>

                    </ul>

                    <h5 className='mt-4'>Estimated price: €{logoInput.estimate}</h5>



                </div>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        logoInput: state.logoReducer
    }
}

export default connect(mapStateToProps, { onChangeLogoQuote })(QuoteLogo);