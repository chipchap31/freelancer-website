import React from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";

import { withRouter } from 'react-router-dom';
function BackButton(props) {
    const { history } = props
    if (props.warn) {
        return (
            <>
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalCenterTitle">Confirm Navigation</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to go back?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                                <button onClick={() => history.goBack()} type="button" data-dismiss="modal" className="btn btn-primary">Yes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    <IoIosArrowRoundBack />Back
                </button>
            </>
        )
    }
    return <button className='btn btn-secondary' onClick={() => history.goBack()} type='button'>
        <IoIosArrowRoundBack />Back
        </button>
}


BackButton = withRouter(BackButton)

export {
    BackButton
}