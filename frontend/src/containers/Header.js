import React from 'react';
import { Link } from 'react-router-dom';
import {

    Row,
    Col,
    Button,
    Avatar,
    Dropdown,
    Menu,
    Spin
} from 'antd';
import { connect } from 'react-redux';
import * as actions from '../actions'
function Header(props) {

    const { profileState, userState } = props;




    const first_name = profileState.first_name;
    const last_name = profileState.last_name;
    const menu = (
        <Menu>
            <Menu.Item>
                <Link to='/profile'>{first_name} {last_name}</Link>
            </Menu.Item>

            <Menu.Item >

                <span onClick={() => props.handleLogout()}>Logout</span>
            </Menu.Item>
        </Menu>
    );
    const AvatarRender = () => {


        return (
            <Dropdown overlay={menu}>
                <Avatar size='large'>

                    {first_name.charAt(0) + last_name.charAt(0)}
                </Avatar>
            </Dropdown>

        )
    }
    return (
        <>
            {!userState.authenticated && (<aside>
                <div className='container'>
                    <Row justify='end' >
                        <Link to='/login'>Client Login</Link>
                    </Row>
                </div>
            </aside>)}
            <header className="header mb-4">

                <Row className='container' justify='space-between d-flex content-center'>
                    <Col>
                        <Link to={userState.authenticated ? '/dashboard' : '/'}>Logo</Link>
                        {userState.authenticated && (
                            <>
                                <Link
                                    className='ml-3'
                                    to='/dashboard'>Dashboard</Link>
                                <Link
                                    className='m-2'
                                    to='/projects'>Projects</Link>
                            </>
                        )}
                    </Col>
                    <Col>

                        {!userState.authenticated && (

                            <Button type='primary'>
                                <Link to='/get-quote'>Get started</Link>
                            </Button>

                        )}
                        {userState.authenticated && (

                            <AvatarRender />

                        )}


                    </Col>

                </Row>
            </header>
        </>
    )
}


const mapStateToProps = state => {
    return {
        profileState: state.profileReducer,
        userState: state.userReducer
    }
}
export default connect(mapStateToProps, actions)(Header);