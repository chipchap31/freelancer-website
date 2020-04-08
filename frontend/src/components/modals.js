import React from 'react';
import { withRouter } from 'react-router-dom';
function PromptLoginModal(props) {
    const { history } = props
    return (
        <div class="modal fade" id="prompt-login" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button
                            type="button"
                            onClick={() => history.push('/login')}
                            class="btn btn-primary"
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