import React from 'react'
import { Link } from 'react-router-dom'

function Login(props) {
    const [state, setState] = React.useState({
        email: '',
        password: ''
    })
    return (
        <section id='login'>
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-6'>
                        <h2>Login</h2>
                        <form>
                            {/* Input for the clients email address */}
                            <div className='form-group'>
                                <label htmlFor='id-email'>Email address</label>
                                <input
                                    type='email'
                                    id='id-email'
                                    className='form-control'
                                    value={state.email}
                                    onChange={e => setState({
                                        ...state, [e.target.name]:
                                            e.target.value
                                    })} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="id-password">Password</label>
                                <input
                                    id='id-password'
                                    className='form-control'
                                    value={state.password}
                                    onChange={e => setState({
                                        ...state,
                                        [e.target.name]:
                                            e.target.value
                                    })}
                                    type='password' />
                            </div>
                            <button className='btn btn-primary' type='submit'>Login</button>

                            <p className='mt-3'>Already have an account? <Link to='/register'>register instead</Link></p>

                        </form>
                    </div>


                </div>

            </div>
        </section>
    )
}

export default Login;