import React from 'react';
import { withRouter } from 'react-router-dom';
function PromptLoginModal(props) {
    const { history } = props
    return (
        <div className="modal fade"
            id="prompt-login" tabIndex="-1"
            role="dialog"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button
                            type="button"
                            onClick={() => history.push('/login')}
                            className="btn btn-primary"
                            data-dismiss="modal">Login</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
PromptLoginModal = withRouter(PromptLoginModal)
export {
    PromptLoginModal
}